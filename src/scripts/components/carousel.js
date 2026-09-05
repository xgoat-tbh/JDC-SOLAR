import { qs, qsa } from '../core/dom.js';

export function initCarousel() {
  const tracks = qsa('.project-carousel-track');
  if (!tracks.length) return;

  tracks.forEach(track => {
    const wrapper = track.closest('.project-carousel-wrapper');
    const prevBtn = qs('.carousel-nav-btn--prev', wrapper);
    const nextBtn = qs('.carousel-nav-btn--next', wrapper);
    const progressFill = qs('.carousel-progress-fill', wrapper);

    let cardWidth = 360;
    const measureCard = () => {
      if (track.firstElementChild) {
        cardWidth = track.firstElementChild.offsetWidth + 24;
      }
    };
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(measureCard);
    } else {
      setTimeout(measureCard, 100);
    }
    window.addEventListener('resize', measureCard, { passive: true });

    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.classList.add('is-dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.classList.remove('is-dragging');
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.classList.remove('is-dragging');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        measureCard();
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        measureCard();
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }

    let ticking = false;
    const updateProgress = () => {
      if (!progressFill) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) {
        progressFill.style.width = '100%';
        ticking = false;
        return;
      }
      const scrollFraction = track.scrollLeft / maxScroll;
      const minFill = 20;
      const currentFill = minFill + scrollFraction * (100 - minFill);
      progressFill.style.width = `${Math.min(100, Math.max(minFill, currentFill)).toFixed(1)}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
  });

  const brandItems = qsa('.brand-ribbon__item');
  if (brandItems.length) {
    brandItems.forEach(item => {
      item.addEventListener('click', () => {
        const wasActive = item.classList.contains('is-active');
        brandItems.forEach(b => b.classList.remove('is-active'));
        if (!wasActive) {
          item.classList.add('is-active');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.brand-ribbon__item')) {
        brandItems.forEach(b => b.classList.remove('is-active'));
      }
    });
  }
}
