/**
 * JDC SOLAR 2.0 - MAIN ENTRY POINT & LIFECYCLE DISPATCHER
 * Modular ES6 architecture initializing components conditionally based on DOM markers
 */

import { APP_CONFIG } from './config.js';
import { qs, qsa } from './core/dom.js';

/**
 * Initialize global components active on all pages
 */
function initGlobalComponents() {
  // 1. Accessibility: Log system readiness in console
  if (typeof console !== 'undefined' && console.info) {
    console.info(`%c[${APP_CONFIG.brandName} 2.0] Foundation Initialized • WCAG 2.1 AA Ready`, 'color: #FD8127; font-weight: bold;');
  }

  // 2. Global Skip Link focus handler
  const skipLink = qs('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      const target = qs('#main-content');
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }
}

/**
 * Bootstrap application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  initGlobalComponents();
});
