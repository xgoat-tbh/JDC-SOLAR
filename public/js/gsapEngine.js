/**
 * JDC Solar 2.0 - High-Performance Native Motion Engine
 * Lightweight, zero-dependency animations using Web Animations API (WAAPI),
 * hardware-accelerated CSS transitions, and IntersectionObserver.
 * Ensures 0ms Total Blocking Time and optimal Core Web Vitals.
 */

export function initGsapEngine() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  initLenisStub();
  initHeadingMaskReveals();
  initScrambleDecode();
  initCircuitRoadmapAnimation();
  init3DCardTilt();
}

/**
 * 1. Lenis stub for modal pause/resume compatibility without heavy smooth-scroll hijacking
 */
function initLenisStub() {
  if (!window.__lenis) {
    window.__lenis = {
      stop: () => {},
      start: () => {},
      raf: () => {}
    };
  }
}

/**
 * 2. Section Heading Reveal on Scroll
 * IMPORTANT: Excludes above-the-fold hero H1 titles (.display-title, .page-hero__title)
 * to ensure immediate Largest Contentful Paint (LCP).
 */
function initHeadingMaskReveals() {
  const headings = document.querySelectorAll('.section-header h2');
  if (headings.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        const el = entry.target;
        el.animate([
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 600,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        });
      }
    });
  }, { threshold: 0.15 });

  headings.forEach((h) => observer.observe(h));
}

/**
 * 3. High-Velocity Cybernetic Character Scramble Decode
 */
function initScrambleDecode() {
  const scrambleTargets = document.querySelectorAll('.section-overline, [data-scramble]');
  if (scrambleTargets.length === 0) return;

  const glyphs = '0123456789ABCDEF$#&*+%';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        const el = entry.target;
        const originalText = el.textContent.trim();
        if (!originalText || originalText.length > 45) return;

        const chars = originalText.split('');
        const len = chars.length;
        let iteration = 0;
        const maxIterations = len * 1.5;

        const interval = setInterval(() => {
          el.textContent = chars.map((char, index) => {
            if (char === ' ' || char === '-' || char === '•') return char;
            if (index < iteration / 1.5) return originalText[index];
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          }).join('');

          if (iteration >= maxIterations) {
            clearInterval(interval);
            el.textContent = originalText;
          }
          iteration++;
        }, 32);
      }
    });
  }, { threshold: 0.3 });

  scrambleTargets.forEach((t) => observer.observe(t));
}

/**
 * 4. Glowing Energy Circuit Roadmap Animation
 * Forward-only step activation, beam growth, and node scale.
 * Locks permanently once entered — never animates out on exit or scroll-back.
 */
function initCircuitRoadmapAnimation() {
  const roadmap = document.querySelector('[data-circuit-roadmap]');
  if (!roadmap) return;

  const steps = roadmap.querySelectorAll('.timeline-step');
  if (!steps.length) return;

  let ticking = false;
  const stepProgress = new Array(steps.length).fill(0);

  const updateRoadmap = () => {
    const vh = window.innerHeight;
    const startY = vh * 0.88;
    const endY = vh * 0.45;
    const distance = startY - endY;

    let allCompleted = true;

    steps.forEach((step, idx) => {
      if (stepProgress[idx] >= 1) return;

      const rect = step.getBoundingClientRect();
      const rawProgress = Math.min(1, Math.max(0, (startY - rect.top) / distance));

      // Monotonic progression: only advance forward, never reverse or exit-animate
      if (rawProgress > stepProgress[idx]) {
        const p = rawProgress >= 0.98 ? 1 : rawProgress;
        stepProgress[idx] = p;

        const card = step.querySelector('.timeline-step__content');
        const numberEl = step.querySelector('.timeline-step__number');
        const beam = step.querySelector('.timeline-step__connector-beam');

        if (card) {
          if (p === 1) {
            card.style.transform = '';
            card.style.opacity = '1';
          } else {
            card.style.transform = `translateX(${(1 - p) * 32}px)`;
            card.style.opacity = `${0.2 + p * 0.8}`;
          }
        }

        if (numberEl) {
          if (p === 1) {
            numberEl.style.transform = '';
            numberEl.style.opacity = '1';
          } else {
            numberEl.style.transform = `scale(${0.75 + p * 0.35})`;
            numberEl.style.opacity = `${0.35 + p * 0.65}`;
          }
        }

        if (beam) {
          beam.style.height = `${p * 100}%`;
        }

        if (p >= 0.65) {
          step.classList.add('is-active');
        }
      }

      if (stepProgress[idx] < 1) {
        allCompleted = false;
      }
    });

    ticking = false;

    if (allCompleted) {
      window.removeEventListener('scroll', onScroll);
    }
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateRoadmap);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateRoadmap();
}

/**
 * 5. High-Performance Compositor-Only 3D Card Tilt
 * GPU-accelerated 3D perspective tilt on hover with zero layout reflows.
 * Only active on pointer:fine devices (desktop mouse/trackpad).
 */
function init3DCardTilt() {
  const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) return;

  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (!tiltCards.length) return;

  tiltCards.forEach((card) => {
    let bounds = null;
    let rafId = null;

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.12s ease-out, box-shadow 0.2s ease';
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange = 'transform';
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = (mouseX / bounds.width) - 0.5;
      const yPct = (mouseY / bounds.height) - 0.5;

      const rotateY = (xPct * 10).toFixed(2);
      const rotateX = (-yPct * 10).toFixed(2);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
    };

    const onMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease';
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      bounds = null;
    };

    card.addEventListener('mouseenter', onMouseEnter, { passive: true });
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  });
}

