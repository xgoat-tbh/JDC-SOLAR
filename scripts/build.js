/**
 * JDC SOLAR 2.0 - PRODUCTION BUILD & PACKAGING PIPELINE
 * Generates a clean, standalone deployment artifact in dist/ for Hostinger deployment.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');
const frontendDir = path.resolve(rootDir, 'frontend');
const distDir = path.resolve(rootDir, 'dist');

console.log('====================================================');
console.log('JDC SOLAR 2.0 - PRODUCTION BUILD & PACKAGING PIPELINE');
console.log('====================================================\n');

// 1. Clean and recreate dist/ directory
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist/ directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Recursive copy with production exclusions
function copyDirectory(src, dest, excludeList = []) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (excludeList.includes(entry.name)) {
      console.log(`  [EXCLUDED] ${entry.name}`);
      continue;
    }

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, excludeList);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Packaging production files from frontend/ to dist/...');
copyDirectory(frontendDir, distDir, ['components-preview.html']);

// 3. Verify essential production files in dist/
const requiredFiles = [
  'index.html',
  '404.html',
  '.htaccess',
  'robots.txt',
  'sitemap.xml',
  'css/main.css',
  'js/main.js',
  'assets/icons/sprite.svg',
  'data/projects.json',
  'data/services.json',
  'data/subsidies.json',
  'data/resources.json',
  'data/faqs.json'
];

console.log('\nVerifying production deployment integrity...');
let allFound = true;
requiredFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ [VERIFIED] ${file}`);
  } else {
    console.error(`  ❌ [MISSING] ${file}`);
    allFound = false;
  }
});

if (!allFound) {
  console.error('\nProduction build FAILED: Essential files missing in dist/');
  process.exit(1);
}

// 4. Calculate total distribution payload
function getDirectorySize(dir) {
  let size = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      size += getDirectorySize(fullPath);
    } else {
      size += fs.statSync(fullPath).size;
    }
  }
  return size;
}

const totalBytes = getDirectorySize(distDir);
const totalKb = (totalBytes / 1024).toFixed(2);

console.log('\n====================================================');
console.log(`BUILD SUCCESSFUL: Release package created in dist/`);
console.log(`Total Uncompressed Production Payload: ${totalKb} KB`);
console.log('Ready for direct upload to Hostinger public_html/');
console.log('====================================================\n');
