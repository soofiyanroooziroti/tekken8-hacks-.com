import { RSS_FEED_PATH, SITE_ORIGIN } from '../config/seo';

export function buildRssFeed(): string {
  const feedUrl = `${SITE_ORIGIN}${RSS_FEED_PATH}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tekken 8 Hacks</title>
    <link>${SITE_ORIGIN}/</link>
    <description>Tekken 8 Hacks loader on tekken8hacks.com.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
  </channel>
</rss>`;
}