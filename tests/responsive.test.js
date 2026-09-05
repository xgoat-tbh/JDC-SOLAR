import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');
const frontendDir = path.resolve(rootDir, 'frontend');
const cssDir = path.resolve(frontendDir, 'css');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failedTests++;
  }
}

console.log('\n========================================');
console.log('JDC SOLAR 2.0 - RESPONSIVENESS AUDIT SUITE');
console.log('========================================\n');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

function getCssFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getCssFiles(fullPath));
    } else if (file.endsWith('.css')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(frontendDir);
const cssFiles = getCssFiles(cssDir);

console.log(`Auditing ${htmlFiles.length} HTML files and ${cssFiles.length} CSS files across all screen sizes.\n`);

// 1. Viewport Meta Tags
console.log('--- 1. Responsive Viewport Meta Configuration ---');
htmlFiles.forEach(file => {
  const rel = path.relative(frontendDir, file);
  const content = fs.readFileSync(file, 'utf8');
  assert(
    content.includes('<meta name="viewport" content="width=device-width'),
    `[${rel}] Contains proper responsive viewport meta tag`
  );
});

// 2. Global Anti-Overflow & Box Sizing
console.log('\n--- 2. Global Anti-Overflow & Box Model Invariants ---');
const resetCss = fs.readFileSync(path.join(cssDir, 'reset.css'), 'utf8');
assert(
  resetCss.includes('box-sizing: border-box'),
  'Global box-sizing: border-box universally enforced'
);
assert(
  resetCss.includes('overflow-x: hidden') || resetCss.includes('overflow-x: clip'),
  'Document root enforces overflow-x prevention on body/html'
);
assert(
  resetCss.includes('max-width: 100%'),
  'Images and multimedia elements enforce max-width: 100%'
);

// 3. Media Query Breakpoints Coverage
console.log('\n--- 3. Mobile, Tablet & Desktop Breakpoint Coverage ---');
let allCss = '';
cssFiles.forEach(f => {
  allCss += fs.readFileSync(f, 'utf8') + '\n';
});

const breakpoints = [
  { name: 'Compact Mobile (<=480px / 600px)', query: /@media\s*\([^{}]*max-width:\s*(480|600)px\)/ },
  { name: 'Standard Mobile / Phablet (<=767px)', query: /@media\s*\([^{}]*max-width:\s*767px\)/ },
  { name: 'Tablet (min-width: 768px)', query: /@media\s*\([^{}]*min-width:\s*768px\)/ },
  { name: 'Tablet-to-Desktop Transition (1024px / 1140px)', query: /@media\s*\([^{}]*min-width:\s*(1024|1140)px\)/ },
  { name: 'Large Desktop (min-width: 1200px / 1440px)', query: /@media\s*\([^{}]*min-width:\s*(1200|1440)px\)/ },
  { name: 'Ultrawide Bounds (min-width: 1536px / 1920px)', query: /@media\s*\([^{}]*min-width:\s*(1536|1920)px\)/ }
];

breakpoints.forEach(bp => {
  assert(bp.query.test(allCss), `CSS includes responsive rules for ${bp.name}`);
});

// 4. Touch Targets & Mobile Ergonomics
console.log('\n--- 4. Touch Targets & Mobile Navigation ---');
const drawerCss = fs.readFileSync(path.join(cssDir, 'components/drawer.css'), 'utf8');
assert(
  drawerCss.includes('min-height: 44px') || drawerCss.includes('min-height: 48px'),
  'Mobile drawer nav links enforce >= 44px touch targets'
);

const buttonCss = fs.readFileSync(path.join(cssDir, 'components/button.css'), 'utf8');
assert(
  buttonCss.includes('min-height: 44px') || buttonCss.includes('min-height: 48px'),
  'Mobile buttons enforce >= 44px touch targets'
);

// 5. Horizontal Project Track Locking & Snapping
console.log('\n--- 5. Horizontal Project Gallery Snap-Locking & Arrow Controls ---');
const horizCss = fs.readFileSync(path.join(cssDir, 'components/horizontal-scroll.css'), 'utf8');
assert(
  horizCss.includes('scroll-snap-type: x mandatory'),
  'Featured projects track enforces scroll-snap-type: x mandatory'
);
assert(
  horizCss.includes('scroll-snap-align: start'),
  'Featured project cards enforce scroll-snap-align: start'
);
assert(
  horizCss.includes('.gallery-nav-btn'),
  'Featured projects gallery includes accessible navigation arrow button styles'
);

const indexHtml = fs.readFileSync(path.join(frontendDir, 'index.html'), 'utf8');
assert(
  indexHtml.includes('gallery-nav-btn--prev') && indexHtml.includes('gallery-nav-btn--next'),
  'index.html includes previous and next gallery navigation arrow controls'
);

// 6. Cross-Device Single-Root Scrollbar Invariant
console.log('\n--- 6. Cross-Device Single-Root Scrollbar Invariants ---');
assert(
  resetCss.includes('overflow-x: clip'),
  'Body enforces overflow-x: clip to prevent dual scrollbars on Windows Chromium'
);
assert(
  resetCss.includes('html.lenis'),
  'Single-root Lenis smooth scrolling height and scrollbar normalization enforced'
);

console.log('\n========================================');
console.log(`Responsiveness Summary: ${passedTests} Passed, ${failedTests} Failed`);
console.log('========================================\n');

if (failedTests > 0) {
  process.exit(1);
}
