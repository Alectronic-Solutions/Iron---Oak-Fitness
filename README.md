# Iron & Oak Fitness

![Next.js](https://img.shields.io/badge/Next.js_16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white)

A premium, mobile-first **example website** for a fictional boutique gym. Built to
showcase real-world scheduling and membership UX. All data is mock — there is no real
payment, authentication, or database behind it.

> **Live demo:** [ironandoakfitness.vercel.app](https://ironandoakfitness.vercel.app)

---

## Features

| Page | What it shows |
|------|--------------|
| **Navigation** | Utility bar (live open/closed status), desktop mega-menu dropdowns, mobile accordion drawer, sticky mobile action bar |
| **Home** | Video hero (poster-only on phones), live "up next" classes, stats, testimonials, getting-started steps |
| **Schedule** | Rolling 7-day timetable starting today, category filters, capacity bars, waitlists, deep links (`?class=forge&day=Tue`) |
| **Classes** | Class index by discipline + detail pages with weekly times and related classes |
| **Training / Coaches** | PT pricing, coach picker and appointment booking, coach profiles |
| **Membership** | Tiers with annual billing, comparison table, class packs, FAQ |
| **Free trial** | 3-step free-class / consult booking flow |
| **Join** | Simulated 3-step checkout with order summary |
| **Login / Account** | Simulated sign-in and member portal (bookings, plan, payments) |
| **About / Contact / FAQ** | Story, facility, values, map, hours, contact form, grouped FAQ |
| **Legal** | Privacy policy, terms of service, cookie policy |
| **SEO** | Per-page canonicals, sitemap, JSON-LD (gym with hours/address, breadcrumbs, FAQ, courses, offers) |

---

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router, static export) + **TypeScript** — strict mode, Server Components by default
- **[Tailwind CSS v4](https://tailwindcss.com)** — design tokens via `@theme` in `globals.css`
- **[framer-motion](https://www.framer.com/motion/)** — scroll-triggered reveals, parallax, and nav drawer
- **[lucide-react](https://lucide.dev)** — icons

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Designed mobile-first — try it at 375 px width.

## Scripts

| Command         | Description               |
|-----------------|---------------------------|
| `npm run dev`   | Start the dev server      |
| `npm run build` | Production build          |
| `npm run start` | Serve the production build|
| `npm run lint`  | Lint with ESLint          |

---

## Project structure

```
app/           # Routes (App Router). One folder per route.
components/    # ui/ primitives + layout/, schedule/, trainers/, membership/, portal/, trial/, join/, auth/ feature components
lib/site.ts    # Site constants: studio address/hours, navigation, pageMetadata() helper
lib/data/      # Typed mock data (classes, trainers, schedule, plans, members, faqs)
types/         # Shared TypeScript interfaces
public/        # Static assets (robots.txt + sitemap.xml are generated from app/)
```

---

## Design system

Design tokens live in [`app/globals.css`](app/globals.css) under `@theme`:

| Token group | Purpose |
|-------------|---------|
| `--color-ink / --color-charcoal` | Dark surface backgrounds |
| `--color-bronze / --color-oak` | Warm gold accent colours |
| `--color-bone / --color-bone-muted` | Primary and secondary text |
| `--font-display` | Oswald (headers) |
| `--font-sans` | Inter (body) |

---

> **Note:** This is a front-end demo. Booking, checkout, and login flows are simulated
> in the UI with local state. See `CLAUDE.md` for project conventions.
