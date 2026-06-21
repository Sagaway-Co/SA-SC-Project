import React from 'react';

/**
 * Eyebrow / kicker label — the "technical voice" of the brand. Mono,
 * uppercase, wide tracking, with an optional leading lime tick mark.
 */
export function Eyebrow({ children, tick = true, tone = 'accent', style, ...props }) {
  const color = tone === 'accent' ? 'var(--accent-text)' : 'var(--text-tertiary)';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-eyebrow)',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-eyebrow)',
        color,
        ...style,
      }}
      {...props}
    >
      {tick && (
        <span style={{
          width: 14, height: 1.5, background: 'var(--accent)', borderRadius: 2,
          boxShadow: '0 0 8px var(--accent)', flex: 'none',
        }} />
      )}
      {children}
    </span>
  );
}
