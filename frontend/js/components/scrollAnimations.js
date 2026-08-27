/**
 * JDC SOLAR 2.0 - DYNAMIC SCROLL & INTERACTION CONTROLLER
 * Features:
 * 1. Horizontal Scroll-Jacking (Vertical Page Scroll -> Horizontal Carousel Translation)
 * 2. Dynamic Scroll Velocity Skew on Cards
 * 3. Animated Numeric Stat Counter Tickers
 * 4. Pinned Top Scroll Progress Bar
 * 5. Multi-Layer Parallax Drift
 */

import { qs, qsa } from '../core/dom.js';

export function initScrollAnimations() {
  initScrollProgressBar();
  initStatCounters();
  initHorizontalScrollJacking();
  initScrollVelocitySkew();

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
 * 2. Horizontal Scroll-Jacking (Pin-and-Translate Showcase)
 * When the user scrolls vertically past the project section,
 * the section pins and smoothly translates the track horizontally!
 */
function initHorizontalScrollJacking() {
  const section = qs('.horizontal-scroll-section');
  const track = qs('.horizontal-scroll-track');
  const fill = qs('.horizontal-scroll-bar-fill');
  if (!section || !track) return;

  // On desktop screens (min-width: 1024px), activate sticky scroll-jacking
  const onScroll = () => {
    if (window.innerWidth < 1024) {
      track.style.transform = '';
      return;
    }

    const rect = section.getBoundingClientRect();
    const scrollDist = -rect.top;
    const maxScroll = section.offsetHeight - window.innerHeight;

    if (maxScroll <= 0) return;

    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      const progress = Math.min(Math.max(scrollDist / maxScroll, 0), 1);
      const maxTranslate = track.scrollWidth - window.innerWidth + 100;
      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
      if (fill) {
        fill.style.width = `${20 + progress * 80}%`;
      }
    } else if (rect.top > 0) {
      track.style.transform = 'translateX(0px)';
      if (fill) fill.style.width = '20%';
    } else if (rect.bottom < window.innerHeight) {
      const maxTranslate = track.scrollWidth - window.innerWidth + 100;
      track.style.transform = `translateX(-${maxTranslate}px)`;
      if (fill) fill.style.width = '100%';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

/**
 * 3. Dynamic Scroll Velocity Skew
 * Adds kinetic energy during scrolling by subtly skewing interactive cards
 */
function initScrollVelocitySkew() {
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  let ticking = false;

  const cards = qsa('.card-service, .horizontal-project-card, .why-jdc-card');
  if (!cards.length) return;

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // Clamp velocity
    scrollVelocity = Math.max(Math.min(delta * 0.08, 4), -4);

    if (!ticking) {
      window.requestAnimationFrame(() => {
        cards.forEach(card => {
          // Only apply skew if element is in viewport
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.transform = `skewY(${scrollVelocity * 0.4}deg)`;
          }
        });

        // Ease back to normal skew
        setTimeout(() => {
          cards.forEach(card => {
            if (!card.matches(':hover')) {
              card.style.transform = '';
            }
          });
        }, 120);

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/**
 * 4. Animated Numeric Stat Counter Ticker
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
  const duration = 1800;
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
 * 5. Staggered Scroll Reveal Observer
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
 * 6. Subtle Parallax Float on Scroll
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
