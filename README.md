# TIXIMAX — Design System

> Foundations, components, and UI kits for building TIXIMAX-branded interfaces and assets.

### Browse the system
- **Component library** — open `preview/All Components.html` (sidebar browser, 30 cards: brand, colors, type, spacing, and 21 components). Has a **light/dark toggle** (top-right).
- **Individual components** — `preview/comp-*.html` (token-driven; each loads `colors_and_type.css`).
- **UI kits** — `ui_kits/website/index.html` (marketing site) and `ui_kits/portal/index.html` (customer app).
- **Deck & document pipeline** — `index.html` (showcase), `slides-preview.html`, `documents-preview.html`; PDF export via the group `html-to-pdf` tool + `export.json`.

### Foundations at a glance
- **Tokens:** `colors_and_type.css` (standard, component-facing) and `tokens.css` (deck-aware, adds JP/VI font infra for PDF). Keep the two in sync.
- **Dark mode:** light-first; apply `[data-theme="dark"]` (or `.dark`) on any container. Both foundation files carry the dark layer.
- **Fonts:** **self-hosted** (offline-safe for Puppeteer PDF) — Inter (body/UI) · Montserrat + Source Sans 3 (display options) · Noto Sans JP (Japanese) · Be Vietnam Pro (Vietnamese docs). No Google Fonts CDN. The heading face is a one-line seam: `--font-display` in `colors_and_type.css`.

---

## 1. Company / Product Context

**TIXIMAX** (Tiximax Logistics) is a Vietnamese **international shipping & buy-on-behalf ("mua hộ") logistics company**. It helps individuals and businesses in Vietnam purchase and import goods from overseas markets — primarily **Indonesia, Japan, Korea, China, and the US** — handling ordering, payment, consolidation, freight, customs, and last-mile delivery.

The brand grew out of a premium furniture / flooring import business and expanded into a full cross-border logistics service. Its positioning is **trust, speed, and transparency** in a category (international forwarding) where customers are anxious about money, timing, and whether their goods will actually arrive.

**Core surfaces represented in this system:**
- **Marketing website** — explains the buy-on-behalf + shipping services, pricing, routes, and converts visitors into registered customers.
- **Customer portal / order-tracking app** — where customers create purchase requests, get quotes, pay, and track shipments through the logistics pipeline.

### Sources provided
- `uploads/tiximax-logo-light.svg` — primary wordmark (TIXIMAX with a gold spark mark).
- `uploads/SourceSans3-*.ttf` — full Source Sans 3 family (variable + static weights, roman + italic).
- Brand colors: **#F4B931** (gold), **#264F91** (navy), **#EB5635** (red-orange), plus **#006FBB** (blue) and **#008148** (green); signature spark yellow **#F7B82D**.

> ⚠️ No codebase, Figma file, or live-site export was provided. The component library, UI kits, and the derived color ramps in this system are an **original, brand-consistent interpretation** built from the logo, fonts, and three brand colors above — not a pixel recreation of an existing TIXIMAX product. Treat the UI kits as a faithful *house style*, and send real product screens/Figma if you want exact parity.

---

## 2. Content Fundamentals (voice & tone)

TIXIMAX serves a Vietnamese audience, so production copy is primarily **Vietnamese**; English is used for product/section labels in this system for portability.

- **Tone:** confident, reassuring, practical. The brand sells *peace of mind* for cross-border shopping — copy emphasizes safety, speed, clear pricing, and "we handle everything."
- **Person:** addresses the customer directly as **"bạn" / "you"**, and refers to the company as **"TIXIMAX" / "chúng tôi" / "we."** Warm but professional — not slangy.
- **Casing:** Sentence case for body and buttons. The wordmark **TIXIMAX is always all-caps**. Overlines/eyebrows use UPPERCASE with wide tracking. Avoid Title Case Everywhere.
- **Numbers matter:** this is logistics — concrete figures build trust (delivery days, weight/kg pricing, exchange rate, number of orders shipped, warehouse locations). Use real, specific numbers, not vague claims.
- **Verbs:** action-first CTAs — "Tạo đơn mua hộ" (Create order), "Tra cứu đơn hàng" (Track order), "Nhận báo giá" (Get a quote), "Đăng ký ngay" (Sign up now).
- **Emoji:** not part of the brand voice. Avoid in product UI. Use iconography instead.
- **Vibe examples:**
  - Hero: *"Mua sắm toàn cầu — TIXIMAX lo phần còn lại."* (Shop globally — TIXIMAX handles the rest.)
  - Reassurance: *"Theo dõi đơn hàng theo thời gian thực, từ kho quốc tế đến tận nhà bạn."*
  - CTA: *"Nhận báo giá trong 5 phút."*

---

## 3. Visual Foundations

The TIXIMAX look is **gold-on-navy, clean and corporate-warm** — a premium logistics feel, not a flashy consumer app.

- **Color usage:** Navy (`#264F91`) anchors headers, footers, and hero sections. Gold (`#F4B931`) is the primary action / highlight color and the signature accent (the logo spark). Red-orange (`#EB5635`) is an energy accent used sparingly — promos, urgent states, and as the semantic error color. Blue (`#006FBB`) carries info states and green (`#008148`) success. Backgrounds are mostly white / cool off-white (`#F5F7FA`); navy is used for high-contrast bands.
- **Typography:** Source Sans 3 for headings/display (heavy, tight tracking) and **Inter** for body (Regular, relaxed line-height). Humanist sans keeps it approachable and highly legible at small sizes (important for tables of order/tracking data).
- **Backgrounds:** predominantly flat color. Navy hero bands may carry a **subtle gold radial glow** or a faint diagonal motif echoing the logo's chevron/spark geometry. No heavy photographic noise; product photography (when used) is bright and clean. **Avoid purple/blue gradients and emoji cards.**
- **Corner radii:** medium-soft. Cards `--radius-lg` (14px), buttons/inputs `--radius-md` (10px), pills/chips fully rounded. Nothing sharp-cornered, nothing pill-everywhere.
- **Cards:** white surface, 1px subtle border (`--border-default`) **and** a soft low shadow (`--shadow-sm`/`--shadow-md`). Not border-only, not shadow-only — both, lightly. No colored left-border accent cards.
- **Shadows:** soft, navy-tinted, never gray-black. Elevation rises `xs → xl`. A dedicated **gold glow shadow** is reserved for the primary CTA. Focus rings are a translucent gold halo.
- **Borders:** hairline `1px`, cool gray. Strong border only on inputs at rest / dividers that need to read.
- **Hover states:** buttons darken one step (gold-500→gold-600, navy-800→navy-700-ish lift); links underline; cards lift shadow `sm → md` and translate up `~2px`. 
- **Press states:** scale down slightly (`transform: scale(0.98)`) and drop shadow. No color inversion.
- **Animation:** quick, functional. `transitions ~150–220ms ease-out`. Fades and small translate/scale. No bouncy spring, no infinite decorative loops in product UI.
- **Transparency / blur:** sparingly — overlay scrims (`--surface-overlay`, navy @ 55%) behind modals; optional light backdrop-blur on sticky navbars over content.
- **Layout:** generous whitespace, 12-col grid feel, max content width ~1200px on web. Sticky top nav. Section rhythm alternates white / off-white / navy bands.
- **Imagery vibe:** warm, bright, real-world logistics & lifestyle (parcels, warehouses, happy shoppers). Not cold or corporate-stocky. Gold accents tie photography back to brand.

---

## 4. Iconography

- **System:** TIXIMAX has no proprietary icon font. This design system standardizes on **[Lucide](https://lucide.dev)** — a clean, open, 24×24, ~2px-stroke outline set — loaded from CDN. Its geometric-but-friendly stroke style pairs well with Source Sans 3 and the logistics domain (package, truck, plane, map-pin, search, shield-check, wallet).
- **Style:** outline / stroke icons (not filled), `1.75–2px` stroke, `currentColor` so they inherit text color. Use gold or navy fills only for emphasis badges.
- **Sizing:** 16px (inline / dense tables), 20px (buttons, inputs), 24px (nav, feature blocks). Keep stroke weight visually consistent across sizes.
- **Emoji:** not used in product UI.
- **Unicode glyphs:** avoid using as icons; use Lucide.
- **Logo / spark mark:** the gold spark in the wordmark is the brand's signature graphic device. Reuse the spark geometry as a decorative motif, never redraw a different icon to replace it.
- CDN: `https://unpkg.com/lucide@latest` (or `lucide-static` for inline SVG).

> If TIXIMAX's real product uses a specific icon set, send it and we'll swap. Lucide is a flagged substitution.

---

## 5. Font substitution note

✅ No substitution needed — the full **Source Sans 3** family was provided and is embedded from `fonts/`.

---

## 6. Index / Manifest

| File | What it is |
|---|---|
| `README.md` | This document — context, voice, visual foundations, iconography. |
| `SKILL.md` | Agent Skill entry point for using this system. |
| `colors_and_type.css` | All design tokens: color ramps, semantic colors, type scale + classes, radius, spacing, shadow. **Import this in every artifact.** |
| `fonts/` | Source Sans 3 (variable roman + italic, plus key static weights). |
| `assets/` | Logo variants (`tiximax-logo-light/white/navy.svg`) + favicons (`favicon.svg` navy, `favicon-light.svg` white, `favicon-mark.svg` transparent). |
| `preview/` | Design System tab cards (colors, type, spacing, shadow, components). |
| `ui_kits/website/` | Marketing website UI kit (React/JSX components + `index.html`). |
| `ui_kits/portal/` | Customer order & tracking portal UI kit. |

### Quick start
```html
<link rel="stylesheet" href="colors_and_type.css">
<!-- then use var(--brand-gold), class="ds-h1", etc. -->
```
