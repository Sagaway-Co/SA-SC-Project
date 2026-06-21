import React from 'react';

/**
 * Status pill. Two looks: `soft` (tinted fill, default) and `dot` (label
 * with a leading status dot). Tones cover semantic status, the lime accent,
 * and the GB 6441 hazard grades (grade1–grade4).
 */
export function Badge({ children, tone = 'neutral', variant = 'soft', size = 'md', style, ...props }) {
  const tones = {
    neutral: { fg: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.06)', dot: 'var(--text-tertiary)' },
    accent: { fg: 'var(--accent-text)', bg: 'var(--accent-soft)', dot: 'var(--accent)' },
    success: { fg: 'var(--success)', bg: 'var(--success-soft)', dot: 'var(--success)' },
    warning: { fg: 'var(--warning)', bg: 'var(--warning-soft)', dot: 'var(--warning)' },
    danger: { fg: 'var(--danger)', bg: 'var(--danger-soft)', dot: 'var(--danger)' },
    info: { fg: 'var(--cyan)', bg: 'var(--cyan-soft)', dot: 'var(--cyan)' },
    grade1: { fg: 'var(--grade-1)', bg: 'rgba(255,77,77,0.14)', dot: 'var(--grade-1)' },
    grade2: { fg: 'var(--grade-2)', bg: 'rgba(255,138,61,0.14)', dot: 'var(--grade-2)' },
    grade3: { fg: 'var(--grade-3)', bg: 'rgba(255,201,61,0.14)', dot: 'var(--grade-3)' },
    grade4: { fg: 'var(--grade-4)', bg: 'rgba(84,214,255,0.14)', dot: 'var(--grade-4)' },
  };
  const t = tones[tone] || tones.neutral;
  const sizes = {
    sm: { fontSize: 11, padding: '2px 7px', height: 18, gap: 5 },
    md: { fontSize: 12, padding: '3px 9px', height: 22, gap: 6 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        letterSpacing: '0.02em',
        lineHeight: 1,
        color: t.fg,
        background: variant === 'outline' ? 'transparent' : t.bg,
        border: variant === 'outline' ? `1px solid ${t.fg}` : '1px solid transparent',
        borderRadius: 'var(--radius-full)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...props}
    >
      {variant === 'dot' && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: t.dot,
          boxShadow: `0 0 8px ${t.dot}`, flex: 'none',
        }} />
      )}
      {children}
    </span>
  );
}
