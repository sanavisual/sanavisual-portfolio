/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file to change text across the site.
 *  Anything marked `PLACEHOLDER` still needs real info from you.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  /** PLACEHOLDER: change to your real domain once you have one. */
  url: 'https://sanavisual.vercel.app',
  brand: 'SanaVisual',
  title: 'SanaVisual — Video Editor for E-commerce, UGC & Direct-Response Ads',
  description:
    'SanaVisual is a Philippines-based video editor with 5+ years of experience editing UGC ads, direct-response video ads, VSLs and AI-powered videos for e-commerce brands, businesses and creators.',
  role: 'Video Editor',
  tagline: ['Video Editor', 'UGC', 'Ads', 'AI Content'],
  location: 'Philippines',
  yearsExperience: '5+',
};

export const contact = {
  email: 'freelance.insana@gmail.com',
  whatsappDisplay: '+63 938 8128 607',
  /** International format, digits only — used for the wa.me link. */
  whatsappNumber: '639388128607',
  whatsappMessage: "Hi! I saw your portfolio and I'd like to talk about a video project.",
  /** PLACEHOLDER: paste your Calendly / Cal.com link to show a "Book a call" button. Leave empty to hide it. */
  bookingUrl: '',
};

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sanavisual' },
  { label: 'Facebook', href: 'https://www.facebook.com/zainak0' },
  { label: 'OnlineJobs.ph', href: 'https://v2.onlinejobs.ph/jobseekers/info/1378658' },
];

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const services = [
  {
    id: 'ecommerce',
    title: 'E-commerce Video Editing',
    body: 'Product-focused edits for online brands — from unboxings and demos to full ad creatives that show the product, the problem and the payoff in seconds.',
    tags: ['Product ads', 'Demos', 'Social cutdowns'],
    featured: true,
  },
  {
    id: 'ugc',
    title: 'UGC Ads',
    body: 'Creator footage turned into native-feeling ads: tight cuts, bold captions and pacing built for the feed.',
    tags: ['TikTok', 'Reels', 'Shorts'],
  },
  {
    id: 'direct-response',
    title: 'Direct-Response Ads',
    body: 'Hook-first edits designed to grab attention and drive action — with clear structure from hook to call-to-action.',
    tags: ['Hooks', 'Variations', 'CTAs'],
  },
  {
    id: 'vsl',
    title: 'VSLs',
    body: 'Long-form video sales letters edited to hold attention from start to finish, with captions, b-roll and motion graphics that support the script.',
    tags: ['Long-form', 'B-roll', 'Motion text'],
  },
  {
    id: 'ai',
    title: 'AI-Powered Ads',
    body: 'No shoot, no stress. Pixar-style characters, street-interview formats, podcast-style spots and AI voiceovers — produced end-to-end with AI tools.',
    tags: ['Pixar-style 3D', 'AI voiceover', 'Street interview'],
  },
];

/** PLACEHOLDER: confirm these steps match how you actually work. */
export const process = [
  { step: '01', title: 'Brief & assets', body: 'You share the footage, script or idea, plus references and the platform it is for.' },
  { step: '02', title: 'First cut', body: 'I build the edit — hook, pacing, captions, sound design and graphics.' },
  { step: '03', title: 'Revisions', body: 'You send feedback and I refine the cut until it is right.' },
  { step: '04', title: 'Delivery', body: 'Final exports in the sizes you need — 9:16, 1:1, 4:5 or 16:9.' },
];

export const reasons = [
  { title: 'Built for the feed', body: 'Every edit is made to stop the scroll in the first seconds — then keep people watching.' },
  { title: 'AI + pro editing', body: 'A mix of AI tools and professional software means more ideas, faster, without a shoot.' },
  { title: '5+ years of editing', body: 'Experience across UGC, social ads and AI videos for brands, businesses and creators.' },
];

export const tools = {
  editing: [
    { name: 'Adobe Premiere Pro', abbr: 'Pr', use: 'Main video editing, color grading and final cuts.' },
    { name: 'Adobe After Effects', abbr: 'Ae', use: 'Motion graphics, text animation and visual effects.' },
    { name: 'CapCut', abbr: 'Cc', use: 'Quick edits, reels and social media content.' },
    { name: 'Adobe Photoshop', abbr: 'Ps', use: 'Thumbnails, graphics and image edits.' },
    { name: 'Canva', abbr: 'Cv', use: 'Storyboards, templates and quick designs.' },
  ],
  ai: [
    { name: 'ChatGPT', abbr: 'Gp', use: 'Script ideas, captions, translations and creative support.' },
    { name: 'Midjourney', abbr: 'Mj', use: 'Image generation and visual references.' },
    { name: 'Runway', abbr: 'Rw', use: 'AI video generation, background removal and visual effects.' },
    { name: 'ElevenLabs', abbr: 'El', use: 'Realistic AI voiceovers for natural-sounding narration.' },
    { name: 'Higgsfield AI', abbr: 'Hf', use: 'Face swap, consistent characters and scene recreation.' },
  ],
};

export const brands = [
  { name: 'PetPlate', logo: '/logos/petplate.png' },
  { name: 'SUNNA Supplements', logo: '/logos/sunna.png' },
  { name: 'The Perfect Jean', logo: '/logos/the-perfect-jean.png' },
  { name: 'Quasi', logo: '/logos/quasi.png' },
  { name: "Nature's Blends", logo: '/logos/natures-blends.png' },
  { name: 'elavate', logo: '/logos/elavate.png' },
  { name: 'HumeHealth', logo: '/logos/humehealth.png' },
  { name: 'Ankhway', logo: '/logos/ankhway.png' },
  { name: 'JOCKO Fuel', logo: '/logos/jocko.png' },
  { name: 'FaceTub', logo: '/logos/facetub.png' },
];

/**
 * Real client testimonials only. The section stays hidden while this list is empty.
 * Example: { quote: '…', name: 'Jane Doe', role: 'Founder, Brand' }
 */
export const testimonials: { quote: string; name: string; role?: string }[] = [];

export const about = {
  /** PLACEHOLDER: replace with your headshot, e.g. '/images/me.webp'. Leave empty to show the placeholder. */
  photo: '',
  /** PLACEHOLDER: add your name if you'd like it shown, e.g. 'Sana'. */
  name: '',
  paragraphs: [
    "I'm a video editor based in the Philippines, creating engaging UGC, social media ads and AI-powered videos for brands, businesses and creators.",
    'For more than five years I have been turning raw footage and ideas into scroll-worthy videos — combining professional editing software with the latest AI tools to move faster and try bolder ideas.',
  ],
};
