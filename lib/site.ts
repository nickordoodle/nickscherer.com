/**
 * Site-wide SEO constants (ADR-0003). Values mirror facts already published
 * elsewhere on the site (app/layout.tsx metadata, ContactSection,
 * WritingSection) — keep them in sync; do not introduce new personal claims
 * here without owner OK.
 */
export const SITE_URL = 'https://nickscherer.com';

export const SITE_NAME = 'Nick Scherer';

export const SITE_TITLE = 'Nick Scherer — VP Engineering & Agentic AI Builder';

export const SITE_TAGLINE =
  'Building at the intersection of Agentic AI, Big Data, and Music Technology.';

/** Meta description; also the JSON-LD Person description and the llms.txt summary. */
export const SITE_DESCRIPTION =
  'Professional resume of Nick Scherer — VP of Engineering at Rostrum Pacific / SpaceHeater. Agentic AI, music tech, AWS, full-stack product development, and Army veteran.';

/** Profile links already published on the page (ContactSection, WritingSection). */
export const PROFILE_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nicholas-scherer',
    description: 'professional profile',
  },
  { label: 'GitHub', href: 'https://github.com/nickordoodle', description: 'code' },
  { label: 'Medium', href: 'https://nickordoodle.medium.com', description: 'articles' },
  { label: 'Avi AI', href: 'https://avi.ai', description: 'conversational AI platform he created' },
] as const;

/** schema.org Person structured data, rendered as JSON-LD in the root layout. */
export const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  jobTitle: 'VP of Engineering',
  worksFor: { '@type': 'Organization', name: 'Rostrum Pacific' },
  homeLocation: { '@type': 'Place', name: 'Los Angeles, California' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'UC San Diego' },
    { '@type': 'CollegeOrUniversity', name: 'Rutgers University — New Brunswick' },
  ],
  // Terms that appear in the page copy (lib/data.ts, Hero/About sections).
  knowsAbout: [
    'Agentic AI',
    'LLMs',
    'RAG',
    'Music Technology',
    'Music distribution',
    'Leadership',
    'Big Data',
    'DDEX',
    'AWS',
    'Terraform',
    'Data Science',
    'Data Engineering',
    'Next.js',
    'Python',
  ],
  sameAs: [
    'https://www.linkedin.com/in/nicholas-scherer',
    'https://github.com/nickordoodle',
    'https://nickordoodle.medium.com',
  ],
} as const;
