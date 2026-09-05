import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_DIR = path.resolve(__dirname, '../frontend');

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = findHtmlFiles(FRONTEND_DIR);
let errors = 0;

console.log(`\nValidating ${htmlFiles.length} HTML files in ${FRONTEND_DIR}...\n`);

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(FRONTEND_DIR, file);
  const fileErrors = [];

  if (!content.includes('<!DOCTYPE html>')) {
    fileErrors.push('Missing <!DOCTYPE html>');
  }
  if (!content.includes('<html lang="en"')) {
    fileErrors.push('Missing <html lang="en"> attribute');
  }
  if (!content.includes('<meta name="viewport"')) {
    fileErrors.push('Missing viewport meta tag');
  }
  if (!content.includes('<title>')) {
    fileErrors.push('Missing <title> tag');
  }
  if (!content.includes('<a href="#main-content" class="skip-link"')) {
    fileErrors.push('Missing accessible skip link');
  }
  if (!content.includes('<main id="main-content"')) {
    fileErrors.push('Missing <main id="main-content"> landmark');
  }

  if (fileErrors.length === 0) {
    console.log(`  ✅ [PASS] ${relPath}`);
  } else {
    errors += fileErrors.length;
    console.error(`  ❌ [FAIL] ${relPath}`);
    fileErrors.forEach(err => console.error(`      - ${err}`));
  }
});

console.log(`\n========================================`);
console.log(`HTML Validation: ${htmlFiles.length - (errors > 0 ? 1 : 0)} Files Passed, ${errors} Errors`);
console.log(`========================================\n`);

if (errors > 0) {
  process.exit(1);
}
