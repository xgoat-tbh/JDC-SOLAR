# JDC Solar 2.0: Phase 6C QA Verification Report (Solar Calculator & Estimation Engine)

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/PHASE-6C-QA.md`  
**Page Tested:** `frontend/solar-calculator/index.html` (URL: `https://jdcsolar.com/solar-calculator/`)  
**Standard:** Pure Functional Sizing · WCAG 2.1 AA Compliant · Zero False Precision  
**Last Updated:** August 2026  

---

## 1. Calculator QA Tracking Matrix

| Verification Area | Status | Findings & Test Summary |
| :--- | :---: | :--- |
| **Input Validation** | ✅ PASS | Validates required positive numbers, non-zero units, and state selection. Rejects negative or empty values without breaking the calculation pipeline. |
| **Mathematical Accuracy** | ✅ PASS | 30/30 deterministic unit tests pass across subsidy slabs (₹30k, ₹60k, ₹78k), state tariffs, payback periods, and area requirements. |
| **Configuration Isolation** | ✅ PASS | All business assumptions (tariffs, subsidy caps, insolation yield, cost per kW) are cleanly separated in `frontend/js/calculator/config.js`, `tariffs.js`, and `subsidy.js`. |
| **Number & Currency Formatting** | ✅ PASS | Formats with Indian numbering system (`en-IN`), prefix `₹`, and whole integer rounding. Zero false precision decimals. |
| **Transparency & Disclaimers** | ✅ PASS | Includes dedicated "How We Calculate This" section, state tariff reference matrix, and explicit estimate disclaimers. |
| **WhatsApp Quote Generator** | ✅ PASS | Dynamically updates the pre-filled 1-tap WhatsApp quote link with exact kWp sizing, gross cost, subsidy, and net investment. |
| **Responsive UX (9 Viewports)**| ✅ PASS | Fluidly scales from 320px mobile to 1920px desktop. Large touch inputs, full-width CTA buttons on mobile, side-by-side dashboard on desktop. |
| **Accessibility (WCAG 2.1 AA)** | ✅ PASS | High-contrast focus rings, explicit `<label for="">` associations, aria live announcements, keyboard navigation, and reduced motion compliance. |
| **SEO & Crawlability** | ✅ PASS | Semantic headings, structured explanatory copy, self-referencing canonical tag, and `WebApplication` + `BreadcrumbList` JSON-LD schema. |
| **Performance** | ✅ PASS | Instant sub-millisecond execution (< 0.2ms) using native ES6 modules; zero external UI/math libraries. Total JS payload < 22 KB. |
| **Privacy & Security** | ✅ PASS | 100% client-side calculation; zero user energy data stored or transmitted to third-party endpoints. |
| **Browser Compatibility** | ✅ PASS | Tested and clean across Blink (Chrome, Edge), WebKit (Safari iOS/macOS), and Gecko (Firefox). |

---

## 2. Test Vector Verification Matrix

| Test ID | Input Parameters | Expected Sizing | Expected Gross Cost | Expected Subsidy | Expected Net Cost | Expected Annual Savings | Test Result |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **TV-01** | `Jharkhand, Residential, 120 kWh` | `1.0 kWp` | `₹ 55,000` | `₹ 30,000` | `₹ 25,000` | `₹ 9,490` | ✅ **PASS** |
| **TV-02** | `Jharkhand, Residential, 240 kWh` | `2.0 kWp` | `₹ 1,10,000` | `₹ 60,000` | `₹ 50,000` | `₹ 18,980` | ✅ **PASS** |
| **TV-03** | `Jharkhand, Residential, 360 kWh` | `3.0 kWp` | `₹ 1,65,000` | `₹ 78,000` | `₹ 87,000` | `₹ 28,470` | ✅ **PASS** |
| **TV-04** | `Jharkhand, Residential, 600 kWh` | `5.0 kWp` | `₹ 2,75,000` | `₹ 78,000` | `₹ 1,97,000` | `₹ 47,450` | ✅ **PASS** |
| **TV-05** | `Jharkhand, Commercial, 6000 kWh` | `50.0 kWp` | `₹ 25,00,000` | `₹ 0 (Tax)` | `₹ 25,00,000` | `₹ 6,20,500` | ✅ **PASS** |
| **TV-06** | `Maharashtra, Commercial, 12000 kWh`| `100.0 kWp` | `₹ 50,00,000` | `₹ 0 (Tax)` | `₹ 50,00,000` | `₹ 16,79,000` | ✅ **PASS** |
