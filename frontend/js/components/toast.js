/**
 * JDC SOLAR 2.0 - ACCESSIBLE TOAST NOTIFIER
 * Creates screen-reader accessible notification alerts (aria-live="polite")
 */

import { createElement, qs } from '../core/dom.js';

class ToastManager {
  constructor() {
    this.container = null;
    this.ensureContainer();
  }

  ensureContainer() {
    this.container = qs('.toast-container');
    if (!this.container) {
      this.container = createElement('div', {
        className: 'toast-container',
        'aria-live': 'polite',
        'aria-atomic': 'true'
      });
      document.body.appendChild(this.container);
    }
  }

  show(message, type = 'success', duration = 4500) {
    this.ensureContainer();

    const toast = createElement('div', {
      className: `toast toast--${type}`,
      role: 'status'
    }, [message]);

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }
}

export const toast = new ToastManager();
