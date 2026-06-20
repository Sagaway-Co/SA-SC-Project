import React from 'react';
import type { PlotSettings } from '../types';

interface Props {
  settings: PlotSettings;
  fonts: string[];
  onChange: (s: PlotSettings) => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="settings-field">
      <span className="settings-label">{label}</span>
      <div className="settings-control">{children}</div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="settings-field">
      <div className="settings-label-row">
        <span className="settings-label">{label}</span>
        <span className="settings-value">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
      />
    </div>
  );
}

export default function SettingsPanel({ settings, fonts, onChange }: Props) {
  function patch(p: Partial<PlotSettings>) {
    onChange({ ...settings, ...p });
  }

  const pxW = Math.round(settings.figWidth * settings.dpi);
  const pxH = Math.round(settings.figHeight * settings.dpi);

  return (
    <div className="card settings-panel">
      <h3>Plot Settings</h3>

      <div className="settings-section">
        <div className="settings-section-title">Axis labels</div>
        <Field label="X axis">
          <input
            type="text"
            value={settings.xLabel}
            onChange={(e) => patch({ xLabel: e.target.value })}
            aria-label="X axis label"
          />
        </Field>
        <Field label="Y axis">
          <input
            type="text"
            value={settings.yLabel}
            onChange={(e) => patch({ yLabel: e.target.value })}
            aria-label="Y axis label"
          />
        </Field>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Typography</div>
        <Field label="Font">
          <select
            value={settings.fontName}
            onChange={(e) => patch({ fontName: e.target.value })}
            aria-label="Font"
          >
            {fonts.length > 0 ? (
              fonts.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))
            ) : (
              <>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="DejaVu Serif">DejaVu Serif</option>
              </>
            )}
          </select>
        </Field>
        <SliderField
          label="Axis font"
          value={settings.axisFontsize}
          min={10}
          max={40}
          step={1}
          unit="pt"
          onChange={(v) => patch({ axisFontsize: v })}
        />
        <SliderField
          label="Tick font"
          value={settings.tickFontsize}
          min={10}
          max={40}
          step={1}
          unit="pt"
          onChange={(v) => patch({ tickFontsize: v })}
        />
        <SliderField
          label="Label font"
          value={settings.labelFontsize}
          min={10}
          max={40}
          step={1}
          unit="pt"
          onChange={(v) => patch({ labelFontsize: v })}
        />
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Layout</div>
        <SliderField
          label="Fig width"
          value={settings.figWidth}
          min={4}
          max={20}
          step={0.5}
          unit=" in"
          onChange={(v) => patch({ figWidth: v })}
        />
        <SliderField
          label="Fig height"
          value={settings.figHeight}
          min={3}
          max={20}
          step={0.5}
          unit=" in"
          onChange={(v) => patch({ figHeight: v })}
        />
        <SliderField
          label="Stack spacing"
          value={settings.offsetFactor}
          min={0.5}
          max={3.0}
          step={0.05}
          onChange={(v) => patch({ offsetFactor: v })}
        />
        <SliderField
          label="Line width"
          value={settings.lineWidth}
          min={0.3}
          max={3.0}
          step={0.1}
          unit="pt"
          onChange={(v) => patch({ lineWidth: v })}
        />
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Output</div>
        <Field label="DPI">
          <select
            value={settings.dpi}
            onChange={(e) => patch({ dpi: parseInt(e.target.value, 10) })}
            aria-label="DPI"
          >
            {[150, 200, 300, 600].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>
        <SliderField
          label="Label X pos"
          value={settings.labelXFrac}
          min={0.3}
          max={1.0}
          step={0.01}
          onChange={(v) => patch({ labelXFrac: v })}
        />
        <div className="settings-field settings-checkbox-field">
          <label className="settings-checkbox-label">
            <input
              type="checkbox"
              checked={settings.normalize}
              onChange={(e) => patch({ normalize: e.target.checked })}
            />
            <span>Normalize intensity to [0, 1]</span>
          </label>
        </div>
        <div className="settings-px-display">
          Output: {pxW.toLocaleString()} &times; {pxH.toLocaleString()} px
        </div>
      </div>
    </div>
  );
}
