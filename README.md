# nickscherer.com

Personal / professional resume site for **Nick Scherer** — VP of Engineering / agentic-AI builder. A single-page Next.js site with animated sections for hero, about, work history, skills (interactive ECharts visualizations), projects, education, publications, Medium writing, and contact links. Served as a static export from S3 behind CloudFront at [nickscherer.com](https://nickscherer.com).

This is the resume-focused counterpart to [nickordoodle.com](https://nickordoodle.com) (the client-facing creative portfolio); both share the same design system and stack, packaged differently — see [ADR-0001](docs/adr/0001-scaffold-from-nickordoodle.md) and [ADR-0002](docs/adr/0002-flatten-to-single-package.md).

## Stack

- **Package manager:** pnpm 9, single package (no monorepo tooling)
- **Frontend:** Next.js 14 (App Router, `output: 'export'`), React 18, TypeScript
- **Styling:** Tailwind CSS 3 with CSS-variable theme tokens, class-based dark mode
- **Motion & visuals:** framer-motion, custom canvas particles, ECharts (`echarts-for-react`) for skills radar / career timeline / tech bubbles, lucide-react icons
- **Infra:** Terraform — S3 + CloudFront + ACM + Route53 (see [OPERATIONS.md](OPERATIONS.md))

## Layout

| Path | What it is |
|---|---|
| `app/` | App Router: `layout.tsx` (metadata, fonts), `page.tsx` (single page), `providers.tsx` (theme context) |
| `components/` | Section components, one folder per section (`hero/`, `work/`, `skills/`, …) plus shared `ui/` |
| `lib/` | `data.ts` (all résumé content, typed), `utils.ts` (`cn` helper), `medium-posts.json` (generated) |
| `scripts/fetch-medium.mjs` | Pulls the Medium RSS feed into `lib/medium-posts.json` at build time |
| `public/` | Static assets (currently just an avatar placeholder) |
| `infrastructure/terraform/` | S3/CloudFront/ACM/Route53 IaC with `frontend-cdn` and optional `redirect-cdn` modules |
| `docs/adr/` | Architecture Decision Records |
| `ROADMAP.md` | Work queue for the autonomous maintenance routine |

## Getting started

Requires Node 20+ and pnpm 9 (`packageManager: pnpm@9.0.0`).

```bash
pnpm install

# Dev server
pnpm dev

# Production build — fetches Medium posts, then static-exports to out/
pnpm build

# Lint / typecheck
pnpm lint
pnpm typecheck
```

## Docs

- [AGENTS.md](AGENTS.md) — entrypoint for autonomous/AI contributors
- [ARCHITECTURE.md](ARCHITECTURE.md) — current-state architecture map
- [OPERATIONS.md](OPERATIONS.md) — infrastructure and deploy operations
- [ROADMAP.md](ROADMAP.md) — prioritized work queue
- [docs/adr/](docs/adr/README.md) — decision records
