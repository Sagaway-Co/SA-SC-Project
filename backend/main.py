"""
XRD Plotter API — FastAPI backend.
"""

import base64
import io
import os
import sys
import tempfile
import traceback

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel

# Allow importing sibling packages from the project root
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from plotter import FONT_NAMES, load_txt, make_stacked_figure
from cif2txt.xrd_sim import WAVELENGTHS, simulate
from cif2txt.bruker_raw import read_raw, write_raw

import numpy as np

# ── App setup ─────────────────────────────────────────────────────────────────

app = FastAPI(title="XRD Plotter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Pydantic models ───────────────────────────────────────────────────────────


class DatasetIn(BaseModel):
    name: str
    x: list[float]
    y: list[float]
    color: str = "#000000"
    label_color: str = "#000000"
    label_x: float | None = None
    label_y: float | None = None
    label_va: str | None = None


class PlotSettings(BaseModel):
    x_label: str = "2θ (degree)"
    y_label: str = "Intensity (a.u.)"
    font_name: str = "Times New Roman"
    axis_fontsize: int = 30
    tick_fontsize: int = 26
    label_fontsize: int = 22
    fig_width: float = 10.0
    fig_height: float = 7.5
    offset_factor: float = 1.1
    line_width: float = 1.0
    dpi: int = 300
    label_x_frac: float = 0.93
    normalize: bool = True


class PlotRequest(BaseModel):
    datasets: list[DatasetIn]
    settings: PlotSettings


# ── Endpoints ─────────────────────────────────────────────────────────────────


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/api/fonts")
def fonts() -> dict:
    return {"fonts": FONT_NAMES}


@app.post("/api/simulate")
async def api_simulate(
    file: UploadFile = File(...),
    wavelength: float = Form(1.54056),
    start: float = Form(5.0),
    end: float = Form(50.0),
    step: float = Form(0.02),
    fwhm: float = Form(0.1),
    scale: float = Form(10000.0),
) -> dict:
    """Simulate XRD pattern from an uploaded CIF file."""
    cif_bytes = await file.read()

    warnings_out: list[str] = []

    # Write CIF to a temp file
    with tempfile.NamedTemporaryFile(suffix=".cif", delete=False) as tmp_cif:
        tmp_cif.write(cif_bytes)
        cif_path = tmp_cif.name

    try:
        two_theta_arr, intensity_arr = simulate(
            cif_path=cif_path,
            wavelength=wavelength,
            two_theta_start=start,
            two_theta_end=end,
            step=step,
            fwhm=fwhm,
            scale=scale,
        )
    except Exception as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    finally:
        os.unlink(cif_path)

    two_theta_list = two_theta_arr.tolist()
    intensity_list = intensity_arr.tolist()

    # Build TXT representation
    lines = ["# two_theta  intensity"]
    for tt, inten in zip(two_theta_list, intensity_list):
        lines.append(f"{tt:.4f}  {inten:.4f}")
    txt = "\n".join(lines)

    # Write RAW file
    with tempfile.NamedTemporaryFile(suffix=".raw", delete=False) as tmp_raw:
        raw_path = tmp_raw.name

    try:
        write_raw(two_theta_list, intensity_list, wavelength, raw_path)
        with open(raw_path, "rb") as fh:
            raw_bytes = fh.read()
    finally:
        os.unlink(raw_path)

    raw_b64 = base64.b64encode(raw_bytes).decode("ascii")

    return {
        "two_theta": two_theta_list,
        "intensity": intensity_list,
        "raw_b64": raw_b64,
        "txt": txt,
        "warnings": warnings_out,
    }


@app.post("/api/plot")
async def api_plot(req: PlotRequest):
    """Generate a stacked XRD plot PNG from dataset JSON."""
    datasets_list: list[dict] = []
    for ds in req.datasets:
        d: dict = {
            "name": ds.name,
            "x": np.array(ds.x),
            "y": np.array(ds.y),
            "color": ds.color,
            "label_color": ds.label_color,
        }
        if ds.label_x is not None:
            d["label_x"] = ds.label_x
        if ds.label_y is not None:
            d["label_y"] = ds.label_y
        if ds.label_va is not None:
            d["label_va"] = ds.label_va
        datasets_list.append(d)

    try:
        png_bytes = make_stacked_figure(datasets_list, **req.settings.model_dump())
    except Exception as exc:
        raise HTTPException(status_code=422, detail=traceback.format_exc())

    return StreamingResponse(io.BytesIO(png_bytes), media_type="image/png")


@app.post("/api/raw-to-txt")
async def api_raw_to_txt(file: UploadFile = File(...)) -> dict:
    """Convert a Bruker RAW file to a plain-text two-column format."""
    raw_bytes = await file.read()

    with tempfile.NamedTemporaryFile(suffix=".raw", delete=False) as tmp:
        tmp.write(raw_bytes)
        raw_path = tmp.name

    try:
        result = read_raw(raw_path)
    except Exception as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    finally:
        os.unlink(raw_path)

    two_theta = result["two_theta"]
    intensity = result["intensity"]
    wavelength = result["wavelength"]
    n_steps = len(two_theta)
    start = two_theta[0] if two_theta else 0.0
    step = (two_theta[1] - two_theta[0]) if n_steps > 1 else 0.0

    lines = ["# two_theta  intensity"]
    for tt, inten in zip(two_theta, intensity):
        lines.append(f"{tt:.4f}  {inten:.4f}")
    txt = "\n".join(lines)

    return {
        "txt": txt,
        "wavelength": wavelength,
        "n_steps": n_steps,
        "start": start,
        "step": step,
    }
