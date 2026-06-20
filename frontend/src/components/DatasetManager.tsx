import React from 'react';
import type { Dataset } from '../types';

interface Props {
  datasets: Dataset[];
  onChange: (datasets: Dataset[]) => void;
}

export default function DatasetManager({ datasets, onChange }: Props) {
  if (datasets.length === 0) return null;

  function update(id: string, patch: Partial<Dataset>) {
    onChange(datasets.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  }

  function remove(id: string) {
    onChange(datasets.filter((d) => d.id !== id));
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const next = [...datasets];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  }

  function moveDown(idx: number) {
    if (idx === datasets.length - 1) return;
    const next = [...datasets];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  }

  function resetLabel(id: string) {
    onChange(
      datasets.map((d) =>
        d.id === id ? { ...d, labelX: undefined, labelY: undefined, labelVa: undefined } : d
      )
    );
  }

  return (
    <div className="card dataset-manager">
      <h3>Datasets</h3>
      <div className="dataset-list">
        {datasets.map((d, i) => (
          <div key={d.id} className="dataset-row">
            <div className="dataset-row-top">
              <span className="dataset-index">{String(i + 1).padStart(2, '0')}</span>
              <input
                className="dataset-name-input"
                type="text"
                value={d.name}
                onChange={(e) => update(d.id, { name: e.target.value })}
                aria-label={`Dataset ${i + 1} name`}
              />
              <div className="dataset-row-actions">
                <button
                  className="btn-icon"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  title="Move up"
                  aria-label="Move dataset up"
                >
                  ↑
                </button>
                <button
                  className="btn-icon"
                  onClick={() => moveDown(i)}
                  disabled={i === datasets.length - 1}
                  title="Move down"
                  aria-label="Move dataset down"
                >
                  ↓
                </button>
                <button
                  className="btn-icon btn-danger"
                  onClick={() => remove(d.id)}
                  title="Remove dataset"
                  aria-label={`Remove dataset ${d.name}`}
                >
                  ×
                </button>
              </div>
            </div>
            <div className="dataset-row-bottom">
              <label className="color-field">
                <span>Line</span>
                <input
                  type="color"
                  value={d.color}
                  onChange={(e) => update(d.id, { color: e.target.value })}
                  aria-label="Line color"
                />
                <span className="color-hex">{d.color}</span>
              </label>
              <label className="color-field">
                <span>Label</span>
                <input
                  type="color"
                  value={d.labelColor}
                  onChange={(e) => update(d.id, { labelColor: e.target.value })}
                  aria-label="Label color"
                />
                <span className="color-hex">{d.labelColor}</span>
              </label>
              <span className="dataset-pts">{d.x.length.toLocaleString()} pts</span>
              <button
                className="btn-ghost btn-small"
                onClick={() => resetLabel(d.id)}
                title="Reset label to auto position"
              >
                Reset label
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
