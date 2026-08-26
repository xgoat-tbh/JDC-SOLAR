/**
 * JDC SOLAR 2.0 - DYNAMIC SCROLL & INTERACTION CONTROLLER
 * Handles scroll progress tracking, live stat counter tickers, staggered reveals, and parallax drift
 */

import { qs, qsa } from '../core/dom.js';

export function initScrollAnimations() {
  initScrollProgressBar();
  initStatCounters();

  // Respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveals = qsa('[data-reveal]');
    reveals.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  initRevealObserver();
  initParallaxEffects();
}

/**
 * 1. Pinned Top Scroll Progress Bar
 */
function initScrollProgressBar() {
  let bar = qs('#scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);
  }

  const updateProgress = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const progress = Math.min(Math.max((scrollY / docHeight) * 100, 0), 100);
    bar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * 2. Animated Numeric Stat Counter Ticker
 */
function initStatCounters() {
  const counterElements = qsa('[data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-counter')) || 0;
  const prefix = el.getAttribute('data-counter-prefix') || '';
  const suffix = el.getAttribute('data-counter-suffix') || '';
  const isDecimal = target % 1 !== 0;
  const duration = 1800; // ms
  const startTime = performance.now();

  const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutExpo(progress);
    const currentVal = easedProgress * target;

    const formatted = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);
    el.textContent = `${prefix}${formatted}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${prefix}${target}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

/**
 * 3. Staggered Scroll Reveal Observer
 */
function initRevealObserver() {
  const revealElements = qsa('[data-reveal]');
  if (!revealElements.length) return;

  document.documentElement.classList.add('js-animations-active');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 4. Subtle Parallax Float on Scroll
 */
function initParallaxEffects() {
  const parallaxItems = qsa('[data-parallax]');
  if (!parallaxItems.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        parallaxItems.forEach(item => {
          const speed = parseFloat(item.getAttribute('data-parallax')) || 0.1;
          item.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
