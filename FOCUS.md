# Focus

> The owner's steering file for this project. Chat sessions and the `planner` read it before choosing work (this repo has no routine). Keep it short and current; edit it whenever priorities change.
> Seeded 2026-11-27 by Claude from ROADMAP, WORKLOG and AGENTS.md (no routine prompt exists); the owner should review and edit.
> Last reviewed: 2026-11-27

## North star

nickscherer.com is Nick Scherer's resume site: someone evaluating him reads his work history and gets his resume with one click, on a fast, accessible page. Static export, no backend.

## Now (prioritize, ranked)

1. **A resume that downloads, plus a privacy page.** The hero's View/Download Resume buttons point to `/resume.pdf`, which doesn't exist, so they 404 on the live site. is-agentic also wants `/privacy`.
   - Needs the owner's words or assets: the resume PDF (or the decision to remove the buttons), and privacy-policy text (or "skip").
   - Agents alone, once supplied: add the file at `public/resume.pdf`, build the privacy page from `lib/data.ts`, link it in the footer, sitemap and `llms.txt`.
2. **Port nickordoodle.com's shipped fixes (#4, #6).** Echarts tree-shaking (nickordoodle ADR-0004) and the reduced-motion + axe pass (nickordoodle ADR-0006). Moved forward: each lands here with gates green and the verify skill run. Agents alone.
3. **A Writing section that never ships empty, with tests (#8, #7).** Same gap and same fix as nickordoodle.com; share the approach. Agents alone.

## Next (when Now is done or blocked)

- React 19 and `eslint-config-next` 15 (#9), coordinated with nickordoodle.com #10.
- Find out why Dependabot update jobs fail every run.
- The nsapplied back-port list (its ADR-0007): tests are agent work; CD and Terraform items are owner-gated.
- Real avatar and media (#5), when the owner supplies assets.

## Not now (don't propose or build)

- Any server runtime (SSR, ISR, middleware); the site stays a static export.
- A shared component package with nickordoodle.com; the ROADMAP defers it until drift causes real bugs.

## Balance

No routine runs here, so this steers chat sessions. Prefer user-facing fixes that advance Now; upkeep only when nothing qualifies. No log-only PRs.

## Quality bar

The AGENTS.md gates (typecheck, lint, build, `test:edge`; tests once #7 lands) plus the verify skill for anything visual. Content stays in `lib/data.ts`, and About/contact prose stays mirrored in `lib/agent-content.ts`.

## Owner-gated extras

- AGENTS.md here has no never-self-approve list. Use nickordoodle.com's: public-facing copy, privacy and legal text, CD workflows and Terraform, personal facts, and owner assets stay with the owner.
- Never ship a placeholder resume, photo or bio line.
