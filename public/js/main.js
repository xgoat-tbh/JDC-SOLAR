import { qs } from './core/dom.js';
import { initNavigation } from './components/navigation.js';
import { initModals } from './components/modal.js';
import { initAccordions } from './components/accordion.js';
import { initForms } from './components/formHandler.js';
import { initCalculator } from './components/calculatorUI.js';
import { initProjectExplorer } from './components/projectExplorer.js';
import { initResourceExplorer } from './components/resourceExplorer.js';
import { initScrollAnimations } from './components/scrollAnimations.js';
import { initTiltEffects } from './components/tiltEffect.js';
import { initCarousel } from './components/carousel.js';
import { initThemeSwitcher } from './components/themeSwitcher.js';
import { initCustomSelects } from './components/customSelect.js';
import { initContactActions } from './components/contactActions.js';
import { initBeforeAfterSliders } from './components/beforeAfterSlider.js';
import { initProjectLightbox } from './components/lightbox.js';
import { initCardTilt } from './cardTilt.js';
import { initMagneticButtons } from './magneticButton.js';
import { initCursorSpotlight } from './cursorSpotlight.js';
import { initExplodedModule } from './explodedModule.js';
import { initBackToTop } from './components/backToTop.js';
import { initNavIndicator } from './components/navIndicator.js';
import { initGsapEngine } from './gsapEngine.js';
import { initSpecCards } from './specCards.js';
import { initSmoothScroll } from './components/smoothScroll.js';
import { initSolarCanvas } from './solarCanvas.js';

function initCriticalComponents() {
  initThemeSwitcher();
  initNavigation();
  initModals();
  initContactActions();
  initForms();
  initCustomSelects();
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
}

function initDeferredComponents() {
  // Chunk deferred initializations into micro-batches to prevent long tasks (>50ms) and eliminate TBT
  const taskBatches = [
    () => {
      initAccordions();
      initTiltEffects();
      initCarousel();
    },
    () => {
      initBeforeAfterSliders();
      initProjectLightbox();
      initCalculator();
    },
    () => {
      initProjectExplorer();
      initResourceExplorer();
      initSmoothScroll();
    },
    () => {
      initScrollAnimations();
      initCardTilt();
      initMagneticButtons();
    },
    () => {
      initCursorSpotlight();
      initExplodedModule();
      initBackToTop();
    },
    () => {
      initNavIndicator();
      initGsapEngine();
      initSpecCards();
    }
  ];

  let batchIndex = 0;
  function runNextBatch() {
    if (batchIndex >= taskBatches.length) return;
    try {
      taskBatches[batchIndex++]();
    } catch (e) {
      console.warn('Deferred init error:', e);
    }
    if (batchIndex < taskBatches.length) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(runNextBatch, { timeout: 1200 });
      } else {
        setTimeout(runNextBatch, 50);
      }
    }
  }

  runNextBatch();
}

function initGlobalComponents() {
  initCriticalComponents();

  if ('requestIdleCallback' in window) {
    requestIdleCallback(initDeferredComponents, { timeout: 2500 });
  } else {
    setTimeout(initDeferredComponents, 120);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalComponents);
} else {
  initGlobalComponents();
}
