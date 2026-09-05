export function initNavIndicator() {
  const nav = document.querySelector('.nav-desktop');
  if (!nav) return;

  // Only run indicator calculations on desktop viewports where .nav-desktop is rendered
  if (window.innerWidth < 1024) {
    const mql = window.matchMedia('(min-width: 1024px)');
    const handleMedia = (e) => {
      if (e.matches) {
        initNavIndicator();
        mql.removeEventListener('change', handleMedia);
      }
    };
    mql.addEventListener('change', handleMedia);
    return;
  }

  let indicator = nav.querySelector('.nav-desktop__indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'nav-desktop__indicator';
    indicator.setAttribute('aria-hidden', 'true');
    nav.appendChild(indicator);
  }

  const items = Array.from(nav.querySelectorAll('.nav-desktop__item > .nav-desktop__link'));
  if (!items.length) return;

  let activeItem = nav.querySelector('.nav-desktop__link[aria-current="page"]');
  if (!activeItem) {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    activeItem = items.find(link => {
      const linkPath = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
      return linkPath === currentPath;
    }) || items[0];
  }

  function moveIndicatorTo(element, animate = true) {
    if (!element || window.innerWidth < 1024) {
      indicator.style.opacity = '0';
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const targetRect = element.getBoundingClientRect();

    const left = targetRect.left - navRect.left + 4;
    const width = Math.max(16, targetRect.width - 8);

    if (!animate) {
      indicator.style.transition = 'none';
    } else {
      indicator.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';
    }

    indicator.style.transform = `translate3d(${left.toFixed(2)}px, 0, 0)`;
    indicator.style.width = `${width.toFixed(2)}px`;
    indicator.style.opacity = '1';
  }

  requestAnimationFrame(() => {
    moveIndicatorTo(activeItem, false);
  });

  items.forEach(link => {
    link.addEventListener('mouseenter', () => {
      moveIndicatorTo(link, true);
    });
  });

  nav.addEventListener('mouseleave', () => {
    moveIndicatorTo(activeItem, true);
  });

  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      if (window.innerWidth >= 1024) {
        moveIndicatorTo(activeItem, false);
      }
    });
    ro.observe(nav);
  } else {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        moveIndicatorTo(activeItem, false);
      }
    }, { passive: true });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (window.innerWidth >= 1024) {
        moveIndicatorTo(activeItem, false);
      }
    });
  }
}
