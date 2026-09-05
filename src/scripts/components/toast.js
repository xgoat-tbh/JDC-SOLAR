import { createElement, qs } from '../core/dom.js';

class ToastManager {
  constructor() {
    this.container = null;
  }

  ensureContainer() {
    if (typeof document === 'undefined' || !document.body) return null;
    
    this.container = qs('.toast-container');
    if (!this.container) {
      this.container = createElement('div', {
        className: 'toast-container',
        'aria-live': 'polite',
        'aria-atomic': 'true'
      });
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  show(message, type = 'success', duration = 4500) {
    const container = this.ensureContainer();
    if (!container) return;

    const toast = createElement('div', {
      className: `toast toast--${type}`,
      role: 'status'
    }, [message]);

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }
}

export const toast = new ToastManager();
