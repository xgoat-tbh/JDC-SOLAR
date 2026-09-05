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
    /<meta name="viewport" content="width=device-width, initial-scale=1.0">/g,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">'
  );
  fs.writeFileSync(file, content, 'utf8');
}
console.log(`Updated viewport-fit=cover on ${files.length} HTML files!`);
