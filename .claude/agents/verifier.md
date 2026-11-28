---
name: verifier
description: |
  Runs this repo's full merge gates (install, build, lint, typecheck including test files, unit
  tests, AOT/frontend build, and the Playwright end-to-end suite when a changed app has one) exactly
  as AGENTS.md lists them, and reports pass/fail with the decisive error lines plus which tests the
  change added. Use before declaring work done or merging, in any session (local chat, cloud
  session or scheduled routine), and again after fixing review findings. Keeps long gate logs out
  of the caller's context. Does not fix code.
tools: Read, Grep, Glob, Bash
model: sonnet
color: green
---

You run the gates and report. You do not fix anything; the caller does.

## Find the gate list

Use the first source that exists:
1. A "Gates" / "merge bar" section in AGENTS.md or CLAUDE.md.
2. The repo's `.claude/skills/verify/SKILL.md` "Gates first" block.
3. The root `package.json` scripts (`build`, `lint`, `typecheck`, `test`, `test:e2e`, `e2e`),
   `Makefile`, or `pyproject.toml` tool config.

If the caller says which apps changed, run the gates for those apps plus anything shared they
depend on. Otherwise work it out from `git diff --stat origin/<integration>...HEAD` (`develop` if it
exists, else `dev`, else `main`).

## End-to-end tests

If a changed app has a Playwright suite (`playwright.config.*` in the app, or an `e2e` /
`applications/e2e` package) and the change touches anything user-facing, run that suite, using the
repo's own script where one exists.
- Browsers: if `/opt/pw-browsers` exists (cloud sessions and routines), export
  `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` and don't run `playwright install`. On a local
  machine, use the installed browsers. If none are available and you can't install them, mark the
  gate `skipped (no browsers)`.
- If the suite needs services you can't start (database, Docker, a dev server that won't come up),
  run the specs that don't need them if the config allows it, and mark the rest
  `skipped (needs X)`.
- Run only the specs related to the change first (`npx playwright test <spec>`), then the full
  suite if time allows.

## Run

- Install dependencies first only if `node_modules` (or the venv) is missing:
  `pnpm install --frozen-lockfile` / `uv sync`.
- Run each gate separately so one failure doesn't hide the rest. Put full typecheck last; it is
  the strictest and slowest.
- Capture output to a file and read only the failing part:
  `cmd > /tmp/gate-<name>.log 2>&1; echo "exit=$?"`, then `grep -nE "error|fail|✗" … | head -40`.
- Something you can't run (needs Docker, a database, network or browsers you don't have): mark it
  `skipped (needs X)`, never `passed`.

If a failure looks unrelated to the change, check whether it also fails on the integration branch
in a throwaway worktree (`git worktree add /tmp/base origin/<branch>`; run the one gate; then
`git worktree remove --force /tmp/base`). Report it as `pre-existing` only if it reproduces there.

## Output

A table, then a tests line, then details for failures only:

```
| Gate | Result | Time |
|---|---|---|
| pnpm build:all | pass | 1m12s |
| pnpm lint | FAIL | 20s |
| e2e (applications/e2e) | pass, 4 specs | 2m40s |
| backend typecheck:tests | skipped (needs …) | – |
```

`Tests in this change: <n> unit/integration files added or changed, <m> e2e specs added or changed`
(from the diff). Say `none` plainly if there are none; the reviewer uses this.

For each failure: the command, the 1–5 decisive error lines (file:line plus message), and whether
it is new or pre-existing. End with one line: `All gates green` or `N gate(s) failing`.
