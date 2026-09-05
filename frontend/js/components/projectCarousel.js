/**
 * JDC Solar 2.0 - Featured Projects Single-Card Carousel
 * Ultra-smooth, GPU-accelerated horizontal slide carousel.
 * Features:
 * - 1 card in view at a time
 * - Infinite looping (wrap-around 5 -> 1 and 1 -> 5)
 * - 450ms snappy cubic-bezier transition
 * - 5-second auto-advance with mouse hover & touch pause
 * - Touch swipe gestures for mobile devices
 * - Zero layout reflows (compositor-only translateX)
 */

export class ProjectCarousel {
  constructor(rootEl) {
    this.root = rootEl;
    this.track = this.root.querySelector('.single-project-carousel__track') || this.root.querySelector('.project-carousel-track');
    this.cards = Array.from(this.root.querySelectorAll('.featured-project-card'));
    this.prevBtn = document.querySelector('.gallery-nav-btn--prev');
    this.nextBtn = document.querySelector('.gallery-nav-btn--next');

    if (!this.track || this.cards.length === 0) return;

    this.currentIndex = 0;
    this.totalCards = this.cards.length;
    this.isTransitioning = false;
    this.autoPlayInterval = 5000;
    this.timer = null;

    // Touch swipe coordinates
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;

    this.init();
  }

  init() {
    this.updateAria();
    this.bindControls();
    this.bindTouchEvents();
    this.bindVisibilityObserver();

    // Pause on hover
    this.root.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.root.addEventListener('mouseleave', () => this.startAutoPlay());
    this.root.addEventListener('focusin', () => this.stopAutoPlay());
    this.root.addEventListener('focusout', () => this.startAutoPlay());

    // Keyboard navigation
    this.root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
      }
    });
  }

  bindControls() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoPlay();
      });
    }
  }

  bindTouchEvents() {
    this.root.addEventListener('touchstart', (e) => {
      this.stopAutoPlay();
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    this.root.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe();
      this.startAutoPlay();
    }, { passive: true });
  }

  handleSwipe() {
    const diffX = this.touchStartX - this.touchEndX;
    const diffY = this.touchStartY - this.touchEndY;

    // Ensure horizontal gesture is intentional (more horizontal than vertical)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swiped left -> next
        this.next();
      } else {
        // Swiped right -> prev
        this.prev();
      }
    }
  }

  goTo(index) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Infinite loop wrap-around
    if (index >= this.totalCards) {
      this.currentIndex = 0;
    } else if (index < 0) {
      this.currentIndex = this.totalCards - 1;
    } else {
      this.currentIndex = index;
    }

    // GPU slide transition
    this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    this.updateAria();

    setTimeout(() => {
      this.isTransitioning = false;
    }, 450);
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  updateAria() {
    this.cards.forEach((card, i) => {
      const isActive = i === this.currentIndex;
      if (isActive) {
        card.removeAttribute('aria-hidden');
        card.removeAttribute('inert');
        card.classList.add('is-active');
        card.querySelectorAll('a, button').forEach(el => el.removeAttribute('tabindex'));
      } else {
        card.setAttribute('aria-hidden', 'true');
        card.setAttribute('inert', '');
        card.classList.remove('is-active');
        card.querySelectorAll('a, button').forEach(el => el.setAttribute('tabindex', '-1'));
      }
    });

    if (this.prevBtn) {
      this.prevBtn.setAttribute('aria-label', `Previous Project (Currently showing ${this.currentIndex + 1} of ${this.totalCards})`);
    }
    if (this.nextBtn) {
      this.nextBtn.setAttribute('aria-label', `Next Project (Currently showing ${this.currentIndex + 1} of ${this.totalCards})`);
    }
  }

  startAutoPlay() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.next();
    }, this.autoPlayInterval);
  }

  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  bindVisibilityObserver() {
    if ('IntersectionObserver' in window) {
      this.visibilityObserver = new IntersectionObserver((entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          this.startAutoPlay();
        } else {
          this.stopAutoPlay();
        }
      }, { rootMargin: '100px' });
      this.visibilityObserver.observe(this.root);
    } else {
      this.startAutoPlay();
    }
  }
}

export function initProjectCarousel() {
  const stage = document.querySelector('[data-project-carousel]');
  if (stage) {
    return new ProjectCarousel(stage);
  }
  return null;
}
