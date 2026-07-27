# @tiximax/express-services

Backend for **TIXIMAX Express** — a domain-split service skeleton (docs §3.5).
npm-workspaces monorepo. **Skeleton only — no business logic yet.**

## Services

| Service | Responsibility | Maps to |
|---|---|---|
| [gateway](gateway/) | API Gateway / BFF, single client entry, WebSocket host | §3.2, §3.8 |
| [auth](auth/) | Register/login (OTP/email), profile, saved addresses | FR-8.1, FR-8.2 |
| [booking](booking/) | Order lifecycle, wizard state, validation, status | FR-1, FR-3, FR-4 |
| [pricing](pricing/) | Estimate & final price; fee tables, surcharges, FX | FR-2 |
| [tracking](tracking/) | Milestones, stage updates, actual weight, ETA | FR-5 |
| [chat](chat/) | Realtime messages, quick-replies, attachments, order cards | FR-6 |
| [media](media/) | Upload & compress package photos, chat attachments | FR-1.9, FR-6.4 |
| [notification](notification/) | Push/email/SMS for status & chat | FR-8.6 |
| [ops](ops/) | Ops-portal backend — confirm, update stage, enter weight | FR-8.7 |

> Target framework is **NestJS or equivalent** (docs §3.4). The skeleton stays
> framework-agnostic for now — the gateway is a plain Node `http` health server
> and each domain service is a typed stub — so the framework choice can be made
> when business logic starts (docs §3.9).

## Getting started

```bash
npm install            # installs the whole workspace
npm run dev:gateway    # gateway health server → http://localhost:4000/health
npm run typecheck      # tsc -b across all services
```

## Structure

```
services/
├─ package.json         workspaces + shared devDeps (typescript, tsx, @types/node)
├─ tsconfig.base.json   shared compiler options
├─ tsconfig.json        solution file — references every service
├─ gateway/             runnable health-check skeleton
└─ <domain>/            package.json · tsconfig.json · src/index.ts stub · README
```
