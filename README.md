# Lumina Builder

Lumina Builder is a high-end website builder for assembling modern pages from reusable blocks, previewing layouts on multiple device sizes, and exporting production-ready code.

## Production Domain

- Primary app URL: `https://lumina.757tech.pro/`
- Open Graph image source: `https://757tech.pro/og.png`

`index.html` is configured with canonical, robots, Open Graph, Twitter Card, and JSON-LD metadata for SEO and social sharing.

## Features

- Drag-and-arrange style page composition from a block registry
- Mobile, tablet, and desktop preview modes
- Per-page SEO fields (title, description, keywords, image, slug, noindex)
- Client-side persistence for pages and settings
- Export-friendly front-end architecture

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (animations)

## Local Development

Prerequisites:

- Node.js 20+ (recommended)
- npm

Setup:

1. Install dependencies:
   `npm install`
2. Create env file:
   `cp .env.example .env.local`
3. Add required variables (for example `GEMINI_API_KEY`) in `.env.local`
4. Start the app:
   `npm run dev`
5. Open:
   `http://localhost:3000`

## Scripts

- `npm run dev` - start local dev server on port `3000`
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview the production build locally
- `npm run lint` - run TypeScript type checks
- `npm run clean` - remove the `dist/` folder

## Deployment

1. Build:
   `npm run build`
2. Deploy contents of `dist/` to your host/CDN.
3. Point DNS for `lumina.757tech.pro` to your deployment target.
4. Ensure HTTPS is enabled and redirects are configured to keep `https://lumina.757tech.pro/` canonical.

## SEO Notes

- Base SEO metadata lives in `index.html`.
- Page-level SEO values are handled in the app state and exported output.
- If the OG image path changes, update:
  - `meta[property="og:image"]`
  - `meta[name="twitter:image"]`
  in `index.html`.
# Lumina-Builder
