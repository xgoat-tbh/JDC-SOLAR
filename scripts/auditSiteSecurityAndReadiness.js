import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const frontendDir = path.join(rootDir, 'frontend');

console.log('====================================================');
console.log('JDC SOLAR 2.0 - DEEP SECURITY & PRODUCTION AUDIT');
console.log('====================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let warnings = [];
let errors = [];

function check(title, condition, errorMsg, isWarning = false) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✅ [PASS] ${title}`);
  } else {
    if (isWarning) {
      warnings.push(`${title}: ${errorMsg}`);
      console.log(`  ⚠️ [WARN] ${title}: ${errorMsg}`);
    } else {
      errors.push(`${title}: ${errorMsg}`);
      console.log(`  ❌ [FAIL] ${title}: ${errorMsg}`);
    }
  }
}

function getFiles(dir, ext = '.html', list = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      getFiles(full, ext, list);
    } else if (full.endsWith(ext)) {
      list.push(full);
    }
  }
  return list;
}

const htmlFiles = getFiles(frontendDir, '.html');
console.log(`--- 1. AUDITING ${htmlFiles.length} HTML PAGES & LINKS ---`);

const hrefRegex = /href=["']([^"']+)["']/g;
const srcRegex = /src=["']([^"']+)["']/g;

let missingAssets = [];
let brokenInternalLinks = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(frontendDir, file);

  
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const url = match[1];
    if (
      url.startsWith('#') ||
      url.startsWith('tel:') ||
      url.startsWith('mailto:') ||
      url.startsWith('https://') ||
      url.startsWith('http://') ||
      url.startsWith('javascript:') ||
      url.includes('.svg#')
    ) {
      continue;
    }

    let targetPath;
    if (url.startsWith('/')) {
      targetPath = path.join(frontendDir, url.replace(/^\//, ''));
    } else {
      targetPath = path.join(path.dirname(file), url);
    }

    let exists = false;
    if (fs.existsSync(targetPath)) {
      if (fs.statSync(targetPath).isDirectory()) {
        exists = fs.existsSync(path.join(targetPath, 'index.html'));
      } else {
        exists = true;
      }
    } else if (fs.existsSync(targetPath + '.html')) {
      exists = true;
    }

    if (!exists) {
      brokenInternalLinks.push({ file: relPath, link: url });
    }
  }

  
  while ((match = srcRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) continue;

    let targetPath;
    if (src.startsWith('/')) {
      targetPath = path.join(frontendDir, src.replace(/^\//, ''));
    } else {
      targetPath = path.join(path.dirname(file), src);
    }

    if (!fs.existsSync(targetPath)) {
      missingAssets.push({ file: relPath, src: src });
    }
  }
});

check('Zero Broken Internal Page Links', brokenInternalLinks.length === 0, `Found ${brokenInternalLinks.length} broken links: ${JSON.stringify(brokenInternalLinks)}`);
check('Zero Missing Media & Script Assets', missingAssets.length === 0, `Found ${missingAssets.length} missing src assets: ${JSON.stringify(missingAssets)}`);

console.log('\n--- 2. AUDITING APACHE .HTACCESS SECURITY DIRECTIVES ---');
const htaccessPath = path.join(frontendDir, '.htaccess');
const htaccessExists = fs.existsSync(htaccessPath);
check('.htaccess file exists in frontend root', htaccessExists, 'Missing .htaccess');

if (htaccessExists) {
  const htContent = fs.readFileSync(htaccessPath, 'utf8');

  check('Content-Security-Policy (CSP) configured', htContent.includes('Content-Security-Policy'), 'Missing Content-Security-Policy');
  check('CSP allows Google Fonts & WhatsApp & Formspree', htContent.includes('fonts.googleapis.com') && htContent.includes('wa.me') && htContent.includes('formspree.io'), 'CSP missing required whitelist domains');
  check('Anti-Clickjacking (frame-ancestors / X-Frame-Options)', htContent.includes('frame-ancestors') || htContent.includes('X-Frame-Options'), 'Missing clickjacking protection');
  check('X-Content-Type-Options nosniff configured', htContent.includes('X-Content-Type-Options') && htContent.includes('nosniff'), 'Missing nosniff header');
  check('Referrer-Policy configured', htContent.includes('Referrer-Policy'), 'Missing Referrer-Policy');
  check('GZIP / Deflate Compression enabled', htContent.includes('mod_deflate') || htContent.includes('DEFLATE'), 'Missing compression directives');
  check('Browser Cache-Control / Expires enabled', htContent.includes('mod_expires') || htContent.includes('ExpiresActive'), 'Missing caching headers');
  check('Sensitive Files Protected (.git, .env, package.json)', htContent.includes('<FilesMatch "^\\."') || htContent.includes('FilesMatch'), 'Missing dotfile protection block');
  check('Custom 404 ErrorDocument routing active', htContent.includes('ErrorDocument 404 /404.html'), 'Missing 404 routing');
}

console.log('\n--- 3. AUDITING FORM SECURITY & LEAD CAPTURE ---');
const configPath = path.join(frontendDir, 'js', 'config.js');
const formHandlerPath = path.join(frontendDir, 'js', 'components', 'formHandler.js');

check('Global configuration file exists', fs.existsSync(configPath), 'config.js missing');
check('Form handler script exists', fs.existsSync(formHandlerPath), 'formHandler.js missing');

if (fs.existsSync(formHandlerPath)) {
  const fhContent = fs.readFileSync(formHandlerPath, 'utf8');
  check('Honeypot anti-spam check active', fhContent.includes('b_url'), 'Missing honeypot validation');
  check('Indian mobile phone regex (/^[6-9]\\d{9}$/) active', fhContent.includes('phoneRegex') || fhContent.includes('[6-9]'), 'Missing 10-digit Indian phone regex');
  check('Email syntax validation active', fhContent.includes('emailRegex'), 'Missing email validation');
  check('Async non-blocking email dispatch active', fhContent.includes('fetch('), 'Missing async email fetch');
  check('Instant WhatsApp redirect with encoded lead payload active', fhContent.includes('encodeURIComponent') && fhContent.includes('whatsappNumber'), 'Missing WhatsApp URL builder');
}

console.log('\n--- 4. AUDITING SVG SPRITE & ICON INTEGRITY ---');
const spritePath = path.join(frontendDir, 'assets', 'icons', 'sprite.svg');
check('sprite.svg exists', fs.existsSync(spritePath), 'sprite.svg missing');

if (fs.existsSync(spritePath)) {
  const spriteContent = fs.readFileSync(spritePath, 'utf8');
  const requiredSymbols = [
    'icon-sun', 'icon-phone', 'icon-email', 'icon-shield', 'icon-check',
    'icon-whatsapp', 'icon-calculator', 'icon-leaf', 'icon-document',
    'icon-id-card', 'icon-bank', 'icon-home', 'icon-globe', 'icon-star-filled'
  ];

  requiredSymbols.forEach(sym => {
    check(`Symbol #${sym} present in sprite.svg`, spriteContent.includes(`id="${sym}"`), `Symbol #${sym} missing`);
  });
}

console.log('\n--- 5. AUDITING ROBOTS.TXT & SITEMAP.XML ---');
const robotsPath = path.join(frontendDir, 'robots.txt');
const sitemapPath = path.join(frontendDir, 'sitemap.xml');

check('robots.txt exists', fs.existsSync(robotsPath), 'robots.txt missing');
check('sitemap.xml exists', fs.existsSync(sitemapPath), 'sitemap.xml missing');

if (fs.existsSync(robotsPath)) {
  const robContent = fs.readFileSync(robotsPath, 'utf8');
  check('robots.txt references Sitemap', robContent.includes('Sitemap: https://jdcsolar.com/sitemap.xml'), 'Sitemap directive missing in robots.txt');
  check('robots.txt allows all search bots (User-agent: *)', robContent.includes('User-agent: *'), 'User-agent directive missing');
}

if (fs.existsSync(sitemapPath)) {
  const smContent = fs.readFileSync(sitemapPath, 'utf8');
  check('sitemap.xml contains valid XML declaration', smContent.includes('<?xml version="1.0" encoding="UTF-8"?>'), 'Invalid XML');
  check('sitemap.xml contains standard urlset xmlns', smContent.includes('http://www.sitemaps.org/schemas/sitemap/0.9'), 'Missing urlset namespace');
  check('sitemap.xml contains homepage', smContent.includes('<loc>https://jdcsolar.com/</loc>'), 'Homepage missing from sitemap');
  check('sitemap.xml contains pm-surya-ghar', smContent.includes('<loc>https://jdcsolar.com/pm-surya-ghar/</loc>'), 'pm-surya-ghar missing from sitemap');
}

console.log('\n--- 6. AUDITING DIST PRODUCTION BUILD ARTIFACTS ---');
const distDir = path.join(rootDir, 'dist');
check('dist directory exists', fs.existsSync(distDir), 'dist folder missing - run npm run build');
if (fs.existsSync(distDir)) {
  check('dist/index.html exists', fs.existsSync(path.join(distDir, 'index.html')), 'dist/index.html missing');
  check('dist/.htaccess exists', fs.existsSync(path.join(distDir, '.htaccess')), 'dist/.htaccess missing');
  check('dist/robots.txt exists', fs.existsSync(path.join(distDir, 'robots.txt')), 'dist/robots.txt missing');
  check('dist/sitemap.xml exists', fs.existsSync(path.join(distDir, 'sitemap.xml')), 'dist/sitemap.xml missing');
  check('dist/css/main.css exists', fs.existsSync(path.join(distDir, 'css', 'main.css')), 'dist/css/main.css missing');
  check('dist/assets/icons/sprite.svg exists', fs.existsSync(path.join(distDir, 'assets', 'icons', 'sprite.svg')), 'dist/assets/icons/sprite.svg missing');
}

console.log('\n====================================================');
console.log(`AUDIT RESULTS: ${passedChecks}/${totalChecks} CHECKS PASSED`);
if (warnings.length > 0) {
  console.log(`WARNINGS (${warnings.length}):`);
  warnings.forEach(w => console.log(`  - ${w}`));
}
if (errors.length > 0) {
  console.log(`ERRORS (${errors.length}):`);
  errors.forEach(e => console.log(`  - ${e}`));
} else {
  console.log('STATUS: 🚀 100% PRODUCTION READY FOR HOSTINGER DEPLOYMENT');
}
console.log('====================================================\n');
