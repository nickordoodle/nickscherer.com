// CloudFront Function (cloudfront-js-2.0), viewer-response — ADR-0003.
// Loaded by ../main.tf with file(); unit-tested by functions.test.js.
//
// - Vary: Accept on every response (the same URL can return HTML or Markdown).
// - Correct content-types for .md / .txt objects instead of trusting the
//   S3 sync mime guess. Only on successful responses: a missing /x.md is
//   answered with the HTML /404.html error page and must stay text/html.
// Generated responses from viewer-request (the Markdown 404) skip this
// function; they set their own headers.

function addVaryAccept(headers) {
  var existing = headers.vary ? headers.vary.value : '';
  var parts = existing.split(',');
  var out = [];
  var hasAccept = false;
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i].trim();
    if (!p) continue;
    var lower = p.toLowerCase();
    if (lower === 'accept' || lower === '*') hasAccept = true;
    out.push(p);
  }
  if (!hasAccept) out.push('Accept');
  headers.vary = { value: out.join(', ') };
}

function handler(event) {
  var request = event.request;
  var response = event.response;
  var headers = response.headers;
  var status = Number(response.statusCode);

  addVaryAccept(headers);

  if (status >= 200 && status < 400) {
    var uri = request.uri;
    if (uri.slice(-3) === '.md') {
      headers['content-type'] = { value: 'text/markdown; charset=utf-8' };
    } else if (uri.slice(-4) === '.txt') {
      var ct = headers['content-type'] ? headers['content-type'].value : '';
      if (ct.toLowerCase().indexOf('charset') === -1) {
        headers['content-type'] = { value: 'text/plain; charset=utf-8' };
      }
    }
  }
  return response;
}
