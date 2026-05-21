# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues in `edhor1608/mxl-legacy-website`. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create -R edhor1608/mxl-legacy-website --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> -R edhor1608/mxl-legacy-website --json number,title,body,labels,comments` to get structured data, or `gh issue view <number> -R edhor1608/mxl-legacy-website --comments` for readable output. The `labels` array contains label objects; use `jq` to extract label names.
- **List issues**: Use `gh issue list` with appropriate `--label` and `--state` filters, then pipe through `jq` to shape the output:

  ```sh
  gh issue list -R edhor1608/mxl-legacy-website --state open --json number,title,body,labels,comments \
    --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'
  ```

- **Comment on an issue**: `gh issue comment <number> -R edhor1608/mxl-legacy-website --body "..."`
- **Apply or remove labels**: `gh issue edit <number> -R edhor1608/mxl-legacy-website --add-label "..."` / `gh issue edit <number> -R edhor1608/mxl-legacy-website --remove-label "..."`
- **Close**: `gh issue close <number> -R edhor1608/mxl-legacy-website --comment "..."`

Pass `-R edhor1608/mxl-legacy-website` in examples so forks or multiple remotes do not change the target repo. Alternatively, run `gh repo set-default edhor1608/mxl-legacy-website` once in the clone.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> -R edhor1608/mxl-legacy-website --json number,title,body,labels,comments`.
