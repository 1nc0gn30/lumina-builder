<!-- xonettn -->
<div align="center">

# 🔧 Lumina Builder

Lumina Builder is a visual page builder that lets you:


![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

</div>

---

- add and customize prebuilt website blocks
- manage multiple pages in one workspace
- preview layouts in desktop/tablet/mobile frames
- configure per-page SEO and optional Supabase auth
- export a full React + Tailwind page as code

## Requirements

- Node.js 20+
- npm

## 🚀 Run the Builder Locally

1. Install dependencies:
   `npm install`
2. Start dev server:
   `npm run dev`
3. Open:
   `http://localhost:3000`

## 🔨 How to Use the Builder

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

### ⚙️ 5) Configure SEO per page

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

### ⚙️ 6) Configure auth (optional, per page)

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

## 💻 Local Data Storage

Builder state is stored in browser `localStorage`:

- `lumina-pages`
- `lumina-supabase-url`
- `lumina-supabase-anon-key`
- `lumina-preview-auth-session`

This means data is per-browser and per-device unless exported manually.

## ⚙️ NPM Scripts

- `npm run dev` - run Vite dev server on port `3000`
- `npm run build` - production build to `dist/`
- `npm run preview` - preview production build
- `npm run lint` - TypeScript type-check only (`tsc --noEmit`)
- `npm run clean` - remove `dist/`

## 🚀 Deploy This App

1. Build:
   `npm run build`
2. Deploy the `dist/` folder to your host.
3. Point your domain or subdomain to that deployment.
4. Ensure HTTPS is enabled and redirect rules are configured as needed.
# lumina-builder

---

<div align="center">

**[xonettn]** · Built by [Neal Frazier](https://github.com/1nc0gn30) · [@AshAmplifies](https://twitter.com/AshAmplifies)

</div>
