/**
 * JDC Solar 2.0 - Anime.js v4 Animation Engine
 * Precision engineering micro-interactions, telemetry readouts, and SVG circuit drawing.
 */

import { animate, createDrawable, stagger, scrambleText } from './vendor/anime.js';

export function initAnimeEngine() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  initAnimeCounters();
  initCircuitDrawables();
  initProjectFilterTransitions();
}

/**
 * 2. Precision Counter Roll-Up with Anime.js Spring Physics
 */
function initAnimeCounters() {
  const counters = document.querySelectorAll('[data-anime-counter]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-anime-counter')) || 0;
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = String(targetVal).includes('.');

        const state = { count: 0 };
        animate(state, {
          count: targetVal,
          duration: 1600,
          ease: 'outExpo',
          onUpdate: () => {
            const formatted = isDecimal ? state.count.toFixed(1) : Math.round(state.count);
            el.textContent = `${prefix}${formatted}${suffix}`;
          }
        });
      });
    },
    { threshold: 0.25 }
  );

  counters.forEach((c) => observer.observe(c));
}

/**
 * 3. SVG Circuit Line Drawing on Scroll
 */
function initCircuitDrawables() {
  const drawables = document.querySelectorAll('[data-anime-draw]');
  if (drawables.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        try {
          createDrawable(entry.target, {
            draw: [0, 1],
            duration: 1800,
            ease: 'inOutQuad'
          });
        } catch (e) {
          // Fallback
        }
      });
    },
    { threshold: 0.2 }
  );

  drawables.forEach((el) => observer.observe(el));
}

/**
 * 4. Project Category Filter with Smooth Spring Physics
 */
function initProjectFilterTransitions() {
  const filterBtns = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('.card-project');
  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-project-filter');

      projectCards.forEach((card, i) => {
        const cardCategory = card.getAttribute('data-category');
        const matches = category === 'all' || cardCategory === category;

        if (matches) {
          card.style.display = '';
          animate(card, {
            opacity: [0, 1],
            scale: [0.96, 1],
            duration: 400,
            delay: i * 35,
            ease: 'outQuad'
          });
        } else {
          animate(card, {
            opacity: [1, 0],
            scale: [1, 0.96],
            duration: 250,
            ease: 'inQuad',
            onComplete: () => {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  });
}
