import { notFoundMarkdown } from '@/lib/agent-content';

// Emitted as a static file by `output: 'export'` (ADR-0003).
export const dynamic = 'force-static';

export function GET() {
  return new Response(notFoundMarkdown(), { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
}
