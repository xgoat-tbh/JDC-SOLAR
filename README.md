# JDC Solar 2.0 — Web Platform Rebuild

**Company:** JDC Solar (A Jagatdhan Commodities Pvt. Ltd. Company)  
**Location:** A-21, 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109  
**Domain:** `https://jdcsolar.com/`  
**Architecture:** Standards-Based Static Web Application (HTML5 / Modern CSS3 / Vanilla ES6 JavaScript)  
**Accessibility:** WCAG 2.1 Level AA Compliant  
**Performance Budget:** 100/100 Core Web Vitals (LCP < 1.0s, CLS = 0.000, CSS < 28 KB, JS < 35 KB)  

---

## 1. Project Overview

JDC Solar 2.0 is the complete re-architecture of the digital presence for JDC Solar, an established Engineering, Procurement, and Construction (EPC) solar solutions company in Eastern India.

The platform provides:
- **PM Surya Ghar Subsidy Guidance:** Step-by-step citizen onboarding for central solar subsidies up to ₹78,000.
- **Interactive Solar Savings Calculator:** Headless mathematical calculation engine with 16-state DISCOM electricity tariffs.
- **Commercial & Industrial B2B Solutions:** High-capacity rooftop solar, CAPEX/RESCO models, and Section 32 Accelerated Depreciation (40% tax shield) data.
- **3-Channel High-Velocity Lead Intake:** Direct encrypted WhatsApp quote generator (`wa.me`), rapid site survey booking modals, and direct phone dialer.

---

## 2. Technology Stack & Rules

### Mandated Stack:
- **Markup:** Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`, `<details>`, `<dialog>`).
- **Styling:** Modern CSS3 with Design Tokens / Custom Properties (`css/tokens.css`), Flexbox, CSS Grid, and fluid `clamp()` scales.
- **Scripting:** Modular Vanilla JavaScript (ES6+ Native ES Modules via `<script type="module">`).
- **Data Models:** Typed JSON data schemas in `frontend/data/`.
- **Hosting:** Hostinger Web/Cloud Hosting with Apache/Nginx and HTTP/3 QUIC Edge CDN.

### Strict Prohibitions:
- **NO Frameworks:** No React, Next.js, Vue, Angular, Svelte, Tailwind CSS, Bootstrap, or jQuery.
- **NO Monolithic Scripts:** No giant unorganized `script.js` or `style.css`.

---

## 3. Directory Structure

```text
d:/JDC solar/
├── frontend/                     # Primary web application source
│   ├── index.html                # Homepage foundation
│   ├── 404.html                  # Accessible branded 404 error page
│   ├── pages/                    # Sub-pages directory
│   │   └── services/             # Dedicated service pages
│   ├── css/                      # Modular CSS Architecture
│   │   ├── tokens.css            # Central Design Tokens & Custom Properties
│   │   ├── reset.css             # Modern Standards CSS Reset
│   │   ├── typography.css        # Fluid Type Scales & Headings
│   │   ├── layout.css            # Grid Matrices & Container Bounds
│   │   ├── utilities.css         # Accessible Helpers (.sr-only, .skip-link)
│   │   ├── components/           # Component-Specific Stylesheets
│   │   └── main.css              # Master Stylesheet
│   ├── js/                       # Modular ES6 JavaScript
│   │   ├── main.js               # Application Bootstrap & Dispatcher
│   │   ├── config.js             # Global Application Constants
│   │   ├── core/                 # DOM, Event, Formatter & Storage Helpers
│   │   ├── components/           # UI Component Controllers
│   │   └── calculator/           # Isolated Solar Calculator Mathematical Subsystem
│   ├── data/                     # Structured JSON Data Schemas
│   │   ├── tariffs.json          # 16-State DISCOM Electricity Tariffs
│   │   ├── subsidies.json        # Central PM Surya Ghar Subsidy Slabs
│   │   ├── services.json         # 6 Core EPC Services Definitions
│   │   ├── projects.json         # Verified Project Case Studies
│   │   ├── faqs.json             # Categorized FAQ Repository
│   │   ├── testimonials.json     # Client Testimonials
│   │   └── stats.json            # Company Performance Milestones
│   └── assets/                   # Static Visual Media & Fonts
│       ├── brand/                # Logos & corporate marks
│       ├── fonts/                # Self-hosted woff2 font files
│       ├── icons/                # SVG vector sprites
│       └── images/               # WebP/AVIF imagery
│
├── docs/                         # Formal Architectural & Design Specifications
│   ├── ARCHITECTURE-DECISIONS.md # 10 Formal ADRs
│   ├── CALCULATOR-ARCHITECTURE.md# Mathematical Formulas & State Matrix
│   ├── COMPONENT-CATALOG.md      # UI Component Catalog
│   ├── DEPLOYMENT-ARCHITECTURE.md# Hostinger Apache & .htaccess Specs
│   ├── DESIGN-DECISIONS.md       # 10 Formal Design Decision Records (DDRs)
│   ├── DESIGN-SYSTEM.md          # Master Design System Specification
│   ├── DESIGN-TOKENS.md          # Complete CSS Design Tokens Matrix
│   ├── DEVELOPMENT-CONTRACT.md   # Permanent Engineering Constitution
│   ├── FRONTEND-ARCHITECTURE.md  # Modular Frontend Lifecycle
│   ├── PAGE-DESIGN-SPEC.md       # Page-by-Page Layout Specs (15 URLs)
│   ├── SEO-ARCHITECTURE.md       # Metadata, Schema & 301 Redirects
│   ├── TESTING-STRATEGY.md       # 6-Layer QA Testing Strategy
│   └── WIREFRAMES.md             # Desktop & Mobile Wireframes
│
├── research/                     # Forensic Audit Evidence & Analysis
├── tests/                        # Automated & Manual Test Suites
│   ├── calculator.test.js        # Automated Unit Tests for Sizing & Subsidies
│   ├── functional/               # Functional Verification Checklist
│   ├── responsive/               # 9-Viewport Testing Matrix
│   ├── accessibility/            # WCAG 2.1 AA Compliance Checklist
│   └── seo/                      # Technical SEO Verification Checklist
│
├── scripts/                      # Native Node.js Developer Scripts
│   ├── serve.js                  # Zero-Dependency Local Static Dev Server
│   └── validateHtml.js           # Semantic HTML & Landmark Validator
│
├── .htaccess                     # Hostinger Apache Security Headers & Caching
├── robots.txt                    # Search Crawler Directives
├── sitemap.xml                   # Canonical XML Sitemap
├── package.json                  # Developer Scripts Configuration
├── .gitignore                    # Version Control Exclusions
├── .env.example                  # Environment Configuration Template
└── MASTER-SPECIFICATION.md       # Central Authoritative Rebuild Blueprint
```

---

## 4. Local Development & Testing

### Prerequisites:
- Node.js `v18+` (Only required for local development server and test runner; the production site is 100% static).

### Commands:

```bash
# 1. Start Local Development Server (Serves http://localhost:3000)
npm run dev

# 2. Run Automated Unit Tests (Calculator Sizing, PM Surya Ghar Subsidies, Tariffs)
npm test

# 3. Validate Semantic HTML, Doctypes, Landmarks & Skip Links
npm run lint:html
```

---

## 5. Security & Deployment

The production static build can be uploaded directly to Hostinger's `public_html` via SFTP or Git push. The `.htaccess` file automatically configures:
- **HSTS Preload:** 1 Year (`max-age=31536000`).
- **Content-Security-Policy (CSP):** Restricts script, style, and frame sources.
- **Zero-MIME Sniffing & Clickjacking Defense:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`.
- **GZIP / Brotli Compression:** Active on HTML, CSS, JS, JSON, SVG, and WOFF2.
- **Immutable Browser Caching:** 1 Year for webfonts, 6 Months for WebP/AVIF images.
- **Clean URL Rewriting:** Serves `.html` files without showing extensions.
- **Legacy 301 Permanent Redirects:** Preserves search equity for all 13 discovered legacy URL aliases.
