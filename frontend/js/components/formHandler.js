/**
 * JDC SOLAR 2.0 - ACCESSIBLE FORM HANDLER & VALIDATOR
 * Handles honeypot spam protection, 10-digit Indian phone regex (/^[6-9]\d{9}$/), email validation, inline errors, and submit states
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
      const inputs = qsa('input, select, textarea', form);

      inputs.forEach(input => {
        if (input.name === 'b_url') return; // Skip honeypot

        const errorEl = qs(`#${input.id}-error`, form);
        let fieldValid = true;
        const val = input.value.trim();

        if (input.hasAttribute('required') && !val) {
          fieldValid = false;
        } else if (val && input.type === 'tel') {
          // Indian 10-digit mobile number validation: 6,7,8,9 followed by 9 digits
          const cleanedPhone = val.replace(/\D/g, '');
          const phoneRegex = /^[6-9]\d{9}$/;
          if (!phoneRegex.test(cleanedPhone)) {
            fieldValid = false;
          }
        } else if (val && input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
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
        toast.show('Thank you! Your enquiry has been received. Our engineering team will contact you within 2 business hours.', 'success');
        
        // Show in-page success alert if present
        const successBanner = qs('.form-success-banner', form.parentElement);
        if (successBanner) {
          successBanner.classList.remove('hidden');
          form.classList.add('hidden');
        }

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
