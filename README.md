# lumina-builder

Lumina Builder helps you design premium websites with ready-made sections, responsive previews, SEO controls, and exportable code.

## Overview
Lumina Builder helps you design premium websites with ready-made sections, responsive previews, SEO controls, and exportable code.

## Tech Stack
- React
- Vite
- Express

## Project Structure
```
lumina-builder/
  - src
  (28 files total)
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
git clone https://github.com/1nc0gn30/lumina-builder.git
cd lumina-builder
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Available Scripts
  npm run dev - vite --port=3000 --host=0.0.0.0
  npm run build - vite build
  npm run preview - vite preview
  npm run clean - rm -rf dist
  npm run lint - tsc --noEmit

## Original README
<details>
<summary>Click to expand original README</summary>

# Lumina Builder

Lumina Builder is a visual page builder that lets you:

- add and customize prebuilt website blocks
- manage multiple pages in one workspace
- preview layouts in desktop/tablet/mobile frames
- configure per-page SEO and optional Supabase auth
- export a full React + Tailwind page as code

## Requirements

- Node.js 20+
- npm

## Run the Builder Locally

1. Install dependencies:
   `npm install`
2. Start dev server:
   `npm run dev`
3. Open:
   `http://localhost:3000`

## How to Use the Builder

### 1) Add blocks to the canvas

1. Use the left sidebar categories.
2. Click a block name to add it to the current page.
3. Click a placed block on canvas to select it.

### 2) Edit block content and settings

1. Select a block on canvas.
2. Use the right-side `Properties` panel.
3. Update text, images, colors, booleans, and selects based on that block's schema.

### 3) Reorder or remove blocks

1. Hover a block on canvas.
2. Use:
   - up/down arrows to move
   - trash icon to delete

### 4) Manage pages

Open the topbar page dropdown (current page name).

- `+` adds a new page.
- Pencil renames a page.
- Shield toggles page auth requirement.
- Magnifier opens SEO settings for that page.
- Trash deletes the page (only shown when more than one page exists).

### 5) Configure SEO per page

Click `SEO` in the topbar (or magnifier in the page menu).

Fields:

- page name
- SEO title
- SEO description
- keywords
- slug (auto-sanitized)
- Open Graph image URL
- `noindex` toggle

These values are injected into exported code via runtime meta tag updates.

### 6) Configure auth (optional, per page)

1. Mark a page as protected with the Shield toggle in the page menu.
2. Click `Auth Config` in the topbar.
3. Set:
   - Supabase URL
   - Supabase anon key (`anon` key only, never `service_role`)

When exported, protected pages include Supabase session checks and sign-in/sign-up UI.

### 7) Export code

1. Click `Export Code` (enabled when the page has at least one block).
2. Click `Copy Code`.
3. Paste into your target React project (for example `GeneratedPage.tsx`).

Export output includes:

- React component code for all selected blocks
- required imports (including `lucide-react` icons used by blocks)
- SEO helper logic
- optional Supabase auth wrapper when the page is protected

### 8) Quick generation and reset actions

- `Lucky Dip` creates 1-4 random pages with random blocks.
- Trash icon in topbar clears all blocks on the current page.

## Local Data Storage

Builder state is stored in browser `localStorage`:

- `lumina-pages`
- `lumina-supabase-url`
- `lumina-supabase-anon-key`
- `lumina-preview-auth-session`

This means data is per-browser and per-device unless exported manually.

## NPM Scripts

- `npm run dev` - run Vite dev server on port `3000`
- `npm run build` - production build to `dist/`
- `npm run preview` - preview production build
- `npm run lint` - TypeScript type-check only (`tsc --noEmit`)
- `npm run clean` - remove `dist/`

## Deploy This App

1. Build:
   `npm run build`
2. Deploy the `dist/` folder to your host.
3. Point your domain or subdomain to that deployment.
4. Ensure HTTPS is enabled and redirect rules are configured as needed.
# lumina-builder

</details>

## TODO / Roadmap
- [ ] Add unit tests
- [ ] Add LICENSE file
- [ ] Add Dockerfile for containerized deployment
- [ ] Add deployment configuration
- [ ] Consider adding Tailwind CSS
- [ ] Add CI/CD pipeline
- [ ] Add contribution guidelines (CONTRIBUTING.md)
- [ ] Improve error handling and edge cases
- [ ] Add environment variable documentation
- [ ] Update dependencies to latest versions
- [ ] Add code comments and inline documentation

## Deployment
This project can be deployed to Netlify, Vercel, or any static host.

## Author
**Neal Frazier** - [@AshAmplifies](https://github.com/1nc0gn30)

## Links
- GitHub: https://github.com/1nc0gn30/lumina-builder

---
*This README was enhanced as part of the neals-projects-2026 batch update.*
