/**
 * JDC SOLAR 2.0 - AUTOMATED DATA INTEGRITY TEST SUITE
 * Validates all JSON source of truth data files for valid schema, unique IDs/slugs, and non-empty values.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');
const dataDir = path.resolve(rootDir, 'frontend/data');

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
console.log('JDC SOLAR 2.0 - DATA INTEGRITY TESTS');
console.log('========================================\n');

// 1. Projects Data Test
console.log('--- 1. Testing projects.json ---');
const projectsPath = path.join(dataDir, 'projects.json');
assert(fs.existsSync(projectsPath), 'projects.json exists');
if (fs.existsSync(projectsPath)) {
  const data = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  const projects = data.projects || data;
  assert(Array.isArray(projects) && projects.length >= 8, `projects.json contains ${projects.length} verified projects (>= 8 expected)`);
  
  const ids = new Set();
  let allValid = true;
  projects.forEach(p => {
    if (!p.id || !p.title || !p.capacityKw || !p.location || !p.category || !p.description) {
      allValid = false;
    }
    if (ids.has(p.id)) {
      allValid = false;
    }
    ids.add(p.id);
  });
  assert(allValid, 'All projects have unique IDs, titles, capacities, locations, categories, and descriptions');
}

// 2. Services Data Test
console.log('\n--- 2. Testing services.json ---');
const servicesPath = path.join(dataDir, 'services.json');
assert(fs.existsSync(servicesPath), 'services.json exists');
if (fs.existsSync(servicesPath)) {
  const data = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
  const services = data.services || data;
  assert(Array.isArray(services) && services.length >= 6, `services.json contains ${services.length} core solar services (>= 6 expected)`);
  
  let allValid = true;
  services.forEach(s => {
    if (!s.id || !s.title || !s.slug || !s.shortDescription) allValid = false;
  });
  assert(allValid, 'All services have valid IDs, titles, slugs, and descriptions');
}

// 3. Subsidies Data Test
console.log('\n--- 3. Testing subsidies.json ---');
const subsidiesPath = path.join(dataDir, 'subsidies.json');
assert(fs.existsSync(subsidiesPath), 'subsidies.json exists');
if (fs.existsSync(subsidiesPath)) {
  const subsidies = JSON.parse(fs.readFileSync(subsidiesPath, 'utf8'));
  assert(subsidies.schemeName === 'PM Surya Ghar: Muft Bijli Yojana', 'Scheme name matches official PM Surya Ghar');
  assert(subsidies.residentialSlabs && subsidies.residentialSlabs.length === 3, 'Contains exactly 3 official residential subsidy slabs (1kW, 2kW, 3kW+)');
  assert(subsidies.residentialSlabs[0].fixedSubsidy === 30000 && subsidies.residentialSlabs[1].fixedSubsidy === 60000 && subsidies.residentialSlabs[2].fixedSubsidy === 78000, 'Subsidy values match ₹30k, ₹60k, and ₹78k caps');
}

// 4. Resources Data Test
console.log('\n--- 4. Testing resources.json ---');
const resourcesPath = path.join(dataDir, 'resources.json');
assert(fs.existsSync(resourcesPath), 'resources.json exists');
if (fs.existsSync(resourcesPath)) {
  const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'));
  assert(resources.resources && resources.resources.length >= 3, `resources.json contains ${resources.resources.length} educational articles (>= 3 expected)`);
  assert(resources.downloads && resources.downloads.length >= 2, `resources.json contains ${resources.downloads.length} downloadable PDF assets (>= 2 expected)`);
}

// 5. FAQs Data Test
console.log('\n--- 5. Testing faqs.json ---');
const faqsPath = path.join(dataDir, 'faqs.json');
assert(fs.existsSync(faqsPath), 'faqs.json exists');
if (fs.existsSync(faqsPath)) {
  const data = JSON.parse(fs.readFileSync(faqsPath, 'utf8'));
  const faqs = data.faqs || data;
  assert(Array.isArray(faqs) && faqs.length >= 6, `faqs.json contains ${faqs.length} categorized FAQs (>= 6 expected)`);
}

// Summary
console.log('\n========================================');
console.log(`Data Integrity Summary: ${passedTests} Passed, ${failedTests} Failed`);
console.log('========================================\n');

if (failedTests > 0) {
  process.exit(1);
}
