# JDC Solar 2.0: Production Artifact Manifest & Inclusions

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/PRODUCTION-ARTIFACT-MANIFEST.md`  
**Build Source:** `scripts/build.js` -> `dist/`  
**Last Updated:** August 2026  

---

## 1. Production Package Directory Structure (`dist/`)

| File / Directory Path in `dist/` | Purpose | Required in Production? | Excluded from Production? |
| :--- | :--- | :---: | :---: |
| `index.html` | Production Homepage | ✅ **YES** | No |
| `about/index.html` | Corporate About Us Page | ✅ **YES** | No |
| `services/index.html` | Services Directory Hub | ✅ **YES** | No |
| `services/*/index.html` (7 pages) | Dedicated Service Deep-Dives | ✅ **YES** | No |
| `projects/index.html` | Projects & Case Studies Explorer | ✅ **YES** | No |
| `solar-calculator/index.html` | Solar Savings & Subsidy Calculator | ✅ **YES** | No |
| `pm-surya-ghar/index.html` | PM Surya Ghar Citizen Subsidy Guide | ✅ **YES** | No |
| `resources/index.html` | Resources & Knowledge Base Hub | ✅ **YES** | No |
| `resources/*/index.html` (3 guides)| Educational Technical Articles | ✅ **YES** | No |
| `contact/index.html` | Contact Us & Site Survey Form | ✅ **YES** | No |
| `privacy-policy/index.html` | Legal Data Protection Policy | ✅ **YES** | No |
| `404.html` | Accessible Branded 404 Error Page | ✅ **YES** | No |
| `.htaccess` | Apache / LiteSpeed Rewrites & Headers | ✅ **YES** | No |
| `robots.txt` | Search Spider Directives | ✅ **YES** | No |
| `sitemap.xml` | Authoritative Search Engine Sitemap | ✅ **YES** | No |
| `css/main.css` & `css/**/*` | Modular Tokenized Stylesheets | ✅ **YES** | No |
| `js/main.js` & `js/**/*` | Vanilla ES6 JavaScript Modules | ✅ **YES** | No |
| `assets/**/*` | Icons, Brand Logos, Document PDFs | ✅ **YES** | No |
| `data/*.json` (5 data files) | Single Source of Truth JSON Data | ✅ **YES** | No |
| `components-preview.html` | Design System Test Harness | ❌ **NO** | ✅ **EXCLUDED** |
| `node_modules/` | Development Dependencies | ❌ **NO** | ✅ **EXCLUDED** |
| `tests/` | Automated QA Suites | ❌ **NO** | ✅ **EXCLUDED** |
| `research/` & `docs/` | Internal Planning & Audit Docs | ❌ **NO** | ✅ **EXCLUDED** |
| `.git/` | Local Git Version Control Data | ❌ **NO** | ✅ **EXCLUDED** |
