---
name: verify
description: Build, serve, and visually verify the nickscherer.com static export (charts, theme, sections) in a real browser
---

# Verify nickscherer.com

Static-export site — the production surface is plain files in `out/`. No dev server needed for verification; verify the same artifact CD deploys.

## Build + serve

```bash
pnpm build          # from repo root; needs network (Medium RSS; non-fatal on failure)
python3 -m http.server 4174 -d out   # background
```

Then drive `http://localhost:4174/` with Playwright/Chrome MCP tools.

## What to check

- **Charts** (echarts via echarts-for-react) all live in section `#skills`: SkillsRadar (~435px canvas), CareerTimelineChart (~435px), TechBubbles (~950px — renders thin horizontal *bars* despite the name; that's intended). A 4th canvas is the hero particle field.
- Charts sit below the fold; `window.scrollTo` then wait ~2s for ScrollReveal + chart entrance animations before screenshotting.
- **No Services section, no Media/Creative section** — nav must not contain Services or Creative links, and there are no `#services`/`#media` anchors (deliberate deltas from nickordoodle.com).
- **Theme toggle**: `button[aria-label="Toggle theme"]` (the first `nav button` is the logo — don't click that). Toggles `html.dark`/`html.light`; charts re-render with theme colors.
- **Tooltips**: TechBubbles bars are ~4px tall — a coarse hover sweep misses them. Hover with 2px steps on a bar row centerline; tooltip text looks like `SQL Languages · 8 yrs`.
- **Resize**: charts reflow (single column under ~768px).

## Known noise

- `favicon.ico` 404 in console — pre-existing (ROADMAP item 3), not a regression.
- Placeholder avatar is expected (ROADMAP item 5); `/resume.pdf` links 404 until the owner supplies the file (ROADMAP "Awaiting user").
