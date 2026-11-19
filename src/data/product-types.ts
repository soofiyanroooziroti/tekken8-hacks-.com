import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
  width?: number;
  height?: number;
  /** Menu screenshots use contain; gameplay art uses cover (default). */
  objectFit?: 'contain' | 'cover';
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductFeatureEntry {
  name: string;
  desc?: string;
}

export interface ProductFeatureGroup {
  name: string;
  items: ProductFeatureEntry[];
  /** When true, the card spans the full row in the features masonry grid. */
  spanFull?: boolean;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  featureGroups?: ProductFeatureGroup[];
  systemRequirements: SystemRequirement[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}
