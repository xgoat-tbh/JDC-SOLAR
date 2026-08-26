/**
 * JDC SOLAR 2.0 - ACCORDION CONTROLLER
 * Supports optional single-expand mode for FAQ accordions
 */

import { qsa } from '../core/dom.js';

export function initAccordions() {
  const accordionGroups = qsa('.accordion-group[data-single-expand="true"]');

  accordionGroups.forEach(group => {
    const items = qsa('.accordion-item', group);
    
    items.forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          items.forEach(otherItem => {
            if (otherItem !== item && otherItem.open) {
              otherItem.removeAttribute('open');
            }
          });
        }
      });
    });
  });
}
