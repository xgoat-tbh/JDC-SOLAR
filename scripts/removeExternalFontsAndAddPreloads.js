import fs from 'fs';
import path from 'path';

const frontendDir = path.resolve('frontend');

function findHtmlFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = findHtmlFiles(frontendDir);
let updated = 0;

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Remove Google Fonts preconnect and stylesheet links
  content = content.replace(
    /\s*<link\s+rel="preconnect"\s+href="https:\/\/fonts\.googleapis\.com"[^>]*>\s*/gi,
    '\n'
  );
  content = content.replace(
    /\s*<link\s+rel="preconnect"\s+href="https:\/\/fonts\.gstatic\.com"[^>]*>\s*/gi,
    '\n'
  );
  content = content.replace(
    /\s*<link\s+href="https:\/\/fonts\.googleapis\.com\/css2[^"]*"\s+rel="stylesheet"[^>]*>\s*/gi,
    '\n'
  );

  // Add self-hosted font preloads if not already present
  if (!content.includes('href="/assets/fonts/plus-jakarta-sans-latin.woff2"')) {
    const fontPreloads = `  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/plus-jakarta-sans-latin.woff2" crossorigin>\n  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/outfit-latin.woff2" crossorigin>\n`;
    content = content.replace(/(<link rel="stylesheet" href="\/css\/main\.css">)/, `${fontPreloads}  $1`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    updated++;
    console.log(`Updated ${path.relative(frontendDir, filePath)}`);
  }
}

console.log(`Finished: ${updated}/${htmlFiles.length} HTML files updated.`);
