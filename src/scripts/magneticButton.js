export function initMagneticButtons() {
  const buttons = document.querySelectorAll('[data-magnetic]');
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

  if (isTouchDevice || buttons.length === 0) return;

  buttons.forEach(btn => {
    let buttonX = 0;
    let buttonY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;
    let rafId = null;
    let bounds = null;

    const magneticPull = 8;
    const triggerDistance = 80;

    const render = () => {
      currentX += (buttonX - currentX) * 0.15;
      currentY += (buttonY - currentY) * 0.15;
      
      if (isHovering || Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05) {
        btn.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
        btn.style.transition = 'none';
        rafId = requestAnimationFrame(render);
      } else {
        btn.style.transform = '';
        btn.style.transition = '';
        rafId = null;
      }
    };

    const startAnimation = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    };

    const onMouseEnter = () => {
      bounds = btn.getBoundingClientRect();
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = btn.getBoundingClientRect();
      const btnCenterX = bounds.left + bounds.width / 2;
      const btnCenterY = bounds.top + bounds.height / 2;
      
      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const distance = Math.hypot(distX, distY);
      const activeRadius = triggerDistance + Math.max(bounds.width, bounds.height) / 2;
      
      if (distance < activeRadius) {
        isHovering = true;
        const pullFactor = (1 - distance / activeRadius) * magneticPull;
        buttonX = (distX / distance) * pullFactor;
        buttonY = (distY / distance) * pullFactor;
        startAnimation();
      } else if (isHovering) {
        isHovering = false;
        buttonX = 0;
        buttonY = 0;
      }
    };

    btn.addEventListener('mouseenter', onMouseEnter, { passive: true });
    btn.addEventListener('mousemove', onMouseMove, { passive: true });
    btn.addEventListener('mouseleave', () => {
      bounds = null;
      isHovering = false;
      buttonX = 0;
      buttonY = 0;
    });
  });
}
