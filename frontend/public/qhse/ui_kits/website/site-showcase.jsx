/* HSE Check website — data screen showcase + trust metrics.
 * window.SiteDashboard, window.SiteTrust */
(function () {
  const { Eyebrow, Badge, Stat } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  const { Reveal, useInView } = window;

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
    const { ProductDashboard } = window;
    return (
      <div ref={ref} style={{ width: '100%', height: 720 * scale, overflow: 'hidden' }}>
        <div style={{ width: 1280, height: 720, transformOrigin: 'top left', transform: `scale(${scale})` }}>
          {ProductDashboard ? <ProductDashboard /> : null}
        </div>
      </div>
    );
  }

  function BigScreen() {
    // Real product 大屏, framed with a dual-color (lime→cyan) glowing border.
    return (
      <div style={{
        position: 'relative', borderRadius: 'var(--radius-2xl)', padding: 1,
        background: 'linear-gradient(135deg, rgba(198,242,78,0.5), rgba(57,198,240,0.4) 50%, transparent)',
        boxShadow: 'var(--glow-accent-soft), var(--shadow-xl)',
      }}>
        <div style={{ borderRadius: 'calc(var(--radius-2xl) - 1px)', overflow: 'hidden', background: 'var(--bg-raised)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/logo-sm.png" width="20" height="20" alt="" />
              <span style={{ fontWeight: 600, fontSize: 14 }}>集团安全态势 · 实时大屏</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge tone="accent" variant="dot" size="sm">LIVE</Badge>
              <Badge tone="neutral" size="sm">支持大屏投屏</Badge>
            </div>
          </div>
          <ScaledDashboard />
        </div>
      </div>
    );
  }

  function SiteDashboard() {
    return (
      <section style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
          <Reveal><Eyebrow>数据驾驶舱 / Command center</Eyebrow></Reveal>
          <Reveal delay={60} as="h2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-display-md)', letterSpacing: 'var(--tracking-display)', lineHeight: 1.08, margin: '18px 0 0' }}>
            整个集团的安全态势，<span style={{ color: 'var(--accent-text)' }}>一屏掌控</span>
          </Reveal>
        </div>
        <Reveal><BigScreen /></Reveal>
      </section>
    );
  }

  function SiteTrust() {
    const stats = [
      { value: 1280, suffix: '+', label: '高危行业企业在用', sublabel: 'Enterprises' },
      { value: 1240000, label: '条隐患已闭环', sublabel: 'Hazards resolved' },
      { value: 96.4, decimals: 1, suffix: '%', label: '平均闭环率', sublabel: 'Avg. resolution' },
      { value: 99.99, decimals: 2, suffix: '%', label: '证据链完整率', sublabel: 'Evidence integrity' },
    ];
    return (
      <section style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'clamp(56px,8vw,96px) var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 22 }}>
              <Stat {...s} />
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  Object.assign(window, { SiteDashboard, SiteTrust });
})();
