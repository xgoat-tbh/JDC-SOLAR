# JDC Solar 2.0: Permanent Development Contract & Architectural Constitution

**Target Audience:** All Future Engineering Agents, Developers, and Contributors  
**Status:** MANDATORY & ENFORCEABLE  
**Project:** JDC Solar 2.0 Rebuild (`https://jdcsolar.com/`)  
**Parent Entity:** Jagatdhan Commodities Pvt. Ltd. (Adityapur, Jamshedpur, Jharkhand)  
**Standard:** WCAG 2.1 AA, 100/100 Lighthouse Performance, Zero-Bloat Standards-Based Architecture  

---

## 1. Project Identity & Purpose

JDC Solar is an established Engineering, Procurement, and Construction (EPC) solar solutions provider headquartered in Adityapur Industrial Area, Jamshedpur, Jharkhand. The website represents the digital sales, educational, and customer acquisition engine for residential rooftop systems (PM Surya Ghar), commercial complexes, industrial plants, and utility-scale installations.

The primary objective of this project is to deliver a **sub-second, high-converting, accessible, and mathematically precise web platform** that preserves the legitimate business identity of JDC Solar while eliminating all legacy WordPress/Elementor bloat, bugs, and UX friction.

---

## 2. Technology Mandates & Prohibitions

### 2.1 Permitted Technologies (MANDATORY STACK)
- **Markup:** Semantic, standards-compliant HTML5.
- **Styling:** Modern CSS3 utilizing CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, and responsive `clamp()` functions.
- **Scripting:** Modular Vanilla JavaScript (ES6+ Native ES Modules via `<script type="module">`).
- **Data:** Structured JSON schemas (`.json`) for decoupled content storage.
- **Assets:** WebP / AVIF next-gen raster formats and optimized SVGs for vectors/icons.
- **Fonts:** Self-hosted `woff2` webfonts (Poppins & Inter subsets only).

### 2.2 Strictly Prohibited Technologies (DO NOT INTRODUCE)
- **Frontend Frameworks:** NO React, Next.js, Vue, Nuxt, Angular, Svelte, or Solid.js.
- **CSS Frameworks & Preprocessors:** NO Tailwind CSS, Bootstrap, Bulma, Foundation, Sass, or Less.
- **Legacy JavaScript Libraries:** NO jQuery, jQuery UI, Lodash, Underscore, Moment.js, or Axios.
- **Heavy UI / Widget Libraries:** NO Elementor, Webpack runtime bundles, Heavy Chart.js, or complex 3D canvases.
- **Backend / Database Runtimes:** NO Node.js server runtimes, PHP frameworks, Express, Django, MySQL, MongoDB, or PostgreSQL for the core website.

---

## 3. Directory Structure & File Organization Rules

```text
d:/JDC solar/
├── frontend/                     # All source code for the website
│   ├── index.html                # Homepage (Root entry point)
│   ├── pages/                    # Sub-pages
│   │   ├── about.html            # About Us & Corporate Lineage
│   │   ├── services/             # Dedicated service pages
│   │   │   ├── index.html        # Services Hub
│   │   │   ├── residential.html  # Residential Rooftop Solar (PM Surya Ghar)
│   │   │   ├── commercial.html   # Commercial & Industrial Solar
│   │   │   ├── institutional.html# Health & Education Solar
│   │   │   ├── government.html   # Government & PSU Solar
│   │   │   ├── street-light.html # Solar Street Lighting
│   │   │   └── solar-parks.html  # Utility-Scale Solar Parks
│   │   ├── projects.html         # Filterable Project Case Study Explorer
│   │   ├── solar-calculator.html # Interactive Solar Savings & Subsidy Engine
│   │   ├── pm-surya-ghar.html    # PM Surya Ghar Yojana Resource Guide
│   │   ├── contact.html          # Contact Us & Site Survey Booking
│   │   ├── privacy-policy.html   # Legal & Data Governance Policy
│   │   └── 404.html              # Custom 404 Error Page
│   │
│   ├── css/                      # Modular CSS Architecture
│   │   ├── tokens.css            # Central Design Tokens & Custom Properties
│   │   ├── reset.css             # Modern CSS Reset & Box Sizing
│   │   ├── typography.css        # Fluid Type Scales & Font Face Rules
│   │   ├── layout.css            # Header, Footer, Grid & Container Styles
│   │   ├── utilities.css         # Helper classes (.sr-only, .text-center, etc.)
│   │   ├── components/           # Isolated Component Stylesheets
│   │   │   ├── header.css        # Sticky Header & Navigation
│   │   │   ├── drawer.css        # Mobile Navigation Drawer
│   │   │   ├── footer.css        # Footer & Quick Links
│   │   │   ├── button.css        # Buttons & Interactive Badges
│   │   │   ├── card.css          # Feature, Service, & Testimonial Cards
│   │   │   ├── project-card.css  # Project Portfolio & Filter Cards
│   │   │   ├── accordion.css     # FAQ Accordion Component
│   │   │   ├── calculator.css    # Calculator Form & Results Card
│   │   │   ├── modal.css         # Site Survey & Lead Capture Modals
│   │   │   ├── carousel.css      # Brand Ribbon & Review Sliders
│   │   │   └── toast.css         # Form Success/Error Toast Notifications
│   │   └── pages/                # Page-specific styling overrides (if needed)
│   │       ├── home.css
│   │       ├── calculator.css
│   │       └── projects.css
│   │
│   ├── js/                       # Modular JavaScript (ES Modules)
│   │   ├── main.js               # Application bootstrap & route dispatcher
│   │   ├── config.js             # Global application configuration
│   │   ├── core/                 # Core utilities
│   │   │   ├── dom.js            # DOM query, element creation & manipulation helpers
│   │   │   ├── events.js         # Event delegation & listener helpers
│   │   │   ├── formatters.js     # Currency (₹ INR), numbers, and unit formatting
│   │   │   └── storage.js        # Safe LocalStorage / SessionStorage wrappers
│   │   ├── components/           # UI Component Controllers
│   │   │   ├── navigation.js     # Header scroll behavior & mobile drawer
│   │   │   ├── accordion.js      # Accessible FAQ accordion handler
│   │   │   ├── modal.js          # Accessible dialog modal controller
│   │   │   ├── carousel.js       # Touch-enabled review & brand carousels
│   │   │   ├── projectFilter.js  # Category filtering for project gallery
│   │   │   ├── formHandler.js    # Form validation, honeypot & submission
│   │   │   ├── counter.js        # Viewport intersection stats counter
│   │   │   └── toast.js          # Notification banner controller
│   │   └── calculator/           # Solar Calculator Subsystem (Isolated)
│   │       ├── engine.js         # Pure mathematical calculation functions
│   │       ├── subsidy.js        # PM Surya Ghar subsidy rule engine
│   │       ├── tariffs.js        # State DISCOM electricity tariff tables
│   │       ├── controller.js     # Calculator UI event handler & state binding
│   │       └── quoteGenerator.js # WhatsApp payload & PDF quote generator
│   │
│   ├── data/                     # Structured JSON Data Sources
│   │   ├── tariffs.json          # State electricity tariffs (JBVNL, TSUISL, etc.)
│   │   ├── subsidies.json        # Central PM Surya Ghar & state subsidy slabs
│   │   ├── services.json         # Complete 6 service definitions & specs
│   │   ├── projects.json         # Verified project case studies & metrics
│   │   ├── faqs.json             # Categorized FAQ repository
│   │   ├── testimonials.json     # Verified client reviews
│   │   └── stats.json            # Verified company milestones
│   │
│   └── assets/                   # Static Visual Media & Fonts
│       ├── fonts/                # Self-hosted woff2 files (Poppins, Inter)
│       ├── images/               # WebP/AVIF imagery organized by section
│       │   ├── brand/            # Logos, favicons, corporate marks
│       │   ├── hero/             # Hero banners & illustrations
│       │   ├── services/         # Service category graphics
│       │   ├── projects/         # Real installation photography
│       │   └── partners/         # Component OEM logos (Waaree, Tata, etc.)
│       └── icons/                # Inline / external SVG sprite symbols
│
├── docs/                         # Architecture Documentation & Specifications
├── research/                     # Forensic Audit Evidence & Analysis
├── tests/                        # Automated & Manual QA Test Suites
├── dist/                         # Compiled / Optimized Deployment Package
└── .htaccess                     # Hostinger Apache Security & Caching Rules
```

### 3.3 Strict Placement Rules
- **HTML:** Belongs exclusively in `frontend/` and `frontend/pages/`. No inline `<style>` or `<script>` tags allowed.
- **CSS:** Belongs exclusively in `frontend/css/`. Must use CSS tokens defined in `tokens.css`.
- **JS:** Belongs exclusively in `frontend/js/`. All files must be ES modules (`import`/`export`).
- **Data:** Belongs in `frontend/data/`. Never hardcode repetitive data structures directly into HTML tables or lists.

---

## 4. Coding & Implementation Rules

### 4.1 HTML & Markup Rules
1. **Semantic Landmarks:** Every page MUST contain `<header role="banner">`, `<nav aria-label="Main Navigation">`, `<main id="main-content">`, and `<footer role="contentinfo">`.
2. **Strict Heading Hierarchy:** Exactly ONE `<h1>` per page. Subsequent sections must follow sequential order (`<h2>` -> `<h3>` -> `<h4>`). Never skip heading levels. Never use heading tags (`<h1>`-`<h6>`) for decorative text, badges, or footer copyright notices.
3. **Skip to Content:** Every page must include an accessible `<a href="#main-content" class="skip-link sr-only focus:not-sr-only">Skip to main content</a>` as the first child of `<body>`.
4. **Image Dimensions & Optimization:** Every `<img>` tag MUST specify explicit `width` and `height` attributes to prevent CLS layout shifts, along with `loading="lazy"` (except above-the-fold hero images which MUST use `loading="eager"` and `fetchpriority="high"`).

### 4.2 CSS & Design Token Rules
1. **Token Adherence:** Never use arbitrary hardcoded hex colors or pixel spacings. All colors, spacing, radius, fonts, and shadows MUST reference CSS variables from `tokens.css` (e.g., `var(--color-primary-navy)`, `var(--space-md)`).
2. **Zero `!important` Policy:** The use of `!important` is strictly prohibited. Resolve specificity through clean, low-specificity class architecture.
3. **Fluid Typography & Spacing:** Use CSS `clamp()` for responsive font sizes and spacing (e.g. `font-size: clamp(1.75rem, 4vw, 2.75rem)`). Avoid fixed pixel font sizes on headlines.
4. **Mobile-First Media Queries:** Always author base styles for mobile viewports (`320px+`) and expand using `min-width` media queries (`@media (min-width: 768px)`, `@media (min-width: 1024px)`).
5. **Reduced Motion Support:** All CSS transitions and animations MUST be wrapped in or overridden by `@media (prefers-reduced-motion: reduce)` to disable motion for sensitive users.

### 4.3 JavaScript & Component Controller Rules
1. **Native ES Modules:** All scripts must use standard ES module imports and exports. Prohibit global variables (`window.myVar = ...`).
2. **Progressive Enhancement:** Core informational content (service descriptions, project listings, contact details, FAQ answers) must remain 100% readable even if JavaScript is disabled or fails to load.
3. **Event Delegation:** Use event delegation on parent containers rather than attaching dozens of individual event listeners to repeated DOM nodes.
4. **Zero Disruptive Alerts:** NEVER call `window.alert()`, `window.confirm()`, or `window.prompt()`. Form errors and notices must be rendered inline or via accessible toast elements.
5. **Sanitization:** All user inputs and query parameters must be sanitized before DOM injection to prevent Cross-Site Scripting (XSS). Use `textContent` instead of `innerHTML` whenever rendering user-provided strings.

---

## 5. Accessibility Mandates (WCAG 2.1 AA)

1. **Color Contrast:** All normal body text must maintain a minimum contrast ratio of **4.5:1** against its background. Large text (>= 24px or bold >= 18.5px) must maintain **3.0:1**.
2. **Visible Focus Rings:** Never suppress `:focus` or `:focus-visible` outlines. All interactive elements must show a high-contrast focus indicator (e.g., `outline: 2px solid var(--color-accent-orange); outline-offset: 2px;`).
3. **Alternative Text:** Every informative image must feature context-rich `alt` text describing the photo (e.g. `alt="5kW rooftop solar panel installation in Adityapur, Jamshedpur"`). Decorative graphics must have `alt="" aria-hidden="true"`.
4. **Accessible Forms:** Every `<input>`, `<select>`, and `<textarea>` MUST have an associated `<label>` connected via `for="[id]"`. Placeholders must NOT be used as label replacements. Errors must be announced via `aria-describedby` and `aria-live="polite"`.
5. **Touch Targets:** All interactive buttons, navigation links, and floating controls must have a minimum touch target area of **48px × 48px** on mobile devices.
6. **Focus Traps:** Mobile navigation drawers and modal dialogs must trap keyboard focus when active and close cleanly upon pressing the `Escape` key.

---

## 6. Search Engine Optimization (SEO) & Metadata Mandates

1. **Unique Metadata per Page:** Every single HTML page must feature a custom `<title>` (50–60 characters) adhering to the pattern: `[Page Name] | JDC Solar - Jharkhand Best Solar Company` and a unique `<meta name="description">` (140–155 characters).
2. **Canonical Links:** Every page must include an absolute self-referential `<link rel="canonical" href="https://jdcsolar.com/...">`.
3. **Structured Data (JSON-LD):**
   - Homepage: `LocalBusiness`, `SolarEnergyCompany`, `Organization`, and `FAQPage` schemas.
   - Services: `Service` and `BreadcrumbList` schemas.
   - Calculator: `WebApplication` and `HowTo` schemas.
4. **Social Sharing Metadata:** Complete OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and Twitter Card tags on every page with standard 1200×630px preview images.
5. **No Doorway Pages:** Prohibit creating duplicate city landing pages with copy-pasted text. Focus local SEO authority on genuine regional service hubs (Jamshedpur, Ranchi, Dhanbad, Adityapur).

---

## 7. Performance Budgets & Core Web Vitals

Every page MUST strictly satisfy the following performance budgets under simulated 4G mobile network throttling:

| Metric | Target Budget | Maximum Hard Limit |
| :--- | :---: | :---: |
| **Largest Contentful Paint (LCP)** | `< 1.0s` | `1.5s` |
| **First Contentful Paint (FCP)** | `< 0.7s` | `1.0s` |
| **Cumulative Layout Shift (CLS)** | `0.000` | `0.050` |
| **Interaction to Next Paint (INP)** | `< 50ms` | `100ms` |
| **Total Blocking Time (TBT)** | `0ms` | `50ms` |
| **Total CSS Payload (GZIP/Brotli)** | `< 10 KB` | `25 KB` |
| **Total JS Payload (GZIP/Brotli)** | `< 15 KB` | `35 KB` |
| **Total Initial Page Weight** | `< 200 KB` | `< 350 KB` |
| **Lighthouse Scores (All 4 Categories)** | **100 / 100** | **>= 98 / 100** |

---

## 8. Content Integrity & Anti-Hallucination Rules

### What Must NEVER Be Invented:
1. **NEVER Invent Business Offerings:** Do not add services that JDC does not provide (e.g. wind energy, nuclear consulting, crypto solar mining). Stick strictly to verified EPC solar categories.
2. **NEVER Invent Fake Testimonials / Reviews:** Do not generate fake quotes, fake client names, or fake Google 5-star ratings. Use verified testimonials from the audit or structured placeholders marked for client input.
3. **NEVER Invent Fake Corporate Statistics:** Do not invent claims like "10,000,000 installations" or "100 offices worldwide". Stick to verified audit figures (`500+ clients`, `25+ MW`).
4. **NEVER Invent Unsupported Solar Formulas:** Do not invent arbitrary subsidy formulas. Solar calculations must strictly adhere to the verified Central PM Surya Ghar slabs and official DISCOM tariffs documented in `docs/CALCULATOR-ARCHITECTURE.md`.
5. **NEVER Invent Dummy Latin Placeholder Copy:** Do not deploy "Lorem ipsum" or template filler names (like the legacy "Tasneem Bowen" and "Abdullah Bryant"). All copy must be professional, grammatically accurate English tailored to JDC Solar.

---

## 9. Safe Code Modification & Quality Assurance Checklist

Before marking ANY task, component, or page complete, future coding agents MUST execute and verify:
1. **W3C HTML Validation:** Zero syntax errors, unclosed tags, or obsolete attributes.
2. **CSS Custom Property Integrity:** Zero undefined `var(--...)` tokens.
3. **Keyboard Navigation Walkthrough:** Complete tab cycle from top to bottom with visible focus ring on every interactive element.
4. **9-Viewport Responsive Verification:** Tested at `320px`, `375px`, `390px`, `414px`, `768px`, `1024px`, `1280px`, `1440px`, and `1920px`.
5. **Zero Console Errors:** Zero unhandled JavaScript exceptions, network 404s, or mixed content warnings.
6. **Form Validation & Conversion Test:** Verified input formatting, WhatsApp link generation, and form submission payloads.

---

**END OF DEVELOPMENT CONTRACT**  
*This contract is permanently binding on all subsequent development phases.*
