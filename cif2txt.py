#!/usr/bin/env python3
"""
cif2txt — CIF to TXT powder diffraction pattern converter.

Pipeline: CIF → (simulate XRD) → .raw (Bruker RAW v1) → .txt (2θ / intensity)

Usage:
    python cif2txt.py crystal.cif [options]
    python cif2txt.py --from-raw pattern.raw [options]

The .raw file is written as an intermediate step so it can be loaded
directly into JADE for verification.
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "cif2txt"))

from bruker_raw import read_raw, write_raw
from xrd_sim import WAVELENGTHS, simulate


def write_txt(two_theta, intensity, path: str) -> None:
    """Write two-column TXT file matching JADE export format."""
    with open(path, "w") as fh:
        for t, i in zip(two_theta, intensity):
            fh.write(f"{t:.4f}  {i:.4f}\n")


def parse_args():
    p = argparse.ArgumentParser(
        description="Convert CIF to TXT powder diffraction pattern (via Bruker RAW v1)"
    )
    source = p.add_mutually_exclusive_group(required=True)
    source.add_argument("cif", nargs="?", help="Input CIF file")
    source.add_argument("--from-raw", metavar="RAW", help="Skip simulation, convert existing RAW to TXT")

    p.add_argument("-o", "--output", metavar="TXT", help="Output TXT file (default: <input>.txt)")
    p.add_argument("--raw-out", metavar="RAW", help="Output RAW file (default: <input>.raw)")

    sim = p.add_argument_group("simulation parameters (ignored with --from-raw)")
    sim.add_argument("--wavelength", type=float, default=1.54056,
                     metavar="Å", help="X-ray wavelength in Å (default: 1.54056, Cu Kα1)")
    sim.add_argument("--source", choices=list(WAVELENGTHS), metavar="SOURCE",
                     help="Named X-ray source (overrides --wavelength). Options: " + ", ".join(WAVELENGTHS))
    sim.add_argument("--start", type=float, default=5.0, metavar="DEG",
                     help="2θ start in degrees (default: 5.0)")
    sim.add_argument("--end", type=float, default=50.0, metavar="DEG",
                     help="2θ end in degrees (default: 50.0)")
    sim.add_argument("--step", type=float, default=0.02, metavar="DEG",
                     help="2θ step size in degrees (default: 0.02)")
    sim.add_argument("--fwhm", type=float, default=0.1, metavar="DEG",
                     help="Peak FWHM in degrees (default: 0.1)")
    sim.add_argument("--scale", type=float, default=10000.0,
                     help="Max intensity after normalisation (default: 10000)")

    return p.parse_args()


def main():
    args = parse_args()

    # ── From-RAW mode ─────────────────────────────────────────────────────────
    if args.from_raw:
        raw_path = args.from_raw
        print(f"Reading RAW: {raw_path}")
        result = read_raw(raw_path)
        two_theta = result["two_theta"]
        intensity = result["intensity"]

        txt_path = args.output or os.path.splitext(raw_path)[0] + ".txt"
        write_txt(two_theta, intensity, txt_path)
        print(f"Written TXT: {txt_path}  ({len(two_theta)} points, "
              f"2θ {two_theta[0]:.4f}°–{two_theta[-1]:.4f}°)")
        return

    # ── CIF mode ──────────────────────────────────────────────────────────────
    cif_path = args.cif
    if not os.path.isfile(cif_path):
        sys.exit(f"Error: CIF file not found: {cif_path}")

    stem = os.path.splitext(cif_path)[0]
    raw_path = args.raw_out or stem + ".raw"
    txt_path = args.output or stem + ".txt"

    wavelength = WAVELENGTHS[args.source] if args.source else args.wavelength

    print(f"Simulating XRD pattern from: {cif_path}")
    print(f"  Wavelength : {wavelength} Å")
    print(f"  2θ range   : {args.start}° – {args.end}°, step {args.step}°")
    print(f"  Peak FWHM  : {args.fwhm}°")

    two_theta, intensity = simulate(
        cif_path,
        wavelength=wavelength,
        two_theta_start=args.start,
        two_theta_end=args.end,
        step=args.step,
        fwhm=args.fwhm,
        scale=args.scale,
    )

    write_raw(list(two_theta), list(intensity), wavelength, raw_path)
    print(f"Written RAW: {raw_path}")

    write_txt(two_theta, intensity, txt_path)
    print(f"Written TXT: {txt_path}  ({len(two_theta)} points)")


if __name__ == "__main__":
    main()
