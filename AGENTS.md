# AGENTS.md

Entrypoint for autonomous agents and AI contributors working on this repo.

## What this is

Nick Scherer's personal / professional resume site (nickscherer.com): a single-page Next.js 14 static export, single pnpm package (no monorepo tooling), deployed to S3 + CloudFront via Terraform. Shares its design system and stack with nickordoodle.com (the client-facing creative portfolio) — see [ADR-0001](docs/adr/0001-scaffold-from-nickordoodle.md) and [ADR-0002](docs/adr/0002-flatten-to-single-package.md) for how this repo came to be, and [ARCHITECTURE.md](ARCHITECTURE.md) for the full map.

## Layout

- `app/` — App Router. `components/<section>/` — section components. `lib/data.ts` — all content.
- `infrastructure/terraform/` — AWS IaC (S3, CloudFront, ACM, Route53). See [OPERATIONS.md](OPERATIONS.md).
- `docs/adr/` — decision records. `ROADMAP.md` — the work queue.

## Key commands

All verified against `package.json` scripts. Node 20+, pnpm 9.

```bash
pnpm install     # install
pnpm dev         # next dev
pnpm build       # fetch-medium.mjs + next build → out/
pnpm lint        # next lint
pnpm typecheck   # tsc --noEmit
pnpm test:edge   # node --test for the CloudFront Functions (ADR-0003)
```

There is no frontend test suite yet (see ROADMAP); `pnpm test:edge` covers the CloudFront Functions in `infrastructure/terraform/modules/frontend-cdn/functions/`. CI (`.github/workflows/frontend-ci.yml`) runs lint, typecheck, build and `test:edge` on push/PR to `dev` and `prod`. Agent-facing text (`llms.txt`, `index.md`, …) is generated from `lib/data.ts` by `lib/agent-content.ts`; About/contact prose that lives in components is mirrored there — keep both in sync. Note `pnpm build` requires network access to fetch the Medium RSS feed — on failure it writes an empty `lib/medium-posts.json` rather than failing the build.

## Code conventions (observed)

- **One folder per page section** under `components/` (`hero/`, `about/`, `work/`, `skills/`, `projects/`, `education/`, `publications/`, `writing/`, `contact/`, `nav/`), shared primitives in `components/ui/` (`TiltCard`, `ScrollReveal`, `CursorSpotlight`, `ThemeToggle`).
- Components are PascalCase `.tsx` files with a single default export; nearly everything is `'use client'` (the whole page is client-rendered, then statically exported).
- **All resume content lives in `lib/data.ts`** as typed arrays (`Role`, `Project`, `Education`, `Publication`, …). Components import from there — don't hardcode content in components.
- Styling: Tailwind utilities plus CSS-variable tokens (`hsl(var(--background))`, `var(--accent-cyan)`) defined in `app/globals.css` and mapped in `tailwind.config.js`. Dark mode is class-based, toggled through the theme context in `app/providers.tsx`. Use the `cn()` helper (`lib/utils.ts`, clsx + tailwind-merge) for conditional classes.
- Icons: lucide-react. Animation: framer-motion (`HeroSection`, `ImpactMetrics`, `ScrollReveal`) and ECharts via `echarts-for-react` (`SkillsRadar`, `CareerTimelineChart`, `TechBubbles`).
- Path alias `@/*` resolves to the repo root.

## Process conventions

- **`ROADMAP.md` is the work queue.** Pick items from it; keep it current as work lands.
- **Every roadmap item gets an ADR** created from [docs/adr/TEMPLATE.md](docs/adr/TEMPLATE.md) *before* implementation. Conventions in [docs/adr/README.md](docs/adr/README.md).
- Decisions or actions only the owner can take go into the **"⏸ Awaiting user"** queue at the top of `ROADMAP.md` — append a row and move on; don't block or guess.
- **Promote (owner action):** open a PR from `dev` into `prod` and merge it with a
  merge commit — the merge is the push that starts CD.
  ```bash
  gh pr create -B prod -H dev -t "Promote dev → prod" -b "<what ships>"
  gh pr merge <n> --merge --match-head-commit <reviewed-sha>
  ```
  Never squash or rebase a promote PR (that forks `prod` from `dev`).
  `--match-head-commit` refuses the merge if a routine merged more into `dev` after
  you reviewed. Agents open or merge a promote PR only when the owner asks in that
  session; routines never do.

## NEVER

- **Never change personal, bio, or factual content** (roles, dates, companies, links, claims in `lib/data.ts` or `app/layout.tsx` metadata) without explicit owner confirmation.
- **Never push or merge to `prod` unless the owner asks in this session** — it auto-deploys.
- **Never add paid services** (SaaS subscriptions, paid APIs, new billable AWS resources) without owner approval.
