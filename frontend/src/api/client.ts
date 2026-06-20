import type { Dataset, PlotSettings } from '../types';

const BASE = '';

export async function simulateCIF(
  file: File,
  params: Partial<{
    wavelength: number;
    start: number;
    end: number;
    step: number;
    fwhm: number;
    scale: number;
  }> = {}
): Promise<{ two_theta: number[]; intensity: number[]; raw_b64: string; txt: string; warnings: string[] }> {
  const fd = new FormData();
  fd.append('file', file);
  Object.entries(params).forEach(([k, v]) => fd.append(k, String(v)));
  const r = await fetch(BASE + '/api/simulate', { method: 'POST', body: fd });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function generatePlot(
  datasets: Dataset[],
  settings: PlotSettings,
  _offsets: number[]
): Promise<Blob> {
  const body = {
    datasets: datasets.map((d) => ({
      name: d.name,
      x: d.x,
      y: d.y,
      color: d.color,
      label_color: d.labelColor,
      ...(d.labelX != null ? { label_x: d.labelX } : {}),
      ...(d.labelY != null ? { label_y: d.labelY } : {}),
      ...(d.labelVa != null ? { label_va: d.labelVa } : {}),
    })),
    settings: {
      x_label: settings.xLabel,
      y_label: settings.yLabel,
      font_name: settings.fontName,
      axis_fontsize: settings.axisFontsize,
      tick_fontsize: settings.tickFontsize,
      label_fontsize: settings.labelFontsize,
      fig_width: settings.figWidth,
      fig_height: settings.figHeight,
      offset_factor: settings.offsetFactor,
      line_width: settings.lineWidth,
      dpi: settings.dpi,
      label_x_frac: settings.labelXFrac,
      normalize: settings.normalize,
    },
  };
  const r = await fetch(BASE + '/api/plot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.blob();
}

export async function rawToTxt(
  file: File
): Promise<{ txt: string; wavelength: number; n_steps: number; start: number; step: number }> {
  const fd = new FormData();
  fd.append('file', file);
  const r = await fetch(BASE + '/api/raw-to-txt', { method: 'POST', body: fd });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function getFonts(): Promise<string[]> {
  const r = await fetch(BASE + '/api/fonts');
  return (await r.json()).fonts;
}
