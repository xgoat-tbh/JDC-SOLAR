export function initCardTilt() {
  const cards = document.querySelectorAll('.card-tilt');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

  if (prefersReducedMotion || isTouchDevice || cards.length === 0) return;

  cards.forEach(card => {
    let rect = null;

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
      card.style.transition = 'none';
    });

    card.addEventListener('mousemove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4; 
      const rotateY = ((x - centerX) / centerX) * 4; 
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      rect = null;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      card.style.transition = 'transform 0.5s ease';
    });
  });
}
