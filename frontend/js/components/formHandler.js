/**
 * JDC SOLAR 2.0 - ACCESSIBLE FORM HANDLER & DUAL LEAD ROUTER (WHATSAPP + EMAIL)
 * 1. Validates all required inputs, phone regex (/^[6-9]\d{9}$/), and email
 * 2. Asynchronously dispatches lead data to Formspree / Email in the background
 * 3. Immediately triggers WhatsApp with a structured, pre-formatted lead card
 * 4. Displays instant toast confirmation and on-page success notification
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
        toast.show('Please fill in the required fields correctly.', 'error');
        const firstInvalid = qs('.is-invalid', form);
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // 3. Submission / Lead Dispatch Trigger
      const submitBtn = qs('button[type="submit"]', form);
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Connecting to WhatsApp & Email...';
      }

      // Construct Structured Lead Data
      const name = formData.name || 'Website Visitor';
      const phone = formData.phone || 'N/A';
      const email = formData.email || 'Not Provided';
      const city = formData.city || 'Jharkhand';
      const service = formData.service || 'Rooftop Solar Site Survey';
      const message = formData.message || 'I would like to schedule a free rooftop solar site survey and subsidy assessment.';
      const bill = formData.bill || formData.monthly_bill || 'N/A';
      const pageSource = window.location.pathname || '/';

      // 4. Background Asynchronous Email Dispatch (Formspree)
      const endpoint = form.getAttribute('action') || APP_CONFIG.contact.formspreeEndpoint;
      if (endpoint && !endpoint.includes('placeholder')) {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email,
            city,
            service,
            monthly_bill: bill,
            requirement: message,
            page_url: window.location.href,
            submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
          })
        }).catch(() => {
          // Fail silently without blocking WhatsApp redirect
        });
      }

      // 5. Structured High-Conversion WhatsApp Message
      const waText = 
`*NEW SOLAR LEAD — JDC SOLAR WEBSITE*
━━━━━━━━━━━━━━━━━━━━
👤 *Customer Name:* ${name}
📞 *Mobile:* ${phone}
📧 *Email:* ${email}
📍 *Location / City:* ${city}
⚡ *Solar Service:* ${service}
${bill !== 'N/A' ? `💰 *Monthly Electricity Bill:* ₹${bill}\n` : ''}📝 *Requirement:* ${message}
━━━━━━━━━━━━━━━━━━━━
🌐 *Submitted From:* ${pageSource}
⏰ *Time:* ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

      const waUrl = `https://wa.me/${APP_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(waText)}`;

      // 6. UI Feedback & Immediate WhatsApp Launch
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        form.reset();
        toast.show('Thank you! Redirecting to WhatsApp...', 'success');
        
        // Show in-page success alert if present
        const successBanner = qs('.form-success-banner', form.parentElement);
        if (successBanner) {
          successBanner.classList.remove('hidden');
          form.classList.add('hidden');
        }

        // Close modal if inside one
        const modal = form.closest('dialog');
        if (modal && typeof modal.close === 'function') {
          setTimeout(() => modal.close(), 1200);
        }

        // Redirect to WhatsApp (Direct redirect on mobile, new tab on desktop)
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = waUrl;
        } else {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }
      }, 450);
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
