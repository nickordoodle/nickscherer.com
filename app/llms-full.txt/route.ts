import { llmsFullTxt } from '@/lib/agent-content';

// Emitted as a static file by `output: 'export'` (ADR-0003).
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsFullTxt(), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
