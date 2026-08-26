# JDC Solar Website: Complete Forensic Audit & Technical Specification

**Audit Date:** August 2026  
**Auditor Roles:** Lead Web Auditor, Reverse Engineer, UX Researcher, SEO Specialist, Technical Architect  
**Target Domain:** `https://jdcsolar.com/`  
**Parent Entity:** Jagatdhan Commodities Pvt. Ltd.  
**Operating Location:** Adityapur, Jamshedpur, Jharkhand, India  
**Audit Standard:** FORENSIC EVIDENCE-BASED ANALYSIS ONLY (Zero Changes, Zero Submissions, Zero Code Deployment)  
**Evidence Standard:** DIRECTLY OBSERVED & SOURCE-VERIFIED  

---

## 1. Executive Summary

A comprehensive forensic audit of `https://jdcsolar.com/` was conducted to reverse-engineer its business information, interactive functionality, visual identity, content structure, technical stack, SEO baseline, responsive behavior, and accessibility standards. 

The website serves as the primary digital footprint for **JDC Solar**, an engineering, procurement, and construction (EPC) solar company based in Adityapur Industrial Area (Jamshedpur, Jharkhand). The company specializes in rooftop and utility solar installations across residential, commercial, industrial, and institutional sectors.

### Core Audit Findings Overview:
1. **Content & Brand Identity:** The website has a solid core identity centered around clean solar energy (Deep Navy `#1B3766` and Solar Orange `#FD8127`), genuine parent company lineage (Jagatdhan Commodities Pvt. Ltd.), established regional authority (500+ clients), and strategic partnership credentials (Khetan). However, it is compromised by unconverted Elementor template placeholder copy (`/detail-service/`, `/team/`), broken counter stats on `/about/` (displaying `0+`), and missing project case studies.
2. **Interactive Functionality:** The site includes a client-side JavaScript **Solar Calculator** on `/solar-calculator/` and a **Lead Contact Form** on `/contact/`. The calculator functions via client-side JS but relies on outdated MNRE subsidy slabs (ignoring the current PM Surya Ghar benchmarks) and fails to connect calculation outputs to a lead capture form.
3. **Technical Architecture:** Built on WordPress 6.9.7, Hello Elementor theme, Elementor Pro, Royal Elementor Addons, and Happy Addons on Hostinger Cloud with PHP 8.3.31. It suffers from massive frontend bloat (**59 CSS stylesheets totaling 1.36 MB**, multiple uncompressed 2560px PNG graphics, and 4 Google Font families loading all weights), resulting in poor Core Web Vitals (LCP > 3.8s, CLS > 0.18).
4. **SEO & Accessibility:** Lacks `<h1>` tags on 6 out of 8 public pages, has 80–100% missing image alt attributes, lacks `LocalBusiness` and `FAQPage` JSON-LD schemas, and has no meta descriptions on 7 pages.

---

## 2. Complete Website Metric Counts

- **Total Pages Discovered:** **18 URLs** (8 core public pages, 2 unlinked template/draft pages, 8 internal theme builder template previews)
- **Discovered 404 / Alias Dead Ends:** **13 URLs** (e.g. `/about-us/`, `/contact-us/`, `/projects/`, `/calculator/`, `/faq/`, `/pm-surya-ghar/`)
- **Total Major Interactive Features:** **12 Features** (Desktop Nav, Mobile Drawer, Sticky Header, Solar Calculator, Contact Form, Scroll-to-Top FAB, Review Carousel, FAQ Accordion, Brand Carousel, Click-to-Call, Counter Widgets, LightGallery)
- **Total Media Assets Discovered in WP REST API:** **94 Assets** (61 PNGs, 29 JPEGs, 2 WebPs, 2 AVIFs)
- **Total CSS Files Loaded:** **59 Stylesheets (1,365.62 KB)**
- **Unresolved Questions for JDC Management:** **10 Strategic Questions**

---

## 3. Discovered Sitemap & Page Inventory

| URL | Page Title | Page Type | Status | Primary Purpose & Rebuild Status |
| :--- | :--- | :--- | :---: | :--- |
| `https://jdcsolar.com/` | `Solar Company in India \| Smart Solar Solutions \| JDC Solar` | Homepage | 200 OK | Core landing page; full visual & conversion rebuild |
| `https://jdcsolar.com/about/` | `About Us - Jharkhand best solar Company` | Company Profile | 200 OK | Corporate narrative & values; fix broken 0+ counters |
| `https://jdcsolar.com/services/` | `Solar Projects in India \| Residential & Commercial \| JDC Solar` | Service Directory | 200 OK | 6 service categories; expand into dedicated sub-pages |
| `https://jdcsolar.com/project/` | `Projects - Jharkhand best solar Company` | Project Listing | 200 OK | 6 project types; upgrade with real case studies & photos |
| `https://jdcsolar.com/solar-calculator/` | `Solar Calculator - Jharkhand best solar Company` | Interactive Tool | 200 OK | Solar savings engine; upgrade with PM Surya Ghar logic & CRM lead capture |
| `https://jdcsolar.com/contact/` | `Contact Us - Jharkhand best solar Company` | Contact / Lead Gen | 200 OK | Lead intake form; add mandatory Phone Number + WhatsApp CTA |
| `https://jdcsolar.com/privacy-policy/` | `Privacy Policy - Jharkhand best solar Company` | Legal Policy | 200 OK | Retain complete data privacy compliance copy |
| `https://jdcsolar.com/team/` | `Team - Jharkhand best solar Company` | Team Profile | 200 OK | Contains template dummy data; replace with real leadership |
| `https://jdcsolar.com/detail-service/` | `Detail Service - Jharkhand best solar Company` | Template Page | 200 OK | Unconverted Latin dummy text; delete / exclude |
| `https://jdcsolar.com/elementor-9/` | `Elementor #9 - Jharkhand best solar Company` | Draft Page | 200 OK | Orphan draft artifact; delete / exclude |

---

## 4. Brand Summary & Design Tokens

- **Primary Brand Color:** Deep Solar Navy (`#1B3766` / `rgb(27, 55, 102)`)
- **Primary Accent Color:** Energetic Solar Orange (`#FD8127` / `rgb(253, 129, 39)`)
- **Secondary Highlight:** Amber Orange (`#FF6900` / `rgb(255, 105, 0)`)
- **Support Accent:** Royal Purple (`#605BE5` / `rgb(96, 91, 229)`)
- **Neutral Dark (Text):** Off-Black Charcoal (`#333333` / `rgb(51, 51, 51)`)
- **Neutral Light (Surface):** Pale Ice Gray (`#D8E1EB` / `#E8E8E8` / `#FFFFFF`)
- **Primary Headings Typography:** `"Poppins"`, Sans-Serif (Weights: 600 Semi-Bold, 700 Bold)
- **Body Text Typography:** `"Inter"`, Sans-Serif (Weights: 400 Regular, 500 Medium)

---

## 5. Technical Stack Summary

- **Web Server & CDN:** Hostinger Edge (`hcdn`), Mumbai Node (`mum-edge6`), HTTP/3 QUIC enabled
- **Server Runtime:** PHP 8.3.31 on Hostinger hPanel Linux
- **CMS:** WordPress 6.9.7
- **Page Builder Engine:** Hello Elementor Theme 3.4.6 + Elementor Pro 4.1.4
- **Active Addon Bundles:** Royal Elementor Addons 1.7.1065, Happy Elementor Addons 3.21.2
- **SEO & Cache Plugins:** Yoast SEO Premium 27.6 / 28.1, WP-Optimize
- **Identified Critical Flaws:**
  - 59 blocking CSS files causing render delays
  - Publicly accessible unauthenticated WP REST API (`/wp-json/wp/v2/`)
  - Missing all standard security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options)

---

## 6. Solar Calculator Reverse Engineering Specification

The calculator on `/solar-calculator/` executes client-side via `calculateSolar()`:
- **Observed Constants:**
  - `avgTariff = ₹7.00 / unit`
  - `costPerKW = ₹55,000 / kW`
  - `generationPerKWPerDay = 4 units / kW / day` (120 units / kW / month)
  - `co2ReductionPerKW = 1.2 tons CO₂ / kW / year`
- **Formulas:**
  - `systemSize = monthlyUnits / 120`
  - `annualGeneration = systemSize * 4 * 365`
  - `grossCost = systemSize * 55000`
  - `subsidy = (residential) ? (systemSize <= 3 ? grossCost * 0.40 : (3 * 55000 * 0.40) + ((systemSize - 3) * 55000 * 0.20)) : 0`
  - `netCost = grossCost - subsidy`
- **Rebuild Requirements:**
  - Upgrade subsidy formula to official **PM Surya Ghar Muft Bijli Yojana** fixed slabs: ₹30k (1kW), ₹60k (2kW), ₹78k (3kW+).
  - Add state-specific tariff data (JBVNL, TSUISL, NBPDCL, etc.).
  - Add inline 1-click lead capture and instant WhatsApp quote sharing.

---

## 7. Major Problems & Root Causes

1. **Broken About Page Stats Counter (Severity: Critical):** Displays `0+ Projects Completed`, `0% Satisfied Clients` due to failed JavaScript hydration.
2. **Calculator Results Without Actionable CTA (Severity: Critical):** Users receive calculated estimate without an inquiry form or survey booking action.
3. **Contact Form Missing Phone Number Field (Severity: High):** Collects only name and email in an industry where 90%+ conversions happen via phone/WhatsApp.
4. **Non-Clickable WhatsApp Listing (Severity: High):** Footer displays WhatsApp phone number as plain unlinked text.
5. **Severe Performance Payload (Severity: High):** 59 CSS files (1.36 MB) and uncompressed 2560px PNG graphics causing LCP > 3.8s.
6. **Accessibility & SEO Non-Compliance (Severity: High):** 6 pages lack H1 tags, 80-100% of images lack alt text, missing LocalBusiness and FAQ schemas.
7. **Unconverted Template Copy (Severity: Medium):** Latin dummy text on `/detail-service/` and placeholder employee names on `/team/`.

---

## 8. High-Priority Rebuild Recommendations

1. **Modern Decoupled Frontend (Next.js 15 / Astro 5 + Tailwind CSS):** Reduce total CSS from 1.36 MB to < 35 KB, achieving 100/100 Lighthouse performance and instant sub-second page loads.
2. **Upgraded PM Surya Ghar Subsidy Engine:** Multi-step dynamic calculator with state DISCOM tariffs, rooftop area calculation, and instant PDF quote generation.
3. **3-Channel Instant Lead Capture:** Persistent mobile action bar with 1-tap WhatsApp chat (`wa.me`), 1-tap Click-to-Call, and rapid Site Survey booking form.
4. **Rich Case Study Portfolio:** Replace generic project cards with filterable real-world project profiles featuring capacity (kWp), monthly generation stats, and site imagery.
5. **Complete SEO & Schema Foundation:** Dedicated programmatic landing pages for Jamshedpur, Ranchi, Dhanbad, and Adityapur with full LocalBusiness and FAQPage JSON-LD schemas.

---

## 9. Audit Artifacts Directory Map

All 19 detailed forensic audit documents and supporting visual assets have been compiled and generated inside `d:\Hawkesearch/`:

```text
d:\Hawkesearch/
├── WEBSITE-AUDIT.md           (Master Executive Forensic Report)
├── SITEMAP.md                 (Hierarchical Sitemap & Discovered URLs)
├── CONTENT-INVENTORY.md       (Granular Copy, Claims, FAQs & Subsidies)
├── FEATURE-INVENTORY.md       (Interactive Components, Handlers & Scripts)
├── FEATURE-PARITY.md          (Parity Baseline & Enhancement Matrix)
├── USER-JOURNEYS.md           (Visitor Flows, Friction & Dead Ends)
├── BRAND-ANALYSIS.md          (Colors, Typography, Logos & Tokens)
├── ASSET-INVENTORY.md         (94 Media Library Items & Fonts)
├── RESPONSIVE-AUDIT.md        (9 Viewports Inspection: 320px to 1920px)
├── ACCESSIBILITY-AUDIT.md     (WCAG 2.1 AA Audit & Compliance Gaps)
├── SEO-AUDIT.md               (Technical SEO, Schemas & Local Pack)
├── PERFORMANCE-AUDIT.md       (Payloads, CSS Bloat & Core Web Vitals)
├── TECHNICAL-AUDIT.md         (WordPress, PHP 8.3, Hostinger CDN, Plugins)
├── SECURITY-AUDIT.md          (Headers, CSP, Exposure & REST Surface)
├── PROJECT-INVENTORY.md       (6 Project Listings & Case Study Specs)
├── CONTENT-GAPS.md            (Missing Technical & Commercial Data)
├── UX-AUDIT.md                (Conversion Blockers & Interaction Bugs)
├── OPPORTUNITIES.md           (Strategic Rebuild Enhancements)
├── QUESTIONS-FOR-JDC.md       (10 Management Decision Inquiries)
└── screenshots/
    ├── desktop/               (1920x1080, 1440x900, 1280x800 captures)
    ├── tablet/                (1024x768, 768x1024 captures)
    └── mobile/                (414x896, 390x844, 375x667, 320x568 captures)
```

---

## 10. Confirmation of Compliance

**STRICT AUDIT RULE ADHERENCE CONFIRMATION:**  
During the entire forensic audit phase, **NO production website code was modified, NO forms were submitted to live endpoints, NO emails or WhatsApp messages were transmitted, and NO data was altered on external servers.** The live website at `https://jdcsolar.com/` remains 100% untouched.
