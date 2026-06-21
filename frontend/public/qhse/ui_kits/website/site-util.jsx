/* HSE Check website — shared helpers. Assigns window.Reveal + window.useInView. */
(function () {
  function useInView(threshold = 0.18) {
    const ref = React.useRef(null);
    const [seen, setSeen] = React.useState(false);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
      }, { threshold });
      io.observe(el);
      return () => io.disconnect();
    }, [threshold]);
    return [ref, seen];
  }

  /** Fade + rise on scroll into view. `delay` in ms. */
  function Reveal({ children, delay = 0, y = 24, as = 'div', style, ...rest }) {
    const [ref, seen] = useInView();
    const Tag = as;
    return (
      <Tag
        ref={ref}
        style={{
          opacity: seen ? 1 : 0,
          transform: seen ? 'translateY(0)' : `translateY(${y}px)`,
          transition: `opacity 0.7s var(--ease-out) ${delay}ms, transform 0.7s var(--ease-out) ${delay}ms`,
          willChange: 'opacity, transform',
          ...style,
        }}
        {...rest}
      >
        {children}
      </Tag>
    );
  }

  window.useInView = useInView;
  window.Reveal = Reveal;
})();
