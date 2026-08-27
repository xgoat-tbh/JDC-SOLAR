/**
 * JDC SOLAR 2.0 - ACCESSIBLE FORM HANDLER & DUAL LEAD ROUTER
 * Handles honeypot spam protection, 10-digit Indian phone regex (/^[6-9]\d{9}$/), email validation,
 * inline error feedback, Formspree email dispatch, and automated WhatsApp lead forwarding.
 */

import { APP_CONFIG } from '../config.js';
import { qs, qsa } from '../core/dom.js';
import { toast } from './toast.js';

export function initForms() {
  const forms = qsa('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // 1. Honeypot Anti-Spam Check
      const honeypot = qs('input[name="b_url"]', form);
      if (honeypot && honeypot.value.trim() !== '') {
        return;
      }

      // 2. Validate Form Fields
      let isValid = true;
      const inputs = qsa('input, select, textarea', form);
      const formData = {};

      inputs.forEach(input => {
        if (input.name === 'b_url') return; // Skip honeypot

        const errorEl = qs(`#${input.id}-error`, form);
        let fieldValid = true;
        const val = input.value.trim();
        if (input.name) formData[input.name] = val;

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

      // 3. Submission / Lead Dispatch Trigger
      const submitBtn = qs('button[type="submit"]', form);
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
      }

      // Construct Structured Lead Data
      const name = formData.name || 'Website Visitor';
      const phone = formData.phone || 'N/A';
      const city = formData.city || 'Jharkhand';
      const service = formData.service || 'Rooftop Solar Survey';
      const message = formData.message || 'I would like to schedule a rooftop solar site survey.';

      // Attempt Formspree submission if endpoint configured
      const endpoint = form.getAttribute('action') || APP_CONFIG.contact.formspreeEndpoint;
      if (endpoint && !endpoint.includes('placeholder')) {
        try {
          await fetch(endpoint, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, city, service, message, source: window.location.pathname })
          });
        } catch (err) {
          // Non-blocking error handling
        }
      }

      // Construct WhatsApp URL
      const waText = `☀️ *New Solar Lead from JDC Website*:\n` +
        `👤 *Name*: ${name}\n` +
        `📞 *Phone*: ${phone}\n` +
        `📍 *Location*: ${city}\n` +
        `⚡ *Service Category*: ${service}\n` +
        `📝 *Requirement*: ${message}`;

      const waUrl = `https://wa.me/${APP_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(waText)}`;

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        form.reset();
        toast.show('Thank you! Your survey request has been submitted successfully.', 'success');
        
        // Show in-page success alert if present
        const successBanner = qs('.form-success-banner', form.parentElement);
        if (successBanner) {
          successBanner.classList.remove('hidden');
          form.classList.add('hidden');
        }

        // Close modal if inside one
        const modal = form.closest('dialog');
        if (modal && typeof modal.close === 'function') {
          setTimeout(() => modal.close(), 1500);
        }

        // Open WhatsApp for instant chat after short delay
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }, 600);
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
