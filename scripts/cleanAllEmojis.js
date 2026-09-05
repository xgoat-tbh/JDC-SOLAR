import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.resolve(__dirname, '..', 'frontend');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getFiles(frontendDir);

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  
  content = content.replace(
    /<div style="font-size: 1\.75rem;">📄<\/div>/g,
    `<div style="width: 44px; height: 44px; border-radius: var(--radius-lg); background: rgba(253, 129, 39, 0.1); border: 1px solid rgba(253, 129, 39, 0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg class="icon" style="width: 22px; height: 22px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-document"></use></svg></div>`
  );

  content = content.replace(
    /<div style="font-size: 1\.75rem;">🪪<\/div>/g,
    `<div style="width: 44px; height: 44px; border-radius: var(--radius-lg); background: rgba(253, 129, 39, 0.1); border: 1px solid rgba(253, 129, 39, 0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg class="icon" style="width: 22px; height: 22px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-id-card"></use></svg></div>`
  );

  content = content.replace(
    /<div style="font-size: 1\.75rem;">🏦<\/div>/g,
    `<div style="width: 44px; height: 44px; border-radius: var(--radius-lg); background: rgba(253, 129, 39, 0.1); border: 1px solid rgba(253, 129, 39, 0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg class="icon" style="width: 22px; height: 22px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-bank"></use></svg></div>`
  );

  content = content.replace(
    /<div style="font-size: 1\.75rem;">🏠<\/div>/g,
    `<div style="width: 44px; height: 44px; border-radius: var(--radius-lg); background: rgba(253, 129, 39, 0.1); border: 1px solid rgba(253, 129, 39, 0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg class="icon" style="width: 22px; height: 22px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-home"></use></svg></div>`
  );

  
  content = content.replace(
    /<strong>📌 Official Sizing Rule:<\/strong>/g,
    `<strong><svg class="icon" style="width: 15px; height: 15px; color: var(--color-brand-accent); vertical-align: -2px; margin-right: 4px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-info"></use></svg>Official Sizing Rule:</strong>`
  );

  content = content.replace(
    /🌐\s*PM Surya Ghar National Portal/g,
    `<svg class="icon" style="width: 15px; height: 15px; color: var(--color-brand-accent); margin-right: 4px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-globe"></use></svg> PM Surya Ghar National Portal`
  );

  content = content.replace(
    /🌐\s*Ministry of New &amp; Renewable Energy \(MNRE\)/g,
    `<svg class="icon" style="width: 15px; height: 15px; color: var(--color-brand-accent); margin-right: 4px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-globe"></use></svg> Ministry of New &amp; Renewable Energy (MNRE)`
  );

  content = content.replace(
    /🌐\s*Jharkhand Bijli Vitran Nigam Ltd \(JBVNL\)/g,
    `<svg class="icon" style="width: 15px; height: 15px; color: var(--color-brand-accent); margin-right: 4px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-globe"></use></svg> Jharkhand Bijli Vitran Nigam Ltd (JBVNL)`
  );

  
  content = content.replace(
    /<li>✔\s*<strong>/g,
    `<li><svg class="icon" style="width: 14px; height: 14px; color: var(--color-status-success); margin-right: 6px; flex-shrink: 0;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg><strong>`
  );

  
  content = content.replace(
    /<li>⚡\s*<strong>Monthly Generation:<\/strong>/g,
    `<li><svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent); margin-right: 6px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-lightning"></use></svg><strong>Monthly Generation:</strong>`
  );

  content = content.replace(
    /<li>📐\s*<strong>Roof Area Required:<\/strong>/g,
    `<li><svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent); margin-right: 6px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-ruler"></use></svg><strong>Roof Area Required:</strong>`
  );

  content = content.replace(
    /<li>💰\s*<strong>Annual Bill Savings:<\/strong>/g,
    `<li><svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent); margin-right: 6px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-currency-inr"></use></svg><strong>Annual Bill Savings:</strong>`
  );

  content = content.replace(
    /<li>🛡️\s*<strong>PM Surya Ghar Subsidy:<\/strong>/g,
    `<li><svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent); margin-right: 6px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-shield"></use></svg><strong>PM Surya Ghar Subsidy:</strong>`
  );

  
  content = content.replace(/☀️ A Jagatdhan/g, `A Jagatdhan`);
  content = content.replace(/📞\s*\+91/g, `+91`);
  content = content.replace(/✉️\s*info@/g, `info@`);
  content = content.replace(/☀️ 250 kWp/g, `250 kWp`);
  content = content.replace(/🏠 Residential/g, `Residential`);
  content = content.replace(/🏭 Commercial/g, `Commercial`);

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Cleaned emojis in:', path.relative(frontendDir, file));
  }
});
console.log('Emoji replacement complete.');
