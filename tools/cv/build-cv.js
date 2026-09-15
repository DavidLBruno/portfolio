// Renders tools/cv/cv.html to src/assets/cv.pdf with headless Chrome.
// Usage: node tools/cv/build-cv.js  (edit cv.html first; keep it in sync with src/assets/i18n/es.json)
const { execFileSync } = require('node:child_process');
const {
  existsSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
} = require('node:fs');
const { resolve } = require('node:path');
const { pathToFileURL } = require('node:url');

const root = resolve(__dirname, '../..');
const chrome = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find(p => p && existsSync(p));
if (!chrome) throw new Error('Chrome not found; set CHROME_PATH');

const photo = readFileSync(
  resolve(root, 'src/assets/images/bruno-david.jpg'),
).toString('base64');
const html = readFileSync(resolve(__dirname, 'cv.html'), 'utf8').replace(
  '{{PHOTO}}',
  `data:image/jpeg;base64,${photo}`,
);
const tmp = resolve(__dirname, 'cv.tmp.html');
writeFileSync(tmp, html);
try {
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=8000',
    `--print-to-pdf=${resolve(root, 'src/assets/cv.pdf')}`,
    pathToFileURL(tmp).href,
  ]);
} finally {
  unlinkSync(tmp);
}
console.log('src/assets/cv.pdf updated');
