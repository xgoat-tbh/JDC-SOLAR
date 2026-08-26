# JDC Solar 2.0: Reusable Component Catalog & UI Specification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/COMPONENT-CATALOG.md`  
**Target Stack:** Semantic HTML5 · Modular CSS3 Tokens · Vanilla ES6 JavaScript  
**Accessibility:** Full WCAG 2.1 Level AA Compliance  
**Author:** Lead UI/UX Architect & Component Engineer  
**Last Updated:** August 2026  

---

## 1. Overview & Architectural Contract

Every UI component in JDC Solar 2.0 is designed as an independent, modular building block. Components strictly consume design tokens from `docs/DESIGN-TOKENS.md`, maintain zero global scope pollution, and feature native keyboard/screen-reader accessibility built in by default.

---

## 2. Global Layout & Navigation Components

### 2.1 Component: Site Header & Desktop Navigation (`header`)

- **Purpose:** Primary brand identification, global section routing, instant contact telephony, and desktop quote call-to-action.
- **Anatomy:**
  - `Header Container`: Full-width wrapper with `position: sticky; top: 0;`.
  - `Inner Row`: Centered container (`max-width: var(--container-max-default)`) with flex layout.
  - `Brand Logo`: SVG/WebP JDC Solar wordmark + icon mark (linking to `/`).
  - `Navigation Links`: Semantic `<nav aria-label="Main Navigation">` with horizontal `<ul>` list.
  - `Sub-Services Dropdown`: Floating menu on "Services" revealing 6 sub-service links.
  - `Utility Actions`: Click-to-call link (`+91 9234611112`) + Primary CTA button (`Calculate Savings` -> `/solar-calculator/`).
  - `Mobile Hamburger Trigger`: Button visible only at viewports `< 1024px`.
- **Variants:**
  1. `default` (Solid white background `--color-bg-base`, subtle bottom border).
  2. `scrolled` (Compact 64px height, background `var(--color-bg-overlay-light)` with `backdrop-filter: blur(12px)`, shadow `var(--shadow-md)`).
- **States:** `initial`, `scrolled`, `dropdown-open`, `mobile-hidden`.
- **Responsive Behavior:**
  - Desktop (`>= 1024px`): Full horizontal menu + utility buttons visible. Hamburger hidden.
  - Tablet & Mobile (`< 1024px`): Desktop nav links and utility buttons hide; mobile hamburger toggle triggers off-canvas drawer.
- **Accessibility:**
  - Semantic `<header role="banner">` and `<nav>`.
  - Dropdown menu operates via keyboard focus (`Tab`, `Shift+Tab`, `Escape` dismiss).
  - Hamburger button includes `aria-expanded="false"`, `aria-controls="mobile-drawer"`, and `aria-label="Open navigation menu"`.
- **Animation:** Smooth height and shadow transition (`var(--duration-base) var(--ease-standard)`). Zero Cumulative Layout Shift (CLS = 0.000).

---

### 2.2 Component: Mobile Navigation Drawer (`drawer`)

- **Purpose:** Accessible off-canvas navigation and quick-contact hub for tablet and smartphone visitors.
- **Anatomy:**
  - `Backdrop Overlay`: Semi-transparent dark wash (`var(--color-bg-overlay)`) with `backdrop-filter: blur(4px)`.
  - `Drawer Panel`: Slide-out panel from viewport right (`width: min(85vw, 360px)`), background `var(--color-bg-base)`.
  - `Drawer Header`: JDC Logo + Close button (`X` icon, touch target `48px × 48px`).
  - `Navigation List`: Vertical stacked links with large touch targets (min height `48px`, padding `12px 16px`).
  - `Accordion Sub-Services`: Expandable "Services" group revealing 6 sub-links.
  - `Drawer Footer`: Direct dial button (`+91 9234611112`), 1-tap WhatsApp chat button, and physical address badge.
- **States:** `closed` (`visibility: hidden; transform: translateX(100%);`), `open` (`visibility: visible; transform: translateX(0);`).
- **Responsive Behavior:** Active exclusively on viewports `< 1024px`.
- **Accessibility:**
  - Role `dialog`, `aria-modal="true"`, `aria-label="Mobile Navigation"`.
  - **Focus Trap:** Tabbing cycles exclusively within open drawer; background page elements are inert.
  - Pressing `Escape` or tapping backdrop immediately closes drawer and restores focus to hamburger trigger.
  - Background `<body>` scroll locked (`overflow: hidden`) while open.
- **Animation:** Panel slides smoothly using `transform: translateX()` with `var(--duration-slow) var(--ease-out)`.

---

### 2.3 Component: Sticky Mobile Conversion Action Bar (`mobile-action-bar`)

- **Purpose:** High-velocity mobile conversion bar pinned to the bottom of the screen on smartphones.
- **Anatomy:**
  - 3 Equal-Width Action Tiles:
    1. `Call Us`: Dial icon + `Call` -> `tel:+919234611112`
    2. `WhatsApp`: WhatsApp icon + `Chat` -> `https://wa.me/919288381112?text=...`
    3. `Calculate`: Calculator icon + `Subsidy` -> `/solar-calculator/`
- **Responsive Behavior:** Visible only on screens `< 768px`; hidden on desktop. Pinned above device safe area (`env(safe-area-inset-bottom)`).
- **Accessibility:** Minimum `48px` touch targets; high-contrast icons; labeled text.
- **Animation:** Auto-hides on rapid downward scroll; reveals instantly on upward scroll.

---

### 2.4 Component: Global Footer (`footer`)

- **Purpose:** Corporate credentials, exhaustive navigation, legal compliance, registered office NAP, and trust verification.
- **Anatomy:**
  - 4 Structural Columns:
    - **Col 1 (Company & Heritage):** JDC Solar Inverted Logo, Jagatdhan Commodities lineage statement, ISO/EPC badges, social icons.
    - **Col 2 (Solar Services):** Direct links to all 6 sub-service pages.
    - **Col 3 (Quick Links & Tools):** Solar Calculator, PM Surya Ghar Guide, Completed Projects, About Us, Privacy Policy.
    - **Col 4 (Registered Office & Contact):** Complete NAP (`A-21 2nd Phase, Adityapur Industrial Area, Jamshedpur 832109`), clickable phone links, active WhatsApp button, email links.
  - **Bottom Sub-Footer:** Copyright notice (`© 2026 JDC Solar`), parent entity attribution, and back-to-top button.
- **Styling:** Dark navy background (`var(--color-brand-primary-dark)`), text `var(--color-text-inverse-body)`.
- **Responsive Behavior:** 4 columns on desktop (`>= 1024px`) -> 2 columns on tablet (`768px`) -> 1 stacked column on mobile (`< 768px`).

---

## 3. Interactive Button System (`button`)

### 3.1 Button Hierarchy & Specifications

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       BUTTON SPECIFICATIONS MATRIX                                     │
├───────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────────┤
│ Variant           │ Background               │ Text Color               │ Border / Elevation           │
├───────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────────┤
│ Primary Action    │ var(--color-brand-accent)│ #FFFFFF                  │ None / var(--shadow-sm)      │
│ Primary Hover     │ var(--color-brand-accent-│ #FFFFFF                  │ None / var(--shadow-md)      │
│                   │ hover)                   │                          │                              │
│ Secondary Outline │ Transparent              │ var(--color-brand-primary│ 2px solid                    │
│                   │                          │ )                        │ var(--color-brand-primary)   │
│ Secondary Hover   │ var(--color-brand-primary│ #FFFFFF                  │ 2px solid                    │
│                   │ )                        │                          │ var(--color-brand-primary)   │
│ WhatsApp Action   │ var(--color-accent-      │ #FFFFFF                  │ None / var(--shadow-sm)      │
│                   │ whatsapp)                │                          │                              │
│ WhatsApp Hover    │ var(--color-accent-      │ #FFFFFF                  │ None / var(--shadow-md)      │
│                   │ whatsapp-hover)          │                          │                              │
│ Ghost / Text Link │ Transparent              │ var(--color-brand-primary│ None / Animated Underline    │
│                   │                          │ )                        │                              │
│ Disabled          │ var(--color-bg-surface-  │ var(--color-text-disabled│ None / cursor: not-allowed   │
│                   │ sunken)                  │ )                        │                              │
└───────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────────┘
```

- **Sizing Tokens:**
  - `Size LG (Hero / Primary CTA):` Height `52px`, padding `14px 28px`, font size `var(--font-size-body)`, radius `var(--radius-md)`.
  - `Size MD (Standard Form / Cards):` Height `44px`, padding `10px 20px`, font size `var(--font-size-body-sm)`, radius `var(--radius-md)`.
  - `Size SM (Table / Compact Filters):` Height `36px`, padding `6px 14px`, font size `var(--font-size-caption)`, radius `var(--radius-sm)`.
- **States:** `default`, `hover` (`transform: translateY(-1px)`), `active` (`transform: translateY(0)`), `focus-visible` (`outline: 2px solid var(--color-brand-accent); outline-offset: 2px;`), `disabled` (`opacity: 0.6; pointer-events: none;`), `loading` (spinner icon replaces text).
- **Accessibility:** Guaranteed >= 4.5:1 contrast against white background; explicit `:focus-visible` outline.

---

## 4. Reusable Card Family

### 4.1 Service Showcase Card (`service-card`)
- **Purpose:** Presents one of the 6 core solar EPC solutions with key value propositions and navigation CTA.
- **Anatomy:**
  - `Icon Badge`: 48px circle container with brand accent icon.
  - `Category Tag`: Micro uppercase badge (e.g. `RESIDENTIAL`, `B2B INDUSTRIAL`).
  - `Title (H3)`: Clean Poppins 600 heading.
  - `Description`: 2-line concise summary of customer benefit.
  - `Feature Pills`: 2-3 key capability tags (e.g. `PM Surya Ghar`, `Net-Metering`, `Zero Down`).
  - `Footer Link`: "Learn More →" link with arrow hover transition.
- **Interaction:** Hover lifts card by `4px` (`transform: translateY(-4px)`), increases shadow to `var(--shadow-lg)`, highlights border with `var(--color-brand-accent)`.

---

### 4.2 Project Case Study Card (`project-card`)
- **Purpose:** High-credibility showcase of completed solar installations with verifiable metrics.
- **Anatomy:**
  - `Media Container`: 16:9 aspect ratio image container with lazy loading and zoom-on-hover.
  - `Capacity Pill`: Floating badge on image top-left (e.g. `250 kWp Rooftop`, `10 kW Villa`).
  - `Location Tag`: Location pin icon + City (e.g. `Adityapur Industrial Area, Jamshedpur`).
  - `Title (H3)`: Facility / Client sector description.
  - `Metrics Grid`: 2 mini data cells (e.g. `Generation: 30,000 Units/mo` | `CO₂ Offset: 300 Tons/yr`).
  - `CTA Button`: "View Case Study" or "Inquire Similar Project".
- **Filtering:** Supports dynamic JavaScript category attributes (`data-category="commercial"`).

---

### 4.3 Testimonial & Review Card (`testimonial-card`)
- **Purpose:** Customer social proof and third-party validation.
- **Anatomy:**
  - `Rating Stars`: 5 amber star icons (`var(--color-accent-amber)`).
  - `Quote Body`: Client review text in readable `var(--font-size-body)`.
  - `Author Row`: Client avatar / initials badge + Customer Name + Verified Customer Badge.
  - `Project Context`: System capacity and location subtitle (e.g. `5 kW Rooftop Solar • Bistupur, Jamshedpur`).
- **Styling:** White surface, `1px solid var(--color-border-default)`, `var(--shadow-sm)`.

---

### 4.4 Performance Metric Stat Card (`stat-card`)
- **Purpose:** Highlights verified company milestones and track record metrics.
- **Anatomy:**
  - `Numerical Milestone (H3)`: Fluid stat typography (`var(--font-size-stat)`), Poppins 800 bold in brand navy.
  - `Accent Plus (+)`: Colored in energetic solar orange (`var(--color-brand-accent)`).
  - `Label`: Concise uppercase descriptor (e.g. `PROJECTS COMPLETED`, `MW INSTALLED`).
  - `Context Sub-text`: Single-line explanation (e.g. `Across Jharkhand & Eastern India`).
- **Behavior:** Progressive count-up animation triggered via `IntersectionObserver` with SSR fallback value.

---

### 4.5 4-Step Process Card (`process-card`)
- **Purpose:** Demystifies the solar journey from initial site survey to grid commissioning.
- **Anatomy:**
  - `Step Number Badge`: Large circular step digit (`01`, `02`, `03`, `04`) with orange outline.
  - `Timeline Badge`: Estimated turnaround days (e.g. `Day 1-2`, `Day 3-5`, `Day 15-30`).
  - `Title (H3)`: Action-oriented step name (`Site Assessment & Solar Sizing`, `Subsidy & DISCOM Approvals`).
  - `Description`: Clear explanation of what JDC handles on the customer's behalf.

---

## 5. Accessible Form Control System (`form`)

### 5.1 Form Controls Matrix

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       FORM CONTROLS SPECIFICATION                                      │
├───────────────────┬──────────────────────────────────┬─────────────────────────────────────────────────┤
│ Control Type      │ HTML Semantics                   │ States & Validation Rules                       │
├───────────────────┼──────────────────────────────────┼─────────────────────────────────────────────────┤
│ Text Input        │ <input type="text">              │ Default, Focused (Orange ring), Error, Disabled │
│ Mobile Phone      │ <input type="tel">               │ Mandatory 10-digit Indian regex: /^[6-9]\d{9}$/ │
│ Email Address     │ <input type="email">             │ Standard RFC 5322 regex validation             │
│ Number / Units    │ <input type="number" min="1">    │ Monthly kWh units / monthly bill amount        │
│ Select Dropdown   │ <select>                         │ Custom styled arrow SVG; 16 State options       │
│ Radio Tile Group  │ <input type="radio"> in tile     │ Visual card selection for Property Type         │
│ Checkbox          │ <input type="checkbox">          │ Custom checked indicator for WhatsApp consent   │
│ Textarea          │ <textarea rows="4">              │ Free-form project requirements                  │
│ Honeypot Field    │ <input type="text" name="b_url"> │ Invisible to humans, catches automated bots     │
└───────────────────┴──────────────────────────────────┴─────────────────────────────────────────────────┘
```

### 5.2 Form Anatomy & Accessibility Rules
1. **Explicit Labels:** Every field MUST feature a visible `<label for="[id]">` above the input. Placeholders are strictly auxiliary hints (e.g. `placeholder="e.g. 9234611112"`).
2. **Error Communication:** When validation fails:
   - Input gets `border-color: var(--color-status-error)` and `aria-invalid="true"`.
   - Error message renders below input in red (`var(--color-status-error)`) linked via `aria-describedby="[id]-error"`.
   - Error text is announced to screen readers via `role="alert"`.
3. **No Disruptive Alerts:** Browser `window.alert()` dialogs are strictly prohibited. Feedback is rendered inline or via toast banners.

---

## 6. Accessible FAQ Accordion (`accordion`)

- **Purpose:** Answers high-intent questions regarding PM Surya Ghar subsidies, JBVNL net-metering, ROI payback, and equipment warranties.
- **Architecture:** Semantic HTML5 `<details>` and `<summary>` elements.
- **Anatomy:**
  - `Summary Header`: Question text (H4 font size) + animated chevron icon SVG (`20px × 20px`).
  - `Panel Content`: Detailed answer paragraph with internal links and bold keyword highlights.
- **States:**
  - `closed`: Chevron points down; answer height is `0`.
  - `open`: Chevron rotates `180deg` (`var(--color-brand-accent)`); answer expands with smooth height transition.
  - `focus`: Full accessible focus ring surrounding summary box.
- **Schema:** Automatically integrated with Schema.org `FAQPage` JSON-LD structured data.

---

## 7. Modal Dialog System (`modal`)

- **Purpose:** Rapid 3-field "Book Free Rooftop Solar Survey" intake modal and case study detail viewer.
- **Architecture:** Native HTML5 `<dialog>` element.
- **Anatomy:**
  - `Backdrop`: Semi-transparent blur overlay (`var(--color-bg-overlay)`).
  - `Modal Container`: White card (`max-width: 540px`), padding `var(--space-xl)`, radius `var(--radius-xl)`, shadow `var(--shadow-2xl)`.
  - `Modal Header`: Modal title (H3) + Close button (`X` icon, touch target `48px`).
  - `Modal Body`: Rapid form (Name, 10-digit Phone, City/Pincode, Property Type).
  - `Modal Footer`: Primary submit button + Privacy assurance note ("Zero spam. 100% free site inspection.").
- **Accessibility:** Traps tab focus; closes on `Escape` key; restores focus to opening trigger button; locks background scroll.

---

## 8. Brand Logo Ribbon / Carousel (`brand-carousel`)

- **Purpose:** Displays authorized OEM partner component logos (Waaree, Tata Power Solar, Adani, Growatt, Havells, Sungrow).
- **Anatomy:** Continuous horizontal scrolling logo track with fade masks on left and right edges.
- **Assets:** High-DPI monochrome vector SVGs with subtle color reveal on hover.
- **Accessibility:** Pauses animation immediately on `:hover` and `:focus-within`. Disables movement entirely under `@media (prefers-reduced-motion: reduce)`.

---

## 9. Solar Calculator UI Component (`calculator-ui`)

- **Purpose:** High-conversion interactive savings, sizing, and subsidy calculation interface.
- **Anatomy:**
  - **Left Card (Input Controls):**
    - State Selector (Dropdown with 16 states & DISCOM codes).
    - Service Type Selector (Segmented radio tiles: `Residential`, `Commercial`, `Industrial`).
    - Input Mode Toggle (`Monthly Units (kWh)` vs `Monthly Bill (₹)`).
    - Numeric Input / Slider hybrid control.
    - Calculate CTA Button.
  - **Right Card (Real-Time Results Summary):**
    - `Recommended System Size (kWp)` (Large hero badge in brand navy).
    - `Required Shadow-Free Rooftop Area` (sq. ft and sq. meters).
    - `Turnkey Gross System Cost` (₹).
    - `PM Surya Ghar Central Subsidy` (Highlighted in green pill: `₹78,000 Subsidized`).
    - `Net Customer Outflow` (₹).
    - `Estimated Annual Electricity Bill Savings` (₹/year).
    - `Estimated Simple Payback Period` (e.g. `2.8 Years`).
    - `Carbon Offset & Environmental Impact` (Tons CO₂ avoided / Trees planted).
  - **Bottom Conversion Actions:**
    - Primary Action: `Share Quote on WhatsApp` (Green WhatsApp button generating pre-filled quote message).
    - Secondary Action: `Book Free Rooftop Site Survey` (Opens 3-field modal with pre-filled kW size).

---

## 10. Notification Toast System (`toast`)

- **Purpose:** Non-disruptive feedback alert for form submissions and clipboard copy actions.
- **Anatomy:** Floating banner positioned top-right (desktop) or top-center (mobile), z-index `var(--z-layer-toast)`.
- **Variants:** `success` (Green icon + text), `error` (Red icon + text), `info` (Blue icon + text).
- **Accessibility:** `role="status"`, `aria-live="polite"`. Auto-dismisses after 5 seconds with manual `X` close button.
