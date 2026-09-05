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
let updatedCount = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. In index.html, ensure footer has brand logo
  if (file.endsWith('index.html') && !file.includes('about') && !file.includes('services') && !file.includes('projects') && !file.includes('resources') && !file.includes('contact') && !file.includes('privacy-policy') && !file.includes('pm-surya-ghar') && !file.includes('solar-calculator')) {
    const plainFooterTitle = /<div style="font-size: 1\.5rem; font-weight: 800; color: #FFFFFF; margin-bottom: 0\.75rem;">\s*JDC <span style="color: var\(--color-brand-accent\);">SOLAR<\/span>\s*<\/div>/;
    if (plainFooterTitle.test(content)) {
      content = content.replace(
        plainFooterTitle,
        `<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 0.75rem;">
            <img src="/assets/brand/logo-mark.png" alt="JDC Solar Logo" style="width: 40px; height: 40px; object-fit: contain;">
            <div style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF; line-height: 1;">JDC <span style="color: var(--color-brand-accent);">SOLAR</span></div>
          </div>`
      );
    }
  }

  // 2. Remove border-radius: 50% from footer logo and drawer logo
  content = content.replace(/border-radius:\s*50%;?/g, (match, offset, str) => {
    // Check if this border-radius is inside an img tag with JDC Solar
    const before = str.substring(Math.max(0, offset - 120), offset);
    if (before.includes('<img') && (before.includes('logo') || before.includes('brand'))) {
      return '';
    }
    return match;
  });

  // 3. Ensure consistent path /assets/brand/logo-mark.png
  content = content.replace(/\/assets\/images\/brand\/logo\.png/g, '/assets/brand/logo-mark.png');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`Cleaned footer and logo styles in: ${path.relative(frontendDir, file)}`);
  }
}

console.log(`Updated ${updatedCount} files.`);
