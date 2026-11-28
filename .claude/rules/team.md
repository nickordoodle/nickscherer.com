# Agent team playbook

<!-- Synced from ~/.claude/team by the ns-team skill. Edit the canonical copy there (or in the
     Agent Team Editor) and re-sync; local edits here are overwritten. Repo-specific steering
     belongs in FOCUS.md. -->

This applies to **every session in this repo**: a local Claude Code chat (CLI, desktop app or
IDE), a cloud session on claude.ai/code, and a scheduled routine run. Whichever session is doing
the work is the *builder*.

**FOCUS.md is the owner's steering file.** When choosing, proposing or sizing work, prefer its
"Now" themes, then "Next". Never start "Not now" items. Follow its "Balance" and "Quality bar".
An explicit request from the owner in a chat outranks FOCUS.md for that task.

## Roles

| Role | Who | When |
|---|---|---|
| Builder | The session doing the work | Builds the owner's request or one roadmap item, with its tests, and ships a PR to the integration branch |
| Planner | `planner` subagent | Weekly planning pass; whenever the owner asks what's next |
| Verifier | `verifier` subagent | Runs the merge gates (e2e included) before "done" and after fixes |
| Reviewer | `reviewer` subagent, the only reviewer | One pass over the diff, covering every focus area, before any non-doc change merges |
| Release manager | The owner only | Promotes integration → prod; no session ever does |

## Builder loop

Unattended sessions (routines, autonomous cloud runs) follow every step. In a chat, follow it for
any change you'll commit or merge; the owner can tell you to skip steps.

1. **Planning pass (unattended sessions):** if the "Last planned:" line in ROADMAP.md's
   "🗳 Proposed additions" is missing or more than 7 days old, run `planner` first and tell it to
   update the ROADMAP. That edit is a real doc change: it ships in this session's PR, or alone if
   nothing else qualifies (the only allowed ROADMAP-only PR, at most once a week). In a chat, run
   the planner only when the owner asks what's next.
2. **Choose:** the owner's request, or the routine/AGENTS.md precedence. Between candidates,
   FOCUS.md decides.
3. **Build with tests.** Tests are part of the change, not a follow-up:
   - Every behavior change gets a unit or integration test that fails without it. Every bug fix
     gets a regression test.
   - Every user-facing change (page, flow, form, navigation, visible behavior) in an app with a
     Playwright suite gets a new or updated e2e spec covering the happy path and the main failure
     path.
   - If the app has UI but no Playwright suite, say so in the PR. The planner keeps a harness
     proposal on the roadmap until one ships.
4. **Verify:** run `verifier` with the list of changed apps. It runs unit tests and, when
   relevant, the e2e suite. Fix failures and re-run.
5. **Review:** run `reviewer` once, giving it the ADR path (if any) and a one-line intent. Name
   any focus area to weight more heavily (for example, "security: this touches auth"). Fix every
   blocker, including missing tests, and every should-fix you agree with. Re-run `verifier` if
   code changed. Do at most one re-review.
6. **PR body** gets the verifier's gate table and tests line, and
   `Review: <verdict> — N fixed, M declined (<one-line reason each>)`.

Doc-only changes (WORKLOG, ROADMAP, ADR prose, other .md) skip steps 3–5.

## Asking for things in a chat

- "What's next / priorities / ideas": use `planner`. Return text unless asked to edit.
- "Review this" (a branch, PR or diff): use `reviewer`, plus `verifier` if the branch builds.
- Big multi-part jobs: if agent teams are enabled in this session, propose the feature or research
  recipe below. Otherwise fan out subagents in parallel.
- Changing FOCUS.md is the owner's call. Edit it only when asked; otherwise suggest edits.

## Agent team recipes (when the owner asks for a team)

Review is never a team: one `reviewer` covers all focus areas.

- **Feature team:** backend + frontend teammates, plus `reviewer` at the end. Each teammate owns
  its own files and writes its own tests (frontend writes the e2e spec). The lead owns shared
  files: schemas, API contract, ROADMAP, WORKLOG, ADR.
- **Research team:** 2–3 investigators testing competing hypotheses for a bug or design question.

Team rules: 3–5 teammates; one owner per file (teammates share one checkout); only the lead
commits, pushes or opens PRs; teammates never touch prod, terraform, or remote systems.
