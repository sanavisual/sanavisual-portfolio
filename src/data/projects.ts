/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO PROJECTS
 *
 *  To add a project:
 *   1. Run:  scripts/process-video.sh path/to/video.mp4 my-new-slug
 *      (creates public/media/my-new-slug/ with full.mp4, preview.mp4, poster.webp)
 *   2. Add an entry below with the same `slug`.
 *
 *  Order in this list = order on the site. `featured: true` puts a
 *  project in the hero reel (pick 3).
 *
 *  Hosting full videos elsewhere (Bunny Stream, Vimeo…)? Set `video`
 *  to that direct MP4 / HLS URL and it will be used instead.
 * ─────────────────────────────────────────────────────────────
 */

export type Category = 'ugc' | 'direct-response' | 'ai' | 'vsl';

export interface Project {
  slug: string;
  title: string;
  category: Category;
  /** Brand name, if the brand is OK with being named. */
  brand?: string;
  /** Length in seconds — shown as a timecode on the card. */
  duration: number;
  /** 'vertical' (9:16) or 'horizontal' (16:9). VSLs are often horizontal. */
  format?: 'vertical' | 'horizontal';
  featured?: boolean;
  /** Optional override for the full video URL. */
  video?: string;
}

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'ugc', label: 'UGC Ads' },
  { id: 'direct-response', label: 'Direct-Response' },
  { id: 'ai', label: 'AI-Powered' },
  { id: 'vsl', label: 'VSLs' },
];

export const categoryLabel: Record<Category, string> = {
  ugc: 'UGC Ad',
  'direct-response': 'Direct-Response',
  ai: 'AI-Powered',
  vsl: 'VSL',
};

export const projects: Project[] = [
  // ── Direct-response ads ("Ads Built to Convert")
  { slug: 'dr-alert', title: 'Pain-Point Hook Ad', category: 'direct-response', duration: 141, featured: true },
  { slug: 'dr-wearable', title: 'Wearable Product Ad', category: 'direct-response', duration: 128 },
  { slug: 'dr-pet-walk', title: 'Lifestyle Story Ad', category: 'direct-response', duration: 84 },
  { slug: 'dr-stake', title: 'Story-Driven Promo', category: 'direct-response', brand: 'Stake', duration: 82 },

  // ── AI-powered ads
  { slug: 'ai-pixar-product', title: 'Pixar-Style Character Product Ad', category: 'ai', duration: 116, featured: true },
  { slug: 'ai-street-interview', title: 'Street Interview UGC', category: 'ai', duration: 75 },
  { slug: 'ai-podcast', title: 'Podcast-Style Ad', category: 'ai', duration: 82 },
  { slug: 'ai-pixar-3d-ugc', title: 'Pixar-Style 3D Animated UGC', category: 'ai', duration: 143 },

  // ── UGC ads for brands
  { slug: 'ugc-petplate', title: 'Fresh Dog Food UGC', category: 'ugc', brand: 'PetPlate', duration: 84 },
  { slug: 'ugc-quasi', title: 'Skincare UGC', category: 'ugc', brand: 'Quasi', duration: 166, featured: true },
  { slug: 'ugc-sunna', title: 'Supplement UGC', category: 'ugc', brand: 'SUNNA Supplements', duration: 77 },
  { slug: 'ugc-perfect-jean', title: "Men's Apparel UGC", category: 'ugc', brand: 'The Perfect Jean', duration: 74 },
  { slug: 'ugc-natures-blends', title: 'Wellness UGC', category: 'ugc', brand: "Nature's Blends", duration: 167 },
  { slug: 'ugc-elavate', title: 'Supplement Explainer UGC', category: 'ugc', brand: 'elavate', duration: 120 },
  { slug: 'ugc-humehealth', title: 'Health Tech UGC', category: 'ugc', brand: 'HumeHealth', duration: 85 },
  { slug: 'ugc-ankhway', title: 'Myth-Busting UGC', category: 'ugc', brand: 'Ankhway', duration: 84 },
  { slug: 'ugc-jocko', title: 'Joint Health UGC', category: 'ugc', brand: 'JOCKO Fuel', duration: 106 },
  { slug: 'ugc-facetub', title: 'Facial Ice Bath UGC', category: 'ugc', brand: 'FaceTub', duration: 96 },

  // ── VSLs — PLACEHOLDER: add your VSL samples here. The VSL filter tab
  //    appears automatically once at least one VSL project exists.
];

export const mediaFor = (p: Project) => ({
  poster: `/media/${p.slug}/poster.webp`,
  preview: `/media/${p.slug}/preview.mp4`,
  full: p.video ?? `/media/${p.slug}/full.mp4`,
});

export const timecode = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};
