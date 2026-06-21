import React from 'react';

/**
 * Animated technical backdrop — perspective grid lines, drifting accent
 * glow orbs, and a faint scanline. Self-contained (CSS animation, no libs).
 * Drop it as the first child of a `position: relative` section. Honors
 * prefers-reduced-motion. This is the brand's "UnicornStudio" hero canvas.
 */
export function GridBackground({
  variant = 'grid',
  glow = true,
  fade = true,
  intensity = 1,
  style,
  ...props
}) {
  const uid = React.useId().replace(/:/g, '');
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        pointerEvents: 'none', zIndex: 0, ...style,
      }}
      {...props}
    >
      {/* Grid / dots layer */}
      <div style={{
        position: 'absolute', inset: '-2px',
        backgroundImage: variant === 'dots'
          ? 'radial-gradient(var(--grid-line) 1.2px, transparent 1.2px)'
          : 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
        backgroundSize: variant === 'dots' ? '26px 26px' : '54px 54px',
        maskImage: fade ? 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 75%)' : 'none',
        WebkitMaskImage: fade ? 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 75%)' : 'none',
        animation: `hse-grid-${uid} 24s linear infinite`,
      }} />

      {/* Glow orbs */}
      {glow && (
        <>
          <div style={{
            position: 'absolute', top: '-22%', left: '12%',
            width: '46vw', height: '46vw', maxWidth: 720, maxHeight: 720,
            background: 'radial-gradient(circle, rgba(198,242,78,0.16), transparent 62%)',
            opacity: intensity, filter: 'blur(8px)',
            animation: `hse-float1-${uid} 14s ease-in-out infinite alternate`,
          }} />
          <div style={{
            position: 'absolute', top: '8%', right: '6%',
            width: '40vw', height: '40vw', maxWidth: 620, maxHeight: 620,
            background: 'radial-gradient(circle, rgba(84,214,255,0.12), transparent 64%)',
            opacity: intensity, filter: 'blur(8px)',
            animation: `hse-float2-${uid} 18s ease-in-out infinite alternate`,
          }} />
        </>
      )}

      <style>{`
        @keyframes hse-grid-${uid} { to { background-position: 54px 54px, 54px 54px; } }
        @keyframes hse-float1-${uid} { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,30px) scale(1.12); } }
        @keyframes hse-float2-${uid} { from { transform: translate(0,0) scale(1); } to { transform: translate(-50px,40px) scale(1.08); } }
        @media (prefers-reduced-motion: reduce) {
          [data-hse-grid="${uid}"] * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
