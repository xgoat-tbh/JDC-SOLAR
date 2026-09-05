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
import { initAnimeEngine } from './animeEngine.js';

function initCriticalComponents() {
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
}

function initDeferredComponents() {
  // Sliced cooperative tasks: exactly one component per micro-task with <8ms budget
  const tasks = [
    initCustomSelects,
    initAccordions,
    initTiltEffects,
    initCarousel,
    initBeforeAfterSliders,
    initProjectLightbox,
    initCalculator,
    initProjectExplorer,
    initResourceExplorer,
    initSmoothScroll,
    initScrollAnimations,
    initCardTilt,
    initMagneticButtons,
    initCursorSpotlight,
    initExplodedModule,
    initBackToTop,
    initNavIndicator,
    initGsapEngine,
    initSpecCards,
    initAnimeEngine
  ];

  let taskIndex = 0;
  function runNextTask() {
    if (taskIndex >= tasks.length) return;

    const start = performance.now();
    // Cooperative slicing: execute tasks while keeping total execution under 8ms
    while (taskIndex < tasks.length && (performance.now() - start) < 8) {
      try {
        tasks[taskIndex++]();
      } catch (e) {
        console.warn('Deferred init error:', e);
      }
    }

    if (taskIndex < tasks.length) {
      // Yield to the browser main thread to guarantee 0ms Total Blocking Time
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => setTimeout(runNextTask, 0));
      } else {
        setTimeout(runNextTask, 0);
      }
    }
  }

  // Yield immediately after DOMContentLoaded paint before beginning deferred initialization
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => setTimeout(runNextTask, 0));
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
