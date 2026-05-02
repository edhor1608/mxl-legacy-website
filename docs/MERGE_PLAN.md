# Merge Plan For Audit Stack

## Current Stack

The audit work is split into two Graphite PRs and should merge in stack order.

1. PR #19, `audit-project-contract`: https://app.graphite.com/github/pr/edhor1608/mxl-legacy-website/19
2. PR #20, `audit-content-integrity`: https://app.graphite.com/github/pr/edhor1608/mxl-legacy-website/20

PR #19 is the base PR. PR #20 depends on it and should only merge after PR #19 is merged and the stack has been synced/restacked.

## Merge Confidence

I am highly confident handling PR #19 autonomously because it is mostly project contract work: package manager alignment, scripts, docs, CI, validation, tests, German route contract, and static build checks.

I am comfortable handling PR #20 as well, but it needs a normal editorial/code review because it removes or quarantines unsourced archive content. The technical direction matches the audit, but the final decision about preserving, rewriting, or sourcing specific content is more product/editorial than mechanical.

## Required Review Path

Each PR should get a normal human-style code review before merge, even if CodeRabbit is unavailable or rate-limited. The review should check the actual diff, not just passing tests.

For PR #19, review these points:

- The project now consistently uses Bun and does not reintroduce pnpm/npm/yarn workflow drift.
- `package.json` scripts map to real, noninteractive commands.
- CI runs the same core gates expected locally.
- `scripts/check-repo.mjs` and `scripts/check-dist.mjs` cover the audit risks they claim to cover.
- German route policy is documented and enforced.
- New docs are accurate and do not promise missing workflows.

For PR #20, review these points:

- Unsourced generated quotes, placeholder URLs, and fake archive data are removed or quarantined.
- The remaining timeline/profile claims are acceptable for the current archive context.
- The homepage still has enough useful content after removing the placeholder-heavy sections.
- Empty archive modules are intentional and documented, not accidental data loss.
- The visual/site experience still builds and navigates correctly.

## CodeRabbit Plan

If CodeRabbit web reviews are missing because of rate limits, try the CodeRabbit CLI for whichever PR lacks review coverage.

Before using the CLI, verify availability and auth:

```bash
coderabbit --version
coderabbit auth status --agent
```

If auth is missing, run:

```bash
coderabbit auth login --agent
```

For a branch-level review, run from the target branch:

```bash
coderabbit review --agent -t committed -c AGENTS.md
```

If reviewing a PR diff against trunk is clearer, run:

```bash
coderabbit review --agent --base main -c AGENTS.md
```

Do not treat CodeRabbit as the only review signal. If CodeRabbit is unavailable, do a manual code review against the checklist above and record any findings before merging.

## Local Verification Before Merge

Run these from the stack tip before starting merges:

```bash
gt sync --no-interactive --restack
bun run lint
bun run test
bun run format:check
bun run build:static
bun run test:e2e
```

Expected current behavior:

- `bun run lint` passes.
- `bun run test` passes Vitest data and route tests.
- `bun run format:check` passes.
- `bun run build:static` runs `astro check`, static build, and `check:dist`.
- `bun run test:e2e` runs Playwright desktop and mobile smoke tests.
- `astro check` may print JSON-LD inline-script hints, but it should report zero errors and zero warnings.

## Step-By-Step Merge

1. Inspect the stack with `gt log` and confirm the order is `main <- audit-project-contract <- audit-content-integrity`.
2. Open PR #19 and review the diff manually against the PR #19 checklist.
3. Check PR #19 CI status. If CI is not green, inspect and fix before merging.
4. If CodeRabbit review is missing on PR #19, try the CLI review. If the CLI is unavailable or rate-limited, complete a manual review and note that CodeRabbit was unavailable.
5. Address any PR #19 comments or review findings on `audit-project-contract` using `gt checkout audit-project-contract`, edits, `gt modify`, and `gt submit --stack`.
6. Re-run the local gates from the stack tip after any changes.
7. Merge PR #19 through Graphite.
8. Run `gt sync --no-interactive --restack` so PR #20 is rebased onto the updated `main`.
9. Open PR #20 and review the diff manually against the PR #20 checklist.
10. Check PR #20 CI status. If CI is not green, inspect and fix before merging.
11. If CodeRabbit review is missing on PR #20, try the CLI review. If the CLI is unavailable or rate-limited, complete a manual review and note that CodeRabbit was unavailable.
12. Address any PR #20 comments or review findings on `audit-content-integrity` using `gt checkout audit-content-integrity`, edits, `gt modify`, and `gt submit`.
13. Re-run the local gates from PR #20 after any changes.
14. Merge PR #20 through Graphite.
15. Run a final `gt sync --no-interactive --restack` and confirm local `main` includes both PRs.
16. On `main`, run at least `bun run lint`, `bun run test`, and `bun run build:static` as the final smoke check.

## Stop Conditions

Do not merge if any of these are true:

- CI is red or missing for the PR being merged.
- Local `bun run build:static` fails.
- The built-site crawler reports missing internal links or assets.
- A normal code review finds unresolved correctness issues.
- PR #20 removes content that should instead be sourced or rewritten.
- Graphite reports the stack is out of date or not restacked cleanly.

## Owner Notes

The safest owner split is:

- Let me handle Graphite mechanics, local verification, CI failures, review comment fixes, and merge sequencing.
- Have Jonas review PR #20 if he wants editorial control over what archive content should stay, be rewritten, or be sourced before merge.
