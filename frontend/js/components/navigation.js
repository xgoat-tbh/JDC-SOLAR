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
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        if (window.scrollY > 20) this.header.classList.add('header--scrolled');
      });
    }
  }

  initMobileDrawer() {
    this.drawer = this.drawer || qs('.drawer');
    this.drawerToggle = this.drawerToggle || qs('.header__toggle-btn, [data-drawer-trigger]');
    this.drawerOverlay = this.drawerOverlay || qs('.drawer-overlay');

    if (!this.drawer) return;

    if (this.drawerToggle) {
      this.drawerToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.isDrawerOpen) {
          this.closeDrawer();
        } else {
          this.openDrawer();
        }
      });
    }

    // Delegated close listeners for any [data-drawer-close] or .drawer__close-btn
    document.addEventListener('click', (e) => {
      if (e.target && e.target.closest && e.target.closest('[data-drawer-close], .drawer__close-btn')) {
        e.preventDefault();
        this.closeDrawer();
        return;
      }
      if (this.isDrawerOpen && e.target && e.target.closest && e.target.closest('.drawer-overlay')) {
        e.preventDefault();
        this.closeDrawer();
        return;
      }
      // Auto-close drawer when any navigation link inside drawer is clicked
      if (this.isDrawerOpen && e.target && e.target.closest && e.target.closest('.drawer a')) {
        this.closeDrawer();
      }
    });

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
    if (this.drawerToggle) this.drawerToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    const closeBtn = qs('.drawer__close-btn, [data-drawer-close]', this.drawer);
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  closeDrawer() {
    if (!this.isDrawerOpen) return;
    this.isDrawerOpen = false;

    this.drawer.classList.remove('is-active');
    if (this.drawerOverlay) this.drawerOverlay.classList.remove('is-active');
    if (this.drawerToggle) this.drawerToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (this.previousFocusedElement && typeof this.previousFocusedElement.focus === 'function') {
      this.previousFocusedElement.focus();
    }
  }

  initDesktopDropdowns() {
    const items = qsa('.nav-desktop__item');
    
    items.forEach(item => {
      const dropdown = qs('.nav-desktop__dropdown', item);
      if (!dropdown) return;
      const link = qs('.nav-desktop__link', item);
      if (!link) return;

      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');

      
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
