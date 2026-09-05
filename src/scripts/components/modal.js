import { qs, qsa } from '../core/dom.js';

export class ModalController {
  constructor() {
    this.init();
  }

  init() {
    // 1. Delegated click listener (supports SVG composedPath piercing)
    document.addEventListener('click', (e) => {
      // Find open trigger
      const trigger = e.target.closest ? e.target.closest('[data-modal-open]') : null;
      if (trigger) {
        const modalId = trigger.getAttribute('data-modal-open');
        this.open(modalId);
        return;
      }

      // Find close button via closest or composedPath
      let closeBtn = null;
      if (e.target.closest) {
        closeBtn = e.target.closest('[data-modal-close]');
      }
      if (!closeBtn && e.composedPath) {
        const path = e.composedPath();
        closeBtn = path.find(el => el.getAttribute && el.hasAttribute('data-modal-close'));
      }

      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        const dialog = (closeBtn.closest && closeBtn.closest('dialog')) || qs('dialog[open]');
        if (dialog) this.close(dialog);
      }
    });

    // 2. Direct click listeners on all close buttons for maximum reliability
    qsa('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dialog = btn.closest('dialog') || qs('dialog[open]');
        if (dialog) {
          this.close(dialog);
        }
      });
    });

    // 3. Backdrop click to close
    qsa('dialog.modal-dialog').forEach(dialog => {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          this.close(dialog);
        }
      });

      // Handle native Escape key / cancel event
      dialog.addEventListener('cancel', () => {
        this.cleanupBodyScroll();
      });
    });

    // 4. Global Escape key fallback
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        const openDialog = qs('dialog[open]');
        if (openDialog) {
          this.close(openDialog);
        }
      }
    });
  }

  open(modalId) {
    const dialog = qs(`#${modalId}`);
    if (dialog) {
      // Cancel ANY existing animation so zero lingering styles remain
      if (typeof dialog.getAnimations === 'function') {
        dialog.getAnimations().forEach(a => a.cancel());
      }
      dialog.style.filter = 'none';

      dialog.style.display = 'flex';
      if (typeof dialog.showModal === 'function') {
        try {
          dialog.showModal();
        } catch (err) {
          dialog.setAttribute('open', '');
        }
      } else {
        dialog.setAttribute('open', '');
      }

      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      if (window.__lenis) window.__lenis.stop();

      // High-End SaaS Smooth Pop-In on Open (Zero overshoot, zero shake, zero blur)
      dialog.animate([
        { opacity: 0, transform: 'scale(0.97) translateY(8px)' },
        { opacity: 1, transform: 'scale(1) translateY(0)' }
      ], {
        duration: 220,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'none'
      });

      // Subtle smooth entrance for stat cards
      const statCards = dialog.querySelectorAll('.modal-stat-card');
      if (statCards.length) {
        statCards.forEach((card, idx) => {
          card.animate([
            { opacity: 0, transform: 'translateY(6px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], {
            duration: 200,
            delay: 30 + (idx * 30),
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'none'
          });
        });
      }

      const firstInput = qs('input:not([type="hidden"]), select, textarea, button', dialog);
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 50);
      }
    }
  }

  close(dialog) {
    if (!dialog) dialog = qs('dialog[open]');
    if (dialog) {
      if (typeof dialog.getAnimations === 'function') {
        dialog.getAnimations().forEach(a => a.cancel());
      }

      // Smooth high-end exit animation without blur filter
      const anim = dialog.animate([
        { opacity: 1, transform: 'scale(1) translateY(0)' },
        { opacity: 0, transform: 'scale(0.96) translateY(8px)' }
      ], {
        duration: 160,
        easing: 'cubic-bezier(0.4, 0, 1, 1)',
        fill: 'forwards'
      });

      anim.onfinish = () => {
        anim.cancel();
        dialog.style.filter = 'none';
        if (typeof dialog.close === 'function') {
          try {
            dialog.close();
          } catch (err) {}
        }
        dialog.removeAttribute('open');
        dialog.style.removeProperty('display');
        this.cleanupBodyScroll();
      };
    }
  }

  cleanupBodyScroll() {
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
    if (window.__lenis) window.__lenis.start();
  }
}

export function initModals() {
  const controller = new ModalController();
  window.modalController = controller;
  return controller;
}
