# Decisions

## 2026-05-01: Use Bun As The Project Contract

Context: The repository had `bun.lock` and Bun-based docs, but `package.json` declared pnpm. The audit identified this as a fresh-clone contract problem.

Decision: Bun is the package manager for installs, scripts, builds, and documentation.

Rationale: This matches the existing lockfile and Netlify build command with the fewest moving parts.

Consequences: New scripts and docs use `bun run ...`; package metadata declares Bun.

## 2026-05-01: German Routes Are Canonical

Context: Navigation linked to German paths while dynamic driver profiles only existed under `/drivers/:slug`.

Decision: `/fahrer/:slug` is the canonical profile route. English driver profile URLs redirect to the German path.

Rationale: This matches the public navigation and German site language.

Consequences: Route tests and repo checks enforce the German dynamic route.

## 2026-05-01: Quarantine Unsourced Archive Content

Context: The audit found placeholder images, generated quotes, and timeline claims that looked factual without clear provenance.

Decision: Remove placeholder URLs and keep optional archive modules empty until sourced content exists.

Rationale: For an archive site, empty is safer than invented.

Consequences: Future content additions must carry enough provenance to be reviewed.
