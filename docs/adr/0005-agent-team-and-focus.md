# ADR-0005: Adopt the shared agent team and a FOCUS.md steering file

- **Status:** ✅ Done
- **Priority:** Medium
- **Scope:** S
- **Created:** 2026-11-27
- **Roadmap:** [ROADMAP.md](../../ROADMAP.md) — item #14

## Context

Owner request of 2026-11-27: one shared Claude agent team across every portfolio repo, in local chats and in the
cloud routines, plus a per-project file saying what to focus on. The owner had noticed routines shipping mostly
maintenance. This repo has no cloud routine today, but chat sessions in it (and any routine added later) load the team only if it is committed here.

## Decision

1. Commit the synced team files: `.claude/agents/{planner,verifier,reviewer}.md` and the playbook
   `.claude/rules/team.md`. The canonical copy lives in `~/.claude/team/` and is installed with
   `sync.py install`. Never edit these in the repo; change the canonical copy and re-sync.
2. Add `FOCUS.md`, the owner's steering file (North star, ranked Now, Next, Not now, Balance, Quality bar,
   owner-gated extras), and import it from CLAUDE.md right after `@AGENTS.md`. It was seeded from ROADMAP,
   WORKLOG and AGENTS.md (there is no routine prompt); the owner reviews and edits it.
3. `.gitignore` un-ignores `.claude/agents` and `.claude/rules` (it ignored everything under `.claude/` except
   settings and skills), so the files are actually committed.
4. Builder loop per the playbook: the `verifier` runs the gates and the `reviewer` reviews the diff before any
   non-doc change merges; the `planner` refreshes ROADMAP "🗳 Proposed additions" at most weekly.

**Non-goals.** No change to the gates, CI/CD, infrastructure, site content, or the routine's own prompt.

## Consequences & Risks

- Chat sessions that change code spend a little more usage on a `verifier` pass and a `reviewer` pass before merging. Doc-only changes skip both.
- If a routine is added later, its first run does a planning pass (no "Last planned:" line exists yet).
- FOCUS.md is only as good as its last review; a stale one steers work wrong. The "Last reviewed:" date makes
  that visible.
- The synced files can drift from canonical; `sync.py check` reports drift against `origin/dev`.

## Verification

- Synced files are byte-identical to `~/.claude/team/` (checked before commit; the lead re-runs `sync.py check`
  after merge).
- Docs and `.claude/` only, so no build or test gate applies.

## Implementation Log

- 2026-11-27 — Team files synced, FOCUS.md seeded, CLAUDE.md import and `.gitignore` exceptions added.
