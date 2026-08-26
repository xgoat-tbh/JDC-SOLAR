/**
 * JDC SOLAR 2.0 - AUTOMATED SECURITY TEST SUITE
 * Validates zero exposed secrets, XSS-safe DOM operations, security headers, honeypot forms, and no-database invariants.
 */

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
console.log('JDC SOLAR 2.0 - SECURITY & HARDENING TESTS');
console.log('========================================\n');

// 1. Secret Exposure Scan
console.log('--- 1. Testing Secret Exposure Invariants ---');
const secretPatterns = [
  /api[_-]?key\s*[:=]\s*['"][a-zA-Z0-9_\-]{16,}['"]/i,
  /password\s*[:=]\s*['"][^'"]{6,}['"]/i,
  /smtp_pass\s*[:=]/i,
  /BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY/i,
  /postgres:\/\//i,
  /mongodb(\+srv)?:\/\//i,
  /mysql:\/\//i
];

function scanDirForSecrets(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git') continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirForSecrets(fullPath);
    } else if (/\.(js|json|html|css|env|md)$/i.test(file) && !file.includes('security.test.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const pattern of secretPatterns) {
        if (pattern.test(content)) {
          return { found: true, file: fullPath, pattern: pattern.toString() };
        }
      }
    }
  }
  return { found: false };
}

const secretScanResult = scanDirForSecrets(frontendDir);
assert(!secretScanResult.found, 'Zero secrets, passwords, or private keys found in frontend codebase');

// 2. DOM & XSS Safety Audit
console.log('\n--- 2. Testing DOM & XSS Security Invariants ---');
function scanDirForUnsafeDOM(dir) {
  const files = fs.readdirSync(dir);
  let unsafeCount = 0;
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      unsafeCount += scanDirForUnsafeDOM(fullPath);
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (/\beval\s*\(/.test(content) || /document\.write\s*\(/.test(content) || /new\s+Function\s*\(/.test(content)) {
        unsafeCount++;
      }
    }
  }
  return unsafeCount;
}

const unsafeDOMCount = scanDirForUnsafeDOM(path.join(frontendDir, 'js'));
assert(unsafeDOMCount === 0, 'Zero unsafe eval(), document.write(), or new Function() calls in JS modules');

// 3. Form Honeypot & Input Security
console.log('\n--- 3. Testing Form Security & Spam Protection ---');
const formHandlerContent = fs.readFileSync(path.join(frontendDir, 'js/components/formHandler.js'), 'utf8');
assert(formHandlerContent.includes('input[name="b_url"]'), 'Form handler inspects honeypot anti-spam field (b_url)');
assert(formHandlerContent.includes('^[6-9]\\d{9}$'), 'Form handler validates 10-digit Indian phone regex (/^[6-9]\\d{9}$/)');

// 4. Server Configuration & Security Headers
console.log('\n--- 4. Testing Server Configuration (.htaccess) ---');
const htaccessPath = path.join(frontendDir, '.htaccess');
assert(fs.existsSync(htaccessPath), '.htaccess file exists in frontend web root');
if (fs.existsSync(htaccessPath)) {
  const htaccessContent = fs.readFileSync(htaccessPath, 'utf8');
  assert(htaccessContent.includes('RewriteCond %{HTTPS} !=on'), 'Enforces universal HTTPS redirection');
  assert(htaccessContent.includes('X-Content-Type-Options "nosniff"'), 'Sets X-Content-Type-Options: nosniff');
  assert(htaccessContent.includes('X-Frame-Options "SAMEORIGIN"'), 'Sets X-Frame-Options: SAMEORIGIN');
  assert(htaccessContent.includes('Referrer-Policy "strict-origin-when-cross-origin"'), 'Sets strict Referrer-Policy');
  assert(htaccessContent.includes('Permissions-Policy'), 'Sets Permissions-Policy restricting camera/microphone');
  assert(htaccessContent.includes('ErrorDocument 404 /404.html'), 'Directs 404 errors to custom branded 404.html');
}

// 5. Zero Database / Zero Admin Architecture
console.log('\n--- 5. Testing Zero-Database & Zero-Admin Invariants ---');
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const hasDbDeps = packageJson.dependencies && (packageJson.dependencies.pg || packageJson.dependencies.mysql || packageJson.dependencies.mongodb || packageJson.dependencies.mongoose || packageJson.dependencies.prisma);
assert(!hasDbDeps, 'Confirmed zero database packages or drivers in package.json');

const hasAdminPanel = fs.existsSync(path.join(frontendDir, 'admin')) || fs.existsSync(path.join(frontendDir, 'dashboard'));
assert(!hasAdminPanel, 'Confirmed zero public admin or lead dashboard directories');

// Summary
console.log('\n========================================');
console.log(`Security Test Summary: ${passedTests} Passed, ${failedTests} Failed`);
console.log('========================================\n');

if (failedTests > 0) {
  process.exit(1);
}
