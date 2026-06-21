import React from 'react';

/**
 * Surface card. Layered dark fill, hairline border, faint top highlight.
 * `interactive` adds a hover lift + accent border; `glow` adds an ambient
 * accent halo for "live"/featured cards. `spotlight` enables a cursor-follow
 * radial highlight (Linear/Raycast feature-grid style).
 */
export function Card({
  children,
  padding = 24,
  interactive = false,
  glow = false,
  spotlight = false,
  style,
  ...props
}) {
  const ref = React.useRef(null);

  const onMove = (e) => {
    if (!spotlight || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding,
        boxShadow: glow
          ? 'var(--highlight-top), var(--glow-accent-soft)'
          : 'var(--highlight-top), var(--shadow-md)',
        overflow: 'hidden',
        transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!interactive) return;
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = 'var(--border-accent)';
        e.currentTarget.style.background = 'var(--surface-card-hover)';
      }}
      onMouseLeave={(e) => {
        if (!interactive) return;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.background = 'var(--surface-card)';
      }}
      {...props}
    >
      {spotlight && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(280px circle at var(--mx, 50%) var(--my, 0%), var(--accent-softer), transparent 70%)',
        }} />
      )}
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}
