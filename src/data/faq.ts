import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, productPath, ROUTES, localizedPath, localizedRoutes, cheatPath } from '../utils/path-core';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const product = link('Tekken 8 Hacks', productPath('tekken-8-hack'));
const statusPage = link('status page', ROUTES.status);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if the loader is current?',
    a: `Open the ${statusPage}. Ready means the listed build matches the current Tekken 8 PC client. Updating means our team is still patching—do not open the loader. Paused means it is not updated for the live client.`,
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: 'Checkout opens the portal with the loader for Tekken 8 Hacks. Save a config after you tune it. HVCI, core isolation, TPM, and secure boot stay on.',
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which PCs are supported?',
    a: 'Windows 10 or 11 on Intel or AMD, with HVCI, core isolation, TPM, and secure boot on. macOS and Linux are not supported.',
  },
  {
    id: 'license-move',
    topic: 'products',
    icon: 'faqLicenseMove',
    q: 'Can I move a key to another PC?',
    a: 'Open support on Discord with your order ID from checkout. License moves are reviewed case by case and are not automatic.',
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'What is for sale?',
    a: `${product} is $35 for 30 days or $150 lifetime on tekken8hacks.com.`,
  },
  {
    id: 'plans-same-price',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Does $150 lifetime include anything besides the loader?',
    a: 'No. Lifetime on Tekken 8 Hacks is that product only. A monthly start does not promise a credit toward lifetime.',
    scopes: ['tekken-8-hack'],
  },
  {
    id: 'not-dma',
    topic: 'scripts',
    icon: 'faqExternalLoader',
    q: 'Is this a DMA card?',
    a: 'No. Tekken 8 Hacks is a Windows loader from checkout. A DMA device is a different product and is not what this key delivers.',
    scopes: ['tekken-8-hack'],
  },
  {
    id: 'frame-scope',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What does Frame do?',
    a: 'Frame is the timing readout for Practice. It is separate from Punish, which is the window cue, and from Combo, which is the routing helper.',
    scopes: ['tekken-8-hack'],
  },
  {
    id: 'heat-scope',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What does Heat show?',
    a: 'Heat is the Heat-system overlay. Turn it on only if you look at it. It does not replace Frame or Punish.',
    scopes: ['tekken-8-hack'],
  },
  {
    id: 'punish-scope',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What does Punish show?',
    a: 'Punish marks the punish window after a block you already checked. The combo route comes after that window, not instead of it.',
    scopes: ['tekken-8-hack'],
  },
  {
    id: 'combo-scope',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What does the Combo module do?',
    a: 'Combo is a routing helper for the character you selected: one starter, a confirm, and an ender you already trust. It is not a second move list.',
    scopes: ['tekken-8-hack'],
  },
  {
    id: 'stream-proof-scope',
    topic: 'esp',
    icon: 'faqPlatforms',
    q: 'What does stream-proof overlay do?',
    a: 'Stream-proof overlay keeps the panel out of a capture on supported setups. Confirm the recording file, not only the live view.',
    scopes: ['tekken-8-hack'],
  },
  {
    id: 'feature-scope',
    topic: 'esp',
    icon: 'faqPlatforms',
    q: 'Which modules are included?',
    a: 'Frame, Heat, Punish, Combo, and stream-proof overlay. Each row is separate. Enabling one does not turn the others on.',
    scopes: ['tekken-8-hack'],
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'after-buy', 'platforms', 'license-move', 'products-page'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Plans, modules, the loader, and setup.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'scripts',
  'safety',
  'products',
  'blog',
  'setup',
];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, _kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter((f) => !f.scopes);
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const combined = [...scoped, ...general];
  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official product documentation?',
    a: `Articles explain workflows and link to ${product}. The module list on that page is the checkout source of truth.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying this guide?',
    a: 'Open support on Discord with your order ID and the article title. Include the exact loader text if something fails.',
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings in this article work next patch?',
    a: 'Re-check after every Tekken 8 update. Use the current product documentation instead of assuming an older guide still matches the live build.',
  },
];

export function getBlogFaqs(_tag: string, _slug: string): SiteFaqItem[] {
  return defaultBlogFaqs;
}

export const compareRows = [
  { feature: 'Frame', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Heat', icon: 'compareWardLocator' as const, lite: true, pro: true, elite: true },
  { feature: 'Punish', icon: 'compareRuneTimer' as const, lite: true, pro: true, elite: true },
  { feature: 'Combo', icon: 'compareZoomHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Stream-proof overlay', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
];