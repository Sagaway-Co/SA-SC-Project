"""
Bruker RAW v1 format reader and writer.

Format reverse-engineered from CCDC/Mercury exports (magic: RAW1.01).
Key offsets (all little-endian):
  0x000  8B   version string "RAW1.01\\0"
  0x00C  i32  number of ranges (always 1 for simulated patterns)
  0x270  f64  wavelength (Å)
  0x2CC  i32  number of steps
  0x2D8  f64  two-theta start (degrees)
  0x378  f64  step size (degrees)
  0x3B8  f64  wavelength copy (alpha1)
  0x3F8  f32* intensity data (n_steps floats)
"""

import struct

MAGIC = b"RAW1.01\x00"
HEADER_SIZE = 0x3F8  # 1016 bytes — data begins here

_OFF_NRANGES = 0x00C
_OFF_WAVELENGTH = 0x270
_OFF_NSTEPS = 0x2CC
_OFF_START = 0x2D8
_OFF_STEP = 0x378
_OFF_WAVELENGTH2 = 0x3B8


def read_raw(path: str) -> dict:
    """Read a Bruker RAW v1 file.

    Returns a dict with keys: wavelength, two_theta (list), intensity (list).
    """
    with open(path, "rb") as fh:
        data = fh.read()

    if data[:8] != MAGIC:
        raise ValueError(f"Not a Bruker RAW v1 file (got {data[:8]!r})")

    wavelength = struct.unpack_from("<d", data, _OFF_WAVELENGTH)[0]
    n_steps = struct.unpack_from("<i", data, _OFF_NSTEPS)[0]
    start = struct.unpack_from("<d", data, _OFF_START)[0]
    step = struct.unpack_from("<d", data, _OFF_STEP)[0]

    data_offset = len(data) - n_steps * 4
    if data_offset < HEADER_SIZE:
        raise ValueError("RAW file appears truncated")

    intensities = list(struct.unpack_from(f"<{n_steps}f", data, data_offset))
    two_theta = [start + i * step for i in range(n_steps)]

    return {"wavelength": wavelength, "two_theta": two_theta, "intensity": intensities}


def write_raw(two_theta: list, intensity: list, wavelength: float, path: str) -> None:
    """Write a Bruker RAW v1 file compatible with JADE."""
    n_steps = len(intensity)
    start = two_theta[0]
    step = two_theta[1] - two_theta[0] if n_steps > 1 else 0.02

    header = bytearray(HEADER_SIZE)
    header[0:8] = MAGIC
    struct.pack_into("<i", header, _OFF_NRANGES, 1)
    struct.pack_into("<d", header, _OFF_WAVELENGTH, wavelength)
    struct.pack_into("<i", header, _OFF_NSTEPS, n_steps)
    struct.pack_into("<d", header, _OFF_START, start)
    struct.pack_into("<d", header, _OFF_STEP, step)
    struct.pack_into("<d", header, _OFF_WAVELENGTH2, wavelength)

    # Mark as exported by this tool (same field Mercury uses at 0x6C)
    label = b"Exported by cif2txt"
    header[0x6C : 0x6C + len(label)] = label

    with open(path, "wb") as fh:
        fh.write(bytes(header))
        fh.write(struct.pack(f"<{n_steps}f", *[float(v) for v in intensity]))
