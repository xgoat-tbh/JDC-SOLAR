import { qs, qsa } from '../core/dom.js';
import { initProjectCarousel } from './projectCarousel.js';

export function initScrollAnimations() {
  initScrollProgressBar();
  initStatCounters();
  initProjectCarousel();
  initHorizontalScroll();
  initMagneticAnchorSettle();
  initParallaxDividerObserver();

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveals = qsa('[data-reveal]');
    reveals.forEach(el => el.classList.add('is-revealed'));
    const anchors = qsa('[data-magnetic-anchor]');
    anchors.forEach(el => el.classList.add('is-locked'));
    const steps = qsa('.timeline-step');
    steps.forEach(el => el.classList.add('is-step-locked'));
    return;
  }

  initRevealObserver();
}

function initScrollProgressBar() {
  let bar = qs('#scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);
  }

  let ticking = false;
  let docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

  const measureDoc = () => {
    docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  };

  window.addEventListener('resize', measureDoc, { passive: true });
  window.addEventListener('orientationchange', measureDoc, { passive: true });

  const updateProgress = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
        bar.style.transform = `scaleX(${progress})`;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  measureDoc();
  updateProgress();
}

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
  const duration = 1200;
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
    rootMargin: '0px 0px -30px 0px',
    threshold: 0.05
  });

  revealElements.forEach(el => observer.observe(el));
}

function initHorizontalScroll() {
  if (qs('[data-project-carousel]')) return;
  const wrapper = qs('.horizontal-scroll-track-wrapper');
  const fill = qs('.horizontal-scroll-bar-fill');
  if (!wrapper) return;

  const prevBtn = qs('.gallery-nav-btn--prev');
  const nextBtn = qs('.gallery-nav-btn--next');

  let ticking = false;
  let cachedStep = 380;
  let cachedMaxScroll = 1;

  const measureStep = () => {
    cachedMaxScroll = Math.max(1, wrapper.scrollWidth - wrapper.clientWidth);
    const card = qs('.horizontal-project-card', wrapper);
    if (card) {
      const style = window.getComputedStyle(wrapper);
      const gap = parseFloat(style.columnGap || style.gap) || 24;
      cachedStep = card.offsetWidth + gap;
    }
  };

  measureStep();
  window.addEventListener('resize', measureStep, { passive: true });
  window.addEventListener('orientationchange', measureStep, { passive: true });

  const updateGalleryState = () => {
    const scrollLeft = wrapper.scrollLeft;

    // 1. Progress Bar update via GPU scaleX (zero layout reflow)
    if (fill) {
      if (cachedMaxScroll <= 0) {
        fill.style.transform = 'scaleX(1)';
      } else {
        const progress = Math.min(Math.max(scrollLeft / cachedMaxScroll, 0.15), 1);
        fill.style.transform = `scaleX(${progress})`;
      }
    }

    // 2. Navigation buttons update
    if (prevBtn) {
      const isAtStart = scrollLeft <= 5;
      prevBtn.disabled = isAtStart;
      prevBtn.setAttribute('aria-disabled', String(isAtStart));
    }
    if (nextBtn) {
      const isAtEnd = scrollLeft >= cachedMaxScroll - 5;
      nextBtn.disabled = isAtEnd;
      nextBtn.setAttribute('aria-disabled', String(isAtEnd));
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateGalleryState);
      ticking = true;
    }
  };

  wrapper.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateGalleryState();

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      wrapper.scrollBy({ left: -cachedStep, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      wrapper.scrollBy({ left: cachedStep, behavior: 'smooth' });
    });
  }

  // Mouse drag functionality for desktop trackpad/mouse
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let wrapperLeft = 0;

  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    wrapper.classList.add('is-dragging');
    wrapperLeft = wrapper.getBoundingClientRect().left;
    startX = e.clientX - wrapperLeft;
    scrollStart = wrapper.scrollLeft;
  });

  wrapper.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      wrapper.classList.remove('is-dragging');
    }
  });

  wrapper.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      wrapper.classList.remove('is-dragging');
    }
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.clientX - wrapperLeft;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollStart - walk;
    onScroll();
  });
}

function initMagneticAnchorSettle() {
  const anchors = qsa('[data-magnetic-anchor]');
  if (anchors.length) {
    const anchorObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-locked');
        }
      });
    }, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    });

    anchors.forEach(el => anchorObserver.observe(el));
  }

  const steps = qsa('.timeline-step');
  if (steps.length) {
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-step-locked');
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.25
    });

    steps.forEach(step => stepObserver.observe(step));
  }

  const serviceCards = qsa('.card-service');
  if (serviceCards.length) {
    const serviceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.15
    });

    serviceCards.forEach(card => serviceObserver.observe(card));
  }
}

function initParallaxDividerObserver() {
  const lazyBgs = qsa('.parallax-divider, .cta-banner--cinematic, .cta-banner');
  if (!lazyBgs.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '400px 0px 400px 0px',
    threshold: 0.01
  });

  lazyBgs.forEach(el => observer.observe(el));

  // Dynamic parallax scroll matching mobile and desktop 1:1
  const dividers = qsa('.parallax-divider');
  if (dividers.length) {
    let ticking = false;
    const updateParallax = () => {
      const vh = window.innerHeight;
      dividers.forEach(div => {
        const rect = div.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          const progress = (rect.top / vh) * 50;
          div.style.backgroundPositionY = `calc(50% + ${progress.toFixed(1)}px)`;
        }
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    updateParallax();
  }
}
