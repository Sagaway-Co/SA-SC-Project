import React, { useEffect, useRef, useCallback } from 'react';
import Plotly from 'plotly.js-dist-min';
import type { Dataset, PlotSettings } from '../types';

interface Props {
  datasets: Dataset[];
  settings: PlotSettings;
  onLabelMove: (id: string, x: number, y: number, va: 'bottom' | 'top') => void;
}

function normalizeY(y: number[], doNorm: boolean): number[] {
  if (y.length === 0) return [];
  if (!doNorm) {
    const lo = Math.min(...y);
    return y.map((v) => v - lo);
  }
  const lo = Math.min(...y);
  const hi = Math.max(...y);
  return hi > lo ? y.map((v) => (v - lo) / (hi - lo)) : new Array(y.length).fill(0);
}

function computeOffsets(datasets: Dataset[], settings: PlotSettings): number[] {
  const offsets: number[] = [];
  let cur = 0;
  datasets.forEach((d) => {
    offsets.push(cur);
    const yn = normalizeY(d.y, settings.normalize);
    const yMax = yn.length > 0 ? Math.max(...yn) : 1;
    cur += yMax * settings.offsetFactor;
  });
  return offsets;
}

function findBestLabelX(x: number[], yNorm: number[], frac: number): number {
  if (x.length === 0) return 0;
  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  const labelX = xMin + frac * (xMax - xMin);
  const yMax = Math.max(...yNorm);
  const HIGH = 0.6 * yMax;
  for (let i = x.length - 1; i >= 0; i--) {
    if (x[i] <= labelX && yNorm[i] <= HIGH) return x[i];
  }
  return labelX;
}

export default function PlotCanvas({ datasets, settings, onLabelMove }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const buildFigure = useCallback(() => {
    const offsets = computeOffsets(datasets, settings);
    const totalHeight = offsets.length > 0 ? offsets[offsets.length - 1] + 1 : 1;

    const traces = datasets.map((d, i) => {
      const yNorm = normalizeY(d.y, settings.normalize);
      return {
        x: d.x,
        y: yNorm.map((v) => v + offsets[i]),
        type: 'scatter' as const,
        mode: 'lines' as const,
        name: d.name,
        line: { color: d.color, width: settings.lineWidth },
        showlegend: false,
      };
    });

    const annotations = datasets.map((d, i) => {
      const yNorm = normalizeY(d.y, settings.normalize);
      const yMax = yNorm.length > 0 ? Math.max(...yNorm) : 1;
      const ax = d.labelX ?? findBestLabelX(d.x, yNorm, settings.labelXFrac);
      const ay = d.labelY != null ? d.labelY + offsets[i] : offsets[i] + yMax * 1.04;
      return {
        x: ax,
        y: ay,
        text: d.name,
        showarrow: false,
        font: { color: d.labelColor, size: settings.labelFontsize * 0.7 },
        xanchor: 'right' as const,
        yanchor: (d.labelVa === 'top' ? 'top' : 'bottom') as 'top' | 'bottom',
        captureevents: true,
      };
    });

    const allX = datasets.flatMap((d) => d.x);
    const xMin = allX.length > 0 ? Math.min(...allX) : 0;
    const xMax = allX.length > 0 ? Math.max(...allX) : 100;

    const layout = {
      xaxis: {
        title: { text: settings.xLabel, font: { size: settings.axisFontsize * 0.7 } },
        range: [xMin, xMax],
        ticks: 'outside' as const,
        mirror: 'allticks' as const,
        showline: true,
        tickfont: { size: settings.tickFontsize * 0.7 },
      },
      yaxis: {
        title: { text: settings.yLabel, font: { size: settings.axisFontsize * 0.7 } },
        showticklabels: false,
        ticks: '' as const,
        mirror: true as const,
        showline: true,
        range: [-0.05 * totalHeight, totalHeight * 1.1],
      },
      annotations,
      showlegend: false,
      margin: { l: 80, r: 40, t: 40, b: 80 },
      plot_bgcolor: 'white',
      paper_bgcolor: 'white',
    };

    return { traces, layout };
  }, [datasets, settings]);

  useEffect(() => {
    if (!divRef.current || datasets.length === 0) return;
    const { traces, layout } = buildFigure();

    Plotly.react(divRef.current, traces as Plotly.Data[], layout as Partial<Plotly.Layout>, {
      editable: true,
      displaylogo: false,
      responsive: true,
    });

    const el = divRef.current as HTMLElement & { on?: (ev: string, fn: (data: unknown) => void) => void; removeAllListeners?: (ev: string) => void };

    const handler = (eventData: Record<string, unknown>) => {
      const offsets = computeOffsets(datasets, settings);
      Object.keys(eventData).forEach((key) => {
        const m = key.match(/^annotations\[(\d+)\]\.(x|y)$/);
        if (!m) return;
        const idx = parseInt(m[1], 10);
        if (idx < datasets.length) {
          const d = datasets[idx];
          const val = eventData[key] as number;
          if (m[2] === 'x') {
            onLabelMove(d.id, val, d.labelY ?? 0, d.labelVa ?? 'bottom');
          } else {
            onLabelMove(d.id, d.labelX ?? 0, val - offsets[idx], d.labelVa ?? 'bottom');
          }
        }
      });
    };

    if (el.on) {
      el.on('plotly_relayout', handler as (data: unknown) => void);
    }

    return () => {
      if (divRef.current) {
        const current = divRef.current as HTMLElement & { removeAllListeners?: (ev: string) => void };
        current.removeAllListeners?.('plotly_relayout');
      }
    };
  }, [datasets, settings, buildFigure, onLabelMove]);

  if (datasets.length === 0) {
    return (
      <div className="plot-empty">
        <div className="plot-empty-inner">
          <svg width="64" height="40" viewBox="0 0 64 40" fill="none" aria-hidden="true">
            <polyline points="0,38 8,36 12,30 14,10 16,4 18,20 22,35 28,33 30,28 32,18 34,8 36,24 40,34 44,32 46,25 48,15 50,22 54,36 64,34" stroke="#5b8fa8" strokeWidth="2" fill="none" />
          </svg>
          <p>Upload a file to display the diffraction pattern</p>
          <p className="plot-empty-sub">Accepts .cif, .raw, .txt, .xy, .dat, .csv</p>
        </div>
      </div>
    );
  }

  return <div ref={divRef} style={{ width: '100%', height: '520px' }} />;
}
