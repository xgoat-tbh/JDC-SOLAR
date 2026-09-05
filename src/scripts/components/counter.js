import { qsa } from '../core/dom.js';

export function initStatCounters() {
  const statElements = qsa('[data-counter-target]');
  if (statElements.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseInt(el.getAttribute('data-counter-target'), 10);
        
        if (isNaN(targetValue) || prefersReducedMotion) {
          el.textContent = targetValue || el.textContent;
          obs.unobserve(el);
          return;
        }

        animateCount(el, targetValue);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statElements.forEach(el => observer.observe(el));
}

function animateCount(el, target, duration = 1600) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    
    const easeProgress = 1 - (1 - progress) * (1 - progress);
    const currentValue = Math.floor(start + (target - start) * easeProgress);

    el.textContent = currentValue.toLocaleString('en-IN');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString('en-IN');
    }
  }

  requestAnimationFrame(update);
}
