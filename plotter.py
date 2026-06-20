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
    label_x_frac: float = 0.93,   # scan starts here (rightmost); text right-anchors, 7% margin from border
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
        # constrained_layout keeps figure exactly at (fig_width, fig_height);
        # avoids bbox_inches="tight" which silently expands dimensions.
        fig, ax = plt.subplots(figsize=(fig_width, fig_height),
                               constrained_layout=True)

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
                # Shift so baseline is exactly 0 (no floating-point drift)
                y = (y - lo) / (hi - lo) if hi > lo else np.zeros_like(y)
            else:
                # Even without normalisation, shift each curve so its min = 0
                y = y - y.min()
            ys_proc.append(y)

        offsets: list[float] = []
        cur = 0.0
        for y in ys_proc:
            offsets.append(cur)
            # span is exactly y.max() because y.min() == 0 after the shift above
            cur += float(y.max()) * offset_factor

        # ── Compute fixed gap in data units ──────────────────────────────────
        # Total stack height → gap = 5 % of total height (≈ 1 font line at typical DPI)
        total_height = offsets[-1] + float(ys_proc[-1].max()) if ys_proc else 1.0
        gap = 0.05 * total_height        # vertical gap between curve and label

        # ── Smart label placement ─────────────────────────────────────────────
        # Rules (applied per curve):
        #  1. Try default position (label_x_frac of x-range).
        #     If curve value there ≤ 60 % of its peak → place ABOVE (va="bottom")
        #  2. If too high, scan right 30–97 % of x-range for minimum.
        #     If that minimum ≤ 60 % of peak → place ABOVE that x
        #  3. If high everywhere (whole scan above 80 % of peak) → place BELOW
        #     the curve baseline (va="top"), using the original label_x

        for d, y, offset in zip(datasets, ys_proc, offsets):
            x   = d["x"]
            lc  = d.get("color", "black")
            tc  = d.get("label_color", lc)
            name = d.get("name", "")

            ax.plot(x, y + offset, color=lc, linewidth=line_width)

            if not name:
                continue

            # --- Manual placement override ---
            # If the dataset explicitly specifies label_x and label_y, skip all
            # smart placement logic and use those coordinates directly.
            if d.get("label_x") is not None and d.get("label_y") is not None:
                lx = d["label_x"]
                ly = d["label_y"] + offset   # label_y is relative; add offset for absolute coords
                va = d.get("label_va", "bottom")
                ax.text(
                    lx, ly, _safe_text(name),
                    ha="right", va=va,
                    fontsize=label_fontsize,
                    color=tc,
                    fontfamily=generic_family,
                    clip_on=False,
                )
                continue

            y_max_val = float(y.max()) if y.max() > 0 else 1.0
            HIGH      = 0.60 * y_max_val   # threshold: "high at this point"
            VERY_HIGH = 0.80 * y_max_val   # threshold: "consistently high"

            # --- Case 1: default x position ---
            idx_def = int(np.clip(np.searchsorted(x, label_x), 0, len(x) - 1))
            y_here  = float(y[idx_def])          # normalised curve value at label_x

            if y_here <= HIGH:
                # Case 1: default x is low enough → place above, as far right as possible
                lx = label_x
                ly = float(y[idx_def]) + offset + gap
                va = "bottom"

            else:
                # Case 2: scan from RIGHT to LEFT — pick the RIGHTMOST acceptable spot
                # This keeps labels as close to the right border as possible.
                x_scan_lo = x_min + 0.30 * (x_max - x_min)
                mask = (x >= x_scan_lo) & (x <= label_x)
                lx, ly, va = None, None, None

                if mask.sum() > 0:
                    xs_m = x[mask]
                    ys_m = y[mask]
                    # Iterate right → left; stop at first acceptable position
                    for xi, yi in zip(xs_m[::-1], ys_m[::-1]):
                        if float(yi) <= HIGH:
                            lx = float(xi)
                            ly = float(yi) + offset + gap
                            va = "bottom"
                            break

                if lx is None:
                    # Case 3: curve is consistently high — place BELOW the baseline
                    if mask.sum() > 0 and float(y[mask].mean()) >= VERY_HIGH:
                        lx = label_x
                        ly = offset - gap
                        va = "top"
                    else:
                        # Last resort: float above peak at label_x
                        lx = label_x
                        ly = offset + y_max_val + gap
                        va = "bottom"

            ax.text(
                lx, ly, _safe_text(name),
                ha="right", va=va,
                fontsize=label_fontsize,
                color=tc,
                fontfamily=generic_family,
                clip_on=False,
            )

        # ── Axes styling ──────────────────────────────────────────────────────
        ax.set_xlim(x_min, x_max)

        # y-axis limits — measured from reference figure (Plotly 1268×951 px):
        #   bottom gap = 25px / 850px * data_range ≈ 2.9 % below 0
        #   top headroom ≈ 50px / 850px * data_range ≈ 5.9 % above top curve
        # Using slightly more generous values for label breathing room:
        top = total_height
        ax.set_ylim(bottom=-0.05 * top,    # ~5 % below 0 → visible gap above x-axis
                    top=top * 1.10)         # 10 % headroom for top-curve label

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

        # No tight_layout() — constrained_layout handles spacing
        buf = io.BytesIO()
        fig.savefig(buf, format="png", dpi=dpi)   # exact fig_width×fig_height inches
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
        margin=dict(l=60, r=160, t=20, b=60),   # wider right margin for legend
        plot_bgcolor="white",
        paper_bgcolor="white",
        showlegend=True,
        legend=dict(
            x=1.02, y=1,
            xanchor="left", yanchor="top",
            bgcolor="rgba(255,255,255,0.8)",
            bordercolor="lightgrey", borderwidth=1,
        ),
    )
    fig.update_xaxes(showgrid=False, mirror=True, ticks="outside",
                     showline=True, linecolor="black")
    fig.update_yaxes(showgrid=False, showline=True, linecolor="black",
                     mirror=True)
    return fig
