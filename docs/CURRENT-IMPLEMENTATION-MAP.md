# JDC Solar 2.0: Current Implementation & System Architecture Map

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/CURRENT-IMPLEMENTATION-MAP.md`  
**Architecture Type:** Pure Static HTML5 / CSS3 (Tokens) / Vanilla ES6 JavaScript  
**Hosting Target:** Hostinger Fast-Edge Static Web Hosting  
**Last Updated:** August 2026 (Phase 7 Integration)  

---

## 1. Production Route Inventory

| Route URI | Source File Path | Canonical URL | Indexability | Page Purpose & Description |
| :--- | :--- | :--- | :---: | :--- |
| `/` | `frontend/index.html` | `https://jdcsolar.com/` | `index, follow` | Production Homepage: High-conversion EPC hero, value proposition, calculator preview, services grid, case studies, trust metrics, and FAQ. |
| `/about/` | `frontend/about/index.html` | `https://jdcsolar.com/about/` | `index, follow` | Corporate Profile: Jagatdhan Commodities heritage, engineering leadership, verified MNRE partner credentials, mission, vision, and core values. |
| `/services/` | `frontend/services/index.html` | `https://jdcsolar.com/services/` | `index, follow` | Services Hub: Directory of all 6 solar verticals with capacity badges, process roadmap, and comparison matrix. |
| `/services/residential-solar/` | `frontend/services/residential-solar/index.html` | `https://jdcsolar.com/services/residential-solar/` | `index, follow` | Residential Rooftop Solar: PM Surya Ghar subsidy integration (₹78k), DCR panels, hybrid inverters, and JBVNL net-metering. |
| `/services/commercial-solar/` | `frontend/services/commercial-solar/index.html` | `https://jdcsolar.com/services/commercial-solar/` | `index, follow` | Commercial Rooftop Solar: 10kW to 500kW installations for malls, hotels, and retail plazas with Section 32 40% tax shield. |
| `/services/industrial-solar/` | `frontend/services/industrial-solar/index.html` | `https://jdcsolar.com/services/industrial-solar/` | `index, follow` | Industrial Rooftop Solar: High-capacity power plants for automotive ancillary plants, steel mills, and cold storage in Adityapur. |
| `/services/institutional-solar/` | `frontend/services/institutional-solar/index.html` | `https://jdcsolar.com/services/institutional-solar/` | `index, follow` | Institutional Solar: Healthcare campuses and university power plants with zero-export DG-synchronization controllers. |
| `/services/government-solar/` | `frontend/services/government-solar/index.html` | `https://jdcsolar.com/services/government-solar/` | `index, follow` | Government & PSU Solar: 100% DCR tender compliance, ALMM tier-1 modules, and state renewable nodal agency execution. |
| `/services/street-lights/` | `frontend/services/street-lights/index.html` | `https://jdcsolar.com/services/street-lights/` | `index, follow` | Solar Street Lighting: Standalone All-in-One LEDs with LiFePO4 batteries and dusk-to-dawn optical sensors. |
| `/services/solar-parks/` | `frontend/services/solar-parks/index.html` | `https://jdcsolar.com/services/solar-parks/` | `index, follow` | Utility Solar Parks: Ground-mounted MWp power plants with 33kV substation transmission evacuation and SCADA telemetry. |
| `/projects/` | `frontend/projects/index.html` | `https://jdcsolar.com/projects/` | `index, follow` | Projects & Case Studies: Interactive filterable grid with 8 verified case studies, technical modals, and hash deep-linking. |
| `/solar-calculator/` | `frontend/solar-calculator/index.html` | `https://jdcsolar.com/solar-calculator/` | `index, follow` | Solar Savings & Subsidy Calculator: Instant mathematical sizing, DISCOM tariff matrix, ₹78k subsidy modeling, and WhatsApp quote sharing. |
| `/pm-surya-ghar/` | `frontend/pm-surya-ghar/index.html` | `https://jdcsolar.com/pm-surya-ghar/` | `index, follow` | PM Surya Ghar Citizen Guide: Official subsidy slabs, 5-stage National Portal workflow, document checklist, and DBT guide. |
| `/resources/` | `frontend/resources/index.html` | `https://jdcsolar.com/resources/` | `index, follow` | Resources & Knowledge Hub: Searchable technical guides, PDF downloads, and unified FAQ repository. |
| `/resources/how-solar-rooftop-works/` | `frontend/resources/how-solar-rooftop-works/index.html` | `https://jdcsolar.com/resources/how-solar-rooftop-works/` | `index, follow` | Educational Guide 1: Photovoltaic physics, on-grid inverters, bidirectional net-meter equations, and anti-islanding. |
| `/resources/solar-maintenance-guide/` | `frontend/resources/solar-maintenance-guide/index.html` | `https://jdcsolar.com/resources/solar-maintenance-guide/` | `index, follow` | Educational Guide 2: Cleaning frequencies, water quality standards, thermal hotspot prevention, and earth pit checks. |
| `/resources/commercial-solar-tax-benefits/` | `frontend/resources/commercial-solar-tax-benefits/index.html` | `https://jdcsolar.com/resources/commercial-solar-tax-benefits/` | `index, follow` | Educational Guide 3: Section 32 40% Year-1 accelerated tax depreciation and corporate financial cash-flow modeling. |
| `/contact/` | `frontend/contact/index.html` | `https://jdcsolar.com/contact/` | `index, follow` | Contact Us: Adityapur headquarters, direct phone, WhatsApp chat, email, Google Maps link, and survey booking form. |
| `/privacy-policy/` | `frontend/privacy-policy/index.html` | `https://jdcsolar.com/privacy-policy/` | `index, follow` | Privacy Policy: Data controller details, zero data selling guarantee, and data protection commitments. |
| `/404.html` | `frontend/404.html` | `https://jdcsolar.com/404.html` | `noindex, follow` | Accessible Branded 404 Error Page: Search suggestions and 1-tap navigation recovery links. |
| `/components-preview.html` | `frontend/components-preview.html` | `https://jdcsolar.com/components-preview.html` | `noindex, nofollow` | Design System Component Test Harness: Visual catalog of all buttons, badges, cards, modals, and forms. |

---

## 2. CSS System Architecture

All stylesheets reside under `frontend/css/` and are bundled into a single high-performance pipeline via `frontend/css/main.css` (< 18 KB total):
```text
frontend/css/
├── main.css                  <-- Root master bundle
├── base/
│   ├── reset.css             <-- Modern CSS reset & box-sizing
│   ├── typography.css        <-- Fluid typography & line-heights
│   └── utilities.css         <-- Utility classes (.container, .grid, .flex, .sr-only)
├── tokens/
│   ├── colors.css            <-- Brand navy, solar orange, emerald green, slate grays
│   ├── spacing.css           <-- Fluid 4px grid spacing tokens
│   ├── typography.css        <-- System font stacks & font-size scale
│   ├── shadows.css           <-- Elevation shadow tokens
│   └── radius.css            <-- Border radius tokens
├── components/
│   ├── header.css            <-- Top trust bar, sticky header, desktop nav, mobile drawer
│   ├── footer.css            <-- 4-column footer, sub-footer, and mobile sticky action bar
│   ├── buttons.css           <-- Primary, secondary, ghost, whatsapp, and filter pills
│   ├── cards.css             <-- Base cards, service cards, project cards, process cards
│   ├── modals.css            <-- Native HTML5 <dialog> modal styling & backdrops
│   ├── forms.css             <-- Input controls, labels, error states, and spinners
│   ├── accordions.css        <-- Native <details>/<summary> animated accordions
│   └── badges.css            <-- Status, category, and outline badges
└── pages/
    └── home.css              <-- Homepage-specific hero & highlight layouts
```

---

## 3. JavaScript Module Architecture

All JavaScript is authored as native ES6 modules under `frontend/js/` with zero runtime dependencies (< 23 KB total):
```text
frontend/js/
├── main.js                   <-- Master bootstrap dispatcher initializing components conditionally
├── config.js                 <-- Application constants, brand metadata, and endpoints
├── core/
│   ├── dom.js                <-- Safe DOM query selectors (qs, qsa, on, off)
│   ├── events.js             <-- Event delegation helpers
│   └── formatters.js         <-- Indian currency (₹) & metric number formatters
├── components/
│   ├── navigation.js         <-- Sticky scroll state, mobile drawer, focus trapping, ESC handler
│   ├── modal.js              <-- Native <dialog> triggers, focus management, backdrop close
│   ├── accordion.js          <-- Single-expansion exclusive accordion behavior
│   ├── counter.js            <-- IntersectionObserver numerical stat ticker
│   ├── formHandler.js        <-- Honeypot anti-spam, 10-digit Indian phone regex, email validation
│   ├── toast.js              <-- Accessible floating notifications
│   ├── calculatorUI.js       <-- Sizing controller connecting UI to mathematical engine
│   ├── projectExplorer.js    <-- Project filtering, URL query sync, and case study modal
│   └── resourceExplorer.js   <-- Resource search, category filtering, and count badge sync
└── calculator/
    ├── config.js             <-- Centralized financial and insolation benchmarks
    ├── tariffs.js            <-- 16-state DISCOM electricity tariff matrix
    ├── subsidy.js            <-- PM Surya Ghar central subsidy engine
    ├── engine.js             <-- Pure mathematical sizing, generation, and payback engine
    └── quoteGenerator.js     <-- 1-tap pre-filled WhatsApp quotation URI generator
```

---

## 4. Single Sources of Truth (Data Layer)

- `frontend/data/projects.json` — 8 verified engineering case studies across residential, commercial, industrial, institutional, government, street lighting, and utility solar park sectors.
- `frontend/data/services.json` — Complete taxonomy of 6 core solar service offerings.
- `frontend/data/subsidies.json` — Centralized PM Surya Ghar subsidy slabs and RWA provisions.
- `frontend/data/resources.json` — Educational guide directory and downloadable technical PDF assets.
- `frontend/data/faqs.json` — Categorized FAQ repository traceable to official engineering sources.
