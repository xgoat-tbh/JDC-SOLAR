import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = walk(path.join(__dirname, '../frontend'));

let updatedCount = 0;
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace drawer phone emoji with clean SVG
  content = content.replace(/📞 Call \+91 92346 11112/g, '<svg class="icon" style="margin-right: 6px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg> Call +91 92346 11112');

  // Replace floating badge emojis in hero
  content = content.replace(/<div style="width: 42px; height: 42px; border-radius: 50%; background: #FEF3C7; display: flex; align-items: center; justify-content: center; color: #F59E0B; font-size: 1.25rem;">\s*☀️\s*<\/div>/g, '<div style="width: 42px; height: 42px; border-radius: 50%; background: #FEF3C7; display: flex; align-items: center; justify-content: center; color: #F59E0B;"><svg class="icon" style="width: 22px; height: 22px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-sun"></use></svg></div>');

  content = content.replace(/<div style="width: 42px; height: 42px; border-radius: 50%; background: #D1FAE5; display: flex; align-items: center; justify-content: center; color: #10B981; font-size: 1.25rem;">\s*⚡\s*<\/div>/g, '<div style="width: 42px; height: 42px; border-radius: 50%; background: #D1FAE5; display: flex; align-items: center; justify-content: center; color: #10B981;"><svg class="icon" style="width: 22px; height: 22px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-solar-park"></use></svg></div>');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log('Cleaned emojis in:', path.relative(path.join(__dirname, '../frontend'), file));
  }
});

console.log(`Cleaned emojis across ${updatedCount} HTML files!`);
