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
    } else if (item.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(frontendDir);
console.log(`Found ${htmlFiles.length} HTML files to update with the official JDC Solar logo.`);

let updatedCount = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  
  const headerBrandPattern = /<a href="\/" class="header__brand" aria-label="JDC Solar Homepage">[\s\S]*?<\/a>/g;
  const newHeaderBrand = `<a href="/" class="header__brand" aria-label="JDC Solar Homepage">
        <img src="/assets/images/brand/logo.png" alt="JDC Solar" class="header__logo-img" width="42" height="42">
        <div>
          <div class="header__logo-text">JDC <span>SOLAR</span></div>
          <span class="header__logo-tag">Engineering • EPC • Subsidies</span>
        </div>
      </a>`;

  content = content.replace(headerBrandPattern, newHeaderBrand);

  
  const drawerHeaderPattern = /<div class="drawer__header">\s*<span style="font-size: 1\.4rem; font-weight: 800; color: #FFFFFF;">JDC <span style="color: var\(--color-brand-accent\);">SOLAR<\/span><\/span>/g;
  const newDrawerHeader = `<div class="drawer__header">
      <div class="flex gap-xs" style="align-items: center;">
        <img src="/assets/images/brand/logo.png" alt="JDC Solar" style="width: 36px; height: 36px; object-fit: contain; border-radius: 50%;">
        <span style="font-size: 1.4rem; font-weight: 800; color: #FFFFFF;">JDC <span style="color: var(--color-brand-accent);">SOLAR</span></span>
      </div>`;
  content = content.replace(drawerHeaderPattern, newDrawerHeader);

  
  const footerLogoPattern = /<div style="font-size: 1\.5rem; font-weight: 800; color: #FFFFFF; margin-bottom: 0\.75rem;">JDC <span style="color: var\(--color-brand-accent\);">SOLAR<\/span><\/div>/g;
  const newFooterLogo = `<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 0.75rem;">
            <img src="/assets/images/brand/logo.png" alt="JDC Solar Logo" style="width: 40px; height: 40px; object-fit: contain; border-radius: 50%;">
            <div style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF; line-height: 1;">JDC <span style="color: var(--color-brand-accent);">SOLAR</span></div>
          </div>`;
  content = content.replace(footerLogoPattern, newFooterLogo);

  
  const footerLogoPattern2 = /<div style="font-size: 1\.65rem; font-weight: 800; color: #FFFFFF; margin-bottom: 0\.5rem;">\s*JDC <span style="color: var\(--color-brand-accent\);">SOLAR<\/span>\s*<\/div>/g;
  content = content.replace(footerLogoPattern2, newFooterLogo);

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`  ✅ Updated brand logo in: ${path.relative(frontendDir, file)}`);
  }
}

console.log(`\nSuccessfully applied official logo across ${updatedCount} HTML files!`);
