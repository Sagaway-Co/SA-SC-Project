export interface Dataset {
  id: string;
  name: string;
  x: number[];
  y: number[];
  color: string;
  labelColor: string;
  labelX?: number;
  labelY?: number;
  labelVa?: 'bottom' | 'top';
}

export interface PlotSettings {
  xLabel: string;
  yLabel: string;
  fontName: string;
  axisFontsize: number;
  tickFontsize: number;
  labelFontsize: number;
  figWidth: number;
  figHeight: number;
  offsetFactor: number;
  lineWidth: number;
  dpi: number;
  labelXFrac: number;
  normalize: boolean;
}

export const DEFAULT_SETTINGS: PlotSettings = {
  xLabel: '2θ (degree)',
  yLabel: 'Intensity (a.u.)',
  fontName: 'Times New Roman',
  axisFontsize: 30,
  tickFontsize: 26,
  labelFontsize: 22,
  figWidth: 10,
  figHeight: 7.5,
  offsetFactor: 1.1,
  lineWidth: 1.0,
  dpi: 300,
  labelXFrac: 0.93,
  normalize: true,
};
