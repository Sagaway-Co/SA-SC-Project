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
    label_x_frac: float = 0.82,  # label x position as fraction of x-range from left
) -> bytes:
    """
    Generate a stacked XRD pattern figure.

    datasets: list of dicts, each with keys:
        x (np.ndarray), y (np.ndarray), name (str), color (str)

    Returns PNG bytes.
    """
    if not datasets:
        raise ValueError("No datasets provided")

    font_family = _resolve_font(font_name)
    rc = {
        "font.family":        font_family,
        "font.size":          font_size,
        "axes.linewidth":     1.5,
        "xtick.major.width":  1.5,
        "xtick.minor.width":  1.0,
        "xtick.direction":    "in",
        "xtick.major.size":   5,
        "xtick.minor.size":   3,
        "xtick.minor.visible": True,
        "figure.facecolor":   "white",
        "axes.facecolor":     "white",
    }

    with matplotlib.rc_context(rc):
        fig, ax = plt.subplots(figsize=(fig_width, fig_height))

        # Determine global x range
        all_x = np.concatenate([d["x"] for d in datasets])
        x_min, x_max = float(all_x.min()), float(all_x.max())
        x_range = x_max - x_min
        label_x = x_min + label_x_frac * x_range

        # Compute per-curve y offset (bottom to top = first to last in list)
        offsets: list[float] = []
        current = 0.0
        for d in datasets:
            offsets.append(current)
            y_span = float(np.max(d["y"]) - np.min(d["y"]))
            current += y_span * offset_factor

        # Plot curves
        for d, offset in zip(datasets, offsets):
            x, y = d["x"], d["y"]
            color = d.get("color", "black")
            name = d.get("name", "")

            y_shifted = y + offset
            ax.plot(x, y_shifted, color=color, linewidth=line_width)

            # Place label near the curve — find y value at label_x, add small gap
            if name:
                # interpolate y at label_x
                try:
                    idx = np.searchsorted(x, label_x)
                    idx = min(max(idx, 0), len(y_shifted) - 1)
                    y_at_label = float(y_shifted[idx])
                except Exception:
                    y_at_label = offset + float(np.max(y)) * 0.5

                y_span = float(np.max(d["y"]) - np.min(d["y"]))
                ax.text(
                    label_x,
                    y_at_label + y_span * 0.05,
                    name,
                    ha="left",
                    va="bottom",
                    fontsize=font_size - 1,
                    color=color,
                    fontfamily=font_family,
                )

        # Axes styling
        ax.set_xlim(x_min, x_max)
        ax.set_xlabel(x_label, fontsize=font_size, fontfamily=font_family)
        ax.set_ylabel(y_label, fontsize=font_size, fontfamily=font_family)

        # Hide y tick labels but keep spine (stacked plots don't show intensity scale)
        ax.set_yticks([])
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
        ax.spines["left"].set_visible(False)

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
) -> object:
    import plotly.graph_objects as go

    fig = go.Figure()

    current_offset = 0.0
    for d in datasets:
        x, y = d["x"], d["y"]
        color = d.get("color", "black")
        name = d.get("name", "")
        y_span = float(np.max(y) - np.min(y)) if len(y) > 0 else 1.0

        y_shifted = y + current_offset

        fig.add_trace(go.Scatter(
            x=x,
            y=y_shifted,
            mode="lines",
            name=name,
            line=dict(color=color, width=1),
            hovertemplate=f"{name}<br>2θ=%{{x:.3f}}°<br>I=%{{y:.1f}}<extra></extra>",
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
