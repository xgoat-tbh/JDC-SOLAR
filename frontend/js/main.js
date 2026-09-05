import { qs } from './core/dom.js';
import { initNavigation } from './components/navigation.js';
import { initModals } from './components/modal.js';
import { initForms } from './components/formHandler.js';
import { initThemeSwitcher } from './components/themeSwitcher.js';
import { initContactActions } from './components/contactActions.js';
import { initSolarCanvas } from './solarCanvas.js';

/* ──────────────────────────────────────────────────────────
   CRITICAL (above-fold) — statically imported, runs immediately
   ────────────────────────────────────────────────────────── */
function initCriticalComponents() {
  // Mobile / universal fallback for window.__lenis
  if (!window.__lenis) {
    window.__lenis = {
      stop: () => {},
      start: () => {},
      scrollTo: (target) => {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' });
        } else {
          const el = typeof target === 'string' ? document.querySelector(target) : target;
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
  }

  initThemeSwitcher();
  initNavigation();
  initModals();
  initContactActions();
  initForms();
  initSolarCanvas();

  // Prevent image drag
  document.addEventListener('dragstart', (e) => {
    if (e.target && (e.target.tagName === 'IMG' || e.target.closest('img') || e.target.closest('picture'))) {
      e.preventDefault();
    }
  });

  // Skip link
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

  // Universal smooth anchor scrolling
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ──────────────────────────────────────────────────────────
   LAZY INIT — IntersectionObserver triggers dynamic import
   ────────────────────────────────────────────────────────── */
function lazyInit(selector, initFn, rootMargin = '300px') {
  const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
  if (!elements || elements.length === 0) return;
  if (!('IntersectionObserver' in window)) {
    initFn();
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        observer.disconnect();
        initFn();
        break;
      }
    }
  }, { rootMargin });
  elements.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────────────────────
   DEFERRED — dynamic import() → code-split into lazy chunks
   All animations & interactions preserved; only the network
   fetch is deferred until the component is actually needed.
   ────────────────────────────────────────────────────────── */
function initDeferredComponents() {
  const isTouchOrMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);

  // 1. Below-the-fold components: dynamic import + IntersectionObserver
  lazyInit('[data-exploded-module]', () => import('./explodedModule.js').then(m => m.initExplodedModule()));
  lazyInit('[data-before-after]', () => import('./components/beforeAfterSlider.js').then(m => m.initBeforeAfterSliders()));
  lazyInit('.solar-calculator-ui', () => import('./components/calculatorUI.js').then(m => m.initCalculator()));
  lazyInit('select.form-select, select#calc-state, select#contact-service', () => import('./components/customSelect.js').then(m => m.initCustomSelects()));
  lazyInit('[data-accordion], .faq-section', () => import('./components/accordion.js').then(m => m.initAccordions()));
  lazyInit('[data-spec-card], .spec-cards-container', () => import('./specCards.js').then(m => m.initSpecCards()));
  lazyInit('[data-project-explorer]', () => import('./components/projectExplorer.js').then(m => m.initProjectExplorer()));
  lazyInit('[data-resource-explorer]', () => import('./components/resourceExplorer.js').then(m => m.initResourceExplorer()));
  lazyInit('.project-carousel-track', () => import('./components/carousel.js').then(m => m.initCarousel()));

  // 2. Fast-path user interaction listeners for lazy components
  const calcRoot = document.querySelector('.solar-calculator-ui');
  if (calcRoot) {
    calcRoot.addEventListener('focusin', () => import('./components/calculatorUI.js').then(m => m.initCalculator()), { once: true, passive: true });
    calcRoot.addEventListener('click', () => import('./components/calculatorUI.js').then(m => m.initCalculator()), { once: true, passive: true });
  }
  document.addEventListener('click', (e) => {
    if (e.target && e.target.closest && e.target.closest('[data-modal-open]')) {
      import('./components/customSelect.js').then(m => m.initCustomSelects());
    }
  }, { passive: true, once: true });

  // On-demand Lightbox: load only when a project card is clicked
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.card-project, [data-project-id], .horizontal-project-card');
    if (card && !e.target.closest('a.btn, button.btn')) {
      const projectId = card.getAttribute('data-project-id') ||
                        card.querySelector('[data-project-id]')?.getAttribute('data-project-id') ||
                        card.querySelector('a')?.getAttribute('href')?.split('/')?.filter(Boolean)?.pop();
      if (projectId) {
        e.preventDefault();
        import('./components/lightbox.js').then(m => m.openProjectLightbox(projectId));
      }
    }
  });

  // On-demand BackToTop: load on first user scroll
  window.addEventListener('scroll', () => {
    import('./components/backToTop.js').then(m => m.initBackToTop());
  }, { once: true, passive: true });

  // 3. Cooperative micro-tasks: exactly 1 lightweight task per frame/idle slice
  const tasks = [
    () => import('./components/scrollAnimations.js').then(m => m.initScrollAnimations()),
    () => import('./gsapEngine.js').then(m => m.initGsapEngine())
  ];

  // Desktop-only enhancements (smooth inertia scroll & mouse hover effects — skipped on mobile/touch)
  if (!isTouchOrMobile) {
    tasks.push(
      () => import('./components/smoothScroll.js').then(m => m.initSmoothScroll()),
      () => import('./components/tiltEffect.js').then(m => m.initTiltEffects()),
      () => import('./cardTilt.js').then(m => m.initCardTilt()),
      () => import('./magneticButton.js').then(m => m.initMagneticButtons()),
      () => import('./cursorSpotlight.js').then(m => m.initCursorSpotlight()),
      () => import('./components/navIndicator.js').then(m => m.initNavIndicator())
    );
  }

  let taskIndex = 0;
  function runNextTask() {
    if (taskIndex >= tasks.length) return;
    try {
      tasks[taskIndex++]();
    } catch (e) {
      console.warn('Deferred init error:', e);
    }

    if (taskIndex < tasks.length) {
      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(runNextTask, { timeout: 100 });
      } else {
        setTimeout(runNextTask, 0);
      }
    }
  }

  // Yield to browser idle after DOM paint before executing deferred queue
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(runNextTask, { timeout: 150 });
  } else {
    setTimeout(runNextTask, 0);
  }
}

function initGlobalComponents() {
  initCriticalComponents();
  initDeferredComponents();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalComponents);
} else {
  initGlobalComponents();
}
