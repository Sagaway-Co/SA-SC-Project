import React from 'react';

/**
 * HSE Check primary button. Dark-UI, hairline-bordered, with a glowing
 * lime primary variant. Compact, precise, Linear/Vercel-grade.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  as = 'button',
  style,
  ...props
}) {
  const sizes = {
    sm: { height: 32, padding: '0 12px', fontSize: 13, gap: 6, radius: 'var(--radius-md)' },
    md: { height: 40, padding: '0 16px', fontSize: 14, gap: 8, radius: 'var(--radius-md)' },
    lg: { height: 48, padding: '0 22px', fontSize: 15, gap: 8, radius: 'var(--radius-lg)' },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: 'var(--gradient-accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid transparent',
      boxShadow: 'var(--glow-accent-soft)',
      fontWeight: 600,
    },
    secondary: {
      background: 'var(--surface-2)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)',
      boxShadow: 'var(--highlight-top)',
      fontWeight: 500,
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent',
      fontWeight: 500,
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-strong)',
      fontWeight: 500,
    },
    danger: {
      background: 'var(--danger-soft)',
      color: 'var(--danger)',
      border: '1px solid rgba(255,92,77,0.3)',
      fontWeight: 500,
    },
  };
  const v = variants[variant] || variants.primary;

  const Tag = as;
  return (
    <Tag
      disabled={Tag === 'button' ? (disabled || loading) : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? '100%' : 'auto',
        fontSize: s.fontSize,
        fontFamily: 'var(--font-sans)',
        letterSpacing: '-0.01em',
        lineHeight: 1,
        borderRadius: s.radius,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        transition: 'transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
        WebkitTapHighlightColor: 'transparent',
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled && !loading) e.currentTarget.style.transform = 'scale(0.97)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseEnter={(e) => {
        if (disabled || loading) return;
        if (variant === 'primary') e.currentTarget.style.filter = 'brightness(1.06)';
        else if (variant === 'ghost') e.currentTarget.style.background = 'var(--surface-1)';
        else e.currentTarget.style.filter = 'brightness(1.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.filter = 'none';
        if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
      }}
      {...props}
    >
      {loading && (
        <span style={{
          width: 13, height: 13, borderRadius: '50%',
          border: '2px solid currentColor', borderTopColor: 'transparent',
          display: 'inline-block', animation: 'hse-spin 0.6s linear infinite',
        }} />
      )}
      {!loading && iconLeft}
      {children}
      {!loading && iconRight}
      <style>{`@keyframes hse-spin{to{transform:rotate(360deg)}}`}</style>
    </Tag>
  );
}
