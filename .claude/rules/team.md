# Agent team playbook

<!-- Synced from ~/.claude/team by the ns-team skill. Edit the canonical copy there and re-sync;
     local edits here are overwritten. Repo-specific steering belongs in FOCUS.md. -->

Every session in this repo, whether a scheduled routine run or a chat, works as part of a small
team. **FOCUS.md is the owner's steering file.** When choosing, proposing or sizing work, prefer
its "Now" themes, then "Next". Never start "Not now" items. Follow its "Balance" and "Quality bar".

## Roles

| Role | Who | When |
|---|---|---|
| Builder | The session doing the work | Picks one item, builds it, ships a PR to the integration branch |
| Planner | `planner` subagent | Weekly planning pass; whenever the owner asks what's next |
| Verifier | `verifier` subagent | Runs the merge gates before "done" and after fixes |
| Reviewer | `reviewer` subagent | Reviews the diff before any non-doc change merges |
| Release manager | The owner only | Promotes integration → prod; nobody else ever does |

## Builder loop (adds to the routine prompt or the chat's task)

1. **Planning pass:** if the "Last planned:" line in ROADMAP.md's "🗳 Proposed additions" is
   missing or more than 7 days old, run `planner` first and tell it to update the ROADMAP.
   That edit is a real doc change. It ships in this run's PR, or alone if nothing else qualifies
   (the only allowed ROADMAP-only PR, at most once a week).
2. **Choose** by the routine/AGENTS.md precedence. Between candidates, FOCUS.md decides.
3. **Build** one shippable increment.
4. **Verify:** run `verifier` with the list of changed apps. Fix failures and re-run.
5. **Review:** run `reviewer`, giving it the ADR path and a one-line intent. Fix every blocker,
   and every should-fix you agree with. Re-run `verifier` if code changed. Do at most one
   re-review.
6. **PR body** gets a line `Review: <verdict> — N fixed, M declined (<one-line reason each>)` and the
   verifier's gate table.

Doc-only changes (WORKLOG, ROADMAP, ADR prose, other .md) skip steps 4 and 5.

## In chats with the owner

- "What's next / priorities / ideas": use `planner`. Return text unless asked to edit.
- Before merging code the owner asked for, run `verifier` and `reviewer` unless told to skip.
- Big multi-part jobs: if agent teams are enabled, propose one of the recipes below. Otherwise
  fan out subagents in parallel.
- Changing FOCUS.md is the owner's call. Edit it only when asked; otherwise suggest edits.

## Agent team recipes (when the owner asks for a team)

- **Review team:** 3 teammates on the reviewer definition, split by correctness, security, and
  tests. They challenge each other's findings and the lead merges them into one list.
- **Feature team:** backend + frontend + `reviewer`. Each teammate owns its own files. The lead owns
  shared files (schemas, API contract, ROADMAP, WORKLOG, ADR).
- **Research team:** 2–3 investigators testing competing hypotheses for a bug or design question.

Team rules: 3–5 teammates; one owner per file (teammates share one checkout); only the lead
commits, pushes or opens PRs; teammates never touch prod, terraform, or remote systems.
