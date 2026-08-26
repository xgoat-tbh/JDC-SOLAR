# JDC Solar: Complete Accessibility Forensic Audit (WCAG 2.1 AA)

**Audit Date:** August 2026  
**Auditor:** Lead Accessibility Specialist & WCAG Auditor  
**Standard:** Web Content Accessibility Guidelines (WCAG) 2.1 Level AA  
**Evidence Standard:** DIRECTLY OBSERVED & DOM-VERIFIED  

---

## 1. Executive Accessibility Findings

The current JDC Solar website contains extensive accessibility violations across semantic structure, heading hierarchy, image alternative text, keyboard navigation, and form labeling. The site would fail standard WCAG 2.1 AA compliance audits.

---

## 2. Granular Accessibility Evaluation

---

### 2.1 Semantic Structure & Landmark Roles
- **Current Observation:**
  - The website lacks proper HTML5 landmark regions (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`).
  - Most pages are rendered inside generic Elementor `<div>` containers with class names like `.elementor-section` and `.e-con`.
  - Screen readers cannot quickly jump between navigation, main content, and footer regions.
- **Severity:** High
- **Rebuild Requirement:** Wrap all page sections in native semantic landmarks (`<header>`, `<nav aria-label="Main">`, `<main id="main-content">`, `<footer role="contentinfo">`). Include a visible "Skip to Main Content" link at the top of every page.

---

### 2.2 Heading Hierarchy & Structure
- **Current Observation:**
  - **Missing H1 Headings:** On `/about/`, `/services/`, `/project/`, `/team/`, `/solar-calculator/`, and `/contact/`, there is **ZERO** `<h1>` tag present in the DOM!
  - **Improper H1 on Homepage:** The only `<h1>` on the Homepage is a hidden/generic text `"Home"`.
  - **Heading Level Skipping:** Subtitles and section tags jump directly from non-existent H1s to H2s, H3s, and H5s without intermediate levels.
  - **Heading Tag Abuse:** Decorative elements and footer copyright notices are marked up as `<h2>` tags (e.g. `<h2>© 2026 JDC Solar...</h2>` and `<h2>Quick Links</h2>`).
- **Severity:** Critical
- **Rebuild Requirement:** Enforce a strict single-H1 per page rule containing descriptive keywords, followed by logically nested H2s and H3s. Disallow `<h1>`-`<h6>` tags for purely decorative or utility footer text.

---

### 2.3 Image Alternative Text (Alt Text Audit)
- **Current Observation:**
  - **Homepage:** 16 out of 20 images (80.0%) have completely empty `alt=""` attributes.
  - **About Us:** 6 out of 6 images (100.0%) have missing alt text.
  - **Services:** 9 out of 9 images (100.0%) have missing alt text.
  - **Projects:** 3 out of 3 images (100.0%) have missing alt text.
  - **Solar Calculator:** 3 out of 3 images (100.0%) have missing alt text.
  - **Contact Us:** 3 out of 3 images (100.0%) have missing alt text.
  - Screen readers announce `"graphic"` or read the raw unformatted URL for all major graphics.
- **Severity:** Critical
- **Rebuild Requirement:** Every informative image must have meaningful, context-rich `alt` descriptions (e.g., `alt="3kW residential rooftop solar panel installation in Ranchi, Jharkhand"`). Decorative graphics must have explicit `alt="" aria-hidden="true"`.

---

### 2.4 Form Accessibility & Input Labels
- **Current Observation:**
  - **Contact Form (`/contact/`):** Inputs (`Name`, `Email`, `Message`) lack associated `<label for="...">` tags. They rely solely on `placeholder` attributes, which disappear when users type and fail contrast standards.
  - **Solar Calculator (`/solar-calculator/`):** Inputs (`#units`, `#load`, `#service`, `#state`) lack explicit `<label>` bindings or `aria-labelledby` associations.
  - Error messages use disruptive JavaScript `alert()` dialogs rather than inline `aria-live="polite"` feedback.
- **Severity:** High
- **Rebuild Requirement:** Every input must have a visible `<label>` explicitly tied via `for="id"`. Inline accessible error validation with `aria-describedby` and `aria-invalid="true"`.

---

### 2.5 Keyboard Navigation & Focus Management
- **Current Observation:**
  - Elementor global stylesheet removes browser default focus outlines (`outline: none`) without providing an accessible custom replacement.
  - Tabbing through the site makes the active element invisible to keyboard-only users.
  - Off-canvas mobile menu does not trap keyboard focus when open, allowing focus to escape into background content.
- **Severity:** High
- **Rebuild Requirement:** High-contrast visible focus rings (`outline: 2px solid #FD8127; outline-offset: 2px`). Accessible focus-trap library for mobile drawer and modal dialogs.

---

### 2.6 Color Contrast Ratios
- **Current Observation:**
  - Light gray text (`#888888`) on light gray background (`#E8E8E8`) yields a contrast ratio of **2.8:1**, failing WCAG AA minimum requirement of **4.5:1** for normal text.
  - White button text on orange `#FD8127` yields **2.9:1** contrast ratio, which is borderline for large text and fails for normal body text.
- **Severity:** Medium
- **Rebuild Requirement:** Darken muted text to `#555555` (yielding >7:1 contrast). Adjust accent button text or background to `#E06A14` to achieve >= 4.5:1 contrast against pure white.

---

### 2.7 Touch Targets & Motion Considerations
- **Current Observation:**
  - Header social icons and phone links have tap targets around `28px × 28px`, failing the WCAG 2.5.5 minimum target size of `44px × 44px` / `48px × 48px`.
  - Entrance animations (bounceIn, zoomIn, slideIn) trigger aggressively with no `@media (prefers-reduced-motion: reduce)` override.
- **Severity:** Medium
- **Rebuild Requirement:** Minimum 48px touch targets for all interactive buttons and links. Full support for `prefers-reduced-motion` disabling parallax and bouncy animations.
