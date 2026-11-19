import type { ProductSlide } from './product-types';

const visualsMenu: ProductSlide = {
  src: '/images/tekken8-menu-visuals.webp',
  alt: 'Tekken 8 Hacks menu, visuals tab',
  caption: '',
  captionDesc: '',
  width: 1330,
  height: 840,
  objectFit: 'contain',
};

const worldMenu: ProductSlide = {
  src: '/images/tekken8-menu-world.webp',
  alt: 'Tekken 8 Hacks menu, world tab',
  caption: '',
  captionDesc: '',
  width: 1330,
  height: 840,
  objectFit: 'contain',
};

const miscMenu: ProductSlide = {
  src: '/images/tekken8-menu-misc.webp',
  alt: 'Tekken 8 Hacks menu, misc tab',
  caption: '',
  captionDesc: '',
  width: 1330,
  height: 840,
  objectFit: 'contain',
};

/** Home hero: urban lead, product menus, then one more gameplay still. */
export const HOME_HERO_MENU_SLIDES: ProductSlide[] = [
  {
    src: '/images/tekken8-hero-urban-square.webp',
    alt: 'Tekken 8 gameplay with Kazuya and Feng and frame data overlay in Urban Square on Windows PC',
    caption: '',
    captionDesc: '',
    width: 1024,
    height: 576,
    objectFit: 'cover',
  },
  { ...visualsMenu },
  { ...worldMenu },
  { ...miscMenu },
  {
    src: '/images/tekken8-capture-02.webp',
    alt: 'Tekken 8 match gameplay on Windows PC with HUD and training overlays visible',
    caption: '',
    captionDesc: '',
    width: 1920,
    height: 1080,
    objectFit: 'cover',
  },
];

export const CHEAT_MENU_SCREENSHOT_SLIDES: ProductSlide[] = [visualsMenu, worldMenu, miscMenu];