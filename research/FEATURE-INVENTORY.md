# JDC Solar: Complete Feature Inventory & Technical Interaction Specification

**Audit Date:** August 2026  
**Auditor:** Lead Reverse Engineer & Technical Analyst  
**Scope:** Deep Forensic Analysis of All Interactive Components, UI Widgets, Triggers, Handlers, and External Dependencies  
**Evidence Standard:** DIRECTLY OBSERVED & CODE-VERIFIED  

---

## 1. Interactive Features Breakdown

---

### Feature 1: Desktop Navigation Menu
- **Location:** Header (Global across all pages)
- **Trigger:** Mouse hover / click
- **Current Behavior:** Displays flat horizontal list of navigation links: Home, About Us, Services, Projects, Solar Calculator, Contact Us. Active link indicator changes styling.
- **Desktop Behavior:** Horizontal layout with hover color shift (`#1B3766` -> `#FD8127`).
- **Mobile Behavior:** Hidden at viewports `< 1024px`, replaced by hamburger button.
- **Dependencies:** Royal Elementor Addons Nav Menu widget (`wpr-nav-menu`).
- **External Services:** None.
- **Potential Problems:** Lacks dropdown support for sub-services (e.g., Residential, Commercial, PM Surya Ghar), forcing users to navigate to high-level index pages.
- **Required for Rebuild:** YES (Enhanced with structured mega-menu / dropdowns).

---

### Feature 2: Mobile Navigation Drawer (Off-Canvas / Hamburger)
- **Location:** Header (Viewports `< 1024px`)
- **Trigger:** Tap on hamburger toggle button
- **Current Behavior:** Slides out an off-canvas drawer or vertical collapsible menu containing main site links and contact buttons.
- **Desktop Behavior:** Hidden via CSS media queries (`display: none`).
- **Mobile Behavior:** Full screen / drawer overlay with close (`X`) icon.
- **Dependencies:** Royal Elementor Addons Mobile Nav (`wpr-mobile-nav-menu`).
- **External Services:** None.
- **Potential Problems:** Tap targets are small on 320px screens; close button sometimes overlaps with header banner.
- **Required for Rebuild:** YES (Modern, accessible drawer with clean touch targets >= 48px).

---

### Feature 3: Interactive Solar Calculator
- **Location:** `/solar-calculator/` (Standalone Page)
- **Trigger:** User fills inputs (State, Service Type, Monthly Units, Connected Load) and clicks `Calculate Solar Details`.
- **Current Behavior:**
  - Client-side execution via inline JavaScript function `calculateSolar()`.
  - Reads `units` (kWh) and `service` (Residential / Commercial / Industrial).
  - Validates presence of fields using native browser `alert("Please fill all required fields")`.
  - Calculates:
    - `avgMonthlyBill = units * 7`
    - `systemSize = units / 120` (kW)
    - `annualGeneration = systemSize * 4 * 365`
    - `grossCost = systemSize * 55000`
    - `subsidy = (service === "residential") ? (systemSize <= 3 ? grossCost * 0.40 : (3 * 55000 * 0.40) + ((systemSize - 3) * 55000 * 0.20)) : 0`
    - `netCost = grossCost - subsidy`
    - `co2Saved = systemSize * 1.2` (tons/year)
  - Unhides `<div id="result">` and injects formatted HTML string.
- **Desktop Behavior:** Two-column card layout (Form on left, results reveal below).
- **Mobile Behavior:** Single-column layout; results container pushes footer down.
- **Dependencies:** Pure Vanilla JavaScript attached to DOM `onclick`.
- **External Services:** None.
- **Potential Problems:**
  - State selector and Connected Load inputs are completely ignored by the JavaScript algorithm!
  - Subsidy calculation uses obsolete MNRE Phase-II percentage slabs instead of current PM Surya Ghar Muft Bijli Yojana fixed benchmarks (₹30k / ₹60k / ₹78k).
  - No lead capture mechanism attached to calculation results (user receives estimate but no quote is generated).
- **Required for Rebuild:** CRITICAL (Must be upgraded with dynamic discom tariffs, real PM Surya Ghar subsidy rules, and instant quote lead generation).

---

### Feature 4: Lead Contact Form
- **Location:** `/contact/` (Contact Us Page)
- **Trigger:** Form submit button (`Send` / `Submit`)
- **Current Behavior:**
  - Form rendered via Royal Elementor Addons (`wpr-form`).
  - Fields: Name (text), Email (email, required), Message (textarea).
  - Submits via AJAX POST to `admin-ajax.php` with nonce `7369671691`.
- **Desktop Behavior:** Two-column section: Contact info & office address on left, Form on right.
- **Mobile Behavior:** Stacked single-column layout.
- **Dependencies:** Royal Elementor Addons Form Handler (`wpr-addons-js`), WordPress Admin AJAX.
- **External Services:** Hostinger mail / PHP `wp_mail()`.
- **Potential Problems:**
  - Missing Phone Number field! (Essential for Indian solar sales leads).
  - Missing City / Pincode field for rooftop feasibility check.
  - Lacks CAPTCHA or Cloudflare Turnstile spam protection.
- **Required for Rebuild:** CRITICAL (Needs Phone + OTP/WhatsApp verification and CRM integration).

---

### Feature 5: Sticky Header Navigation
- **Location:** Global Header
- **Trigger:** Page scroll downward
- **Current Behavior:** Header locks to viewport top (`position: fixed`) with reduced padding and shadow when scrolled past scroll threshold.
- **Desktop Behavior:** Smooth transition to compact header bar.
- **Mobile Behavior:** Sticky bar with compact logo and phone CTA icon.
- **Dependencies:** Elementor / Royal Elementor Addons Sticky Header module.
- **External Services:** None.
- **Potential Problems:** Slight layout jump / CLS when header transitions to fixed position.
- **Required for Rebuild:** YES (Rebuilt with zero-CLS CSS `position: sticky`).

---

### Feature 6: Floating Scroll-to-Top Button
- **Location:** Bottom-right viewport (Global across all pages)
- **Trigger:** Window scroll > 300px
- **Current Behavior:** Circular floating action button (`50px x 50px`, background `#5636d1`, hover `#e2498a`, z-index `9999`) fades in. Clicking smoothly scrolls window to top (`window.scrollTo({top: 0, behavior: 'smooth'})`).
- **Desktop Behavior:** Bottom-right corner (`right: 15px, bottom: 15px`).
- **Mobile Behavior:** Stays at bottom-right; occasionally overlaps mobile WhatsApp button or cookie banner.
- **Dependencies:** Happy Elementor Addons (`ha-scroll-to-top-button`).
- **External Services:** None.
- **Potential Problems:** Uses mismatched purple/pink brand colors (`#5636d1`, `#e2498a`) inconsistent with primary solar navy/orange theme.
- **Required for Rebuild:** YES (Restyled to match core navy/orange brand palette).

---

### Feature 7: Customer Reviews / Testimonials Carousel
- **Location:** Homepage (`/`)
- **Trigger:** Autoplay timer / touch swipe / navigation arrows
- **Current Behavior:** Slides through 5 customer review cards with star ratings and feedback quotes.
- **Desktop Behavior:** Multi-slide view (3 items visible).
- **Mobile Behavior:** Single-slide carousel with swipe gestures.
- **Dependencies:** Swiper.js (`swiper-container`, `swiper-slide`).
- **External Services:** None.
- **Potential Problems:** Review cards have generic titles ("Residential Solar Client") without client photos or project locations.
- **Required for Rebuild:** YES (Enhanced with real verified customer testimonials and project photos).

---

### Feature 8: FAQ Accordion
- **Location:** Homepage (`/`)
- **Trigger:** Click on question heading / toggle icon
- **Current Behavior:** Expands selected FAQ panel while collapsing others (single-active accordion). Animated height transition.
- **Desktop Behavior:** Clean bordered cards with chevron indicators.
- **Mobile Behavior:** Full-width collapsible cards with 16px padding.
- **Dependencies:** Elementor Accordion Widget (`elementor-accordion`).
- **External Services:** None.
- **Potential Problems:** Missing Schema.org `FAQPage` structured data markup in JSON-LD.
- **Required for Rebuild:** YES (Rebuilt with semantic `<details>`/`<summary>` and automated FAQ JSON-LD schema).

---

### Feature 9: Trusted Brands Carousel
- **Location:** Homepage (`/`)
- **Trigger:** Infinite auto-scroll / swiper loop
- **Current Behavior:** Continuously scrolls partner and component manufacturer logos.
- **Desktop Behavior:** 5-6 logos visible simultaneously.
- **Mobile Behavior:** 2-3 logos visible simultaneously.
- **Dependencies:** Swiper.js / Elementor Image Carousel widget.
- **External Services:** None.
- **Potential Problems:** Low resolution logo assets on high-DPI retina screens.
- **Required for Rebuild:** YES (Crisp SVG / optimized WebP brand assets).

---

### Feature 10: Click-to-Call Telephony Handlers
- **Location:** Header, Pre-Footer, Footer, Contact Page
- **Trigger:** Click on phone link
- **Current Behavior:** Triggers native OS dialer via `tel:+919234611112` and `tel:+919288381112`.
- **Desktop Behavior:** Opens default telephony app (e.g., FaceTime / Skype / Phone Link).
- **Mobile Behavior:** Opens mobile phone dialer.
- **Dependencies:** Native HTML5 `tel:` protocol.
- **External Services:** None.
- **Potential Problems:** Some links contain URL-encoded spaces (`tel:%20+91%209234611112`), which fail on certain Android dialers.
- **Required for Rebuild:** YES (Sanitized standard E.164 phone formats `tel:+919234611112`).

---

### Feature 11: WhatsApp Quick Chat Integration
- **Location:** Footer / Contact listings
- **Trigger:** Click on WhatsApp listing
- **Current Behavior:** Plain text listing `Whatsapp +91-9288381112`. Not hyperlinked to `https://wa.me/919288381112`!
- **Desktop/Mobile:** Static text without click-to-chat action.
- **Potential Problems:** Massive conversion loss — users must manually copy and save the number to start a WhatsApp chat.
- **Required for Rebuild:** CRITICAL (Must have floating WhatsApp widget and direct `wa.me` links with pre-filled message templates).

---

### Feature 12: Animated Counter Widgets
- **Location:** Homepage (`/`) & About Us (`/about/`)
- **Trigger:** Viewport intersection (Scroll into view)
- **Current Behavior:**
  - Homepage: Counts up numbers `500+`, `5,000+`, `245,000+`.
  - About Us: Stuck at `0+`, `0 MW+`, `0%`, `0%` due to JavaScript initialization failure!
- **Desktop/Mobile:** Triggers on scroll.
- **Dependencies:** Elementor Counter Widget / Waypoints.js.
- **Potential Problems:** Broke on `/about/`, displaying `0% Satisfied Clients` to prospective buyers.
- **Required for Rebuild:** YES (Lightweight CSS / Framer Motion / Vanilla JS counter with fallback SSR values).
