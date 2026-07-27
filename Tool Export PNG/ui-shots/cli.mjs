#!/usr/bin/env node
/**
 * ui-shots — chạy trong bất kỳ project nào để có nút "Export screen"
 * ---------------------------------------------------------------------------
 *   cd my-ui-project
 *   ui-shots                 # phục vụ thư mục hiện tại, mở trình duyệt
 *   ui-shots --port 4270 --scale 3 --root .
 *
 * Mở file prototype trong trình duyệt → góc phải có nút Export screen →
 * chọn màn → 1 màn tải PNG, ≥2 màn tải ZIP. Ảnh pixel-perfect (Chrome nền).
 */
import { spawn } from 'node:child_process';
import { resolve, relative, isAbsolute, sep } from 'node:path';
import { existsSync, statSync, readFileSync, readdirSync } from 'node:fs';
import { Engine } from './engine.mjs';

/* Độ sâu `../` sâu nhất mà asset (href/src) của trang tham chiếu — để biết phải
   nâng root phục vụ lên bao nhiêu cấp thì CSS/ảnh `../../…` mới resolve được. */
function assetDepth(html) {
  let max = 0, m;
  const re = /(?:href|src)\s*=\s*["'](\.\.(?:\/\.\.)*\/)/g;
  while ((m = re.exec(html))) {
    const n = (m[1].match(/\.\.\//g) || []).length;
    if (n > max) max = n;
  }
  return max;
}
function raise(dir, depth) {
  let r = dir;
  for (let i = 0; i < depth; i++) { r = resolve(r, '..'); }
  return r;
}

/* Quét các file .html ở thư mục (nông) để lấy độ sâu asset lớn nhất. */
function maxDepthIn(dir) {
  let max = 0;
  const walk = (d, depth) => {
    if (depth > 2) return;
    let ents = [];
    try { ents = readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const abs = resolve(d, e.name);
      if (e.isDirectory()) walk(abs, depth + 1);
      else if (/\.html?$/i.test(e.name)) {
        try { max = Math.max(max, assetDepth(readFileSync(abs, 'utf8'))); } catch {}
      }
    }
  };
  walk(dir, 0);
  return max;
}

function flag(name, def) {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

/* Đối số vị trí (không phải cờ) — cái đầu tiên là file cần mở. */
function positionals() {
  const withVal = new Set(['root', 'port', 'scale', 'margin', 'file']);
  const argv = process.argv.slice(2);
  const out = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { if (withVal.has(a.slice(2))) i++; continue; }
    if (a.startsWith('-')) continue;
    out.push(a);
  }
  return out;
}

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`ui-shots — nút "Export screen" cho mọi prototype UI (PNG/ZIP, pixel-perfect).

Dùng:  cd <project> && ui-shots [file.html] [tuỳ chọn]

  [file.html]      file mở sẵn trong trình duyệt (mặc định: file đang mở/đứng).
                   Không truyền → mở trang chọn file (KHÔNG mở index Design System).
  --file <path>    tương đương đối số vị trí ở trên
  --root <dir>     thư mục phục vụ (mặc định: thư mục hiện tại)
  --port <n>       cổng (mặc định 4270)
  --scale <n>      độ nét / device pixel ratio (mặc định 3)
  --margin <n>     lề quanh khung device khi có bezel (mặc định 28)
  -h, --help       trợ giúp

Mở file prototype trong trình duyệt → bấm nút "Export screen" ở góc phải →
chọn màn → 1 màn tải .png, ≥2 màn tải .zip.`);
  process.exit(0);
}

// File cần mở: đối số vị trí (file đang đứng) hoặc --file. Không có → trang chọn file.
const wanted = flag('file', positionals()[0] || null);
const rootFlag = flag('root', null);           // nếu user ép --root thì tôn trọng, không tự nâng
const browseDir = resolve(process.cwd());       // thư mục để LIỆT KÊ file (trang chọn)
let root = resolve(rootFlag || process.cwd());  // thư mục PHỤC VỤ tĩnh (có thể nâng lên cho assets)
let openPath = null; // đường dẫn URL của file cần mở; null → trang chọn file

if (wanted) {
  const abs = resolve(process.cwd(), wanted);
  if (!existsSync(abs) || !statSync(abs).isFile()) {
    console.error('✗ Không tìm thấy file: ' + abs);
    process.exit(1);
  }
  // Nâng root đủ cao để asset `../../…` của chính file này resolve (trừ khi user ép --root).
  if (!rootFlag) {
    const fileDir = resolve(abs, '..');
    try { root = raise(fileDir, assetDepth(readFileSync(abs, 'utf8'))); } catch { root = fileDir; }
  }
  const rel = relative(root, abs);
  openPath = '/' + rel.split(sep).map(encodeURIComponent).join('/');
} else if (!rootFlag) {
  // Trang chọn file: nâng root theo asset sâu nhất của các .html trong thư mục hiện tại.
  root = raise(browseDir, maxDepthIn(browseDir));
}

const engine = new Engine({
  root,
  browseDir,
  port: Number(flag('port', '4270')),
  scale: Number(flag('scale', '3')),
  margin: Number(flag('margin', '60')),
});

try {
  await engine.start();
} catch (e) {
  console.error('✗ ' + e.message);
  process.exit(1);
}

const base = `http://127.0.0.1:${engine.port}`;
const url = base + (openPath || '/__uishots/');
console.log(`\n  ▸ ui-shots đang chạy:  ${base}`);
console.log(`  ▸ Thư mục:            ${engine.root}`);
console.log(openPath
  ? `  ▸ Mở file:            ${url}\n  ▸ Bấm nút "Export screen" ở góc phải.\n  (Ctrl+C để dừng)\n`
  : `  ▸ Mở trang chọn file → chọn prototype → bấm nút "Export screen".\n  (Ctrl+C để dừng)\n`);

const OPENERS = { darwin: 'open', win32: 'start' };
const opener = OPENERS[process.platform] || 'xdg-open';
try { spawn(opener, [url], { stdio: 'ignore', shell: process.platform === 'win32' }); } catch {}

const bye = async () => { await engine.stop(); process.exit(0); };
process.on('SIGINT', bye);
process.on('SIGTERM', bye);
