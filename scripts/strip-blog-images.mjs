import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src/content/blog/en');
for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith('.md')) continue;
  const file = path.join(dir, name);
  let raw = fs.readFileSync(file, 'utf8');
  if (!raw.startsWith('---')) continue;
  const end = raw.indexOf('\n---', 3);
  const body = raw.slice(end + 4);
  const data = JSON.parse(raw.slice(3, end));
  delete data.image;
  delete data.imageAlt;
  delete data.imageWidth;
  delete data.imageHeight;
  const next = `---\n${JSON.stringify(data, null, 2)}\n---${body}`;
  fs.writeFileSync(file, next);
  console.log('stripped image:', name);
}