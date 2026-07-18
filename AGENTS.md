# AGENTS.md

Entrypoint for autonomous agents and AI contributors working on this repo.

## What this is

Nick Scherer's personal / professional resume site (nickscherer.com): a single-page Next.js 14 static export in a Lerna + pnpm monorepo, deployed to S3 + CloudFront via Terraform. Architecturally identical to nickordoodle.com (the client-facing creative portfolio) — see [ADR-0001](docs/adr/0001-scaffold-from-nickordoodle.md) for the scaffold decision and [ARCHITECTURE.md](ARCHITECTURE.md) for the full map.

## Layout

- `applications/frontend/` — the only application (`@nickscherer/frontend`). App Router lives in `app/`, section components in `components/<section>/`, content data in `lib/data.ts`.
- `infrastructure/terraform/` — AWS IaC (S3, CloudFront, ACM, Route53). See [OPERATIONS.md](OPERATIONS.md).
- `docs/adr/` — decision records. `ROADMAP.md` — the work queue.

## Key commands

All verified against `package.json` scripts. Node 20+, pnpm 9.

```bash
pnpm install              # workspace install (root)
pnpm dev:frontend         # next dev via lerna
pnpm build:frontend       # fetch-medium.mjs + next build → applications/frontend/out/
pnpm lint                 # lerna run lint → next lint
pnpm typecheck            # lerna run typecheck → tsc --noEmit
```

Inside `applications/frontend/`: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`. There is no test script yet (see ROADMAP). CI (`.github/workflows/frontend-ci.yml`) runs lint, typecheck, and build on push/PR to `dev` and `prod`. Note `pnpm build` requires network access to fetch the Medium RSS feed — on failure it writes an empty `lib/medium-posts.json` rather than failing the build.

## Code conventions (observed)

- **One folder per page section** under `components/` (`hero/`, `about/`, `work/`, `skills/`, `projects/`, `education/`, `publications/`, `writing/`, `media/`, `contact/`, `nav/`), shared primitives in `components/ui/` (`TiltCard`, `ScrollReveal`, `CursorSpotlight`, `ThemeToggle`).
- Components are PascalCase `.tsx` files with a single default export; nearly everything is `'use client'` (the whole page is client-rendered, then statically exported).
- **All resume content lives in `lib/data.ts`** as typed arrays (`Role`, `Project`, `Education`, `Publication`, …). Components import from there — don't hardcode content in components.
- Styling: Tailwind utilities plus CSS-variable tokens (`hsl(var(--background))`, `var(--accent-cyan)`) defined in `app/globals.css` and mapped in `tailwind.config.js`. Dark mode is class-based, toggled through the theme context in `app/providers.tsx`. Use the `cn()` helper (`lib/utils.ts`, clsx + tailwind-merge) for conditional classes.
- Icons: lucide-react. Animation: framer-motion (`HeroSection`, `ImpactMetrics`, `ScrollReveal`) and ECharts via `echarts-for-react` (`SkillsRadar`, `CareerTimelineChart`, `TechBubbles`).
- Path alias `@/*` resolves to the frontend package root.

## Process conventions

- **`ROADMAP.md` is the work queue.** Pick items from it; keep it current as work lands.
- **Every roadmap item gets an ADR** created from [docs/adr/TEMPLATE.md](docs/adr/TEMPLATE.md) *before* implementation. Conventions in [docs/adr/README.md](docs/adr/README.md).
- Decisions or actions only the owner can take go into the **"⏸ Awaiting user"** queue at the top of `ROADMAP.md` — append a row and move on; don't block or guess.
- Do not `git commit`/push as part of routine doc or code generation unless the task explicitly says so.

## NEVER

- **Never change personal, bio, or factual content** (roles, dates, companies, links, claims in `lib/data.ts` or `app/layout.tsx` metadata) without explicit owner confirmation.
- **Never push to any branch that auto-deploys** to production.
- **Never add paid services** (SaaS subscriptions, paid APIs, new billable AWS resources) without owner approval.
