# JDC Solar 2.0: Quality Assurance & Testing Strategy

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**Objective:** Zero Defects, Complete Cross-Device Reliability & Verified WCAG 2.1 AA Compliance  
**Author:** Lead QA & Systems Architect  
**Last Updated:** August 2026  

---

## 1. Testing Framework & Philosophy

Testing in JDC Solar 2.0 is continuous and preventative. Every component, page, and calculation algorithm must pass a 6-layer validation gate prior to deployment:

```text
[Layer 1: Unit & Algorithm Tests] ──► Mathematical accuracy of calculator & subsidy rules
       │
[Layer 2: Markup & Standards QA]   ──► W3C HTML5 & CSS Custom Property validation
       │
[Layer 3: 9-Viewport Responsive]   ──► Visual regression & layout integrity (320px to 1920px)
       │
[Layer 4: Accessibility (a11y)]    ──► WCAG 2.1 AA keyboard, contrast & screen reader audits
       │
[Layer 5: Technical SEO QA]        ──► Schema.org JSON-LD, meta tags, canonicals, 301 redirects
       │
[Layer 6: Performance & CWV]       ──► Core Web Vitals (LCP < 1.0s, CLS = 0.000, INP < 50ms)
```

---

## 2. Layer 1: Calculator Unit Testing (`tests/calculator.test.js`)

The pure calculation pipeline (`calculator/engine.js`) must be validated against automated test suites covering all standard residential and commercial sizing scenarios:

```javascript
// Test Suite: Solar Sizing & PM Surya Ghar Subsidy Verification
import { calculateSolar } from '../frontend/js/calculator/engine.js';

const testCases = [
  {
    name: '1 kW Residential (Jharkhand)',
    input: { state: 'Jharkhand', serviceType: 'residential', monthlyUnits: 120 },
    expected: { systemSize: 1.0, grossCost: 55000, subsidy: 30000, netCost: 25000 }
  },
  {
    name: '2 kW Residential (Jharkhand)',
    input: { state: 'Jharkhand', serviceType: 'residential', monthlyUnits: 240 },
    expected: { systemSize: 2.0, grossCost: 110000, subsidy: 60000, netCost: 50000 }
  },
  {
    name: '3 kW Residential (Jharkhand)',
    input: { state: 'Jharkhand', serviceType: 'residential', monthlyUnits: 360 },
    expected: { systemSize: 3.0, grossCost: 165000, subsidy: 78000, netCost: 87000 }
  },
  {
    name: '5 kW Residential (Jharkhand - Capped Subsidy)',
    input: { state: 'Jharkhand', serviceType: 'residential', monthlyUnits: 600 },
    expected: { systemSize: 5.0, grossCost: 275000, subsidy: 78000, netCost: 197000 }
  },
  {
    name: '50 kW Commercial (Jharkhand - Zero Subsidy)',
    input: { state: 'Jharkhand', serviceType: 'commercial', monthlyUnits: 6000 },
    expected: { systemSize: 50.0, grossCost: 2500000, subsidy: 0, netCost: 2500000 }
  }
];

export function runCalculatorTests() {
  let passed = 0;
  testCases.forEach((tc, idx) => {
    const res = calculateSolar(tc.input);
    const pass = res.outputs.systemSize === tc.expected.systemSize &&
                 res.outputs.grossCost === tc.expected.grossCost &&
                 res.outputs.subsidy === tc.expected.subsidy &&
                 res.outputs.netCost === tc.expected.netCost;
    if (pass) {
      passed++;
      console.log(`✅ [PASS] ${tc.name}`);
    } else {
      console.error(`❌ [FAIL] ${tc.name}`, { expected: tc.expected, received: res.outputs });
    }
  });
  console.log(`Test Results: ${passed}/${testCases.length} Passed`);
}
```

---

## 3. Layer 2: Functional QA Matrix

| Feature | Action / Trigger | Expected Result | Pass Criteria |
| :--- | :--- | :--- | :--- |
| **Desktop Nav** | Click navigation links | Smooth scroll or immediate page load | Correct URL loaded; active link highlighted |
| **Mobile Drawer** | Tap hamburger toggle | Drawer slides out smoothly; backdrop blurs; focus trapped | Opens < 200ms; pressing ESC closes drawer |
| **Sticky Header** | Scroll down > 100px | Header smoothly transitions to compact 64px bar | Zero layout jump (CLS = 0.000); shadow visible |
| **Solar Calculator** | Change State / Units | Sizing, subsidy, net cost, savings update instantly | Sub-millisecond calculation; correct formatting |
| **WhatsApp Quote** | Click "Share on WhatsApp" | Opens `https://wa.me/...` with pre-filled quote | Message includes kW size, city, cost, and name |
| **Site Survey Form** | Submit valid 10-digit mobile | Success toast triggers; input resets; lead dispatched | Clean error feedback if invalid phone number |
| **FAQ Accordion** | Click question header | Expands answer; collapses other open items (optional) | Height animation smooth; ARIA expanded toggles |
| **Project Filter** | Click "Commercial" pill | Hides residential cards; displays commercial cards | Instant filtering with fade transition |
| **Scroll-to-Top** | Scroll > 300px & click | Smoothly scrolls viewport to window top | FAB fades in smoothly; accessible button label |

---

## 4. Layer 3: 9-Viewport Responsive Test Matrix

Every page layout must be visually validated across 9 physical screen viewports:

| Viewport Width | Representative Device | Critical Elements to Inspect |
| :---: | :--- | :--- |
| **320px** | iPhone SE (1st Gen) | Verify zero horizontal scroll; hero text wraps cleanly; calculator form inputs have >= 12px padding. |
| **375px** | iPhone 12/13 Mini | Verify sticky header does not exceed 56px; floating FAB does not obscure footer links. |
| **390px** | iPhone 14 / 15 / 16 | Verify bottom mobile action bar (Call / WhatsApp) is pinned and accessible. |
| **414px** | iPhone 8 Plus / 11 Pro Max | Verify 2-column card layouts stack or format gracefully without excessive whitespace. |
| **768px** | iPad (Portrait) | Verify 2-column grid transitions; calculator displays 2-column side-by-side card layout. |
| **1024px** | iPad (Landscape) | Verify desktop menu items do not collide or wrap into two lines before drawer triggers. |
| **1280px** | MacBook Air / Standard Laptop | Verify 1200px max-width container centering; crisp high-DPI hero graphics. |
| **1440px** | 1080p Desktop Monitor | Verify balanced whitespace; 3-column project and service cards; rich hover interactions. |
| **1920px** | Widescreen HD / 4K Display | Verify 1360px container containment; zero pixelation on SVG icons and photography. |

---

## 5. Layer 4: Accessibility (WCAG 2.1 AA) QA Checklist

- [ ] **Keyboard Navigation:** Entire website navigable using only `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape`.
- [ ] **Skip to Main Content:** Accessible link is first focusable element on every page.
- [ ] **Focus Indicator Visibility:** Visible 2px solid orange (`#FD8127`) focus ring with 2px offset on all active elements.
- [ ] **Color Contrast Standards:** All body text >= 4.5:1; all large text >= 3.0:1.
- [ ] **Form Label Bindings:** 100% of `<input>`, `<select>`, `<textarea>` elements have explicit matching `<label for="...">`.
- [ ] **Screen Reader Live Regions:** Calculator results container has `aria-live="polite"` to announce updated totals.
- [ ] **Modal Focus Trap:** Dialog traps tab focus while open; returns focus to trigger button upon close.
- [ ] **Image Alt Text:** Informative images have descriptive alt text; decorative graphics have `alt="" aria-hidden="true"`.
- [ ] **Touch Target Sizing:** All mobile buttons and links have touch hitboxes >= 48px × 48px.
- [ ] **Reduced Motion:** `@media (prefers-reduced-motion: reduce)` disables all non-essential CSS transitions and parallax animations.

---

## 6. Layer 5: Technical SEO QA Checklist

- [ ] **Heading Hierarchy:** Strictly 1 `<h1>` per page; logically nested `<h2>` and `<h3>` tags.
- [ ] **Metadata Uniqueness:** Custom `<title>` (50-60 chars) and `<meta description>` (140-155 chars) on all pages.
- [ ] **Canonical Tags:** Absolute self-referential `<link rel="canonical" href="...">` present on every page.
- [ ] **Schema Validation:** Zero warnings or errors on Google Rich Results Test for `LocalBusiness`, `FAQPage`, and `Service` JSON-LD graphs.
- [ ] **OpenGraph / Twitter:** Landscape 1200×630px social cards verified using Facebook Sharing Debugger and Twitter Card Validator.
- [ ] **Redirect Verification:** All 13 legacy URL aliases (e.g. `/about-us/`, `/calculator/`, `/project/`) return HTTP 301 to target destinations.
- [ ] **Clean URLs:** Clean slugs without `.html` extensions or query parameters.

---

## 7. Layer 6: Performance & Core Web Vitals Audit Gate

Validation executed under Chrome DevTools Mobile Network Throttling (Fast 3G / Slow 4G, 4x CPU Slowdown):

| Core Web Vital | Metric Definition | Target Score | Hard Rejection Gate |
| :--- | :--- | :---: | :---: |
| **LCP (Largest Contentful Paint)** | Time until primary hero image/text paints | `< 1.0s` | `> 1.5s` |
| **FCP (First Contentful Paint)** | Time until first DOM element renders | `< 0.7s` | `> 1.0s` |
| **CLS (Cumulative Layout Shift)** | Total unexpected layout movement | `0.000` | `> 0.050` |
| **INP (Interaction to Next Paint)** | Latency of user clicks, toggles, inputs | `< 50ms` | `> 100ms` |
| **TBT (Total Blocking Time)** | CPU time blocked by script execution | `0ms` | `> 50ms` |
| **Lighthouse Performance Score** | Overall Google performance rating | **100 / 100** | `< 98 / 100` |
| **Lighthouse Accessibility Score** | Overall Google accessibility rating | **100 / 100** | `< 100 / 100` |
| **Lighthouse SEO Score** | Overall Google SEO rating | **100 / 100** | `< 100 / 100` |

---

## 8. Cross-Browser Compatibility Matrix

| Browser Engine | Operating Systems | Verification Method |
| :--- | :--- | :--- |
| **Google Chrome (Blink)** | Windows 11, macOS, Android 13+ | Automated Headless Chrome + Manual Testing |
| **Microsoft Edge (Blink)** | Windows 10 / 11 | Manual Verification |
| **Mozilla Firefox (Gecko)** | Windows 11, macOS, Linux | Manual Verification |
| **Apple Safari (WebKit)** | macOS Sonoma, iOS 16 / 17 / 18 | Manual Device Testing + WebKit Web Inspector |
| **Android Chrome (Blink)** | Samsung OneUI, Google Pixel | Physical Device Testing |
| **iOS Safari (WebKit)** | iPhone 13 / 14 / 15 / 16 | Physical Device Testing |
