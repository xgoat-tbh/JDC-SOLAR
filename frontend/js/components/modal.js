/**
 * JDC SOLAR 2.0 - ACCESSIBLE MODAL CONTROLLER
 * Manages native <dialog> open/close states, focus trapping, and backdrop click dismissing
 */

import { qs, qsa } from '../core/dom.js';

export class ModalController {
  constructor() {
    this.init();
  }

  init() {
    // Listen for modal open triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal-open]');
      if (trigger) {
        const modalId = trigger.getAttribute('data-modal-open');
        this.open(modalId);
      }

      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        const dialog = closeBtn.closest('dialog');
        if (dialog) this.close(dialog);
      }
    });

    // Close when clicking outside dialog content (on backdrop)
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
    });
  }

  open(modalId) {
    const dialog = qs(`#${modalId}`);
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      
      // Auto-focus first interactive input
      const firstInput = qs('input:not([type="hidden"]), select, textarea, button', dialog);
      if (firstInput) firstInput.focus();
    }
  }

  close(dialog) {
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
      document.body.style.overflow = '';
    }
  }
}

export function initModals() {
  return new ModalController();
}
