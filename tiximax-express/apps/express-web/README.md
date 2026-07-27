# @tiximax/express-web

Customer web app for **TIXIMAX Express** (international door-to-door shipping).
Consumes the shared `@tiximax/design-system` brand tokens from the repo root.

> Scaffold only — the app shell, routing, theme, domain types and API client stub
> are in place. **No business logic yet** (booking/pricing/tracking/chat are placeholders).
> See [`../../docs/`](../../docs/) for the product spec and [`../../docs/07-khoi-tao-project.md`](../../docs/07-khoi-tao-project.md) for scaffold decisions.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **react-router-dom** — routing (FR-7.2)
- **zustand** — client state (docs §3.4)
- Brand tokens via `colors_and_type.css` (aliased as `@tiximax/tokens`, docs ADR-5)

## Getting started

```bash
npm install
cp .env.example .env   # adjust API/WS URLs
npm run dev            # http://localhost:5174
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start Vite dev server (port 5174) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | `tsc --noEmit` |

## Structure

```
src/
├─ main.tsx            entry — imports tokens + mounts router
├─ router.tsx          routes (booking / shipments / tracking / chat)
├─ components/         app shell (AppLayout, PagePlaceholder)
├─ features/           one folder per domain (placeholders)
│  ├─ booking/         FR-1, FR-2, FR-3
│  ├─ shipments/       FR-4
│  ├─ tracking/        FR-5
│  └─ chat/            FR-6
├─ store/              zustand stores (theme so far)
├─ lib/
│  ├─ api/             fetch client stub → gateway
│  └─ i18n/            reserved (NFR-4)
├─ types/              data model interfaces (docs §4)
└─ styles/             app shell CSS on top of brand tokens
```
