# TIXIMAX — Design System

> Foundations, components, and UI kits for building TIXIMAX-branded interfaces and assets.
> **White-surface-forward, multi-color, light + dark.** Import `colors_and_type.css` in every artifact.

---

## 1. Company / Product Context

**TIXIMAX** (Tiximax Logistics) is a Vietnamese **international shipping & buy-on-behalf ("mua hộ") logistics company**. It helps individuals and businesses in Vietnam purchase and import goods from overseas markets — primarily **Indonesia, the Philippines, Japan, Korea, China, and the US** — handling ordering, payment, consolidation, freight, customs, and last-mile delivery.

The brand grew out of a premium furniture / flooring import business and expanded into a full cross-border logistics service, now operating **regional storefronts (TIXIMAX Indonesia, TIXIMAX Philippines)** alongside the core Vietnam brand. Its positioning is **trust, speed, and transparency** in a category where customers are anxious about money, timing, and whether their goods will actually arrive.

**Core surfaces represented in this system:**

- **Marketing website** — explains the buy-on-behalf + shipping services, pricing, routes, and converts visitors into registered customers.
- **Customer portal / order-tracking app** — where customers create purchase requests, get quotes, pay, and track shipments through the logistics pipeline.

### Sources provided

- `assets/logo-txm*.png`, `assets/logo-indo*.png`, `assets/logo-phil*.png` — wordmark lockups for **TIXIMAX / Indonesia / Philippines** in color, black, and white.
- `assets/tiximax-logo-*.svg` + `assets/tiximax-mark.svg` — vector wordmark variants and the standalone spark mark.

- Brand colors supplied and expanded into full ramps (see §3).

> ⚠️ No codebase, Figma file, or live-site export was provided. The component library, UI kits, and derived ramps are an **original, brand-consistent interpretation** built from the logos, fonts, and brand colors — not a pixel recreation of an existing TIXIMAX product. Treat the UI kits as a faithful *house style*; send real product screens/Figma for exact parity.

---

## 2. Content Fundamentals (voice & tone)

TIXIMAX serves a Vietnamese audience with growing **regional (Indonesia, Philippines) and Japanese-market** reach, so production copy is primarily **Vietnamese**, with **Japanese** supported (see the Noto Sans JP type scale). English is used for product/section labels in this system for portability.

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

The TIXIMAX look is **clean and white-forward** — bright white/off-white surfaces carry the interface, with a **multi-color brand palette** (gold, yellow, navy, blue, green, red) used for action, status, and accent. It reads premium and trustworthy, not flashy.

- **Backgrounds are predominantly white / cool off-white.** `--surface-card` is pure white `#FFFFFF`; the page sits on a faint cool `--surface-page` `#F5F7FA`. Navy is an **accent band** (hero, footer, high-contrast strips) — not the dominant surface.
- **Color usage:** **Gold** (`--brand-gold #F4B931`) is the primary action / CTA color and the logo spark. **Yellow** (`#F7B82D`) is the signature highlight. **Navy** (`#264F91`) anchors dark bands and primary/secondary emphasis. **Blue** (`#006FBB`) = info/links, **green** (`#008148`) = success, **red** (`#EB5635`) = energy/promo and the semantic error color. Each hue ships a full `50→900` ramp.
- **Light + dark:** the system is fully **dual-mode**. Add `class="dark"` (or `[data-theme="dark"]`) on any container to flip every surface, text, border, semantic, and shadow token to its dark equivalent. Every reference card shows a Light/Dark split.
- **Typography:** **Montserrat** for headings/display (Bold/SemiBold, tight tracking), **Inter** for body & UI (`--font-body`, `--font-sans`, `--font-display`, relaxed line-height), **Noto Sans JP** for Japanese content.3 remains embedded from `fonts/` and wired to `--font-sans` / `--font-display`. Highly legible at the small sizes that order/tracking tables demand. **Responsive:** all `--fs-*` tokens auto-scale at Tablet (≤1024px) and Mobile (≤767px) breakpoints — just use the tokens or `.ds-*` classes, no manual media queries needed.
- **Corner radii:** medium-soft. Cards `--radius-lg` (14px), buttons/inputs ~8–10px (`--radius-md`), pills/chips fully rounded. Nothing sharp-cornered, nothing pill-everywhere.
- **Cards:** white surface, 1px subtle border (`--border-default`) **and** a soft low shadow (`--shadow-sm`/`--shadow-md`). Both, lightly. No colored left-border accent cards.
- **Shadows:** soft, **navy-tinted** (`rgba(38,79,145,…)`), never gray-black. Elevation rises `xs → xl`. A dedicated **gold glow** (`--shadow-gold`) is reserved for the primary CTA. Focus rings are a translucent gold halo (`--shadow-focus`).
- **Borders:** hairline `1px`, cool gray. Strong border only on inputs at rest / dividers that need to read. Focus border is gold.
- **Hover:** buttons darken one step; links underline; cards lift shadow `sm → md` and translate up `~2px`.
- **Press:** scale down slightly (`transform: scale(0.98)`) and drop shadow. No color inversion.
- **Animation:** quick, functional. `~150–220ms ease-out`. Fades and small translate/scale. No bouncy spring, no infinite decorative loops in product UI.
- **Transparency / blur:** sparingly — overlay scrims (`--surface-overlay`, navy @ 55%) behind modals; optional light backdrop-blur on sticky navbars.
- **Layout:** generous whitespace, ~1200px max content width, sticky top nav. Section rhythm alternates white / off-white / occasional navy band.
- **Imagery vibe:** warm, bright, real-world logistics & lifestyle (parcels, warehouses, happy shoppers). Not cold or stocky. Gold accents tie photography back to brand. **Avoid purple/blue gradients and emoji cards.**

---

## 4. Iconography

- **System:** TIXIMAX has no proprietary icon font. This system standardizes on **[Lucide](https://lucide.dev)** — a clean, open, 24×24, ~2px-stroke outline set — loaded from CDN. Its geometric-but-friendly style pairs with the type system and the logistics domain (package, truck, plane, map-pin, search, shield-check, wallet).
- **Style:** outline / stroke icons (not filled), `1.75–2px` stroke, `currentColor` so they inherit text color. Gold or navy fills only for emphasis badges.
- **Sizing:** 16px (inline / dense tables), 20px (buttons, inputs), 24px (nav, feature blocks). Keep stroke weight visually consistent across sizes.
- **Journey / progress motif:** the airplane (`assets/airplane.svg`) is the order-tracking indicator, moving along the progress path.
- **Logo / spark mark:** the gold spark in the wordmark (`assets/tiximax-mark.svg`) is the brand's signature device. Reuse the spark geometry as a decorative motif — never redraw a different icon to replace it.
- **Emoji:** not used in product UI. **Unicode glyphs:** avoid as icons; use Lucide.
- CDN: `https://unpkg.com/lucide@latest`.

> If TIXIMAX's real product uses a specific icon set, send it and we'll swap. Lucide is a flagged substitution.

---

## 5. Font substitution note

- ⚙️ **Montserrat** (headings), **Inter** (body/UI/sans/display), **Noto Sans JP** (Japanese) — loaded from Google Fonts CDN. Inter is wired as `--font-body`, `--font-sans`, and `--font-display`. If TIXIMAX standardizes on a single licensed family, send it and we'll rewire the tokens.

---

## 6. Component inventory

The system ships **19 components**, each with a reference card in `preview/` (all shown Light + Dark):

Alerts · Anchor · Avatar · Badges · Breadcrumb · Buttons · Card · Collapse · Controls (checkbox/radio/toggle) · Datepicker · Drawer · Dropdown · Inputs · List · Menu · Modal · Popup · Progress (airplane tracking) · Table

**Buttons** are the anchor of the system: **3 sizes** (Small 36px · Medium 44px · Large 52px) × **6 variants** (Primary/gold · Secondary/navy · Outline · No line · Disabled · "Xem thêm"/more) × **3 types** (text · text+icon · icon-only). Radius ~8px, hover darkens one step, press `scale(0.98)`.

---

## 7. Index / Manifest

| File | What it is |
| --- | --- |
| `README.md` | This document — context, voice, visual foundations, iconography, inventory. |
| `DESIGN_SYSTEM.md` | Full token + component spec (Vietnamese). |
| `design.md` | Extended design guide (Vietnamese). |
| `SKILL.md` | Agent Skill entry point for using this system. |
| `colors_and_type.css` | All design tokens: color ramps, semantic + text colors, type scale + classes, radius, spacing, shadow, **dark-theme overrides**. **Import this in every artifact.** |
| `fonts/` | *(removed)* |
| `assets/` | Logo lockups for TIXIMAX / Indonesia / Philippines (color/black/white PNG + SVG wordmarks), spark `tiximax-mark.svg`, favicons, `airplane.svg`. |
| `preview/` | Design System tab cards — Brand, Colors, Type, Spacing/Radius/Shadow, 19 components. |
| `ui_kits/website/` | Marketing website UI kit (React/JSX components + `index.html`). |
| `ui_kits/portal/` | Customer order & tracking portal UI kit. |

### Quick start

```html
<link rel="stylesheet" href="colors_and_type.css">
<!-- use var(--brand-gold), class="ds-h1", etc. Add class="dark" on a wrapper for dark mode. -->
```
