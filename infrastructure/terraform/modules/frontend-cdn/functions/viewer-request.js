// CloudFront Function (cloudfront-js-2.0), viewer-request — ADR-0003.
// Loaded by ../main.tf with file(); unit-tested by functions.test.js
// (node --test). Keep it ES5-style: no require, no async, <= 10 KB.
//
// 1. Accept: text/markdown → serve the Markdown twin of a page (/index.md),
//    or a generated Markdown 404 for any other page-like path.
// 2. Otherwise: the original static-export URL rewrite, unchanged.

// Page route → Markdown twin built into out/ by app/index.md/route.ts.
// Single-page site: only the homepage has a twin.
var MD_ROUTES = {
  '/': '/index.md',
  '/index.html': '/index.md'
};

var NOT_FOUND_MD = [
  '# 404: Page not found',
  '',
  'There is no page at this address on nickscherer.com. This is a single-page resume, so everything lives on the homepage.',
  '',
  '- [Homepage](https://nickscherer.com/) ([Markdown](https://nickscherer.com/index.md))',
  '- [llms.txt](https://nickscherer.com/llms.txt): guide for AI agents',
  '- [Sitemap](https://nickscherer.com/sitemap.xml)',
  ''
].join('\n');

function wantsMarkdown(request) {
  var accept = request.headers && request.headers.accept;
  return !!accept && accept.value.toLowerCase().indexOf('text/markdown') !== -1;
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (wantsMarkdown(request)) {
    var key = uri.length > 1 && uri.charAt(uri.length - 1) === '/' ? uri.slice(0, -1) : uri;
    if (MD_ROUTES[key]) {
      request.uri = MD_ROUTES[key];
      return request;
    }
    var last = uri.substring(uri.lastIndexOf('/') + 1);
    if (last.indexOf('.') === -1 || last.slice(-5) === '.html') {
      return {
        statusCode: 404,
        statusDescription: 'Not Found',
        headers: {
          'content-type': { value: 'text/markdown; charset=utf-8' },
          vary: { value: 'Accept' },
          'cache-control': { value: 'no-store' }
        },
        body: { encoding: 'text', data: NOT_FOUND_MD }
      };
    }
    // Any other extension (assets, .txt, .xml, .md, images): pass through.
    return request;
  }

  // Original rewrite (pre-ADR-0003), behavior unchanged.
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '.html';
  }
  return request;
}
