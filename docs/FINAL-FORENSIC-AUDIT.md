# JDC SOLAR 2.0 — FINAL FORENSIC AUDIT REPORT

**Audit Date:** August 27, 2026  
**Audit Team:** 6 independent forensic auditors (Documentation, HTML/Route, JS/CSS, Security/Deployment, Data/Content, Calculator)  
**Audit Standard:** Read-only forensic inspection — zero modifications made  
**Codebase:** `d:/JDC solar/` (21 HTML pages, 23 JS modules, 30 CSS files, 8 JSON data stores, 71 specification documents)

---

## Executive Summary

**VERDICT: NOT PRODUCTION READY**

The JDC Solar 2.0 website is architecturally sound, well-engineered, and approximately 90% production-ready. However, forensic inspection uncovered **4 P0 critical launch blockers** and **5 P1 high-severity issues** that must be resolved before deployment to Hostinger.

The core technical stack (Vanilla JS, modular CSS, static HTML) is clean, secure, and performant. The primary failures are **content gaps** (3 empty article pages, 2 dummy PDFs), a **non-functional email backend** (Formspree placeholder), **exposed development scripts** in the production build, and **calculator input logic bugs**.

| Severity | Count | Status |
|:---|:---:|:---|
| **P0 — Critical (Launch Blockers)** | **4** | Must fix before deployment |
| **P1 — High** | **5** | Should fix before deployment |
| **P2 — Medium** | **13** | Fix post-launch acceptable |
| **P3 — Low** | **7** | Backlog |

---

## P0 Findings (Critical — Launch Blockers)

### P0-1: Three Resource Article Pages Have ZERO Body Content

**Files:**
- `resources/how-solar-rooftop-works/index.html` (Lines 187–228)
- `resources/commercial-solar-tax-benefits/index.html` (Lines 187–228)
- `resources/solar-maintenance-guide/index.html` (Lines 187–228)

**Evidence:** All three subpages define `<title>`, `<meta description>`, `<h1>`, JSON-LD `Article` structured data, and `BreadcrumbList` schema — but their `<main>` sections contain **only the hero banner** and close immediately. There is literally zero article body text, zero paragraphs, zero educational content.

**Impact:** Google will index these as **thin/empty pages** and may penalize the entire domain. Users clicking from the Resources hub will see an empty page. The JSON-LD `Article` schema claims content that does not exist — this is **structured data spam** under Google's guidelines.

**Severity:** LAUNCH BLOCKER — Either populate with real content or remove pages from sitemap and add `noindex`.

---

### P0-2: Formspree Email Endpoint Is a Non-Functional Placeholder

**Files:**
- `frontend/js/config.js:L15` — `formspreeEndpoint: 'https://formspree.io/f/placeholder'`
- `frontend/contact/index.html:L329` — `action="https://formspree.io/f/placeholder"`
- `frontend/index.html:L1297` — `action="https://formspree.io/f/placeholder"`

**Evidence:** The word `placeholder` is literally in the URL. The `formHandler.js:L94` code checks `if (endpoint && !endpoint.includes('placeholder'))` and silently skips the email dispatch. This means **zero email leads will be captured** — only WhatsApp redirects will fire.

**Impact:** JDC will have no email archive, no CSV export, no CRM record of any lead. If a user's WhatsApp redirect fails (no WhatsApp installed, desktop browser popup blocked), the lead is permanently lost.

**Severity:** LAUNCH BLOCKER — Requires a real Formspree form ID.

---

### P0-3: Python Development Scripts Deployed to Production Build

**Files:**
- `dist/fix_all.py` (4,891 bytes)
- `dist/fix_topbar.py` (2,815 bytes)
- Source: `frontend/fix_all.py`, `frontend/fix_topbar.py`

**Evidence:** The build script `scripts/build.js:L50` only excludes `components-preview.html`. Python files are copied directly into `dist/`. The `.htaccess` `<FilesMatch>` rule does NOT block `.py` files.

**Impact:** `https://jdcsolar.com/fix_all.py` and `https://jdcsolar.com/fix_topbar.py` will be **publicly downloadable**, exposing internal development tooling and file-path structure.

**Severity:** LAUNCH BLOCKER — Delete from `frontend/` and `dist/`, update build exclusions.

---

### P0-4: Downloadable PDF Brochures Are Dummy Placeholder Files

**Files:**
- `frontend/assets/docs/jdc-solar-company-brochure.pdf` — **34 bytes** (contains only `%PDF-1.4 sample JDC Solar Brochure`)
- `frontend/assets/docs/pm-surya-ghar-checklist.pdf` — **39 bytes** (contains only `%PDF-1.4 sample PM Surya Ghar Checklist`)
- Referenced in `resources.json:L49` as "2.4 MB" and `resources.json:L57` as "1.1 MB"

**Evidence:** Users clicking "Download Company Brochure" or "Download PM Surya Ghar Checklist" will receive a corrupt, unreadable text file. The JSON metadata falsely claims file sizes of 2.4 MB and 1.1 MB.

**Impact:** Immediate credibility damage. Users will assume the site is broken or fraudulent.

**Severity:** LAUNCH BLOCKER — Either provide real PDFs from JDC or remove download links entirely.

---

## P1 Findings (High)

### P1-1: Calculator Monthly Bill Input Is Silently Ignored

- `solar-calculator/index.html:L273` — `<input id="calc-units" value="360">`
- `calculatorUI.js:L55-56` — Both inputs read simultaneously
- `engine.js:L29-33` — Bill only used when units <= 0

**Evidence:** The units input defaults to `360`. When a user enters a value in the bill field, the engine still reads `monthlyUnits = 360` (> 0) and uses it, completely ignoring the bill amount.

**Impact:** A core user-facing feature — "enter your monthly bill to get a solar estimate" — does not work.

### P1-2: Calculator Engine Accepts NaN Without Validation

- `engine.js:L35` — `if (effectiveUnits <= 0)` fails for NaN because `NaN <= 0` is `false` in JavaScript.

**Impact:** Programmatic calls with NaN produce `isValid: true` with corrupt NaN outputs and ₹78,000 subsidy.

### P1-3: Homepage Project Data Contradicts projects.json

- Homepage Bokaro: **1.5 MWp** → `projects.json` Bokaro: **1.0 MWp**
- Homepage Sakchi: **75 kWp** → `projects.json` Sakchi: **100 kWp**

**Impact:** Inconsistent technical claims undermine engineering credibility.

### P1-4: Root sitemap.xml Is Outdated (14 URLs vs 19)

- Root `sitemap.xml` missing `/services/industrial-solar/` and all 3 resource guides.

**Impact:** If root sitemap is accidentally submitted to Google Search Console, 5 pages will not be indexed.

### P1-5: All Business Claims & Testimonials Are Unverified

- `500+ Solar Installations`, `25+ MW Capacity`, `Established 2018`, `MNRE Channel Partner`, `Khetan Partnership`, 4 named testimonials, 8 project case studies — all require **JDC CONFIRMATION**.

---

## P2 Findings (Medium) — 13 Issues

1. Calculator formatting missing `.toFixed(1)` for kWp, payback, CO2
2. Calculator results missing `aria-live="polite"` for screen readers
3. Calculator doesn't clear stale results on invalid/empty input
4. Industrial service type missing from calculator radio UI
5. Zero `@media print` styles across all 30 CSS files
6. 3 resource article pages missing `og:image` meta tag
7. `privacy-policy/index.html` lacks standard footer, mobile drawer, modal
8. Dead/orphaned JS code (counter.js, storage.js, dom.js exports)
9. 40+ hardcoded hex colors bypass design tokens
10. 22+ hardcoded font sizes bypass type scale tokens
11. Duplicate CSS selectors across component and page files
12. 4 separate scroll listeners instead of unified rAF loop
13. Rogue z-index values (9999, 10000) bypass token system

---

## P3 Findings (Low) — 7 Issues

1. `innerHTML` used for spinner in formHandler.js (safe but suboptimal)
2. Magic numbers without named constants
3. Unused CSS classes (.btn-fab, .media-wrap variants)
4. Google Fonts CDN loaded despite system font stack evolution
5. HSTS missing `preload` flag
6. Missing `Header unset X-Powered-By`
7. Project image naming inconsistency (ranchi project → sakchi filename)

---

## Security Status: STRONG (with one deployment defect)

- Zero exposed secrets, API keys, or credentials
- Zero XSS vectors, open redirects, or SQL injection
- Zero cookies, zero localStorage usage, zero analytics trackers
- Full CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy
- Honeypot anti-spam implemented and verified
- ONE DEFECT: Python scripts in dist/ (P0-3)

---

## Architecture Status: COMPLIANT

- Pure Vanilla HTML5 + CSS3 + ES6 Modules — zero framework creep
- Zero backend, zero database — static file serving only
- Compatible with all Hostinger hosting tiers
- Clean modular structure with proper separation of concerns

---

## Content Accuracy Status: PARTIALLY VERIFIED

- Contact information: 100% consistent across all files
- Subsidy values: Verified against MNRE 2024 guidelines
- Tariff rates: 16-state matrix verified against specification
- Business claims: UNVERIFIED — require JDC confirmation
- 3 article pages: EMPTY content
- 2 PDF brochures: DUMMY files

---

## Database/Backend Status: NO BACKEND REQUIRED — CONFIRMED

Zero database, zero server-side runtime, zero API endpoints. All content served as static files. This is architecturally correct for a solar EPC brochure/lead-gen website.

---

## Recommended Fix Order (Before Launch)

1. **P0-1:** Write content for 3 resource articles OR add `noindex` + remove from sitemap
2. **P0-2:** Register Formspree form and replace `placeholder` endpoint
3. **P0-3:** Delete Python scripts from `frontend/` and `dist/`; update `build.js` exclusions
4. **P0-4:** Provide real PDFs or remove download links
5. **P1-1:** Fix calculator bill/units input mutual exclusion
6. **P1-2:** Add `Number.isFinite()` guard to calculator engine
7. **P1-3:** Reconcile homepage project data with `projects.json`
8. **P1-5:** Obtain JDC sign-off on all business claims
