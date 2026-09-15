// Check emitted HTML: production optimizations can introduce inline JavaScript.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const output = path.resolve(__dirname, '../dist/portfolio/browser');
function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory()
      ? htmlFiles(filename)
      : entry.name.endsWith('.html') ? [filename] : [];
  });
}

const files = htmlFiles(output);
assert.ok(files.length > 0, 'Build production HTML before checking CSP');
const violations = [];
for (const filename of files) {
  const dom = new JSDOM(fs.readFileSync(filename, 'utf8'));
  const document = dom.window.document;
  const report = message => violations.push(`${path.relative(output, filename)}: ${message}`);
  for (const element of document.querySelectorAll('*')) {
    for (const attribute of element.attributes) {
      if (/^on/i.test(attribute.name)) report(`inline handler ${attribute.name} on <${element.localName}>`);
      if (['href', 'src', 'action', 'formaction'].includes(attribute.name) && /^\s*javascript:/i.test(attribute.value)) {
        report(`JavaScript URL on <${element.localName}>`);
      }
    }
  }
  for (const script of document.querySelectorAll('script:not([src])')) {
    const type = (script.getAttribute('type') || '').toLowerCase();
    if (['', 'module', 'text/javascript', 'application/javascript'].includes(type) && script.textContent.trim()) {
      report('executable inline script');
    }
  }
  const styles = [...document.querySelectorAll('link[rel="stylesheet"]')]
    .filter(link => !link.closest('noscript'))
    .filter(link => /(?:^|\/)styles[^/]*\.css$/.test(link.getAttribute('href') || ''));
  if (!styles.some(link => ['', 'all', 'screen'].includes(link.media))) {
    report('global stylesheet is not enabled for screen rendering');
  }
  dom.window.close();
}
assert.deepEqual(violations, [], 'Generated HTML must work with script-src self');
console.log(`CSP check passed for ${files.length} generated HTML files.`);
