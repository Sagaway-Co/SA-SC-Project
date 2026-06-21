/* HSE Check website — pain→solution + core features. window.SiteFeatures */
(function () {
  const { Card, Eyebrow, Badge } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  const { Reveal } = window;

  function SectionHead({ eyebrow, title, sub }) {
    return (
      <div style={{ maxWidth: 720 }}>
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={60} as="h2" style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: 'var(--text-display-md)', letterSpacing: 'var(--tracking-display)',
          lineHeight: 1.08, margin: '18px 0 0',
        }}>{title}</Reveal>
        {sub && <Reveal delay={120} as="p" style={{ fontSize: 'var(--text-body-lg)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '16px 0 0' }}>{sub}</Reveal>}
      </div>
    );
  }

  function Compare() {
    const pain = ['检查靠纸质表格，照片可后补、可 PS', '整改靠电话和微信群，进度无人跟踪', '责任无法追溯，出事故难定责', '数据散落各处，集团看不到全局'];
    const gain = ['北斗 + 水印 + 指纹，现场取证不可篡改', '系统自动派单，超时升级、节点留痕', '每个动作可追溯到人、到时间、到坐标', '集团统一驾驶舱，实时汇总到分钟'];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginTop: 56 }}>
        <Reveal>
          <Card padding={28} style={{ background: 'var(--bg-raised)', borderStyle: 'dashed' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Icon name="file-x" size={20} color="var(--text-tertiary)" />
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)' }}>传统方式</span>
            </div>
            {pain.map((p) => (
              <div key={p} style={{ display: 'flex', gap: 10, padding: '11px 0', borderTop: '1px solid var(--border-subtle)', fontSize: 14, color: 'var(--text-tertiary)' }}>
                <Icon name="x" size={17} color="var(--danger)" style={{ marginTop: 1 }} />
                <span>{p}</span>
              </div>
            ))}
          </Card>
        </Reveal>
        <Reveal delay={120}>
          <Card padding={28} glow style={{ borderColor: 'var(--border-accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <img src="/logo-sm.png" style={{filter:"brightness(0) invert(1)"}} width="22" height="22" alt="" />
              <span style={{ fontSize: 15, fontWeight: 600 }}>QHSE 统一管理平台</span>
            </div>
            {gain.map((p) => (
              <div key={p} style={{ display: 'flex', gap: 10, padding: '11px 0', borderTop: '1px solid var(--border-subtle)', fontSize: 14, color: 'var(--text-primary)' }}>
                <Icon name="check" size={17} color="var(--accent-text)" style={{ marginTop: 1 }} />
                <span>{p}</span>
              </div>
            ))}
          </Card>
        </Reveal>
      </div>
    );
  }

  const features = [
    { ic: 'fingerprint', tag: '证据链', t: '不可篡改的可信采集', d: '北斗定位 + Canvas 实时水印 + SHA-256 指纹，每张照片自带时间、坐标与防伪指纹，达到法律级证据标准。', span: 2 },
    { ic: 'scan-eye', tag: 'AI 辅助', t: '拍照即识别隐患', d: '基于 GB 6441 自动判定事故类型，建议隐患等级，检查员少填表、不漏判。', span: 1 },
    { ic: 'route', tag: '工作流', t: '全链路闭环', d: '从上报到验收，每个节点带时效约束，超时自动升级、全程留痕。', span: 1 },
    { ic: 'building-2', tag: '多租户', t: '集团级组织隔离', d: '集团统一看板，各分子公司数据隔离，一个平台服务整个集团多级架构。', span: 1 },
    { ic: 'monitor-dot', tag: '驾驶舱', t: '数据大屏', d: 'KPI 卡片、趋势分析、考核红黑榜，支持大屏投屏。', span: 1 },
  ];

  function SiteFeatures() {
    return (
      <section style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
        <SectionHead
          eyebrow="为什么不一样 / Why different"
          title="把现场的每一步，都变成可信的数据"
          sub="竞品是把纸质表格搬到屏幕上。我们重构了整个安全管理流程——从证据产生的那一刻起就值得信任。"
        />
        <Compare />

        <div style={{ marginTop: 96 }}>
          <SectionHead eyebrow="核心能力 / Capabilities" title="五个环节，一套系统" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 48 }} className="hse-feat-grid">
            {features.map((f, i) => (
              <Reveal key={f.t} delay={(i % 2) * 90} style={{ gridColumn: f.span === 2 ? 'span 2' : 'span 1' }}>
                <Card interactive spotlight padding={28} style={{ height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      width: 44, height: 44, borderRadius: 'var(--radius-lg)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--accent-soft)', border: '1px solid var(--accent-line)',
                    }}><Icon name={f.ic} size={22} color="var(--accent-text)" /></span>
                    <Badge tone="neutral" size="sm">{f.tag}</Badge>
                  </div>
                  <h3 style={{ fontSize: 'var(--text-h4)', fontWeight: 600, letterSpacing: '-0.02em', margin: '20px 0 8px' }}>{f.t}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{f.d}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }
  window.SiteFeatures = SiteFeatures;
})();
