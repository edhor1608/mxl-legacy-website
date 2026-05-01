# Repo Audit Report

I reviewed the code, docs, configs, current generated build, and did web research. I did not change files during the audit.

## Executive Summary

The repo builds, but it is not yet agent-ready. The main problems are not "hard bugs everywhere"; they are broken project contracts: package manager mismatch, stale docs, no real test setup, missing typecheck/lint scripts, mixed route strategy, placeholder content, and metadata/assets that look valid but are not.

The clean-up should start with reproducibility and project contracts before UI polish. Otherwise future agents will keep producing believable but unverified changes.

## Current State

The site is an Astro 5 + Tailwind v4 tribute/archive site for the MXL sim-racing league. It uses static data from `src/data`, Astro file routes, and mostly server-rendered `.astro` components.

Verified:

- `bun run build` passes.
- `BUN_BUILD=1 bun run build` passes and matches Netlify's static production config.
- `pnpm run build` fails because `pnpm` is not installed locally.
- `astro check` is not installed and prompts interactively for `@astrojs/check`.
- There are no test files and no Vitest/Playwright config in this checkout.

## Highest Priority Cleanup

### 1. Fix the project contract for fresh clones.

Right now `package.json` declares only `dev`, `build`, `preview`, and `astro`, but docs mention lint/format/test commands that do not exist. `package.json` declares `pnpm`, while the repo has `bun.lock` and docs/rules mostly say Bun.

Decision needed: use Bun everywhere or pnpm everywhere. Given repo state, Bun is the lower-friction choice.

Minimum scripts should become:

```json
{
  "dev": "astro dev",
  "build": "astro check && astro build",
  "build:static": "BUN_BUILD=1 astro check && astro build",
  "preview": "astro preview",
  "typecheck": "astro check",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "lint": "...",
  "test": "...",
  "test:e2e": "..."
}
```

Astro's docs explicitly say `astro build` transpiles but does not typecheck, and recommend `astro check && astro build` for catching TypeScript errors before builds. Source: [Astro TypeScript docs](https://docs.astro.build/de/guides/typescript/).

### 2. Fix route truth.

The public navigation points to German routes, but dynamic driver pages only build under English paths.

Example: `src/pages/drivers.astro` links to `/fahrer/${p.link}`, but the only generated profile route is `src/pages/drivers/[slug].astro`. The static build confirms `/drivers/matri-x/index.html` exists, but `/fahrer/matri-x/index.html` does not.

This is a real broken user path.

Choose one:

- Preferred: make German routes canonical and move/create `src/pages/fahrer/[slug].astro`.
- Keep English routes and update all links/canonicals back to `/drivers`.
- Avoid wrapper imports like `src/pages/fahrer.astro` long term; they hide route ownership.

### 3. Fix broken public asset references.

`src/data/site.ts` uses `/MxlLegacyBanner.jpg`, but the actual file is `/images/MxlLegacyBanner.jpg`. I checked all referenced public assets: that banner path is missing.

This affects SEO, Open Graph, Twitter cards, and structured data logos.

### 4. Delete or quarantine placeholder/slop content.

There is obvious fake/generated content:

- Timeline years and claims in `src/components/Timeline.astro` conflict with project docs saying MXL ran roughly 2017-2020.
- Placeholder images are in `src/data/index.ts` and `src/pages/gallery.astro`.
- Quotes in `src/data/phrases.ts` look synthetic unless you can verify them.
- `src/components/UnpublishedStories.astro` contains a nonfunctional email form and placeholder song copy.

For an archive/tribute site, unverified invented content is worse than empty content. Mark uncertain content explicitly or remove it until sourced.

## Testing Assessment

The repo does not currently have "some kind of e2e testing and unit tests" in this checkout. It has a `.codex/ui-review.json`, but that is only a visual review target for desktop `/`.

That would miss:

- broken `/fahrer/:slug` routes
- mobile nav behavior
- dynamic quote pages
- gallery/contact/history pages
- SEO metadata correctness
- broken asset URLs
- link integrity

Useful test plan:

- Unit/data tests with Vitest:
  - every `people.link` is unique and slug-safe
  - every `phrases.id` is unique and slug-safe
  - every image path in data exists under `public`
  - every `hallOfFame` person has details and timeline impact
  - no placeholder URLs in production data
- Astro component tests:
  - `SEO.astro` outputs canonical, OG, Twitter, and JSON-LD correctly
  - `Breadcrumbs.astro` emits valid schema shape
- E2E tests with Playwright:
  - home loads and has main landmarks/headings
  - all nav links resolve
  - `/fahrer` cards navigate to working profile pages
  - mobile menu opens/closes
  - all generated dynamic routes return 200
  - no console errors on key pages
  - basic SEO assertions per page
- Link/asset crawler:
  - crawl built `dist`
  - fail on internal 404s
  - fail on missing `public` assets
  - fail on external placeholder domains

Astro officially documents Vitest setup via `getViteConfig()` and Playwright for E2E, including running against production preview. Source: [Astro testing docs](https://docs.astro.build/pl/guides/testing/). Playwright supports starting the local server from config with `webServer`, which is exactly what an agent-friendly fresh clone needs. Source: [Playwright webServer docs](https://playwright.dev/docs/test-webserver).

## Linting And Typecheck

Current linting is effectively absent. Prettier config exists, but no scripts enforce it. TypeScript strict config exists, but `astro check` is missing.

Recommended quality gate:

- `astro check` for `.astro` + TypeScript diagnostics.
- Prettier check for formatting, keeping `prettier-plugin-astro` and `prettier-plugin-tailwindcss`.
- ESLint with Astro parser/plugin for `.astro`-specific linting.
- Biome for JS/TS/JSON quality rules if it fits the stack. Biome has useful accessibility and complexity rules such as valid anchors, valid ARIA, valid `lang`, and cognitive complexity. Source: [Biome rules](https://biomejs.dev/linter/rules).
- Custom repo checks for project-specific quality:
  - ban `any`
  - ban `placehold.co`
  - ban `npm`/`yarn` in docs/scripts
  - validate public asset references
  - validate generated routes against internal links
  - require page metadata
  - require every route in test coverage config
  - prevent English/German route drift

## Docs Cleanup

Current docs are actively misleading.

Examples:

- README says clone `your-org/mxl-legacy`, not the real repo.
- README says dev server is `localhost:3000`, Astro defaults to `4321`.
- README lists `bun run lint` and `bun run format`, but scripts do not exist.
- README references files that do not exist, like `tailwind.config.cjs` and `postcss.config.cjs`.
- `plan.md` uses npm commands.
- `.cursor/rules` are useful, but tool-specific. Future agents need an `AGENTS.md` and stable docs.

Add:

- `AGENTS.md`: exact install/build/test/lint rules, package manager, route policy, content policy.
- `docs/ARCHITECTURE.md`: data flow, route map, component responsibilities.
- `docs/TESTING.md`: what tests exist, why, and how to run them fresh clone.
- `docs/CONTENT.md`: what is verified, what needs source, naming/slug/date conventions.
- `docs/DECISIONS.md` or ADRs: Bun vs pnpm, German canonical routes, static Netlify output.

## Web Research Findings

Public context for MXL is thin, so the site should not pretend more certainty than it has.

I found a RacingHub entry for "MXL - Matrix F1 Liga" listing it as F1 2020 on PC and describing it as "Matri_X_ F1 Community Liga Eine Liga für Viewer mit Viewer von Viewer." It also shows the expected archive categories: driver standings, team standings, calendar, race video, and full season results. Source: [RacingHub MXL](https://racinghub.io/v/mxl).

Search results also show the current deployed MXL Legacy drivers page indexed with the same people and roles currently in this repo. Source: [mxl-legacy.de drivers result](https://mxl-legacy.de/drivers).

Implication: the strongest future content direction is not more generic tribute prose. It is archive-grade evidence:

- seasons
- calendars
- standings
- race videos
- driver/team profiles
- screenshots/media provenance
- source notes per claim

Astro content collections would fit this well because schemas validate content and generate TypeScript types from the content model. Source: [Astro content collections docs](https://docs.astro.build/ja/guides/content-collections/#live-content-collections).

## Suggested Cleanup Order

1. Normalize package manager and scripts.
2. Add `astro check` and make builds noninteractive.
3. Fix `/fahrer/:slug` routing and canonical route policy.
4. Fix missing banner asset path.
5. Remove/mark placeholder and fake content.
6. Replace README/plan docs with accurate agent docs.
7. Add custom asset/link/content validation scripts.
8. Add Playwright e2e for core user paths.
9. Add Vitest tests for data contracts and SEO output.
10. Add linting/format/typecheck CI.
11. Move historical content into typed collections or stricter data modules.
12. Expand content only where claims can be sourced.

The root cause is that the repo currently optimizes for "looks like a website" instead of "can be safely evolved." The next phase should make correctness boring: one package manager, one route policy, one test command, one content contract, and CI that blocks invented or broken output.
