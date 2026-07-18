# nickscherer.com

Personal / professional resume site for **Nick Scherer** — VP of Engineering / agentic-AI builder. A single-page Next.js site with animated sections for hero, about, work history, skills (interactive ECharts visualizations), projects, education, publications, Medium writing, a media gallery (placeholder), and contact links. Served as a static export from S3 behind CloudFront at [nickscherer.com](https://nickscherer.com).

This is the resume-focused counterpart to [nickordoodle.com](https://nickordoodle.com) (the client-facing creative portfolio); both share the same architecture (see [ADR-0001](docs/adr/0001-scaffold-from-nickordoodle.md)).

## Stack

- **Monorepo:** Lerna 9 + pnpm workspaces (`applications/*`)
- **Frontend:** Next.js 14 (App Router, `output: 'export'`), React 18, TypeScript
- **Styling:** Tailwind CSS 3 with CSS-variable theme tokens, class-based dark mode
- **Motion & visuals:** framer-motion, custom canvas particles, ECharts (`echarts-for-react`) for skills radar / career timeline / tech bubbles, lucide-react icons
- **Infra:** Terraform — S3 + CloudFront + ACM + Route53 (see [OPERATIONS.md](OPERATIONS.md))

## Layout

| Path | What it is |
|---|---|
| `applications/frontend/` | The Next.js app (`@nickscherer/frontend`) |
| `applications/frontend/app/` | App Router: `layout.tsx` (metadata, fonts), `page.tsx` (single page), `providers.tsx` (theme context) |
| `applications/frontend/components/` | Section components, one folder per section (`hero/`, `work/`, `skills/`, …) plus shared `ui/` |
| `applications/frontend/lib/` | `data.ts` (all résumé content, typed), `utils.ts` (`cn` helper), `medium-posts.json` (generated) |
| `applications/frontend/scripts/fetch-medium.mjs` | Pulls the Medium RSS feed into `lib/medium-posts.json` at build time |
| `applications/frontend/public/` | Static assets (currently just an avatar placeholder) |
| `infrastructure/terraform/` | S3/CloudFront/ACM/Route53 IaC with `frontend-cdn` and optional `redirect-cdn` modules |
| `docs/adr/` | Architecture Decision Records |
| `ROADMAP.md` | Work queue for the autonomous maintenance routine |

## Getting started

Requires Node 20+ and pnpm 9 (`packageManager: pnpm@9.0.0`).

```bash
pnpm install

# Dev server (from repo root, via Lerna)
pnpm dev:frontend

# Production build — fetches Medium posts, then static-exports to applications/frontend/out/
pnpm build:frontend

# Lint all packages
pnpm lint
```

The same scripts exist inside `applications/frontend` as `pnpm dev` / `pnpm build` / `pnpm lint`.

## Docs

- [AGENTS.md](AGENTS.md) — entrypoint for autonomous/AI contributors
- [ARCHITECTURE.md](ARCHITECTURE.md) — current-state architecture map
- [OPERATIONS.md](OPERATIONS.md) — infrastructure and deploy operations
- [ROADMAP.md](ROADMAP.md) — prioritized work queue
- [docs/adr/](docs/adr/README.md) — decision records
