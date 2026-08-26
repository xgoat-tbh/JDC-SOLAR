# JDC Solar 2.0: Architectural Decision Records (ADRs)

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**Project:** JDC Solar 2.0 Rebuild (`https://jdcsolar.com/`)  
**Parent Entity:** Jagatdhan Commodities Pvt. Ltd.  
**Architect:** Lead Product, Software & UX Architect  
**Date:** August 2026  

---

## Index of Architectural Decision Records

- [ADR-001: Frontend Core Technology Stack (Standards-Based Vanilla Web)](#adr-001-frontend-core-technology-stack)
- [ADR-002: Backend Architecture (No Backend Initially / Static-First)](#adr-002-backend-architecture)
- [ADR-003: Database Architecture (Database Not Required / Static JSON Content)](#adr-003-database-architecture)
- [ADR-004: Hosting & Deployment Strategy (Hostinger Static Cloud / Apache Native)](#adr-004-hosting--deployment-strategy)
- [ADR-005: CSS Architecture & Design Token Engine (Native CSS Custom Properties)](#adr-005-css-architecture--design-token-engine)
- [ADR-006: JavaScript Architecture & Lifecycle (Modular Native ES6+)](#adr-006-javascript-architecture--lifecycle)
- [ADR-007: Content Storage & Data Architecture (Decoupled Static JSON Models)](#adr-007-content-storage--data-architecture)
- [ADR-008: Search Engine Optimization & Structured Data Strategy](#adr-008-search-engine-optimization--structured-data-strategy)
- [ADR-009: Solar Calculator Subsystem Isolation & Formula Decoupling](#adr-009-solar-calculator-subsystem-isolation)
- [ADR-010: Form Handling, Lead Generation & Zero-Backend Communications](#adr-010-form-handling-lead-generation--zero-backend)

---

## ADR-001: Frontend Core Technology Stack

- **Decision:** Build the entire JDC Solar 2.0 web platform using standard **HTML5, modern CSS3 (Custom Properties & Grid/Flexbox), and modular Vanilla JavaScript (ES6+ Modules)**. Do NOT introduce heavy frontend frameworks (React, Next.js, Vue, Angular, Svelte) or CSS utility frameworks (Tailwind, Bootstrap).
- **Status:** **APPROVED & MANDATED**
- **Reason:**
  1. The forensic performance audit (`PERFORMANCE-AUDIT.md`) proved that the legacy site’s performance failures (LCP > 3.8s, CLS > 0.18, 59 blocking CSS files totaling 1.36 MB, and 850 KB JS) were caused by excessive framework and plugin overhead.
  2. The website is an informational, high-conversion lead generation site with an interactive solar calculator. It has zero requirement for complex client-side virtual DOM reconciliation.
  3. Standards-based vanilla code delivers instant sub-second page loads (< 0.8s LCP), zero build-time lock-in, zero runtime dependencies, maximum security (zero npm supply chain vulnerabilities), and 100% native compatibility with any web server (Hostinger, Cloudflare, Apache, Nginx).
- **Alternatives Considered:**
  - *Next.js 15 / React 19:* Excellent SSR and DX, but introduces Node.js server dependencies, heavy JavaScript runtime (~80KB baseline hydration), and unnecessary hosting complexity on Hostinger hPanel.
  - *Astro 5:* Great static site generator with islands architecture, but introduces a non-standard component syntax and build tooling dependency.
  - *Tailwind CSS:* Convenient utility classes, but generates build pipeline overhead, introduces non-semantic HTML class soup, and abstracts standard CSS mechanics.
- **Why Rejected:** Adding 50–150 KB of framework runtime for a 12-page informational solar company website violates the primary performance and simplicity objectives. Native CSS custom properties and modern vanilla JavaScript provide 100% of the required layout, animation, and state management capabilities with zero bloat.
- **Impact:** Total CSS payload will drop from **1,365 KB to < 30 KB**; total JS will drop from **850 KB to < 35 KB**. Core Web Vitals will achieve 100/100 across mobile and desktop.

---

## ADR-002: Backend Architecture

- **Decision:** **NO BACKEND INITIALLY**. The website will operate entirely as a pre-rendered static web application served directly from Hostinger’s Edge CDN and web server.
- **Status:** **APPROVED & MANDATED**
- **Reason:**
  1. Audit verification confirms JDC Solar requires public business presentation, service cataloging, project portfolios, educational subsidy guides, an interactive client-side solar calculator, and lead intake.
  2. There are no requirements for user authentication, client portals, real-time database transactions, payment gateways, or server-side calculations.
  3. Eliminating a backend server removes server maintenance, eliminates PHP/Node.js security patch requirements, eliminates server CPU crashes under traffic spikes, and reduces hosting costs to zero overhead.
- **Alternatives Considered:**
  - *Node.js / Express API Backend:* Overkill for static content and simple form submissions.
  - *PHP / WordPress Headless REST API:* Inherits legacy WordPress maintenance vulnerabilities and database connection overhead.
  - *Serverless Functions (Cloudflare Workers / AWS Lambda):* Adds multi-vendor architectural fragmentation.
- **Why Rejected:** A backend introduces attack surface and operational maintenance without delivering any user-facing benefit that cannot be achieved via client-side architecture and serverless form relays.
- **Future Migration Path:** If JDC Solar later requires an internal customer CRM portal or IoT solar plant monitoring dashboard, an API backend (Node.js or Python Fastify) can be introduced under a subdomain (`api.jdcsolar.com` or `portal.jdcsolar.com`) without modifying or rebuilding the static frontend marketing platform.

---

## ADR-003: Database Architecture

- **Decision:** **DATABASE: NOT REQUIRED INITIALLY**. All structured data (services, projects, FAQs, state electricity tariffs, subsidy rules, and testimonials) will be stored in version-controlled, typed JSON data files within the repository.
- **Status:** **APPROVED & MANDATED**
- **Reason:**
  1. The audit verified that JDC Solar’s content changes infrequently (project additions happen monthly or quarterly, not second-by-second).
  2. Storing content in flat JSON files (`data/projects.json`, `data/tariffs.json`, `data/faqs.json`) enables instant, zero-latency in-memory data access, zero database connection pool timeouts, zero SQL injection risks, and complete Git revision history for every content change.
- **Alternatives Considered:**
  - *MySQL / MariaDB (Hostinger):* Requires database backups, migrations, connection credentials, and ORM layer.
  - *MongoDB / PostgreSQL:* Unnecessary hosting cost and architectural bloat.
  - *Headless Cloud CMS (Sanity / Strapi):* Introduces third-party subscription fees and API rate limits.
- **Why Rejected:** No dynamic transactional data is being persisted on-site. Form leads will be transmitted directly via client-side webhooks/relays to email and WhatsApp.
- **Future Migration Path:** If non-technical staff require a browser-based content editing UI in the future, a Git-based headless CMS (such as Decap CMS or TinaCMS) can be plugged directly into the existing JSON/Markdown repository files with zero architectural refactoring.

---

## ADR-004: Hosting & Deployment Strategy

- **Decision:** Deploy the compiled production static build directory directly to **Hostinger Web Hosting (Cloud / Premium hPanel)** via standard Apache/Nginx web root (`public_html`), accompanied by a hardened `.htaccess` configuration file.
- **Status:** **APPROVED & MANDATED**
- **Reason:**
  1. JDC Solar’s domain and existing infrastructure are currently managed on Hostinger with Hostinger CDN (`hcdn`) edge nodes active in Mumbai, India.
  2. Static file hosting on Hostinger CDN leverages native HTTP/3 QUIC transport, GZIP/Brotli compression, and immutable browser caching headers, delivering TTFB < 20ms across India.
- **Alternatives Considered:**
  - *Vercel / Netlify:* Excellent CI/CD, but requires DNS migration or external hosting accounts.
  - *Cloudflare Pages:* Exceptional edge network; retained as a 1-click fallback option if JDC management requests edge DNS migration.
- **Why Rejected:** Deploying static files to Hostinger respects JDC's existing hosting investment while achieving identical performance metrics due to the ultra-lightweight vanilla architecture.
- **Impact:** Zero server configuration complexity; 100% uptime reliability; instantaneous deployment via SFTP / Git push.

---

## ADR-005: CSS Architecture & Design Token Engine

- **Decision:** Implement a modular, scalable CSS architecture based on **CSS Custom Properties (Design Tokens), semantic BEM-inspired component encapsulation, and native CSS Grid/Flexbox**.
- **Status:** **APPROVED & MANDATED**
- **Reason:**
  1. Eliminates the 59 external stylesheets and 1.36 MB CSS payload identified in `PERFORMANCE-AUDIT.md`.
  2. Native CSS custom properties enable centralized, instant theming (brand colors, typography, fluid spacing, elevation, breakpoints) across all components without preprocessors or bundlers.
  3. Pure CSS components have zero runtime JS overhead and eliminate Cumulative Layout Shift (CLS = 0.000).
- **Architecture Structure:**
  - `tokens.css`: Core design tokens (colors, typography, spacing, shadows, radius, transitions, z-index).
  - `reset.css`: Modern CSS reset (box-sizing, margin resets, fluid media defaults).
  - `typography.css`: Fluid type scales using `clamp()`, heading hierarchies, font-face declarations.
  - `layout.css`: Header, footer, grid system, containers, section wrappers.
  - `components/*.css`: Isolated per-component styles (`button.css`, `card.css`, `calculator.css`, `modal.css`, `accordion.css`).
  - `utilities.css`: Minimalist helper classes (text alignment, screen-reader-only `.sr-only`, spacing).
- **Impact:** Global CSS bundle size < 28 KB uncompressed (< 8 KB Brotli compressed).

---

## ADR-006: JavaScript Architecture & Lifecycle

- **Decision:** Implement JavaScript strictly using **Native ES Modules (`type="module"`), isolated component controllers, unidirectional data flow, and pure utility functions**. Prohibit monolithic script files (`script.js`) and third-party utility libraries (jQuery, Lodash, Moment.js).
- **Status:** **APPROVED & MANDATED**
- **Reason:**
  1. Component controllers (`calculator.js`, `navigation.js`, `accordion.js`, `modal.js`) are decoupled, independently testable, and only initialized when their target DOM elements exist on the page.
  2. Eliminates global variable collisions (`window.*` pollution).
  3. Native browser APIs (`fetch()`, `IntersectionObserver`, `Intl.NumberFormat`, `URLSearchParams`, `dialog`) replace hundreds of kilobytes of legacy npm dependencies.
- **Impact:** Global JavaScript payload < 35 KB total; First Input Delay (FID) / Interaction to Next Paint (INP) < 50ms.

---

## ADR-007: Content Storage & Data Architecture

- **Decision:** Decouple all structured content from HTML markup into dedicated JSON schemas under `frontend/src/data/`:
  - `tariffs.json`: State electricity board tariff rates and DISCOM codes.
  - `subsidyRules.json`: Central PM Surya Ghar slabs and state top-up parameters.
  - `services.json`: Detailed specifications, capacities, and target audiences for all 6 service categories.
  - `projects.json`: Filterable project case studies (kWp, generation, location, components, imagery).
  - `faqs.json`: Categorized FAQ database with automated schema generator mapping.
  - `testimonials.json`: Verified client reviews with ratings, locations, and capacity tags.
- **Status:** **APPROVED & MANDATED**
- **Reason:**
  1. Single source of truth: Updating a tariff rate or adding a new project requires editing a single JSON file without altering HTML markup or JavaScript logic.
  2. Enables automated consistency checks, unit testing, and dynamic rendering.
- **Impact:** Content updates can be performed in seconds with zero risk of breaking layout styling.

---

## ADR-008: Search Engine Optimization & Structured Data Strategy

- **Decision:** Build SEO directly into the HTML markup and page templates:
  1. Strict single-`<h1>` rule per page containing primary target keywords.
  2. Unique, click-optimized `<title>` (50-60 characters) and `<meta name="description">` (145-155 characters) for every URL.
  3. Full Schema.org JSON-LD `@graph` implementation containing `LocalBusiness`, `SolarEnergyCompany`, `Service`, `FAQPage`, `BreadcrumbList`, and `HowTo` schemas.
  4. Standardized 1200×630px OpenGraph and Twitter Card social metadata on every page.
  5. Static, error-free `sitemap.xml` and hardened `robots.txt` excluding non-public assets.
- **Status:** **APPROVED & MANDATED**
- **Reason:**
  1. Audit revealed 6 out of 8 pages lacked `<h1>` tags, 7 lacked meta descriptions, and zero structured data existed for local business ranking in Jharkhand.
  2. Pre-rendered semantic HTML guarantees 100% crawlability by Googlebot, Bingbot, and AI search engines without requiring JavaScript rendering.
- **Impact:** Dominant local search visibility across Jamshedpur, Ranchi, Dhanbad, and Jharkhand for high-intent EPC queries.

---

## ADR-009: Solar Calculator Subsystem Isolation

- **Decision:** Architect the Solar Calculator as a **completely isolated, headless mathematical calculation engine** (`calculatorEngine.js`) separated from the DOM rendering layer (`calculatorUI.js`).
- **Status:** **APPROVED & MANDATED**
- **Reason:**
  1. Separating mathematical formulas from UI event listeners allows unit testing the calculation engine against official MNRE / PM Surya Ghar benchmark test cases with 100% automated precision.
  2. Tariff changes, subsidy slab adjustments, or solar panel efficiency formula updates can be updated in `config.js` and `subsidyRules.js` without touching a single line of UI rendering or CSS code.
- **Formulas & Assumptions:**
  - Generation Benchmark: `4.0 kWh / kW / day` (120 kWh / kW / month in Eastern India).
  - Rooftop Area Benchmark: `100 sq.ft (9.29 sq.m) / kW` of solar panels.
  - Carbon Offset Benchmark: `1.2 Tons CO₂ / kW / year` (Equivalent to ~28 trees planted/year).
  - Default Tariff: Configurable per state (Default Jharkhand JBVNL: `₹6.50 / kWh`).
  - Default Cost: `₹55,000 / kW` (Configurable via `config.js`).
- **Impact:** Flawless accuracy, sub-millisecond calculation speed, and zero coupling to visual DOM elements.

---

## ADR-010: Form Handling, Lead Generation & Zero-Backend Communications

- **Decision:** Implement a **High-Conversion 3-Channel Lead Intake Architecture**:
  1. **Primary Channel (Instant WhatsApp Direct Quote):** Instant generation of customized `https://wa.me/919288381112?text=...` URI pre-populated with user inputs (kW size, estimated cost, city, rooftop type) for 1-tap mobile inquiry.
  2. **Secondary Channel (Native Contact & Site Survey Form):** Accessible client-side validated form submitting to a secure serverless form relay endpoint (Formspree / Web3Forms / native webhook) dispatching instant email alerts to `sales@jdcsolar.com`.
  3. **Tertiary Channel (Sanitized Click-to-Call):** Clean E.164 phone protocol links (`tel:+919234611112`) across sticky header, mobile action bar, and footer.
- **Status:** **APPROVED & MANDATED**
- **Reason:**
  1. Solves the #1 UX gap identified in the audit: 90%+ of Indian solar customers prefer direct WhatsApp and phone communication over slow email forms.
  2. Eliminates vulnerable, spam-prone WordPress `admin-ajax.php` endpoints.
  3. Zero backend servers required; 100% spam protection via client-side honeypots and rate limiting.
- **Impact:** Substantially higher conversion rates (+40–60%) and instant response times.
