import React, { useRef, useState, useCallback } from 'react';

interface Props {
  onFile: (file: File, ext: string) => void;
  isLoading?: boolean;
}

const ACCEPTED = ['.cif', '.txt', '.xy', '.dat', '.csv', '.raw'];

const EXT_ICONS: Record<string, string> = {
  '.cif': 'CIF',
  '.raw': 'RAW',
  '.txt': 'TXT',
  '.xy': 'XY',
  '.dat': 'DAT',
  '.csv': 'CSV',
};

export default function FileUpload({ onFile, isLoading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [lastFile, setLastFile] = useState<string | null>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      const ext = ('.' + file.name.split('.').pop()!).toLowerCase();
      if (!ACCEPTED.includes(ext)) {
        alert(`Unsupported file type: ${ext}\nAccepted: ${ACCEPTED.join(', ')}`);
        return;
      }
      setLastFile(file.name);
      onFile(file, ext);
    },
    [onFile]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const onDragLeave = () => setIsDragOver(false);

  const onClick = () => inputRef.current?.click();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  const ext = lastFile ? ('.' + lastFile.split('.').pop()!).toLowerCase() : null;

  return (
    <div className="card">
      <h3>Add Dataset</h3>
      <div
        className={`drop-zone${isDragOver ? ' drag-over' : ''}`}
        onClick={onClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        role="button"
        tabIndex={0}
        aria-label="Upload diffraction file"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      >
        {isLoading && lastFile ? (
          <div className="drop-zone-loading">
            <div className="drop-zone-badge">{ext ? EXT_ICONS[ext] ?? ext.slice(1).toUpperCase() : 'FILE'}</div>
            <span className="drop-zone-filename">{lastFile}</span>
            <div className="drop-zone-spinner" aria-label="Loading" />
          </div>
        ) : (
          <>
            <div className="drop-zone-icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="4" width="18" height="24" rx="2" stroke="#5b8fa8" strokeWidth="1.5" fill="none" />
                <path d="M18 4l6 6h-6V4z" stroke="#5b8fa8" strokeWidth="1.5" fill="#5b8fa8" fillOpacity="0.15" />
                <line x1="8" y1="14" x2="18" y2="14" stroke="#5b8fa8" strokeWidth="1.2" />
                <line x1="8" y1="18" x2="16" y2="18" stroke="#5b8fa8" strokeWidth="1.2" />
                <line x1="8" y1="22" x2="14" y2="22" stroke="#5b8fa8" strokeWidth="1.2" />
                <circle cx="24" cy="24" r="5" fill="#1a1f2e" />
                <line x1="24" y1="21" x2="24" y2="27" stroke="#c8893a" strokeWidth="1.5" />
                <line x1="21" y1="24" x2="27" y2="24" stroke="#c8893a" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="drop-zone-text">Drop file or click to browse</p>
            <p className="drop-zone-sub">{ACCEPTED.join('  ')}</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(',')}
          onChange={onInputChange}
          style={{ display: 'none' }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
