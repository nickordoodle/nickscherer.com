import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '../lib/medium-posts.json');
const FEED_URL = 'https://nickordoodle.medium.com/feed';

function extractCdata(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>\\s*(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))<\\/${tag}>`, 'i');
  const m = xml.match(re);
  return m ? (m[1] ?? m[2] ?? '').trim() : '';
}

function extractAttr(xml, tag, attr) {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i');
  const m = xml.match(re);
  return m ? m[1] : '';
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function firstImgSrc(html) {
  const m = html.match(/<img[^>]+src="([^"]+)"/i);
  return m ? m[1] : '';
}

function parseItems(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];
    const title = stripHtml(extractCdata(block, 'title'));
    const link = extractCdata(block, 'link') || extractAttr(block, 'link', 'href');
    const pubDate = extractCdata(block, 'pubDate');
    const content = extractCdata(block, 'content:encoded');
    const rawDesc = extractCdata(block, 'description');
    const description = stripHtml(rawDesc || content).slice(0, 200).trim();
    const thumbnail = firstImgSrc(content);
    const categories = [];
    const catRe = /<category>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/category>/gi;
    let cm;
    while ((cm = catRe.exec(block)) !== null) categories.push(cm[1].trim());

    if (title && link) {
      items.push({ title, link, pubDate, description, thumbnail, categories });
    }
  }
  return items;
}

async function main() {
  console.log('Fetching Medium RSS feed…');
  const res = await fetch(FEED_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  const posts = parseItems(xml);
  writeFileSync(OUT_PATH, JSON.stringify(posts, null, 2));
  console.log(`Wrote ${posts.length} posts to lib/medium-posts.json`);
}

main().catch((e) => {
  console.error('Failed to fetch Medium feed:', e.message);
  // Write empty array so the build doesn't fail
  writeFileSync(OUT_PATH, '[]');
});
