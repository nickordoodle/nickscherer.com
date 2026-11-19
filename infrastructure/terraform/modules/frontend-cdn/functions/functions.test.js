// Unit tests for the CloudFront Functions (ADR-0003). Plain node, no deps:
//   pnpm test:edge  (node --test <this file>)
// If the static export has been built (out/), also
// checks that the edge's Markdown twins and 404 body match the build output.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function load(file) {
  const code = fs.readFileSync(path.join(__dirname, file), 'utf8');
  assert.ok(Buffer.byteLength(code) <= 10 * 1024, `${file} exceeds the 10 KB CloudFront Function limit`);
  const ctx = {};
  vm.runInNewContext(`${code}\nthis.handler = handler; this.MD_ROUTES = typeof MD_ROUTES === 'undefined' ? null : MD_ROUTES; this.NOT_FOUND_MD = typeof NOT_FOUND_MD === 'undefined' ? null : NOT_FOUND_MD;`, ctx);
  return ctx;
}

const req = load('viewer-request.js');
const res = load('viewer-response.js');
const OUT = path.resolve(__dirname, '../../../../../out');

function request(uri, accept) {
  const headers = {};
  if (accept) headers.accept = { value: accept };
  return { request: { uri, method: 'GET', headers, querystring: {} } };
}

const MD = 'text/markdown, text/html;q=0.9';
const HTML = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';

test('viewer-request: markdown negotiation on the homepage', () => {
  assert.equal(req.handler(request('/', MD)).uri, '/index.md');
  assert.equal(req.handler(request('/index.html', 'TEXT/MARKDOWN')).uri, '/index.md');
});

test('viewer-request: HTML (and no Accept) keeps the original rewrite', () => {
  assert.equal(req.handler(request('/', HTML)).uri, '/index.html');
  assert.equal(req.handler(request('/')).uri, '/index.html');
  assert.equal(req.handler(request('/about', HTML)).uri, '/about.html');
  assert.equal(req.handler(request('/blog/', HTML)).uri, '/blog/index.html');
  assert.equal(req.handler(request('/_next/static/x.js', HTML)).uri, '/_next/static/x.js');
  assert.equal(req.handler(request('/llms.txt')).uri, '/llms.txt');
});

test('viewer-request: markdown 404 for unknown page paths', () => {
  for (const uri of ['/__ora-404-probe-abc', '/nope/', '/missing.html', '/a/b/c']) {
    const r = req.handler(request(uri, MD));
    assert.equal(r.statusCode, 404, uri);
    assert.equal(r.headers['content-type'].value, 'text/markdown; charset=utf-8');
    assert.equal(r.headers.vary.value, 'Accept');
    assert.equal(r.headers['cache-control'].value, 'no-store');
    assert.equal(r.body.encoding, 'text');
    assert.ok(r.body.data.length >= 20);
    for (const link of ['https://nickscherer.com/)', '/llms.txt', '/sitemap.xml']) {
      assert.ok(r.body.data.includes(link), `404 body links ${link}`);
    }
  }
});

test('viewer-request: files with other extensions pass through for markdown', () => {
  for (const uri of ['/_next/static/x.js', '/llms.txt', '/sitemap.xml', '/index.md', '/icon.svg']) {
    const r = req.handler(request(uri, MD));
    assert.equal(r.uri, uri);
    assert.equal(r.statusCode, undefined);
  }
});

function response(uri, status, headers) {
  return { request: { uri, headers: {} }, response: { statusCode: status, headers: headers || {} } };
}

test('viewer-response: appends Accept to Vary without duplicating', () => {
  assert.equal(res.handler(response('/index.html', 200)).headers.vary.value, 'Accept');
  assert.equal(
    res.handler(response('/index.html', 200, { vary: { value: 'Accept-Encoding' } })).headers.vary.value,
    'Accept-Encoding, Accept',
  );
  assert.equal(
    res.handler(response('/index.html', 200, { vary: { value: 'accept, Accept-Encoding' } })).headers.vary.value,
    'accept, Accept-Encoding',
  );
});

test('viewer-response: content-types for .md and .txt', () => {
  const md = res.handler(response('/index.md', 200, { 'content-type': { value: 'binary/octet-stream' } }));
  assert.equal(md.headers['content-type'].value, 'text/markdown; charset=utf-8');
  const txt = res.handler(response('/llms.txt', 200, { 'content-type': { value: 'text/plain' } }));
  assert.equal(txt.headers['content-type'].value, 'text/plain; charset=utf-8');
  const keep = res.handler(response('/llms.txt', 200, { 'content-type': { value: 'text/plain; charset=utf-8' } }));
  assert.equal(keep.headers['content-type'].value, 'text/plain; charset=utf-8');
  const html = res.handler(response('/index.html', 200, { 'content-type': { value: 'text/html' } }));
  assert.equal(html.headers['content-type'].value, 'text/html');
});

test('viewer-response: error pages for missing .md keep their HTML type', () => {
  const r = res.handler(response('/missing.md', 404, { 'content-type': { value: 'text/html' } }));
  assert.equal(r.headers['content-type'].value, 'text/html');
});

test('build output matches the edge (skipped until the frontend is built)', { skip: !fs.existsSync(OUT) }, () => {
  for (const twin of new Set(Object.values(req.MD_ROUTES))) {
    assert.ok(fs.existsSync(path.join(OUT, twin)), `twin ${twin} is in the build output`);
  }
  for (const f of ['llms.txt', '404.html', '404.md', 'robots.txt', 'sitemap.xml']) {
    assert.ok(fs.existsSync(path.join(OUT, f)), `${f} is in the build output`);
  }
  assert.equal(fs.readFileSync(path.join(OUT, '404.md'), 'utf8'), req.NOT_FOUND_MD, 'edge 404 body == /404.md');
  // Every sitemap URL has a Markdown twin.
  const sitemap = fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8');
  for (const [, loc] of sitemap.matchAll(/<loc>https:\/\/nickscherer\.com([^<]*)<\/loc>/g)) {
    assert.ok(req.MD_ROUTES[loc || '/'], `sitemap route ${loc} has a Markdown twin`);
  }
});
