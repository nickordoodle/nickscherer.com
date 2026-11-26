# WORKLOG

Reverse-chronological journal of work on this repo (newest first). Entries are append-only: never rewrite an existing entry, add a new one. Timestamps are real UTC from `date -u`. See the "Record all work" rule in [AGENTS.md](AGENTS.md).

Entry template:

```
## YYYY-MM-DD HH:MM UTC — <title>
Branch / PR: ...
ADR: ...
Changed: (1-3 bullets)
Gates: what was verified, and what wasn't
Next: ...
Blocked / owner: ...
```

## 2026-11-26 03:24 UTC — CI on pull requests into dev only (owner CI rule)
Branch / PR: `ci/pr-only-ci` → PR to `dev` (squash-merged if green; see git log)
ADR: [ADR-0004](docs/adr/0004-pr-only-ci.md)
Changed:
- Frontend CI runs only on non-draft PRs into `dev`, path-filtered; no push runs, promote PRs run nothing. Public repo, so this is for consistency with the sibling sites, not cost.
- CD unchanged. AGENTS.md gains the no-op-run rule; OPERATIONS no longer suggests requiring the CI check on `prod`.
Gates: workflow YAML parsed, actionlint clean; no site code changed, so the PR's own Frontend CI run is the self-test.
Next: nothing for CI.
Blocked / owner: none.

## 2026-11-21 22:50 UTC — ADR-0003 agent-ready apply confirmed live
Branch / PR: `docs/adr-0003-apply-verified` → `dev` (docs only)
ADR: [ADR-0003](docs/adr/0003-agent-ready-site.md)
Changed:
- Answered the open question from the previous entry: a read-only `AWS_PROFILE=aviai terraform plan -var-file=envs/prod.tfvars` from `infrastructure/terraform/` on a checkout of `prod` (61e49a3) reports **No changes**, so the ADR-0003 edge apply had already been run before today.
- OPERATIONS.md: the ADR-0003 "Pending prod actions" row is marked ✅ Done with that evidence.
Gates: plan run by the owner's portfolio session (no apply needed, none run). Curl checks from the previous entry still hold. Not verified: who ran the apply or when (no record found).
Next: nothing; the docs ride the next promote.
Blocked / owner: none.

## 2026-11-21 22:46 UTC — Record-all-work rule; log of 2026-11-21 dependency merges
Branch / PR: `docs/record-all-work` → `dev` (docs only)
ADR: none (process/docs change)
Changed:
- Added the "Record all work (owner rule)" to AGENTS.md (pointer in CLAUDE.md); created this WORKLOG.md.
- ROADMAP: item 9 (Next upgrade) and item 12 / Awaiting-user row updated to current state (below).
- Back-filled today's work and the 2026-11-19 promote from GitHub (this entry; times from GitHub).
Gates: docs-only, no code touched; lint/typecheck/build run by CI on the PR. Not verified: whether the ADR-0003 `terraform apply` has been run (no AWS access used this session); live behavior below was checked with curl only.
Next: owner confirms whether the ADR-0003 `terraform apply` was already run (see post-deploy check below); `dev` and `prod` were level at 61e49a3 when written, so this docs PR rides the next promote.
Blocked / owner: ADR-0003 terraform apply row (still listed in OPERATIONS.md, left for the owner to confirm); resume PDF and privacy text rows unchanged.

Back-filled from GitHub (nothing below was run by this session):
- **#3** Dependabot postcss 8.5.19 → 8.5.23: created 2026-08-12, squash-merged into `dev` 2026-11-21 05:39 UTC (b957f55), checks green (Lint/Typecheck/Build, GitGuardian). Promoted by #10 (below).
- **#4** Dependabot next 14.2.35 → 15.5.24: closed 2026-11-21 05:41 UTC with "Superseded by #8".
- **#8** Dependabot next 14.2.35 → 15.5.29 (a major): opened 2026-11-21 05:41 UTC, "Lint, Typecheck, Build" green, squash-merged into `dev` by the owner 2026-11-21 22:45 UTC (d8bb48d); dev CI on d8bb48d passed. `package.json` pins next 15.5.29; react stays ^18.3.1 and eslint-config-next 14.2.35.
- **#10 promote, `dev` → `prod`:** opened 22:46:46 UTC, merged 22:46:49 UTC 2026-11-21 (merge commit 61e49a3, prod head); PR checks green. Shipped #3 and #8. On `prod` push: Frontend CI success (22:46:52 → 22:47:36 UTC) and "Frontend CD — Production" success (run 44958493576, 22:46:52 → 22:47:32 UTC). Migrations: none (static site).
- **Post-deploy check (curl, 2026-11-21 22:48 UTC, this session):** `/` 200 text/html; `/llms.txt` 200 text/plain (starts "# Nick Scherer"); `/index.md` 200 text/markdown; `/` with `Accept: text/markdown` 200 text/markdown; `/nope-xyz` 404 text/html. Site healthy; CloudFront-level markdown negotiation and real 404s are live, which suggests the ADR-0003 terraform apply was done, but that is inferred, not confirmed from state or the ledger.
- **Portfolio tracking:** repo added to the owner's portfolio status sweep (ns-project-status).
- **Agent-readiness:** site checked 2026-11-20 serving `llms.txt`, Markdown negotiation and real 404s (ADR-0003 behaviors observed live; scan method not recorded by the reporting session).
- **Earlier promote, not previously logged:** #6 (ADR-0003) merged to `dev` 2026-11-19 04:55 UTC; promote PR #7 merged `dev` → `prod` 2026-11-19 04:59 UTC (merge commit a2dd355), checks green. CD run results for that promote were not re-checked here.
