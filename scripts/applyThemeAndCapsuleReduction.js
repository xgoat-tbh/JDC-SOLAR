import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '../frontend');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (item.name.endsWith('.html') && item.name !== '404.html' && item.name !== 'components-preview.html') {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(frontendDir);
console.log(`Auditing and updating ${htmlFiles.length} HTML pages...`);

const allowedPulseBadges = new Set([
  path.resolve(frontendDir, 'index.html'),
  path.resolve(frontendDir, 'pm-surya-ghar/index.html'),
  path.resolve(frontendDir, 'solar-calculator/index.html'),
  path.resolve(frontendDir, 'projects/index.html'),
  path.resolve(frontendDir, 'services/commercial-solar/index.html'),
  path.resolve(frontendDir, 'contact/index.html')
]);

const themeToggleBtn = `<button type="button" class="theme-toggle-btn" aria-label="Switch to light mode" title="Switch to light mode">
          <svg class="icon icon-sun" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-sun"></use></svg>
          <svg class="icon icon-moon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-moon"></use></svg>
        </button>`;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');

  
  content = content.replace(/<html\s+lang="en"\s+dir="ltr"[^>]*>/, '<html lang="en" dir="ltr" data-theme="dark">');

  
  content = content.replace(
    /<a href="\/" class="header__brand" aria-label="JDC Solar Homepage">[\s\S]*?<\/a>/,
    `<a href="/" class="header__brand" aria-label="JDC Solar Homepage">
        <img src="/assets/brand/logo-mark.png" alt="JDC Solar" class="header__logo-img" width="40" height="40">
        <div>
          <div class="header__logo-text">JDC <span>SOLAR</span></div>
          <span class="header__logo-tag">Engineering • EPC • Subsidies</span>
        </div>
      </a>`
  );

  
  if (!content.includes('class="theme-toggle-btn"')) {
    
    if (content.includes('class="header__actions"')) {
      content = content.replace(
        /<div class="header__actions">/,
        `<div class="header__actions flex gap-xs" style="align-items: center;">\n        ${themeToggleBtn}`
      );
    } else if (content.includes('class="header__actions hide-on-mobile"')) {
      content = content.replace(
        /<div class="header__actions hide-on-mobile">/,
        `<div class="header__actions hide-on-mobile flex gap-xs" style="align-items: center;">\n        ${themeToggleBtn}`
      );
    }
  }

  
  const drawerHeaderPattern = /<div class="drawer__header">[\s\S]*?<\/div>/;
  const newDrawerHeader = `<div class="drawer__header">
      <div class="flex gap-xs" style="align-items: center;">
        <img src="/assets/brand/logo-mark.png" alt="JDC Solar Logo" style="width: 32px; height: 32px; object-fit: contain;">
        <span style="font-size: 1.3rem; font-weight: 800; color: #FFFFFF;">JDC <span style="color: var(--color-brand-accent);">SOLAR</span></span>
      </div>
      <div class="flex gap-xs" style="align-items: center;">
        ${themeToggleBtn}
        <button type="button" class="drawer__close-btn" data-drawer-close aria-label="Close Navigation Menu">
          <svg class="icon" style="width: 24px; height: 24px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-close"></use></svg>
        </button>
      </div>
    </div>`;

  content = content.replace(drawerHeaderPattern, newDrawerHeader);

  
  const isAllowedFile = allowedPulseBadges.has(file);

  if (!isAllowedFile) {
    
    content = content.replace(/<div class="badge--saas-pulse"[^>]*>[\s\S]*?<span class="badge-pulse-dot">[\s\S]*?<\/span>\s*<span>(.*?)<\/span>\s*<\/div>/g, '<div class="section-tag" style="color: var(--color-brand-accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.8rem; margin-bottom: 0.5rem;">$1</div>');
  } else {
    
    let first = true;
    content = content.replace(/<div class="badge--saas-pulse"[^>]*>[\s\S]*?<span class="badge-pulse-dot">[\s\S]*?<\/span>\s*<span>(.*?)<\/span>\s*<\/div>/g, (match, p1) => {
      if (first) {
        first = false;
        return match; 
      }
      return `<div class="section-tag" style="color: var(--color-brand-accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.8rem; margin-bottom: 0.5rem;">${p1}</div>`;
    });
  }

  
  content = content.replace(/<div class="badge--saas-pulse"><span class="badge-pulse-dot">[\s\S]*?<\/span><span>(.*?)<\/span><\/div>/g, '<span class="badge badge--primary" style="font-size: 0.75rem;">$1</span>');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`  ✅ Processed: ${path.relative(frontendDir, file)}`);
}

console.log('\nAll pages updated with transparent logo, Theme Switcher, and reduced capsules!');
