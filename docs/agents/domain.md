# Domain Docs

How agent skills should consume this repo's domain documentation when exploring the codebase.

## Layout

This is a single-context repo.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root, if it exists.
- **`docs/adr/`**, if it exists. Read ADRs that touch the area you're about to work in.
- **`docs/ARCHITECTURE.md`** for the current Astro architecture, data flow, routes, and metadata conventions.
- **`docs/DECISIONS.md`** for recorded project decisions.
- **`docs/CONTENT.md`** before adding or changing historical content.
- **`docs/TESTING.md`** before changing tests or test expectations.

If `CONTEXT.md` or `docs/adr/` do not exist, proceed silently. Do not flag their absence or suggest creating them upfront. Producer skills can create them lazily when terms or decisions actually get resolved.

## Use the project's vocabulary

When your output names a domain concept in an issue title, refactor proposal, hypothesis, or test name, use the term as defined by the repo docs. Do not drift to synonyms the docs explicitly avoid.

If the concept you need is not documented yet, either reconsider whether the project uses that language or note the gap for a documentation-focused pass.

## Flag decision conflicts

If your output contradicts an existing decision in `docs/DECISIONS.md` or an ADR, surface it explicitly rather than silently overriding it.
