# JDC Solar 2.0: Frontend Technical Architecture Specification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**Stack:** HTML5 · CSS3 (Custom Properties & Grid) · Modular Vanilla JavaScript (ES6 Modules)  
**Target:** 100/100 Lighthouse Performance & Full WCAG 2.1 AA Compliance  
**Author:** Lead Software & UX Architect  
**Last Updated:** August 2026  

---

## 1. Architectural Philosophy & Principles

The frontend architecture of JDC Solar 2.0 is designed around five core engineering tenets:
1. **Zero-Runtime Framework Overhead:** Zero dependencies on external JavaScript/CSS frameworks. The browser engine itself is the runtime.
2. **Design-Token-Driven CSS System:** 100% of visual properties (colors, typography, spacing, shadows, radius, transitions) are governed by centralized CSS Custom Properties.
3. **Decoupled Component Lifecycle:** Self-contained UI components that initialize only when their matching DOM container is present on the page.
4. **Progressive Enhancement:** All critical business copy, service descriptions, project case studies, and contact options are pre-rendered in semantic HTML and accessible without JavaScript execution.
5. **Ultra-Lean Asset Delivery:** Native next-gen images (WebP/AVIF) with responsive `srcset` and self-hosted `woff2` font subsets.

---

## 2. Design Token Architecture (`tokens.css`)

### 2.1 Color Palette Tokens (Preserved Brand Identity)

```css
:root {
  /* Primary Brand Colors */
  --color-primary-navy: #1B3766;      /* Main headings, hero elements, dark surfaces */
  --color-primary-navy-dark: #122544; /* Darker navy for footer backgrounds */
  --color-primary-navy-light: #284c85;/* Hover states on navy elements */

  /* Solar Accent Colors */
  --color-accent-orange: #FD8127;     /* Primary CTA buttons, key highlights, badges */
  --color-accent-orange-hover: #E06A14;/* Darker orange for accessible focus/hover */
  --color-accent-amber: #FF6900;      /* Warning badges, rating stars, energy accents */
  --color-accent-purple: #605BE5;     /* Subtitle badges, secondary accent borders */

  /* Neutral Text & Surface Colors */
  --color-text-main: #222222;         /* Primary body copy (high contrast 11.5:1 on white) */
  --color-text-muted: #555555;        /* Secondary captions, subtitles (contrast 7.0:1 on white) */
  --color-text-inverse: #FFFFFF;      /* Text on dark navy backgrounds */
  --color-text-inverse-muted: #D8E1EB;/* Subtitles on dark navy backgrounds */

  /* Backgrounds & Surfaces */
  --color-bg-body: #FFFFFF;           /* Base page background */
  --color-bg-alt: #F4F7FA;            /* Soft cool grey for alternating sections */
  --color-bg-surface: #FFFFFF;        /* Card & container backgrounds */
  --color-bg-surface-elevated: #FFFFFF;
  --color-bg-tag: #EBF2FA;            /* Tag pill backgrounds */

  /* Borders & Dividers */
  --color-border-light: #E2E8F0;      /* Default card borders, dividers */
  --color-border-focus: #FD8127;      /* Active input focus rings */
  --color-border-dark: #1B3766;       /* High-contrast borders */

  /* Semantic Feedback Colors */
  --color-success: #10B981;
  --color-success-bg: #ECFDF5;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-error-bg: #FEF2F2;
  --color-whatsapp: #25D366;          /* WhatsApp official brand green */
}
```

### 2.2 Typography System Tokens

```css
:root {
  /* Font Families */
  --font-heading: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Fluid Typography Scale (using clamp) */
  --font-size-hero: clamp(2.25rem, 5vw + 1rem, 3.75rem);   /* 36px to 60px */
  --font-size-h1: clamp(2.0rem, 4vw + 0.5rem, 3.0rem);      /* 32px to 48px */
  --font-size-h2: clamp(1.6rem, 3vw + 0.5rem, 2.25rem);     /* 25px to 36px */
  --font-size-h3: clamp(1.25rem, 2vw + 0.25rem, 1.625rem);  /* 20px to 26px */
  --font-size-h4: clamp(1.1rem, 1.5vw, 1.25rem);            /* 17px to 20px */
  --font-size-body: clamp(0.95rem, 1vw + 0.5rem, 1.0625rem);/* 15px to 17px */
  --font-size-small: clamp(0.85rem, 0.5vw + 0.5rem, 0.925rem);/* 13px to 15px */
  --font-size-badge: 0.75rem;                                /* 12px */

  /* Line Heights */
  --line-height-tight: 1.15;
  --line-height-heading: 1.25;
  --line-height-body: 1.65;
  --line-height-relaxed: 1.8;
}
```

### 2.3 Spacing, Elevation & Layout Tokens

```css
:root {
  /* Fluid Spacing Scale */
  --space-2xs: 0.25rem;   /* 4px */
  --space-xs: 0.5rem;     /* 8px */
  --space-sm: 0.75rem;    /* 12px */
  --space-md: 1.0rem;     /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2.0rem;     /* 32px */
  --space-2xl: 3.0rem;    /* 48px */
  --space-3xl: 4.5rem;    /* 72px */
  --space-section: clamp(3.0rem, 6vw, 6.0rem); /* 48px to 96px */

  /* Container Widths */
  --container-sm: 720px;
  --container-md: 960px;
  --container-lg: 1200px;
  --container-xl: 1360px;
  --container-gutter: clamp(1.0rem, 4vw, 2.5rem);

  /* Border Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows (Subtle, Modern Elevation) */
  --shadow-sm: 0 1px 3px rgba(27, 55, 102, 0.06), 0 1px 2px rgba(27, 55, 102, 0.04);
  --shadow-md: 0 4px 12px rgba(27, 55, 102, 0.08), 0 2px 4px rgba(27, 55, 102, 0.04);
  --shadow-lg: 0 12px 28px rgba(27, 55, 102, 0.12), 0 4px 8px rgba(27, 55, 102, 0.06);
  --shadow-xl: 0 20px 40px rgba(27, 55, 102, 0.16);

  /* Transitions & Motion */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Z-Index Hierarchy */
  --z-negative: -1;
  --z-base: 1;
  --z-sticky: 100;
  --z-dropdown: 200;
  --z-fab: 300;
  --z-drawer: 400;
  --z-modal: 500;
  --z-toast: 600;
}
```

---

## 3. Modular Component Architecture

Every UI component in JDC Solar 2.0 follows a strict 3-tier decoupling contract:
1. **Markup Contract (HTML):** Accessible semantic tags with standardized `data-component="[name]"` and `aria-*` attributes.
2. **Styling Contract (CSS):** Scoped CSS classes under `frontend/css/components/[name].css` consuming `tokens.css`.
3. **Behavioral Contract (JS):** An ES module in `frontend/js/components/[name].js` exporting an `init()` function with explicit setup and teardown methods.

### 3.1 Component Inventory & Contract Specifications

#### Component 1: Sticky Site Header & Desktop Nav (`header.css`, `navigation.js`)
- **Purpose:** Global branding, main section navigation, direct phone click-to-call, quote CTA, and mobile hamburger trigger.
- **States:** `default` (transparent or solid), `scrolled` (compact 64px bar with subtle shadow), `mobile-open`.
- **Accessibility:** Semantic `<nav aria-label="Main Navigation">`, keyboard-tabbable links, visible focus rings.
- **Performance:** Implemented via CSS `position: sticky; top: 0;` to ensure zero Cumulative Layout Shift (CLS = 0.000).

#### Component 2: Mobile Navigation Drawer (`drawer.css`, `navigation.js`)
- **Purpose:** Off-canvas slide-out drawer providing full navigation links, contact numbers, and WhatsApp button for screens `< 1024px`.
- **States:** `closed` (`aria-hidden="true"`, `visibility: hidden`, `transform: translateX(100%)`), `open` (`aria-hidden="false"`, `visibility: visible`, `transform: translateX(0)`).
- **Accessibility:** Focus trap inside drawer; closes instantly upon pressing `Escape` key; locks background body scroll.

#### Component 3: Solar Calculator (`calculator.css`, `calculator/`)
- **Purpose:** High-conversion savings and subsidy estimator for residential, commercial, and industrial consumers.
- **Inputs:** State Selector (16 states with DISCOM tariffs), Service Type (Residential / Commercial / Industrial), Monthly Consumption (kWh / Units) or Monthly Bill (₹ INR), Sanctioned Connected Load (kW).
- **Outputs:** System Size (kWp), Required Rooftop Area (sq.ft / sq.m), Estimated Annual Generation (kWh), Gross Turnkey Cost (₹), PM Surya Ghar Subsidy (₹), Net Customer Investment (₹), 25-Year Cumulative Savings (₹), Carbon Offset (Tons CO₂ / Trees planted).
- **States:** `initial`, `calculating`, `results-revealed`, `lead-captured`.
- **Accessibility:** All inputs bound to explicit `<label>` tags; live announcement of result calculations via `aria-live="polite"`.

#### Component 4: Accessible FAQ Accordion (`accordion.css`, `accordion.js`)
- **Purpose:** Resolves common customer inquiries regarding net-metering, subsidies, installation timelines, and equipment warranties.
- **Architecture:** Semantic HTML5 `<details>` and `<summary>` tags enhanced with progressive JavaScript animation for smooth height interpolation.
- **Schema:** Automatically linked to JSON-LD `FAQPage` schema on page render.
- **Accessibility:** Native keyboard arrow navigation and `Enter`/`Space` expansion.

#### Component 5: Project Explorer & Category Filter (`project-card.css`, `projectFilter.js`)
- **Purpose:** Filterable showcase of real rooftop solar installations across residential, commercial, industrial, and institutional sectors.
- **Inputs:** Filter pills (`All`, `Residential`, `Commercial`, `Industrial`, `Institutional`, `Solar Parks`).
- **States:** Active category toggle, real-time DOM card filtering with smooth fade/scale transitions, empty state fallback.

#### Component 6: Interactive Lead Modals & Toast System (`modal.css`, `modal.js`, `toast.css`, `toast.js`)
- **Purpose:** Rapid 3-field "Book Free Rooftop Survey" intake modal and non-disruptive submission feedback alerts.
- **Architecture:** Native HTML5 `<dialog>` element with standard polyfill fallback.
- **Accessibility:** Trapped focus, backdrop click dismiss, `Escape` key listener, `aria-modal="true"`.

---

## 4. JavaScript Architecture & Module Execution Lifecycle

```text
[Browser Page Load]
       │
       ▼
[DOMContentLoaded Event]
       │
       ▼
[frontend/js/main.js] ── (Application Bootstrap & Route Dispatcher)
       │
       ├──► 1. Detect active page route (`data-page="..."`)
       ├──► 2. Initialize global singleton components:
       │       ├── Navigation Controller (`navigation.js`)
       │       ├── Sticky Mobile Action Bar (`navigation.js`)
       │       └── Floating Action Button (`navigation.js`)
       │
       └──► 3. Conditionally initialize page-specific modules:
               ├── If `#solar-calculator-form` exists ──► `calculator/controller.js`
               ├── If `.faq-accordion` exists         ──► `components/accordion.js`
               ├── If `.project-filter-bar` exists    ──► `components/projectFilter.js`
               ├── If `.stat-counter` exists          ──► `components/counter.js`
               ├── If `.brand-carousel` exists        ──► `components/carousel.js`
               └── If `form[data-validate]` exists    ──► `components/formHandler.js`
```

### 4.1 DOM Utility Architecture (`core/dom.js`)
Centralizes all safe DOM interactions into lightweight, pure utility functions:
- `qs(selector, scope)`: Safe `querySelector` wrapper with null checks.
- `qsa(selector, scope)`: Safe `querySelectorAll` returning a standard JavaScript `Array`.
- `createElement(tag, attrs, children)`: Functional DOM node builder.
- `setAttributes(el, attrs)`: Batch attribute setter.
- `sanitizeHTML(str)`: String escaper preventing XSS vulnerabilities.

### 4.2 Form Handling & Conversion Engine (`components/formHandler.js`)
1. **Client-Side Validation:** Validates Indian 10-digit mobile numbers (`/^[6-9]\d{9}$/`), email formats, and required fields.
2. **Spam Mitigation:** Incorporates invisible honeypot field (`<input type="text" name="b_url" tabindex="-1" autocomplete="off" class="sr-only">`) and timestamp rate limiting.
3. **WhatsApp Link Payload Generator:** Formats structured chat payloads:
   ```javascript
   export function generateWhatsAppQuoteURI(data) {
     const text = `*New Solar Inquiry - JDC Solar Website*
👤 *Name:* ${data.name || 'Not provided'}
📱 *Phone:* ${data.phone}
📍 *Location:* ${data.city || 'Jharkhand'}
⚡ *Monthly Units:* ${data.units || 'N/A'} kWh
🏠 *Rooftop Type:* ${data.serviceType || 'Residential'}
📊 *Estimated Size:* ${data.systemSize || 'Custom'} kW
💰 *Est. Net Investment:* ₹${data.netCost || 'Pending Survey'}`;
     return `https://wa.me/919288381112?text=${encodeURIComponent(text)}`;
   }
   ```

---

## 5. Responsive Design & Breakpoint Matrix

Base styles are authored **Mobile-First** (`320px+`). Layout transformations are applied at standardized breakpoint tokens:

| Breakpoint Name | Media Query Token | Target Devices | Key Layout Transformations |
| :--- | :---: | :--- | :--- |
| **Mobile Narrow** | Base (`>= 320px`) | iPhone SE, small Androids | Single-column layout; stacked form inputs; full-width buttons; slim 52px header. |
| **Mobile Standard** | `@media (min-width: 480px)` | Modern smartphones | 2-column stat grids; optimized button padding; fluid hero headings. |
| **Tablet Portrait** | `@media (min-width: 768px)` | iPads, 7-8" tablets | 2-column service & project grids; 2-column calculator layout; persistent search/filter bar. |
| **Tablet Landscape** | `@media (min-width: 1024px)` | Large tablets, small laptops | Desktop navigation bar reveals; mobile drawer hides; 3-column project grid. |
| **Desktop Standard** | `@media (min-width: 1280px)` | Laptops, 1080p monitors | Full 1200px container max-width; multi-column footer; rich hover effects active. |
| **Widescreen HD** | `@media (min-width: 1440px)` | 2K/4K high-res displays | 1360px expanded container; higher-density vector illustrations. |

---

## 6. Asset Optimization & Font Strategy

1. **Self-Hosted Webfonts:** Self-host Latin character subsets of `Poppins` (Weights: 600, 700) and `Inter` (Weights: 400, 500) in `woff2` format inside `frontend/assets/fonts/`. Preload only `Poppins-600.woff2` and `Inter-400.woff2` in HTML `<head>`:
   ```html
   <link rel="preload" href="/assets/fonts/poppins-600.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/assets/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin>
   ```
2. **Responsive Picture Elements:** All content imagery must be delivered via semantic `<picture>` tags with WebP and fallback JPEG formats:
   ```html
   <picture>
     <source srcset="/assets/images/hero/hero-400.webp 400w, /assets/images/hero/hero-800.webp 800w, /assets/images/hero/hero-1200.webp 1200w" type="image/webp" sizes="(max-width: 768px) 100vw, 50vw">
     <img src="/assets/images/hero/hero-800.jpg" alt="Rooftop solar installation in Jamshedpur" width="800" height="600" loading="eager" fetchpriority="high">
   </picture>
   ```
3. **SVG Icons:** Reusable vector icons (sun, checkmark, lightning, call, WhatsApp, arrow) stored in a lightweight SVG sprite (`frontend/assets/icons/sprite.svg`) referenced via `<svg><use href="#icon-solar-panel"></use></svg>`.
