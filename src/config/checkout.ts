import { CHECKOUT_URLS } from './checkout-redirects.mjs';

export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  tekkenHack: 'tekken-8',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Affiliate checkout hops (/go/… and zadeyo.com). */
export const CHECKOUT_LINK_REL = 'sponsored nofollow noopener';

export function isZadeyoHref(href: string): boolean {
  return href.includes('zadeyo.com') || /^\/go\/tekken-8(\/|\?|$)/.test(href);
}

export function checkoutPath(product: CheckoutProduct = 'tekkenHack'): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

export const PRIMARY_CHECKOUT_PATH = checkoutPath('tekkenHack');

export function checkoutForSlug(_slug: string): string {
  return checkoutPath('tekkenHack');
}

export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    return href.startsWith('/') ? href : `/${href}`;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  if (href.includes('%2Fproducts%2Ftekken-8') || href.includes('/products/tekken-8')) {
    return checkoutPath('tekkenHack');
  }

  return href;
}