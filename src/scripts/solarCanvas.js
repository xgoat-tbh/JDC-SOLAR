export function initSolarCanvas() {
  const canvas = document.getElementById('hero-solar-canvas');
  if (!canvas) return;

  // Background particles removed per design direction for clean cinematic hero aesthetic
  const ctx = canvas.getContext('2d', { alpha: true });
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  canvas.style.display = 'none';
}

