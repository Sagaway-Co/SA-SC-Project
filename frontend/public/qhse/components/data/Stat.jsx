import React from 'react';

/**
 * Animated KPI metric. Counts up from 0 to `value` when scrolled into view
 * (IntersectionObserver), with prefix/suffix and a label. The signature
 * "trust metric" number for the marketing site.
 */
export function Stat({
  value = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  sublabel,
  duration = 1600,
  align = 'left',
  style,
  ...props
}) {
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(0);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(value * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={ref} style={{ textAlign: align, ...style }} {...props}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-display-md)',
        fontWeight: 600,
        letterSpacing: 'var(--tracking-display)',
        lineHeight: 1,
        color: 'var(--text-primary)',
        fontVariantNumeric: 'tabular-nums',
        display: 'flex',
        alignItems: 'baseline',
        gap: 2,
        justifyContent: align === 'center' ? 'center' : 'flex-start',
      }}>
        {prefix && <span style={{ color: 'var(--accent-text)' }}>{prefix}</span>}
        <span>{formatted}</span>
        {suffix && <span style={{ color: 'var(--accent-text)', fontSize: '0.6em', fontWeight: 600 }}>{suffix}</span>}
      </div>
      {label && (
        <div style={{
          marginTop: 10, fontSize: 'var(--text-body-sm)', fontWeight: 500,
          color: 'var(--text-secondary)',
        }}>{label}</div>
      )}
      {sublabel && (
        <div style={{
          marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 12,
          letterSpacing: '0.02em', color: 'var(--text-tertiary)',
        }}>{sublabel}</div>
      )}
    </div>
  );
}
