/**
 * ui-shots — engine chụp màn hình (dùng chung cho mọi project)
 * ============================================================================
 * Serve project qua localhost, tự chèn nút "Export screen" vào mọi trang HTML,
 * và chụp pixel-perfect bằng Google Chrome nền (DevTools Protocol).
 * 0 dependency — chỉ Node built-ins + WebSocket toàn cục + Chrome hệ thống.
 * ============================================================================
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { deflateRawSync } from 'node:zlib';

const HERE = dirname(fileURLToPath(import.meta.url));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MIME = {
  '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.gif': 'image/gif', '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
};

export function findChrome() {
  if (process.env.CHROME && existsSync(process.env.CHROME)) return process.env.CHROME;
  return [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
  ].find((p) => existsSync(p));
}

/* Trang có "màn" để xuất không? (có khung device / các .screen / khai báo config).
   Trang docs/preview của Design System không có mấy thứ này → không gắn nút. */
function isExportable(html) {
  return /class="[^"]*\bdevice\b/.test(html)
      || /class="[^"]*\bscreen\b/.test(html)
      || html.includes('EXPORT_CONFIG');
}

/* Chèn vào <head>: expose `go` (nếu là state-machine kiểu `var RENDER={`),
   nạp widget nút Export, và CSS ẩn dev-toolbar khi đang chụp. KHÔNG sửa file.
   `force` = true khi mở trang với ?export (ép gắn nút cho project cấu trúc khác). */
function injectWidget(html, force) {
  if (!force && !isExportable(html)) return html;   // trang DS thường → để nguyên, không nút
  // Nếu trang có state machine với `var RENDER = {…}` (prototype TXM) → lộ go() ra window
  if (html.includes('var RENDER = {') && !html.includes('window.__go')) {
    html = html.replace('var RENDER = {',
      'try{window.__go=go;}catch(e){} var RENDER = {');
  }
  const head =
    '<style id="__uishots-css">' +
    'html[data-exporting] .uishots-root{display:none!important}' +
    'html[data-exporting] .page-head,html[data-exporting] .proto>.tools{display:none!important}' +
    'html[data-exporting] .proto .device{zoom:1!important}' +
    'html[data-exporting] .screen{transition:none!important;animation:none!important}' +
    '</style>' +
    '<script src="/__uishots/widget.js" defer></script>' +
    '</head>';
  return html.replace('</head>', head);
}

/* ─────────────────────── CDP over WebSocket ─────────────────────── */
class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0; this.waiters = new Map(); this.listeners = new Map();
    this.ready = new Promise((ok, no) => { this.ws.onopen = ok; this.ws.onerror = no; });
    this.ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && this.waiters.has(m.id)) {
        const { ok, no } = this.waiters.get(m.id); this.waiters.delete(m.id);
        m.error ? no(new Error(m.error.message)) : ok(m.result);
      } else if (m.method) {
        (this.listeners.get(m.method) || []).forEach((cb) => cb(m.params));
      }
    };
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((ok, no) => { this.waiters.set(id, { ok, no }); this.ws.send(JSON.stringify({ id, method, params })); });
  }
  on(method, cb) { if (!this.listeners.has(method)) this.listeners.set(method, []); this.listeners.get(method).push(cb); }
  once(method) { return new Promise((ok) => this.on(method, ok)); }
  close() { try { this.ws.close(); } catch {} }
}
async function fetchJSON(url) { const r = await fetch(url); return r.json(); }

/* ─────────────────────── Engine ─────────────────────── */
export class Engine {
  constructor({ root, browseDir, port = 4270, scale = 3, margin = 28 }) {
    this.root = resolve(root);
    this.browseDir = resolve(browseDir || root);   // thư mục liệt kê ở trang chọn file
    this.port = port;
    this.dbgPort = port + 100;
    this.scale = scale;
    this.margin = margin;
    this.q = Promise.resolve();
    this.loadedUrl = null;
  }

  /* start asset+api server; launch Chrome; connect CDP */
  async start() {
    const chrome = findChrome();
    if (!chrome) throw new Error('Không tìm thấy Chrome/Chromium/Edge. Đặt env CHROME=/path/to/chrome');

    this.server = createServer((req, res) => this._handle(req, res));
    await new Promise((ok) => this.server.listen(this.port, '127.0.0.1', ok));
    this.base = `http://127.0.0.1:${this.port}`;

    const profile = join(tmpdir(), 'ui-shots-' + this.port);
    this.proc = spawn(chrome, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      '--no-default-browser-check', '--disable-extensions',
      `--remote-debugging-port=${this.dbgPort}`, `--user-data-dir=${profile}`,
      '--window-size=480,960', 'about:blank',
    ], { stdio: 'ignore' });

    let target;
    for (let i = 0; i < 80 && !target; i++) {
      try {
        const list = await fetchJSON(`http://127.0.0.1:${this.dbgPort}/json`);
        target = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      } catch {}
      if (!target) await sleep(200);
    }
    if (!target) throw new Error('Chrome không khởi động được (kiểm tra quyền chạy headless)');
    this.cdp = new CDP(target.webSocketDebuggerUrl);
    await this.cdp.ready;
    await this.cdp.send('Page.enable');
    await this.cdp.send('Runtime.enable');
    await this.cdp.send('Emulation.setDeviceMetricsOverride',
      { width: 480, height: 960, deviceScaleFactor: this.scale, mobile: true });
    await this.cdp.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
  }

  async _ensure(pageUrl) {
    if (this.loadedUrl === pageUrl) return;
    const loaded = this.cdp.once('Page.loadEventFired');
    await this.cdp.send('Page.navigate', { url: pageUrl });
    await loaded;
    await sleep(400);   // fonts + assets + widget init
    this.loadedUrl = pageUrl;
  }

  /* Trả danh sách màn của 1 trang (auto-detect qua widget) */
  screens(pageUrl) {
    const run = this.q.then(async () => {
      await this._ensure(pageUrl);
      const r = await this.cdp.send('Runtime.evaluate', {
        expression: 'JSON.stringify((window.__EXPORT&&window.__EXPORT.list&&window.__EXPORT.list())||[])',
        returnByValue: true, awaitPromise: true,
      });
      return JSON.parse(r.result.value);
    });
    this.q = run.catch(() => {});
    return run;
  }

  /* Chụp 1 màn → PNG Buffer */
  capture({ pageUrl, index, mode = 'device' }) {
    const run = this.q.then(async () => {
      await this._ensure(pageUrl);
      await this.cdp.send('Runtime.evaluate', {
        expression: `document.documentElement.setAttribute('data-exporting','1');` +
                    `window.__EXPORT&&window.__EXPORT.goto(${index});`,
        awaitPromise: true,
      });
      await sleep(320);
      const pad = mode === 'device' ? this.margin : 0;
      const r = await this.cdp.send('Runtime.evaluate', {
        expression: `JSON.stringify(window.__EXPORT.rect(${JSON.stringify(mode)}))`,
        returnByValue: true,
      });
      const b = JSON.parse(r.result.value);
      // Lề ĐỐI XỨNG: không cộng đủ pad khi bên trái/trên không đủ chỗ (b.x/b.y nhỏ),
      // nếu không phần dư bị dồn sang phải → nền phải rộng hơn trái. Lấy min để 2 bên bằng nhau.
      const padX = Math.min(pad, b.x);
      const padY = Math.min(pad, b.y);
      const clip = {
        x: b.x - padX, y: b.y - padY,
        width: b.w + padX * 2, height: b.h + padY * 2, scale: 1,
      };
      const shot = await this.cdp.send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true });
      await this.cdp.send('Runtime.evaluate', { expression: `document.documentElement.removeAttribute('data-exporting')` });
      return Buffer.from(shot.data, 'base64');
    });
    this.q = run.catch(() => {});
    return run;
  }

  /* ---- HTTP handler: assets + widget + api ---- */
  async _handle(req, res) {
    const u = new URL(req.url, this.base);
    try {
      if (u.pathname === '/__uishots/widget.js') {
        const js = await readFile(join(HERE, 'widget.js'));
        res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store' });
        return res.end(js);
      }
      // Trang chọn file luôn dùng được (không bao giờ rơi về index.html của Design System)
      if (u.pathname === '/__uishots/' || u.pathname === '/__uishots') {
        const html = await this._listing();
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
        return res.end(html);
      }
      if (u.pathname === '/__uishots/screens') {
        const list = await this.screens(this.base + u.searchParams.get('page'));
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(list));
      }
      if (u.pathname === '/__uishots/thumb') {
        const png = await this.capture({
          pageUrl: this.base + u.searchParams.get('page'),
          index: Number(u.searchParams.get('index')),
          mode: u.searchParams.get('mode') || 'device',
        });
        res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' });
        return res.end(png);
      }
      if (u.pathname === '/__uishots/export' && req.method === 'POST') {
        return await this._export(req, res);
      }
      if (u.pathname === '/' && !existsSync(join(this.root, 'index.html'))) {
        const html = await this._listing();
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(html);
      }
      return await this._serveFile(u, res);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end('ui-shots error: ' + e.message);
    }
  }

  async _export(req, res) {
    const body = await new Promise((ok) => { const c = []; req.on('data', (d) => c.push(d)); req.on('end', () => ok(Buffer.concat(c).toString('utf8'))); });
    const { page, indices = [], mode = 'device', names = [] } = JSON.parse(body);
    const stamp = (page.split('/').pop() || 'screens').replace(/\.html?$/i, '');
    const suffix = mode === 'screen' ? '__bare' : '';
    const shots = [];
    for (let k = 0; k < indices.length; k++) {
      const png = await this.capture({ pageUrl: this.base + page, index: indices[k], mode });
      const slug = (names[k] || 'screen-' + (indices[k] + 1)).replace(/[^a-z0-9\-_]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
      shots.push({ name: `${stamp}__${slug}${suffix}.png`, data: png });
    }
    if (shots.length === 1) {
      res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Disposition': `attachment; filename="${shots[0].name}"` });
      return res.end(shots[0].data);
    }
    const zip = makeZip(shots);
    const zname = `${stamp}__${shots.length}screens${suffix}.zip`;
    res.writeHead(200, { 'Content-Type': 'application/zip', 'Content-Disposition': `attachment; filename="${zname}"` });
    return res.end(zip);
  }

  async _serveFile(u, res) {
    let path = decodeURIComponent(u.pathname);
    if (path === '/') path = '/index.html';
    const abs = resolve(this.root, '.' + path);
    if (!abs.startsWith(this.root)) { res.writeHead(403).end('forbidden'); return; }
    let buf;
    try { buf = await readFile(abs); } catch { res.writeHead(404).end('not found'); return; }
    const ext = extname(abs).toLowerCase();
    if (ext === '.html' || ext === '.htm') buf = Buffer.from(injectWidget(buf.toString('utf8'), u.searchParams.has('export')));
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(buf);
  }

  // Trang chủ tự sinh: liệt kê .html trong thư mục đang đứng (browseDir), bỏ node_modules/.git/dist.
  // Link trỏ theo đường dẫn tương đối so với root PHỤC VỤ (đã nâng cấp cho assets ../../).
  async _listing() {
    const { readdir } = await import('node:fs/promises');
    const skip = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage']);
    const found = [];
    const walk = async (dir, depth) => {
      if (depth > 3) return;
      let ents = [];
      try { ents = await readdir(dir, { withFileTypes: true }); } catch { return; }
      for (const e of ents) {
        if (e.name.startsWith('.') || skip.has(e.name)) continue;
        const abs = join(dir, e.name);
        if (e.isDirectory()) await walk(abs, depth + 1);
        else if (/\.html?$/i.test(e.name)) found.push('/' + abs.slice(this.root.length).replace(/\\/g, '/').replace(/^\/+/, ''));
      }
    };
    await walk(this.browseDir, 0);
    found.sort();
    const rows = found.map((p) => `<li><a href="${p}">${p}</a></li>`).join('') || '<li>Không tìm thấy file .html nào</li>';
    return `<!doctype html><meta charset="utf-8"><title>ui-shots</title>` +
      `<style>body{font:15px/1.6 -apple-system,system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 20px;color:#1a1d24}` +
      `h1{font-size:19px}h1 b{color:#e0a924}a{color:#1e2f5a}li{margin:4px 0}code{background:#f1f2f4;padding:2px 6px;border-radius:5px}` +
      `@media(prefers-color-scheme:dark){body{background:#12141a;color:#e8eaed}a{color:#8fb0ff}code{background:#242832}}</style>` +
      `<h1>ui<b>-</b>shots · chọn prototype</h1>` +
      `<p>Mở một file bên dưới. Trong trang sẽ có nút <b>Export screen</b> ở góc phải để chọn màn và tải PNG/ZIP.</p>` +
      `<ul>${rows}</ul>`;
  }

  async stop() {
    try { this.cdp?.close(); } catch {}
    try { this.proc?.kill(); } catch {}
    try { this.server?.close(); } catch {}
  }
}

/* ─────────────────────── ZIP writer (0-dep) ─────────────────────── */
const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(buf) { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }

export function makeZip(entries) {
  const locals = [], central = []; let offset = 0;
  for (const e of entries) {
    const name = Buffer.from(e.name, 'utf8');
    const raw = e.data;
    const comp = deflateRawSync(raw);
    const store = comp.length >= raw.length;
    const body = store ? raw : comp;
    const method = store ? 0 : 8;
    const crc = crc32(raw);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6);
    lh.writeUInt16LE(method, 8); lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0, 12);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(body.length, 18); lh.writeUInt32LE(raw.length, 22);
    lh.writeUInt16LE(name.length, 26); lh.writeUInt16LE(0, 28);
    locals.push(lh, name, body);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8);
    ch.writeUInt16LE(method, 10); ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0, 14);
    ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(body.length, 20); ch.writeUInt32LE(raw.length, 24);
    ch.writeUInt16LE(name.length, 28); ch.writeUInt16LE(0, 30); ch.writeUInt16LE(0, 32);
    ch.writeUInt16LE(0, 34); ch.writeUInt16LE(0, 36); ch.writeUInt32LE(0, 38); ch.writeUInt32LE(offset, 42);
    central.push(ch, name);
    offset += lh.length + name.length + body.length;
  }
  const centralBuf = Buffer.concat(central), localBuf = Buffer.concat(locals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(0, 4); end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralBuf.length, 12); end.writeUInt32LE(localBuf.length, 16); end.writeUInt16LE(0, 20);
  return Buffer.concat([localBuf, centralBuf, end]);
}
