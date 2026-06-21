/* 忠实复刻：HSE Check 真实"安全生产隐患监控指挥中心"数据大屏。
 * 配色 / 数据 / 版式 100% 还原自客户现网产品（qhse.qa.sagaway.cn/bigscreen），
 * 图表用 SVG 重绘以便离线渲染。这是官网里要嵌入的"真实产品截图"。
 * 内部固定 1280x720，外层用 transform:scale 适配。window.ProductDashboard */
(function () {
  const C = {
    bg: '#03070f', panel: 'rgba(10,22,40,0.55)', line: 'rgba(57,198,240,0.30)',
    cyan: '#39c6f0', green: '#3ddc84', orange: '#ffab3d', red: '#ff5b5b',
    ink: '#eaf4ff', ink2: '#8fb0d6',
  };
  const ink3 = '#5b7a9c';

  function Panel({ title, en, more, children, style }) {
    return (
      <div style={{
        position: 'relative', background: 'rgba(10,22,40,0.55)',
        border: '1px solid rgba(57,198,240,0.18)', borderRadius: 12,
        display: 'flex', flexDirection: 'column', minHeight: 0, ...style,
      }}>
        <span style={{ position: 'absolute', left: -1, top: -1, width: 12, height: 12, borderLeft: '2px solid '+C.cyan, borderTop: '2px solid '+C.cyan, borderRadius: '8px 0 0 0', opacity: 0.7 }} />
        <span style={{ position: 'absolute', right: -1, bottom: -1, width: 12, height: 12, borderRight: '2px solid '+C.cyan, borderBottom: '2px solid '+C.cyan, borderRadius: '0 0 8px 0', opacity: 0.7 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderBottom: '1px solid rgba(57,198,240,0.12)' }}>
          <span style={{ width: 3, height: 13, background: C.cyan, borderRadius: 2, boxShadow: '0 0 6px '+C.cyan }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: C.ink, letterSpacing: '0.5px' }}>{title}</span>
          {en && <span style={{ fontSize: 10, color: C.cyan, fontFamily: 'monospace', letterSpacing: '1px', opacity: 0.7 }}>{en}</span>}
          {more && <span style={{ marginLeft: 'auto', fontSize: 10.5, color: C.ink2 }}>{more}</span>}
        </div>
        <div style={{ flex: 1, padding: 12, minHeight: 0 }}>{children}</div>
      </div>
    );
  }

  function KTile({ tone, label, value, unit, chg }) {
    const col = { blue: C.cyan, orange: C.orange, red: C.red, green: C.green }[tone];
    return (
      <div style={{ position: 'relative', background: 'rgba(8,18,34,0.6)', border: '1px solid rgba(57,198,240,0.14)', borderRadius: 8, padding: '10px 12px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: col }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.ink2 }}>
          <span style={{ width: 6, height: 6, borderRadius: 2, background: col }} />{label}
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, color: C.ink, lineHeight: 1.1, marginTop: 4, textShadow: '0 0 14px '+col+'66', fontVariantNumeric: 'tabular-nums' }}>
          {value}<span style={{ fontSize: 12, fontWeight: 500, color: ink3, marginLeft: 3 }}>{unit}</span>
        </div>
        <div style={{ fontSize: 10.5, color: ink3, marginTop: 2 }}>{chg}</div>
      </div>
    );
  }

  // ---- SVG charts ----
  function RingChart() {
    const data = [['物体打击', 9, C.cyan], ['触电', 7, C.orange], ['机械伤害', 5, '#7c5cff'], ['高处坠落', 4, C.green], ['其他', 4, C.red]];
    const total = data.reduce((s, d) => s + d[1], 0);
    let acc = 0; const R = 52, sw = 16, cx = 62, cy = 62, circ = 2 * Math.PI * R;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: '100%' }}>
        <svg width="124" height="124" viewBox="0 0 124 124" style={{ flex: 'none' }}>
          {data.map(([n, v, c], i) => {
            const frac = v / total, dash = frac * circ, off = -acc * circ; acc += frac;
            return <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={c} strokeWidth={sw}
              strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={off}
              transform={`rotate(-90 ${cx} ${cy})`} style={{ filter: 'drop-shadow(0 0 3px '+c+'88)' }} />;
          })}
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="20" fontWeight="700" fill={C.ink}>{total}</text>
          <text x={cx} y={cy + 13} textAnchor="middle" fontSize="9" fill={C.ink2}>事故类型</text>
        </svg>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data.map(([n, v, c], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
              <span style={{ color: C.ink2, flex: 1 }}>{n}</span>
              <span style={{ color: C.ink, fontFamily: 'monospace' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function TrendChart() {
    const W = 412, H = 120, pad = 8;
    const report = [5, 8, 6, 11, 9, 14, 12, 16, 13, 18, 15, 19];
    const closed = [3, 6, 5, 9, 7, 11, 10, 13, 12, 15, 14, 17];
    const max = 20;
    const x = (i) => pad + (i * (W - pad * 2)) / (report.length - 1);
    const y = (v) => H - pad - (v / max) * (H - pad * 2);
    const path = (arr) => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
    const area = (arr) => path(arr) + ` L${x(arr.length - 1)},${H - pad} L${x(0)},${H - pad} Z`;
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.cyan} stopOpacity="0.3" /><stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g, i) => <line key={i} x1={pad} x2={W - pad} y1={pad + g * (H - pad * 2)} y2={pad + g * (H - pad * 2)} stroke="rgba(57,198,240,0.08)" />)}
        <path d={area(report)} fill="url(#tg)" />
        <path d={path(report)} fill="none" stroke={C.cyan} strokeWidth="2" style={{ filter: 'drop-shadow(0 0 3px '+C.cyan+')' }} />
        <path d={path(closed)} fill="none" stroke={C.green} strokeWidth="2" strokeDasharray="4 3" />
      </svg>
    );
  }

  function MapPanel() {
    const nodes = [[28, 32, C.green, '兴盛', 18], [72, 28, C.green, '兴达', 13], [22, 70, C.orange, '华东', 9], [78, 66, C.red, '西北', 6], [54, 80, C.orange, '南区', 7]];
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {nodes.map((n, i) => <line key={i} x1="50%" y1="50%" x2={n[0]+'%'} y2={n[1]+'%'} stroke="rgba(57,198,240,0.25)" strokeWidth="1" />)}
        </svg>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 60, height: 60, borderRadius: '50%', border: '1px solid rgba(57,198,240,0.4)', display: 'grid', placeItems: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'radial-gradient(circle, rgba(57,198,240,0.5), rgba(57,198,240,0.05))', display: 'grid', placeItems: 'center', fontSize: 9, color: C.ink, fontWeight: 700 }}>集团</div>
        </div>
        {nodes.map((n, i) => (
          <div key={i} style={{ position: 'absolute', left: n[0]+'%', top: n[1]+'%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            <div style={{ width: n[4], height: n[4], borderRadius: '50%', background: n[2], boxShadow: '0 0 10px '+n[2], margin: '0 auto' }} />
            <div style={{ fontSize: 10, color: '#dceaff', marginTop: 4, textShadow: '0 1px 3px #000' }}>{n[3]}</div>
          </div>
        ))}
        <div style={{ position: 'absolute', left: 12, bottom: 8, display: 'flex', gap: 12, fontSize: 10, color: C.ink2 }}>
          <span><i style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 2, background: C.green, marginRight: 4 }} />达标 ≥90%</span>
          <span><i style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 2, background: C.orange, marginRight: 4 }} />预警 80–90%</span>
          <span><i style={{ display: 'inline-block', width: 7, height: 7, borderRadius: 2, background: C.red, marginRight: 4 }} />超标 &lt;80%</span>
        </div>
      </div>
    );
  }

  function ProductDashboard() {
    const counters = [['71', '起', '累计上报', C.cyan], ['64', '起', '已闭环（估算）', C.green], ['2', '起', '重大隐患', C.red], ['85.7', '%', '24h 方案及时率', C.orange]];
    const rank = [['1', '东营兴盛石油化工有限责任公司', 100.0], ['2', '山东兴达环保科技有限责任公司', 72.2]];
    const top5 = [
      ['#1', '电源线裸露且连接不规范，存在触电风险', '本期发生 4 起', 'major'],
      ['#2', '电脑主板裸露在桌面上，电线杂乱，存在触电风险', '本期发生 2 起', 'major'],
      ['#3', '泵体连接处存在明显泄漏，地面有油污积聚', '本期发生 1 起', 'gen'],
      ['#4', '键盘表面有灰尘和污渍，可能影响设备运行', '本期发生 1 起', 'gen'],
      ['#5', '配电盒安装阻挡逃生路线', '本期发生 1 起', 'gen'],
    ];
    return (
      <div style={{
        width: 1280, height: 720, background: C.bg, color: C.ink,
        fontFamily: '"Noto Sans SC", system-ui, sans-serif', position: 'relative', overflow: 'hidden',
        backgroundImage: 'radial-gradient(900px 500px at 50% -10%, rgba(36,96,170,0.25), transparent 70%)',
      }}>
        {/* grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(60,120,200,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(60,120,200,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* topbar */}
        <div style={{ position: 'relative', height: 60, display: 'flex', alignItems: 'center', padding: '0 28px', borderBottom: '1px solid '+C.line }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: C.ink2 }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid '+C.line, display: 'grid', placeItems: 'center', color: C.cyan, fontSize: 14 }}>◈</span>
            东营兴盛石油化工
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '5px', textShadow: '0 0 24px rgba(57,198,240,0.45)' }}>安全生产隐患监控指挥中心</div>
            <div style={{ fontSize: 10, letterSpacing: '4px', color: C.cyan, opacity: 0.8, marginTop: 2 }}>HSE INTELLIGENT MONITORING &amp; COMMAND CENTER</div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.green, fontSize: 13 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.green, boxShadow: '0 0 8px '+C.green }} />实时
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: 20, letterSpacing: '1px' }}>14:32:07</span>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(57,198,240,0.6), transparent)' }} />
        </div>
        {/* body grid */}
        <div style={{ position: 'relative', height: 660, display: 'grid', gridTemplateColumns: '340px 1fr 340px', gap: 16, padding: 16 }}>
          {/* left col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
            <Panel title="核心指标" en="REALTIME" style={{ flex: '0 0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <KTile tone="blue" label="上报数" value="29" unit="起" chg="较上周 +12%" />
                <KTile tone="orange" label="整改中" value="2" unit="起" chg="处置中" />
                <KTile tone="red" label="超期未改" value="5" unit="起" chg="需督办" />
                <KTile tone="green" label="闭环率" value="75.9" unit="%" chg="目标 90%" />
              </div>
            </Panel>
            <Panel title="事故类型分布" en="GB 6441-2025" style={{ flex: '0 0 168px' }}><RingChart /></Panel>
            <Panel title="上报量 vs 闭环量趋势" en="TREND" style={{ flex: 1 }}><TrendChart /></Panel>
          </div>
          {/* center col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
            <Panel title="各单位隐患闭环达标分布" more="点位大小=隐患存量 · 颜色=闭环达标度" style={{ flex: 1 }}><MapPanel /></Panel>
            <div style={{ flex: '0 0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
              {counters.map(([v, u, l, c]) => (
                <div key={l} style={{ position: 'relative', background: 'rgba(10,22,40,0.55)', border: '1px solid rgba(57,198,240,0.18)', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, color: c, fontVariantNumeric: 'tabular-nums' }}>{v}<span style={{ fontSize: 13, color: ink3, marginLeft: 2 }}>{u}</span></div>
                  <div style={{ fontSize: 11.5, color: C.ink2, marginTop: 8 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* right col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
            <Panel title="单位闭环率 · 红黑榜" en="RANK" style={{ flex: '0 0 auto' }}>
              <div style={{ fontSize: 11, color: C.ink2, marginBottom: 8 }}>闭环率排名</div>
              {rank.map(([rk, nm, pct]) => (
                <div key={rk} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                  <span style={{ width: 18, height: 18, borderRadius: 4, background: '#1f9d55', color: '#fff', fontSize: 11, display: 'grid', placeItems: 'center', flex: 'none' }}>{rk}</span>
                  <span style={{ flex: 1, fontSize: 11, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nm}</span>
                  <div style={{ width: 70, height: 6, background: 'rgba(57,198,240,0.12)', borderRadius: 3, overflow: 'hidden', flex: 'none' }}>
                    <div style={{ height: '100%', width: pct + '%', background: 'linear-gradient(90deg,#1f8c50,#3ddc84)', borderRadius: 3 }} />
                  </div>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: C.ink, width: 36, textAlign: 'right' }}>{pct.toFixed(1)}</span>
                </div>
              ))}
            </Panel>
            <Panel title="高发隐患 TOP5" style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {top5.map(([rk, ds, mt, lv]) => (
                  <div key={rk} style={{ display: 'flex', gap: 9, paddingLeft: 8, borderLeft: '2px solid ' + (lv === 'major' ? C.red : C.orange) }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 11, color: C.cyan, flex: 'none', width: 18 }}>{rk}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: C.ink, lineHeight: 1.4 }}>{ds}</div>
                      <div style={{ fontSize: 11, color: C.ink2, marginTop: 3, display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span>{mt}</span>
                        <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: (lv === 'major' ? C.red : C.orange) + '22', color: lv === 'major' ? C.red : C.orange }}>{lv === 'major' ? '高发' : '关注'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    );
  }

  window.ProductDashboard = ProductDashboard;
})();
