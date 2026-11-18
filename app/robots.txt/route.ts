import { SITE_URL } from '@/lib/site';

// Hand-built instead of a robots.ts metadata route so it can carry the
// llms.txt pointer comment (MetadataRoute.Robots has no comment field).
// Rules: allow everything (ADR-0003).
export const dynamic = 'force-static';

export function GET() {
  const body = [
    `# AI agents: see ${SITE_URL}/llms.txt (Markdown version of the site: ${SITE_URL}/index.md)`,
    'User-Agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
