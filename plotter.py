"""
XRD stacked pattern plotter.
Generates publication-quality stacked plots matching Origin-style output.
"""

import io
import math

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import numpy as np

# ── Font resolution ───────────────────────────────────────────────────────────
# Each key maps to an ordered list of candidate font names (first available wins)
_FONT_CANDIDATES = {
    "Times New Roman": ["Times New Roman", "Liberation Serif", "DejaVu Serif"],
    "宋体 (SimSun)":    ["SimSun", "Noto Serif CJK SC", "AR PL UMing CN", "DejaVu Serif"],
    "仿宋 (FangSong)":  ["FangSong", "AR PL UKai CN", "Noto Serif CJK SC", "DejaVu Serif"],
    "黑体 (SimHei)":    ["SimHei", "Noto Sans CJK SC", "WenQuanYi Micro Hei", "DejaVu Sans"],
}
FONT_NAMES = list(_FONT_CANDIDATES.keys())


def _resolve_font(display_name: str) -> str:
    available = {f.name for f in fm.fontManager.ttflist}
    for candidate in _FONT_CANDIDATES.get(display_name, ["DejaVu Serif"]):
        if candidate in available:
            return candidate
    return "DejaVu Serif"


# ── Data loading ──────────────────────────────────────────────────────────────

def load_txt(file_bytes: bytes) -> tuple[np.ndarray, np.ndarray]:
    """
    Parse a two-column TXT file (space or tab separated, no header).
    Returns (two_theta, intensity) as numpy arrays.
    Skips lines that don't parse as two floats.
    """
    text = file_bytes.decode("utf-8", errors="replace")
    xs, ys = [], []
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) >= 2:
            try:
                xs.append(float(parts[0]))
                ys.append(float(parts[1]))
            except ValueError:
                continue
    return np.array(xs), np.array(ys)


# ── Figure generation ─────────────────────────────────────────────────────────

def make_stacked_figure(
    datasets: list[dict],
    x_label: str = "2θ (degree)",
    y_label: str = "Intensity (a.u.)",
    font_name: str = "Times New Roman",
    font_size: int = 16,
    fig_width: float = 8.0,
    fig_height: float = 10.0,
    offset_factor: float = 1.1,
    line_width: float = 1.0,
    dpi: int = 300,
    label_x_frac: float = 0.82,
    normalize: bool = True,     # normalize each curve to [0, 1] before stacking
) -> bytes:
    """
    Generate a stacked XRD pattern figure.

    datasets: list of dicts, each with keys:
        x (np.ndarray), y (np.ndarray), name (str), color (str)

    Returns PNG bytes.
    """
    if not datasets:
        raise ValueError("No datasets provided")

    from matplotlib.ticker import AutoMinorLocator, MultipleLocator

    font_family = _resolve_font(font_name)
    rc = {
        "font.family":          font_family,
        "font.size":            font_size,
        "axes.linewidth":       1.5,
        # x ticks — outward, both top and bottom, with minor ticks
        "xtick.direction":      "out",
        "xtick.major.width":    1.5,
        "xtick.minor.width":    1.0,
        "xtick.major.size":     6,
        "xtick.minor.size":     3,
        "xtick.minor.visible":  True,
        "xtick.top":            True,       # mirror ticks on top spine
        # y ticks — none (stacked intensity plot)
        "ytick.left":           False,
        "ytick.right":          False,
        "figure.facecolor":     "white",
        "axes.facecolor":       "white",
    }

    with matplotlib.rc_context(rc):
        fig, ax = plt.subplots(figsize=(fig_width, fig_height))

        # Determine global x range
        all_x = np.concatenate([d["x"] for d in datasets])
        x_min, x_max = float(all_x.min()), float(all_x.max())
        x_range = x_max - x_min
        label_x = x_min + label_x_frac * x_range

        # Pre-process y values (normalize if requested)
        ys_processed = []
        for d in datasets:
            y = d["y"].astype(float)
            if normalize:
                y_min_v, y_max_v = y.min(), y.max()
                if y_max_v > y_min_v:
                    y = (y - y_min_v) / (y_max_v - y_min_v)
                else:
                    y = np.zeros_like(y)
            ys_processed.append(y)

        # Compute per-curve y offset (bottom to top = first to last)
        offsets: list[float] = []
        current = 0.0
        for y in ys_processed:
            offsets.append(current)
            current += float(y.max() - y.min()) * offset_factor

        # Plot curves
        for d, y, offset in zip(datasets, ys_processed, offsets):
            x = d["x"]
            line_color  = d.get("color", "black")
            label_color = d.get("label_color", line_color)   # independent text color
            name = d.get("name", "")

            y_shifted = y + offset
            ax.plot(x, y_shifted, color=line_color, linewidth=line_width)

            # Place label — find y at label_x, raise slightly
            if name:
                try:
                    idx = int(np.searchsorted(x, label_x))
                    idx = min(max(idx, 0), len(y_shifted) - 1)
                    y_at_label = float(y_shifted[idx])
                except Exception:
                    y_at_label = offset + float(y.max()) * 0.5

                y_span = float(y.max() - y.min())
                ax.text(
                    label_x,
                    y_at_label + y_span * 0.05,
                    name,
                    ha="left",
                    va="bottom",
                    fontsize=font_size - 1,
                    color=label_color,
                    fontfamily=font_family,
                )

        # ── Axes styling: match Origin reference ──────────────────────────
        ax.set_xlim(x_min, x_max)
        ax.set_xlabel(x_label, fontsize=font_size, fontfamily=font_family)
        ax.set_ylabel(y_label, fontsize=font_size, fontfamily=font_family)

        # Complete box frame (all 4 spines visible)
        for spine in ax.spines.values():
            spine.set_visible(True)
            spine.set_linewidth(1.5)

        # y-axis: show spine but no tick marks or labels
        ax.set_yticks([])
        ax.yaxis.set_tick_params(length=0)

        # x-axis: major ticks every 5°, minor ticks every 1°
        x_span = x_max - x_min
        major_step = 5.0 if x_span <= 60 else 10.0
        ax.xaxis.set_major_locator(MultipleLocator(major_step))
        ax.xaxis.set_minor_locator(AutoMinorLocator(5))   # 5 minor per major → 1° step

        plt.tight_layout()

        buf = io.BytesIO()
        fig.savefig(buf, format="png", dpi=dpi, bbox_inches="tight")
        plt.close(fig)
        buf.seek(0)
        return buf.getvalue()


# ── Plotly interactive preview ────────────────────────────────────────────────

def make_plotly_preview(
    datasets: list[dict],
    x_label: str = "2θ (degree)",
    y_label: str = "Intensity (a.u.)",
    offset_factor: float = 1.1,
    normalize: bool = True,
) -> object:
    import plotly.graph_objects as go

    fig = go.Figure()

    current_offset = 0.0
    for d in datasets:
        x = d["x"]
        y = d["y"].astype(float)
        color = d.get("color", "black")
        name = d.get("name", "")

        if normalize:
            y_min_v, y_max_v = y.min(), y.max()
            if y_max_v > y_min_v:
                y = (y - y_min_v) / (y_max_v - y_min_v)

        y_span = float(y.max() - y.min()) if len(y) > 0 else 1.0
        y_shifted = y + current_offset

        fig.add_trace(go.Scatter(
            x=x,
            y=y_shifted,
            mode="lines",
            name=name,
            line=dict(color=color, width=1),
            hovertemplate=f"{name}<br>2θ=%{{x:.3f}}°<br>I=%{{y:.4f}}<extra></extra>",
        ))

        current_offset += y_span * offset_factor

    fig.update_layout(
        xaxis_title=x_label,
        yaxis_title=y_label,
        yaxis=dict(showticklabels=False, showgrid=False),
        hovermode="x unified",
        height=500,
        margin=dict(l=60, r=20, t=20, b=60),
        plot_bgcolor="white",
        paper_bgcolor="white",
        showlegend=True,
        legend=dict(x=1.01, y=1, xanchor="left"),
    )
    fig.update_xaxes(showgrid=False, mirror=True, ticks="inside",
                     showline=True, linecolor="black")
    fig.update_yaxes(showgrid=False, showline=False)

    return fig
