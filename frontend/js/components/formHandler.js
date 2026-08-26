/**
 * JDC SOLAR 2.0 - ACCESSIBLE FORM HANDLER & VALIDATOR
 * Handles honeypot spam protection, 10-digit Indian phone regex (/^[6-9]\d{9}$/), inline errors, and submit states
 */

import { qs, qsa } from '../core/dom.js';
import { toast } from './toast.js';

export function initForms() {
  const forms = qsa('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // 1. Honeypot Anti-Spam Check
      const honeypot = qs('input[name="b_url"]', form);
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Spam bot detected via honeypot field.');
        return;
      }

      // 2. Validate Form Fields
      let isValid = true;
      const inputs = qsa('input[required], select[required], textarea[required]', form);

      inputs.forEach(input => {
        const errorEl = qs(`#${input.id}-error`, form);
        let fieldValid = true;

        if (!input.value.trim()) {
          fieldValid = false;
        } else if (input.type === 'tel') {
          // Indian 10-digit mobile number validation: 6,7,8,9 followed by 9 digits
          const cleanedPhone = input.value.replace(/\D/g, '');
          const phoneRegex = /^[6-9]\d{9}$/;
          if (!phoneRegex.test(cleanedPhone)) {
            fieldValid = false;
          }
        }

        if (!fieldValid) {
          isValid = false;
          input.classList.add('is-invalid');
          input.setAttribute('aria-invalid', 'true');
          if (errorEl) errorEl.classList.remove('hidden');
        } else {
          input.classList.remove('is-invalid');
          input.removeAttribute('aria-invalid');
          if (errorEl) errorEl.classList.add('hidden');
        }
      });

      if (!isValid) {
        toast.show('Please correct the highlighted form errors.', 'error');
        const firstInvalid = qs('.is-invalid', form);
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // 3. Simulated Submission / Webhook Trigger
      const submitBtn = qs('button[type="submit"]', form);
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        form.reset();
        toast.show('Thank you! Your rooftop survey request has been received. Our engineering team will call you within 2 hours.', 'success');
        
        // If inside a dialog, close it
        const dialog = form.closest('dialog');
        if (dialog && typeof dialog.close === 'function') {
          setTimeout(() => dialog.close(), 1200);
        }
      }, 1000);
    });

    // Clear error on input
    form.addEventListener('input', (e) => {
      const input = e.target;
      if (input.classList.contains('is-invalid')) {
        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        const errorEl = qs(`#${input.id}-error`, form);
        if (errorEl) errorEl.classList.add('hidden');
      }
    });
  });
}
