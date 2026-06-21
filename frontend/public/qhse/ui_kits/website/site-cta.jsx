/* QHSE 统一管理平台 website — CTA + footer. window.SiteCTA, window.SiteFooter */
(function () {
  const { Button, Eyebrow, GridBackground } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  const { Reveal } = window;

  function SiteCTA() {
    return (
      <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
        <Reveal>
          <div style={{
            position: 'relative', overflow: 'hidden', textAlign: 'center',
            borderRadius: 'var(--radius-3xl)', border: '1px solid var(--border-accent)',
            background: 'var(--surface-1)', padding: 'clamp(48px,7vw,88px) var(--gutter)',
            boxShadow: 'var(--highlight-top), var(--glow-accent-soft)',
          }}>
            <GridBackground variant="dots" glow fade intensity={0.8} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Eyebrow>开始使用 / Get started</Eyebrow>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-display-md)', letterSpacing: 'var(--tracking-display)', lineHeight: 1.08, margin: '20px auto 0', maxWidth: 640 }}>
                让下一次检查，<br />就达到法律级证据标准
              </h2>
              <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-secondary)', margin: '18px auto 0', maxWidth: 520, lineHeight: 1.6 }}>
                30 分钟看懂从现场取证到集团驾驶舱的完整闭环。我们的方案工程师将为你的组织架构做一对一演示。
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 34, flexWrap: 'wrap' }}>
                <Button variant="primary" size="lg" iconRight={<Icon name="arrow-right" size={16} />}>申请演示</Button>
                <Button variant="secondary" size="lg">免费试用 14 天</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    );
  }

  function SiteFooter() {
    const cols = [
      ['产品', ['核心能力', '工作流引擎', '数据驾驶舱', '移动端 App', '私有化部署']],
      ['解决方案', ['石油石化', '能源电力', '矿山冶金', '集团多租户']],
      ['资源', ['客户案例', '帮助文档', 'API 文档', '安全合规']],
      ['公司', ['关于我们', '加入我们', '联系销售', '隐私政策']],
    ];
    return (
      <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-base)' }}>
        <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: '64px var(--gutter) 40px', display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 1fr)', gap: 32 }} className="hse-foot-grid">
          <div>
            <img src="/logo-sm.png" style="filter:brightness(0) invert(1);opacity:.85" height="32" alt="QHSE 统一管理平台" />
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6, margin: '16px 0 0', maxWidth: 240 }}>
              面向高危行业的新一代安全管理 SaaS。可信采集 · 智能整改 · 数据驾驶舱。
            </p>
          </div>
          {cols.map(([h, items]) => (
            <div key={h}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>{h}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((it) => (
                  <a key={it} href="#" style={{ fontSize: 13, color: 'var(--text-tertiary)', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}>{it}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: '20px var(--gutter)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>© 2026 QHSE 统一管理平台 · 京 ICP 备 2026000000 号</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>等保三级 · ISO 27001 · 私有化部署可选</span>
        </div>
      </footer>
    );
  }

  Object.assign(window, { SiteCTA, SiteFooter });
})();
