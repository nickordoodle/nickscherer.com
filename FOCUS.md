# Focus

> What this project is and where it should grow. Owner-steered and high level: it changes when
> direction changes, not when work ships. The `planner` turns it into ranked items in ROADMAP.md,
> and every Claude session (local chats, cloud sessions, scheduled routines) takes its work from
> ROADMAP.md. Specific items, status and owner decisions live in ROADMAP.md; what was actually done
> lives in WORKLOG.md.
> Last reviewed: 2026-11-28

## What this is

nickscherer.com is Nick Scherer's resume site: a single-page site with his work history, skills
charts, projects, education, publications and writing. People evaluating him for a role read it
and take his resume away. It is the resume-focused sibling of nickordoodle.com (same design system
and stack), a static site with no backend that represents Nick professionally. No routine runs
here, so this file steers chat sessions.

## North star

Someone evaluating Nick reads his history and gets his resume in one click, on a fast, accessible
page.

## Focus areas (ranked)

1. **The resume and trust basics work:** a resume site whose resume button fails defeats its
   purpose. Better looks like a resume that downloads and trust pages such as privacy, from the
   owner's own files and words.
2. **Keeping pace with nickordoodle.com:** the sibling ships fixes this site lacks. Better looks
   like its accessibility, performance and reliability improvements landing here too, so both
   sites feel equally finished.
3. **Reliable content and tests:** a section that silently ships empty looks broken. Better looks
   like a Writing section that never ships empty and real tests around the page's logic.
4. **Current and healthy:** stay on supported frameworks, in step with the sibling sites, and keep
   dependency updates flowing.

## Not now

- Any server runtime (SSR, ISR, middleware); the site stays a static export.
- A shared component package with nickordoodle.com, until drift causes real bugs.

## Balance

Prefer user-facing fixes in the focus areas; upkeep only when nothing qualifies.

## Quality bar

The AGENTS.md gates pass, with unit tests for new logic and a visual check for anything
user-facing (Playwright e2e if the site gains a suite). Content stays in the content data file,
and agent-facing text stays in sync with it. When fixing something here, check whether
nickordoodle.com needs the same fix.

## Owner-gated

- Personal, bio or factual content, and owner assets (resume, photos, media); never placeholders.
- Public-facing copy, and legal or privacy text.
- CD workflows, Terraform, and anything that changes what a prod deploy ships.
