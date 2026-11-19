export const CHECKOUT_URLS: {
  readonly tekkenHack: string;
};

export const DISCORD_INVITE_URL: string;

export const CHECKOUT_PATH_REDIRECTS: Map<string, string>;

export function resolveCheckoutPathRedirect(pathname: string): string | null;