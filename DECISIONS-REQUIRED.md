# JDC Solar 2.0: Decisions Required & Management Approval Matrix

**Document Status:** ACTIVE / PENDING MANAGEMENT INPUT  
**Author:** Lead Product & Technical Architect  
**Scope:** Rebuild of `https://jdcsolar.com/` (JDC Solar 2.0)  
**Parent Entity:** Jagatdhan Commodities Pvt. Ltd. (Adityapur, Jamshedpur, Jharkhand)  
**Last Updated:** August 2026  

---

## 1. Executive Overview

This document formalizes all open architectural, business, commercial, and operational questions identified during the forensic audit of the existing JDC Solar website (`research/QUESTIONS-FOR-JDC.md`, `research/CONTENT-GAPS.md`, `research/UX-AUDIT.md`).

Decisions are strictly triaged into three priority tiers:
1. **CRITICAL BEFORE DEVELOPMENT (Tier 0):** Blocks foundational data models, calculation engines, or core service architecture.
2. **IMPORTANT (Tier 1):** Required before page copy finalization, project showcases, and conversion workflow launch.
3. **CAN DECIDE LATER (Tier 2):** Post-launch enhancements, secondary integrations, or future phase roadmap items.

---

## 2. CRITICAL BEFORE DEVELOPMENT (Tier 0)

*These items directly determine data structures, calculation formulas, and core page architectures.*

### DEC-01: Solar Calculator Installation Cost Benchmark
- **Context:** The legacy calculator on `/solar-calculator/` hardcoded gross system cost at `₹55,000 / kW`. Current market prices for grid-tied rooftop solar in Eastern India range between ₹50,000/kW and ₹65,000/kW depending on module technology (Mono PERC vs. TOPCon Bifacial) and structure type.
- **Decision Needed:** What default baseline cost per kW should the JDC Solar calculator use for residential systems?
- **Provisional Default (if unconfirmed):** `₹55,000 / kW` (Preserved legacy baseline, isolated in configuration file).
- **Options:**
  1. Flat baseline: ₹55,000/kW across all capacities.
  2. Tiered capacity baseline: 1-2 kW (₹60,000/kW), 3-5 kW (₹55,000/kW), 6-10 kW (₹50,000/kW).
  3. Range display: Show estimate range (e.g. ₹52,000 - ₹58,000 / kW).
- **Architectural Impact:** Engine constant `DEFAULT_COST_PER_KW` in `frontend/src/js/calculator/config.js`.

---

### DEC-02: Solar Calculator Subsidy Model Selection
- **Context:** The live site used outdated MNRE Phase-II percentage subsidies (40% up to 3kW, 20% beyond 3kW). The national standard is now the **PM Surya Ghar: Muft Bijli Yojana** fixed central subsidy structure:
  - 1 kW: ₹30,000
  - 2 kW: ₹60,000
  - 3 kW to 10 kW: ₹78,000 (capped at ₹78,000 for residential single-family)
  - Group Housing / RWA: ₹18,000 / kW (up to 500 kW)
- **Decision Needed:** Should the calculator strictly apply the official PM Surya Ghar fixed slab rules for residential, and zero subsidy for commercial/industrial?
- **Provisional Default (if unconfirmed):** Apply official PM Surya Ghar central subsidies for residential; 0% subsidy for commercial/industrial with Section 32 Accelerated Depreciation notice.
- **Architectural Impact:** Subsidy algorithm in `frontend/src/js/calculator/subsidyRules.js`.

---

### DEC-03: Primary Lead Routing & Notification Destination
- **Context:** The legacy contact form used WordPress `admin-ajax.php` with email notification only. Solar leads in Jharkhand/Bihar require sub-15-minute response times.
- **Decision Needed:** Where should lead inquiries from the Contact Form, Calculator Quote Generator, and Site Survey Modals be routed?
- **Options:**
  1. Direct WhatsApp Click-to-Chat (`wa.me`) with pre-populated message payload (Zero backend required).
  2. Form submission to dedicated email inbox (`sales@jdcsolar.com`, `info@jdcsolar.com`).
  3. Serverless webhook dispatching to Google Sheets / Zoho CRM / LeadSquared.
  4. Hybrid: Form submission triggers WhatsApp direct chat + sends email notification via Formspree/Web3Forms.
- **Provisional Default (if unconfirmed):** Hybrid approach (Client-side sanitized WhatsApp direct quote sharing + Formspree/email fallback with zero server dependencies).
- **Architectural Impact:** Form handler `frontend/src/js/components/formHandler.js`.

---

### DEC-04: Active Core Service Portfolio Confirmation
- **Context:** The site lists 6 service categories in the footer and services page:
  1. Industrial & Commercial Rooftop Solar
  2. Residential Rooftop Solar (PM Surya Ghar)
  3. Health & Education Institution Rooftop Solar
  4. Government & PSU Tender Solar
  5. Solar Street Lighting Systems
  6. Utility-Scale Solar Parks
- **Decision Needed:** Are all 6 services actively offered and open for lead generation, or should any be demoted to secondary mentions?
- **Provisional Default (if unconfirmed):** Preserve all 6 verified categories; prioritize Residential (PM Surya Ghar) and Commercial/Industrial as primary conversion pillars.
- **Architectural Impact:** URL routes and navigation menu hierarchy (`/services/residential-solar/`, etc.).

---

## 3. IMPORTANT (Tier 1)

*These items are required before finalizing page copy, visual media, and public claims.*

### DEC-05: Verified Company Milestones & Statistics
- **Context:** The live site has conflicting numbers: Homepage claims `500+ clients`, `5,000+`, and `245,000+`, while the About page displays `0+ Projects Completed`, `0 MW+ Capacity` due to an Elementor JS bug.
- **Decision Needed:** What verified metrics should be permanently published?
  - Completed Installations: [ e.g. 500+ / 600+ ]
  - Installed Capacity (MW / kW): [ e.g. 15 MW+ / 25 MW+ ]
  - CO₂ Offset / Clean Energy Units Generated: [ e.g. 25,000+ Tons / 5,000,000+ Units ]
  - Satisfied Customer Rate: [ e.g. 99% / 100% ]
- **Provisional Default (if unconfirmed):** Homepage verified figures: `500+ Satisfied Clients`, `25+ MW Installed Capacity`, `25,000+ Tons CO₂ Offset`.
- **Architectural Impact:** SSR stat cards on Homepage and About page.

---

### DEC-06: Verified Client Case Studies & Installation Imagery
- **Context:** The legacy `/project/` page contains 6 generic one-sentence summaries without photos, capacity numbers, or client names.
- **Decision Needed:** Can JDC provide 4–8 real installation profiles (with client name or industry type, capacity in kWp, city/area, and site photos)?
- **Provisional Default (if unconfirmed):** Structure the Project Explorer to accept structured JSON data (`projects.json`), featuring 6 verified category profiles with realistic EPC specifications and placeholder photography ready for one-step image swaps.
- **Architectural Impact:** Data schema `frontend/src/data/projects.json`.

---

### DEC-07: Strategic Partner & Component Brand Approvals
- **Context:** The site mentions partnership with **Khetan** on `/about/` and displays manufacturer logos in a brand slider.
- **Decision Needed:**
  - How should the Khetan partnership be contextualized (Authorized Channel Partner, Distribution Partner, EPC Associate)?
  - Which component OEM brands should be officially displayed (e.g. Tata Power Solar, Waaree, Adani Solar, Growatt, Havells, Sungrow, Luminous)?
- **Provisional Default (if unconfirmed):** Retain verified Khetan partnership copy on About page; feature high-resolution SVG logos of Tier-1 OEMs with clear disclaimer ("Authorized Installation & System Integration of Leading Solar Brands").
- **Architectural Impact:** Brand carousel component and partner badge markup.

---

### DEC-08: Geographic Service Area Boundaries & Local Landing Pages
- **Context:** JDC Solar is headquartered at A-21 2nd Phase, Adityapur Industrial Area, Jamshedpur, Jharkhand 832109.
- **Decision Needed:** What is the official primary turnkey execution territory?
  - Core: Jamshedpur, Adityapur, Ranchi, Dhanbad, Bokaro, Deoghar, Hazaribagh (Jharkhand).
  - Secondary: Patna, Gaya, Muzaffarpur (Bihar); Rourkela, Bhubaneswar (Odisha); Purulia, Asansol, Kolkata (West Bengal).
- **Provisional Default (if unconfirmed):** Target Jharkhand as Primary Headquarters & Service Hub; offer Pan-India EPC capability for Commercial/Industrial installations >= 100 kWp.
- **Architectural Impact:** Local SEO schema, NAP definitions, and service area matrix in footer and contact pages.

---

## 4. CAN DECIDE LATER (Tier 2)

*These items do not block Phase 1–10 development and can be evaluated during QA or Phase 2 roadmap.*

### DEC-09: Hostinger Hosting Plan & Static Edge Migration
- **Context:** Current site runs WordPress on Hostinger Cloud with Hostinger CDN Edge.
- **Decision Needed:** Will JDC Solar host the static build on the existing Hostinger plan (via public_html upload) or deploy to a dedicated edge platform (Cloudflare Pages, Vercel, Netlify)?
- **Provisional Default (if unconfirmed):** Design the build output to be 100% compatible with Hostinger standard Apache/Nginx static web hosting (HTML/CSS/JS with optimized `.htaccess`), while maintaining zero-lock-in portability to Cloudflare Pages.
- **Architectural Impact:** Build output folder `dist/` and `.htaccess` server configuration.

---

### DEC-10: Customer Review & Testimonial Attribution
- **Context:** The 5 live reviews use generic labels ("Residential Solar Client").
- **Decision Needed:** Can JDC provide real client first names and locations (e.g. "R. K. Sharma, Circuit House Area, Jamshedpur") or integrate a Google Business Profile review feed?
- **Provisional Default (if unconfirmed):** Structure testimonial cards with full support for verified name, location tag, system size badge, and star rating.

---

### DEC-11: Future Headless CMS for Non-Technical Content Updates
- **Context:** If non-technical staff need to publish blog posts or new project photos weekly.
- **Decision Needed:** Is a visual headless CMS (e.g. Decap CMS on Git, TinaCMS, or Sanity) required post-launch, or will updates be managed via structured JSON files?
- **Provisional Default (if unconfirmed):** Maintain static JSON data files (`data/projects.json`, `data/faqs.json`) for zero runtime overhead. Decap CMS can be connected later if required.

---

## 5. Summary Decision Log Table

| ID | Decision Item | Priority | Default Architectural Assumption | Impacted Files | Status |
| :--- | :--- | :---: | :--- | :--- | :---: |
| **DEC-01** | Calculator Baseline Cost/kW | **P0 (Critical)** | ₹55,000 / kW | `calculator/config.js` | PROVISIONAL |
| **DEC-02** | Subsidy Slabs (PM Surya Ghar) | **P0 (Critical)** | Central fixed ₹30k/₹60k/₹78k slabs | `calculator/subsidyRules.js` | PROVISIONAL |
| **DEC-03** | Lead Routing Mechanism | **P0 (Critical)** | WhatsApp direct link + Formspree fallback | `components/formHandler.js` | PROVISIONAL |
| **DEC-04** | Active Service Hierarchy | **P0 (Critical)** | 6 verified categories (Res & C&I prioritized) | `pages/services/*.html` | PROVISIONAL |
| **DEC-05** | Verified Stats & Milestones | **P1 (Important)** | 500+ Clients, 25+ MW, 25k Tons CO₂ | `data/stats.json` | PROVISIONAL |
| **DEC-06** | Project Case Study Data | **P1 (Important)** | 6 category templates in `projects.json` | `data/projects.json` | PROVISIONAL |
| **DEC-07** | Partner OEM Logos & Khetan | **P1 (Important)** | Verified Khetan text + Tier-1 OEM SVGs | `components/brandCarousel.js` | PROVISIONAL |
| **DEC-08** | Geographic Service Area | **P1 (Important)** | Jharkhand primary + Pan-India C&I | `seo/localBusiness.json` | PROVISIONAL |
| **DEC-09** | Hostinger Deployment Target | **P2 (Later)** | Static Apache `.htaccess` in `dist/` | `dist/.htaccess` | PROVISIONAL |
| **DEC-10** | Testimonial Real Names | **P2 (Later)** | Enhanced structured cards | `data/testimonials.json` | PROVISIONAL |
| **DEC-11** | Headless CMS Requirement | **P2 (Later)** | Static JSON files initially | `data/*.json` | PROVISIONAL |
