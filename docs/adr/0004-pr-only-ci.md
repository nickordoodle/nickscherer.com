# ADR-0004: CI on pull requests into dev only

- **Status:** ✅ Done
- **Priority:** Low
- **Scope:** S
- **Created:** 2026-11-25
- **Roadmap:** [ROADMAP.md](../../ROADMAP.md) — item #13

## Context

Owner rule of 2026-11-25 for every portfolio repo: CI runs on pull requests into
the integration branch only. This repo is public, so its Actions minutes are free;
the change is for consistency with the sibling sites (nickordoodle.com,
nsapplied.com). `frontend-ci.yml` ran on every push to `dev`/`prod` and every PR
into either.

## Decision

1. `frontend-ci.yml` runs on **non-draft pull requests into `dev`** only, plus
   manual `workflow_dispatch`. No push trigger; promote PRs into `prod` run nothing.
2. **Path filter:** the site sources (`app/`, `components/`, `lib/`, `public/`,
   `scripts/`), the CloudFront Functions (`test:edge`), root config/manifests and
   the workflow itself. Docs-only PRs run nothing.
3. Concurrency is per PR number.
4. `frontend-cd-prod.yml` is unchanged (it already only builds and deploys).

**Non-goals.** No CD change.

## Content / Data Changes

None.

## Consequences & Risks

Two PRs that pass separately are not re-checked together after both merge; the
CD build still stops a deploy if the merged tree does not build.

## Verification

YAML parsed, actionlint clean, this PR's own Frontend CI run green.

## Implementation Log

- 2026-11-25 — Shipped as planned (PR to `dev`, owner CI rule).
