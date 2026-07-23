#!/usr/bin/env node
/**
 * TIXIMAX Design System — máy chủ tĩnh tối giản
 * ============================================================
 * Chạy:  npm start            (hoặc: node serve.mjs)
 *        npm start -- 8080    (đổi cổng)
 *        PORT=8080 npm start
 *
 * Vì sao cần server thay vì mở thẳng file HTML?
 *   Mở bằng file:// sẽ bị chặn ở vài chỗ: font self-host, @import CSS,
 *   iframe của trình duyệt design-system (index.html), fetch/JSON.
 *   Bật server rồi mở qua http://localhost thì mọi thứ chạy đúng.
 *
 * 0 dependency — chỉ dùng thư viện chuẩn của Node (>=18).
 * ============================================================
 */
import { createServer } from 'node:http';
import { readFile, stat, readdir } from 'node:fs/promises';
import { extname, join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)));
const DEFAULT_PORT = 4173;

/* ---------- Cổng: --port 8080 · 8080 · PORT=8080 · mặc định 4173 ---------- */
function readPort() {
  const args = process.argv.slice(2);
  const flag = args.indexOf('--port');
  const raw = (flag >= 0 ? args[flag + 1] : args.find((a) => /^\d+$/.test(a))) ?? process.env.PORT;
  const port = Number.parseInt(raw ?? '', 10);
  return Number.isInteger(port) && port > 0 && port < 65536 ? port : DEFAULT_PORT;
}

/* ---------- MIME ---------- */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
};

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const page = (title, body) => `<!DOCTYPE html>
<html lang="vi"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>
  body{margin:0;padding:40px;background:#F5F7FA;color:#0C1A31;
       font:15px/1.55 "Inter",system-ui,-apple-system,"Segoe UI",sans-serif}
  .wrap{max-width:760px;margin:0 auto}
  h1{font-size:20px;font-weight:800;letter-spacing:-.01em;margin:0 0 4px}
  .sub{color:#8B95A5;font-size:13px;margin:0 0 24px}
  ul{list-style:none;margin:0;padding:0;background:#fff;border:1px solid #DDE2EA;border-radius:14px;overflow:hidden}
  li+li{border-top:1px solid #EDF0F4}
  a{display:flex;gap:10px;align-items:baseline;padding:11px 16px;color:#0C1A31;text-decoration:none}
  a:hover{background:#FEF9EA}
  .sz{margin-left:auto;font-size:12px;color:#8B95A5}
  .dir{font-weight:600;color:#A87B15}
</style></head><body><div class="wrap">${body}</div></body></html>`;

/* ---------- Chặn đường dẫn ra ngoài thư mục & file ẩn ---------- */
function safePath(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  } catch {
    return null;
  }
  if (decoded.split('/').some((seg) => seg.startsWith('.') && seg !== '' && seg !== '.')) return null;
  const target = resolve(join(ROOT, decoded));
  return target === ROOT || target.startsWith(ROOT + sep) ? target : null;
}

async function listing(dir, urlPath) {
  const entries = await readdir(dir, { withFileTypes: true });
  const rows = await Promise.all(
    entries
      .filter((e) => !e.name.startsWith('.'))
      .sort((a, b) => (a.isDirectory() === b.isDirectory() ? a.name.localeCompare(b.name) : a.isDirectory() ? -1 : 1))
      .map(async (e) => {
        const href = encodeURI(urlPath.replace(/\/?$/, '/') + e.name) + (e.isDirectory() ? '/' : '');
        let size = '';
        if (!e.isDirectory()) {
          const s = await stat(join(dir, e.name)).catch(() => null);
          if (s) size = s.size < 1024 ? `${s.size} B` : `${(s.size / 1024).toFixed(s.size < 1024 * 100 ? 1 : 0)} KB`;
        }
        return `<li><a href="${esc(href)}"><span class="${e.isDirectory() ? 'dir' : ''}">${esc(e.name)}${
          e.isDirectory() ? '/' : ''
        }</span><span class="sz">${size}</span></a></li>`;
      })
  );
  const up = urlPath === '/' ? '' : `<li><a href="${esc(encodeURI(urlPath.replace(/[^/]+\/?$/, '')))}"><span class="dir">../</span></a></li>`;
  return page(
    `${urlPath} — TIXIMAX Design System`,
    `<h1>${esc(urlPath)}</h1><p class="sub">TIXIMAX Design System · máy chủ tĩnh cục bộ</p><ul>${up}${rows.join('')}</ul>`
  );
}

/* ---------- Server ---------- */
const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end('Method Not Allowed');
    return;
  }

  const urlPath = new URL(req.url, 'http://localhost').pathname;
  const target = safePath(urlPath);
  if (!target) {
    res.writeHead(403, { 'Content-Type': MIME['.html'] }).end(page('403', '<h1>403 — Forbidden</h1>'));
    return;
  }

  try {
    let file = target;
    const info = await stat(file);

    if (info.isDirectory()) {
      // Thư mục có index.html → phục vụ luôn, không thì liệt kê nội dung
      const index = join(file, 'index.html');
      const hasIndex = await stat(index).then((s) => s.isFile()).catch(() => false);
      if (hasIndex) {
        file = index;
      } else {
        const html = await listing(file, urlPath);
        res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store' });
        res.end(req.method === 'HEAD' ? undefined : html);
        return;
      }
    }

    const body = await readFile(file);
    res.writeHead(200, {
      'Content-Type': MIME[extname(file).toLowerCase()] ?? 'application/octet-stream',
      'Content-Length': body.length,
      // no-store: sửa file xong F5 là thấy ngay, không dính cache
      'Cache-Control': 'no-store',
    });
    res.end(req.method === 'HEAD' ? undefined : body);
    console.log(`  200  ${urlPath}`);
  } catch {
    res.writeHead(404, { 'Content-Type': MIME['.html'] });
    res.end(
      req.method === 'HEAD'
        ? undefined
        : page('404', `<h1>404 — Không tìm thấy</h1><p class="sub">${esc(urlPath)}</p><ul><li><a href="/">← Về trang gốc</a></li></ul>`)
    );
    console.log(`  404  ${urlPath}`);
  }
});

/* ---------- Khởi động (cổng bận thì tự nhích lên) ---------- */
const ENTRIES = [
  ['index.html', 'Trình duyệt design system (32 cards, VI/JA/EN, light–dark)'],
  ['preview/All Components.html', 'Trình duyệt bản cũ, 1 ngôn ngữ'],
  ['UI-TXM-Express/express-prototype.html', 'Express — gộp Mobile + Website, có nút gạt nền tảng'],
  ['UI-TXM-Express/express-booking-preview.html', 'Express booking — 6 màn hình cạnh nhau'],
  ['UI-TXM-Express/express-booking-prototype.html', 'Express booking — bản điện thoại rời (nguồn của bản gộp)'],
  ['UI-TXM-Express/express-web-prototype.html', 'Express web app — bản web rời (nguồn của bản gộp)'],
  ['slides-preview.html', 'Slide deck 16:9'],
  ['documents-preview.html', 'Tài liệu A4'],
  ['ui_kits/website/index.html', 'UI kit — website marketing'],
  ['ui_kits/portal/index.html', 'UI kit — portal khách hàng'],
];

async function banner(port) {
  const base = `http://localhost:${port}`;
  console.log(`\n  TIXIMAX Design System · phục vụ ${ROOT}\n  ${base}\n`);
  for (const [path, label] of ENTRIES) {
    const exists = await stat(join(ROOT, path)).then(() => true).catch(() => false);
    if (exists) console.log(`  ${base}/${encodeURI(path).padEnd(50)} ${label}`);
  }
  console.log('\n  Ctrl+C để dừng.\n');
}

let port = readPort();
let attempts = 0;
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE' && attempts < 10) {
    attempts += 1;
    console.log(`  Cổng ${port} đang bận, thử ${port + 1}…`);
    port += 1;
    server.listen(port);
  } else {
    console.error(`  Không khởi động được: ${err.message}`);
    process.exit(1);
  }
});
server.listen(port, () => banner(server.address().port));
