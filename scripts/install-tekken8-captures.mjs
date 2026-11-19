import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const zipPath = path.join(root, 'files (2).zip');
const extract = path.join(root, '_zip-extract');
const outDir = path.join(root, 'public', 'images');
const neonSrc =
  'C:/Users/soofi/.cursor/projects/c-Users-soofi-Downloads-Websites/assets/neon-city-tekken-showdown-83fb2195-b159-402b-83c7-d8ee3294646f.webp';

fs.mkdirSync(extract, { recursive: true });
// Manual extract via PowerShell is fine; read png from extract if present
if (!fs.existsSync(path.join(extract))) {
  throw new Error('Run extract first');
}

const pngs = fs
  .readdirSync(extract)
  .filter((f) => f.endsWith('.png'))
  .sort();

const meta = {};

const neonDest = path.join(outDir, 'tekken8-hero-urban-square.webp');
fs.copyFileSync(neonSrc, neonDest);
const neon = await sharp(neonDest).metadata();
meta['tekken8-hero-urban-square.webp'] = { width: neon.width, height: neon.height };

let i = 1;
for (const f of pngs) {
  const base = `tekken8-capture-${String(i).padStart(2, '0')}.webp`;
  const out = path.join(outDir, base);
  const info = await sharp(path.join(extract, f)).webp({ quality: 86 }).toFile(out);
  meta[base] = { width: info.width, height: info.height };
  i += 1;
}

const oldHero = [
  'tekken8-hero-match.webp',
  'tekken8-hero-training.webp',
  'tekken8-hero-combo.webp',
  'tekken8-hero-round.webp',
  'tekken8-menu-frame.webp',
];
for (const f of oldHero) {
  const p = path.join(outDir, f);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

console.log(JSON.stringify(meta, null, 2));