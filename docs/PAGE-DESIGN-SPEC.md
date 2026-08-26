# JDC Solar 2.0: Page-by-Page Design Specification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/PAGE-DESIGN-SPEC.md`  
**Total Pages Specified:** 15 Pages / URLs  
**Design Standard:** WCAG 2.1 AA · Mobile-First Responsive · Conversion-Engineered  
**Author:** Lead UI/UX Architect & Visual Designer  
**Last Updated:** August 2026  

---

## 1. Complete Sitemap Page Index

- [Page 01: Homepage (`/`)](#page-01-homepage-)
- [Page 02: About Us (`/about/`)](#page-02-about-us-about)
- [Page 03: Services Overview Hub (`/services/`)](#page-03-services-overview-hub-services)
- [Page 04: Residential Rooftop Solar (`/services/residential-solar/`)](#page-04-residential-rooftop-solar-servicesresidential-solar)
- [Page 05: Commercial & Industrial Solar (`/services/commercial-solar/`)](#page-05-commercial--industrial-solar-servicescommercial-solar)
- [Page 06: Institutional Solar (`/services/institutional-solar/`)](#page-06-institutional-solar-servicesinstitutional-solar)
- [Page 07: Government & PSU Solar (`/services/government-solar/`)](#page-07-government--psu-solar-servicesgovernment-solar)
- [Page 08: Solar Street Lights (`/services/street-lights/`)](#page-08-solar-street-lights-servicesstreet-lights)
- [Page 09: Utility Solar Parks (`/services/solar-parks/`)](#page-09-utility-solar-parks-servicessolar-parks)
- [Page 10: Projects & Case Study Explorer (`/projects/`)](#page-10-projects--case-study-explorer-projects)
- [Page 11: Solar Savings & Subsidy Calculator (`/solar-calculator/`)](#page-11-solar-savings--subsidy-calculator-solar-calculator)
- [Page 12: PM Surya Ghar Citizen's Guide (`/pm-surya-ghar/`)](#page-12-pm-surya-ghar-citizens-guide-pm-surya-ghar)
- [Page 13: Contact Us & Site Survey Booking (`/contact/`)](#page-13-contact-us--site-survey-booking-contact)
- [Page 14: Corporate Privacy Policy (`/privacy-policy/`)](#page-14-corporate-privacy-policy-privacy-policy)
- [Page 15: Custom 404 Error Recovery Page (`/404.html`)](#page-15-custom-404-error-recovery-page-404html)

---

## Page 01: Homepage (`/`)

- **Purpose:** Primary digital storefront, brand authority builder, trust anchor, and multi-channel lead conversion engine.
- **Target Audience:** Residential homeowners, commercial enterprise owners, factory managers, institutional trustees.
- **Primary CTA:** `Calculate Your Subsidy & Savings` (Links to `/solar-calculator/` or opens inline calculator).
- **Secondary CTA:** `Talk to a Solar Expert` (Direct WhatsApp / Call dialer).

### Section-by-Section Architecture

#### Section 01: High-Impact Hero & Dual Conversion Gate
- **Purpose:** Communicate what JDC does within 3 seconds, establish regional credibility, and provide direct interactive conversion paths.
- **Content:**
  - Tagline Badge: `Jharkhand's Leading Solar EPC Company • Jagatdhan Commodities Lineage`
  - Main H1: `Power Your Home & Business with Smart, Reliable Solar Energy`
  - Supporting Copy: `Slash electricity bills by up to 90%. Turnkey residential rooftop solar with ₹78,000 PM Surya Ghar subsidy and high-capacity industrial power plants across Eastern India.`
  - CTA Group: Primary Button (`Calculate Solar Savings →`) + Secondary WhatsApp Button (`Chat with Solar Engineer`).
  - Trust Indicators: `500+ Solar Installations` | `25+ MW Installed Capacity` | `25-Year Panel Warranty`.
- **Layout & Visuals:** 2-column split layout on desktop. Left column holds text and CTAs. Right column features an interactive mini-calculator teaser card and high-resolution rooftop solar installation imagery.
- **Responsive Behavior:**
  - Desktop (`>= 1024px`): 2-column side-by-side hero composition.
  - Tablet (`768px - 1023px`): Stacked layout with text centered, followed by teaser card.
  - Mobile (`< 768px`): Compact stacked hero, fluid typography, full-width touch-friendly CTA buttons.
- **Animation:** Staggered fade-in on text (`var(--duration-slow) var(--ease-out)`). Zero motion for users with reduced motion preferences.

#### Section 02: Verified Credibility & Milestone Proof Bar
- **Purpose:** Provide immediate numerical validation of JDC’s real-world engineering track record.
- **Content:** 4 Stat Metric Cards:
  1. `500+` Projects Delivered
  2. `25+ MW` Solar Capacity Installed
  3. `90%` Average Electricity Bill Reduction
  4. `25,000+ Tons` Lifetime CO₂ Offset
- **Layout:** 4-column horizontal band on subtle ice-blue background (`var(--color-bg-alt)`).
- **Responsive:** 4 columns (desktop) -> 2x2 grid (tablet) -> 2x2 compact grid (mobile).
- **Animation:** Count-up numbers triggered on viewport entry via `IntersectionObserver`.

#### Section 03: PM Surya Ghar Muft Bijli Yojana Spotlight
- **Purpose:** Capture high-intent residential traffic seeking the ₹78,000 Central Government subsidy.
- **Content:**
  - Badge: `CENTRAL GOVERNMENT SUBSIDY SCHEME`
  - Heading (H2): `Get Up to ₹78,000 Subsidy Under PM Surya Ghar Yojana`
  - Body: Explain fixed subsidy slabs: 1kW (₹30,000), 2kW (₹60,000), 3kW+ (₹78,000) with end-to-end JDC liaisoning.
  - Sizing Quick Matrix: 4 cards showing 1kW, 2kW, 3kW, and 5kW system costs, subsidy amounts, and net customer costs.
  - CTA: `Claim Your Subsidy Today` -> `/pm-surya-ghar/`.
- **Layout:** Highlighted card container with solar orange accent border.

#### Section 04: 6-Pillar Core Solar Services Showcase
- **Purpose:** Present the complete spectrum of EPC capabilities across residential, B2B, and government sectors.
- **Content:** 6 Service Cards:
  1. Residential Rooftop Solar (PM Surya Ghar)
  2. Industrial & Commercial Rooftop Solar
  3. Health & Education Institution Solar
  4. Government & PSU Tender Projects
  5. Solar Street Lighting Systems
  6. Utility-Scale Solar Parks
- **Layout:** 3-column × 2-row grid on desktop with hover lift transitions.
- **Responsive:** 3 columns (desktop) -> 2 columns (tablet) -> 1 stacked column (mobile).

#### Section 05: Interactive 4-Step Installation Roadmap
- **Purpose:** Remove uncertainty and friction by explaining the turnkey execution workflow.
- **Content:** 4 Process Cards:
  - Step 01: `Free Site Assessment & Sizing` (Day 1-2)
  - Step 02: `Custom Engineering & Quotation` (Day 3-5)
  - Step 03: `Subsidy & DISCOM Net-Metering Approval` (Day 6-15)
  - Step 04: `Installation & Grid Commissioning` (Day 15-30)
- **Layout:** Horizontal timeline with connecting progression line on desktop; vertical roadmap on mobile.

#### Section 06: Featured Real-World Project Case Studies
- **Purpose:** Concrete proof of engineering quality with system capacity, location, and verified performance.
- **Content:** 3 Featured Project Cards (Industrial Factory in Adityapur, Commercial Plaza in Jamshedpur, Residential Villa in Ranchi).
- **Layout:** 3-column card grid with "Explore All Completed Projects →" link pointing to `/projects/`.

#### Section 07: Why Choose JDC Solar (The Engineering Advantage)
- **Purpose:** Differentiate JDC Solar from unorganized local installers through tier-1 quality and corporate backing.
- **Content:** 4 Value Pillars:
  1. `Tier-1 DCR Solar Modules & Inverters` (Waaree, Tata Power Solar, Growatt)
  2. `End-to-End DISCOM Liaisoning` (100% Net-meter paperwork handled)
  3. `25-Year Performance Warranty & Dedicated O&M`
  4. `Backed by Jagatdhan Commodities Lineage & Khetan Partnership`
- **Layout:** 2x2 grid with rich iconography.

#### Section 08: Verified Customer Testimonials Carousel
- **Purpose:** Authentic social proof from actual homeowners and factory managers.
- **Content:** 4-5 Testimonial Cards featuring client names, project locations, system capacities (kWp), star ratings, and review quotes.
- **Layout:** CSS scroll snap slider with manual next/prev chevrons and swipe gesture support.

#### Section 09: Frequently Asked Questions Accordion
- **Purpose:** Address objections regarding roof damage, cloudy days, DISCOM approvals, and maintenance.
- **Content:** 6 high-value questions using semantic `<details>`/`<summary>` with animated expand/collapse.
- **Schema:** Automatically linked to `FAQPage` JSON-LD schema.

#### Section 10: Authorized Component Brand Partners Ribbon
- **Purpose:** Leverage the trust equity of leading national and international solar manufacturers.
- **Content:** Infinite continuous logo ribbon displaying Waaree, Tata Power Solar, Adani, Growatt, Havells, Sungrow, Luminous.
- **Layout:** High-DPI monochrome vector SVGs with pause-on-hover.

#### Section 11: High-Conversion Pre-Footer Callout Banner
- **Purpose:** Final conversion sweep for visitors reaching page bottom.
- **Content:** Navy gradient background, H2: `Ready to Cut Your Electricity Bill by 90%?`, Sub-text: `Book a zero-obligation rooftop site survey with JDC engineers today.`, Dual CTAs: `Book Free Site Survey` (Opens Modal) + `WhatsApp Us Directly`.

---

## Page 02: About Us (`/about/`)

- **Purpose:** Detailed corporate history, Jagatdhan Commodities parentage, engineering values, Khetan alliance, and verified executive leadership.
- **Target Audience:** B2B commercial decision-makers, institutional trustees, and homeowners verifying corporate stability.
- **Primary CTA:** `Schedule Corporate Consultation` (Target: `/contact/`).
- **Secondary CTA:** `View Completed Installations` (Target: `/projects/`).

### Sections:
1. **Hero Banner:** H1: `Empowering India with Clean, Sustainable Solar Energy`, background visual of Adityapur industrial operations.
2. **Corporate Lineage & Heritage:** Narrative establishing JDC Solar as a dedicated renewable energy venture of Jagatdhan Commodities Pvt. Ltd.
3. **Mission, Vision & Engineering Philosophy:** 3 structured cards outlining sustainability, transparency, and long-term reliability.
4. **Verified Performance Milestones:** 4 SSR stat counter cards (`500+ Clients`, `25+ MW Capacity`, `25,000+ Tons CO₂`, `99% Uptime`).
5. **Strategic Industry Partnership with Khetan:** Detailed narrative on collaborative supply-chain and technical integration.
6. **Core Operating Values:** Integrity & Transparency, Quality & Reliability, Customer-Centric Engineering, Safety & Environmental Responsibility.
7. **Pre-Footer CTA Banner.**

---

## Page 03: Services Overview Hub (`/services/`)

- **Purpose:** Comprehensive solution directory detailing the 6 EPC service verticals and O&M maintenance capabilities.
- **Target Audience:** All prospective solar buyers seeking the appropriate service category.
- **Primary CTA:** `Explore Service Categories` (In-page anchor).
- **Secondary CTA:** `Download Corporate EPC Brochure` (PDF).

### Sections:
1. **Hero Header:** H1: `End-to-End Solar Engineering, Procurement & Construction (EPC)`.
2. **Interactive Service Solution Matrix:** 6 full-width horizontal feature cards detailing Residential, Commercial, Institutional, Government, Street Lights, and Solar Parks with capacity ranges (kW/MW) and links to sub-pages.
3. **Operations & Maintenance (O&M) Service Tier:** 3 cards covering Performance Monitoring, Scheduled Preventative Maintenance, and Rapid 24-48hr On-Site Technician Dispatch.
4. **Component Transparency & Quality Assurance:** Breakdown of Tier-1 Mono PERC/TOPCon panels, string inverters, and hot-dip galvanized mounting structures.
5. **Pre-Footer CTA Banner.**

---

## Page 04: Residential Rooftop Solar (`/services/residential-solar/`)

- **Purpose:** Dedicated conversion engine for homeowners seeking home rooftop systems and PM Surya Ghar subsidies.
- **Target Audience:** Independent house owners, villa residents, residential welfare associations (RWAs).
- **Primary CTA:** `Claim ₹78,000 PM Surya Ghar Subsidy` (Opens Site Survey Modal).
- **Secondary CTA:** `Calculate Sizing for Your Home` (`/solar-calculator/`).

### Sections:
1. **Hero Header:** H1: `Residential Rooftop Solar Installation & PM Surya Ghar Subsidy Support`.
2. **PM Surya Ghar Subsidy Breakdown:** Visual table showing 1kW (₹30k), 2kW (₹60k), 3kW (₹78k), and 5kW+ configurations with estimated savings.
3. **Standard Home Solar Packages:** 4 packaged system tiers (1kW, 2kW, 3kW, 5kW) with panel counts, roof area requirements (sq.ft), and monthly unit generation.
4. **End-to-End JDC Homeowner Workflow:** Step-by-step guide explaining how JDC manages National Portal registration, JBVNL net-meter approvals, and bank subsidy credit.
5. **Residential FAQ Accordion:** Specific residential questions on roof leak prevention, cloudy weather, and meter billing.
6. **Pre-Footer CTA Banner.**

---

## Page 05: Commercial & Industrial Solar (`/services/commercial-solar/`)

- **Purpose:** B2B commercial conversion engine addressing industrial power tariffs, CAPEX/RESCO financial models, and tax shields.
- **Target Audience:** Factory owners, managing directors, CFOs, commercial facility managers.
- **Primary CTA:** `Request Industrial Solar Feasibility Study` (Modal).
- **Secondary CTA:** `Download CAPEX / RESCO Financial Deck` (PDF).

### Sections:
1. **Hero Header:** H1: `Commercial & Industrial Solar Power Plants (20 kWp to 1 MW+)`.
2. **B2B Financial Models:** Side-by-side comparison table of **CAPEX (Direct Ownership)** vs **OPEX / RESCO (Zero-Investment Power Purchase Agreement)**.
3. **Section 32 Accelerated Depreciation (40% Tax Shield) Guide:** Clear explanation of how Indian commercial entities write off 40% of solar asset value in Year 1 to reduce corporate tax liabilities.
4. **High Tension (HT) Net-Metering & Grid Evacuation:** Technical compliance specifications for 11kV/33kV industrial power connections.
5. **Industrial Manufacturing Case Studies:** Filtered gallery of manufacturing units in Adityapur and Ranchi.
6. **Pre-Footer CTA Banner.**

---

## Page 06: Institutional Solar (`/services/institutional-solar/`)

- **Purpose:** Tailored solutions for educational campuses, hospitals, and medical diagnostic centers.
- **Target Audience:** School principals, university trustees, hospital administrators.
- **Primary CTA:** `Request Campus Feasibility Assessment`.
- **Key Modules:** 24/7 power reliability, diesel generator (DG) synchronization, campus sustainability credentials, case study examples.

---

## Page 07: Government & PSU Solar (`/services/government-solar/`)

- **Purpose:** Public sector tender EPC compliance and turnkey government building solarization.
- **Target Audience:** PSU officers, municipal engineers, public procurement authorities.
- **Primary CTA:** `Submit Tender Inquiry / RFP`.
- **Key Modules:** Strict technical tender compliance, domestic content requirement (DCR) modules, DISCOM liaisoning track record.

---

## Page 08: Solar Street Lights (`/services/street-lights/`)

- **Purpose:** Outdoor, township, and municipal solar lighting solutions.
- **Target Audience:** Township developers, industrial park associations, municipal corporations.
- **Primary CTA:** `Request Street Light Technical Specifications`.
- **Key Modules:** All-in-One integrated lights vs centralized systems, dusk-to-dawn intelligent sensors, lithium ferro-phosphate (LiFePO4) battery life.

---

## Page 09: Utility-Scale Solar Parks (`/services/solar-parks/`)

- **Purpose:** Megawatt-scale ground-mounted utility solar farms.
- **Target Audience:** Independent Power Producers (IPPs), land investors, industrial groups.
- **Primary CTA:** `Discuss Utility Solar Park Project`.
- **Key Modules:** Land development requirements (4 acres/MW), 33kV/132kV substation integration, environmental clearances, generation modeling.

---

## Page 10: Projects & Case Study Explorer (`/projects/`)

- **Purpose:** Interactive, filterable proof engine displaying completed residential, commercial, and industrial installations.
- **Target Audience:** Prospective buyers validating real-world execution capacity and build quality.
- **Primary CTA:** `Book Free Rooftop Site Survey`.
- **Secondary CTA:** `Filter by Category` (Interactive Pills).

### Sections:
1. **Hero Header:** H1: `Our Completed Solar Installations & Case Studies`.
2. **Category Filter Bar:** Sticky pill filters (`All Projects`, `Residential Rooftop`, `Commercial & Industrial`, `Institutional`, `Solar Parks`).
3. **Filterable Project Grid:** 6–12 Project Cards featuring capacity (kWp), location, monthly generation, panel brands, and site photography.
4. **Interactive Case Study Modal:** Clicking any card opens a detailed popup with technical specs and high-resolution photo gallery.
5. **Pre-Footer CTA Banner.**

---

## Page 11: Solar Savings & Subsidy Calculator (`/solar-calculator/`)

- **Purpose:** Standalone interactive tool providing instant system sizing, turnkey cost, PM Surya Ghar subsidy, 25-year financial savings, and WhatsApp quote sharing.
- **Target Audience:** High-intent residential and commercial solar buyers.
- **Primary CTA:** `Share Full Quote on WhatsApp`.
- **Secondary CTA:** `Book Free Rooftop Site Survey`.

### Sections:
1. **Hero Header:** H1: `Solar Savings, Sizing & PM Surya Ghar Subsidy Calculator for India`.
2. **Interactive Calculator Container:** 2-column card layout (Input Controls on left, Real-time Breakdown Summary on right).
3. **PM Surya Ghar Subsidy Explanation Box:** Clear breakdown of central government fixed slabs.
4. **State DISCOM Tariff Matrix:** Reference table showing domestic and commercial electricity rates across 16 states.
5. **Pre-Footer CTA Banner.**

---

## Page 12: PM Surya Ghar Citizen's Guide (`/pm-surya-ghar/`)

- **Purpose:** Comprehensive citizen resource manual demystifying the national rooftop solar subsidy scheme.
- **Target Audience:** Residential homeowners seeking clear, step-by-step guidance on how to apply.
- **Primary CTA:** `Apply for Subsidy with JDC Solar` (Opens Survey Modal).
- **Secondary CTA:** `Calculate Your Subsidy` (`/solar-calculator/`).

### Sections:
1. **Hero Header:** H1: `PM Surya Ghar: Muft Bijli Yojana Complete Subsidy & Application Guide`.
2. **Official Subsidy Slabs Matrix:** Verified table (1kW = ₹30,000, 2kW = ₹60,000, 3kW+ = ₹78,000).
3. **Step-by-Step National Portal Workflow:** Illustrated 5-stage guide (Registration -> Feasibility -> Vendor Selection -> Net Meter -> Subsidy Disbursement).
4. **Mandatory Document Checklist:** Electricity bill, Aadhaar card, bank passbook, rooftop photos.
5. **Why Register with JDC Solar as Your Approved Vendor:** Zero-hassle liaisoning with JBVNL/TSUISL.
6. **Pre-Footer CTA Banner.**

---

## Page 13: Contact Us & Site Survey Booking (`/contact/`)

- **Purpose:** Direct communication hub, registered office verification, and high-velocity site survey booking.
- **Target Audience:** Ready-to-convert leads and existing customer inquiries.
- **Primary CTA:** `Submit Site Survey Request`.
- **Secondary CTA:** `Call Directly: +91 9234611112`.

### Sections:
1. **Hero Header:** H1: `Contact JDC Solar & Schedule Your Free Rooftop Site Survey`.
2. **2-Column Contact Section:**
   - **Left Column (Office & Direct Dial):** Registered office address (`A-21 2nd Phase, Adityapur Industrial Area, Jamshedpur`), direct phone links, WhatsApp button, sales emails, operating hours.
   - **Right Column (High-Conversion Intake Form):** Name, 10-digit Indian Mobile, City/Pincode, Property Type, Monthly Bill/Units, Message.
3. **Interactive Office Map / Direction Landmark Card:** Clean map representation of Adityapur Industrial Area location.
4. **Pre-Footer CTA Banner.**

---

## Page 14: Corporate Privacy Policy (`/privacy-policy/`)

- **Purpose:** Full legal data governance and compliance text preserved verbatim from the audit.
- **Target Audience:** Legal compliance officers, enterprise clients.
- **Layout:** Focused single-column reading container (`max-width: var(--container-max-narrow)`).

---

## Page 15: Custom 404 Error Recovery Page (`/404.html`)

- **Purpose:** Graceful error handling directing lost visitors back into primary conversion funnels.
- **Anatomy:** Large 404 graphic + H1: `Page Not Found` + Sub-text: `The solar page you are looking for has moved or does not exist.` + Quick recovery buttons: `Return to Homepage`, `Open Solar Calculator`, `Explore Services`.
