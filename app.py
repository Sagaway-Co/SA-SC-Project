import io
import os
import struct
import sys
import tempfile
import warnings

import plotly.graph_objects as go
import streamlit as st

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "cif2txt"))

from bruker_raw import read_raw, write_raw
from xrd_sim import WAVELENGTHS, simulate
from plotter import (
    FONT_NAMES,
    load_txt,
    make_plotly_preview,
    make_stacked_figure,
)

st.set_page_config(page_title="CIF → RAW → TXT | XRD Plotter", layout="wide")
st.title("XRD 粉末衍射工具箱")

tab_convert, tab_plot = st.tabs(["⚗️ CIF → RAW → TXT 转换", "📊 XRD 堆积图"])


# ═══════════════════════════════════════════════════════════════════════════════
#  Tab 1 – CIF conversion
# ═══════════════════════════════════════════════════════════════════════════════
with tab_convert:
    with st.sidebar:
        st.header("模拟参数")

        source_choice = st.selectbox(
            "X 射线源",
            options=["自定义波长"] + list(WAVELENGTHS.keys()),
            index=1,
        )
        if source_choice == "自定义波长":
            wavelength = st.number_input("波长 (Å)", value=1.54056, format="%.5f")
        else:
            wavelength = WAVELENGTHS[source_choice]
            st.info(f"λ = {wavelength} Å")

        col1, col2 = st.columns(2)
        two_theta_start = col1.number_input("2θ 起点 (°)", value=5.0, step=1.0)
        two_theta_end = col2.number_input("2θ 终点 (°)", value=50.0, step=1.0)
        step = st.number_input("步长 (°)", value=0.02, step=0.01, format="%.3f")
        fwhm = st.number_input("峰宽 FWHM (°)", value=0.1, step=0.01, format="%.3f")
        scale = st.number_input("最大强度归一化值", value=10000.0, step=1000.0)

    uploaded = st.file_uploader("上传 CIF 文件", type=["cif"])

    if not uploaded:
        st.info("请上传一个 CIF 文件开始转换。")
    else:
        run_btn = st.button("开始转换", type="primary")

        if "conv_result" not in st.session_state:
            st.session_state.conv_result = None

        if run_btn:
            with tempfile.TemporaryDirectory() as tmpdir:
                cif_path = os.path.join(tmpdir, uploaded.name)
                with open(cif_path, "wb") as f:
                    f.write(uploaded.getvalue())

                status = st.status("正在模拟 XRD 图谱…", expanded=True)
                warnings_log = []

                try:
                    with warnings.catch_warnings(record=True) as caught:
                        warnings.simplefilter("always")
                        two_theta, intensity = simulate(
                            cif_path,
                            wavelength=wavelength,
                            two_theta_start=two_theta_start,
                            two_theta_end=two_theta_end,
                            step=step,
                            fwhm=fwhm,
                            scale=scale,
                        )
                    for w in caught:
                        warnings_log.append(str(w.message))
                except Exception as e:
                    status.update(label="模拟失败", state="error")
                    st.error(f"转换失败：{e}")
                    st.stop()

                raw_path = os.path.join(tmpdir, "pattern.raw")
                write_raw(list(two_theta), list(intensity), wavelength, raw_path)
                with open(raw_path, "rb") as f:
                    raw_bytes = f.read()

                txt_lines = [f"{t:.4f}  {i:.4f}\n" for t, i in zip(two_theta, intensity)]
                txt_bytes = "".join(txt_lines).encode()

                status.update(label="转换完成 ✓", state="complete")
                stem = os.path.splitext(uploaded.name)[0]
                st.session_state.conv_result = {
                    "two_theta": list(two_theta),
                    "intensity": list(intensity),
                    "raw_bytes": raw_bytes,
                    "txt_bytes": txt_bytes,
                    "warnings": warnings_log,
                    "stem": stem,
                }

        res = st.session_state.conv_result
        if res:
            if res["warnings"]:
                with st.expander("⚠️ 精度警告（使用了 gemmi fallback）", expanded=True):
                    st.warning(
                        "该 CIF 结构复杂或含无序原子，pymatgen 对称分析失败，已切换到 gemmi 引擎。\n"
                        "**峰位置精确，相对强度可能与 Mercury 有差异，请对照 Mercury 验证。**"
                    )

            tab_p, tab_r, tab_t = st.tabs(["📈 衍射图谱", "📦 RAW 文件", "📄 TXT 文件"])

            with tab_p:
                fig = go.Figure()
                fig.add_trace(go.Scatter(
                    x=res["two_theta"], y=res["intensity"],
                    mode="lines", line=dict(color="#2563eb", width=1),
                ))
                fig.update_layout(
                    xaxis_title="2θ (°)", yaxis_title="强度 (相对)",
                    hovermode="x unified", height=420,
                    margin=dict(l=60, r=20, t=20, b=60),
                )
                st.plotly_chart(fig, use_container_width=True)
                c1, c2, c3 = st.columns(3)
                c1.metric("数据点数", len(res["two_theta"]))
                c2.metric("2θ 范围", f"{res['two_theta'][0]:.2f}°–{res['two_theta'][-1]:.2f}°")
                c3.metric("最大强度", f"{max(res['intensity']):.0f}")

            with tab_r:
                st.caption("Bruker RAW v1 二进制格式（与 Mercury 导出格式相同），可直接在 JADE 中打开。")
                c1, c2 = st.columns([1, 2])
                c1.metric("文件大小", f"{len(res['raw_bytes'])} bytes")
                c1.download_button("⬇ 下载 .raw", res["raw_bytes"],
                                   file_name=res["stem"] + ".raw",
                                   mime="application/octet-stream")
                with c2:
                    st.caption("文件头（前 32 bytes，hex）")
                    st.code(" ".join(f"{b:02x}" for b in res["raw_bytes"][:32]), language=None)
                    wl = struct.unpack_from("<d", res["raw_bytes"], 0x270)[0]
                    n  = struct.unpack_from("<i", res["raw_bytes"], 0x2CC)[0]
                    s  = struct.unpack_from("<d", res["raw_bytes"], 0x2D8)[0]
                    st_sz = struct.unpack_from("<d", res["raw_bytes"], 0x378)[0]
                    st.code(f"wavelength : {wl:.5f} Å\n"
                            f"2θ start   : {s:.4f}°\n"
                            f"step       : {st_sz:.4f}°\n"
                            f"n_steps    : {n}", language=None)

            with tab_t:
                st.caption("两列格式（2θ  强度），可直接导入 Excel 或送入堆积图 Tab。")
                c1, c2 = st.columns([1, 2])
                c1.metric("行数", len(res["two_theta"]))
                c1.download_button("⬇ 下载 .txt", res["txt_bytes"],
                                   file_name=res["stem"] + ".txt",
                                   mime="text/plain")
                with c2:
                    lines = res["txt_bytes"].decode().splitlines()
                    preview = "\n".join(lines[:20]) + f"\n… (共 {len(lines)} 行)"
                    st.code(preview, language=None)


# ═══════════════════════════════════════════════════════════════════════════════
#  Tab 2 – Stacked XRD plotter
# ═══════════════════════════════════════════════════════════════════════════════
with tab_plot:

    # ── Session state init ──────────────────────────────────────────────────
    if "datasets" not in st.session_state:
        st.session_state.datasets = []       # list of {name, x, y, color}
    if "imported_hashes" not in st.session_state:
        st.session_state.imported_hashes = set()  # content hashes already imported

    DEFAULT_COLORS = [
        "#000000", "#e41a1c", "#377eb8", "#4daf4a",
        "#984ea3", "#ff7f00", "#a65628", "#f781bf",
    ]

    # ── File upload ─────────────────────────────────────────────────────────
    st.caption("支持任意空白（空格/制表符）分隔的两列数值文件，自动跳过非数值行。")
    uploaded_files = st.file_uploader(
        "上传 TXT 文件（每个文件一条曲线，两列：2θ  强度）",
        type=["txt", "xy", "dat", "csv"],
        accept_multiple_files=True,
        key="plotter_upload",
    )

    if uploaded_files:
        for f in uploaded_files:
            raw_bytes = f.getvalue()
            file_hash = hash(raw_bytes)          # content-based dedup
            if file_hash not in st.session_state.imported_hashes:
                try:
                    x, y = load_txt(raw_bytes)
                    if len(x) > 0:
                        idx = len(st.session_state.datasets)
                        c = DEFAULT_COLORS[idx % len(DEFAULT_COLORS)]
                        st.session_state.datasets.append({
                            "name": os.path.splitext(f.name)[0],
                            "x": x,
                            "y": y,
                            "color":       c,
                            "label_color": c,   # default: same as line color
                        })
                        st.session_state.imported_hashes.add(file_hash)
                except Exception as e:
                    st.warning(f"无法解析 {f.name}: {e}")

    # ── Dataset table ────────────────────────────────────────────────────────
    if st.session_state.datasets:
        st.markdown("#### 数据集管理（从下到上排列，第 1 个在底部）")

        # Header row
        h0, h1, h2, h3, h4, h5 = st.columns([0.35, 2, 0.7, 0.7, 0.7, 0.4])
        h0.caption("#"); h1.caption("名称"); h2.caption("线色")
        h3.caption("字色"); h4.caption("点数"); h5.caption("")

        to_delete = []
        for i, d in enumerate(st.session_state.datasets):
            c_idx, c_name, c_color, c_lcolor, c_pts, c_del = st.columns([0.35, 2, 0.7, 0.7, 0.7, 0.4])
            c_idx.markdown(f"**{i + 1}**")
            new_name = c_name.text_input("名称", value=d["name"],
                                         key=f"name_{i}", label_visibility="collapsed")
            new_color = c_color.color_picker("线色", value=d.get("color", "#000000"),
                                             key=f"color_{i}", label_visibility="collapsed")
            new_lcolor = c_lcolor.color_picker("字色", value=d.get("label_color", d.get("color", "#000000")),
                                               key=f"lcolor_{i}", label_visibility="collapsed")
            c_pts.caption(f"{len(d['x'])} 点")
            if c_del.button("✕", key=f"del_{i}"):
                to_delete.append(i)

            st.session_state.datasets[i]["name"]        = new_name
            st.session_state.datasets[i]["color"]       = new_color
            st.session_state.datasets[i]["label_color"] = new_lcolor

        for i in reversed(to_delete):
            st.session_state.datasets.pop(i)

        if st.button("清空所有数据集", type="secondary"):
            st.session_state.datasets = []
            st.session_state.imported_hashes = set()
            st.rerun()

        st.divider()

        # ── Plot settings ─────────────────────────────────────────────────
        st.markdown("#### 图形设置")

        sc1, sc2, sc3 = st.columns(3)

        with sc1:
            x_label = st.text_input("X 轴标签", value="2θ (degree)")
            y_label = st.text_input("Y 轴标签", value="Intensity (a.u.)")

        with sc2:
            font_name = st.selectbox("字体", FONT_NAMES, index=0)
            st.caption("字号（Origin 规范：轴名 30 / 刻度 26 / 标签 22）")
            axis_fontsize  = st.slider("轴名字号",    12, 40, 30)
            tick_fontsize  = st.slider("刻度字号",    12, 40, 26)
            label_fontsize = st.slider("曲线标签字号", 10, 36, 22)

        with sc3:
            normalize = st.toggle("各曲线归一化 (0–1)", value=True,
                                  help="开启后每条曲线独立归一化到 [0,1]，量级不同的数据也能整齐堆叠")
            offset_factor = st.slider("曲线间距系数", 0.5, 3.0, 1.1, 0.1)
            line_width = st.slider("线宽 (pt)", 0.3, 3.0, 1.0, 0.1)
            fig_w = st.number_input("图宽 (inch)", 4.0, 20.0, 10.0, 0.5)

            # Target landscape ratio 1.42:1 (matching Origin reference 3390×2380)
            # height grows slightly with more curves but stays landscape
            n = len(st.session_state.datasets) or 1
            auto_h = round(fig_w / 1.42 + (n - 3) * 0.5, 1)
            auto_h = max(3.5, auto_h)
            auto_h = st.number_input("图高 (inch，自动推荐)", 3.0, 20.0,
                                     float(auto_h), 0.5,
                                     help=f"横向比例 1.42:1，当前 {n} 条曲线推荐 {auto_h} inch")
            fig_h = auto_h

        adv = st.expander("高级设置")
        with adv:
            dpi = st.select_slider("输出分辨率 (DPI)", [150, 200, 300, 600], value=300)
            label_x_frac = st.slider("标签 X 位置（0=左 1=右）", 0.0, 1.0, 0.97, 0.01,
                                     help="1.0=右框边，文字向左延伸，永远在框内")
            # Show actual output pixel size
            px_w = int(fig_w * dpi)
            px_h = int(fig_h * dpi)
            st.info(f"输出尺寸：{px_w} × {px_h} px  （{fig_w} × {fig_h} inch @ {dpi} DPI）")

        # ── Generate ─────────────────────────────────────────────────────
        if st.button("生成堆积图", type="primary"):
            datasets_for_plot = [
                {
                    "x": d["x"], "y": d["y"], "name": d["name"],
                    "color": d["color"],
                    "label_color": d.get("label_color", d["color"]),
                }
                for d in st.session_state.datasets
            ]

            # Interactive preview (plotly)
            preview_fig = make_plotly_preview(
                datasets_for_plot, x_label=x_label, y_label=y_label,
                offset_factor=offset_factor, normalize=normalize,
            )
            st.plotly_chart(preview_fig, use_container_width=True)

            # Publication figure (matplotlib)
            with st.spinner("正在渲染高分辨率图…"):
                try:
                    png_bytes = make_stacked_figure(
                        datasets_for_plot,
                        x_label=x_label,
                        y_label=y_label,
                        font_name=font_name,
                        axis_fontsize=axis_fontsize,
                        tick_fontsize=tick_fontsize,
                        label_fontsize=label_fontsize,
                        fig_width=fig_w,
                        fig_height=fig_h,
                        offset_factor=offset_factor,
                        line_width=line_width,
                        dpi=dpi,
                        label_x_frac=label_x_frac,
                        normalize=normalize,
                    )
                    st.image(png_bytes, caption="预览（PNG）", use_container_width=True)
                    st.download_button(
                        "⬇ 下载高分辨率 PNG",
                        data=png_bytes,
                        file_name="xrd_stacked.png",
                        mime="image/png",
                    )
                except Exception as e:
                    st.error(f"图形生成失败：{e}")
    else:
        st.info("请先上传至少一个 TXT 文件（来自 CIF 转换 Tab 或其他来源）。")
