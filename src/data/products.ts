import { checkoutForSlug, checkoutPath } from '../config/checkout';
import { PRODUCT_CATALOG } from '../config/site';
import { getTranslations } from '../i18n';
import type { Translations } from '../i18n/types';
import { defaultLocale, type Locale } from '../i18n/locales';
import { acquisitionSteps, cheatsContent } from './product-catalog-en';
import { localizeBundle, acquisitionCopy, type CatalogKind } from './product-locale';
import type { ProductAcquisition, ProductPage } from './product-types';
import { getHomeHeroSlides } from './site-images';

export type {
  AcquisitionStep,
  ProductAcquisition,
  ProductFeatureEntry,
  ProductFeatureGroup,
  ProductOverview,
  ProductPage,
  ProductSlide,
  SystemRequirement,
} from './product-types';

export const productRelatedBlogSlugs: Record<string, string[]> = {
  'tekken-8-hack': [],
};

const productBase = PRODUCT_CATALOG;

export { acquisitionSteps, cheatsContent };

function acquisitionFor(productName: string): ProductAcquisition {
  return { title: `How to get ${productName}`, steps: acquisitionSteps };
}

function slugFromHref(href: string): string {
  const path = href.replace(/\/$/, '');
  const segment = path.split('/').filter(Boolean).pop() ?? 'tekken-8-hack';
  return segment;
}

function localizedContent<T extends Parameters<typeof localizeBundle>[2]>(
  locale: Locale,
  kind: CatalogKind,
  content: T,
): T {
  return localizeBundle(locale, kind, content);
}

function buildTierPages(t: Translations, locale: Locale): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = localizedContent(locale, 'cheats', {
      images: cheatsContent.images,
      overview: cheatsContent.overview,
      body: cheatsContent.body,
      goodToKnow: cheatsContent.goodToKnow,
      limitations: cheatsContent.limitations,
      systemRequirements: cheatsContent.systemRequirements,
      featureGroups: cheatsContent.featureGroups,
      fullFeatures: cheatsContent.featureGroups.flatMap((group) => group.items.map((item) => item.name)),
    });
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more ?? 0,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionCopy(locale, cheat.title) ?? acquisitionFor(cheat.title),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      featureGroups: content.featureGroups,
      systemRequirements: content.systemRequirements,
      body: content.body,
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

const pagesByLocale = new Map<Locale, ProductPage[]>();

function pagesForLocale(locale: Locale): ProductPage[] {
  if (!pagesByLocale.has(locale)) {
    const t = getTranslations(locale);
    pagesByLocale.set(locale, buildTierPages(t, locale));
  }
  return pagesByLocale.get(locale)!;
}

export const productPages: ProductPage[] = pagesForLocale(defaultLocale);
export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPages(locale: Locale = defaultLocale): ProductPage[] {
  return pagesForLocale(locale);
}

export function getProductPage(slug: string, locale: Locale = defaultLocale) {
  return pagesForLocale(locale).find((p) => p.slug === slug);
}

export function getAllProductSlugs(locale: Locale = defaultLocale) {
  return pagesForLocale(locale).map((p) => p.slug);
}

export const heroSlides = getHomeHeroSlides();

export function getProductHub(locale: Locale = defaultLocale) {
  const t = getTranslations(locale);
  return {
    path: productBase,
    title: t.products.catalogHeading ?? t.products.title,
    subtitle: t.products.subtitle,
    description: t.products.subtitle,
    buyUrl: checkoutPath('tekkenHack'),
  };
}

export const productHub = getProductHub(defaultLocale);