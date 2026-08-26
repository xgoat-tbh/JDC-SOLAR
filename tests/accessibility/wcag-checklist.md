# JDC Solar 2.0: WCAG 2.1 AA Accessibility Checklist

**Document:** `tests/accessibility/wcag-checklist.md`  
**Standard:** Web Content Accessibility Guidelines (WCAG) 2.1 Level AA

- [ ] **1.1.1 Non-text Content:** 100% of informative images have descriptive `alt` text; decorative graphics have `alt="" aria-hidden="true"`.
- [ ] **1.4.3 Contrast (Minimum):** Body text contrast >= 4.5:1 against background; large text and UI boundaries >= 3.0:1.
- [ ] **2.1.1 Keyboard Navigation:** All navigation links, buttons, form inputs, dialogs, and accordions are operable via keyboard alone.
- [ ] **2.1.2 No Keyboard Trap:** Modal dialogs and mobile drawer trap focus while open and release focus upon closing.
- [ ] **2.4.1 Bypass Blocks:** A visible "Skip to main content" link is the first focusable element on every page.
- [ ] **2.4.7 Focus Visible:** A high-contrast 2px solid orange focus ring (`var(--color-brand-accent)`) with 2px offset appears on all focused interactive elements.
- [ ] **2.5.5 Target Size:** All touch targets on mobile viewports are >= 48px × 48px.
- [ ] **3.3.1 Error Identification:** Form input errors are announced to assistive technologies via `aria-describedby` and `aria-live="polite"`.
- [ ] **3.3.2 Labels or Instructions:** Every input, select, and textarea has a visible `<label>` bound via `for="[id]"`.
- [ ] **2.3.3 Animation from Interactions:** All CSS animations and transitions respect `@media (prefers-reduced-motion: reduce)`.
