# @tiximax/express-gateway

API Gateway / BFF — the single HTTPS entry point for the client apps (docs §3.2).
Fans out to the domain services and hosts the WebSocket channel for chat & tracking (docs §3.8).

**Skeleton only:** a `GET /health` endpoint so the toolchain runs. No domain routing yet.

```bash
npm install          # from services/ (workspaces)
npm run dev:gateway  # http://localhost:4000/health
```
