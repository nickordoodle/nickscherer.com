# ROADMAP

_Architecture overview lives in [ARCHITECTURE.md](ARCHITECTURE.md)._

## ⏸ Awaiting user

> Live queue of decisions and actions only the owner can perform. Routines append rows here and move on; clear rows when resolved.

| Date | Item | What's needed |
|---|---|---|
| 2026-11-18 | **Agent-ready site (item 12, [ADR-0003](docs/adr/0003-agent-ready-site.md)) needs a promote, then a terraform apply** — in that order | 1) ~~Promote dev → prod~~ done 2026-11-19 (PR #7, a2dd355). 2) ~~`terraform apply`~~ done (confirmed 2026-11-21: read-only plan on `prod` reports "No changes"). 3) Re-scan on is-agentic.com, still open. |
| 2026-11-18 | **No privacy page** — is-agentic's trust-anchors check wants `/about`, `/contact`, `/privacy` (≥500 chars each). Agents never draft legal text. | Owner decides: supply privacy-policy text (and, optionally, an email/contact detail for a `/contact` page) or accept the partial trust-anchors score. |
| 2026-07-18 | Hero CTAs link to `/resume.pdf` but `public/` contains no such file — the View/Download Resume buttons 404 on the live site | Owner provides a resume PDF to place at `public/resume.pdf` (or decides to remove the CTAs) |

## 🗳 Proposed additions (awaiting approval)

> Candidates, **not on the grid** until the owner approves. This repo has no routine and no self-approval; the owner promotes, edits or deletes rows.

| Proposed item | Why | Risk / owner input |
|---|---|---|
| Find out why Dependabot update jobs fail every run | Version-update PRs never arrive, so dependency drift goes unnoticed | Low — investigation; a config fix that touches CI is fine, CD changes stay with the owner |
| Back-port nsapplied.com improvements (table in nsapplied.com's ADR-0007) | nsapplied.com, scaffolded from this repo, has since gained tests, a CD verify gate, convention discovery, a `*.txt`/`*.xml` revalidate cache split, an invalidation wait and Terraform `default_tags` | Tests are agent work; the CD workflow and Terraform items are owner-gated |

## Status Grid

**Legend:** ✅ Completed · 🟡 In progress · 🔴 Not started · ⏸️ Deferred

| # | Item | Priority | Status |
|---|------|----------|--------|
| 1 | [Scaffold repo from nickordoodle.com](#scaffold-repo-from-nickordoodlecom) | High | ✅ Done 2026-07-18 ([ADR-0001](docs/adr/0001-scaffold-from-nickordoodle.md)) |
| 2 | [Provision AWS infrastructure & first deploy](#provision-aws-infrastructure--first-deploy) | High | ✅ Done 2026-07-18 (verified 2026-11-18) |
| 3 | [Fill SEO gaps: robots.txt, sitemap, favicon, OG image](#fill-seo-gaps-robotstxt-sitemap-favicon-og-image) | High | 🟡 Folded into item 12 ([ADR-0003](docs/adr/0003-agent-ready-site.md)); code in PR |
| 4 | [Audit echarts bundle size](#audit-echarts-bundle-size) | Medium | 🔴 Not started — port nickordoodle.com's shipped fix (its ADR-0004: `echarts/core` tree-shaking) |
| 5 | [Replace placeholder avatar and media gallery](#replace-placeholder-avatar-and-media-gallery) | Medium | 🔴 Not started (needs owner assets) |
| 6 | [Accessibility and reduced-motion pass](#accessibility-and-reduced-motion-pass) | Medium | 🔴 Not started — port nickordoodle.com's reduced-motion + axe pass (its ADR-0006) |
| 7 | [Introduce a test setup](#introduce-a-test-setup) | Low | 🔴 Not started |
| 8 | [Harden the Medium feed build step](#harden-the-medium-feed-build-step) | Low | 🔴 Not started — same gap and fix as nickordoodle.com item 8; share the approach |
| 9 | [Upgrade Next.js to 15/16 (major)](#upgrade-nextjs-to-1516-major) | Medium | 🟡 Next 15.5.29 shipped to prod 2026-11-21 (#8 → promote #10, 61e49a3, CD green); React 19 / eslint-config-next not done |
| 10 | [Manage drift against nickordoodle.com](#manage-drift-against-nickordoodlecom) | Low | 🔴 Ongoing concern |
| 11 | [Flatten repo to a single package](#flatten-repo-to-a-single-package) | High | ✅ Done 2026-07-18 ([ADR-0002](docs/adr/0002-flatten-to-single-package.md)) |
| 12 | [Make the site agent-ready (llms.txt, Markdown negotiation, real 404s)](#make-the-site-agent-ready-llmstxt-markdown-negotiation-real-404s) | High | ✅ Live: promoted 2026-11-19 (#6 → #7); the edge apply was confirmed done 2026-11-21 (read-only plan "No changes"; llms.txt / Markdown / real 404s pass by curl) ([ADR-0003](docs/adr/0003-agent-ready-site.md)); is-agentic re-scan ⏸ |
| 13 | CI on pull requests into `dev` only (owner rule 2026-11-25) | Low | ✅ Done 2026-11-25 ([ADR-0004](docs/adr/0004-pr-only-ci.md)) — Frontend CI: non-draft PRs into `dev`, path-filtered, no push runs; CD unchanged. In `prod` via promote PR #13 (6957670, 2026-11-26; docs/workflow only, so no CD run) |
| 14 | Shared agent team + FOCUS.md steering file (owner request 2026-11-27) | Medium | ✅ Done 2026-11-27 ([ADR-0005](docs/adr/0005-agent-team-and-focus.md)) — planner/verifier/reviewer subagents + team playbook synced from `~/.claude/team`; FOCUS.md seeded for owner review. Docs/`.claude` only, no deploy impact |

## High priority

### Scaffold repo from nickordoodle.com

Status: ✅ Done 2026-07-18 ([ADR-0001](docs/adr/0001-scaffold-from-nickordoodle.md))

Copied the nickordoodle.com tree and transformed it: package scope → `@nickscherer/frontend`, Services section removed (component, nav link, `data.ts` types), metadata/Terraform retargeted to nickscherer.com, docs rewritten, fresh ADR log. See the ADR for the full delta and intentionally shared bits (Medium feed, GitHub links).

### Provision AWS infrastructure & first deploy

Status: ✅ Done 2026-07-18 (verified read-only 2026-11-18: distribution `E1E2E0OP6RW1BA` serves nickscherer.com + www from `nickscherer-frontend-prod-594391086764`, all four repo secrets exist, CD run 29661076451 green; the ⏸ bootstrap row was cleared)

All four bootstrap prerequisites in [OPERATIONS.md](OPERATIONS.md) are owner actions (state bucket, hosted zone + delegation, `terraform apply`, repo secrets). Once done: push `prod` and verify the CD run and the live site.

### Fill SEO gaps: robots.txt, sitemap, favicon, OG image

Status: 🟡 Folded into item 12 ([ADR-0003](docs/adr/0003-agent-ready-site.md)) — robots, sitemap, favicon, OG image, `metadataBase`/canonical and JSON-LD all ship there, mirroring nickordoodle.com's ADR-0003.

`app/layout.tsx` has solid metadata (title, description, OpenGraph, Twitter card), but `public/` contains only `images/avatar-placeholder.svg` — no `robots.txt`, no sitemap, no favicon, and the `summary_large_image` Twitter card has no actual image. `metadataBase` is unset and there is no JSON-LD Person structured data — especially relevant for a resume site.

Plan: add `robots.txt` and a sitemap (static file or `app/sitemap.ts`), favicon set, a real OG image, `metadataBase`, and JSON-LD in the layout.

### Make the site agent-ready (llms.txt, Markdown negotiation, real 404s)

Status: ✅ Live (promoted 2026-11-19; edge apply confirmed done 2026-11-21) ([ADR-0003](docs/adr/0003-agent-ready-site.md)). Owner-requested 2026-11-18.

is-agentic.com scored the site 55/100: soft 404s (CloudFront serves `/index.html` with 200 for every unknown path, so `robots.txt`, `sitemap.xml` and `llms.txt` all "existed" as HTML), no Markdown negotiation, no JSON-LD, no canonical or `og:image`. Shipped (mirrors nickordoodle.com ADR-0003 + ADR-0005): SEO basics, Person JSON-LD, build-time `llms.txt` / `llms-full.txt` / `index.md` / `404.md` from `lib/data.ts`, CloudFront Functions for `Accept: text/markdown` + `Vary: Accept`, real 404s via `/404.html`, `node --test` coverage in CI, and no-cache sync for `.txt`/`.xml`/`.md`. Remaining gaps: trust-anchor pages (privacy text is owner-only) and brand search (off-site).

## Medium priority

### Audit echarts bundle size

Status: Not started (inherited gap)

The full `echarts` package (plus `echarts-for-react`) is statically imported in three components (`SkillsRadar`, `CareerTimelineChart`, `TechBubbles`) that render below the fold on the single client-rendered page. ECharts is one of the heaviest chart libraries; on a static site this likely dominates the JS payload.

Plan: measure with `@next/bundle-analyzer`; then either lazy-load the chart components with `next/dynamic` and/or switch to `echarts/core` with only the radar/scatter/line modules registered.

### Replace placeholder avatar and media gallery

Status: Not started (needs owner assets; inherited gap)

`ContactSection` renders `public/images/avatar-placeholder.svg` as the avatar, and `MediaSection` ships hardcoded placeholder tiles. A live resume site showing visibly unfinished content undercuts its purpose.

Plan: get real photo/video assets from the owner (append an "Awaiting user" row when picked up), add them to `public/`, and wire `MEDIA_ITEMS` to real files — or hide the media section until assets exist.

### Accessibility and reduced-motion pass

Status: Not started (inherited gap)

The site is animation-heavy (canvas particle field, cursor spotlight, framer-motion reveals, 3D tilt cards) yet nothing checks `prefers-reduced-motion`, and aria/alt coverage is thin. Chart components render with no text alternative.

Plan: honor `prefers-reduced-motion` in `ParticleCanvas`, `CursorSpotlight`, `ScrollReveal`, and Tailwind animations; audit landmarks, headings, focus states, and chart alt text; verify with Lighthouse/axe.

### Upgrade Next.js to 15/16 (major)

Status: 🟡 Partly shipped: Dependabot #8 bumped next to 15.5.29 2026-11-21 (CI green; promoted via #10, 61e49a3, CD green; supersedes closed #4). Still open: React 19, `eslint-config-next` (still 14.2.35), peer-compat check of echarts-for-react/framer-motion, visual verification, then promote.

next is pinned to the 14.x line (14.2.35), two majors behind. 14.x no longer receives security patches for newer advisories; the source repo's ADR-0002 dismissals rest on the static-export architecture. A major upgrade (with React 19) closes them on merit.

Plan: upgrade next + eslint-config-next to 15.x/16.x with React 19; verify echarts-for-react and framer-motion peer compatibility; run the full gate suite plus visual verification (`.claude/skills/verify/`). Coordinate with the same upgrade in nickordoodle.com (item 10 there) — doing both together halves the discovery cost.

## Low priority

### Introduce a test setup

Status: Not started (inherited gap)

There are zero test files and no test script in either package. Pure logic worth covering already exists — `scripts/fetch-medium.mjs` RSS parsing, `cleanLink`/`formatDate` in `WritingSection`, `cn()` — and CI has nothing to run beyond lint/typecheck/build.

Plan: add vitest (or jest) to the frontend package with unit tests for the Medium feed parser and utility functions; wire into CI.

### Harden the Medium feed build step

Status: Not started (inherited gap)

`scripts/fetch-medium.mjs` parses RSS with regexes and, on any fetch failure, silently overwrites `lib/medium-posts.json` with `[]` — so a transient network error at build time ships an empty Writing section. The JSON is also committed, making builds nondeterministic.

Plan: on failure, keep the existing committed JSON instead of clobbering it; log a warning; consider a real XML parser and a freshness timestamp.

### Manage drift against nickordoodle.com

Status: Ongoing concern

The two repos share their design system and most component/content code by design ([ADR-0001](docs/adr/0001-scaffold-from-nickordoodle.md)) but have no shared-package mechanism — fixes land twice or not at all. This repo's package layout also now differs from nickordoodle.com's (single package here vs. Lerna/pnpm monorepo there, per [ADR-0002](docs/adr/0002-flatten-to-single-package.md)), so component code isn't even copy-paste compatible without adjusting import paths. Acceptable at this scale; revisit (shared component package, or scripted diff check) if the divergence starts causing real bugs. When picking up an inherited roadmap item here, check whether the same fix should be mirrored in nickordoodle.com and vice versa.

### Flatten repo to a single package

Status: ✅ Done 2026-07-18 ([ADR-0002](docs/adr/0002-flatten-to-single-package.md))

The initial scaffold ([ADR-0001](docs/adr/0001-scaffold-from-nickordoodle.md)) copied nickordoodle.com's Lerna + pnpm workspace shape (`applications/frontend/`) verbatim, but this repo only ever holds one app — the monorepo layer added indirection with no payoff. Moved all frontend source to the repo root, removed Lerna/pnpm-workspace, merged the two `package.json`s into one, and updated CI/CD paths, `.vscode/launch.json`, and docs accordingly.

## Review History

- **2026-07-18** — Repo flattened from a Lerna/pnpm monorepo to a single package ([ADR-0002](docs/adr/0002-flatten-to-single-package.md)): `applications/frontend/*` moved to repo root, Lerna/workspace config removed, CI/CD and tooling paths updated.
- **2026-07-18** — Repo scaffolded from nickordoodle.com ([ADR-0001](docs/adr/0001-scaffold-from-nickordoodle.md)). Roadmap seeded: infra bootstrap awaiting owner, plus the gaps inherited from the source repo (SEO, echarts bundle, placeholder assets, a11y, tests, Medium hardening, Next major) and a standing drift-management note.
