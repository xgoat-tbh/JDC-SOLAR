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

  
  content = content.replace(
    /<div class="hero__eyebrow">[\s\S]*?<\/div>/g,
    `<div class="hero__eyebrow">
            <div class="badge--saas-pulse">
              <span class="badge-pulse-dot"><span class="badge-pulse-dot__ping"></span><span class="badge-pulse-dot__core"></span></span>
              <span>Jharkhand's Premier Solar EPC Partner</span>
            </div>
          </div>`
  );

  
  content = content.replace(
    /<span class="badge badge--accent badge--pulse">\s*([^<]+?)\s*<\/span>/g,
    (match, text) => {
      const cleanText = text.replace(/^[☀️⚡🏢💡🛡️\s]+/, '').trim();
      return `<div class="badge--saas-pulse"><span class="badge-pulse-dot"><span class="badge-pulse-dot__ping"></span><span class="badge-pulse-dot__core"></span></span><span>${cleanText}</span></div>`;
    }
  );

  content = content.replace(
    /<span class="badge badge--accent">\s*([^<]+?)\s*<\/span>/g,
    (match, text) => {
      const cleanText = text.replace(/^[☀️⚡🏢💡🛡️\s]+/, '').trim();
      return `<div class="badge--saas-pulse"><span class="badge-pulse-dot"><span class="badge-pulse-dot__ping"></span><span class="badge-pulse-dot__core"></span></span><span>${cleanText}</span></div>`;
    }
  );

  
  content = content.replace(/<span data-counter-target="500">500<\/span><span class="card-stat__suffix">\+<\/span>/g, '<span data-counter="500" data-counter-suffix="+">500+</span>');
  content = content.replace(/<span data-counter-target="25">25<\/span><span class="card-stat__suffix">\+ MW<\/span>/g, '<span data-counter="25" data-counter-suffix="+ MW">25+ MW</span>');
  content = content.replace(/<span data-counter-target="90">90<\/span><span class="card-stat__suffix">%<\/span>/g, '<span data-counter="90" data-counter-suffix="%">90%</span>');
  content = content.replace(/<span data-counter-target="25000">25,000<\/span><span class="card-stat__suffix">\+<\/span>/g, '<span data-counter="25000" data-counter-suffix="+">25,000+</span>');

  
  content = content.replace(/<section class="section bg-alt"/g, '<section class="section bg-atmospheric"');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log('Upgraded section badges in:', path.relative(path.join(__dirname, '../frontend'), file));
  }
});

console.log(`Successfully upgraded badges across ${updatedCount} HTML files!`);
