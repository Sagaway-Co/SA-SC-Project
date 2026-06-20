# SA-SC-Project — XRD Powder Diffraction Plotter

CIF → RAW → TXT converter with interactive stacked pattern plotter.

## Features
- CIF simulation via pymatgen/gemmi → Bruker RAW v1 + TXT export
- Interactive stacked XRD plot with **draggable curve labels**
- Publication-quality PNG (300 DPI, Origin-style axes)
- Multi-dataset management with per-curve color and label control

## Quick Start (LAN deployment)
```bash
git clone https://github.com/Sagaway-Co/SA-SC-Project
cd SA-SC-Project
docker compose up -d --build
```
Access: **http://10.1.2.22** (replace with server IP)

## Development
```bash
# Backend (FastAPI)
cd backend && pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API docs: http://localhost:8000/docs

# Frontend (React/TS)
cd frontend && npm install && npm run dev
# Dev server: http://localhost:5173
```

## Architecture
- Backend: FastAPI + Python (pymatgen, gemmi, matplotlib)
- Frontend: React + TypeScript + Vite + Plotly.js
- Deployment: Docker Compose (nginx on port 80)
