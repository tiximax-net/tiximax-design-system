# TIXIMAX — SSO / Hosted-login UI Kit

High-fidelity recreation of the TIXIMAX **central SSO hosted-login portal** ("Cổng SSO Tiximax") — the single sign-on entry point shared across the whole TIXIMAX ecosystem (customer portal, shopping website, mobile app). One account, every service.

> ⚠️ Brand-consistent interpretation, not a pixel copy of a live product. Wire the forms to your real OIDC/auth backend before production use.

## Run
**Zero build — but it must be served over HTTP, not opened as a `file://` path.** From the repo root:

```
npx serve .          # or: python -m http.server 8000
# then open http://localhost:3000/ui_kits/auth/index.html
```

> ⚠️ Double-clicking `index.html` gives a **blank page**. Babel-standalone loads the three source files via XHR, and Chrome treats `file://` as a null origin, so every `src=` fetch is blocked by CORS (`Cross origin requests are only supported for protocol schemes: … http, https`). Same applies to `ui_kits/website/` and `ui_kits/portal/`.

It loads `../../colors_and_type.css` + `auth.css`, real brand assets from `../../assets/`, and React / Babel-standalone / Lucide + Google Fonts from CDN. The source is **TypeScript** (`.ts` / `.tsx`); Babel-standalone strips the types in-browser (`data-presets="react,typescript"`), so no compile step is needed to view it. Starts on the **Sign in** view.

Type-checking: `npm ci` at the repo root, then `npx tsc --noEmit -p ui_kits/auth/tsconfig.json`. `tsconfig.json` + `types.d.ts` give real coverage with no `@types` dependency (React/ReactDOM/Lucide are declared as ambient CDN globals). The files are global scripts (no `import`/`export`) so the browser can run them directly and they share helpers via `window`.

## Layout
Two-pane split (single pane below 880px, brand aside hidden):

- **Brand aside** (left, navy gradient) — the marketing panel. Uses the real **logo** (`assets/tiximax-logo-white.svg`), a faint rotated **brand watermark** behind the content (`assets/tiximax-mark.svg` at 6% opacity — the `.wm` element), a gold radial glow, service cards, an animated **airplane journey** pipeline (Mua hộ → Vận chuyển → Thông quan → Fulfillment) and trust stats.
- **Auth panel** (right) — language switch (VI / EN / JP), light/dark toggle, the wordmark + spark head, and the active auth view.

## Files
| File | Contents |
|---|---|
| `i18n.ts` | `AUTH_DICT: Record<Lang, Dict>` — full VI / EN / JP copy dictionary |
| `screens.tsx` | `AI` (Lucide icon), `Plane`, `GoogleIcon`, `FacebookIcon`, `BrandAside` |
| `app.tsx` | Views (`LoginView`, `RegisterView`, `ForgotView`, `OtpView`) + `App` state machine + mount |
| `types.d.ts` | Ambient types (`Lang`, `Dict`, `AuthView`, …) + CDN-global declarations |
| `tsconfig.json` | `tsc --noEmit` config for the kit |
| `auth.css` | Layout & component CSS specific to the portal (tokens come from `colors_and_type.css`) |
| `index.html` | Runnable entry — mounts the three TS/TSX files |

## Views & interactions
- **Login** — segmented **Email / Phone** method switch. Email → password (show/hide eye), *remember me*, *forgot password*, magic-link. Phone → number + **Send OTP** → OTP view.
- **Register** — name / email / phone / password + terms agreement.
- **Forgot** — email → **Send code** → OTP view.
- **OTP** — 6-box code entry (auto-advance + backspace nav) with a live resend countdown (`0:59` → **Resend code**).
- **Language** VI / EN / JP, **theme** light/dark (adds `class="dark"`, flips all tokens), animated journey loops continuously.

## Configuration
`App` accepts props (edit the mount in `app.tsx`):
- `defaultView` — `"login"` (default) · `"register"` · `"forgot"` · `"otp"`
- `brandSide` — `"left"` (default) · `"right"` (adds `.rev`)
- `showSocial` — `true` (default) · `false` (hides Google/Facebook)

## Notes
- Icons are **Lucide** outline (CDN), rendered via `<i class="ic" data-lucide="…">` so `auth.css` sizes them per context; `lucide.createIcons()` runs after each render. The airplane and Google/Facebook glyphs are inlined (custom / multi-color).
- Fonts: Montserrat (headings) · Inter (body/UI) · Noto Sans JP (Japanese) — matches the design system type stack.
- All forms are presentational only — no submit handlers wired.
