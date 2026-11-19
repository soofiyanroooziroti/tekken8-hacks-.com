import fs from 'node:fs';
import path from 'node:path';

const brand = process.argv[2] ?? 'Hacks';
const blogDir = path.resolve(import.meta.dirname, '..', 'src/content/blog/en');

const posts = [
  ['bryan-combos-tekken-8.md', '/images/tekken8-capture-01.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 1`],
  ['claudio-combos-tekken-8.md', '/images/tekken8-capture-02.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 2`],
  ['essential-tekken-8-combos-guide.md', '/images/tekken8-capture-03.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 3`],
  ['hwoarang-combos-tekken-8.md', '/images/tekken8-capture-04.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 4`],
  ['king-combo-flow-chart-tekken-8.md', '/images/tekken8-capture-05.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 5`],
  ['kingjae-tekken-8-tier-list.md', '/images/tekken8-capture-06.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 6`],
  ['tekken-8-dlc-characters.md', '/images/tekken8-capture-07.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 7`],
  ['tekken-8-mods.md', '/images/tekken8-menu-visuals.webp', 1330, 840, `Tekken 8 ${brand} menu, visuals tab`],
  ['tekken-8-new-characters.md', '/images/tekken8-menu-world.webp', 1330, 840, `Tekken 8 ${brand} menu, world tab`],
  ['tekken-8-season-2-tier-list.md', '/images/tekken8-menu-misc.webp', 1330, 840, `Tekken 8 ${brand} menu, misc tab`],
  ['tekken-8-season-3-characters.md', '/images/tekken8-capture-08.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 8`],
  ['tekken-8-tier-list.md', '/images/tekken8-capture-09.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 9`],
  ['tekken-overlay-for-tekken-8.md', '/images/tekken8-capture-01.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 1`],
  ['zafina-combos-tekken-8.md', '/images/tekken8-capture-02.webp', 1920, 1080, `Tekken 8 ${brand} blog hero from gameplay capture 2`],
];

const cheatsPosts = [
  ['bryan-tekken-8-frame-data.md', '/images/tekken8-capture-01.webp', 1920, 1080],
  ['can-you-ban-a-character-on-tekken-8.md', '/images/tekken8-capture-02.webp', 1920, 1080],
  ['how-to-cheat-in-tekken-8.md', '/images/tekken8-menu-visuals.webp', 1330, 840],
  ['how-to-unlock-all-characters-in-tekken-8.md', '/images/tekken8-menu-world.webp', 1330, 840],
  ['jin-tekken-8-frame-data.md', '/images/tekken8-menu-misc.webp', 1330, 840],
  ['rage-art-tekken-8.md', '/images/tekken8-capture-03.webp', 1920, 1080],
  ['tekken-8-characters.md', '/images/tekken8-capture-04.webp', 1920, 1080],
  ['tekken-8-frame-data.md', '/images/tekken8-capture-05.webp', 1920, 1080],
  ['tekken-8-heat.md', '/images/tekken8-capture-06.webp', 1920, 1080],
  ['tekken-8-punish-demo-man-as-jin.md', '/images/tekken8-capture-07.webp', 1920, 1080],
  ['tekken-8-special-guest-characters.md', '/images/tekken8-capture-08.webp', 1920, 1080],
  ['tekken-frame-data.md', '/images/tekken8-capture-09.webp', 1920, 1080],
];

const list = brand === 'Cheats' ? cheatsPosts.map(([f, img, w, h]) => [f, img, w, h, altFor(img, brand)]) : posts;

function altFor(img, b) {
  if (img.includes('menu-visuals')) return `Tekken 8 ${b} menu, visuals tab`;
  if (img.includes('menu-world')) return `Tekken 8 ${b} menu, world tab`;
  if (img.includes('menu-misc')) return `Tekken 8 ${b} menu, misc tab`;
  const n = img.match(/capture-(\d+)/)?.[1] ?? '';
  return `Tekken 8 ${b} blog hero from gameplay capture ${Number(n)}`;
}

for (const [file, image, w, h, imageAlt] of list) {
  const fp = path.join(blogDir, file);
  if (!fs.existsSync(fp)) continue;
  let text = fs.readFileSync(fp, 'utf8');
  text = text.replace(/"image": "[^"]+"/, `"image": "${image}"`);
  text = text.replace(/"imageAlt": "[^"]+"/, `"imageAlt": "${imageAlt}"`);
  text = text.replace(/"imageWidth": \d+/, `"imageWidth": ${w}`);
  text = text.replace(/"imageHeight": \d+/, `"imageHeight": ${h}`);
  fs.writeFileSync(fp, text);
}