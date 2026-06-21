import React from 'react';

/**
 * Text input on dark UI. Hairline border, lime focus ring, optional leading
 * icon. Pairs with the `label` prop for stacked form fields.
 */
export function Input({
  label,
  hint,
  error,
  iconLeft,
  size = 'md',
  style,
  id,
  ...props
}) {
  const [focused, setFocused] = React.useState(false);
  const fieldId = id || React.useId();
  const heights = { md: 40, lg: 48 };
  const h = heights[size] || 40;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%' }}>
      {label && (
        <label htmlFor={fieldId} style={{
          fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)',
          fontFamily: 'var(--font-sans)',
        }}>{label}</label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: h, padding: '0 12px',
        background: 'var(--surface-inset)',
        border: `1px solid ${error ? 'var(--danger)' : focused ? 'var(--border-accent)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: focused ? '0 0 0 3px var(--focus-ring)' : 'none',
        transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      }}>
        {iconLeft && <span style={{ color: 'var(--text-tertiary)', display: 'flex', flex: 'none' }}>{iconLeft}</span>}
        <input
          id={fieldId}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          style={{
            flex: 1, minWidth: 0, height: '100%', border: 'none', outline: 'none',
            background: 'transparent', color: 'var(--text-primary)',
            fontSize: 14, fontFamily: 'var(--font-sans)',
            ...style,
          }}
          {...props}
        />
      </div>
      {(hint || error) && (
        <span style={{
          fontSize: 12, color: error ? 'var(--danger)' : 'var(--text-tertiary)',
          fontFamily: 'var(--font-sans)',
        }}>{error || hint}</span>
      )}
    </div>
  );
}
