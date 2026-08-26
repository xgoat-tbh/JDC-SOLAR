/**
 * JDC SOLAR 2.0 - MAIN ENTRY POINT & LIFECYCLE DISPATCHER
 * Modular ES6 architecture initializing global components conditionally based on DOM markers
 */

import { APP_CONFIG } from './config.js';
import { qs } from './core/dom.js';
import { initNavigation } from './components/navigation.js';
import { initModals } from './components/modal.js';
import { initAccordions } from './components/accordion.js';
import { initStatCounters } from './components/counter.js';
import { initForms } from './components/formHandler.js';
import { initCalculator } from './components/calculatorUI.js';
import { initProjectExplorer } from './components/projectExplorer.js';
import { initResourceExplorer } from './components/resourceExplorer.js';
import { initScrollAnimations } from './components/scrollAnimations.js';

/**
 * Initialize global components active across all pages
 */
function initGlobalComponents() {
  if (typeof console !== 'undefined' && console.info) {
    console.info(`%c[${APP_CONFIG.brandName} 2.0] Global Components Initialized • WCAG 2.1 AA Compliant`, 'color: #FD8127; font-weight: bold;');
  }

  // 1. Global Skip Link focus handler
  const skipLink = qs('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', () => {
      const target = qs('#main-content');
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }

  // 2. Global Navigation & Mobile Drawer
  initNavigation();

  // 3. Modal Dialogs
  initModals();

  // 4. Accordions & FAQ Lists
  initAccordions();

  // 5. Numerical Stat Counters
  initStatCounters();

  // 6. Accessible Forms & Validation
  initForms();

  // 7. Solar Calculator Subsystem (if present on page)
  initCalculator();

  // 8. Projects & Case Studies Explorer (if present on page)
  initProjectExplorer();

  // 9. Resources & Educational Content Explorer (if present on page)
  initResourceExplorer();

  // 10. Scroll Reveal Animations & Micro-Interactions
  initScrollAnimations();
}

/**
 * Bootstrap application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  initGlobalComponents();
});
