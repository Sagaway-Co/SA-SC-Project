"""
CIF → simulated powder XRD pattern.

Primary engine  : pymatgen XRDCalculator (fast, symmetry-aware)
Fallback engine : gemmi structure factor calculation (handles complex/disordered CIFs)

Both engines apply a pseudo-Voigt peak profile to produce a continuous
intensity curve on a regular 2θ grid — matching Mercury's simulation output.
"""

import math
import warnings
import numpy as np


WAVELENGTHS = {
    "CuKa":  1.5418,    # weighted average (Ka1 + Ka2)
    "CuKa1": 1.54056,
    "CuKa2": 1.54439,
    "MoKa":  0.7107,
    "MoKa1": 0.70930,
    "CoKa":  1.7902,
    "FeKa":  1.9373,
}


def _pseudo_voigt(x: np.ndarray, center: float, fwhm: float, eta: float = 0.5) -> np.ndarray:
    """Pseudo-Voigt peak: eta * Lorentzian + (1-eta) * Gaussian."""
    sigma = fwhm / (2 * math.sqrt(2 * math.log(2)))
    gamma = fwhm / 2.0
    gauss = np.exp(-((x - center) ** 2) / (2 * sigma ** 2))
    lor = 1.0 / (1.0 + ((x - center) / gamma) ** 2)
    return eta * lor + (1.0 - eta) * gauss


def _lorentz_polarization(two_theta_rad: float) -> float:
    """Lorentz-polarization correction factor."""
    cos_t = math.cos(two_theta_rad)
    sin_t = math.sin(two_theta_rad / 2)
    if sin_t < 1e-9:
        return 1.0
    return (1 + cos_t ** 2) / (sin_t ** 2 * math.cos(two_theta_rad / 2))


def _build_spectrum(
    peaks: list[tuple[float, float]],   # list of (two_theta_deg, scaled_intensity)
    two_theta: np.ndarray,
    fwhm: float,
    scale: float,
) -> np.ndarray:
    intensity = np.zeros(len(two_theta))
    for peak_2t, peak_i in peaks:
        intensity += peak_i * _pseudo_voigt(two_theta, peak_2t, fwhm)
    max_i = intensity.max()
    if max_i > 0:
        intensity = intensity / max_i * scale
    return intensity


# ── pymatgen engine ──────────────────────────────────────────────────────────

def _simulate_pymatgen(cif_path, wavelength, two_theta_start, two_theta_end, fwhm, scale, two_theta):
    from pymatgen.io.cif import CifParser
    from pymatgen.analysis.diffraction.xrd import XRDCalculator

    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        parser = CifParser(cif_path, occupancy_tolerance=1.05)
        structs = parser.parse_structures(primitive=False)

    if not structs:
        raise ValueError(f"No structure parsed from {cif_path}")

    struct = structs[0]
    pattern = None

    for symprec in (0.1, 0.3, 1.0, 2.0):
        try:
            calc = XRDCalculator(wavelength=wavelength, symprec=symprec)
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                pattern = calc.get_pattern(struct, two_theta_range=(two_theta_start, two_theta_end))
            break
        except Exception:
            continue

    if pattern is None:
        raise RuntimeError("pymatgen symmetry analysis failed")

    peaks = list(zip(pattern.x, pattern.y))
    return _build_spectrum(peaks, two_theta, fwhm, scale)


# ── gemmi engine ─────────────────────────────────────────────────────────────

def _get_hkl_multiplicity(sg, hkl: list) -> int:
    """Count all equivalent hkl (including Friedel pairs) under space group."""
    equiv: set[tuple] = set()
    for op in sg.operations():
        h2 = tuple(op.apply_to_hkl(hkl))
        equiv.add(h2)
        equiv.add((-h2[0], -h2[1], -h2[2]))
    return len(equiv)


def _simulate_gemmi(cif_path, wavelength, two_theta_start, two_theta_end, fwhm, scale, two_theta):
    import gemmi

    doc = gemmi.cif.read(cif_path)
    block = doc.sole_block()
    ss = gemmi.make_small_structure_from_block(block)

    sg_tag = (
        block.find_value("_space_group_name_H-M_alt")
        or block.find_value("_symmetry_space_group_name_H-M")
        or "P 1"
    )
    sg_name = sg_tag.strip("' ")
    sg = gemmi.find_spacegroup_by_name(sg_name)
    if sg is None:
        sg = gemmi.find_spacegroup_by_number(1)  # P1 fallback

    dmin = wavelength / (2 * math.sin(math.radians(two_theta_end / 2)))
    hkls = gemmi.make_miller_array(ss.cell, sg, dmin)

    sfc = gemmi.StructureFactorCalculatorX(ss.cell)
    peaks: list[tuple[float, float]] = []

    for hkl_arr in hkls:
        h = list(hkl_arr)
        d = ss.cell.calculate_d(h)
        sin_theta_over_lambda = 1.0 / (2 * d)
        two_theta_deg = math.degrees(2 * math.asin(wavelength / (2 * d)))

        if not (two_theta_start <= two_theta_deg <= two_theta_end):
            continue

        try:
            f = sfc.calculate_sf_from_small_structure(ss, h)
        except Exception:
            continue

        f2 = abs(f) ** 2
        mult = _get_hkl_multiplicity(sg, h)
        lp = _lorentz_polarization(math.radians(two_theta_deg))

        peaks.append((two_theta_deg, mult * f2 * lp))

    if not peaks:
        raise RuntimeError("No reflections found in 2θ range")

    return _build_spectrum(peaks, two_theta, fwhm, scale)


# ── Public API ────────────────────────────────────────────────────────────────

def simulate(
    cif_path: str,
    wavelength: float = 1.54056,
    two_theta_start: float = 5.0,
    two_theta_end: float = 50.0,
    step: float = 0.02,
    fwhm: float = 0.1,
    scale: float = 10000.0,
) -> tuple[np.ndarray, np.ndarray]:
    """Simulate a powder XRD pattern from a CIF file.

    Returns (two_theta, intensity) as numpy arrays on a regular grid.
    Tries pymatgen first; falls back to gemmi for complex/disordered structures.

    Args:
        cif_path: Path to the CIF file.
        wavelength: X-ray wavelength in Å (default Cu Kα1 = 1.54056).
        two_theta_start: Start angle in degrees.
        two_theta_end:   End angle in degrees.
        step:            Step size in degrees.
        fwhm:            Peak FWHM in degrees (default 0.1).
        scale:           Max intensity of the strongest peak after normalisation.
    """
    two_theta = np.arange(two_theta_start, two_theta_end + step / 2, step)

    # Try pymatgen first
    pymatgen_error = None
    try:
        intensity = _simulate_pymatgen(cif_path, wavelength, two_theta_start, two_theta_end, fwhm, scale, two_theta)
        return two_theta, intensity
    except ImportError:
        pymatgen_error = "pymatgen not installed"
    except Exception as exc:
        pymatgen_error = str(exc)

    print(f"  [WARNING] pymatgen engine failed: {pymatgen_error}")
    print(f"  [WARNING] Falling back to gemmi engine.")
    print(f"  [WARNING] This CIF may contain disorder or missing atoms.")
    print(f"  [WARNING] Peak POSITIONS will be accurate, but relative INTENSITIES")
    print(f"  [WARNING] may differ from Mercury. Verify against Mercury before use.")

    # Fallback: gemmi
    gemmi_error = None
    try:
        intensity = _simulate_gemmi(cif_path, wavelength, two_theta_start, two_theta_end, fwhm, scale, two_theta)
        print(f"  [WARNING] gemmi engine completed — please verify output against Mercury.")
        return two_theta, intensity
    except ImportError:
        gemmi_error = "gemmi not installed"
    except Exception as exc:
        gemmi_error = str(exc)

    raise RuntimeError(
        f"Could not simulate XRD pattern.\n"
        f"  pymatgen: {pymatgen_error}\n"
        f"  gemmi   : {gemmi_error}\n\n"
        "Install dependencies:  pip install pymatgen gemmi"
    )
