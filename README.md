# SP Automotive

A premium marketing site for SP Automotive (exotic car collision repair, Sarasota, FL), built on Next.js 16 with the App Router, React 19, Tailwind CSS v4, Framer Motion, and GSAP.

## Requirements

- [Bun](https://bun.sh) `>=1.3.0` (this project uses Bun as its package manager — `bun.lock` is committed)

## Getting Started

```bash
bun install     # install dependencies from bun.lock
bun dev         # start dev server at http://localhost:3000
```

## Scripts

```bash
bun dev         # next dev (Turbopack)
bun run build   # next build
bun start       # next start
bun run lint    # eslint
```

## Project layout

- `app/` — App Router routes (home, about, contact, three brand landers, robots/sitemap/og)
- `components/` — UI primitives, nav/footer, effects (custom cursor, reveals, magnetic), hero video, process narrative, brand pages, gallery, etc.
- `lib/` — site config and the process-narrative content
- `public/` — hero video + frames, before/after imagery, brand logos
- `app/globals.css` — Tailwind v4 `@theme` tokens (colors, fluid type scale, motion timings)

## Deploy

Optimized for [Vercel](https://vercel.com/new). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
