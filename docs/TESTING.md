# Testing

## Commands

- `bun run typecheck` runs `astro check`.
- `bun run lint` runs repo-specific checks for package manager drift, route drift, missing metadata images, and missing public assets.
- `bun run check:dist` verifies built HTML does not reference missing internal links or assets.
- `bun run test` runs Vitest data and route contract tests.
- `bun run test:e2e` runs a static build, then Playwright starts `astro preview`.

## Coverage Intent

Vitest covers static contracts that should fail before a broken archive page ships: unique route slugs, route-safe IDs, existing profile images, the default social image, and German driver URL generation.

Playwright covers the highest-risk user path from the audit: navigation to `/fahrer` and opening a generated `/fahrer/:slug` profile.

CI runs formatting, lint, Vitest, and the static build. The static build also runs the built-site crawler.
