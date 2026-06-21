/* HSE Check website — workflow stepper. window.SiteWorkflow */
(function () {
  const { Eyebrow, Badge } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;
  const { Reveal, useInView } = window;

  const steps = [
    { ic: 'camera', t: '现场上报', d: '检查员拍照取证，AI 自动定性、定级。', sla: '即时', color: 'var(--accent)' },
    { ic: 'send', t: '智能派单', d: '按区域 / 责任人自动派单，超时自动升级。', sla: '≤ 2h', color: 'var(--cyan)' },
    { ic: 'wrench', t: '整改执行', d: '责任人接单整改，回传整改前后对比照片。', sla: '按隐患等级', color: 'var(--warning)' },
    { ic: 'circle-check-big', t: '验收闭环', d: '复核通过后闭环，全程留痕、可追溯。', sla: '闭环留档', color: 'var(--success)' },
  ];

  function SiteWorkflow() {
    const [ref, seen] = useInView(0.3);
    return (
      <section style={{
        position: 'relative',
        background: 'var(--bg-raised)',
        borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
            <Reveal><Eyebrow>闭环工作流 / Workflow</Eyebrow></Reveal>
            <Reveal delay={60} as="h2" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-display-md)', letterSpacing: 'var(--tracking-display)', lineHeight: 1.08, margin: '18px 0 0' }}>
              上报到闭环，每一步都有时效约束
            </Reveal>
          </div>

          <div ref={ref} style={{ position: 'relative', marginTop: 72 }}>
            {/* connector line */}
            <div className="hse-wf-track" style={{ position: 'absolute', top: 27, left: '12%', right: '12%', height: 2, background: 'var(--border-default)' }}>
              <div style={{ position: 'absolute', inset: 0, transformOrigin: 'left', background: 'var(--gradient-accent)', boxShadow: '0 0 12px rgba(198,242,78,0.5)', transform: seen ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 1.8s var(--ease-out) 0.2s' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="hse-wf-grid">
              {steps.map((s, i) => (
                <Reveal key={s.t} delay={i * 180} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%', position: 'relative', zIndex: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--bg-base)', border: `1.5px solid ${s.color}`,
                    boxShadow: `0 0 0 6px var(--bg-raised), 0 0 20px ${s.color}40`,
                  }}>
                    <Icon name={s.ic} size={24} color={s.color} />
                    <span style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', background: 'var(--surface-2)', border: '1px solid var(--border-default)', fontFamily: 'var(--font-mono)', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>{i + 1}</span>
                  </div>
                  <div style={{ marginTop: 18, fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>{s.t}</div>
                  <div style={{ marginTop: 10 }}><Badge tone="neutral" size="sm">SLA · {s.sla}</Badge></div>
                  <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '14px 0 0', maxWidth: 220 }}>{s.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 860px) {
            .hse-wf-grid { grid-template-columns: 1fr 1fr !important; row-gap: 40px !important; }
            .hse-wf-track { display: none; }
          }
        `}</style>
      </section>
    );
  }
  window.SiteWorkflow = SiteWorkflow;
})();
