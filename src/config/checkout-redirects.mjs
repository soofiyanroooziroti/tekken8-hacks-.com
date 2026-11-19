/** Checkout destinations (Zadeyo affiliate). */
export const CHECKOUT_URLS = {
  tekkenHack: 'https://zadeyo.com/go/SOOFIYAN?to=%2Fproducts%2Ftekken-8',
};

export const DISCORD_INVITE_URL = 'https://discord.com/invite/2gMnnaPWq';

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/discord', DISCORD_INVITE_URL],
  ['/go/discord/', DISCORD_INVITE_URL],
  ['/go/tekken-8', CHECKOUT_URLS.tekkenHack],
  ['/go/tekken-8/', CHECKOUT_URLS.tekkenHack],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}