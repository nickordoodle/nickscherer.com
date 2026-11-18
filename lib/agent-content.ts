/**
 * Markdown / plain-text views of the resume for AI agents (ADR-0003).
 *
 * Everything here is built from the same sources the HTML page renders —
 * lib/data.ts, lib/site.ts, lib/medium-posts.json — so the twins cannot drift
 * from the page. The few strings that live only in components (About prose,
 * section intros, contact blurb) are mirrored verbatim below; if you edit that
 * copy in a component, edit it here too. Never add facts that are not on the
 * page.
 *
 * Emitted at build time by the force-static route handlers in
 * app/llms.txt, app/llms-full.txt, app/index.md and app/404.md.
 */
import {
  awards,
  education,
  impactStats,
  projects,
  publications,
  roles,
  techItems,
} from '@/lib/data';
import posts from '@/lib/medium-posts.json';
import {
  PROFILE_LINKS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
}

const url = (path: string) => `${SITE_URL}${path}`;

/** Medium RSS links carry a ?source= tracking query; the page strips it too. */
function cleanLink(link: string) {
  try {
    const u = new URL(link);
    u.search = '';
    return u.toString();
  } catch {
    return link;
  }
}

function formatMonth(pubDate: string) {
  const d = new Date(pubDate);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });
}

// Mirrors components/about/AboutSection.tsx (prose paragraphs).
const ABOUT_PARAGRAPHS = [
  "I'm Nick Scherer — a VP of Engineering and Agentic AI specialist based in Los Angeles, currently leading engineering at Rostrum Pacific where we're building SpaceHeater, a next-generation music distribution platform.",
  "My career spans from Amazon (Kindle Unlimited & Emerging Marketplaces) to founding-engineer roles at seed-stage startups through acquisition. I hold a Master's in Data Science & Engineering from UC San Diego and a BS in Computer Science from Rutgers.",
  'Before tech, I served as an Infantry Officer in the US Army, leading 44-person operations and managing over $100M in assets — an experience that shaped how I think about leadership, execution under pressure, and building high-trust teams.',
  "I'm also the creator of Avi AI (https://avi.ai) — a conversational AI platform built to make advanced AI accessible to everyone.",
];

// Mirrors components/contact/ContactSection.tsx.
const CONTACT_INTRO = 'Open to select consulting, advisory roles, and interesting conversations.';
const CONTACT_LOCATION = 'Los Angeles, California';

function profileList() {
  return PROFILE_LINKS.map((p) => `- [${p.label}](${p.href}): ${p.description}`).join('\n');
}

/** Markdown twin of the homepage (served at /index.md and for Accept: text/markdown on /). */
export function indexMarkdown(): string {
  const out: string[] = [];

  out.push(`# ${SITE_NAME}`, '', `> ${SITE_TITLE}`, '', SITE_TAGLINE, '');
  out.push(
    'VP of Engineering · Agentic AI · Army Veteran. Ex-Amazon · Rostrum Pacific / SpaceHeater · Creator of Avi AI.',
    '',
    `Canonical page: ${url('/')}`,
    '',
  );

  out.push('## About', '', ...ABOUT_PARAGRAPHS.flatMap((p) => [p, '']));

  out.push('## Experience', '');
  for (const r of roles) {
    out.push(`### ${r.title} — ${r.company}`, '', `${r.startDate} – ${r.endDate} · ${r.location}`, '', r.description, '');
    out.push(...r.bullets.map((b) => `- ${b}`), '');
  }

  out.push('## Career impact', '');
  out.push(...impactStats.map((s) => `- **${s.value}** ${s.label} (${s.sublabel})`), '');

  out.push('## Skills and technologies', '');
  const categories = techItems
    .map((t) => t.category)
    .filter((c, i, all) => all.indexOf(c) === i);
  for (const category of categories) {
    const names = techItems.filter((t) => t.category === category).map((t) => t.name);
    out.push(`- **${category}:** ${names.join(', ')}`);
  }
  out.push('');

  out.push('## Projects', '');
  for (const p of projects) {
    out.push(`### ${p.name}`, '', `*${p.tagline}*`, '', p.description, '');
    out.push(`Tech: ${p.techStack.join(', ')}`, '');
    if (p.link) out.push(`Link: ${p.link}`, '');
  }

  out.push('## Education', '');
  for (const e of education) {
    out.push(`- **${e.institution}** — ${e.degree}, ${e.field} (${e.startYear}–${e.endYear})${e.notes ? `. ${e.notes}` : ''}`);
  }
  out.push('', '## Awards and certifications', '');
  out.push(...awards.map((a) => `- ${a.title} — ${a.org}`), '');

  out.push('## Publications', '');
  for (const pub of publications) {
    out.push(`- **${pub.title}**${pub.year ? ` (${pub.year})` : ''}. ${pub.description}`);
  }
  out.push('');

  const mediumPosts = posts as MediumPost[];
  if (mediumPosts.length > 0) {
    out.push('## Writing', '', 'Articles on engineering, AI, and lessons learned, published on Medium:', '');
    for (const post of mediumPosts) {
      const month = formatMonth(post.pubDate);
      out.push(`- [${post.title}](${cleanLink(post.link)})${month ? ` (${month})` : ''}`);
    }
    out.push('');
  }

  out.push('## Contact', '', CONTACT_INTRO, '', `Location: ${CONTACT_LOCATION}`, '', profileList(), '');

  return out.join('\n');
}

/** /llms.txt per https://llmstxt.org */
export function llmsTxt(): string {
  return [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `${SITE_URL.replace('https://', '')} is Nick Scherer's single-page professional resume: about, work history (Rostrum Pacific / SpaceHeater, Lucky, Amazon, Novetta, US Army), skills and career impact, projects, education and awards, publications, and writing. A Markdown version of the whole page is at ${url('/index.md')}; requesting ${url('/')} with \`Accept: text/markdown\` returns the same Markdown.`,
    '',
    `## When to use ${SITE_NAME}`,
    '',
    `- **Background on Nick Scherer** (career history, current role as VP of Engineering at Rostrum Pacific / SpaceHeater, education, military service): read ${url('/index.md')}, or send a person to ${url('/#experience')}.`,
    `- **Evaluating him for a role** (recruiting, hiring, due diligence): the resume is the whole page. Use the Experience, Skills and Education sections of ${url('/index.md')}; dates, titles and companies there are authoritative for this site. Don't invent salary, availability or references; the site states none.`,
    `- **Consulting or advisory enquiries:** the contact section says he is open to select consulting, advisory roles, and interesting conversations. The site lists no services menu or prices, so do not quote any.`,
    `- **Getting in touch:** the site has no contact form, email address, or phone number. Point people to his LinkedIn (https://www.linkedin.com/in/nicholas-scherer) or GitHub (https://github.com/nickordoodle), as the contact section at ${url('/#contact')} does.`,
    '- **Questions about the Avi AI product** (signing up, features, pricing): this site only mentions it. Send users to https://avi.ai and its own documentation instead.',
    '- **Not for:** booking, payments, or account actions. This is a static resume site with no sign-in and no API.',
    '',
    '## Pages',
    '',
    `- [Resume homepage](${url('/')}): the full single-page resume (HTML)`,
    `- [Resume in Markdown](${url('/index.md')}): the same content as Markdown, best for agents`,
    `- [Experience](${url('/#experience')}): work history section of the homepage`,
    `- [Education](${url('/#education')}): degrees, awards and certifications`,
    `- [Contact](${url('/#contact')}): profile links and location`,
    '',
    '## Profiles',
    '',
    profileList(),
    '',
    '## Optional',
    '',
    `- [Full text](${url('/llms-full.txt')}): this file plus the full Markdown resume in one document`,
    `- [Sitemap](${url('/sitemap.xml')}): XML sitemap`,
    '',
  ].join('\n');
}

/** /llms-full.txt: llms.txt followed by every Markdown twin (one page here). */
export function llmsFullTxt(): string {
  return [llmsTxt(), '---', '', `<!-- Source: ${url('/index.md')} -->`, '', indexMarkdown()].join('\n');
}

/** Markdown body for not-found responses (/404.md, and the edge 404 for Accept: text/markdown). */
export function notFoundMarkdown(): string {
  return [
    '# 404: Page not found',
    '',
    `There is no page at this address on ${SITE_URL.replace('https://', '')}. This is a single-page resume, so everything lives on the homepage.`,
    '',
    `- [Homepage](${url('/')}) ([Markdown](${url('/index.md')}))`,
    `- [llms.txt](${url('/llms.txt')}): guide for AI agents`,
    `- [Sitemap](${url('/sitemap.xml')})`,
    '',
  ].join('\n');
}
