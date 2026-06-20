import React, { useState, useEffect, useCallback, useRef } from 'react';
import PlotCanvas from './components/PlotCanvas';
import DatasetManager from './components/DatasetManager';
import SettingsPanel from './components/SettingsPanel';
import FileUpload from './components/FileUpload';
import { simulateCIF, generatePlot, rawToTxt, getFonts } from './api/client';
import type { Dataset, PlotSettings } from './types';
import { DEFAULT_SETTINGS } from './types';

const COLOR_CYCLE = [
  '#000000',
  '#e41a1c',
  '#377eb8',
  '#4daf4a',
  '#984ea3',
  '#ff7f00',
  '#a65628',
  '#f781bf',
];

function parseXYText(text: string): { x: number[]; y: number[] } {
  const x: number[] = [];
  const y: number[] = [];
  const lines = text.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('!')) continue;
    const parts = trimmed.split(/[\s,;]+/);
    if (parts.length < 2) continue;
    const xi = parseFloat(parts[0]);
    const yi = parseFloat(parts[1]);
    if (!isNaN(xi) && !isNaN(yi)) {
      x.push(xi);
      y.push(yi);
    }
  }
  return { x, y };
}

export default function App() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [settings, setSettings] = useState<PlotSettings>(DEFAULT_SETTINGS);
  const [fonts, setFonts] = useState<string[]>([]);
  const [pngBlob, setPngBlob] = useState<Blob | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const prevPngUrl = useRef<string | null>(null);

  useEffect(() => {
    getFonts()
      .then(setFonts)
      .catch(() => {});
  }, []);

  useEffect(() => {
    return () => {
      if (prevPngUrl.current) URL.revokeObjectURL(prevPngUrl.current);
    };
  }, []);

  const nextColor = useCallback(
    (idx: number) => COLOR_CYCLE[idx % COLOR_CYCLE.length],
    []
  );

  const handleFile = useCallback(
    async (file: File, ext: string) => {
      setIsLoading(true);
      setError(null);
      setWarnings([]);
      try {
        const baseName = file.name.replace(/\.[^.]+$/, '');
        const colorIdx = datasets.length;
        const color = nextColor(colorIdx);

        if (ext === '.cif') {
          const result = await simulateCIF(file, {
            wavelength: 1.5406,
            start: 5,
            end: 90,
            step: 0.02,
            fwhm: 0.1,
          });
          if (result.warnings && result.warnings.length > 0) {
            setWarnings(result.warnings);
          }
          const ds: Dataset = {
            id: crypto.randomUUID(),
            name: baseName,
            x: result.two_theta,
            y: result.intensity,
            color,
            labelColor: color,
          };
          setDatasets((prev) => [...prev, ds]);
        } else if (ext === '.raw') {
          const result = await rawToTxt(file);
          const { x, y } = parseXYText(result.txt);
          const ds: Dataset = {
            id: crypto.randomUUID(),
            name: baseName,
            x,
            y,
            color,
            labelColor: color,
          };
          setDatasets((prev) => [...prev, ds]);
        } else {
          const text = await file.text();
          const { x, y } = parseXYText(text);
          if (x.length === 0) throw new Error('No valid data columns found in file.');
          const ds: Dataset = {
            id: crypto.randomUUID(),
            name: baseName,
            x,
            y,
            color,
            labelColor: color,
          };
          setDatasets((prev) => [...prev, ds]);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setIsLoading(false);
      }
    },
    [datasets.length, nextColor]
  );

  const handleLabelMove = useCallback(
    (id: string, x: number, y: number, va: 'bottom' | 'top') => {
      setDatasets((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, labelX: x, labelY: y, labelVa: va } : d
        )
      );
    },
    []
  );

  const handleGeneratePng = useCallback(async () => {
    if (datasets.length === 0) return;
    setIsGenerating(true);
    setError(null);
    try {
      const blob = await generatePlot(datasets, settings, []);
      if (prevPngUrl.current) URL.revokeObjectURL(prevPngUrl.current);
      const url = URL.createObjectURL(blob);
      prevPngUrl.current = url;
      setPngBlob(blob);
      setPngUrl(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsGenerating(false);
    }
  }, [datasets, settings]);

  return (
    <div className="app">
      <div className="left-panel">
        <div className="left-panel-header">
          <div className="app-wordmark">
            <span className="app-wordmark-xrd">XRD</span>
            <span className="app-wordmark-plotter">Plotter</span>
          </div>
          <p className="app-tagline">Stacked diffraction patterns</p>
          <canvas className="peak-canvas" width="340" height="36" ref={(el) => drawPeaks(el)} />
        </div>

        <FileUpload onFile={handleFile} isLoading={isLoading} />

        {warnings.length > 0 && (
          <div className="warning-box">
            <strong>Warnings</strong>
            <ul>
              {warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <div className="error-box">
            <strong>Error</strong>
            <p>{error}</p>
          </div>
        )}

        <DatasetManager datasets={datasets} onChange={setDatasets} />
        <SettingsPanel settings={settings} fonts={fonts} onChange={setSettings} />

        <div className="action-row">
          <button
            onClick={handleGeneratePng}
            disabled={isGenerating || datasets.length === 0}
            className="btn-primary"
          >
            {isGenerating ? (
              <>
                <span className="btn-spinner" />
                Generating…
              </>
            ) : (
              'Export PNG'
            )}
          </button>
          {pngUrl && pngBlob && (
            <a href={pngUrl} download="xrd_stacked.png" className="download-btn">
              Download PNG
            </a>
          )}
        </div>

        {pngUrl && (
          <div className="png-preview-card">
            <div className="png-preview-label">Preview</div>
            <img src={pngUrl} alt="Generated XRD plot" className="png-preview-img" />
          </div>
        )}
      </div>

      <div className="right-panel">
        <div className="plot-area">
          <div className="plot-header">
            <span className="plot-header-title">Interactive Preview</span>
            {datasets.length > 0 && (
              <span className="plot-header-hint">
                Drag labels to reposition — positions carry through to PNG export
              </span>
            )}
          </div>
          <div className="plot-container">
            <PlotCanvas
              datasets={datasets}
              settings={settings}
              onLabelMove={handleLabelMove}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function drawPeaks(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Draw a stylised diffraction pattern silhouette
  ctx.strokeStyle = 'rgba(200, 137, 58, 0.55)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();

  const peaks = [
    { x: 0.08, h: 0.35 },
    { x: 0.14, h: 0.65 },
    { x: 0.22, h: 0.42 },
    { x: 0.31, h: 0.88 },
    { x: 0.38, h: 0.25 },
    { x: 0.45, h: 0.55 },
    { x: 0.52, h: 0.72 },
    { x: 0.59, h: 0.18 },
    { x: 0.65, h: 0.44 },
    { x: 0.73, h: 0.61 },
    { x: 0.80, h: 0.30 },
    { x: 0.88, h: 0.48 },
    { x: 0.94, h: 0.22 },
  ];

  const sigma = 0.012;
  const steps = 200;
  for (let j = 0; j <= steps; j++) {
    const t = j / steps;
    let v = 0.05;
    for (const p of peaks) {
      const d = t - p.x;
      v += p.h * Math.exp((-d * d) / (2 * sigma * sigma));
    }
    v = Math.min(v, 1.0);
    const px = t * W;
    const py = H - v * (H - 4) - 2;
    if (j === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
}
