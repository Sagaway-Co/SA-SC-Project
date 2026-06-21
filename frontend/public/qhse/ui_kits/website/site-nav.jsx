/* HSE Check website — top navigation. window.SiteNav */
(function () {
  const { Button, Badge } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;

  function SiteNav() {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 12);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = ['核心能力', '工作流', '数据驾驶舱', '客户案例', '定价'];

    return (
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(8,9,10,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
        transition: 'background 0.3s var(--ease-out), border-color 0.3s var(--ease-out)',
      }}>
        <div style={{
          maxWidth: 'var(--container-wide)', margin: '0 auto',
          padding: '0 var(--gutter)', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <img src="/logo-sm.png" style={{filter:'brightness(0) invert(1)',opacity:.88,display:'block'}} width="36" height="36" alt="Sagaway" />
              <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                QHSE 统一管理平台
              </span>
            </a>
            <nav style={{ display: 'flex', gap: 4 }} className="hse-navlinks">
              {links.map((l) => (
                <a key={l} href="#" style={{
                  fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none',
                  padding: '7px 12px', borderRadius: 'var(--radius-md)', transition: 'color .15s, background .15s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--surface-1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
                >{l}</a>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button variant="ghost" size="sm">登录</Button>
            <Button variant="primary" size="sm" iconRight={<Icon name="arrow-right" size={15} />}>申请演示</Button>
          </div>
        </div>
      </header>
    );
  }
  window.SiteNav = SiteNav;
})();
