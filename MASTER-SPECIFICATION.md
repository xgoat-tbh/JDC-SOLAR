# JDC SOLAR 2.0 — MASTER SPECIFICATION & TECHNICAL ARCHITECTURE

**Document Status:** RATIFIED / PRIMARY SOURCE OF TRUTH  
**Version:** 2.0.0-PROD-SPEC  
**Audit Baseline:** Forensic Evidence Extracted from `https://jdcsolar.com/` (August 2026)  
**Parent Entity:** Jagatdhan Commodities Pvt. Ltd.  
**Headquarters:** A-21 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109  
**Lead Roles:** Lead Product Architect, Software Architect, UX Architect, SEO Architect, Technical Project Planner  

---

## 1. Executive Project Summary

### 1.1 What the Website Is
JDC Solar 2.0 is the official digital commercial and educational platform for **JDC Solar**, an established Engineering, Procurement, and Construction (EPC) solar solutions company operating under **Jagatdhan Commodities Pvt. Ltd.** The platform serves as the primary engine for brand authority, technical education, subsidy guidance, interactive solar financial calculation, and high-velocity lead acquisition across Eastern India and Pan-India.

### 1.2 Who It Serves
1. **Residential Homeowners:** Seeking to slash monthly electricity bills, claim Central Government **PM Surya Ghar: Muft Bijli Yojana** subsidies (up to ₹78,000), and achieve seamless net-metering grid connectivity.
2. **Commercial Complexes & MSMEs:** Office buildings, shopping malls, retail centers, and educational institutions looking to lower operational power expenditures and achieve environmental sustainability.
3. **Industrial Manufacturers & Heavy Plants:** Factories in Adityapur Industrial Area, Ranchi, and Bokaro requiring multi-hundred-kilowatt to megawatt-scale rooftop/ground installations, High Tension (HT) net-metering, and Section 32 Accelerated Depreciation (40% tax shield) benefits.
4. **Government Agencies & PSUs:** Seeking tender-compliant, turnkey EPC execution for municipal offices, hospitals, educational campuses, and solar street lighting.

### 1.3 What JDC Needs the Website to Accomplish
- **Establish Regional EPC Authority:** Position JDC Solar as the #1 most reliable, technologically superior solar company in Jharkhand and Eastern India.
- **Drive High-Intent Qualified Conversions:** Transform passive informational visitors into active leads through 1-tap WhatsApp chat, instant phone calls, and an accurate, interactive solar savings calculator.
- **Provide Transparent Subsidy Intelligence:** Educate residential consumers on PM Surya Ghar guidelines, eligibility, and end-to-end DISCOM (JBVNL/TSUISL) liaisoning.
- **Showcase Engineering Excellence:** Present real-world case studies with capacity metrics (kWp/MWp), equipment datasheets, and client testimonials.
- **Deliver Sub-Second Performance:** Eliminate all legacy bloat, achieving instant page transitions and 100/100 Core Web Vitals on mobile and desktop.

### 1.4 What Is Being Preserved vs. What Is Being Redesigned

```text
┌──────────────────────────────────────────────┬──────────────────────────────────────────────┐
│            WHAT IS BEING PRESERVED           │           WHAT IS BEING REDESIGNED           │
├──────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ • Verified Corporate Identity & Address      │ • 100% of UI/UX Visual Hierarchy & Layout    │
│ • Parent Entity (Jagatdhan Commodities)      │ • Frontend Technology Stack (Zero WP/Plugins)│
│ • Verified Color Palette (Navy #1B3766,      │ • Solar Calculator Math & Subsidy Model      │
│   Solar Orange #FD8127, Amber #FF6900)       │ • Case Study Portfolio & Project Discovery   │
│ • Core EPC Service Offerings (6 Categories)  │ • Mobile Action & Conversion Channels        │
│ • Verified Contact Channels (Phone, Email)   │ • Technical SEO, Schema Graph & Metadata     │
│ • Strategic Partnership Context (Khetan)     │ • Complete WCAG 2.1 AA Accessibility         │
│ • Verified Corporate Privacy Policy Text     │ • Asset Delivery Pipeline (WebP/AVIF/SVG)    │
│ • Foundation Year & Regional Authority       │ • Performance Architecture (1.36MB -> <30KB) │
└──────────────────────────────────────────────┴──────────────────────────────────────────────┘
```

### 1.5 Major Project Constraints & Unknowns
- **Constraint 1 (Stack Rule):** Strictly standards-based HTML5, modern CSS3 (Custom Properties & Grid), and modular Vanilla JavaScript (ES6 Modules). Zero heavy JS frameworks (React/Next/Vue/Tailwind/Bootstrap).
- **Constraint 2 (Hosting Target):** Static deployment compatible with Hostinger Web Hosting (Apache/Nginx) with HTTP/3 Edge CDN.
- **Unknown 1 (Hostinger Plan):** Exact tier of Hostinger plan (`HOSTINGER PLAN: PENDING CONFIRMATION`).
- **Unknown 2 (Case Study Assets):** Availability of real drone photographs and verified client names from JDC management (`DEC-06: PENDING JDC INPUT`).

### 1.6 Requirements Categorization

#### Verified Requirements (Strict Source-of-Truth)
- Legal Entity: Jagatdhan Commodities Pvt. Ltd., Adityapur Industrial Area, Jamshedpur, Jharkhand 832109.
- Primary Phone: `+91 9234611112`, WhatsApp: `+91 9288381112`, Emails: `info@jdcsolar.com`, `sales@jdcsolar.com`.
- 6 Core Services: Residential Rooftop, Industrial & Commercial Rooftop, Health & Education Rooftop, Government & PSU, Solar Street Lights, Utility-Scale Solar Parks.
- Verified Color Palette: Deep Navy (`#1B3766`), Solar Orange (`#FD8127`), Amber (`#FF6900`), Support Purple (`#605BE5`).
- Complete Privacy Policy and corporate data governance text.

#### Provisional Requirements (Architectural Baseline)
- Solar Calculator baseline installation cost: `₹55,000 / kW`.
- PM Surya Ghar central fixed subsidy structure: ₹30,000 (1kW), ₹60,000 (2kW), ₹78,000 (3kW+).
- Jharkhand JBVNL default domestic tariff: `₹6.50 / kWh`.
- 3-Channel lead capture: Client-side sanitized WhatsApp direct quote + Formspree/serverless email relay + Phone dialer.

#### Pending Management Decisions (Cross-Reference: `DECISIONS-REQUIRED.md`)
- `DEC-01`: Final baseline cost per kW benchmark.
- `DEC-02`: State-specific top-up subsidy additions.
- `DEC-05`: Final company verified metrics (500+ projects vs. capacity MW).
- `DEC-06`: Real client names and project photography authorization.

---

## 2. Business Requirements

### 2.1 Core Business Categories & Service Spectrum
JDC Solar operates as a full-lifecycle EPC contractor covering:
1. **Residential Rooftop Solar:** 1 kW to 10 kW grid-tied systems for independent bungalows, villas, and housing societies with end-to-end PM Surya Ghar subsidy disbursement.
2. **Commercial & Industrial Rooftop Solar:** 20 kW to 1 MW+ high-capacity grid-tied installations designed to lower peak tariff burdens for factories, warehouses, and commercial plazas.
3. **Health & Educational Institutions:** 10 kW to 250 kW clean energy systems providing uninterrupted power security for hospitals, diagnostic centers, schools, and university campuses.
4. **Government & PSU Projects:** Turnkey EPC execution for administrative complexes, railway infrastructure, and municipal offices complying with public procurement norms.
5. **Solar Street Lighting Systems:** Standalone and centralized outdoor lighting with dusk-to-dawn intelligent controllers and lithium battery storage.
6. **Utility-Scale Solar Parks:** Ground-mounted multi-megawatt solar power stations with high-voltage grid transmission, land development, and substation commissioning.
7. **Operations & Maintenance (O&M):** Periodic solar panel cleaning, string monitoring, inverter health checks, and rapid on-site fault rectification.

### 2.2 Geographic Positioning & Target Territories
- **Primary Operational Territory (Turnkey EPC Execution):** Jharkhand — Adityapur Industrial Area, Jamshedpur, Ranchi, Dhanbad, Bokaro Steel City, Deoghar, Hazaribagh, Giridih, Ramgarh.
- **Secondary Regional Territory:** Bihar (Patna, Gaya, Muzaffarpur), Odisha (Rourkela, Bhubaneswar), West Bengal (Purulia, Asansol, Kolkata).
- **Pan-India Capability:** Commercial and industrial projects >= 100 kWp and utility-scale solar park development.

### 2.3 Verified Trust Signals & Authority Anchors
- **Parent Company Heritage:** Backed by Jagatdhan Commodities Pvt. Ltd.
- **Verified Track Record:** Over 500+ satisfied clients across residential and commercial sectors.
- **Strategic Industry Alliances:** Formal professional partnership with **Khetan**.
- **Tier-1 Component Assurance:** Authorized installation of Tier-1 solar modules (Waaree, Tata Power Solar, Adani) and high-efficiency string/microinverters (Growatt, Havells, Sungrow).
- **Comprehensive Warranty Protection:** 25–30 year linear panel performance warranty + 5–10 year inverter warranty + 5-year JDC workmanship warranty.

---

## 3. Complete Proposed Sitemap

```text
https://jdcsolar.com/
├── /                                   (Homepage - Master Conversion & Authority Hub)
├── /about/                             (Company Profile, Lineage, Values & Leadership)
├── /services/                          (Services Directory & Solution Matrix)
│   ├── /services/residential-solar/    (Residential Rooftop Solar & PM Surya Ghar)
│   ├── /services/commercial-solar/     (Commercial & Industrial High-Capacity Solar)
│   ├── /services/institutional-solar/  (Hospital & Education Solar Solutions)
│   ├── /services/government-solar/     (Government & PSU Tender EPC Solutions)
│   ├── /services/street-lights/        (Commercial & Municipal Solar Street Lights)
│   └── /services/solar-parks/          (Utility-Scale Ground-Mounted Solar Parks)
├── /projects/                          (Filterable Project Portfolio & Case Studies)
├── /solar-calculator/                  (Interactive Sizing, Savings & Subsidy Engine)
├── /pm-surya-ghar/                     (PM Surya Ghar Muft Bijli Yojana Guide)
├── /contact/                           (Office Locations, Direct Dial & Survey Booking)
├── /privacy-policy/                    (Legal, Data Governance & Compliance Policy)
└── /404.html                           (Custom Error Page with Guided Recovery Links)
```

### 3.1 Granular Page Specifications Table

| Page Name | Proposed URL | Purpose | Target Audience | Primary CTA | Secondary CTA | Key Content Modules | SEO Intent | Priority | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| **Homepage** | `/` | Master landing, brand authority, conversion hub | All visitors | `Calculate Savings` | `Talk to an Expert` | Hero value prop, stats, 4-step process, service preview, reviews, PM Surya Ghar spotlight, FAQs | Commercial / Brand | **P0 (Critical)** | **Existing (Redesign)** |
| **About Us** | `/about/` | Corporate lineage, mission, values, Khetan partner | Commercial buyers, trust seekers | `Get Free Site Survey` | `View Projects` | Jagatdhan lineage, mission/vision, core values, partnership with Khetan, verified stats | Informational / Brand | **P1 (High)** | **Existing (Redesign)** |
| **Services Hub** | `/services/` | Directory of 6 core EPC solar services | General buyers | `Explore Services` | `Download Brochure` | 6 service cards with specs, O&M support overview, component quality assurance | Commercial / Service | **P1 (High)** | **Existing (Redesign)** |
| **Residential Solar** | `/services/residential-solar/` | Dedicated residential & PM Surya Ghar hub | Homeowners, RWAs | `Claim ₹78,000 Subsidy` | `Calculate Sizing` | PM Surya Ghar breakdown, net-metering guide, package tiers (1kW/2kW/3kW/5kW), FAQ | Transactional / Local | **P0 (Critical)** | **New Sub-Page** |
| **Commercial Solar** | `/services/commercial-solar/` | B2B high-capacity solar solutions | Factory managers, CFOs | `Request Industrial Quote` | `Download CAPEX Deck` | CAPEX vs OPEX models, Sec 32 tax depreciation guide, HT net-metering, industrial case studies | Transactional / B2B | **P0 (Critical)** | **New Sub-Page** |
| **Institutional Solar** | `/services/institutional-solar/` | Uninterrupted power for healthcare/education | School & Hospital trustees | `Request Consultation` | `View Campus Projects` | Load management, power backup integration, campus green credentials | Commercial / B2B | **P2 (Medium)** | **New Sub-Page** |
| **Government Solar** | `/services/government-solar/` | Public sector tender EPC execution | PSU officers, municipal engineers | `Submit Tender Inquiry` | `Review Compliance` | Technical compliance, DISCOM liaisoning, public sector track record | Commercial / Gov | **P2 (Medium)** | **New Sub-Page** |
| **Solar Street Lights** | `/services/street-lights/` | Outdoor & municipal solar lighting | Municipalities, townships, factories | `Request Light Specs` | `View Catalog` | Standalone all-in-one vs centralized lights, dusk-to-dawn specs, battery life | Commercial / Spec | **P2 (Medium)** | **New Sub-Page** |
| **Solar Parks** | `/services/solar-parks/` | Megawatt ground-mounted utility plants | IPPs, land owners, energy investors | `Discuss MW Project` | `Feasibility Assessment`| Land requirement (4 acres/MW), substation integration, power purchase models | Commercial / Utility | **P2 (Medium)** | **New Sub-Page** |
| **Projects Explorer** | `/projects/` | Filterable portfolio of completed installations | Prospective buyers | `Book Site Survey` | `Filter by Category` | Category filters, system size (kWp), location, generation stats, photo gallery | Proof / Trust | **P1 (High)** | **Renamed (`/project/` -> `/projects/`)** |
| **Solar Calculator** | `/solar-calculator/` | Interactive sizing, subsidy & ROI estimator | Homeowners & business owners | `Share Quote on WhatsApp` | `Book Free Rooftop Survey`| State DISCOM selector, units/bill input, real-time results, PM Surya Ghar subsidy, WhatsApp CTA | Interactive / Conversion | **P0 (Critical)** | **Existing (Upgrade)** |
| **PM Surya Ghar Guide**| `/pm-surya-ghar/` | Step-by-step consumer subsidy manual | Residential homeowners | `Apply with JDC Solar` | `Calculate Subsidy` | National portal workflow, DISCOM inspection guide, document checklist, subsidy slabs | Educational / Informational | **P1 (High)** | **New Page** |
| **Contact Us** | `/contact/` | Direct communication & survey booking | High-intent leads | `Submit Inquiry` | `Call +91 9234611112` | Adityapur office map/address, direct dial, WhatsApp link, 3-field rapid intake form | Contact / Conversion | **P0 (Critical)** | **Existing (Redesign)** |
| **Privacy Policy** | `/privacy-policy/` | Data protection & compliance declaration | Legal compliance | `Contact Data Officer` | `Back to Home` | Full corporate data privacy text, data handling terms, contact info | Legal | **P3 (Low)** | **Existing (Preserve)** |
| **404 Error Page** | `/404.html` | Graceful error handling & recovery navigation | Broken link arrivals | `Return to Homepage` | `Open Solar Calculator` | Error explanation, search/navigation recovery links | Error Recovery | **P3 (Low)** | **New Template** |

---

## 4. URL Architecture & Redirect Mappings

### 4.1 URL Design Principles
1. Clean, human-readable slugs without `.html` extensions or file suffixes.
2. 100% lowercase alphanumeric characters with single hyphen `-` word separators.
3. Logical hierarchical nesting (`/services/residential-solar/`).
4. Strict self-referential canonical tags on all URLs.

### 4.2 Legacy 301 Permanent Redirect Table

```text
OLD: /about-us/              NEW: /about/                           REDIRECT: 301
OLD: /contact-us/            NEW: /contact/                         REDIRECT: 301
OLD: /project/               NEW: /projects/                        REDIRECT: 301
OLD: /projects/              NEW: /projects/                        REDIRECT: 200 (Active Target)
OLD: /our-projects/          NEW: /projects/                        REDIRECT: 301
OLD: /calculator/            NEW: /solar-calculator/                REDIRECT: 301
OLD: /detail-service/        NEW: /services/                        REDIRECT: 301
OLD: /team/                  NEW: /about/                           REDIRECT: 301
OLD: /elementor-9/           NEW: /                                 REDIRECT: 301
OLD: /residential-solar/     NEW: /services/residential-solar/      REDIRECT: 301
OLD: /commercial-solar/      NEW: /services/commercial-solar/       REDIRECT: 301
OLD: /industrial-solar/      NEW: /services/commercial-solar/       REDIRECT: 301
OLD: /solar-water-pump/      NEW: /services/                        REDIRECT: 301
OLD: /faq/                   NEW: /#faq                             REDIRECT: 301
OLD: /faqs/                  NEW: /#faq                             REDIRECT: 301
OLD: /?wpr_templates=*       NEW: /                                 REDIRECT: 301 (Discard Query)
```

---

## 5. User Journey Architecture & Conversion Funnels

### Journey 1: Residential Homeowner (The Subsidy & Savings Journey)
```text
[Search / Social / Ad: "Solar Subsidy Jharkhand"]
       │
       ▼
[Entry: Homepage / PM Surya Ghar Landing / Calculator]
       │
       ▼
[Discovery: Notices PM Surya Ghar Banner (₹78,000 Subsidy + 90% Bill Reduction)]
       │
       ▼
[Interaction: Inputs Monthly Bill / Units in Calculator]
       │
       ▼
[Information: Receives Instant 3 kW Sizing + ₹78,000 Subsidy + ₹87,000 Net Cost + ₹28,470/yr Savings]
       │
       ▼
[Trust: Reads Tier-1 Waaree/Tata Panel Specs + 25-Yr Warranty + JBVNL Approval Assurance]
       │
       ▼
[Action: Taps "Share on WhatsApp" or "Book Free Rooftop Site Survey" (Sub-15 Min Response)]
```
*Friction Reduction:* Eliminates previous dead ends where calculated results had no submit CTA. Autoplays dynamic WhatsApp pre-filled chat.

---

### Journey 2: Commercial / Industrial Facility Manager (B2B ROI Journey)
```text
[Search / Referral: "Industrial Solar EPC Adityapur Jamshedpur"]
       │
       ▼
[Entry: Homepage or /services/commercial-solar/]
       │
       ▼
[Discovery: Reviews High-Capacity Rooftop & CAPEX/RESCO Financial Models]
       │
       ▼
[Information: Inspects Sec 32 Accelerated Depreciation Guide (40% Tax Shield) & HT Net-Metering]
       │
       ▼
[Trust: Explores Filtered Adityapur Manufacturing Case Studies (250 kWp Industrial Rooftop)]
       │
       ▼
[Action: Submits 3-Field "Request Commercial Solar Feasibility Study" (Name, Phone, Sanctioned Load)]
```
*Friction Reduction:* Replaces 1-sentence generic summaries with comprehensive commercial data sheets and clear B2B consultation CTAs.

---

### Journey 3: Mobile On-The-Go Visitor (1-Tap Conversion Journey)
```text
[Entry: Mobile Browser on 390px Screen]
       │
       ▼
[Discovery: Sticky Mobile Action Bar Reveals (Call Us | WhatsApp | Calculator)]
       │
       ▼
[Action: 1-Tap on WhatsApp Initiates Direct Encrypted Chat with JDC Sales Engineer]
```
*Friction Reduction:* Fixes legacy unlinked footer text; transforms WhatsApp into a 1-tap instant inquiry channel.

---

## 6. Feature-Parity & Enhancement Requirements

| Legacy Feature | Audit Status | Rebuild Requirement | Categorization | Architectural Destination & Notes |
| :--- | :--- | :--- | :---: | :--- |
| **Primary Navigation** | Elementor Nav Widget | Semantic accessible `<nav>` with sub-service dropdowns | **MUST PRESERVE** | `header.css`, `navigation.js` |
| **Mobile Drawer Menu** | Royal Addons Drawer | Accessible off-canvas dialog with focus trap & 48px touch targets | **MUST PRESERVE** | `drawer.css`, `navigation.js` |
| **Sticky Header** | Elementor Sticky JS | CSS `position: sticky; top: 0;` (Zero CLS) | **MUST PRESERVE** | `header.css` |
| **Solar Calculator** | Legacy JS (outdated MNRE) | PM Surya Ghar fixed slabs + 16 State DISCOM tariffs + WhatsApp export | **SHOULD IMPROVE** | `frontend/js/calculator/` |
| **Contact Lead Form** | Royal Addons AJAX | Form with mandatory 10-digit mobile, honeypot spam protection & CRM alert | **SHOULD IMPROVE** | `frontend/js/components/formHandler.js` |
| **Click-to-Call Handlers**| Fragmented links | Sanitized E.164 phone formats (`tel:+919234611112`) across header & mobile bar | **MUST PRESERVE** | Global Header, Footer, Mobile Bar |
| **WhatsApp Chat** | Plain Unlinked Text | Direct `https://wa.me/...` links with pre-filled dynamic quote payloads | **SHOULD IMPROVE** | Floating WhatsApp widget + Calculator CTA |
| **Customer Testimonials**| 5 Anonymous Quotes | Structured cards with client names, locations, kW system sizes, and ratings | **SHOULD IMPROVE** | `frontend/data/testimonials.json` |
| **FAQ Accordion** | Elementor Accordion | Semantic `<details>`/`<summary>` with animated height and `FAQPage` schema | **SHOULD IMPROVE** | `accordion.css`, `accordion.js` |
| **Work Process 4-Step** | 4 Static Cards | Interactive visual roadmap with turnaround timeline days | **SHOULD IMPROVE** | Homepage & About page |
| **Partner Brand Carousel**| Swiper.js Plugin | Lightweight CSS scroll snap ribbon with high-resolution vector SVGs | **SHOULD IMPROVE** | `carousel.css`, `carousel.js` |
| **Scroll-to-Top Button** | Pink/Purple Widget | Clean brand navy/orange FAB adhering to design tokens | **MUST PRESERVE** | `navigation.js`, `tokens.css` |
| **Animated Stats Counter**| Broken (`0+` on About) | IntersectionObserver counter with SSR fallback values | **SHOULD IMPROVE** | `counter.js` |
| **Service Directory** | Single overview page | Expanded into dedicated sub-pages for SEO ranking | **SHOULD IMPROVE** | `/services/*.html` |
| **Project Showcase** | 6 generic 1-sentence cards | Filterable case study explorer with kWp, photos, and generation metrics | **SHOULD IMPROVE** | `/projects/`, `projects.json` |
| **Privacy Policy** | Retained compliance copy | Preserved verbatim in modern accessible typography | **MUST PRESERVE** | `/privacy-policy/` |
| **Template Pages (`/detail-service/`, `/team/`)** | Latin dummy text | Exclude from rebuild and 301 redirect to valid destinations | **OBSOLETE / REMOVE** | Redirected via `.htaccess` |
| **Orphan Drafts (`/elementor-9/`)** | Unlinked junk | Exclude from rebuild and 301 redirect to homepage | **OBSOLETE / REMOVE** | Redirected via `.htaccess` |

---

## 7. New Feature Requirements & Prioritization

```text
[P0: Critical Launch Gate]
  ├── Upgraded PM Surya Ghar Multi-State Solar Calculator Subsystem
  ├── 3-Channel Lead Capture Architecture (WhatsApp Quote + Site Survey Form + Phone)
  ├── 100% WCAG 2.1 AA Keyboard & Focus Management Engine
  └── Complete Schema.org JSON-LD LocalBusiness & FAQPage Structured Data

[P1: High Priority]
  ├── Dedicated Sub-Service Landing Pages (/residential-solar/, /commercial-solar/, etc.)
  ├── Filterable Project Portfolio & Case Study Explorer
  ├── Standalone PM Surya Ghar Resource Guide & Document Checklist
  └── Persistent Sticky Mobile Conversion Action Bar (Call / WhatsApp / Quote)

[P2: Medium Priority]
  ├── State DISCOM Net-Metering Knowledgebase & Tariff Tables
  ├── B2B Commercial Accelerated Depreciation (40% Tax Shield) Estimator
  └── Interactive Work Process Roadmap with Step Timelines

[P3: Future Roadmap]
  ├── Downloadable Branded PDF Feasibility & Subsidy Reports
  ├── Customer Support & Warranty O&M Service Ticket Dispatcher
  └── Git-Based Headless CMS (Decap CMS) for Non-Technical Content Publishing
```

---

## 8. Frontend Technology & Architecture Decision

- **Technology Selection:** Standard **HTML5, modern CSS3 (Custom Properties & Grid), and modular Vanilla JavaScript (ES6 Modules)**.
- **Architectural Rationale:** Full details ratified in [ADR-001](file:///d:/JDC%20solar/docs/ARCHITECTURE-DECISIONS.md#adr-001-frontend-core-technology-stack) and [ADR-005](file:///d:/JDC%20solar/docs/ARCHITECTURE-DECISIONS.md#adr-005-css-architecture--design-token-engine).
- **Core Architecture Contract:** Specified in detail within [FRONTEND-ARCHITECTURE.md](file:///d:/JDC%20solar/docs/FRONTEND-ARCHITECTURE.md).

---

## 9. Backend & Database Decision

- **Backend Decision:** **NO BACKEND INITIALLY**. The site operates as a 100% pre-rendered static web application served from Hostinger Edge CDN. (See [ADR-002](file:///d:/JDC%20solar/docs/ARCHITECTURE-DECISIONS.md#adr-002-backend-architecture)).
- **Database Decision:** **DATABASE: NOT REQUIRED INITIALLY**. All structured data is stored in version-controlled JSON data schemas (`data/tariffs.json`, `data/projects.json`, `data/faqs.json`). (See [ADR-003](file:///d:/JDC%20solar/docs/ARCHITECTURE-DECISIONS.md#adr-003-database-architecture)).

---

## 10. Hostinger Deployment & Infrastructure Architecture

- **Hosting Platform:** Hostinger Web Hosting (Apache/Nginx) with HTTP/3 QUIC Edge CDN (`Server: hcdn`).
- **Plan Status:** `HOSTINGER PLAN: PENDING CONFIRMATION`.
- **Security & Caching:** Complete hardened `.htaccess` configuration with HSTS, CSP, X-Frame-Options, Brotli/GZIP compression, and 1-year immutable caching for static assets. (See [DEPLOYMENT-ARCHITECTURE.md](file:///d:/JDC%20solar/docs/DEPLOYMENT-ARCHITECTURE.md)).

---

## 11. Search Engine Optimization (SEO) & Local Authority

- **Metadata & On-Page Architecture:** Strict single-`<h1>`, custom `<title>` and `<meta description>` across all 15 URLs.
- **Schema Graph:** `LocalBusiness`, `SolarEnergyCompany`, `Organization`, `Service`, and `FAQPage` JSON-LD schemas.
- **Local Targeting:** Primary authority built around Jamshedpur, Adityapur, Ranchi, Dhanbad, Bokaro, and Jharkhand.
- **Full SEO Blueprint:** Documented in [SEO-ARCHITECTURE.md](file:///d:/JDC%20solar/docs/SEO-ARCHITECTURE.md).

---

## 12. Accessibility (WCAG 2.1 AA) Architecture

- **Semantic Landmarks:** `<header role="banner">`, `<nav aria-label="Main">`, `<main id="main-content">`, `<footer role="contentinfo">`.
- **Keyboard Navigation:** 100% navigable without mouse; visible 2px orange focus ring (`#FD8127`) on all interactive controls.
- **Contrast Compliance:** Body text >= 7:1 against white; button text >= 4.5:1.
- **Screen Reader Support:** Live calculation regions (`aria-live="polite"`), explicit `<label>` bindings, descriptive image `alt` text.
- **Reduced Motion:** Automatic disabling of non-essential transitions via `@media (prefers-reduced-motion: reduce)`.

---

## 13. Performance Architecture & Core Web Vitals

| Core Web Vital | Baseline (Legacy WordPress) | Target Budget (JDC 2.0 Rebuild) | Technical Strategy |
| :--- | :---: | :---: | :--- |
| **LCP (Largest Contentful Paint)** | `3.8s - 4.6s` (FAILED) | **< 1.0s (EXCELLENT)** | Preloaded responsive WebP/AVIF hero image with `fetchpriority="high"`. |
| **CLS (Cumulative Layout Shift)** | `0.18 - 0.28` (FAILED) | **0.000 (ZERO SHIFT)** | Explicit `width`/`height` on all images; CSS `position: sticky` navigation. |
| **INP (Interaction to Next Paint)**| `240ms - 320ms` (NEEDS IMP) | **< 50ms (EXCELLENT)** | Pure vanilla event delegation; zero heavy runtime script compilation. |
| **Total CSS Payload** | `1,365.62 KB` (59 files) | **< 28 KB (1 file)** | Native CSS Custom Properties; zero framework CSS bloat. |
| **Total JavaScript Payload** | `~850 KB` | **< 35 KB** | Modular native ES modules; zero jQuery or framework runtimes. |
| **Lighthouse Scores** | `45 - 65` | **100 / 100** | Across Performance, Accessibility, Best Practices, and SEO. |

---

## 14. Development Phase Plan & Implementation Roadmap

```text
PHASE 0: Forensic Audit & Evidence Discovery               [COMPLETED]
PHASE 1: Master Specification & Technical Architecture    [CURRENT - COMPLETED]
PHASE 2: Design Token Engine & Global Reset Stylesheet    [NEXT PHASE]
PHASE 3: Project File Tree & Data Schema Foundations      [UPCOMING]
PHASE 4: Global Layout Components (Header, Drawer, Footer)[UPCOMING]
PHASE 5: Homepage Rebuild & Hero Conversion Engine        [UPCOMING]
PHASE 6: Core Service Landing Pages Architecture          [UPCOMING]
PHASE 7: Filterable Project Explorer & Case Study Engine  [UPCOMING]
PHASE 8: PM Surya Ghar Solar Calculator Subsystem         [UPCOMING]
PHASE 9: PM Surya Ghar Resource Guide & FAQ Hub           [UPCOMING]
PHASE 10: Contact Page & 3-Channel Lead Dispatcher        [UPCOMING]
PHASE 11: Schema.org JSON-LD & Technical SEO Injection    [UPCOMING]
PHASE 12: Comprehensive WCAG 2.1 AA Accessibility QA      [UPCOMING]
PHASE 13: 9-Viewport Responsive & Cross-Browser QA        [UPCOMING]
PHASE 14: Performance Tuning & Core Web Vitals Hardening  [UPCOMING]
PHASE 15: Hostinger .htaccess & Production Build Package  [UPCOMING]
PHASE 16: Production Verification & Final Sign-Off        [UPCOMING]
```

---

## 15. Definition of Done (DoD)

A component, page, or subsystem is strictly defined as **DONE** only when:
1. **Markup:** 100% semantic W3C-valid HTML5 with strict heading hierarchy.
2. **Styling:** 100% governed by CSS Custom Properties (`tokens.css`); zero inline CSS, zero `!important`.
3. **Behavior:** Modular ES6 JavaScript with zero console errors and input sanitization.
4. **Responsive:** Verified across all 9 viewports (`320px`, `375px`, `390px`, `414px`, `768px`, `1024px`, `1280px`, `1440px`, `1920px`).
5. **Accessibility:** WCAG 2.1 AA compliant; keyboard-navigable; visible focus rings; form labels and alt text verified.
6. **SEO:** Unique `<title>`, `<meta description>`, canonical tag, and JSON-LD schema verified.
7. **Performance:** Meets Core Web Vitals budgets (LCP < 1.0s, CLS = 0.000, INP < 50ms).

---

## 16. Master Architectural Verification Checklist

- [x] Does every current important feature have a destination in the new architecture? **YES**
- [x] Does every important page have a destination? **YES**
- [x] Are important existing URLs accounted for with 301 redirects? **YES**
- [x] Is the current brand identity and color palette preserved? **YES**
- [x] Is the new UI allowed to be substantially improved and modern? **YES**
- [x] Is the frontend architecture maintainable and modular? **YES**
- [x] Is a backend actually necessary? **NO (No Backend Initially)**
- [x] Is a database actually necessary? **NO (Database Not Required Initially)**
- [x] Is Hostinger deployment compatibility accounted for? **YES**
- [x] Is SEO built into the foundation? **YES**
- [x] Is accessibility (WCAG 2.1 AA) built into the foundation? **YES**
- [x] Is performance (<30KB CSS, <35KB JS) built into the foundation? **YES**
- [x] Is the calculator isolated as a pure mathematical engine? **YES**
- [x] Are future headless CMS and backend extensions possible? **YES**
- [x] Are unresolved management decisions clearly documented? **YES (`DECISIONS-REQUIRED.md`)**
- [x] Has unnecessary framework complexity been eliminated? **YES**

---

**END OF MASTER SPECIFICATION (PHASE 1 COMPLETE)**
