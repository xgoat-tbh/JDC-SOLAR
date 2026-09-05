# JDC SOLAR 2.0 — FINAL SITE INVENTORY

**Generated:** August 27, 2026  
**Source:** Forensic audit of `d:/JDC solar/`

---

## Routes & Pages (21 Total)

| # | Route | File | Type | Indexable |
|:---:|:---|:---|:---|:---:|
| 1 | `/` | `frontend/index.html` | Homepage | Yes |
| 2 | `/about/` | `frontend/about/index.html` | About | Yes |
| 3 | `/services/` | `frontend/services/index.html` | Services Hub | Yes |
| 4 | `/services/residential-solar/` | `frontend/services/residential-solar/index.html` | Service Page | Yes |
| 5 | `/services/commercial-solar/` | `frontend/services/commercial-solar/index.html` | Service Page | Yes |
| 6 | `/services/industrial-solar/` | `frontend/services/industrial-solar/index.html` | Service Page | Yes |
| 7 | `/services/institutional-solar/` | `frontend/services/institutional-solar/index.html` | Service Page | Yes |
| 8 | `/services/government-solar/` | `frontend/services/government-solar/index.html` | Service Page | Yes |
| 9 | `/services/street-lights/` | `frontend/services/street-lights/index.html` | Service Page | Yes |
| 10 | `/services/solar-parks/` | `frontend/services/solar-parks/index.html` | Service Page | Yes |
| 11 | `/projects/` | `frontend/projects/index.html` | Portfolio | Yes |
| 12 | `/solar-calculator/` | `frontend/solar-calculator/index.html` | Calculator | Yes |
| 13 | `/pm-surya-ghar/` | `frontend/pm-surya-ghar/index.html` | Subsidy Guide | Yes |
| 14 | `/resources/` | `frontend/resources/index.html` | Resources Hub | Yes |
| 15 | `/resources/how-solar-rooftop-works/` | `frontend/resources/how-solar-rooftop-works/index.html` | Article (EMPTY) | Yes |
| 16 | `/resources/commercial-solar-tax-benefits/` | `frontend/resources/commercial-solar-tax-benefits/index.html` | Article (EMPTY) | Yes |
| 17 | `/resources/solar-maintenance-guide/` | `frontend/resources/solar-maintenance-guide/index.html` | Article (EMPTY) | Yes |
| 18 | `/contact/` | `frontend/contact/index.html` | Contact | Yes |
| 19 | `/privacy-policy/` | `frontend/privacy-policy/index.html` | Legal | Yes |
| 20 | `/404.html` | `frontend/404.html` | Error | No (noindex) |
| 21 | `/components-preview.html` | `frontend/components-preview.html` | QA Tool | No (noindex,nofollow) |

## JavaScript Modules (23 Files)

| File | Purpose |
|:---|:---|
| `js/main.js` | Entry point & lifecycle dispatcher |
| `js/config.js` | Global application configuration |
| `js/core/dom.js` | DOM query utilities (qs, qsa, sanitizeHTML) |
| `js/core/events.js` | Event delegation (on, throttle, debounce) |
| `js/core/formatters.js` | Indian number/currency formatting |
| `js/core/storage.js` | Safe localStorage wrapper (UNUSED) |
| `js/calculator/config.js` | Calculator benchmark constants |
| `js/calculator/engine.js` | Core mathematical calculation engine |
| `js/calculator/subsidy.js` | PM Surya Ghar subsidy slab engine |
| `js/calculator/tariffs.js` | 16-state DISCOM tariff matrix |
| `js/calculator/quoteGenerator.js` | WhatsApp quote URL builder |
| `js/components/accordion.js` | FAQ accordion expand/collapse |
| `js/components/calculatorUI.js` | Calculator DOM binding & rendering |
| `js/components/carousel.js` | Horizontal momentum carousel |
| `js/components/counter.js` | Animated stat counters (ORPHANED) |
| `js/components/formHandler.js` | Form validation & dual lead routing |
| `js/components/modal.js` | Dialog modal management |
| `js/components/navigation.js` | Header nav, drawer, scroll-to-top |
| `js/components/projectExplorer.js` | Project filtering & modal display |
| `js/components/resourceExplorer.js` | Resource search & filtering |
| `js/components/scrollAnimations.js` | Scroll reveal, horizontal jacking, counters |
| `js/components/tiltEffect.js` | Cursor-reactive 3D tilt on cards |
| `js/components/toast.js` | Toast notification system |

## CSS Files (30 Files)

| File | Purpose |
|:---|:---|
| `css/tokens.css` | Design system custom properties |
| `css/reset.css` | CSS reset / normalize |
| `css/typography.css` | Type scale definitions |
| `css/layout.css` | Grid, container, section layouts |
| `css/utilities.css` | Utility classes (.sr-only, .hidden, etc.) |
| `css/main.css` | Import aggregator |
| `css/base/animations.css` | Keyframes, scroll progress, reduced motion |
| `css/pages/home.css` | Homepage-specific styles |
| `css/components/*.css` | 22 component stylesheets |

## Data Sources (8 JSON Files)

| File | Records | Purpose |
|:---|:---:|:---|
| `data/projects.json` | 8 projects | Solar installation case studies |
| `data/services.json` | 6 services | EPC service verticals |
| `data/subsidies.json` | 3 slabs | PM Surya Ghar subsidy schedule |
| `data/faqs.json` | 6 FAQs | Categorized questions & answers |
| `data/resources.json` | 3 articles + 2 PDFs | Educational content & downloads |
| `data/stats.json` | 4 counters | Company milestone statistics |
| `data/tariffs.json` | 16 states | Electricity board tariff profiles |
| `data/testimonials.json` | 4 reviews | Customer testimonials |

## External Dependencies

| Dependency | Type | Purpose |
|:---|:---|:---|
| Google Fonts (fonts.googleapis.com) | CSS CDN | Font loading (may be redundant with system stack) |
| WhatsApp (wa.me) | Redirect | Lead delivery |
| Formspree (formspree.io) | API | Email lead dispatch (PLACEHOLDER) |
| Google Maps | External link | Office location navigation |

## Forms (2 Distinct)

| Form | Location | Action | Method |
|:---|:---|:---|:---|
| Contact/Survey Form | `contact/index.html:L329` | `https://formspree.io/f/placeholder` | POST |
| Global Modal Form | All pages (dialog) | JS intercepted → WhatsApp + Formspree | JS |

## Backend Status: NONE

Zero server-side runtime. Zero database. Zero API endpoints. 100% static file serving.

## Deployment Configuration

| Item | File | Status |
|:---|:---|:---|
| Production .htaccess | `frontend/.htaccess` | Active (92 lines) |
| robots.txt | `frontend/robots.txt` | Active (17 lines) |
| sitemap.xml | `frontend/sitemap.xml` | Active (19 URLs) |
| Build script | `scripts/build.js` | Copies frontend/ → dist/ |
| Production build | `dist/` | Generated (122 files) |
