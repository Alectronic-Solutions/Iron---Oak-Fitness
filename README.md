# Iron & Oak Fitness

![Next.js](https://img.shields.io/badge/Next.js_15-black?logo=next.js)
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
| **Home** | Premium brand landing with hero, animated stats, testimonial carousel, and photo bands |
| **Schedule** | Weekly class timetable with day/category filtering, capacity indicators, and booking flow |
| **Training** | 1-on-1 personal training pitch with trainer selector and appointment booking |
| **Trainers** | Trainer directory and individual profiles with availability calendars |
| **Membership** | Subscription tiers, class packs, feature comparison table, and FAQ accordion |
| **Account** | Simulated member portal with bookings, plan info, and payment history |
| **About / Contact** | Brand story, values, contact form, and studio hours |
| **Legal** | Full privacy policy, terms of service, and cookie policy |

---

## Tech stack

- **[Next.js 15](https://nextjs.org)** (App Router) + **TypeScript** — strict mode, Server Components by default
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
components/    # ui/ primitives + layout/, schedule/, trainers/, membership/, portal/ feature components
lib/data/      # Typed mock data (classes, trainers, schedule, plans, members)
types/         # Shared TypeScript interfaces
public/        # Static assets (favicon, robots.txt, sitemap.xml)
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
