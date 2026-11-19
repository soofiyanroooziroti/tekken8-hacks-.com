import type { AcquisitionStep, ProductSlide, SystemRequirement } from './product-types';
import type { Block } from './product-locale-types';
import { TEKKEN_8_FEATURE_GROUPS } from './tekken-8-feature-groups';
import { CHEAT_MENU_SCREENSHOT_SLIDES, HOME_HERO_MENU_SLIDES } from './menu-gallery-images';

export { CHEAT_MENU_SCREENSHOT_SLIDES } from './menu-gallery-images';

/** Home hero carousel (urban, menus, extra capture). */
export const cheatHomeHeroSlides: ProductSlide[] = [...HOME_HERO_MENU_SLIDES];

export const acquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Check status',
    desc: 'Confirm the loader is current on tekken8hacks.com before you buy—especially after a Tekken 8 patch.',
  },
  {
    num: '02',
    title: 'Pick a plan',
    desc: 'Choose monthly or lifetime—$35 for 30 days or $150 lifetime on Tekken 8 Hacks.',
  },
  {
    num: '03',
    title: 'Secure checkout',
    desc: 'Complete checkout on the portal. Your license unlocks with instant delivery.',
  },
  {
    num: '04',
    title: 'Install & verify',
    desc: 'Follow the setup guide, load a conservative preset, and test in Practice or Warm-up before ranked play.',
  },
];

export const cheatsContent = {
  images: [] as ProductSlide[],
  goodToKnow:
    'Tekken 8 updates often. Confirm availability on tekken8hacks.com before you launch. Overlay behavior may differ in Training or online lobbies after patches.',
  limitations:
    'Third-party software can conflict with game updates. You use this software at your own risk. Compatibility can change after game or Windows updates without notice.',
  systemRequirements: [
    { icon: 'reqWindows', text: 'Windows 10/11' },
    { icon: 'reqCpu', text: 'Intel/AMD' },
    { icon: 'reqShieldGuide', text: 'HVCI ON' },
    { icon: 'reqSettings', text: 'CORE ISOLATION ON' },
    { icon: 'shieldCheck', text: 'TPM ON' },
    { icon: 'reqShieldAccount', text: 'SECURE BOOT ON' },
  ] as SystemRequirement[],
  featureGroups: TEKKEN_8_FEATURE_GROUPS,
  overview: {
    title: 'Tekken 8 overlay for Windows PC',
    paragraphs: [
      'Tekken 8 overlay and mod options on Windows PC with Frame, Heat, Punish, Combo, and stream-proof overlay.',
      'Always check tekken8hacks.com before you launch, especially after a Tekken 8 client patch.',
    ],
  },
  body: [
    { type: 'h2', text: 'Modules included' },
    {
      type: 'p',
      text: 'The package includes Frame, Heat, Punish, Combo, and stream-proof overlay.',
    },
    { type: 'h2', text: 'Plans' },
    {
      type: 'p',
      text: 'Monthly $35 USD (P30D) or lifetime $150 USD (P99Y). Instant digital delivery worldwide after checkout.',
    },
  ] as Block[],
};