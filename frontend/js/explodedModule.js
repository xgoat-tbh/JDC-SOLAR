export function initExplodedModule() {
  const container = document.querySelector('[data-exploded-module]');
  if (!container || container.dataset.moduleInit === 'true') return;
  container.dataset.moduleInit = 'true';

  const viewport = container.querySelector('#exploded-viewport') || container.querySelector('.exploded-viewport');
  const scene = container.querySelector('#exploded-scene') || container.querySelector('.exploded-scene');
  const layers = container.querySelectorAll('.exploded-layer');
  const layerButtons = container.querySelectorAll('[data-layer-target]');
  const track = container.querySelector('#exploded-slider-track');
  const fill = container.querySelector('#exploded-slider-fill');
  const thumb = container.querySelector('#exploded-slider-thumb');
  const valueLabel = container.querySelector('#exploded-separation-val');

  // Floating HUD Chip elements
  const hudNum = container.querySelector('#exploded-hud-num');
  const hudTitle = container.querySelector('#exploded-hud-title');

  if (!track || !fill || !thumb) return;

  let isDragging = false;
  let currentPos = 50;
  let targetPos = 50;
  let animationId = null;
  let hasPlayedIntro = false;
  let hasUserInteracted = false;

  // Parallax Tilt State (±6 deg range)
  let targetTiltX = 0;
  let targetTiltY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;
  let cachedViewportRect = null;

  const snapPoints = [0, 25, 50, 75, 100];

  // Dynamic Layer Elevation & Scale (Works continuously at ANY separation value)
  const popOutMap = {
    'layer-glass': { var: '--pop-glass', scaleVar: '--scale-glass', val: '40px', scale: '1.025' },
    'layer-coating': { var: '--pop-coating', scaleVar: '--scale-coating', val: '32px', scale: '1.025' },
    'layer-cells': { var: '--pop-cells', scaleVar: '--scale-cells', val: '28px', scale: '1.025' },
    'layer-eva': { var: '--pop-eva', scaleVar: '--scale-eva', val: '-28px', scale: '1.025' },
    'layer-frame': { var: '--pop-frame', scaleVar: '--scale-frame', val: '-40px', scale: '1.025' }
  };

  const allPopVars = ['--pop-glass', '--pop-coating', '--pop-cells', '--pop-eva', '--pop-frame'];
  const allScaleVars = ['--scale-glass', '--scale-coating', '--scale-cells', '--scale-eva', '--scale-frame'];

  const layerInfo = {
    'layer-glass': { num: '01', title: '3.2mm Low-Iron Tempered Glass' },
    'layer-coating': { num: '02', title: 'Nano Anti-Reflective (AR) Coating' },
    'layer-cells': { num: '03', title: 'M10 Monocrystalline Cells (16BB)' },
    'layer-eva': { num: '04', title: 'Dual-Layer Cross-Linked EVA' },
    'layer-frame': { num: '05', title: 'Anodized Aerospace Aluminum Frame' }
  };

  function resetAllPops() {
    allPopVars.forEach(v => container.style.setProperty(v, '0px'));
    allScaleVars.forEach(v => container.style.setProperty(v, '1'));
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
  }

  function renderLoop() {
    let needsContinue = false;

    // 1. Slider position interpolation
    if (isDragging) {
      currentPos = targetPos;
      applyPosition(currentPos);
      needsContinue = true;
    } else {
      const diff = targetPos - currentPos;
      if (Math.abs(diff) > 0.08) {
        currentPos += diff * 0.16;
        applyPosition(currentPos);
        needsContinue = true;
      } else if (currentPos !== targetPos) {
        currentPos = targetPos;
        applyPosition(currentPos);
      }
    }

    // 2. Parallax tilt interpolation
    const tiltDiffX = targetTiltX - currentTiltX;
    const tiltDiffY = targetTiltY - currentTiltY;
    if (Math.abs(tiltDiffX) > 0.04 || Math.abs(tiltDiffY) > 0.04) {
      currentTiltX += tiltDiffX * 0.14;
      currentTiltY += tiltDiffY * 0.14;
      container.style.setProperty('--tilt-x', `${currentTiltX.toFixed(2)}deg`);
      container.style.setProperty('--tilt-y', `${currentTiltY.toFixed(2)}deg`);
      needsContinue = true;
    } else if (currentTiltX !== targetTiltX || currentTiltY !== targetTiltY) {
      currentTiltX = targetTiltX;
      currentTiltY = targetTiltY;
      container.style.setProperty('--tilt-x', `${currentTiltX.toFixed(2)}deg`);
      container.style.setProperty('--tilt-y', `${currentTiltY.toFixed(2)}deg`);
    }

    if (needsContinue) {
      animationId = requestAnimationFrame(renderLoop);
    } else {
      animationId = null;
    }
  }

  function startAnimation() {
    if (!animationId) {
      animationId = requestAnimationFrame(renderLoop);
    }
  }

  // ── Viewport Interactive Tilt Parallax ──────────────────────────────
  function onViewportPointerMove(e) {
    if (!viewport) return;
    if (!cachedViewportRect) {
      cachedViewportRect = viewport.getBoundingClientRect();
    }
    const rect = cachedViewportRect;
    if (rect.width > 0 && rect.height > 0) {
      const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
      const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = -yRatio * 12; // ±6 deg on X
      targetTiltY = xRatio * 12;  // ±6 deg on Y
      startAnimation();
    }
  }

  function onViewportPointerLeave() {
    targetTiltX = 0;
    targetTiltY = 0;
    cachedViewportRect = null;
    startAnimation();
  }

  if (viewport) {
    viewport.addEventListener('pointermove', onViewportPointerMove, { passive: true });
    viewport.addEventListener('pointerleave', onViewportPointerLeave, { passive: true });
  }

  // ── Slider Pointer Events ──────────────────────────────────────────
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
    hasUserInteracted = true;
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

  // ── Keyboard Accessibility ────────────────────────────────────────
  track.addEventListener('keydown', (e) => {
    hasUserInteracted = true;
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

  // ── Spotlight Layer Selection ─────────────────────────────────────
  function selectLayer(targetId) {
    if (scene) scene.classList.add('has-active-layer');

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
    if (popOutMap[targetId]) {
      container.style.setProperty(popOutMap[targetId].var, popOutMap[targetId].val);
      container.style.setProperty(popOutMap[targetId].scaleVar, popOutMap[targetId].scale);
    }

    if (hudNum && hudTitle && layerInfo[targetId]) {
      hudNum.textContent = layerInfo[targetId].num;
      hudTitle.textContent = layerInfo[targetId].title;
    }
  }

  if (layerButtons.length) {
    layerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        hasUserInteracted = true;
        const targetId = btn.getAttribute('data-layer-target');
        selectLayer(targetId);
      });
    });
  }

  // ── Scroll-Into-View Cinematic Auto-Explode Intro ──────────────────
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          container.classList.add('is-visible');
          if (!hasPlayedIntro && !hasUserInteracted) {
            hasPlayedIntro = true;
            currentPos = 0;
            targetPos = 50;
            applyPosition(0);
            startAnimation();
          }
        }
      });
    }, { threshold: 0.25 });

    observer.observe(container);
  }

  // Default initial configuration
  applyPosition(50);
  selectLayer('layer-glass');
}
