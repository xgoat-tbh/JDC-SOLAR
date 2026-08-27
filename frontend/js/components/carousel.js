/**
 * JDC SOLAR 2.0 - PROJECT HORIZONTAL MOMENTUM CAROUSEL ENGINE
 * Supports smooth mouse-drag panning, touch gestures, wheel scrolling,
 * glassmorphic navigation arrows, and synchronized progress fill.
 */

import { qs, qsa } from '../core/dom.js';

export function initCarousel() {
  const tracks = qsa('.project-carousel-track');
  if (!tracks.length) return;

  tracks.forEach(track => {
    const wrapper = track.closest('.project-carousel-wrapper');
    const prevBtn = qs('.carousel-nav-btn--prev', wrapper);
    const nextBtn = qs('.carousel-nav-btn--next', wrapper);
    const progressFill = qs('.carousel-progress-fill', wrapper);

    // 1. Mouse Drag Panning
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
      const walk = (x - startX) * 1.5; // Drag sensitivity
      track.scrollLeft = scrollLeft - walk;
    });

    // 2. Navigation Button Clicks
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 24 : 360;
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 24 : 360;
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }

    // 3. Update Progress Bar on Scroll
    const updateProgress = () => {
      if (!progressFill) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) {
        progressFill.style.width = '100%';
        return;
      }
      const scrollFraction = track.scrollLeft / maxScroll;
      const minFill = 20; // 20% minimum thumb size
      const currentFill = minFill + scrollFraction * (100 - minFill);
      progressFill.style.width = `${Math.min(100, Math.max(minFill, currentFill))}%`;
    };

    track.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  });
}
