# HSE Check — Design System

> 面向高危行业（石油、化工、能源、矿山）的新一代安全管理 SaaS。
> **科技公司做的安全软件，不是安全公司做的软件化工具。**

This is the design system for **HSE Check**: tokens, brand assets, reusable React
components, foundation specimen cards, and a full animated marketing-site UI kit.
The aesthetic target is high-end SaaS in the lineage of **Linear / Vercel / Raycast** —
the deliberate opposite of the "政企蓝 + 表格 UI" category norm.

## Sources
Built from a written product brief only — **no codebase or Figma was provided.**
All visual decisions (palette, type, motion, components) were authored from scratch
against the brief. If a brand kit, logo files, or product screenshots exist elsewhere,
share them and they can replace the placeholders here.

---

## Product context
HSE Check digitizes the safety-management loop for high-risk industries:
**现场可信采集**（北斗定位 + 防篡改水印 + AI 识别）→ **智能派单整改工作流** → **多维数据驾驶舱**.
It replaces paper checklists and WeChat-group coordination with a traceable, tamper-proof system.

- **Target buyer:** group-level safety directors & subsidiary safety leads at large
  high-risk enterprises with multi-level org structures.
- **Five core selling points (in landing order):**
  1. 证据链不可篡改 — 北斗 + Canvas 水印 + SHA-256 指纹，法律级可信采集
  2. AI 辅助定性 — 拍照即识别事故类型，按 GB 6441 建议隐患等级
  3. 全链路闭环工作流 — 上报→派单→整改→闭环，每个节点带时效约束、可追溯
  4. 集团级多租户 — 集团统一看板 + 分子公司数据隔离
  5. 数据驾驶舱 — KPI 卡片、趋势、考核红黑榜、大屏投屏

---

## CONTENT FUNDAMENTALS — how HSE Check writes

**Voice:** Confident, precise, result-oriented. Speaks to a serious enterprise buyer,
never to a consumer. Technical credibility over hype.

- **Headlines** are short, declarative, outcome-led — often a promise with a noun of proof:
  *"每一次检查，都有法律级证据"*, *"上报到闭环，每一步都有时效约束"*. Big, calm, certain.
- **Bilingual pairing:** Chinese headline + a short English/mono kicker for international polish
  (*核心能力 / Capabilities*, *Workflow*, *Command center*). English is a supporting kicker, not the lead.
- **Body copy** is restrained and concrete. It names the mechanism (北斗、SHA-256、GB 6441、SLA)
  rather than adjectives. One idea per sentence.
- **Banned words:** 颠覆 / 革命 / 领先全球 / 全球第一 and similar big claims. No exclamation marks.
- **Numbers carry the argument** — 96.4% 闭环率, 1,280+ 企业, SHA-256. Prefer a real metric to a superlative.
- **Pronouns:** address the org/team ("你的组织架构"), not a single "you". Professional, not chummy.
- **No emoji.** Iconography does the visual-accent job emoji would do in a consumer product.
- **Casing:** Chinese as written; English kickers UPPERCASE in mono; product name always "HSE Check".

---

## VISUAL FOUNDATIONS

**Overall vibe.** Dark-first, engineered, quietly premium. Deep near-black canvas, layered
neutral surfaces, hairline luminous borders, generous whitespace, and one decisive accent.
Depth comes from *layering + 1px borders + a faint top highlight*, not heavy drop shadows.

**Color.**
- Canvas `#08090A` with surfaces stepping up `#0D0E11 → #121317 → #181A1F → #20232A`.
- **Accent = hi-vis lime `#C6F24E`.** Chosen deliberately: it echoes safety vests / hazard tape,
  reads as "tech", and is the antithesis of government blue. Used sparingly — one glowing
  primary CTA per view, accent kickers, key data highlights. A lime gradient fills the primary button.
- Secondary signal: electric cyan `#54D6FF` for data-viz + links.
- Semantic: success `#46DD8A`, warning `#FFB23E`, danger `#FF5C4D`.
- **Hazard ramp (GB 6441):** I `#FF4D4D` · II `#FF8A3D` · III `#FFC93D` · IV `#54D6FF`.
- Text: `#F4F6F7` primary → `#9CA3AD` secondary → `#686E78` tertiary.

**Type.** **Geist** (UI + display) + **Geist Mono** (data, kickers, metadata), via Google Fonts.
Display headlines are large (64–104px) and tightly tracked (`-0.035em`) for impact.
Mono kickers are UPPERCASE with `+0.14em` tracking and a leading lime tick — the "technical voice".
Numerics use `tabular-nums`.

**Spacing & layout.** 4px base grid. Container 1200/1440px, gutter `clamp(20–64px)`,
section rhythm `clamp(80–160px)`. Centered hero; left-aligned section heads.

**Radii.** 6 / 8 / 12 / 16 / 22 / 32 / full. Cards use `xl (16)`; buttons `md (8)`; pills full.

**Borders.** Hairline, luminous-on-dark: `rgba(255,255,255, .055 / .10 / .16)`.
Accent border `rgba(198,242,78,.45)` flags featured/active surfaces.

**Shadows / glow.** Soft black shadows for elevation; the signature is the **accent glow**
(`0 8px 36px rgba(198,242,78,.28)`) reserved for primary CTAs and "live" data moments.
Cards always carry a faint inner top highlight (`inset 0 1px 0 rgba(255,255,255,.06)`).

**Backgrounds.** The brand canvas is the animated **GridBackground** — a perspective line/dot
grid masked with a radial fade, plus 1–2 drifting blurred glow orbs (lime + cyan). No stock-photo
hero. Product is shown as rendered UI inside window chrome, never as flat table screenshots.

**Motion (heavy by design).** Entrance: fade + 20–24px rise, `cubic-bezier(.16,1,.3,1)`, ~0.7–0.8s,
staggered. Count-up KPIs on scroll-into-view. Workflow connector line fills (`scaleX`) on view.
Chart bars/segments grow on view. Floating product cards (slow `translateY` loop). Spring easing
`cubic-bezier(.34,1.56,.64,1)` for the occasional subtle overshoot. **Everything gates on
`prefers-reduced-motion`** — reduced motion shows final state, no animation.

**Hover / press.** Buttons: primary brightens (`brightness(1.06)`) + slight scale-down on press
(`0.97`); ghost gains a surface fill; secondary/outline brighten. Cards: `translateY(-3px)`,
border → accent, surface lifts one step; optional cursor-follow radial spotlight.

**Blur / transparency.** Used for the sticky nav (it turns to `blur(14px)` glass once scrolled)
and overlays. Sparingly elsewhere.

**Imagery vibe.** Cool, dark, technical, high-contrast. Lime/cyan light accents. No warm stock photos.

---

## ICONOGRAPHY
- **System: [Lucide](https://lucide.dev) (MIT)** — thin `1.75px` stroke, rounded caps/joins.
  This stroke style matches the Linear/Vercel aesthetic and is the brand standard.
- Loaded from CDN (`unpkg.com/lucide`). `ui_kits/website/icons.jsx` exposes a tiny `<Icon name="…" />`
  React wrapper that inlines Lucide's icon-node data as SVG (so React owns the node).
  ⚠️ **Substitution flag:** no bespoke icon set was provided, so Lucide is used as the closest
  high-quality match. Swap for a house set if one exists.
- **Logo:** `assets/logo-mark.svg` (rounded-square check + evidence dot) and
  `assets/logo-wordmark.svg`. The mark doubles as favicon / app icon. These are authored
  placeholders — replace with official artwork when available.
- **No emoji, no unicode glyphs as icons.** Numbers/metrics use Geist Mono, not icon decoration.

---

## INDEX — what's in this system

**Root**
- `styles.css` — global entry point (consumers link this); `@import`s the token files.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`.
- `assets/` — `logo-mark.svg`, `logo-wordmark.svg`.
- `SKILL.md` — Agent-Skill manifest (for use in Claude Code).

**Components** (`window.HSECheckDesignSystem_6f6b44.*`)
- `components/core/` — **Button**, **Badge**, **Card**, **Eyebrow**
- `components/forms/` — **Input**
- `components/data/` — **Stat** (animated count-up KPI)
- `components/brand/` — **GridBackground** (animated hero canvas)

**UI kit**
- `ui_kits/website/` — the HSE Check marketing homepage (`index.html`), built from modular
  section files: `site-nav`, `site-hero`, `site-features`, `site-workflow`, `site-showcase`,
  `site-cta`, plus `site-mock` (product mockups), `site-util` (scroll-reveal), `icons.jsx`.
- `ui_kits/website/ProductDashboard.jsx` — **忠实复刻的客户真实"安全生产隐患监控指挥中心"数据大屏**
  (深空蓝 + 青色科技风、真实 KPI 与数据，SVG 重绘图表）。这是嵌入官网的"真实产品截图"。
  现网来源：`qhse.qa.sagaway.cn/bigscreen`（由用户提供的 MHTML 还原）。
- `ui_kits/website/fusion.html` — **融合研究**：用 3 种外框（浏览器框+氛围光 / 倾斜透视 / 双色描边卡）
  把真实产品大屏嵌入深色高端站点。核心原则：**不改产品 UI，只做外框与氛围**（Linear/Stripe/Retool 同款思路）。

**Foundation cards** (`guidelines/*.card.html`) — Type, Colors, Spacing, Brand specimens
rendered in the Design System tab.

---

## Using the system
Consumers link `styles.css` and read components from the global namespace:
```html
<link rel="stylesheet" href="styles.css" />
<script src="_ds_bundle.js"></script>
<script>const { Button, Card, Stat, GridBackground } = window.HSECheckDesignSystem_6f6b44;</script>
```
Build dark; lead with one lime CTA; let motion reveal content; keep copy restrained and metric-led.
