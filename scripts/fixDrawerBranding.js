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
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /style="font-size: 1\.3rem; font-weight: 800; color: #FFFFFF;"/g,
    'style="font-size: 1.3rem; font-weight: 800; color: var(--color-text-headings);"'
  );
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Fixed drawer header branding across all HTML files!');
