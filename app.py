import io
import os
import sys
import tempfile
import warnings

import plotly.graph_objects as go
import streamlit as st

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "cif2txt"))
from bruker_raw import read_raw, write_raw
from xrd_sim import WAVELENGTHS, simulate

st.set_page_config(page_title="CIF → RAW → TXT", layout="wide")
st.title("CIF → RAW → TXT 粉末衍射转换器")

# ── Sidebar: parameters ───────────────────────────────────────────────────────
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

# ── Upload ────────────────────────────────────────────────────────────────────
uploaded = st.file_uploader("上传 CIF 文件", type=["cif"])

if not uploaded:
    st.info("请上传一个 CIF 文件开始转换。")
    st.stop()

# ── Run pipeline ──────────────────────────────────────────────────────────────
run_btn = st.button("开始转换", type="primary")

if "result" not in st.session_state:
    st.session_state.result = None
if "cif_name" not in st.session_state:
    st.session_state.cif_name = None

if run_btn:
    with tempfile.TemporaryDirectory() as tmpdir:
        cif_path = os.path.join(tmpdir, uploaded.name)
        with open(cif_path, "wb") as f:
            f.write(uploaded.getvalue())

        status = st.status("正在模拟 XRD 图谱…", expanded=True)
        warnings_log = []

        # Capture warnings
        import logging
        log_stream = io.StringIO()
        handler = logging.StreamHandler(log_stream)
        logging.getLogger().addHandler(handler)

        try:
            with warnings.catch_warnings(record=True) as caught_warnings:
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
            for w in caught_warnings:
                warnings_log.append(str(w.message))
        except Exception as e:
            status.update(label="模拟失败", state="error")
            st.error(f"转换失败：{e}")
            st.stop()
        finally:
            logging.getLogger().removeHandler(handler)

        # Build RAW bytes in memory
        raw_buf = io.BytesIO()
        raw_path = os.path.join(tmpdir, "pattern.raw")
        write_raw(list(two_theta), list(intensity), wavelength, raw_path)
        with open(raw_path, "rb") as f:
            raw_bytes = f.read()

        # Build TXT bytes in memory
        txt_lines = [f"{t:.4f}  {i:.4f}\n" for t, i in zip(two_theta, intensity)]
        txt_bytes = "".join(txt_lines).encode()

        status.update(label="转换完成 ✓", state="complete")

        st.session_state.result = {
            "two_theta": list(two_theta),
            "intensity": list(intensity),
            "raw_bytes": raw_bytes,
            "txt_bytes": txt_bytes,
            "warnings": warnings_log,
            "stem": os.path.splitext(uploaded.name)[0],
        }
        st.session_state.cif_name = uploaded.name

# ── Display results ───────────────────────────────────────────────────────────
res = st.session_state.result
if res is None:
    st.stop()

if res["warnings"]:
    with st.expander("⚠️ 精度警告（使用了 gemmi fallback）", expanded=True):
        st.warning(
            "该 CIF 结构复杂或含无序原子，pymatgen 对称分析失败，已切换到 gemmi 引擎。\n"
            "**峰位置精确，相对强度可能与 Mercury 有差异，请对照 Mercury 验证。**"
        )
        for w in res["warnings"]:
            st.caption(w)

tab_plot, tab_raw, tab_txt = st.tabs(["📈 衍射图谱", "📦 RAW 文件", "📄 TXT 文件"])

# ── Tab 1: plot ───────────────────────────────────────────────────────────────
with tab_plot:
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=res["two_theta"],
        y=res["intensity"],
        mode="lines",
        line=dict(color="#2563eb", width=1),
        name="强度",
    ))
    fig.update_layout(
        xaxis_title="2θ (°)",
        yaxis_title="强度 (相对)",
        hovermode="x unified",
        height=450,
        margin=dict(l=60, r=20, t=20, b=60),
    )
    st.plotly_chart(fig, use_container_width=True)

    col_a, col_b, col_c = st.columns(3)
    col_a.metric("数据点数", len(res["two_theta"]))
    col_b.metric("2θ 范围", f"{res['two_theta'][0]:.2f}° – {res['two_theta'][-1]:.2f}°")
    col_c.metric("最大强度", f"{max(res['intensity']):.0f}")

# ── Tab 2: RAW ────────────────────────────────────────────────────────────────
with tab_raw:
    st.caption(
        "Bruker RAW v1 二进制格式（与 Mercury 导出格式相同），可直接在 JADE 中打开。"
    )
    col1, col2 = st.columns([1, 2])
    col1.metric("文件大小", f"{len(res['raw_bytes'])} bytes")
    col1.metric(
        "格式",
        "Bruker RAW v1",
        help="magic: RAW1.01 — 与 CCDC/Mercury 导出完全兼容",
    )
    col1.download_button(
        label="⬇ 下载 .raw 文件",
        data=res["raw_bytes"],
        file_name=res["stem"] + ".raw",
        mime="application/octet-stream",
    )

    # Show hex preview
    with col2:
        st.caption("文件头（前 32 bytes，hex）")
        hex_preview = " ".join(f"{b:02x}" for b in res["raw_bytes"][:32])
        st.code(hex_preview, language=None)

        # Show first few data points decoded
        import struct
        n = struct.unpack_from("<i", res["raw_bytes"], 0x2CC)[0]
        start_v = struct.unpack_from("<d", res["raw_bytes"], 0x2D8)[0]
        step_v = struct.unpack_from("<d", res["raw_bytes"], 0x378)[0]
        wl_v = struct.unpack_from("<d", res["raw_bytes"], 0x270)[0]
        st.caption("RAW 头信息")
        st.code(
            f"wavelength : {wl_v:.5f} Å\n"
            f"2θ start   : {start_v:.4f}°\n"
            f"step       : {step_v:.4f}°\n"
            f"n_steps    : {n}",
            language=None,
        )

# ── Tab 3: TXT ────────────────────────────────────────────────────────────────
with tab_txt:
    st.caption("两列格式（2θ  强度），与 JADE 导出格式一致，可直接导入 Excel。")
    col1, col2 = st.columns([1, 2])
    col1.metric("行数", len(res["two_theta"]))
    col1.metric("文件大小", f"{len(res['txt_bytes'])} bytes")
    col1.download_button(
        label="⬇ 下载 .txt 文件",
        data=res["txt_bytes"],
        file_name=res["stem"] + ".txt",
        mime="text/plain",
    )
    with col2:
        preview_lines = res["txt_bytes"].decode().splitlines()
        preview = "\n".join(preview_lines[:20]) + f"\n… (共 {len(preview_lines)} 行)"
        st.code(preview, language=None)
