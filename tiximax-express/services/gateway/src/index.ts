// API Gateway / BFF — single entry point for the client apps (docs §3.2).
// SKELETON: exposes only a health check so the toolchain is verifiable.
// No routing to domain services and no business logic yet (docs §3.9).

import { createServer } from 'node:http';

const PORT = Number(process.env.PORT ?? 4000);

const server = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'gateway' }));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not_found' }));
});

server.listen(PORT, () => {
  console.log(`[gateway] listening on http://localhost:${PORT} (GET /health)`);
});
