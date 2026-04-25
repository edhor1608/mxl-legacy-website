---
name: cloud-agent-starter
description: Practical setup, run, and testing workflows for Cloud agents working on the MXL Legacy Astro site.
---

# Cloud agent starter for MXL Legacy

Use this skill when you need to run, test, preview, or manually verify changes in this codebase from a Cursor Cloud agent.

## Repo basics

- This is a static-first Astro 5 site styled with Tailwind CSS.
- Use Bun for all package commands. If a Cloud image does not have Bun, install Bun for that session before running the app.
- There are no app login flows, user accounts, databases, queues, or seeded local services.
- GitHub CLI is already authenticated in Cloud agents for read-only GitHub inspection.
- Netlify authentication is only needed for manual deploy/debug work; normal local testing does not require `netlify login`.

## Common commands

- Install dependencies: `bun install --frozen-lockfile`
- Start dev server: `bun run dev -- --host 0.0.0.0`
- Build static output: `BUN_BUILD=1 bun run build`
- Preview a production build: `bun run preview -- --host 0.0.0.0`
- Format/check formatting for edited files: `bunx prettier --check <paths>`
- Format edited files: `bunx prettier --write <paths>`

## Feature flags and environment switches

- `BUN_BUILD=1` is the important environment switch. It makes `astro.config.mjs` use static output instead of the Netlify server adapter.
- Netlify sets `BUN_BUILD=1`, `NODE_VERSION=22`, and runs `bun run build` in `netlify.toml`; mirror the environment switch locally when validating production builds.
- There are no product feature flags in the app today. To test a "flagged" or alternate state, edit local data/components temporarily, verify behavior, then remove the temporary change before committing.
- Do not add persistent mocks or flags unless the task requires them.

## App shell, SEO, and metadata

Area:

- Layout lives in `src/layouts/BaseLayout.astro`.
- SEO tags and structured data live in `src/components/SEO.astro`.
- Site constants live in `src/data/site.ts`.

Testing workflow:

1. Run `BUN_BUILD=1 bun run build`.
2. Run `bun run preview -- --host 0.0.0.0`.
3. Open the preview and inspect page source for title, description, canonical, Open Graph, Twitter card, and JSON-LD output.
4. Check the affected page on desktop and mobile widths for header, footer, contrast, and layout stability.

## Pages and routes

Area:

- Top-level pages live in `src/pages/*.astro`.
- Dynamic routes are `src/pages/drivers/[slug].astro`, `src/pages/hall-of-fame/[slug].astro`, and `src/pages/zitate/[id].astro`.

Testing workflow:

1. Run `BUN_BUILD=1 bun run build` to catch broken imports, route generation errors, and missing dynamic data.
2. Preview locally.
3. Visit each changed route directly, not only through navigation.
4. For dynamic routes, test at least one valid generated page and one invalid slug/id to confirm the 404 path still behaves correctly.

## Content and data

Area:

- People and Hall of Fame data live in `src/data/people.ts`.
- Quotes live in `src/data/phrases.ts`.
- Gallery and defining moments live in `src/data/index.ts`.
- Keep public-facing copy and alt text in German (`de-DE`) unless the task explicitly asks otherwise.

Testing workflow:

1. Run `BUN_BUILD=1 bun run build` after data edits.
2. Preview the page that consumes the edited data.
3. Verify links/slugs are lowercase, hyphenated, and match generated pages.
4. Check that images referenced from data resolve from `public/` or intentional remote URLs.

## Components, styles, and assets

Area:

- Reusable Astro components live in `src/components`.
- Global tokens/utilities live in `src/styles/global.css`.
- Static assets live in `public`; do not import public assets from `src`.

Testing workflow:

1. Start `bun run dev -- --host 0.0.0.0` for fast visual iteration.
2. Manually test affected components on the pages that render them.
3. Check desktop and mobile widths, keyboard focus, readable contrast, image alt text, and link text.
4. Run `BUN_BUILD=1 bun run build` before finishing.

## Deployment-shaped validation

Use this workflow before PRs that affect routing, SEO, assets, or build behavior:

1. `bun install --frozen-lockfile`
2. `BUN_BUILD=1 bun run build`
3. `bun run preview -- --host 0.0.0.0`
4. Visit changed pages and dynamic routes in the preview.
5. Confirm `dist/` contains generated static HTML for changed routes when static output is expected.

## Updating this skill

- Add new runbook notes when you discover a repeatable testing trick, environment variable, login step, route edge case, or build workaround.
- Keep updates short and practical: command, when to use it, what success looks like, and any cleanup required.
- Prefer adding notes under the relevant codebase area instead of creating a new section.
- Remove stale instructions as soon as the repo changes so future Cloud agents do not cargo-cult outdated steps.
