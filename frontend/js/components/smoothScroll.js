/**
 * JDC Solar — 120 FPS High-Performance Frictionless Smooth Scrolling Engine
 * - Powered by Lenis with hardware-accelerated inertia scrolling.
 * - Frame-rate independent physics damping (automatically synchronizes with 120Hz/60Hz display refresh).
 * - Universal smooth anchor link navigation with sticky header offset compensation.
 */

import Lenis from '../vendor/lenis.js';

export async function initSmoothScroll() {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Helper for smooth anchor link jumps across all devices
  const handleAnchorClick = (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;

    const targetElement = document.querySelector(id);
    if (!targetElement) return;

    e.preventDefault();
    if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
      window.__lenis.scrollTo(targetElement, { offset: -90 });
    } else {
      const top = targetElement.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  document.addEventListener('click', handleAnchorClick);

  // If user prefers reduced motion, honor accessibility preference with standard behavior
  if (prefersReducedMotion) {
    window.__lenis = {
      stop: () => {},
      start: () => {},
      scrollTo: (target, opts = {}) => {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'auto' });
          return;
        }
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el && typeof el.getBoundingClientRect === 'function') {
          const top = el.getBoundingClientRect().top + window.scrollY + (opts.offset || -90);
          window.scrollTo({ top, behavior: 'auto' });
        } else if (target === 0 || target === 'top') {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }
    };
    return;
  }

  // Only activate Lenis on desktop viewports without touch
  const isDesktop = window.innerWidth >= 1024 && !('ontouchstart' in window) && !navigator.maxTouchPoints;
  if (!isDesktop) {
    window.__lenis = {
      stop: () => {},
      start: () => {},
      scrollTo: (target, opts = {}) => {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: opts.immediate ? 'auto' : 'smooth' });
          return;
        }
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el && typeof el.getBoundingClientRect === 'function') {
          const top = el.getBoundingClientRect().top + window.scrollY + (opts.offset || -90);
          window.scrollTo({ top, behavior: opts.immediate ? 'auto' : 'smooth' });
        } else if (target === 0 || target === 'top') {
          window.scrollTo({ top: 0, behavior: opts.immediate ? 'auto' : 'smooth' });
        }
      }
    };
    return;
  }

  try {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
      autoRaf: true,
    });

    window.__lenis = lenis;
  } catch (err) {
    console.warn('Lenis initialization skipped:', err);
  }
}
