export function initExplodedModule() {
  const container = document.querySelector('[data-exploded-module]');
  if (!container) return;

  const layers = container.querySelectorAll('.exploded-layer');
  const layerButtons = container.querySelectorAll('[data-layer-target]');
  const track = container.querySelector('#exploded-slider-track');
  const fill = container.querySelector('#exploded-slider-fill');
  const thumb = container.querySelector('#exploded-slider-thumb');
  const valueLabel = container.querySelector('#exploded-separation-val');

  if (!track || !fill || !thumb) return;

  let isDragging = false;
  let currentPos = 50;
  let targetPos = 50;
  let animationId = null;

  const snapPoints = [0, 25, 50, 75, 100];

  
  const popOutMap = {
    'layer-glass': { var: '--pop-glass', val: '75px' },
    'layer-coating': { var: '--pop-coating', val: '55px' },
    'layer-cells': { var: '--pop-cells', val: '45px' },
    'layer-eva': { var: '--pop-eva', val: '-45px' },
    'layer-frame': { var: '--pop-frame', val: '-75px' }
  };

  const allPopVars = ['--pop-glass', '--pop-coating', '--pop-cells', '--pop-eva', '--pop-frame'];

  function resetAllPops() {
    allPopVars.forEach(v => container.style.setProperty(v, '0px'));
  }

  function applyPosition(pos) {
    const clamped = Math.max(0, Math.min(100, pos));
    container.style.setProperty('--exploded-sep', (clamped / 100).toFixed(3));
    fill.style.width = `${clamped.toFixed(2)}%`;
    fill.style.transform = 'none';
    thumb.style.left = `${clamped.toFixed(2)}%`;
    track.setAttribute('aria-valuenow', Math.round(clamped));

    if (valueLabel) {
      valueLabel.textContent = `${Math.round(clamped)}%`;
    }

    
    if (clamped > 35) {
      resetAllPops();
    }
  }

  function renderLoop() {
    if (isDragging) {
      currentPos = targetPos;
      applyPosition(currentPos);
      animationId = requestAnimationFrame(renderLoop);
    } else {
      const diff = targetPos - currentPos;
      if (Math.abs(diff) > 0.08) {
        currentPos += diff * 0.22;
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

  let cachedTrackRect = null;

  function calculatePos(clientX) {
    if (!cachedTrackRect) {
      cachedTrackRect = track.getBoundingClientRect();
    }
    let pct = ((clientX - cachedTrackRect.left) / (cachedTrackRect.width || 1)) * 100;
    pct = Math.max(0, Math.min(100, pct));

    for (const snap of snapPoints) {
      if (Math.abs(pct - snap) < 3.5) {
        pct = snap;
        break;
      }
    }

    return pct;
  }

  function onPointerDown(e) {
    isDragging = true;
    track.classList.add('is-dragging');
    cachedTrackRect = track.getBoundingClientRect();
    targetPos = calculatePos(e.clientX);
    startAnimation();
    try { track.setPointerCapture(e.pointerId); } catch (err) {}
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    targetPos = calculatePos(e.clientX);
    startAnimation();
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    cachedTrackRect = null;
    track.classList.remove('is-dragging');
    startAnimation();
    try { track.releasePointerCapture(e.pointerId); } catch (err) {}
  }

  
  track.addEventListener('pointerdown', onPointerDown, { passive: false });
  track.addEventListener('pointermove', onPointerMove, { passive: false });
  track.addEventListener('pointerup', onPointerUp, { passive: true });
  track.addEventListener('pointercancel', onPointerUp, { passive: true });

  
  track.addEventListener('keydown', (e) => {
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

  
  function selectLayer(targetId) {
    
    layerButtons.forEach(btn => {
      if (btn.getAttribute('data-layer-target') === targetId) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    
    layers.forEach(layer => {
      if (layer.id === targetId) {
        layer.classList.add('is-inspected');
      } else {
        layer.classList.remove('is-inspected');
      }
    });

    
    resetAllPops();
    if (currentPos <= 35 && popOutMap[targetId]) {
      container.style.setProperty(popOutMap[targetId].var, popOutMap[targetId].val);
    }
  }

  
  if (layerButtons.length) {
    layerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-layer-target');
        selectLayer(targetId);
      });
    });
  }

  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          container.classList.add('is-visible');
        }
      });
    }, { threshold: 0.25 });

    observer.observe(container);
  }

  
  applyPosition(50);
  selectLayer('layer-glass');
}
