/**
 * JDC SOLAR 2.0 - SCROLL REVEAL & INTERACTION CONTROLLER
 * Lightweight IntersectionObserver revealing animated elements smoothly as they enter viewport
 */

import { qsa } from '../core/dom.js';

export function initScrollAnimations() {
  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveals = qsa('[data-reveal]');
    reveals.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const revealElements = qsa('[data-reveal]');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target); // Reveal once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}
