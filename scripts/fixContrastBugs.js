import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '../frontend');

function getAllHtml(dir) {
  let list = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) list = list.concat(getAllHtml(full));
    else if (item.name.endsWith('.html')) list.push(full);
  }
  return list;
}

const files = getAllHtml(frontendDir);
let totalReplacements = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  
  content = content.replace(/(<(?:h1|h2|h3|h4|h5|h6)[^>]*style="[^"]*)color:\s*var\(--color-brand-primary\);?([^"]*")/g, '$1color: var(--color-text-headings);$2');

  
  content = content.replace(/(<a[^>]*style="[^"]*)color:\s*var\(--color-brand-primary\);?([^"]*")/g, '$1color: var(--color-brand-accent);$2');

  
  content = content.replace(/(<(?:strong|span|div)[^>]*style="[^"]*)color:\s*var\(--color-brand-primary\);?([^"]*")/g, '$1color: var(--color-text-headings);$2');

  
  content = content.replace(/<div class="subsidy-slab-pill" style="border: 2px solid #22C55E; background: #F0FDF4;">/g, '<div class="subsidy-slab-pill subsidy-slab-pill--popular">');
  content = content.replace(/<div class="subsidy-slab-pill__kw" style="color: #15803D; font-size: 1.15rem;">/g, '<div class="subsidy-slab-pill__kw" style="font-size: 1.15rem;">');

  
  content = content.replace(/color:\s*#0F172A;/g, 'color: var(--color-text-headings);');
  content = content.replace(/color:\s*#334155;/g, 'color: var(--color-text-primary);');
  content = content.replace(/color:\s*#1E293B;/g, 'color: var(--color-text-primary);');
  content = content.replace(/color:\s*#1B3766;/g, 'color: var(--color-text-headings);');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalReplacements++;
    console.log(`Fixed contrast bugs in: ${path.relative(frontendDir, file)}`);
  }
}

console.log(`Total HTML files updated: ${totalReplacements}`);
