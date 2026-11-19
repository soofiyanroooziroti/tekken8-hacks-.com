import type { BlogPost } from '../../i18n/types';

export type BlogBlock =
  | { type: 'faq'; question: string; answer: string }
  | { type: 'h2' | 'h3' | 'p'; text: string }
  | { type: 'ul' | 'ol'; items: string[]; nestedItems?: Record<number, string[]> }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'cta'; title: string; text: string; href: string };

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogPostFull extends BlogPost {
  featured?: boolean;
  author?: string;
  seoTitle?: string;
  metaDescription?: string;
  dateIso?: string;
  relatedSlugs?: string[];
  faqs?: BlogFaq[];
  imageWidth?: number;
  imageHeight?: number;
  body: BlogBlock[];
}
