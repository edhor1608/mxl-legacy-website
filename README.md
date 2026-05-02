# MXL Legacy

MXL Legacy is a static Astro site for preserving the history, people, and media of the MXL sim-racing league.

## Stack

- Astro 5
- Tailwind CSS 4 through Vite
- Bun for installs and scripts
- Netlify static output

## Quick Start

```bash
bun install
bun run dev
```

Astro serves the dev site at `http://localhost:4321` by default.

## Commands

- `bun run dev` starts the local Astro dev server.
- `bun run build` runs `astro check` before the production build.
- `bun run build:static` builds the static Netlify output with `BUN_BUILD=1`.
- `bun run typecheck` runs Astro and TypeScript diagnostics.
- `bun run lint` runs project-specific repository checks.
- `bun run test` runs Vitest data and route contract tests.
- `bun run test:e2e` runs Playwright against a built preview.
- `bun run format:check` verifies Prettier formatting.

## Route Policy

German routes are canonical. English top-level routes redirect to their German equivalents:

- `/about` redirects to `/geschichte`
- `/drivers` redirects to `/fahrer`
- `/drivers/:slug` redirects to `/fahrer/:slug`
- `/gallery` redirects to `/galerie`
- `/contact` redirects to `/kontakt`

## Content Policy

This is an archive project. Do not add invented quotes, fake screenshots, placeholder image URLs, or unsourced timeline claims. Add new archive content only when the source or provenance is clear enough to document.

## Project Structure

```text
public/        Static images, icons, and web app assets
src/components Reusable Astro components
src/data       Typed site data
src/layouts    Shared page layouts
src/pages      File-based routes
scripts/       Repo-specific validation scripts
tests/         Vitest and Playwright tests
docs/          Architecture, testing, content, and decisions
```

## Deployment

Netlify runs `bun run build` and publishes `dist`. The Netlify environment sets `BUN_BUILD=1`, so production deploys use static Astro output.
