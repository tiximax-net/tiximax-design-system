#!/usr/bin/env node
/**
 * TIXIMAX Express — Xuất PNG các giao diện prototype (CLI)
 * ============================================================================
 * Chụp từng màn hình của prototype mobile thành PNG, kiểu screenshot iPhone.
 * Dùng chung engine ở capture-engine.mjs (Node thuần + Chrome, 0 dependency).
 *
 *   node export-png.mjs                         # 8 màn bản JP, có khung device
 *   node export-png.mjs --file express-booking-prototype.html   # bản VI
 *   node export-png.mjs --mode screen           # không bezel
 *   node export-png.mjs --mode both             # cả 2 kiểu
 *   node export-png.mjs --theme both            # sáng + tối
 *   node export-png.mjs --only 0,2,4            # vài màn (index 0-7)
 *   node export-png.mjs --scale 3 --out exports
 *
 * ⇒ Cần chọn màn tương tác + gộp ZIP? Dùng:  node export-studio.mjs
 * ============================================================================
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Studio, SCREENS } from './capture-engine.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

function flag(name, def) {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : def;
}
const OPT = {
  file: flag('file', 'express-booking-prototype-jp.html'),
  mode: flag('mode', 'device'),
  theme: flag('theme', 'light'),
  scale: Number(flag('scale', '3')),
  out: flag('out', 'exports'),
  only: flag('only', ''),
  port: Number(flag('port', '4271')),
  margin: Number(flag('margin', '64')),
};

const modes = OPT.mode === 'both' ? ['device', 'screen'] : [OPT.mode];
const themes = OPT.theme === 'both' ? ['light', 'dark'] : [OPT.theme];
const pick = OPT.only ? OPT.only.split(',').map((n) => Number(n.trim())) : SCREENS.map((_, i) => i);

const studio = new Studio({ assetPort: OPT.port, scale: OPT.scale, margin: OPT.margin });
await studio.start();
console.log(`▸ file ${OPT.file}`);

const outDir = resolve(HERE, OPT.out);
await mkdir(outDir, { recursive: true });
const stamp = OPT.file.replace(/\.html$/, '');
let count = 0;

for (const theme of themes) {
  for (const i of pick) {
    const meta = SCREENS[i] || { slug: 'screen-' + (i + 1), label: '' };
    for (const mode of modes) {
      const png = await studio.capture({ file: OPT.file, theme, index: i, mode });
      const suffix = [modes.length > 1 ? mode : '', themes.length > 1 ? theme : ''].filter(Boolean).join('-');
      const name = `${stamp}__${meta.slug}${suffix ? '__' + suffix : ''}.png`;
      await writeFile(resolve(outDir, name), png);
      console.log(`  ✓ ${name}  (${meta.label})`);
      count++;
    }
  }
}

await studio.stop();
console.log(`\n▸ Xong: ${count} ảnh → ${outDir}`);
