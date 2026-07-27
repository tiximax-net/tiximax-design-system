/**
 * TIXIMAX Express — Engine chụp màn hình prototype (dùng chung)
 * ============================================================================
 * Lái Google Chrome đã cài qua DevTools Protocol để chụp từng màn của prototype
 * mobile thành PNG. 0 dependency — chỉ Node built-ins + WebSocket toàn cục.
 *
 * Dùng bởi:  export-png.mjs (CLI)  ·  export-studio.mjs (web UI chọn màn)
 * ============================================================================
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { deflateRawSync } from 'node:zlib';

const HERE = dirname(fileURLToPath(import.meta.url));   // …/Tool Export PNG/png-export
const ROOT = resolve(HERE, '..', '..');                 // repo root (assets, fonts, css)
export const PROTO_DIR = 'tiximax-express/UI-TXM-Express';

/* 8 màn hình của prototype booking (SCREEN_IDS s1..s8 + bảng RENDER) */
export const SCREENS = [
  { slug: '01-route',     label: 'Route & địa chỉ' },
  { slug: '02-package',   label: 'Chi tiết kiện hàng' },
  { slug: '03-review',    label: 'Xác nhận đặt' },
  { slug: '04-confirm',   label: 'Đặt thành công' },
  { slug: '05-tracking',  label: 'Theo dõi đơn' },
  { slug: '06-chat',      label: 'Chat hỗ trợ' },
  { slug: '07-shipments', label: 'Danh sách đơn' },
  { slug: '08-picker',    label: 'Bộ chọn quốc gia' },
];

export const FILES = [
  { file: 'express-booking-prototype-jp.html', label: 'Tiếng Nhật (JP)' },
  { file: 'express-booking-prototype.html',    label: 'Tiếng Việt (VI)' },
];

/* ─────────────────────── helpers ─────────────────────── */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
};

export function findChrome() {
  if (process.env.CHROME && existsSync(process.env.CHROME)) return process.env.CHROME;
  return [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/chromium-browser',
  ].find((p) => existsSync(p));
}

/* Chèn hook vào HTML prototype: lộ `go` ra window + ẩn dev-toolbar + tắt
   transition để chụp tức thì. KHÔNG đụng file trên đĩa. */
function injectHooks(html) {
  html = html.replace('var RENDER = {',
    'try{window.__go=go;window.__cur=function(){return cur};}catch(e){} var RENDER = {');
  const style =
    '<style id="__export">' +
    '.proto .device{zoom:1!important}' +
    '.screen{transition:none!important;animation:none!important}' +
    '.page-head,.proto>.tools,.proto .page-head{display:none!important}' +
    '.proto{min-height:auto!important;padding:0!important}' +
    '</style></head>';
  return html.replace('</head>', style);
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
  on(method, cb) {
    if (!this.listeners.has(method)) this.listeners.set(method, []);
    this.listeners.get(method).push(cb);
  }
  once(method) { return new Promise((ok) => this.on(method, ok)); }
  close() { try { this.ws.close(); } catch {} }
}

async function fetchJSON(url) { const r = await fetch(url); return r.json(); }

/* ─────────────────────── Studio (engine) ─────────────────────── */
export class Studio {
  constructor(opts = {}) {
    this.assetPort = opts.assetPort || 4271;
    this.dbgPort = this.assetPort + 100;
    this.scale = opts.scale || 3;
    this.margin = opts.margin ?? 64;
    this.q = Promise.resolve();          // hàng đợi — CDP 1 page nên phải tuần tự
    this.loaded = { file: null, theme: null };
  }

  async start() {
    const chrome = findChrome();
    if (!chrome) throw new Error('Không tìm thấy Chrome. Đặt env CHROME=/path/to/chrome');

    // 1) asset server (phục vụ từ repo root + chèn hook cho prototype)
    this.srv = createServer(async (req, r) => {
      try {
        let path = decodeURIComponent(req.url.split('?')[0]);
        if (path === '/') path = '/index.html';
        const abs = resolve(ROOT, '.' + path);
        if (!abs.startsWith(ROOT)) { r.writeHead(403).end(); return; }
        let buf = await readFile(abs);
        const ext = extname(abs).toLowerCase();
        if (ext === '.html' && /prototype/.test(abs)) buf = Buffer.from(injectHooks(buf.toString('utf8')));
        r.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        r.end(buf);
      } catch { r.writeHead(404).end('not found'); }
    });
    await new Promise((ok) => this.srv.listen(this.assetPort, '127.0.0.1', ok));
    this.base = `http://127.0.0.1:${this.assetPort}`;

    // 2) launch Chrome headless
    const profile = join(tmpdir(), 'txm-studio-' + this.assetPort);
    this.proc = spawn(chrome, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      '--no-default-browser-check', '--disable-extensions',
      `--remote-debugging-port=${this.dbgPort}`, `--user-data-dir=${profile}`,
      '--window-size=480,960', 'about:blank',
    ], { stdio: 'ignore' });

    // 3) connect CDP tới tab
    let target;
    for (let i = 0; i < 60 && !target; i++) {
      try {
        const list = await fetchJSON(`http://127.0.0.1:${this.dbgPort}/json`);
        target = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      } catch {}
      if (!target) await sleep(200);
    }
    if (!target) throw new Error('Chrome không khởi động được');
    this.cdp = new CDP(target.webSocketDebuggerUrl);
    await this.cdp.ready;
    await this.cdp.send('Page.enable');
    await this.cdp.send('Runtime.enable');
  }

  async _ensure(file, theme) {
    const scale = this.scale;
    if (this.loaded.file !== file) {
      await this.cdp.send('Emulation.setDeviceMetricsOverride',
        { width: 480, height: 960, deviceScaleFactor: scale, mobile: true });
      await this.cdp.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
      const loaded = this.cdp.once('Page.loadEventFired');
      await this.cdp.send('Page.navigate', { url: `${this.base}/${PROTO_DIR}/${file}` });
      await loaded;
      await sleep(350);
      this.loaded = { file, theme: null };
    }
    if (this.loaded.theme !== theme) {
      await this.cdp.send('Runtime.evaluate', {
        expression: `document.documentElement.setAttribute('data-theme','${theme}');` +
                    `document.body.setAttribute('data-theme','${theme}');`,
      });
      await sleep(60);
      this.loaded.theme = theme;
    }
  }

  /* Chụp 1 màn → PNG Buffer. Tuần tự hoá qua hàng đợi. */
  capture({ file, theme = 'light', index, mode = 'device', margin }) {
    const run = this.q.then(async () => {
      await this._ensure(file, theme);
      await this.cdp.send('Runtime.evaluate', { expression: `window.__go && window.__go(${index})` });
      await sleep(300);
      const sel = mode === 'device' ? '.device' : '.device__screen';
      const pad = mode === 'device' ? (margin ?? this.margin) : 0;
      const r = await this.cdp.send('Runtime.evaluate', {
        expression: `(() => { const el=document.querySelector('${sel}'); const b=el.getBoundingClientRect();` +
                    `return JSON.stringify({x:b.x,y:b.y,w:b.width,h:b.height}); })()`,
        returnByValue: true,
      });
      const b = JSON.parse(r.result.value);
      const clip = {
        x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad),
        width: b.w + pad * 2, height: b.h + pad * 2, scale: 1,
      };
      const shot = await this.cdp.send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true });
      return Buffer.from(shot.data, 'base64');
    });
    this.q = run.catch(() => {});   // giữ hàng đợi sống dù 1 lần chụp lỗi
    return run;
  }

  async stop() {
    try { this.cdp?.close(); } catch {}
    try { this.proc?.kill(); } catch {}
    try { this.srv?.close(); } catch {}
  }
}

/* ─────────────────────── ZIP writer (0-dep, store/deflate) ─────────────────────── */
const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** Tạo ZIP từ [{name, data:Buffer}] → Buffer. Dùng deflate (compression=8). */
export function makeZip(entries) {
  const locals = [], central = [];
  let offset = 0;
  for (const e of entries) {
    const name = Buffer.from(e.name, 'utf8');
    const raw = e.data;
    const comp = deflateRawSync(raw);
    const crc = crc32(raw);
    const useStore = comp.length >= raw.length;     // PNG nén sẵn → có khi store nhỏ hơn
    const body = useStore ? raw : comp;
    const method = useStore ? 0 : 8;

    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0);      // local file header sig
    lh.writeUInt16LE(20, 4);              // version needed
    lh.writeUInt16LE(0x0800, 6);          // flags: UTF-8 name
    lh.writeUInt16LE(method, 8);
    lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0, 12);   // mod time/date
    lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(body.length, 18);    // compressed size
    lh.writeUInt32LE(raw.length, 22);     // uncompressed size
    lh.writeUInt16LE(name.length, 26);
    lh.writeUInt16LE(0, 28);              // extra len
    locals.push(lh, name, body);

    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0);      // central dir sig
    ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6);
    ch.writeUInt16LE(0x0800, 8);
    ch.writeUInt16LE(method, 10);
    ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0, 14);
    ch.writeUInt32LE(crc, 16);
    ch.writeUInt32LE(body.length, 20);
    ch.writeUInt32LE(raw.length, 24);
    ch.writeUInt16LE(name.length, 28);
    ch.writeUInt16LE(0, 30); ch.writeUInt16LE(0, 32);   // extra/comment len
    ch.writeUInt16LE(0, 34); ch.writeUInt16LE(0, 36);   // disk/internal attrs
    ch.writeUInt32LE(0, 38);              // external attrs
    ch.writeUInt32LE(offset, 42);         // offset of local header
    central.push(ch, name);

    offset += lh.length + name.length + body.length;
  }
  const centralBuf = Buffer.concat(central);
  const localBuf = Buffer.concat(locals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4); end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(localBuf.length, 16);   // offset of central dir
  end.writeUInt16LE(0, 20);
  return Buffer.concat([localBuf, centralBuf, end]);
}
