import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');
const frontendDir = path.resolve(rootDir, 'frontend');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failedTests++;
  }
}

console.log('\n========================================');
console.log('JDC SOLAR 2.0 - AUTOMATED SEO TESTS');
console.log('========================================\n');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(frontendDir);
console.log(`Found ${htmlFiles.length} HTML files to inspect.\n`);

htmlFiles.forEach(filePath => {
  const relPath = path.relative(frontendDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');

  
  const hasTitle = /<title>[^<]+<\/title>/i.test(content);
  assert(hasTitle, `[${relPath}] Contains valid <title> tag`);

  
  const hasViewport = /<meta\s+name=["']viewport["']/i.test(content);
  assert(hasViewport, `[${relPath}] Contains responsive viewport meta tag`);

  
  const isUtilityPage = relPath === '404.html' || relPath === 'components-preview.html';
  if (isUtilityPage) {
    const hasNoIndex = /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(content);
    assert(hasNoIndex, `[${relPath}] Utility page correctly enforces noindex`);
  } else {
    const hasCanonical = /<link\s+rel=["']canonical["']\s+href=["']https:\/\/jdcsolar\.com\/[^"']*["']/i.test(content);
    assert(hasCanonical, `[${relPath}] Production page contains absolute HTTPS canonical tag`);
  }
});

console.log('\n========================================');
console.log(`SEO Test Summary: ${passedTests} Passed, ${failedTests} Failed`);
console.log('========================================\n');

if (failedTests > 0) {
  process.exit(1);
}
