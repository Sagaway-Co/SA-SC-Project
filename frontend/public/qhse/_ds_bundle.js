/* @ds-bundle: {"format":3,"namespace":"HSECheckDesignSystem_6f6b44","components":[{"name":"GridBackground","sourcePath":"components/brand/GridBackground.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/brand/GridBackground.jsx":"5556fc76c513","components/core/Badge.jsx":"0a0f01816e38","components/core/Button.jsx":"1d372bba824c","components/core/Card.jsx":"a9a2fbcd26d4","components/core/Eyebrow.jsx":"218f3cc85ec0","components/data/Stat.jsx":"afcf66d61562","components/forms/Input.jsx":"5cb4340bcc40","ui_kits/website/ProductDashboard.jsx":"95daf501eda2","ui_kits/website/icons.jsx":"14717a0c11b4","ui_kits/website/site-cta.jsx":"f05de7764d5b","ui_kits/website/site-features.jsx":"7d652cbd4191","ui_kits/website/site-hero.jsx":"b08c6a2b45a7","ui_kits/website/site-mock.jsx":"cb085175a1fb","ui_kits/website/site-nav.jsx":"fec4e9deda5c","ui_kits/website/site-showcase.jsx":"cc870de083de","ui_kits/website/site-util.jsx":"2485d6cf8227","ui_kits/website/site-workflow.jsx":"9008cd31ffe7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HSECheckDesignSystem_6f6b44 = window.HSECheckDesignSystem_6f6b44 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/GridBackground.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Animated technical backdrop — perspective grid lines, drifting accent
 * glow orbs, and a faint scanline. Self-contained (CSS animation, no libs).
 * Drop it as the first child of a `position: relative` section. Honors
 * prefers-reduced-motion. This is the brand's "UnicornStudio" hero canvas.
 */
function GridBackground({
  variant = 'grid',
  glow = true,
  fade = true,
  intensity = 1,
  style,
  ...props
}) {
  const uid = React.useId().replace(/:/g, '');
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-2px',
      backgroundImage: variant === 'dots' ? 'radial-gradient(var(--grid-line) 1.2px, transparent 1.2px)' : 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
      backgroundSize: variant === 'dots' ? '26px 26px' : '54px 54px',
      maskImage: fade ? 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 75%)' : 'none',
      WebkitMaskImage: fade ? 'radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 75%)' : 'none',
      animation: `hse-grid-${uid} 24s linear infinite`
    }
  }), glow && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-22%',
      left: '12%',
      width: '46vw',
      height: '46vw',
      maxWidth: 720,
      maxHeight: 720,
      background: 'radial-gradient(circle, rgba(198,242,78,0.16), transparent 62%)',
      opacity: intensity,
      filter: 'blur(8px)',
      animation: `hse-float1-${uid} 14s ease-in-out infinite alternate`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '8%',
      right: '6%',
      width: '40vw',
      height: '40vw',
      maxWidth: 620,
      maxHeight: 620,
      background: 'radial-gradient(circle, rgba(84,214,255,0.12), transparent 64%)',
      opacity: intensity,
      filter: 'blur(8px)',
      animation: `hse-float2-${uid} 18s ease-in-out infinite alternate`
    }
  })), /*#__PURE__*/React.createElement("style", null, `
        @keyframes hse-grid-${uid} { to { background-position: 54px 54px, 54px 54px; } }
        @keyframes hse-float1-${uid} { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,30px) scale(1.12); } }
        @keyframes hse-float2-${uid} { from { transform: translate(0,0) scale(1); } to { transform: translate(-50px,40px) scale(1.08); } }
        @media (prefers-reduced-motion: reduce) {
          [data-hse-grid="${uid}"] * { animation: none !important; }
        }
      `));
}
Object.assign(__ds_scope, { GridBackground });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/GridBackground.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Status pill. Two looks: `soft` (tinted fill, default) and `dot` (label
 * with a leading status dot). Tones cover semantic status, the lime accent,
 * and the GB 6441 hazard grades (grade1–grade4).
 */
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  style,
  ...props
}) {
  const tones = {
    neutral: {
      fg: 'var(--text-secondary)',
      bg: 'rgba(255,255,255,0.06)',
      dot: 'var(--text-tertiary)'
    },
    accent: {
      fg: 'var(--accent-text)',
      bg: 'var(--accent-soft)',
      dot: 'var(--accent)'
    },
    success: {
      fg: 'var(--success)',
      bg: 'var(--success-soft)',
      dot: 'var(--success)'
    },
    warning: {
      fg: 'var(--warning)',
      bg: 'var(--warning-soft)',
      dot: 'var(--warning)'
    },
    danger: {
      fg: 'var(--danger)',
      bg: 'var(--danger-soft)',
      dot: 'var(--danger)'
    },
    info: {
      fg: 'var(--cyan)',
      bg: 'var(--cyan-soft)',
      dot: 'var(--cyan)'
    },
    grade1: {
      fg: 'var(--grade-1)',
      bg: 'rgba(255,77,77,0.14)',
      dot: 'var(--grade-1)'
    },
    grade2: {
      fg: 'var(--grade-2)',
      bg: 'rgba(255,138,61,0.14)',
      dot: 'var(--grade-2)'
    },
    grade3: {
      fg: 'var(--grade-3)',
      bg: 'rgba(255,201,61,0.14)',
      dot: 'var(--grade-3)'
    },
    grade4: {
      fg: 'var(--grade-4)',
      bg: 'rgba(84,214,255,0.14)',
      dot: 'var(--grade-4)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const sizes = {
    sm: {
      fontSize: 11,
      padding: '2px 7px',
      height: 18,
      gap: 5
    },
    md: {
      fontSize: 12,
      padding: '3px 9px',
      height: 22,
      gap: 6
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, props), variant === 'dot' && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.dot,
      boxShadow: `0 0 8px ${t.dot}`,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * HSE Check primary button. Dark-UI, hairline-bordered, with a glowing
 * lime primary variant. Compact, precise, Linear/Vercel-grade.
 */
function Button({
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
    sm: {
      height: 32,
      padding: '0 12px',
      fontSize: 13,
      gap: 6,
      radius: 'var(--radius-md)'
    },
    md: {
      height: 40,
      padding: '0 16px',
      fontSize: 14,
      gap: 8,
      radius: 'var(--radius-md)'
    },
    lg: {
      height: 48,
      padding: '0 22px',
      fontSize: 15,
      gap: 8,
      radius: 'var(--radius-lg)'
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--gradient-accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid transparent',
      boxShadow: 'var(--glow-accent-soft)',
      fontWeight: 600
    },
    secondary: {
      background: 'var(--surface-2)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)',
      boxShadow: 'var(--highlight-top)',
      fontWeight: 500
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent',
      fontWeight: 500
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-strong)',
      fontWeight: 500
    },
    danger: {
      background: 'var(--danger-soft)',
      color: 'var(--danger)',
      border: '1px solid rgba(255,92,77,0.3)',
      fontWeight: 500
    }
  };
  const v = variants[variant] || variants.primary;
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: Tag === 'button' ? disabled || loading : undefined,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!disabled && !loading) e.currentTarget.style.transform = 'scale(0.97)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseEnter: e => {
      if (disabled || loading) return;
      if (variant === 'primary') e.currentTarget.style.filter = 'brightness(1.06)';else if (variant === 'ghost') e.currentTarget.style.background = 'var(--surface-1)';else e.currentTarget.style.filter = 'brightness(1.12)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.filter = 'none';
      if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
    }
  }, props), loading && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 13,
      height: 13,
      borderRadius: '50%',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      display: 'inline-block',
      animation: 'hse-spin 0.6s linear infinite'
    }
  }), !loading && iconLeft, children, !loading && iconRight, /*#__PURE__*/React.createElement("style", null, `@keyframes hse-spin{to{transform:rotate(360deg)}}`));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface card. Layered dark fill, hairline border, faint top highlight.
 * `interactive` adds a hover lift + accent border; `glow` adds an ambient
 * accent halo for "live"/featured cards. `spotlight` enables a cursor-follow
 * radial highlight (Linear/Raycast feature-grid style).
 */
function Card({
  children,
  padding = 24,
  interactive = false,
  glow = false,
  spotlight = false,
  style,
  ...props
}) {
  const ref = React.useRef(null);
  const onMove = e => {
    if (!spotlight || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    onMouseMove: onMove,
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding,
      boxShadow: glow ? 'var(--highlight-top), var(--glow-accent-soft)' : 'var(--highlight-top), var(--shadow-md)',
      overflow: 'hidden',
      transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
      ...style
    },
    onMouseEnter: e => {
      if (!interactive) return;
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.borderColor = 'var(--border-accent)';
      e.currentTarget.style.background = 'var(--surface-card-hover)';
    },
    onMouseLeave: e => {
      if (!interactive) return;
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'var(--border-subtle)';
      e.currentTarget.style.background = 'var(--surface-card)';
    }
  }, props), spotlight && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(280px circle at var(--mx, 50%) var(--my, 0%), var(--accent-softer), transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow / kicker label — the "technical voice" of the brand. Mono,
 * uppercase, wide tracking, with an optional leading lime tick mark.
 */
function Eyebrow({
  children,
  tick = true,
  tone = 'accent',
  style,
  ...props
}) {
  const color = tone === 'accent' ? 'var(--accent-text)' : 'var(--text-tertiary)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-eyebrow)',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      color,
      ...style
    }
  }, props), tick && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 1.5,
      background: 'var(--accent)',
      borderRadius: 2,
      boxShadow: '0 0 8px var(--accent)',
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Animated KPI metric. Counts up from 0 to `value` when scrolled into view
 * (IntersectionObserver), with prefix/suffix and a label. The signature
 * "trust metric" number for the marketing site.
 */
function Stat({
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
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = now => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(value * eased);
            if (t < 1) requestAnimationFrame(tick);else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      });
    }, {
      threshold: 0.4
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);
  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    style: {
      textAlign: align,
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    style: {
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
      justifyContent: align === 'center' ? 'center' : 'flex-start'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent-text)'
    }
  }, prefix), /*#__PURE__*/React.createElement("span", null, formatted), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent-text)',
      fontSize: '0.6em',
      fontWeight: 600
    }
  }, suffix)), label && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 'var(--text-body-sm)',
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, label), sublabel && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      letterSpacing: '0.02em',
      color: 'var(--text-tertiary)'
    }
  }, sublabel));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input on dark UI. Hairline border, lime focus ring, optional leading
 * icon. Pairs with the `label` prop for stacked form fields.
 */
function Input({
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
  const heights = {
    md: 40,
    lg: 48
  };
  const h = heights[size] || 40;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-sans)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: h,
      padding: '0 12px',
      background: 'var(--surface-inset)',
      border: `1px solid ${error ? 'var(--danger)' : focused ? 'var(--border-accent)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focused ? '0 0 0 3px var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)',
      display: 'flex',
      flex: 'none'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    onFocus: e => {
      setFocused(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setFocused(false);
      props.onBlur?.(e);
    },
    style: {
      flex: 1,
      minWidth: 0,
      height: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: 'var(--text-primary)',
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, props))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? 'var(--danger)' : 'var(--text-tertiary)',
      fontFamily: 'var(--font-sans)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProductDashboard.jsx
try { (() => {
/* 忠实复刻：HSE Check 真实"安全生产隐患监控指挥中心"数据大屏。
 * 配色 / 数据 / 版式 100% 还原自客户现网产品（qhse.qa.sagaway.cn/bigscreen），
 * 图表用 SVG 重绘以便离线渲染。这是官网里要嵌入的"真实产品截图"。
 * 内部固定 1280x720，外层用 transform:scale 适配。window.ProductDashboard */
(function () {
  const C = {
    bg: '#03070f',
    panel: 'rgba(10,22,40,0.55)',
    line: 'rgba(57,198,240,0.30)',
    cyan: '#39c6f0',
    green: '#3ddc84',
    orange: '#ffab3d',
    red: '#ff5b5b',
    ink: '#eaf4ff',
    ink2: '#8fb0d6'
  };
  const ink3 = '#5b7a9c';
  function Panel({
    title,
    en,
    more,
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        background: 'rgba(10,22,40,0.55)',
        border: '1px solid rgba(57,198,240,0.18)',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: -1,
        top: -1,
        width: 12,
        height: 12,
        borderLeft: '2px solid ' + C.cyan,
        borderTop: '2px solid ' + C.cyan,
        borderRadius: '8px 0 0 0',
        opacity: 0.7
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: -1,
        bottom: -1,
        width: 12,
        height: 12,
        borderRight: '2px solid ' + C.cyan,
        borderBottom: '2px solid ' + C.cyan,
        borderRadius: '0 0 8px 0',
        opacity: 0.7
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 12px',
        borderBottom: '1px solid rgba(57,198,240,0.12)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 3,
        height: 13,
        background: C.cyan,
        borderRadius: 2,
        boxShadow: '0 0 6px ' + C.cyan
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: C.ink,
        letterSpacing: '0.5px'
      }
    }, title), en && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.cyan,
        fontFamily: 'monospace',
        letterSpacing: '1px',
        opacity: 0.7
      }
    }, en), more && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontSize: 10.5,
        color: C.ink2
      }
    }, more)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: 12,
        minHeight: 0
      }
    }, children));
  }
  function KTile({
    tone,
    label,
    value,
    unit,
    chg
  }) {
    const col = {
      blue: C.cyan,
      orange: C.orange,
      red: C.red,
      green: C.green
    }[tone];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        background: 'rgba(8,18,34,0.6)',
        border: '1px solid rgba(57,198,240,0.14)',
        borderRadius: 8,
        padding: '10px 12px',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: col
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        color: C.ink2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: 2,
        background: col
      }
    }), label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 34,
        fontWeight: 700,
        color: C.ink,
        lineHeight: 1.1,
        marginTop: 4,
        textShadow: '0 0 14px ' + col + '66',
        fontVariantNumeric: 'tabular-nums'
      }
    }, value, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 500,
        color: ink3,
        marginLeft: 3
      }
    }, unit)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: ink3,
        marginTop: 2
      }
    }, chg));
  }

  // ---- SVG charts ----
  function RingChart() {
    const data = [['物体打击', 9, C.cyan], ['触电', 7, C.orange], ['机械伤害', 5, '#7c5cff'], ['高处坠落', 4, C.green], ['其他', 4, C.red]];
    const total = data.reduce((s, d) => s + d[1], 0);
    let acc = 0;
    const R = 52,
      sw = 16,
      cx = 62,
      cy = 62,
      circ = 2 * Math.PI * R;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "124",
      height: "124",
      viewBox: "0 0 124 124",
      style: {
        flex: 'none'
      }
    }, data.map(([n, v, c], i) => {
      const frac = v / total,
        dash = frac * circ,
        off = -acc * circ;
      acc += frac;
      return /*#__PURE__*/React.createElement("circle", {
        key: i,
        cx: cx,
        cy: cy,
        r: R,
        fill: "none",
        stroke: c,
        strokeWidth: sw,
        strokeDasharray: `${dash} ${circ - dash}`,
        strokeDashoffset: off,
        transform: `rotate(-90 ${cx} ${cy})`,
        style: {
          filter: 'drop-shadow(0 0 3px ' + c + '88)'
        }
      });
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: cy - 4,
      textAnchor: "middle",
      fontSize: "20",
      fontWeight: "700",
      fill: C.ink
    }, total), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: cy + 13,
      textAnchor: "middle",
      fontSize: "9",
      fill: C.ink2
    }, "\u4E8B\u6545\u7C7B\u578B")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, data.map(([n, v, c], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        fontSize: 11.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 2,
        background: c
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.ink2,
        flex: 1
      }
    }, n), /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.ink,
        fontFamily: 'monospace'
      }
    }, v)))));
  }
  function TrendChart() {
    const W = 412,
      H = 120,
      pad = 8;
    const report = [5, 8, 6, 11, 9, 14, 12, 16, 13, 18, 15, 19];
    const closed = [3, 6, 5, 9, 7, 11, 10, 13, 12, 15, 14, 17];
    const max = 20;
    const x = i => pad + i * (W - pad * 2) / (report.length - 1);
    const y = v => H - pad - v / max * (H - pad * 2);
    const path = arr => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
    const area = arr => path(arr) + ` L${x(arr.length - 1)},${H - pad} L${x(0)},${H - pad} Z`;
    return /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      height: "100%",
      viewBox: `0 0 ${W} ${H}`,
      preserveAspectRatio: "none"
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "tg",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: C.cyan,
      stopOpacity: "0.3"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: C.cyan,
      stopOpacity: "0"
    }))), [0.25, 0.5, 0.75].map((g, i) => /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: pad,
      x2: W - pad,
      y1: pad + g * (H - pad * 2),
      y2: pad + g * (H - pad * 2),
      stroke: "rgba(57,198,240,0.08)"
    })), /*#__PURE__*/React.createElement("path", {
      d: area(report),
      fill: "url(#tg)"
    }), /*#__PURE__*/React.createElement("path", {
      d: path(report),
      fill: "none",
      stroke: C.cyan,
      strokeWidth: "2",
      style: {
        filter: 'drop-shadow(0 0 3px ' + C.cyan + ')'
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: path(closed),
      fill: "none",
      stroke: C.green,
      strokeWidth: "2",
      strokeDasharray: "4 3"
    }));
  }
  function MapPanel() {
    const nodes = [[28, 32, C.green, '兴盛', 18], [72, 28, C.green, '兴达', 13], [22, 70, C.orange, '华东', 9], [78, 66, C.red, '西北', 6], [54, 80, C.orange, '南区', 7]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: '100%',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      height: "100%",
      style: {
        position: 'absolute',
        inset: 0
      }
    }, nodes.map((n, i) => /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: "50%",
      y1: "50%",
      x2: n[0] + '%',
      y2: n[1] + '%',
      stroke: "rgba(57,198,240,0.25)",
      strokeWidth: "1"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 60,
        height: 60,
        borderRadius: '50%',
        border: '1px solid rgba(57,198,240,0.4)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,198,240,0.5), rgba(57,198,240,0.05))',
        display: 'grid',
        placeItems: 'center',
        fontSize: 9,
        color: C.ink,
        fontWeight: 700
      }
    }, "\u96C6\u56E2")), nodes.map((n, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: n[0] + '%',
        top: n[1] + '%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: n[4],
        height: n[4],
        borderRadius: '50%',
        background: n[2],
        boxShadow: '0 0 10px ' + n[2],
        margin: '0 auto'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: '#dceaff',
        marginTop: 4,
        textShadow: '0 1px 3px #000'
      }
    }, n[3]))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 12,
        bottom: 8,
        display: 'flex',
        gap: 12,
        fontSize: 10,
        color: C.ink2
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: 2,
        background: C.green,
        marginRight: 4
      }
    }), "\u8FBE\u6807 \u226590%"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: 2,
        background: C.orange,
        marginRight: 4
      }
    }), "\u9884\u8B66 80\u201390%"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: 2,
        background: C.red,
        marginRight: 4
      }
    }), "\u8D85\u6807 <80%")));
  }
  function ProductDashboard() {
    const counters = [['71', '起', '累计上报', C.cyan], ['64', '起', '已闭环（估算）', C.green], ['2', '起', '重大隐患', C.red], ['85.7', '%', '24h 方案及时率', C.orange]];
    const rank = [['1', '东营兴盛石油化工有限责任公司', 100.0], ['2', '山东兴达环保科技有限责任公司', 72.2]];
    const top5 = [['#1', '电源线裸露且连接不规范，存在触电风险', '本期发生 4 起', 'major'], ['#2', '电脑主板裸露在桌面上，电线杂乱，存在触电风险', '本期发生 2 起', 'major'], ['#3', '泵体连接处存在明显泄漏，地面有油污积聚', '本期发生 1 起', 'gen'], ['#4', '键盘表面有灰尘和污渍，可能影响设备运行', '本期发生 1 起', 'gen'], ['#5', '配电盒安装阻挡逃生路线', '本期发生 1 起', 'gen']];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1280,
        height: 720,
        background: C.bg,
        color: C.ink,
        fontFamily: '"Noto Sans SC", system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'radial-gradient(900px 500px at 50% -10%, rgba(36,96,170,0.25), transparent 70%)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(60,120,200,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(60,120,200,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 28px',
        borderBottom: '1px solid ' + C.line
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 13,
        color: C.ink2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 8,
        border: '1px solid ' + C.line,
        display: 'grid',
        placeItems: 'center',
        color: C.cyan,
        fontSize: 14
      }
    }, "\u25C8"), "\u4E1C\u8425\u5174\u76DB\u77F3\u6CB9\u5316\u5DE5"), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: '5px',
        textShadow: '0 0 24px rgba(57,198,240,0.45)'
      }
    }, "\u5B89\u5168\u751F\u4EA7\u9690\u60A3\u76D1\u63A7\u6307\u6325\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        letterSpacing: '4px',
        color: C.cyan,
        opacity: 0.8,
        marginTop: 2
      }
    }, "HSE INTELLIGENT MONITORING & COMMAND CENTER")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        color: C.green,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: C.green,
        boxShadow: '0 0 8px ' + C.green
      }
    }), "\u5B9E\u65F6"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'monospace',
        fontSize: 20,
        letterSpacing: '1px'
      }
    }, "14:32:07")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(57,198,240,0.6), transparent)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 660,
        display: 'grid',
        gridTemplateColumns: '340px 1fr 340px',
        gap: 16,
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "\u6838\u5FC3\u6307\u6807",
      en: "REALTIME",
      style: {
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(KTile, {
      tone: "blue",
      label: "\u4E0A\u62A5\u6570",
      value: "29",
      unit: "\u8D77",
      chg: "\u8F83\u4E0A\u5468 +12%"
    }), /*#__PURE__*/React.createElement(KTile, {
      tone: "orange",
      label: "\u6574\u6539\u4E2D",
      value: "2",
      unit: "\u8D77",
      chg: "\u5904\u7F6E\u4E2D"
    }), /*#__PURE__*/React.createElement(KTile, {
      tone: "red",
      label: "\u8D85\u671F\u672A\u6539",
      value: "5",
      unit: "\u8D77",
      chg: "\u9700\u7763\u529E"
    }), /*#__PURE__*/React.createElement(KTile, {
      tone: "green",
      label: "\u95ED\u73AF\u7387",
      value: "75.9",
      unit: "%",
      chg: "\u76EE\u6807 90%"
    }))), /*#__PURE__*/React.createElement(Panel, {
      title: "\u4E8B\u6545\u7C7B\u578B\u5206\u5E03",
      en: "GB 6441-2025",
      style: {
        flex: '0 0 168px'
      }
    }, /*#__PURE__*/React.createElement(RingChart, null)), /*#__PURE__*/React.createElement(Panel, {
      title: "\u4E0A\u62A5\u91CF vs \u95ED\u73AF\u91CF\u8D8B\u52BF",
      en: "TREND",
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(TrendChart, null))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "\u5404\u5355\u4F4D\u9690\u60A3\u95ED\u73AF\u8FBE\u6807\u5206\u5E03",
      more: "\u70B9\u4F4D\u5927\u5C0F=\u9690\u60A3\u5B58\u91CF \xB7 \u989C\u8272=\u95ED\u73AF\u8FBE\u6807\u5EA6",
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(MapPanel, null)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: '0 0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 14
      }
    }, counters.map(([v, u, l, c]) => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        position: 'relative',
        background: 'rgba(10,22,40,0.55)',
        border: '1px solid rgba(57,198,240,0.18)',
        borderRadius: 10,
        padding: '14px 10px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 1,
        color: c,
        fontVariantNumeric: 'tabular-nums'
      }
    }, v, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: ink3,
        marginLeft: 2
      }
    }, u)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: C.ink2,
        marginTop: 8
      }
    }, l))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      title: "\u5355\u4F4D\u95ED\u73AF\u7387 \xB7 \u7EA2\u9ED1\u699C",
      en: "RANK",
      style: {
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.ink2,
        marginBottom: 8
      }
    }, "\u95ED\u73AF\u7387\u6392\u540D"), rank.map(([rk, nm, pct]) => /*#__PURE__*/React.createElement("div", {
      key: rk,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 4,
        background: '#1f9d55',
        color: '#fff',
        fontSize: 11,
        display: 'grid',
        placeItems: 'center',
        flex: 'none'
      }
    }, rk), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 11,
        color: C.ink,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, nm), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 70,
        height: 6,
        background: 'rgba(57,198,240,0.12)',
        borderRadius: 3,
        overflow: 'hidden',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        width: pct + '%',
        background: 'linear-gradient(90deg,#1f8c50,#3ddc84)',
        borderRadius: 3
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'monospace',
        fontSize: 11,
        color: C.ink,
        width: 36,
        textAlign: 'right'
      }
    }, pct.toFixed(1))))), /*#__PURE__*/React.createElement(Panel, {
      title: "\u9AD8\u53D1\u9690\u60A3 TOP5",
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 9
      }
    }, top5.map(([rk, ds, mt, lv]) => /*#__PURE__*/React.createElement("div", {
      key: rk,
      style: {
        display: 'flex',
        gap: 9,
        paddingLeft: 8,
        borderLeft: '2px solid ' + (lv === 'major' ? C.red : C.orange)
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'monospace',
        fontSize: 11,
        color: C.cyan,
        flex: 'none',
        width: 18
      }
    }, rk), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.ink,
        lineHeight: 1.4
      }
    }, ds), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.ink2,
        marginTop: 3,
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", null, mt), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        padding: '1px 6px',
        borderRadius: 4,
        background: (lv === 'major' ? C.red : C.orange) + '22',
        color: lv === 'major' ? C.red : C.orange
      }
    }, lv === 'major' ? '高发' : '关注'))))))))));
  }
  window.ProductDashboard = ProductDashboard;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProductDashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/icons.jsx
try { (() => {
/* HSE Check website UI kit — icon helper.
 * Icons are Lucide (MIT), loaded from CDN as the brand icon set:
 * thin 1.75px stroke, rounded joins. We read Lucide's icon-node data and
 * inline it as SVG so React owns the node (no createIcons DOM swap).
 * Assigns window.Icon — loaded as a plain babel script, not a DS component.
 */
(function () {
  function pascal(name) {
    return name.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
  }
  function nodeFor(name) {
    const L = window.lucide;
    if (!L) return null;
    const p = pascal(name);
    return L.icons && (L.icons[p] || L.icons[name]) || L[p] || null;
  }
  function innerHTML(node) {
    if (!node) return '';
    // Lucide node is [tagName, attrsObject, childrenArray]; children may also
    // be the top-level array in older builds. Render from the child tuples.
    const children = Array.isArray(node[2]) ? node[2] : node;
    return children.map(([tag, attrs]) => {
      const a = Object.entries(attrs || {}).map(([k, v]) => `${k}="${v}"`).join(' ');
      return `<${tag} ${a}></${tag}>`;
    }).join('');
  }
  function Icon({
    name,
    size = 20,
    stroke = 1.75,
    color = 'currentColor',
    style
  }) {
    const html = React.useMemo(() => innerHTML(nodeFor(name)), [name]);
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: stroke,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: {
        display: 'inline-block',
        flex: 'none',
        ...style
      },
      dangerouslySetInnerHTML: {
        __html: html
      }
    });
  }
  window.Icon = Icon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-cta.jsx
try { (() => {
/* HSE Check website — CTA + footer. window.SiteCTA, window.SiteFooter */
(function () {
  const {
    Button,
    Eyebrow,
    GridBackground
  } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  const {
    Reveal
  } = window;
  function SiteCTA() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: 'var(--section-y) var(--gutter)'
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        borderRadius: 'var(--radius-3xl)',
        border: '1px solid var(--border-accent)',
        background: 'var(--surface-1)',
        padding: 'clamp(48px,7vw,88px) var(--gutter)',
        boxShadow: 'var(--highlight-top), var(--glow-accent-soft)'
      }
    }, /*#__PURE__*/React.createElement(GridBackground, {
      variant: "dots",
      glow: true,
      fade: true,
      intensity: 0.8
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 1
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u5F00\u59CB\u4F7F\u7528 / Get started"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 'var(--text-display-md)',
        letterSpacing: 'var(--tracking-display)',
        lineHeight: 1.08,
        margin: '20px auto 0',
        maxWidth: 640
      }
    }, "\u8BA9\u4E0B\u4E00\u6B21\u68C0\u67E5\uFF0C", /*#__PURE__*/React.createElement("br", null), "\u5C31\u8FBE\u5230\u6CD5\u5F8B\u7EA7\u8BC1\u636E\u6807\u51C6"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--text-body-lg)',
        color: 'var(--text-secondary)',
        margin: '18px auto 0',
        maxWidth: 520,
        lineHeight: 1.6
      }
    }, "30 \u5206\u949F\u770B\u61C2\u4ECE\u73B0\u573A\u53D6\u8BC1\u5230\u96C6\u56E2\u9A7E\u9A76\u8231\u7684\u5B8C\u6574\u95ED\u73AF\u3002\u6211\u4EEC\u7684\u65B9\u6848\u5DE5\u7A0B\u5E08\u5C06\u4E3A\u4F60\u7684\u7EC4\u7EC7\u67B6\u6784\u505A\u4E00\u5BF9\u4E00\u6F14\u793A\u3002"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        justifyContent: 'center',
        marginTop: 34,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "\u7533\u8BF7\u6F14\u793A"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "lg"
    }, "\u514D\u8D39\u8BD5\u7528 14 \u5929"))))));
  }
  function SiteFooter() {
    const cols = [['产品', ['核心能力', '工作流引擎', '数据驾驶舱', '移动端 App', '私有化部署']], ['解决方案', ['石油石化', '能源电力', '矿山冶金', '集团多租户']], ['资源', ['客户案例', '帮助文档', 'API 文档', '安全合规']], ['公司', ['关于我们', '加入我们', '联系销售', '隐私政策']]];
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-base)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-wide)',
        margin: '0 auto',
        padding: '64px var(--gutter) 40px',
        display: 'grid',
        gridTemplateColumns: '1.6fr repeat(4, 1fr)',
        gap: 32
      },
      className: "hse-foot-grid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-wordmark.svg",
      height: "32",
      alt: "HSE Check"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: 'var(--text-tertiary)',
        lineHeight: 1.6,
        margin: '16px 0 0',
        maxWidth: 240
      }
    }, "\u9762\u5411\u9AD8\u5371\u884C\u4E1A\u7684\u65B0\u4E00\u4EE3\u5B89\u5168\u7BA1\u7406 SaaS\u3002\u53EF\u4FE1\u91C7\u96C6 \xB7 \u667A\u80FD\u6574\u6539 \xB7 \u6570\u636E\u9A7E\u9A76\u8231\u3002")), cols.map(([h, items]) => /*#__PURE__*/React.createElement("div", {
      key: h
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: 14
      }
    }, h), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, items.map(it => /*#__PURE__*/React.createElement("a", {
      key: it,
      href: "#",
      style: {
        fontSize: 13,
        color: 'var(--text-tertiary)',
        textDecoration: 'none'
      },
      onMouseEnter: e => e.currentTarget.style.color = 'var(--text-secondary)',
      onMouseLeave: e => e.currentTarget.style.color = 'var(--text-tertiary)'
    }, it)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-wide)',
        margin: '0 auto',
        padding: '20px var(--gutter)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-tertiary)'
      }
    }, "\xA9 2026 HSE Check \xB7 \u4EAC ICP \u5907 2026000000 \u53F7"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-tertiary)'
      }
    }, "\u7B49\u4FDD\u4E09\u7EA7 \xB7 ISO 27001 \xB7 \u79C1\u6709\u5316\u90E8\u7F72\u53EF\u9009")));
  }
  Object.assign(window, {
    SiteCTA,
    SiteFooter
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-cta.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-features.jsx
try { (() => {
/* HSE Check website — pain→solution + core features. window.SiteFeatures */
(function () {
  const {
    Card,
    Eyebrow,
    Badge
  } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  const {
    Reveal
  } = window;
  function SectionHead({
    eyebrow,
    title,
    sub
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 720
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, eyebrow)), /*#__PURE__*/React.createElement(Reveal, {
      delay: 60,
      as: "h2",
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 'var(--text-display-md)',
        letterSpacing: 'var(--tracking-display)',
        lineHeight: 1.08,
        margin: '18px 0 0'
      }
    }, title), sub && /*#__PURE__*/React.createElement(Reveal, {
      delay: 120,
      as: "p",
      style: {
        fontSize: 'var(--text-body-lg)',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        margin: '16px 0 0'
      }
    }, sub));
  }
  function Compare() {
    const pain = ['检查靠纸质表格，照片可后补、可 PS', '整改靠电话和微信群，进度无人跟踪', '责任无法追溯，出事故难定责', '数据散落各处，集团看不到全局'];
    const gain = ['北斗 + 水印 + 指纹，现场取证不可篡改', '系统自动派单，超时升级、节点留痕', '每个动作可追溯到人、到时间、到坐标', '集团统一驾驶舱，实时汇总到分钟'];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 20,
        marginTop: 56
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Card, {
      padding: 28,
      style: {
        background: 'var(--bg-raised)',
        borderStyle: 'dashed'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "file-x",
      size: 20,
      color: "var(--text-tertiary)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-secondary)'
      }
    }, "\u4F20\u7EDF\u65B9\u5F0F")), pain.map(p => /*#__PURE__*/React.createElement("div", {
      key: p,
      style: {
        display: 'flex',
        gap: 10,
        padding: '11px 0',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: 14,
        color: 'var(--text-tertiary)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 17,
      color: "var(--danger)",
      style: {
        marginTop: 1
      }
    }), /*#__PURE__*/React.createElement("span", null, p))))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 120
    }, /*#__PURE__*/React.createElement(Card, {
      padding: 28,
      glow: true,
      style: {
        borderColor: 'var(--border-accent)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-mark.svg",
      width: "22",
      height: "22",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600
      }
    }, "HSE Check")), gain.map(p => /*#__PURE__*/React.createElement("div", {
      key: p,
      style: {
        display: 'flex',
        gap: 10,
        padding: '11px 0',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: 14,
        color: 'var(--text-primary)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 17,
      color: "var(--accent-text)",
      style: {
        marginTop: 1
      }
    }), /*#__PURE__*/React.createElement("span", null, p))))));
  }
  const features = [{
    ic: 'fingerprint',
    tag: '证据链',
    t: '不可篡改的可信采集',
    d: '北斗定位 + Canvas 实时水印 + SHA-256 指纹，每张照片自带时间、坐标与防伪指纹，达到法律级证据标准。',
    span: 2
  }, {
    ic: 'scan-eye',
    tag: 'AI 辅助',
    t: '拍照即识别隐患',
    d: '基于 GB 6441 自动判定事故类型，建议隐患等级，检查员少填表、不漏判。',
    span: 1
  }, {
    ic: 'route',
    tag: '工作流',
    t: '全链路闭环',
    d: '从上报到验收，每个节点带时效约束，超时自动升级、全程留痕。',
    span: 1
  }, {
    ic: 'building-2',
    tag: '多租户',
    t: '集团级组织隔离',
    d: '集团统一看板，各分子公司数据隔离，一个平台服务整个集团多级架构。',
    span: 1
  }, {
    ic: 'monitor-dot',
    tag: '驾驶舱',
    t: '数据大屏',
    d: 'KPI 卡片、趋势分析、考核红黑榜，支持大屏投屏。',
    span: 1
  }];
  function SiteFeatures() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 'var(--container-wide)',
        margin: '0 auto',
        padding: 'var(--section-y) var(--gutter)'
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      eyebrow: "\u4E3A\u4EC0\u4E48\u4E0D\u4E00\u6837 / Why different",
      title: "\u628A\u73B0\u573A\u7684\u6BCF\u4E00\u6B65\uFF0C\u90FD\u53D8\u6210\u53EF\u4FE1\u7684\u6570\u636E",
      sub: "\u7ADE\u54C1\u662F\u628A\u7EB8\u8D28\u8868\u683C\u642C\u5230\u5C4F\u5E55\u4E0A\u3002\u6211\u4EEC\u91CD\u6784\u4E86\u6574\u4E2A\u5B89\u5168\u7BA1\u7406\u6D41\u7A0B\u2014\u2014\u4ECE\u8BC1\u636E\u4EA7\u751F\u7684\u90A3\u4E00\u523B\u8D77\u5C31\u503C\u5F97\u4FE1\u4EFB\u3002"
    }), /*#__PURE__*/React.createElement(Compare, null), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 96
      }
    }, /*#__PURE__*/React.createElement(SectionHead, {
      eyebrow: "\u6838\u5FC3\u80FD\u529B / Capabilities",
      title: "\u4E94\u4E2A\u73AF\u8282\uFF0C\u4E00\u5957\u7CFB\u7EDF"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20,
        marginTop: 48
      },
      className: "hse-feat-grid"
    }, features.map((f, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: f.t,
      delay: i % 2 * 90,
      style: {
        gridColumn: f.span === 2 ? 'span 2' : 'span 1'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      interactive: true,
      spotlight: true,
      padding: 28,
      style: {
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--accent-soft)',
        border: '1px solid var(--accent-line)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: f.ic,
      size: 22,
      color: "var(--accent-text)"
    })), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      size: "sm"
    }, f.tag)), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 'var(--text-h4)',
        fontWeight: 600,
        letterSpacing: '-0.02em',
        margin: '20px 0 8px'
      }
    }, f.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        margin: 0
      }
    }, f.d)))))));
  }
  window.SiteFeatures = SiteFeatures;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-features.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-hero.jsx
try { (() => {
/* HSE Check website — hero. window.SiteHero */
(function () {
  const {
    Button,
    Badge,
    Eyebrow,
    GridBackground
  } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  const {
    AppWindow,
    DashboardMock,
    CaptureCard,
    ProductDashboard
  } = window;

  /* Scales the fixed 1280x720 real-product dashboard to fit its container width. */
  function ScaledDashboard() {
    const ref = React.useRef(null);
    const [scale, setScale] = React.useState(0.84);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const ro = new ResizeObserver(() => setScale(el.clientWidth / 1280));
      ro.observe(el);
      setScale(el.clientWidth / 1280);
      return () => ro.disconnect();
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        width: '100%',
        height: 720 * scale,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1280,
        height: 720,
        transformOrigin: 'top left',
        transform: `scale(${scale})`
      }
    }, ProductDashboard ? /*#__PURE__*/React.createElement(ProductDashboard, null) : null));
  }
  function SiteHero() {
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
      const t = setTimeout(() => setReady(true), 60);
      return () => clearTimeout(t);
    }, []);
    return /*#__PURE__*/React.createElement("section", {
      className: ready ? 'hse-hero-ready' : '',
      style: {
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 72
      }
    }, /*#__PURE__*/React.createElement(GridBackground, {
      variant: "grid",
      glow: true,
      fade: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 1,
        maxWidth: 'var(--container-wide)',
        margin: '0 auto',
        padding: '0 var(--gutter)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hse-fade",
      style: {
        transitionDelay: '0ms'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "accent",
      variant: "dot",
      size: "md"
    }, "\u9762\u5411\u9AD8\u5371\u884C\u4E1A\u7684\u65B0\u4E00\u4EE3\u5B89\u5168\u7BA1\u7406\u5E73\u53F0")), /*#__PURE__*/React.createElement("h1", {
      className: "hse-fade",
      style: {
        transitionDelay: '80ms',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 'var(--text-display-xl)',
        lineHeight: 1.02,
        letterSpacing: 'var(--tracking-display)',
        margin: '26px 0 0',
        maxWidth: 980
      }
    }, "\u6BCF\u4E00\u6B21\u68C0\u67E5,", /*#__PURE__*/React.createElement("br", null), "\u90FD\u6709", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent-text)'
      }
    }, "\u6CD5\u5F8B\u7EA7\u8BC1\u636E")), /*#__PURE__*/React.createElement("p", {
      className: "hse-fade",
      style: {
        transitionDelay: '160ms',
        fontSize: 'var(--text-body-lg)',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        margin: '24px 0 0',
        maxWidth: 600
      }
    }, "\u73B0\u573A\u53EF\u4FE1\u91C7\u96C6 \u2192 \u667A\u80FD\u6D3E\u5355\u6574\u6539 \u2192 \u591A\u7EF4\u6570\u636E\u9A7E\u9A76\u8231\u3002 \u7528\u79D1\u6280\u624B\u6BB5\u66FF\u4EE3\u7EB8\u8D28\u8868\u683C\u4E0E\u5FAE\u4FE1\u7FA4\uFF0C\u8BA9\u77F3\u6CB9\u3001\u5316\u5DE5\u3001\u80FD\u6E90\u3001\u77FF\u5C71\u7684\u5B89\u5168\u7BA1\u7406\u53EF\u4FE1\u3001\u53EF\u63A7\u3001\u53EF\u8FFD\u6EAF\u3002"), /*#__PURE__*/React.createElement("div", {
      className: "hse-fade",
      style: {
        transitionDelay: '240ms',
        display: 'flex',
        gap: 12,
        marginTop: 32,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "\u7533\u8BF7\u6F14\u793A"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "lg",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "play",
        size: 15
      })
    }, "\u89C2\u770B 2 \u5206\u949F\u4ECB\u7ECD")), /*#__PURE__*/React.createElement("div", {
      className: "hse-fade",
      style: {
        transitionDelay: '300ms',
        marginTop: 18,
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-tertiary)',
        letterSpacing: '0.02em'
      }
    }, "\u65E0\u9700\u4FE1\u7528\u5361 \xB7 14 \u5929\u4F01\u4E1A\u8BD5\u7528 \xB7 \u79C1\u6709\u5316\u90E8\u7F72\u53EF\u9009"), /*#__PURE__*/React.createElement("div", {
      className: "hse-fade",
      style: {
        transitionDelay: '420ms',
        position: 'relative',
        width: '100%',
        maxWidth: 1080,
        marginTop: 64
      }
    }, /*#__PURE__*/React.createElement(AppWindow, {
      title: "qhse.sagaway.cn/bigscreen",
      style: {
        position: 'relative',
        zIndex: 1
      }
    }, /*#__PURE__*/React.createElement(ScaledDashboard, null)), /*#__PURE__*/React.createElement("div", {
      className: "hse-float",
      style: {
        position: 'absolute',
        right: -18,
        bottom: -34,
        zIndex: 2
      }
    }, /*#__PURE__*/React.createElement(CaptureCard, null)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: '20% 10% -10%',
        background: 'radial-gradient(60% 60% at 50% 50%, rgba(198,242,78,0.16), transparent 70%)',
        filter: 'blur(20px)',
        zIndex: 0
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 96,
        marginBottom: 8,
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        letterSpacing: '0.08em',
        color: 'var(--text-tertiary)',
        textTransform: 'uppercase'
      }
    }, "\u5DF2\u670D\u52A1 1,280+ \u9AD8\u5371\u884C\u4E1A\u4F01\u4E1A"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 40,
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 22,
        opacity: 0.65
      }
    }, ['中国化工', '国家能源', '中石化', '紫金矿业', '万华化学', '宝武集团'].map(n => /*#__PURE__*/React.createElement("span", {
      key: n,
      style: {
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: 'var(--text-secondary)'
      }
    }, n))))), /*#__PURE__*/React.createElement("style", null, `
          .hse-fade { opacity: 1; transform: translateY(16px); transition: transform 0.7s var(--ease-out); will-change: transform; }
          .hse-hero-ready .hse-fade { transform: translateY(0); }
          .hse-float { animation: hseFloat 5s ease-in-out infinite alternate; }
          @keyframes hseFloat { from { transform: translateY(0); } to { transform: translateY(-14px); } }
          @media (prefers-reduced-motion: reduce) {
            .hse-fade { transform: none; transition: none; }
            .hse-float { animation: none; }
          }
        `));
  }
  window.SiteHero = SiteHero;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-mock.jsx
try { (() => {
/* HSE Check website — product mockups (the "screenshots").
 * window.AppWindow, window.DashboardMock, window.CaptureCard */
(function () {
  const {
    Badge
  } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;

  /** macOS-style window chrome. */
  function AppWindow({
    title = 'app.hsecheck.com',
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--bg-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--highlight-top), var(--shadow-xl)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 38,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 14px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--surface-1)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 11,
        height: 11,
        borderRadius: '50%',
        background: '#FF5F57'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 11,
        height: 11,
        borderRadius: '50%',
        background: '#FEBC2E'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 11,
        height: 11,
        borderRadius: '50%',
        background: '#28C840'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: '0 auto',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-tertiary)',
        padding: '3px 14px',
        background: 'var(--bg-base)',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-subtle)'
      }
    }, title)), children);
  }
  function Bar({
    h,
    c
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: h,
        background: c,
        borderRadius: '3px 3px 0 0'
      }
    });
  }

  /** Group safety-dashboard view. */
  function DashboardMock() {
    const nav = [['layout-dashboard', '驾驶舱', true], ['clipboard-check', '检查任务', false], ['triangle-alert', '隐患整改', false], ['route', '工作流', false], ['building-2', '组织架构', false], ['chart-no-axes-column', '考核排名', false]];
    const hazards = [['储罐区动火作业未审批', 'grade1', 'I 级', '超期 2h', 'danger'], ['二号车间消防通道堵塞', 'grade2', 'II 级', '整改中', 'warning'], ['配电房标识缺失', 'grade3', 'III 级', '待复核', 'info'], ['作业人员未戴护目镜', 'grade4', 'IV 级', '已闭环', 'success']];
    const bars = [38, 52, 44, 70, 58, 82, 64, 90, 76, 95];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        height: 460,
        fontFamily: 'var(--font-sans)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 188,
        flex: 'none',
        borderRight: '1px solid var(--border-subtle)',
        padding: 14,
        background: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.12em',
        color: 'var(--text-tertiary)',
        textTransform: 'uppercase',
        padding: '4px 8px 8px'
      }
    }, "\u4E2D\u56FD\u5316\u5DE5\u96C6\u56E2"), nav.map(([ic, label, active]) => /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '8px 10px',
        borderRadius: 'var(--radius-md)',
        fontSize: 13,
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        background: active ? 'var(--surface-2)' : 'transparent',
        border: active ? '1px solid var(--border-subtle)' : '1px solid transparent'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 16,
      color: active ? 'var(--accent-text)' : 'var(--text-tertiary)'
    }), label))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: '-0.01em'
      }
    }, "\u96C6\u56E2\u5B89\u5168\u9A7E\u9A76\u8231"), /*#__PURE__*/React.createElement(Badge, {
      tone: "accent",
      variant: "dot"
    }, "\u5B9E\u65F6")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 10
      }
    }, [['本月隐患', '1,284', 'accent'], ['闭环率', '96.4%', 'success'], ['超期项', '7', 'danger']].map(([k, v, t]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        background: 'var(--surface-1)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--text-tertiary)',
        fontFamily: 'var(--font-mono)'
      }
    }, k), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        marginTop: 4,
        fontVariantNumeric: 'tabular-nums',
        color: t === 'accent' ? 'var(--accent-text)' : t === 'success' ? 'var(--success)' : 'var(--danger)'
      }
    }, v)))), /*#__PURE__*/React.createElement("div", {
      style: {
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: 14,
        background: 'var(--surface-1)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-secondary)',
        marginBottom: 12
      }
    }, "\u9690\u60A3\u95ED\u73AF\u8D8B\u52BF \xB7 \u8FD1 10 \u5468"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 6,
        height: 70
      }
    }, bars.map((b, i) => /*#__PURE__*/React.createElement(Bar, {
      key: i,
      h: `${b}%`,
      c: i === bars.length - 1 ? 'var(--accent)' : 'rgba(198,242,78,0.28)'
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-1)',
        overflow: 'hidden'
      }
    }, hazards.map(([name, grade, gl, status, st], i) => /*#__PURE__*/React.createElement("div", {
      key: name,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        borderTop: i ? '1px solid var(--border-subtle)' : 'none',
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: grade,
      size: "sm"
    }, gl), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        color: 'var(--text-primary)'
      }
    }, name), /*#__PURE__*/React.createElement(Badge, {
      tone: st,
      variant: "dot",
      size: "sm"
    }, status))))));
  }

  /** Field-capture card (北斗 + 水印 + AI). */
  function CaptureCard({
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 230,
        background: 'var(--surface-1)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 132,
        position: 'relative',
        background: 'linear-gradient(135deg, #1a1d16, #0e120a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "hard-hat",
      size: 44,
      color: "rgba(198,242,78,0.5)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 18,
        left: 18,
        width: 86,
        height: 64,
        border: '1.5px solid var(--accent)',
        borderRadius: 4,
        boxShadow: '0 0 12px rgba(198,242,78,0.4)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: -9,
        left: -1,
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        background: 'var(--accent)',
        color: 'var(--text-on-accent)',
        padding: '1px 5px',
        borderRadius: 3,
        fontWeight: 600
      }
    }, "\u672A\u6234\u62A4\u76EE\u955C 98%")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        right: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 8.5,
        lineHeight: 1.5,
        color: 'rgba(255,255,255,0.6)'
      }
    }, "\u5317\u6597 39.9042\xB0N 116.4074\xB0E", /*#__PURE__*/React.createElement("br", null), "2026-06-19 14:32:07 \xB7 SHA-256 \u2713")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shield-check",
      size: 16,
      color: "var(--accent-text)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-secondary)'
      }
    }, "\u9632\u7BE1\u6539\u53D6\u8BC1\u5B8C\u6210")));
  }
  Object.assign(window, {
    AppWindow,
    DashboardMock,
    CaptureCard
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-mock.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-nav.jsx
try { (() => {
/* HSE Check website — top navigation. window.SiteNav */
(function () {
  const {
    Button,
    Badge
  } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  function SiteNav() {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 12);
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const links = ['核心能力', '工作流', '数据驾驶舱', '客户案例', '定价'];
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(8,9,10,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
        transition: 'background 0.3s var(--ease-out), border-color 0.3s var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-wide)',
        margin: '0 auto',
        padding: '0 var(--gutter)',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 36
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        textDecoration: 'none'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-mark.svg",
      width: "30",
      height: "30",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: 'var(--text-primary)'
      }
    }, "HSE Check")), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 4
      },
      className: "hse-navlinks"
    }, links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#",
      style: {
        fontSize: 14,
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        padding: '7px 12px',
        borderRadius: 'var(--radius-md)',
        transition: 'color .15s, background .15s'
      },
      onMouseEnter: e => {
        e.currentTarget.style.color = 'var(--text-primary)';
        e.currentTarget.style.background = 'var(--surface-1)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.color = 'var(--text-secondary)';
        e.currentTarget.style.background = 'transparent';
      }
    }, l)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "\u767B\u5F55"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 15
      })
    }, "\u7533\u8BF7\u6F14\u793A"))));
  }
  window.SiteNav = SiteNav;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-showcase.jsx
try { (() => {
/* HSE Check website — data screen showcase + trust metrics.
 * window.SiteDashboard, window.SiteTrust */
(function () {
  const {
    Eyebrow,
    Badge,
    Stat
  } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  const {
    Reveal,
    useInView
  } = window;

  /* Scales the real 1280x720 product 大屏 to fit its container. */
  function ScaledDashboard() {
    const ref = React.useRef(null);
    const [scale, setScale] = React.useState(0.84);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const ro = new ResizeObserver(() => setScale(el.clientWidth / 1280));
      ro.observe(el);
      setScale(el.clientWidth / 1280);
      return () => ro.disconnect();
    }, []);
    const {
      ProductDashboard
    } = window;
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        width: '100%',
        height: 720 * scale,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 1280,
        height: 720,
        transformOrigin: 'top left',
        transform: `scale(${scale})`
      }
    }, ProductDashboard ? /*#__PURE__*/React.createElement(ProductDashboard, null) : null));
  }
  function BigScreen() {
    // Real product 大屏, framed with a dual-color (lime→cyan) glowing border.
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        borderRadius: 'var(--radius-2xl)',
        padding: 1,
        background: 'linear-gradient(135deg, rgba(198,242,78,0.5), rgba(57,198,240,0.4) 50%, transparent)',
        boxShadow: 'var(--glow-accent-soft), var(--shadow-xl)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: 'calc(var(--radius-2xl) - 1px)',
        overflow: 'hidden',
        background: 'var(--bg-raised)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-mark.svg",
      width: "20",
      height: "20",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 14
      }
    }, "\u96C6\u56E2\u5B89\u5168\u6001\u52BF \xB7 \u5B9E\u65F6\u5927\u5C4F")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "accent",
      variant: "dot",
      size: "sm"
    }, "LIVE"), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      size: "sm"
    }, "\u652F\u6301\u5927\u5C4F\u6295\u5C4F"))), /*#__PURE__*/React.createElement(ScaledDashboard, null)));
  }
  function SiteDashboard() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 'var(--container-wide)',
        margin: '0 auto',
        padding: 'var(--section-y) var(--gutter)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        maxWidth: 680,
        margin: '0 auto 56px'
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "\u6570\u636E\u9A7E\u9A76\u8231 / Command center")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 60,
      as: "h2",
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 'var(--text-display-md)',
        letterSpacing: 'var(--tracking-display)',
        lineHeight: 1.08,
        margin: '18px 0 0'
      }
    }, "\u6574\u4E2A\u96C6\u56E2\u7684\u5B89\u5168\u6001\u52BF\uFF0C", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent-text)'
      }
    }, "\u4E00\u5C4F\u638C\u63A7"))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(BigScreen, null)));
  }
  function SiteTrust() {
    const stats = [{
      value: 1280,
      suffix: '+',
      label: '高危行业企业在用',
      sublabel: 'Enterprises'
    }, {
      value: 1240000,
      label: '条隐患已闭环',
      sublabel: 'Hazards resolved'
    }, {
      value: 96.4,
      decimals: 1,
      suffix: '%',
      label: '平均闭环率',
      sublabel: 'Avg. resolution'
    }, {
      value: 99.99,
      decimals: 2,
      suffix: '%',
      label: '证据链完整率',
      sublabel: 'Evidence integrity'
    }];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--bg-raised)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-wide)',
        margin: '0 auto',
        padding: 'clamp(56px,8vw,96px) var(--gutter)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 32
      }
    }, stats.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: s.label,
      delay: i * 90,
      style: {
        borderLeft: '1px solid var(--border-subtle)',
        paddingLeft: 22
      }
    }, /*#__PURE__*/React.createElement(Stat, s)))));
  }
  Object.assign(window, {
    SiteDashboard,
    SiteTrust
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-showcase.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-util.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* HSE Check website — shared helpers. Assigns window.Reveal + window.useInView. */
(function () {
  function useInView(threshold = 0.18) {
    const ref = React.useRef(null);
    const [seen, setSeen] = React.useState(false);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      }, {
        threshold
      });
      io.observe(el);
      return () => io.disconnect();
    }, [threshold]);
    return [ref, seen];
  }

  /** Fade + rise on scroll into view. `delay` in ms. */
  function Reveal({
    children,
    delay = 0,
    y = 24,
    as = 'div',
    style,
    ...rest
  }) {
    const [ref, seen] = useInView();
    const Tag = as;
    return /*#__PURE__*/React.createElement(Tag, _extends({
      ref: ref,
      style: {
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.7s var(--ease-out) ${delay}ms, transform 0.7s var(--ease-out) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style
      }
    }, rest), children);
  }
  window.useInView = useInView;
  window.Reveal = Reveal;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-util.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-workflow.jsx
try { (() => {
/* HSE Check website — workflow stepper. window.SiteWorkflow */
(function () {
  const {
    Eyebrow,
    Badge
  } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  const {
    Reveal,
    useInView
  } = window;
  const steps = [{
    ic: 'camera',
    t: '现场上报',
    d: '检查员拍照取证，AI 自动定性、定级。',
    sla: '即时',
    color: 'var(--accent)'
  }, {
    ic: 'send',
    t: '智能派单',
    d: '按区域 / 责任人自动派单，超时自动升级。',
    sla: '≤ 2h',
    color: 'var(--cyan)'
  }, {
    ic: 'wrench',
    t: '整改执行',
    d: '责任人接单整改，回传整改前后对比照片。',
    sla: '按隐患等级',
    color: 'var(--warning)'
  }, {
    ic: 'circle-check-big',
    t: '验收闭环',
    d: '复核通过后闭环，全程留痕、可追溯。',
    sla: '闭环留档',
    color: 'var(--success)'
  }];
  function SiteWorkflow() {
    const [ref, seen] = useInView(0.3);
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        background: 'var(--bg-raised)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-wide)',
        margin: '0 auto',
        padding: 'var(--section-y) var(--gutter)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        maxWidth: 680,
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "\u95ED\u73AF\u5DE5\u4F5C\u6D41 / Workflow")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 60,
      as: "h2",
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 'var(--text-display-md)',
        letterSpacing: 'var(--tracking-display)',
        lineHeight: 1.08,
        margin: '18px 0 0'
      }
    }, "\u4E0A\u62A5\u5230\u95ED\u73AF\uFF0C\u6BCF\u4E00\u6B65\u90FD\u6709\u65F6\u6548\u7EA6\u675F")), /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        position: 'relative',
        marginTop: 72
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hse-wf-track",
      style: {
        position: 'absolute',
        top: 27,
        left: '12%',
        right: '12%',
        height: 2,
        background: 'var(--border-default)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        transformOrigin: 'left',
        background: 'var(--gradient-accent)',
        boxShadow: '0 0 12px rgba(198,242,78,0.5)',
        transform: seen ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 1.8s var(--ease-out) 0.2s'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20
      },
      className: "hse-wf-grid"
    }, steps.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: s.t,
      delay: i * 180,
      style: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: '50%',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-base)',
        border: `1.5px solid ${s.color}`,
        boxShadow: `0 0 0 6px var(--bg-raised), 0 0 20px ${s.color}40`
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.ic,
      size: 24,
      color: s.color
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)'
      }
    }, i + 1)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18,
        fontSize: 17,
        fontWeight: 600,
        letterSpacing: '-0.01em'
      }
    }, s.t), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      size: "sm"
    }, "SLA \xB7 ", s.sla)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13.5,
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        margin: '14px 0 0',
        maxWidth: 220
      }
    }, s.d)))))), /*#__PURE__*/React.createElement("style", null, `
          @media (max-width: 860px) {
            .hse-wf-grid { grid-template-columns: 1fr 1fr !important; row-gap: 40px !important; }
            .hse-wf-track { display: none; }
          }
        `));
  }
  window.SiteWorkflow = SiteWorkflow;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-workflow.jsx", error: String((e && e.message) || e) }); }

__ds_ns.GridBackground = __ds_scope.GridBackground;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Input = __ds_scope.Input;

})();
