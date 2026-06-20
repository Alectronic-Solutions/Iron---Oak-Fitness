# Iron & Oak Fitness

Premium, mobile-first **example** website for a fictional boutique gym. It showcases
scheduling + membership UX. All data is mock; there is **no real payments/auth/DB**.

## Goals

- Demonstrate a premium, mobile-first brand experience.
- Showcase the full product surface:
  - Group-class scheduling (timetable, capacity, waitlists)
  - 1-on-1 personal-training appointments
  - Trainer-specific availability calendars
  - Membership tiers (recurring subscriptions)
  - Class packs / drop-ins
  - A member portal

## Stack

- **Next.js 15 (App Router) + TypeScript**
- **Tailwind CSS v4** - design tokens defined in `app/globals.css` via `@theme`
- **lucide-react** (icons), **framer-motion** (light micro-interactions)
- Mock data lives in `lib/data/`; all flows (booking, checkout, login) are simulated
  in the UI with local state.

## Project structure

- `app/` - routes (App Router). One folder per route.
- `components/` - `ui/` primitives, plus `layout/`, `schedule/`, `trainers/`,
  `membership/`, `portal/` feature components.
- `lib/data/` - typed mock data. `lib/utils.ts` - shared helpers.
- `types/` - shared TypeScript types.
- `public/` - static assets.

## Conventions

- **Design tokens are the source of truth.** Use the Tailwind classes generated from
  `@theme` (e.g. `bg-ink`, `text-bone`, `text-bronze`). Avoid ad-hoc hex values.
- **Mobile-first.** Build at 375px, enhance upward with `sm:`/`md:`/`lg:`. Keep tap
  targets ≥ 44px.
- **Server Components by default.** Add `"use client"` only to components that need
  interactivity (dialogs, booking flows, nav drawer).
- Brand voice: strong, grounded, premium. "Iron" (strength) + "Oak" (warmth).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Future (intentionally not implemented)

Real Stripe billing/checkout, authentication, a database, and a staff admin
dashboard. The codebase is structured so these can be added without rework.
