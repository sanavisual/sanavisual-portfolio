# SanaVisual — Video Editor Portfolio

A fast, mobile-first portfolio site built with **Astro 5**, **Tailwind CSS v4** and a few small TypeScript scripts, with **Lenis** for smooth scrolling.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## Where things live

| What | File |
| --- | --- |
| All text, contact details, services, tools, brands, testimonials | `src/data/site.ts` |
| Portfolio videos (titles, categories, order, hero reel) | `src/data/projects.ts` |
| Video files (full video, 6-second preview, poster) | `public/media/<slug>/` |
| Brand logos | `public/logos/` |
| Colors, fonts, animations | `src/styles/global.css` |
| Page sections | `src/components/*.astro` |
| Cursor, filters, player, scroll effects | `src/scripts/*.ts` |

## Adding a new video project

1. Install [ffmpeg](https://ffmpeg.org/download.html) (one time only).
2. Run:
   ```bash
   scripts/process-video.sh ~/Videos/my-new-ad.mp4 ugc-my-brand
   ```
   This creates `public/media/ugc-my-brand/` with `full.mp4`, `preview.mp4` and `poster.webp`, all compressed for the web.
   To choose where the preview loop starts, add the second as a third argument: `scripts/process-video.sh in.mp4 ugc-my-brand 12`
3. Open `src/data/projects.ts` and add one line:
   ```ts
   { slug: 'ugc-my-brand', title: 'Skincare UGC', category: 'ugc', brand: 'My Brand', duration: 62 },
   ```
   `category` is `ugc`, `direct-response`, `ai` or `vsl`. Set `featured: true` to show it in the hero reel. Use `format: 'horizontal'` for 16:9 videos such as most VSLs.

The **VSLs** filter tab appears automatically once you add your first `vsl` project.

## Testimonials

Add real quotes to `testimonials` in `src/data/site.ts`. The section stays hidden while the list is empty.

## Deploying (free)

**Vercel** (recommended): push this folder to GitHub, then go to [vercel.com/new](https://vercel.com/new), import the repository and click **Deploy**. Vercel detects Astro automatically.

**Netlify** works the same way: Build command `npm run build`, publish directory `dist`.

After deploying:
1. Update `url` in `src/data/site.ts` to your real address (for example `https://sanavisual.com`). It is used for search engines, the sitemap and link previews.
2. Optional: connect a custom domain in Vercel or Netlify settings.

### Video hosting tip

The 18 current videos total about 200 MB and are served straight from the site, which works fine on Vercel and Netlify free plans. If you add many more, consider [Bunny Stream](https://bunny.net/stream/) (≈ $1/month). Upload there and set `video: 'https://…'` on the project. Keep the preview and poster files in `public/media/`.

## Still to provide (placeholders)

- [ ] **Original video files.** The current ones were downloaded from the Canva site at 720p. Higher-quality originals will look sharper.
- [ ] **Headshot** → put it in `public/images/` and set `about.photo` in `src/data/site.ts`
- [ ] **Your name** (optional) → `about.name`
- [ ] **VSL samples**
- [ ] **Testimonials** (real ones only)
- [ ] **Booking link** (Calendly/Cal.com) → `contact.bookingUrl`
- [ ] **Domain** → `site.url`
- [ ] **Review the video titles** in `src/data/projects.ts`. They were written from the thumbnails, so rename them as you like.
- [ ] **Confirm the 4-step process** in `src/data/site.ts` (`process`) matches how you work.

## Accessibility & performance notes

- The custom cursor only runs on devices with a mouse. It is off on phones, tablets and for visitors who choose reduced motion.
- All animations respect the system "reduce motion" setting.
- Preview videos load only when needed and are skipped when the visitor has Data Saver on.
- The intro animation plays once per visit and can be skipped with a click.
