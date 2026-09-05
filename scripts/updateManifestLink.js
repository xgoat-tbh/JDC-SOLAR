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
  if (content.includes('rel="manifest"')) {
    continue;
  }

  // Find apple-touch-icon or favicon
  if (content.includes('rel="apple-touch-icon"')) {
    content = content.replace(
      /(<link rel="apple-touch-icon"[^>]*>)/,
      `$1\n  <link rel="manifest" href="/manifest.json">`
    );
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`Added manifest link to: ${path.relative(frontendDir, file)}`);
  }
}

console.log(`Updated manifest links across ${updatedCount} HTML files.`);
