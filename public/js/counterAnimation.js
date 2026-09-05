export function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-counter]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || counters.length === 0) return;

  const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter'));
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const duration = 1500;
        let startTimestamp = null;

        
        el.style.animation = 'counter-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both';

        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = easeOutExpo(progress);
          const current = Math.floor(easeProgress * target);

          el.textContent = current.toLocaleString('en-IN') + suffix;

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            el.textContent = target.toLocaleString('en-IN') + suffix;
          }
        };

        window.requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  counters.forEach(counter => {
    observer.observe(counter);
  });
}
