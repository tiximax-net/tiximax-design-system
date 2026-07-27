#!/usr/bin/env node
/**
 * TIXIMAX Express — Export Studio (web UI chọn màn → PNG / ZIP)
 * ============================================================================
 * Mở trình duyệt, tick chọn các màn muốn xuất (có khung device), bấm Export:
 *   • chọn 1 màn  → tải về 1 file PNG
 *   • chọn nhiều  → tải về 1 file ZIP gộp các PNG
 *
 * Chạy:  node export-studio.mjs           (mặc định mở http://127.0.0.1:4270)
 *        node export-studio.mjs --port 4270 --scale 3
 *
 * 0 dependency — Node thuần + Chrome hệ thống (qua capture-engine.mjs).
 * ============================================================================
 */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { Studio, SCREENS, FILES, makeZip } from './capture-engine.mjs';

function flag(name, def) {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
}
const UI_PORT = Number(flag('port', '4270'));
const SCALE = Number(flag('scale', '3'));

const studio = new Studio({ assetPort: UI_PORT + 1, scale: SCALE });
await studio.start();

function stampOf(file) { return file.replace(/\.html$/, ''); }
function readBody(req) {
  return new Promise((ok) => { const c = []; req.on('data', (d) => c.push(d)); req.on('end', () => ok(Buffer.concat(c).toString('utf8'))); });
}

/* ─────────────────────────── UI HTML ─────────────────────────── */
const PAGE = /* html */ `<!doctype html><html lang="vi"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>TIXIMAX Express · Export Studio</title>
<style>
  :root{ --gold:#e0a924; --navy:#1e2f5a; --ink:#1a1d24; --sub:#6b7280; --line:#e5e7eb; --bg:#f4f5f7; --card:#fff; }
  @media (prefers-color-scheme:dark){ :root{ --ink:#e8eaed; --sub:#9aa0aa; --line:#2a2f3a; --bg:#12141a; --card:#1a1d24; } }
  *{ box-sizing:border-box; }
  body{ margin:0; font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; color:var(--ink); background:var(--bg); }
  header{ position:sticky; top:0; z-index:10; background:var(--card); border-bottom:1px solid var(--line); padding:14px 20px; display:flex; flex-wrap:wrap; gap:16px 24px; align-items:center; }
  h1{ font-size:17px; margin:0; font-weight:700; letter-spacing:.2px; }
  h1 span{ color:var(--gold); }
  .ctl{ display:flex; align-items:center; gap:8px; font-size:13px; color:var(--sub); }
  .seg{ display:inline-flex; border:1px solid var(--line); border-radius:9px; overflow:hidden; }
  .seg button{ border:0; background:transparent; color:var(--ink); padding:6px 12px; font-size:13px; cursor:pointer; }
  .seg button[aria-pressed="true"]{ background:var(--navy); color:#fff; }
  main{ padding:20px; }
  .bar{ display:flex; align-items:center; gap:14px; margin-bottom:16px; flex-wrap:wrap; }
  .bar .muted{ color:var(--sub); font-size:13px; }
  button.link{ border:0; background:transparent; color:var(--navy); cursor:pointer; font-size:13px; text-decoration:underline; padding:0; }
  @media (prefers-color-scheme:dark){ button.link{ color:#8fb0ff; } }
  .grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px; }
  .card{ background:var(--card); border:2px solid var(--line); border-radius:16px; padding:12px; cursor:pointer; transition:border-color .15s, transform .1s; position:relative; }
  .card:hover{ transform:translateY(-2px); }
  .card[aria-checked="true"]{ border-color:var(--gold); }
  .card .thumb{ aspect-ratio:426/898; background:var(--bg); border-radius:10px; overflow:hidden; display:flex; align-items:center; justify-content:center; }
  .card .thumb img{ width:100%; height:100%; object-fit:contain; }
  .card .thumb .spin{ width:22px; height:22px; border:3px solid var(--line); border-top-color:var(--gold); border-radius:50%; animation:sp 1s linear infinite; }
  @keyframes sp{ to{ transform:rotate(360deg); } }
  .card .cap{ display:flex; align-items:center; gap:8px; margin-top:10px; }
  .card .cap .tick{ width:20px; height:20px; border:2px solid var(--line); border-radius:6px; flex:none; display:flex; align-items:center; justify-content:center; }
  .card[aria-checked="true"] .cap .tick{ background:var(--gold); border-color:var(--gold); }
  .card .cap .tick svg{ opacity:0; }
  .card[aria-checked="true"] .cap .tick svg{ opacity:1; }
  .card .cap .name{ font-size:13.5px; font-weight:600; }
  .card .cap .idx{ color:var(--sub); font-size:12px; }
  .fab{ position:fixed; right:24px; bottom:24px; z-index:20; }
  .fab button{ border:0; background:var(--gold); color:#3a2c00; font-weight:700; font-size:15px; padding:14px 22px; border-radius:14px; cursor:pointer; box-shadow:0 8px 24px rgba(0,0,0,.18); }
  .fab button:disabled{ opacity:.45; cursor:not-allowed; }
</style></head>
<body>
<header>
  <h1>TIXI<span>MAX</span> Express · Export Studio</h1>
  <div class="ctl">Ngôn ngữ
    <div class="seg" id="file">${FILES.map((f, i) => `<button data-v="${f.file}" aria-pressed="${i === 0}">${f.label}</button>`).join('')}</div>
  </div>
  <div class="ctl">Nền
    <div class="seg" id="theme"><button data-v="light" aria-pressed="true">Sáng</button><button data-v="dark" aria-pressed="false">Tối</button></div>
  </div>
  <div class="ctl">Khung
    <div class="seg" id="mode"><button data-v="device" aria-pressed="true">Có khung</button><button data-v="screen" aria-pressed="false">Không khung</button></div>
  </div>
</header>
<main>
  <div class="bar">
    <button class="link" id="all">Chọn tất cả</button>
    <button class="link" id="none">Bỏ chọn</button>
    <span class="muted" id="count">Chưa chọn màn nào</span>
  </div>
  <div class="grid" id="grid">
    ${SCREENS.map((s, i) => `
      <div class="card" data-i="${i}" aria-checked="false" tabindex="0">
        <div class="thumb"><div class="spin"></div></div>
        <div class="cap">
          <span class="tick"><svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6.5 4.8 9 10 3" fill="none" stroke="#3a2c00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <div><div class="name">${s.label}</div><div class="idx">Màn ${i + 1} · ${s.slug}</div></div>
        </div>
      </div>`).join('')}
  </div>
</main>
<div class="fab"><button id="export" disabled>Export</button></div>
<script>
  const opt = { file: ${JSON.stringify(FILES[0].file)}, theme: 'light', mode: 'device' };
  const sel = new Set();
  const $ = (s) => document.querySelector(s);
  const cards = [...document.querySelectorAll('.card')];

  function loadThumbs(){
    cards.forEach((c) => {
      const i = c.dataset.i;
      const t = c.querySelector('.thumb');
      t.innerHTML = '<div class="spin"></div>';
      const img = new Image();
      img.onload = () => { t.innerHTML = ''; t.appendChild(img); };
      img.onerror = () => { t.innerHTML = '<span style="color:var(--sub);font-size:12px">lỗi</span>'; };
      img.src = '/thumb?file=' + encodeURIComponent(opt.file) + '&theme=' + opt.theme + '&mode=' + opt.mode + '&index=' + i + '&t=' + Date.now();
    });
  }
  function syncCount(){
    const n = sel.size;
    $('#count').textContent = n === 0 ? 'Chưa chọn màn nào' : (n + ' màn đã chọn' + (n > 1 ? ' → sẽ xuất ZIP' : ' → PNG'));
    $('#export').disabled = n === 0;
    $('#export').textContent = n > 1 ? ('Export ' + n + ' màn (.zip)') : 'Export';
  }
  function toggle(c){
    const i = c.dataset.i;
    if (sel.has(i)) { sel.delete(i); c.setAttribute('aria-checked', 'false'); }
    else { sel.add(i); c.setAttribute('aria-checked', 'true'); }
    syncCount();
  }
  cards.forEach((c) => {
    c.addEventListener('click', () => toggle(c));
    c.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(c); } });
  });
  $('#all').onclick = () => { cards.forEach((c) => { sel.add(c.dataset.i); c.setAttribute('aria-checked', 'true'); }); syncCount(); };
  $('#none').onclick = () => { cards.forEach((c) => { sel.delete(c.dataset.i); c.setAttribute('aria-checked', 'false'); }); syncCount(); };

  document.querySelectorAll('.seg').forEach((seg) => {
    seg.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      [...seg.children].forEach((x) => x.setAttribute('aria-pressed', x === b));
      opt[seg.id] = b.dataset.v;
      loadThumbs();
    });
  });

  $('#export').onclick = async () => {
    const btn = $('#export'); const label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Đang xuất…';
    try {
      const indices = [...sel].map(Number).sort((a, b) => a - b);
      const res = await fetch('/export', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...opt, indices }) });
      const blob = await res.blob();
      const cd = res.headers.get('Content-Disposition') || '';
      const m = /filename="([^"]+)"/.exec(cd);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = m ? m[1] : 'export.png';
      a.click(); URL.revokeObjectURL(a.href);
    } catch (err) { alert('Lỗi xuất: ' + err); }
    btn.disabled = false; btn.textContent = label; syncCount();
  };

  loadThumbs(); syncCount();
</script>
</body></html>`;

/* ─────────────────────────── UI server ─────────────────────────── */
const server = createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  try {
    if (u.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(PAGE);
    }
    if (u.pathname === '/thumb') {
      const png = await studio.capture({
        file: u.searchParams.get('file'),
        theme: u.searchParams.get('theme') || 'light',
        mode: u.searchParams.get('mode') || 'device',
        index: Number(u.searchParams.get('index')),
      });
      res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' });
      return res.end(png);
    }
    if (u.pathname === '/export' && req.method === 'POST') {
      const { file, theme = 'light', mode = 'device', indices = [] } = JSON.parse(await readBody(req));
      const stamp = stampOf(file);
      const suffix = [mode === 'screen' ? 'bare' : '', theme === 'dark' ? 'dark' : ''].filter(Boolean).join('-');
      const shots = [];
      for (const i of indices) {
        const meta = SCREENS[i] || { slug: 'screen-' + (i + 1) };
        const png = await studio.capture({ file, theme, mode, index: i });
        shots.push({ name: `${stamp}__${meta.slug}${suffix ? '__' + suffix : ''}.png`, data: png });
      }
      if (shots.length === 1) {
        res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Disposition': `attachment; filename="${shots[0].name}"` });
        return res.end(shots[0].data);
      }
      const zip = makeZip(shots);
      const zname = `${stamp}__${shots.length}screens${suffix ? '__' + suffix : ''}.zip`;
      res.writeHead(200, { 'Content-Type': 'application/zip', 'Content-Disposition': `attachment; filename="${zname}"` });
      return res.end(zip);
    }
    res.writeHead(404).end('not found');
  } catch (e) {
    res.writeHead(500).end('error: ' + e.message);
  }
});

server.listen(UI_PORT, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${UI_PORT}`;
  console.log(`\n  ▸ TIXIMAX Export Studio đang chạy:  ${url}\n`);
  if (process.platform === 'darwin') { try { spawn('open', [url], { stdio: 'ignore' }); } catch {} }
});

process.on('SIGINT', async () => { await studio.stop(); process.exit(0); });
