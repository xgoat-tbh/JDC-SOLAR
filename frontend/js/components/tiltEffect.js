/**
 * JDC SOLAR 2.0 - CURSOR-REACTIVE 3D TILT & GLOW ENGINE
 * Smooth perspective tilt following cursor position with radial glow effect
 * Auto-attaches to elements with [data-tilt] attribute
 */

import { qsa } from '../core/dom.js';

const TILT_CONFIG = {
  maxTilt: 8,        // degrees
  glowSize: 350,     // px radius of glow
  perspective: 1000, // px
  speed: 400,        // ms transition on leave
  scale: 1.02        // scale on hover
};

export function initTiltEffects() {
  // Respect reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tiltElements = qsa('[data-tilt]');
  if (!tiltElements.length) return;

  tiltElements.forEach(el => {
    // Ensure the element has perspective container
    el.style.transformStyle = 'preserve-3d';

    // Create glow overlay element
    const glow = document.createElement('div');
    glow.className = 'tilt-glow';
    glow.setAttribute('aria-hidden', 'true');
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(glow);

    let rafId = null;

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
      glow.style.opacity = '1';
    });

    el.addEventListener('mousemove', (e) => {
      if (rafId) return; // throttle to rAF
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Normalize to -1...1
        const normX = mouseX / (rect.width / 2);
        const normY = mouseY / (rect.height / 2);

        // Tilt (inverted Y for natural feel)
        const rotateX = -normY * TILT_CONFIG.maxTilt;
        const rotateY = normX * TILT_CONFIG.maxTilt;

        el.style.transform = `perspective(${TILT_CONFIG.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${TILT_CONFIG.scale}, ${TILT_CONFIG.scale}, 1)`;

        // Move glow to cursor position
        const glowX = e.clientX - rect.left;
        const glowY = e.clientY - rect.top;
        glow.style.background = `radial-gradient(${TILT_CONFIG.glowSize}px circle at ${glowX}px ${glowY}px, rgba(253, 129, 39, 0.12), transparent 60%)`;

        rafId = null;
      });
    });

    el.addEventListener('mouseleave', () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      el.style.transition = `transform ${TILT_CONFIG.speed}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      glow.style.opacity = '0';
    });
  });
}
