import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const sourceCandidates = [
  path.join(publicDir, 'logo.png'),
  path.join(root, 'logo.png'),
  path.join(publicDir, 'favicon-512.png'),
];

const sourcePath = sourceCandidates.find((p) => fs.existsSync(p));

if (!sourcePath) {
  console.error('Missing logo.png (or favicon-512.png) in project root or public/.');
  process.exit(1);
}

const squarePng = await sharp(sourcePath).resize(512, 512, { fit: 'cover' }).png().toBuffer();

await sharp(sourcePath)
  .resize(512, 512, { fit: 'cover' })
  .png()
  .toFile(path.join(publicDir, 'favicon-512.png'));

await sharp(sourcePath)
  .resize(256, 256, { fit: 'cover' })
  .png()
  .toFile(path.join(publicDir, 'logo-small.png'));

for (const { name, size } of [
  { name: 'favicon-32.png', size: 32 },
  { name: 'favicon-64.png', size: 64 },
  { name: 'favicon-192.png', size: 192 },
]) {
  const png = await sharp(squarePng).resize(size, size, { fit: 'cover' }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, name), png);
}

console.log('Updated logo-small.png, favicon PNGs, and favicon-512.png.');