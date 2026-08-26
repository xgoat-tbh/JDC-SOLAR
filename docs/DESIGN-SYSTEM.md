# JDC SOLAR 2.0: MASTER DESIGN SYSTEM SPECIFICATION

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/DESIGN-SYSTEM.md`  
**Brand Entity:** JDC Solar (A Jagatdhan Commodities Pvt. Ltd. Company)  
**Location:** A-21 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109  
**Lead Roles:** Lead Product Designer, UI/UX Architect, Interaction Designer, Visual Designer, Accessibility Architect  
**Design Standard:** WCAG 2.1 Level AA Compliant · Mobile-First · Sub-Second Performance  
**Last Updated:** August 2026  

---

## 1. Executive Summary & Design Philosophy

The JDC Solar 2.0 Design System is a comprehensive visual, structural, and interaction blueprint engineered to transform JDC Solar’s digital presence from a legacy WordPress template into an **authoritative, high-performance, conversion-engineered solar EPC platform**.

### 1.1 The Seven Core Pillars of JDC Solar Design Philosophy

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE 7 PILLARS OF JDC SOLAR DESIGN PHILOSOPHY                           │
├─────────────────────┬──────────────────────────────────────────────────────────────────────────────────┤
│ 1. Trust            │ Grounded in verifiable facts: Jagatdhan Commodities parentage, 500+ projects,    │
│                     │ Adityapur physical headquarters, and formal Khetan partnership credentials.      │
│ 2. Expertise        │ Demonstrates deep EPC engineering rigor: High Tension (HT) net-metering, Tier-1  │
│                     │ DCR solar panel datasheets, string inverters, and wind-load mounting structures. │
│ 3. Transparency     │ Demystifies pricing and subsidies: Clear PM Surya Ghar fixed slabs, accurate     │
│                     │ state DISCOM tariffs, and zero hidden costs or deceptive asterisks.              │
│ 4. Results          │ Focuses on measurable client ROI: Monthly kWh generation metrics, 25-year cumulative│
│                     │ bill savings (₹ INR), simple payback periods (years), and CO₂ offset tons.       │
│ 5. Sustainability   │ Celebrates clean renewable power with dignity and technical clarity, avoiding    │
│                     │ cartoonish eco-clichés, greenwashing leaves, or exaggerated environmental claims.│
│ 6. Local Authority  │ Authentically rooted in Jharkhand and Eastern India, addressing state-specific  │
│                     │ DISCOM regulations (JBVNL / TSUISL) and real industrial hubs (Adityapur, Ranchi).│
│ 7. Modern Capability│ Feels technologically current, instantaneous, crisp, and accessible across every │
│                     │ smartphone, tablet, and widescreen desktop display.                              │
└─────────────────────┴──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Visual Direction & Aesthetic Language

### 2.1 Aesthetic Identity: "Clean Industrial Precision"
The visual identity of JDC Solar 2.0 is defined as **Clean Industrial Precision** — combining the crisp daylight clarity of solar energy with the structural permanence of heavy EPC engineering.

- **The First 5 Seconds Experience:** A visitor arriving on the site immediately perceives:
  1. *This is an established, high-capacity solar engineering company, not an amateur middleman.*
  2. *They handle everything turnkey: survey, subsidy approvals, installation, and 25-year maintenance.*
  3. *I can calculate my exact savings and subsidy right now, or message an engineer directly on WhatsApp.*
- **Color Balance:**
  - **60% Dominant Canvas:** Pure White (`#FFFFFF`) and Crisp Off-White (`#F8FAFC`) to maximize daylight feel, reading contrast, and scannability.
  - **30% Structural Surface:** Deep Solar Navy (`#1B3766` / `#122544`) for primary headings, hero compositions, and authoritative dark footer surfaces.
  - **10% High-Energy Accent:** Solar Energetic Orange (`#FD8127` / `#E06A14`) and Amber (`#FF6900`) strictly reserved for primary call-to-action buttons, key milestones, highlight badges, and focus rings.
- **Whitespace & Rhythm:** Generous, intentional whitespace (fluid section padding from `48px` on mobile to `96px` on desktop) ensures high-density technical and financial data remains effortlessly scannable.
- **Photography Balance:** Authentic real-world rooftop solar installations (monocrystalline panels, manufacturing plants, inverter setups) replace generic stock photos of handshake models or AI-generated fantasy solar panels.
- **Restrained Motion:** Subtle, purposeful micro-interactions (soft button hover lifts, smooth accordion expansions, viewport-triggered stat counters) that assist user comprehension without causing distraction or lag.

---

## 3. Brand Preservation Guidelines

### 3.1 Preserved Brand Assets (Non-Negotiable Core)
- **Corporate Name:** JDC Solar (Wordmark and Graphic Sun/Panel Mark).
- **Parent Legal Entity:** Jagatdhan Commodities Pvt. Ltd. (Integrated into header trust badge, about page, and footer copyright).
- **Primary Brand Colors:** Deep Solar Navy (`#1B3766`) and Solar Orange (`#FD8127`).
- **Registered Headquarters:** `A-21 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109`.
- **Contact Numbers:** Primary: `+91 9234611112`, WhatsApp: `+91 9288381112`, Email: `info@jdcsolar.com`, `sales@jdcsolar.com`.
- **Strategic Partnership:** Formal business relationship with **Khetan**.

### 3.2 What Is Strictly Eliminated & Redesigned
- **Eliminated:** All unconverted Elementor template placeholder copy (`/detail-service/`, `/team/`).
- **Eliminated:** Broken counter widgets (which displayed `0+ Projects`, `0% Satisfied Clients`).
- **Eliminated:** 59 blocking CSS stylesheets (1.36 MB) and monolithic jQuery plugins.
- **Eliminated:** Unlinked plain-text WhatsApp footer listings.
- **Eliminated:** Inaccessible light gray text on gray backgrounds failing contrast standards.
- **Eliminated:** 1-sentence generic project descriptions devoid of technical specifications.

---

## 4. Design Foundation Systems

Complete design tokens and component contracts are codified in:
- [DESIGN-TOKENS.md](file:///d:/JDC%20solar/docs/DESIGN-TOKENS.md) — Exact CSS Custom Properties for Colors, Typography, Spacing, Elevation, Containers, Breakpoints, Motion, and Z-Index.
- [COMPONENT-CATALOG.md](file:///d:/JDC%20solar/docs/COMPONENT-CATALOG.md) — Granular specifications for Headers, Drawers, Footers, Buttons, Cards, Forms, Modals, Accordions, and Calculator UI.
- [PAGE-DESIGN-SPEC.md](file:///d:/JDC%20solar/docs/PAGE-DESIGN-SPEC.md) — Section-by-section visual layouts across all 15 planned pages.
- [WIREFRAMES.md](file:///d:/JDC%20solar/docs/WIREFRAMES.md) — Structural layout schematics and ASCII wireframes.
- [DESIGN-DECISIONS.md](file:///d:/JDC%20solar/docs/DESIGN-DECISIONS.md) — 10 formalized Design Decision Records (DDRs).

---

## 5. Major Interaction & Conversion Systems

### 5.1 The 3-Channel High-Velocity Lead Intake Engine

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   3-CHANNEL LEAD INTAKE ARCHITECTURE                                   │
├────────────────────────────────┬──────────────────────────────────────┬────────────────────────────────┤
│ CHANNEL 1: WHATSAPP DIRECT     │ CHANNEL 2: SITE SURVEY MODAL         │ CHANNEL 3: SANITIZED CALL      │
├────────────────────────────────┼──────────────────────────────────────┼────────────────────────────────┤
│ • Instant 1-tap quote chat     │ • Rapid 3-field popup dialog         │ • Clean E.164 phone protocol   │
│ • Pre-filled kW size & savings │ • Captures Name, Phone, City, Load   │ • Header & sticky action bar   │
│ • Sub-5 minute sales response  │ • Instant email alert to sales team  │ • Immediate phone connection   │
│ • 0% form abandonment friction │ • 100% phone number validation regex │ • Primary: +91 9234611112      │
└────────────────────────────────┴──────────────────────────────────────┴────────────────────────────────┘
```

### 5.2 The Solar Calculator & PM Surya Ghar Sizing System
- **Two-Column Dashboard Experience:** Real-time synchronization between user input controls (Monthly kWh units / Monthly ₹ bill, Property Type, State DISCOM) and calculation summary cards.
- **Subsidy Transparency:** Highlights the official Central Government PM Surya Ghar subsidy in a high-visibility green pill (`₹78,000 Central Subsidy`), immediately showing the reduced **Net Customer Investment**.
- **Actionable Conversion Gate:** Directly connects calculated numbers to "Share Full Quote on WhatsApp" and "Book Free Rooftop Site Survey" buttons, eliminating legacy conversion dead ends.

### 5.3 The Sticky Mobile Conversion Action Bar
- Pinned to the bottom of mobile screens (`< 768px`) above the browser safe-area inset.
- Displays 3 high-contrast, accessible 48px action tiles: `Call Us` (`tel:+919234611112`), `WhatsApp Chat` (`wa.me`), and `Calculate Subsidy` (`/solar-calculator/`).
- Auto-hides on rapid downward scroll and reveals instantly on upward scroll.

---

## 6. Image & Asset Direction

### 6.1 Sourcing & Authenticity Rules
1. **Authentic EPC Photography:** Hero banners and project case studies must prioritize authentic photographs of real JDC solar installations in Jharkhand (Adityapur manufacturing roofs, Jamshedpur commercial complexes, Ranchi residential villas).
2. **Strict Aspect Ratios:**
   - Hero Banners: `16:9` on Desktop, `4:3` on Tablet, `1:1` / `4:5` on Mobile.
   - Project Case Study Cards: `16:9` standardized card thumbnails.
   - Testimonial Avatars: `1:1` circular badges (`48px × 48px`).
   - Partner OEM Logos: Max height `40px` inside a `120px × 48px` transparent SVG container.
3. **Next-Gen WebP/AVIF Delivery:** 100% of photographic assets must be delivered in WebP or AVIF formats with responsive `srcset` (400w, 800w, 1200w).
4. **Explicit Dimensions:** Every image tag MUST specify `width` and `height` attributes to guarantee zero Cumulative Layout Shift (CLS = 0.000).

---

## 7. Iconography System

- **Icon Style:** Modern, clean, geometric stroke icons (`1.75px` to `2.0px` stroke width) with rounded caps and joins (`stroke-linecap="round" stroke-linejoin="round"`).
- **Format:** SVG Vector Sprite (`assets/icons/sprite.svg`) referenced via semantic `<svg class="icon"><use href="#icon-name"></use></svg>`.
- **Standard Sizing Scale:**
  - Micro / Inline Icon: `16px × 16px` (e.g. Checkmarks, location pins, arrow links).
  - Standard UI Icon: `20px × 20px` (e.g. Accordion chevrons, button icons, form validation).
  - Action / Feature Icon: `24px × 24px` (e.g. Mobile action bar, header telephone).
  - Hero / Service Badge Icon: `32px × 32px` to `48px × 48px` inside circular badge containers.
- **Color Mapping:** Icons strictly inherit contextual color tokens (Brand Orange `var(--color-brand-accent)`, Brand Navy `var(--color-brand-primary)`, or Emerald `var(--color-accent-whatsapp)`).

---

## 8. Motion Design & Accessibility Standards

### 8.1 Motion Principles
1. **Physics-Based & Functional:** Transitions communicate state changes (expanded accordion, opened drawer, active tab, hovered button). No decorative bouncing or gratuitous spinning.
2. **Transform & Opacity Only:** All animations are restricted to GPU-accelerated CSS properties (`transform: translateY()`, `transform: scale()`, `opacity`). Layout-thrashing properties (`height`, `width`, `top`, `margin`) are strictly prohibited in animations.
3. **Restrained Durations:**
   - Micro-interactions (hover, active click): `150ms` (`var(--duration-fast)`).
   - Component state transitions (dropdown, accordion, card hover): `250ms` (`var(--duration-base)`).
   - Dialog & drawer open/close: `350ms` (`var(--duration-slow)`).

### 8.2 WCAG 2.1 AA Accessibility Mandates
- **Contrast Ratios:** Minimum **4.5:1** for body text and **3.0:1** for large headings and active UI borders.
- **Visible Focus Rings:** High-contrast 2px solid orange outline (`var(--color-brand-accent)`) with 2px offset on all keyboard-focused elements (`:focus-visible`).
- **Keyboard Traps:** Mobile navigation drawer and site survey modal dialog trap keyboard focus when active and dismiss cleanly on `Escape`.
- **Reduced Motion:** Automatic disabling of all transitions and animations when `@media (prefers-reduced-motion: reduce)` is detected.
- **Semantic Forms:** 100% of input controls have visible `<label for="...">` tags and live error announcements via `aria-live="polite"`.

---

## 9. Design Quality & Anti-Cliché Rules

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                      DESIGN QUALITY CONTROL MATRIX                                     │
├─────────────────────────────────────────────────┬──────────────────────────────────────────────────────┤
│ DO THIS (MANDATED STANDARDS)                    │ DO NOT DO THIS (STRICTLY PROHIBITED)                 │
├─────────────────────────────────────────────────┼──────────────────────────────────────────────────────┤
│ ✔ Use intentional, generous whitespace          │ ✖ Do NOT use generic purple/pink SaaS gradients      │
│ ✔ Use verified real installation photography    │ ✖ Do NOT use cartoonish green leaf / eco clichés     │
│ ✔ Use high-contrast, readable typography        │ ✖ Do NOT use low-contrast light gray text on gray    │
│ ✔ Format currency as ₹ INR with commas (en-IN)  │ ✖ Do NOT invent fake customer names or fake stats    │
│ ✔ Provide 1-tap direct WhatsApp & Call actions  │ ✖ Do NOT bury contact phone numbers in plain text    │
│ ✔ Keep all interactive touch targets >= 48px    │ ✖ Do NOT use tiny 24px mobile touch targets          │
│ ✔ Show verified PM Surya Ghar fixed subsidies   │ ✖ Do NOT use obsolete MNRE percentage subsidy formulas│
│ ✔ Implement zero-CLS sticky navigation          │ ✖ Do NOT use layout-jumping fixed JS headers         │
│ ✔ Support prefers-reduced-motion globally       │ ✖ Do NOT create auto-playing disruptive animations   │
└─────────────────────────────────────────────────┴──────────────────────────────────────────────────────┘
```

---

## 10. Design System Validation & Compliance Sign-Off

- [x] **Brand Recognition:** Preserves JDC Solar identity, logo, and verified Deep Navy (`#1B3766`) / Solar Orange (`#FD8127`) palette.
- [x] **UX & Journeys:** Eliminates all 7 friction dead ends identified in the audit; fully supports residential, commercial, and mobile flows.
- [x] **Responsive Rigor:** Complete mobile-first architecture specified across all 9 target viewports (320px to 1920px).
- [x] **Accessibility Standard:** Exceeds WCAG 2.1 Level AA across contrast, keyboard navigation, touch targets, and ARIA semantics.
- [x] **Technical SEO:** Pre-rendered semantic HTML hierarchy, rich JSON-LD structured data, and crawlable internal links.
- [x] **Performance Budget:** Ultra-lean design requiring zero heavy JS frameworks, reducing CSS to < 28 KB and JS to < 35 KB.
- [x] **Complete Sitemapped Coverage:** All 15 planned URLs fully specified with custom section hierarchies and CTAs.

---

**PHASE 2 DESIGN SYSTEM SPECIFICATION COMPLETE.**  
*Ready for Phase 3 Project Foundation and Asset Preparation upon authorization.*
