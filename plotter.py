"""
XRD stacked pattern plotter — Origin-style output.

Key design decisions matched to reference image:
- Complete 4-side box frame; ticks ONLY on bottom, pointing outward
- Top/right/left spines visible but NO ticks
- Font fallback list via rcParams so ℃ and other Unicode render correctly
- Separate font sizes: axis label 30pt, tick labels 26pt, curve labels 22pt (Origin defaults)
"""

import io
import math

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
from matplotlib.ticker import AutoMinorLocator, MultipleLocator
import numpy as np

# ── Font configuration ────────────────────────────────────────────────────────
# Each entry: generic family + ordered fallback list.
# Fallback enables ℃ (U+2103) rendering when primary font lacks the glyph.
_FONT_CONFIG = {
    "Times New Roman": {
        "family": "serif",
        "serif": [
            "Times New Roman", "Liberation Serif",
            "Noto Serif CJK SC", "DejaVu Serif",
        ],
    },
    "宋体 (SimSun)": {
        "family": "serif",
        "serif": [
            "Noto Serif CJK SC", "SimSun", "AR PL UMing CN",
            "Liberation Serif", "DejaVu Serif",
        ],
    },
    "仿宋 (FangSong)": {
        "family": "serif",
        "serif": [
            "FangSong", "Noto Serif CJK SC",
            "Liberation Serif", "DejaVu Serif",
        ],
    },
    "黑体 (SimHei)": {
        "family": "sans-serif",
        "sans-serif": [
            "Noto Sans CJK SC", "SimHei", "WenQuanYi Micro Hei",
            "Hiragino Sans GB", "DejaVu Sans",
        ],
    },
}
FONT_NAMES = list(_FONT_CONFIG.keys())


def _safe_text(text: str) -> str:
    """Replace Unicode compatibility chars that most fonts lack with safe equivalents."""
    return (text
            .replace("℃", "°C")   # ℃ → °C
            .replace("℉", "°F")   # ℉ → °F
            .replace("Ω", "Ω")    # Ω (ohm sign) → Ω (Greek capital omega)
            )


def _apply_font_rc(rc: dict, font_name: str) -> str:
    """
    Update rc dict with font fallback list for the given named font.
    Returns the generic family string ('serif' or 'sans-serif') to use
    in text/label calls so the fallback chain is respected.
    """
    cfg = _FONT_CONFIG.get(font_name, _FONT_CONFIG["Times New Roman"])
    family = cfg["family"]
    rc["font.family"] = family
    if "serif" in cfg:
        rc["font.serif"] = cfg["serif"]
    if "sans-serif" in cfg:
        rc["font.sans-serif"] = cfg["sans-serif"]
    return family


# ── Data loading ──────────────────────────────────────────────────────────────

def load_txt(file_bytes: bytes) -> tuple[np.ndarray, np.ndarray]:
    """
    Parse a two-column TXT file.
    Handles any whitespace separator (spaces, tabs, mixed).
    Skips header lines and lines that don't parse as two floats.
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
                continue  # skip non-numeric header rows
    return np.array(xs), np.array(ys)


# ── Publication figure ────────────────────────────────────────────────────────

def make_stacked_figure(
    datasets: list[dict],
    x_label: str = "2θ (degree)",
    y_label: str = "Intensity (a.u.)",
    font_name: str = "Times New Roman",
    axis_fontsize: int = 30,      # XY axis label — Origin default 30
    tick_fontsize: int = 26,      # tick number labels — Origin default 26-28
    label_fontsize: int = 22,     # per-curve text labels — Origin default 22-24
    fig_width: float = 8.0,
    fig_height: float = 10.0,
    offset_factor: float = 1.1,
    line_width: float = 1.0,      # pt; Origin default is 0.5, user wants 1
    dpi: int = 300,
    label_x_frac: float = 0.82,
    normalize: bool = True,
) -> bytes:
    """Generate a stacked XRD pattern figure matching Origin style."""
    if not datasets:
        raise ValueError("No datasets provided")

    rc: dict = {
        # Ticks: ONLY on bottom, pointing outward — matches reference exactly
        "xtick.direction":      "out",
        "xtick.bottom":         True,
        "xtick.top":            False,   # NO mirror ticks on top spine
        "xtick.major.width":    1.5,
        "xtick.minor.width":    1.0,
        "xtick.major.size":     6,
        "xtick.minor.size":     3,
        "xtick.minor.visible":  True,
        "xtick.labelsize":      tick_fontsize,
        # Y ticks: none (stacked intensity has no absolute y scale)
        "ytick.left":           False,
        "ytick.right":          False,
        "ytick.labelsize":      tick_fontsize,
        # Frame
        "axes.linewidth":       1.5,
        "figure.facecolor":     "white",
        "axes.facecolor":       "white",
    }

    # Apply font fallback chain so ℃ and other Unicode characters render
    generic_family = _apply_font_rc(rc, font_name)
    rc["font.size"] = axis_fontsize  # base size; overridden per element below

    with matplotlib.rc_context(rc):
        fig, ax = plt.subplots(figsize=(fig_width, fig_height))

        # ── x range ──────────────────────────────────────────────────────────
        all_x = np.concatenate([d["x"] for d in datasets])
        x_min, x_max = float(all_x.min()), float(all_x.max())
        label_x = x_min + label_x_frac * (x_max - x_min)

        # ── Normalise + compute offsets ───────────────────────────────────────
        ys_proc = []
        for d in datasets:
            y = d["y"].astype(float)
            if normalize:
                lo, hi = y.min(), y.max()
                y = (y - lo) / (hi - lo) if hi > lo else np.zeros_like(y)
            ys_proc.append(y)

        offsets: list[float] = []
        cur = 0.0
        for y in ys_proc:
            offsets.append(cur)
            cur += float(y.max() - y.min()) * offset_factor

        # ── Plot curves ───────────────────────────────────────────────────────
        for d, y, offset in zip(datasets, ys_proc, offsets):
            x = d["x"]
            lc = d.get("color", "black")
            tc = d.get("label_color", lc)
            name = d.get("name", "")

            ax.plot(x, y + offset, color=lc, linewidth=line_width)

            if name:
                try:
                    idx = int(np.clip(np.searchsorted(x, label_x), 0, len(y) - 1))
                    y_pos = float((y + offset)[idx]) + float(y.max() - y.min()) * 0.05
                except Exception:
                    y_pos = offset + float(y.max()) * 0.5

                ax.text(
                    label_x, y_pos, _safe_text(name),
                    ha="left", va="bottom",
                    fontsize=label_fontsize,
                    color=tc,
                    fontfamily=generic_family,
                )

        # ── Axes styling ──────────────────────────────────────────────────────
        ax.set_xlim(x_min, x_max)

        # All 4 spines visible (complete box), uniform weight
        for spine in ax.spines.values():
            spine.set_visible(True)
            spine.set_linewidth(1.5)

        # x-axis: major every 5°, minor every 1° (AutoMinorLocator(5))
        x_span = x_max - x_min
        major_step = 5.0 if x_span <= 60 else 10.0
        ax.xaxis.set_major_locator(MultipleLocator(major_step))
        ax.xaxis.set_minor_locator(AutoMinorLocator(5))

        # x label
        ax.set_xlabel(_safe_text(x_label), fontsize=axis_fontsize,
                      fontfamily=generic_family, labelpad=10)

        # y axis: spine visible, label present, but NO ticks and NO tick labels
        ax.set_yticks([])
        ax.yaxis.set_tick_params(length=0)
        ax.set_ylabel(_safe_text(y_label), fontsize=axis_fontsize,
                      fontfamily=generic_family, labelpad=10)

        # Tick label font size (set explicitly, not via rcParams which may be off)
        ax.tick_params(axis="x", labelsize=tick_fontsize, which="major")

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
    cur = 0.0

    for d in datasets:
        x = d["x"]
        y = d["y"].astype(float)
        color = d.get("color", "black")
        name = d.get("name", "")

        if normalize:
            lo, hi = y.min(), y.max()
            if hi > lo:
                y = (y - lo) / (hi - lo)

        span = float(y.max() - y.min())
        fig.add_trace(go.Scatter(
            x=x, y=y + cur,
            mode="lines", name=name,
            line=dict(color=color, width=1),
            hovertemplate=f"{name}<br>2θ=%{{x:.3f}}°<extra></extra>",
        ))
        cur += span * offset_factor

    fig.update_layout(
        xaxis_title=x_label,
        yaxis_title=y_label,
        yaxis=dict(showticklabels=False, showgrid=False),
        hovermode="x unified",
        height=520,
        margin=dict(l=60, r=20, t=20, b=60),
        plot_bgcolor="white",
        paper_bgcolor="white",
        showlegend=True,
        legend=dict(x=1.01, y=1, xanchor="left"),
    )
    fig.update_xaxes(showgrid=False, mirror=True, ticks="outside",
                     showline=True, linecolor="black")
    fig.update_yaxes(showgrid=False, showline=True, linecolor="black",
                     mirror=True)
    return fig
