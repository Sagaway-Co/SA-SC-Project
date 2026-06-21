/* HSE Check website — product mockups (the "screenshots").
 * window.AppWindow, window.DashboardMock, window.CaptureCard */
(function () {
  const { Badge } = window.HSECheckDesignSystem_6f6b44;
  const Icon = window.Icon;

  /** macOS-style window chrome. */
  function AppWindow({ title = 'app.hsecheck.com', children, style }) {
    return (
      <div style={{
        background: 'var(--bg-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--highlight-top), var(--shadow-xl)',
        ...style,
      }}>
        <div style={{
          height: 38, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px',
          borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-1)',
        }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
          <div style={{
            margin: '0 auto', fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--text-tertiary)', padding: '3px 14px',
            background: 'var(--bg-base)', borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
          }}>{title}</div>
        </div>
        {children}
      </div>
    );
  }

  function Bar({ h, c }) {
    return <div style={{ flex: 1, height: h, background: c, borderRadius: '3px 3px 0 0' }} />;
  }

  /** Group safety-dashboard view. */
  function DashboardMock() {
    const nav = [
      ['layout-dashboard', '驾驶舱', true],
      ['clipboard-check', '检查任务', false],
      ['triangle-alert', '隐患整改', false],
      ['route', '工作流', false],
      ['building-2', '组织架构', false],
      ['chart-no-axes-column', '考核排名', false],
    ];
    const hazards = [
      ['储罐区动火作业未审批', 'grade1', 'I 级', '超期 2h', 'danger'],
      ['二号车间消防通道堵塞', 'grade2', 'II 级', '整改中', 'warning'],
      ['配电房标识缺失', 'grade3', 'III 级', '待复核', 'info'],
      ['作业人员未戴护目镜', 'grade4', 'IV 级', '已闭环', 'success'],
    ];
    const bars = [38, 52, 44, 70, 58, 82, 64, 90, 76, 95];

    return (
      <div style={{ display: 'flex', height: 460, fontFamily: 'var(--font-sans)' }}>
        {/* sidebar */}
        <div style={{
          width: 188, flex: 'none', borderRight: '1px solid var(--border-subtle)',
          padding: 14, background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', gap: 3,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-tertiary)', textTransform: 'uppercase', padding: '4px 8px 8px' }}>中国化工集团</div>
          {nav.map(([ic, label, active]) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px',
              borderRadius: 'var(--radius-md)', fontSize: 13,
              color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: active ? 'var(--surface-2)' : 'transparent',
              border: active ? '1px solid var(--border-subtle)' : '1px solid transparent',
            }}>
              <Icon name={ic} size={16} color={active ? 'var(--accent-text)' : 'var(--text-tertiary)'} />
              {label}
            </div>
          ))}
        </div>
        {/* main */}
        <div style={{ flex: 1, padding: 18, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>集团安全驾驶舱</div>
            <Badge tone="accent" variant="dot">实时</Badge>
          </div>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {[['本月隐患', '1,284', 'accent'], ['闭环率', '96.4%', 'success'], ['超期项', '7', 'danger']].map(([k, v, t]) => (
              <div key={k} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px 14px', background: 'var(--surface-1)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{k}</div>
                <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 4, fontVariantNumeric: 'tabular-nums', color: t === 'accent' ? 'var(--accent-text)' : t === 'success' ? 'var(--success)' : 'var(--danger)' }}>{v}</div>
              </div>
            ))}
          </div>
          {/* chart */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 14, background: 'var(--surface-1)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>隐患闭环趋势 · 近 10 周</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 70 }}>
              {bars.map((b, i) => <Bar key={i} h={`${b}%`} c={i === bars.length - 1 ? 'var(--accent)' : 'rgba(198,242,78,0.28)'} />)}
            </div>
          </div>
          {/* hazard list */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--surface-1)', overflow: 'hidden' }}>
            {hazards.map(([name, grade, gl, status, st], i) => (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                borderTop: i ? '1px solid var(--border-subtle)' : 'none', fontSize: 13,
              }}>
                <Badge tone={grade} size="sm">{gl}</Badge>
                <span style={{ flex: 1, color: 'var(--text-primary)' }}>{name}</span>
                <Badge tone={st} variant="dot" size="sm">{status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /** Field-capture card (北斗 + 水印 + AI). */
  function CaptureCard({ style }) {
    return (
      <div style={{
        width: 230, background: 'var(--surface-1)', border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', ...style,
      }}>
        <div style={{
          height: 132, position: 'relative',
          background: 'linear-gradient(135deg, #1a1d16, #0e120a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="hard-hat" size={44} color="rgba(198,242,78,0.5)" />
          {/* AI box */}
          <div style={{ position: 'absolute', top: 18, left: 18, width: 86, height: 64, border: '1.5px solid var(--accent)', borderRadius: 4, boxShadow: '0 0 12px rgba(198,242,78,0.4)' }}>
            <span style={{ position: 'absolute', top: -9, left: -1, fontFamily: 'var(--font-mono)', fontSize: 9, background: 'var(--accent)', color: 'var(--text-on-accent)', padding: '1px 5px', borderRadius: 3, fontWeight: 600 }}>未戴护目镜 98%</span>
          </div>
          {/* watermark */}
          <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, fontFamily: 'var(--font-mono)', fontSize: 8.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.6)' }}>
            北斗 39.9042°N 116.4074°E<br />2026-06-19 14:32:07 · SHA-256 ✓
          </div>
        </div>
        <div style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="shield-check" size={16} color="var(--accent-text)" />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>防篡改取证完成</span>
        </div>
      </div>
    );
  }

  Object.assign(window, { AppWindow, DashboardMock, CaptureCard });
})();
