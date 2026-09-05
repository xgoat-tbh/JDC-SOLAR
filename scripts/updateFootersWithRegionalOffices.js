import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.join(__dirname, '..', 'frontend');

const newFooterColumn = `        <div>
          <h3 class="footer__column-title">Regional Offices</h3>
          <div class="footer-contact">
            <div class="footer-branch-list">
              <div class="footer-branch-item">
                <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-location"></use></svg>
                <div><strong>Jharkhand (HQ):</strong> Adityapur, Jamshedpur – 832109</div>
              </div>
              <div class="footer-branch-item">
                <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-location"></use></svg>
                <div><strong>West Bengal:</strong> Baghajatin Colony, Kolkata – 700092</div>
              </div>
              <div class="footer-branch-item">
                <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-location"></use></svg>
                <div><strong>Odisha:</strong> Naharakanta, Bhubaneswar – 752101</div>
              </div>
            </div>
            <div class="footer-contact__item">
              <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg>
              <a href="tel:+919234611112">+91 92346 11112</a>
            </div>
            <div class="footer-contact__item">
              <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-whatsapp"></use></svg>
              <a href="https://wa.me/919288381112" target="_blank" rel="noopener noreferrer">+91 92883 81112 (WhatsApp)</a>
            </div>
            <div class="footer-contact__item">
              <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-email"></use></svg>
              <a href="mailto:sales@jdcsolar.com">sales@jdcsolar.com</a>
            </div>
          </div>
        </div>`;

function updateHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Match the Headquarters footer column
  const pattern = /<div>\s*<h3 class="footer__column-title">Headquarters<\/h3>\s*<div class="footer-contact">[\s\S]*?<\/div>\s*<\/div>/;

  if (pattern.test(content)) {
    content = content.replace(pattern, newFooterColumn);
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function walkDir(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += walkDir(fullPath);
    } else if (entry.name.endsWith('.html')) {
      if (updateHtmlFile(fullPath)) {
        console.log(`✓ Updated footer in: ${path.relative(frontendDir, fullPath)}`);
        count++;
      }
    }
  }
  return count;
}

console.log('----------------------------------------------------');
console.log('UPDATING GLOBAL FOOTER REGIONAL OFFICES ACROSS HTML PAGES');
console.log('----------------------------------------------------');
const total = walkDir(frontendDir);
console.log(`Total HTML files updated: ${total}`);
console.log('----------------------------------------------------');
