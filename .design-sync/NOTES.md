# .design-sync/NOTES.md — Tiximax Design System sync notes

## Setup

- Package created from scratch as a minimal npm wrapper around the CSS-only design system
- `src/styles.css` uses Google Fonts CDN (NOT local woff2/ttf) to keep bundle small
- `tokens.css` at repo root still uses self-hosted fonts (for PDF export via Puppeteer) — do NOT change that
- `src/styles.css` mirrors the `:root {}` block from `tokens.css` but WITHOUT @font-face rules; if tokens.css is updated, sync the :root block into src/styles.css manually
- Noto Sans JP: 620 woff2 files / 26MB self-hosted — far too large to ship. CDN version used instead.
- Source Sans 3 and Be Vietnam Pro: also on Google Fonts CDN — no local font files shipped.

## Build

- `npm run build` in design-system/ → esbuild (ESM+CJS) + tsc --emitDeclarationOnly
- All 8 components use inline styles with CSS var() references — no per-component .css files

## Re-sync risks

- If CSS variables in `tokens.css` change, manually update `src/styles.css` `:root {}` block
- 8 components are "floor cards" (no authored previews yet) — functional but minimal visual
- Google Fonts CDN dependency: previews won't render correctly offline
