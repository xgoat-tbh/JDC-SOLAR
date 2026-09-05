/**
 * JDC Solar 2.0 - Cursor Spotlight Glow Engine
 * Hardware-accelerated radial spotlight following mouse pointer over cards.
 * Inspired by Vercel / Linear high-end SaaS design systems.
 * Uses passive listeners and requestAnimationFrame for 120 FPS compositor efficiency.
 */

export function initCursorSpotlight() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchOnly = window.matchMedia && window.matchMedia('(pointer: coarse) and (hover: none)').matches;

  if (prefersReducedMotion || isTouchOnly) return;

  const CARD_SELECTOR = '.card, .card-project, .why-jdc-card, .process-step, .metric-tile, .modal-stat-card, .spec-card, .timeline-step__content, .has-spotlight';

  let activeCard = null;
  let rafId = null;
  let mouseEvent = null;

  function updateSpotlight() {
    if (!activeCard || !mouseEvent) {
      rafId = null;
      return;
    }

    const rect = activeCard.getBoundingClientRect();
    const x = mouseEvent.clientX - rect.left;
    const y = mouseEvent.clientY - rect.top;

    activeCard.style.setProperty('--mouse-x', `${x}px`);
    activeCard.style.setProperty('--mouse-y', `${y}px`);
    activeCard.style.setProperty('--mouse-opacity', '1');

    rafId = null;
  }

  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest ? e.target.closest(CARD_SELECTOR) : null;

    if (card !== activeCard) {
      if (activeCard) {
        activeCard.style.setProperty('--mouse-opacity', '0');
      }
      activeCard = card;
    }

    if (activeCard) {
      mouseEvent = e;
      if (!rafId) {
        rafId = requestAnimationFrame(updateSpotlight);
      }
    }
  }, { passive: true });

  document.addEventListener('mouseleave', (e) => {
    if (!e.relatedTarget && activeCard) {
      activeCard.style.setProperty('--mouse-opacity', '0');
      activeCard = null;
    }
  });

  window.addEventListener('blur', () => {
    if (activeCard) {
      activeCard.style.setProperty('--mouse-opacity', '0');
      activeCard = null;
    }
  });
}
