## Lior Medan – Developer Page

This repository hosts Lior Medan’s personal developer site, built with Next.js App Router.  
The site highlights featured work, a six-month roadmap, skills matrix, and interactive quote/assist flows in both Hebrew and English (RTL/LTR aware).

---

### Tech Overview

- **Framework**: Next.js 15.5 (App Router)
- **Styling**: Tailwind CSS v4 + custom CSS animations
- **UI Kit**: Radix primitives via shadcn/ui
- **State**: React 19 with client contexts for language, theme, and palette
- **3D & Motion**: Three.js, React Three Fiber, Framer Motion, and Spline embeds
- **Tooling**: TypeScript (strict), ESLint 9, pnpm, Playwright/Vitest scaffolding

Legacy Stripe/Firebase payment scaffolding was removed; the current focus is a static marketing/portfolio experience.

---

### Prerequisites

- Node.js 20+
- pnpm (install via `npm install -g pnpm`)

### Install & Run

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000. Language/theme/palette toggles live in the floating toolbar and sidebar.

### Core Scripts

| Command        | Description |
| -------------- | ----------- |
| `pnpm dev`     | Next.js dev server with fast refresh |
| `pnpm build`   | Production build (`next build`) |
| `pnpm start`   | Run the compiled app with `next start` |
| `pnpm lint`    | ESLint using the project rules |
| `pnpm clean`   | Remove `.next/` build cache |

> `pnpm lint` currently flags CommonJS helpers (`dev-server.js`, `test_parent.js`). Update or ignore those scripts if they are not needed.

---

### Deployment

The repo is linked to Vercel (`liormedans-projects/lior-medan-developer-page`). Deploy via:

```bash
pnpm dlx vercel --prod
```

Ensure you are authenticated (`vercel login`) or provide `VERCEL_TOKEN`.  
TypeScript build errors are not ignored—production deploys fail if the project is not type-safe.

> `app/sitemap.ts` + `app/robots.ts` generate the SEO files automatically during `next build`. Set `NEXT_PUBLIC_SITE_URL` for correct canonical URLs.

---

### Development Notes

- **Localization & RTL**: `LanguageProvider` controls locale (`he`/`en`) and toggles document direction. Hebrew is the default.  
- **Sidebar Layout**: Resizable desktop sidebar (RTL-first). On tablet/mobile, the sheet menu is used instead.  
- **3D Widgets**:  
  - `HeroThree` renders a simple R3F demo box.  
  - `HeroSpline` embeds Spline scenes and can drive the palette.  
  - `VoiceVisualizer3D` requests microphone access; it falls back to a demo oscillator if permissions are denied.  
- **Quote & Assist**: `/quote` and `/api/quote` (MVP cost outline) plus `/api/assist` (structured assistant response). Back your API routes with real services before production use.  
- **Testing**: Playwright/Vitest configuration exists, although end-to-end and unit suites are not shipped by default.

---

### Project Structure (high level)

- `src/app` – App Router pages and route groups (projects, roadmap, quote, skills, etc.)  
- `src/components` – Shared UI, layout, 3D helpers, assist/quote components  
- `src/data` – Static content (projects, roadmap, skills)  
- `src/lib` – Contexts and utilities (language, palette, validation)  
- `public` – Static assets

---

### Contributing / Maintenance

1. Create a feature branch and implement changes.  
2. Run `pnpm exec tsc --noEmit` to ensure type safety.  
3. Run `pnpm lint -- <path>` for the files you touched.  
4. Open a PR with screenshots/gifs for responsive or visual updates.  
5. Deploy via Vercel after merge (`vercel --prod` or CI).

Reach out to Lior directly or open a repo discussion for deployment or infrastructure questions.
