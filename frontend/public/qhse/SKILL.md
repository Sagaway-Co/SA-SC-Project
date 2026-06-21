---
name: hsecheck-design
description: Use this skill to generate well-branded interfaces and assets for HSE Check, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

HSE Check is a high-end, dark-first safety-management SaaS for high-risk industries
(oil, chemical, energy, mining). The aesthetic is Linear/Vercel/Raycast-grade — deep
near-black canvas, hairline borders, a single hi-vis lime accent (`#C6F24E`), Geist +
Geist Mono type, and heavy-but-tasteful motion. It is the deliberate opposite of
"government blue + table UI". Keep copy restrained, bilingual (Chinese lead + mono
English kicker), and metric-led; no emoji.

Key files:
- `styles.css` + `tokens/` — design tokens (colors, type, spacing, effects, fonts).
- `components/` — React primitives: Button, Badge, Card, Eyebrow, Input, Stat, GridBackground.
- `ui_kits/website/` — full animated marketing homepage to copy patterns from.
- `assets/` — logo mark + wordmark.
- `guidelines/*.card.html` — foundation specimens.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out
and create static HTML files for the user to view. If working on production code, you can
copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build
or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.
