/* HSE Check website — hero. window.SiteHero */
(function () {
  const { Button, Badge, Eyebrow, GridBackground } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  const { AppWindow, DashboardMock, CaptureCard, ProductDashboard } = window;

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
    return (
      <div ref={ref} style={{ width: '100%', height: 720 * scale, overflow: 'hidden' }}>
        <div style={{ width: 1280, height: 720, transformOrigin: 'top left', transform: `scale(${scale})` }}>
          {ProductDashboard ? <ProductDashboard /> : null}
        </div>
      </div>
    );
  }

  function SiteHero() {
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
      const t = setTimeout(() => setReady(true), 60);
      return () => clearTimeout(t);
    }, []);
    return (
      <section className={ready ? 'hse-hero-ready' : ''} style={{ position: 'relative', overflow: 'hidden', paddingTop: 72 }}>
        <GridBackground variant="grid" glow fade />
        <div style={{
          position: 'relative', zIndex: 1, maxWidth: 'var(--container-wide)',
          margin: '0 auto', padding: '0 var(--gutter)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
          <div className="hse-fade" style={{ transitionDelay: '0ms' }}>
            <Badge tone="accent" variant="dot" size="md">面向高危行业的新一代安全管理平台</Badge>
          </div>
          <h1 className="hse-fade" style={{
            transitionDelay: '80ms',
            fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 'var(--text-display-xl)', lineHeight: 1.02,
            letterSpacing: 'var(--tracking-display)', margin: '26px 0 0',
            maxWidth: 980,
          }}>
            每一次检查,<br />都有<span style={{ color: 'var(--accent-text)' }}>法律级证据</span>
          </h1>
          <p className="hse-fade" style={{
            transitionDelay: '160ms',
            fontSize: 'var(--text-body-lg)', color: 'var(--text-secondary)',
            lineHeight: 1.6, margin: '24px 0 0', maxWidth: 600,
          }}>
            现场可信采集 → 智能派单整改 → 多维数据驾驶舱。
            用科技手段替代纸质表格与微信群，让石油、化工、能源、矿山的安全管理可信、可控、可追溯。
          </p>
          <div className="hse-fade" style={{ transitionDelay: '240ms', display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="primary" size="lg" iconRight={<Icon name="arrow-right" size={16} />}>申请演示</Button>
            <Button variant="secondary" size="lg" iconLeft={<Icon name="play" size={15} />}>观看 2 分钟介绍</Button>
          </div>
          <div className="hse-fade" style={{ transitionDelay: '300ms', marginTop: 18, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)', letterSpacing: '0.02em' }}>
            无需信用卡 · 14 天企业试用 · 私有化部署可选
          </div>

          {/* product mockup */}
          <div className="hse-fade" style={{ transitionDelay: '420ms', position: 'relative', width: '100%', maxWidth: 1080, marginTop: 64 }}>
            <AppWindow title="qhse.sagaway.cn/bigscreen" style={{ position: 'relative', zIndex: 1 }}>
              <ScaledDashboard />
            </AppWindow>
            <div className="hse-float" style={{ position: 'absolute', right: -18, bottom: -34, zIndex: 2 }}>
              <CaptureCard />
            </div>
            {/* base glow */}
            <div style={{ position: 'absolute', inset: '20% 10% -10%', background: 'radial-gradient(60% 60% at 50% 50%, rgba(198,242,78,0.16), transparent 70%)', filter: 'blur(20px)', zIndex: 0 }} />
          </div>

          {/* logo cloud */}
          <div style={{ marginTop: 96, marginBottom: 8, width: '100%' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              已服务 1,280+ 高危行业企业
            </div>
            <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap', marginTop: 22, opacity: 0.65 }}>
              {['中国化工', '国家能源', '中石化', '紫金矿业', '万华化学', '宝武集团'].map((n) => (
                <span key={n} style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-secondary)' }}>{n}</span>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .hse-fade { opacity: 1; transform: translateY(16px); transition: transform 0.7s var(--ease-out); will-change: transform; }
          .hse-hero-ready .hse-fade { transform: translateY(0); }
          .hse-float { animation: hseFloat 5s ease-in-out infinite alternate; }
          @keyframes hseFloat { from { transform: translateY(0); } to { transform: translateY(-14px); } }
          @media (prefers-reduced-motion: reduce) {
            .hse-fade { transform: none; transition: none; }
            .hse-float { animation: none; }
          }
        `}</style>
      </section>
    );
  }
  window.SiteHero = SiteHero;
})();
