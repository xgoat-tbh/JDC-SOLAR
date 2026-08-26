/**
 * JDC SOLAR 2.0 - GLOBAL NAVIGATION CONTROLLER
 * Handles sticky header states, desktop dropdown accessibility, mobile drawer toggle, and focus management
 */

import { qs, qsa } from '../core/dom.js';
import { throttle } from '../core/events.js';

export class NavigationController {
  constructor() {
    this.header = qs('.header');
    this.drawerToggle = qs('.header__toggle-btn');
    this.drawer = qs('.drawer');
    this.drawerOverlay = qs('.drawer-overlay');
    this.drawerClose = qs('.drawer__close-btn');
    this.isDrawerOpen = false;
    this.previousFocusedElement = null;

    this.init();
  }

  init() {
    this.initStickyHeader();
    this.initMobileDrawer();
    this.initDesktopDropdowns();
  }

  initStickyHeader() {
    if (!this.header) return;

    const handleScroll = throttle(() => {
      if (window.scrollY > 20) {
        this.header.classList.add('header--scrolled');
      } else {
        this.header.classList.remove('header--scrolled');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  initMobileDrawer() {
    if (!this.drawerToggle || !this.drawer) return;

    this.drawerToggle.addEventListener('click', () => this.openDrawer());

    if (this.drawerClose) {
      this.drawerClose.addEventListener('click', () => this.closeDrawer());
    }

    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', () => this.closeDrawer());
    }

    // Dismiss drawer on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDrawerOpen) {
        this.closeDrawer();
      }
    });
  }

  openDrawer() {
    if (this.isDrawerOpen) return;
    this.isDrawerOpen = true;
    this.previousFocusedElement = document.activeElement;

    this.drawer.classList.add('is-active');
    if (this.drawerOverlay) this.drawerOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    // Focus close button
    if (this.drawerClose) {
      this.drawerClose.focus();
    }
  }

  closeDrawer() {
    if (!this.isDrawerOpen) return;
    this.isDrawerOpen = false;

    this.drawer.classList.remove('is-active');
    if (this.drawerOverlay) this.drawerOverlay.classList.remove('is-active');
    document.body.style.overflow = '';

    // Restore focus to toggle button
    if (this.previousFocusedElement && typeof this.previousFocusedElement.focus === 'function') {
      this.previousFocusedElement.focus();
    }
  }

  initDesktopDropdowns() {
    const dropdownItems = qsa('.nav-desktop__item:has(.nav-desktop__dropdown)');
    
    dropdownItems.forEach(item => {
      const link = qs('.nav-desktop__link', item);
      const dropdown = qs('.nav-desktop__dropdown', item);
      if (!link || !dropdown) return;

      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');

      // Expand / collapse on focus and hover
      item.addEventListener('mouseenter', () => link.setAttribute('aria-expanded', 'true'));
      item.addEventListener('mouseleave', () => link.setAttribute('aria-expanded', 'false'));
      item.addEventListener('focusin', () => link.setAttribute('aria-expanded', 'true'));
      item.addEventListener('focusout', (e) => {
        if (!item.contains(e.relatedTarget)) {
          link.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

export function initNavigation() {
  return new NavigationController();
}
