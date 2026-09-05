export function initBackToTop() {
  const btn = document.querySelector('#jump-to-top');
  if (!btn) return;

  const indicator = btn.querySelector('.jump-to-top__indicator');
  const circumference = 2 * Math.PI * 20;

  let isTicking = false;
  let docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

  const measureDoc = () => {
    docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  };

  window.addEventListener('resize', measureDoc, { passive: true });
  window.addEventListener('orientationchange', measureDoc, { passive: true });

  function updateScroll() {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    if (docHeight <= 0) {
      btn.classList.remove('is-visible');
      isTicking = false;
      return;
    }

    const scrollFraction = Math.min(Math.max(scrollY / docHeight, 0), 1);

    // Show when scrolled past 350px or 15% of document
    if (scrollY > 350 || scrollFraction >= 0.15) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }

    if (indicator) {
      const offset = circumference - (circumference * scrollFraction);
      indicator.style.strokeDashoffset = `${offset.toFixed(2)}px`;
    }

    isTicking = false;
  }

  function onScroll() {
    if (!isTicking) {
      requestAnimationFrame(updateScroll);
      isTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  const performScrollToTop = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Attempt Lenis first if supported
    let scrolledWithLenis = false;
    if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
      try {
        window.__lenis.scrollTo(0);
        scrolledWithLenis = true;
      } catch (err) {
        scrolledWithLenis = false;
      }
    }
    // Always ensure window scrolls to top
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (err) {
      window.scrollTo(0, 0);
    }
  };

  btn.addEventListener('click', performScrollToTop);
  btn.addEventListener('touchend', performScrollToTop, { passive: false });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      performScrollToTop(e);
    }
  });

  measureDoc();
  updateScroll();
}
