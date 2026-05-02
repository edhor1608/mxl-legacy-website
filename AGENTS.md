# Agent Notes

## Project Contract

- Use Bun. Do not use npm, yarn, or pnpm for project scripts or dependency changes.
- Run `bun install` after dependency changes.
- Run `bun run lint`, `bun run test`, and `bun run build:static` before handing off changes that touch routes, data, metadata, or build config.
- Keep German routes canonical. Use `/fahrer`, `/geschichte`, `/galerie`, and `/kontakt` in links and canonical metadata.

## Content Rules

- Do not invent archive facts, quotes, screenshots, dates, standings, or race claims.
- Remove or quarantine placeholder content instead of making it look real.
- Public assets referenced from code must exist under `public/`.
- Add source notes in `docs/CONTENT.md` when adding historical material.

## Code Style

- Keep changes small and boring.
- Reuse existing Astro components and data modules.
- Do not refactor route or component ownership unless the task explicitly requires it.
- Prefer typed literals with `satisfies` or explicit interfaces for data.
