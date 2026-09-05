import { qsa } from '../core/dom.js';

export function initBeforeAfterSliders() {
  const sliders = qsa('[data-before-after]');
  if (!sliders.length) return;

  sliders.forEach(slider => {
    let isDragging = false;
    let currentPos = 50;
    let targetPos = 50;
    let animationId = null;

    const container = slider.querySelector('.before-after-container');
    const handleBtn = slider.querySelector('.before-after__handle-button');
    if (!container) return;

    
    slider.style.setProperty('--slider-pos', '50%');

    function applyPosition(pos) {
      slider.style.setProperty('--slider-pos', `${pos.toFixed(2)}%`);
      if (handleBtn) {
        handleBtn.setAttribute('aria-valuenow', Math.round(pos));
      }
    }

    function renderLoop() {
      if (isDragging) {
        
        currentPos = targetPos;
        applyPosition(currentPos);
        animationId = requestAnimationFrame(renderLoop);
      } else {
        
        const diff = targetPos - currentPos;
        if (Math.abs(diff) > 0.05) {
          currentPos += diff * 0.18;
          applyPosition(currentPos);
          animationId = requestAnimationFrame(renderLoop);
        } else {
          currentPos = targetPos;
          applyPosition(currentPos);
          animationId = null;
        }
      }
    }

    function startAnimation() {
      if (!animationId) {
        animationId = requestAnimationFrame(renderLoop);
      }
    }

    let cachedRect = null;

    function calculatePos(clientX) {
      if (!cachedRect) {
        cachedRect = container.getBoundingClientRect();
      }
      let pct = ((clientX - cachedRect.left) / (cachedRect.width || 1)) * 100;
      pct = Math.max(0, Math.min(100, pct));
      
      if (pct > 49 && pct < 51) pct = 50;
      return pct;
    }

    function onPointerDown(e) {
      isDragging = true;
      container.classList.add('is-dragging');
      cachedRect = container.getBoundingClientRect();
      targetPos = calculatePos(e.clientX);
      startAnimation();
      try { container.setPointerCapture(e.pointerId); } catch (err) {}
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      targetPos = calculatePos(e.clientX);
      startAnimation();
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      cachedRect = null;
      container.classList.remove('is-dragging');
      startAnimation();
      try { container.releasePointerCapture(e.pointerId); } catch (err) {}
    }

    
    container.addEventListener('pointerdown', onPointerDown, { passive: false });
    container.addEventListener('pointermove', onPointerMove, { passive: false });
    container.addEventListener('pointerup', onPointerUp, { passive: true });
    container.addEventListener('pointercancel', onPointerUp, { passive: true });

    
    if (handleBtn) {
      handleBtn.setAttribute('tabindex', '0');
      handleBtn.setAttribute('role', 'slider');
      handleBtn.setAttribute('aria-label', 'Rooftop transformation before and after comparison');
      handleBtn.setAttribute('aria-valuemin', '0');
      handleBtn.setAttribute('aria-valuemax', '100');
      handleBtn.setAttribute('aria-valuenow', '50');

      handleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          targetPos = Math.max(0, currentPos - 5);
          startAnimation();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          targetPos = Math.min(100, currentPos + 5);
          startAnimation();
        } else if (e.key === 'Home') {
          e.preventDefault();
          targetPos = 0;
          startAnimation();
        } else if (e.key === 'End') {
          e.preventDefault();
          targetPos = 100;
          startAnimation();
        }
      });
    }

    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      let demoPlayed = false;
      const demoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !demoPlayed) {
            demoPlayed = true;
            demoObserver.disconnect();

            
            const sweepSteps = [
              { pos: 25, delay: 300 },
              { pos: 75, delay: 1000 },
              { pos: 50, delay: 1700 }
            ];

            sweepSteps.forEach(step => {
              setTimeout(() => {
                if (!isDragging) {
                  targetPos = step.pos;
                  startAnimation();
                }
              }, step.delay);
            });
          }
        });
      }, { threshold: 0.4 });

      demoObserver.observe(slider);
    }
  });
}
