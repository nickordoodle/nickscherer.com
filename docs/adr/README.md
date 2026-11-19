# Architecture Decision Records

Decision records for nickscherer.com. Work items originate in [ROADMAP.md](../../ROADMAP.md); this directory records the how and why.

## Conventions

- **One ADR per roadmap item**, created from [TEMPLATE.md](TEMPLATE.md) **before** implementation begins.
- **Numbering:** 4-digit sequential — `ADR-0001`, `ADR-0002`, …
- **Filenames:** `NNNN-kebab-case-title.md` (e.g. `0001-scaffold-from-nickordoodle.md`).
- **Status lifecycle:** 🔴 Proposed → 🟡 In progress → ✅ Done, or ⏸️ Blocked/awaiting user, or ❌ Rejected/superseded.
- **Implementation Log is append-only.** Never rewrite Context/Decision after completion; a change of direction gets a new superseding ADR that links back.
- Keep the index table below current.

## Index

| ADR | Title | Status | Created |
|---|---|---|---|
| [0001](0001-scaffold-from-nickordoodle.md) | Scaffold nickscherer.com from nickordoodle.com | ✅ Done | 2026-07-18 |
| [0002](0002-flatten-to-single-package.md) | Flatten repo to a single package | ✅ Done | 2026-07-18 |
| [0003](0003-agent-ready-site.md) | Make the site agent-ready (SEO basics, llms.txt, Markdown negotiation, real 404s) | 🟡 In progress | 2026-11-18 |
