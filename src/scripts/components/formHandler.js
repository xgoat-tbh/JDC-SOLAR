import { APP_CONFIG } from '../config.js';
import { qs, qsa } from '../core/dom.js';
import { toast } from './toast.js';

export function initForms() {
  const forms = qsa('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      
      const honeypot = qs('input[name="b_url"]', form);
      if (honeypot && honeypot.value.trim() !== '') {
        return;
      }

      
      let isValid = true;
      const inputs = qsa('input, select, textarea', form);
      const formData = {};

      inputs.forEach(input => {
        if (input.name === 'b_url') return; 

        const errorEl = qs(`#${input.id}-error`, form);
        let fieldValid = true;
        const val = input.value.trim();
        if (input.name) formData[input.name] = val;

        if (input.hasAttribute('required') && !val) {
          fieldValid = false;
        } else if (val && input.type === 'tel') {
          
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

      
      const submitBtn = qs('button[type="submit"]', form);
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Connecting to WhatsApp & Email...';
      }

      
      const name = formData.name || 'Website Visitor';
      const phone = formData.phone || 'N/A';
      const email = formData.email || 'Not Provided';
      const city = formData.city || 'Jharkhand';
      const service = formData.service || 'Rooftop Solar Site Survey';
      const message = formData.message || 'I would like to schedule a free rooftop solar site survey and subsidy assessment.';
      const bill = formData.bill || formData.monthly_bill || 'N/A';
      const pageSource = window.location.pathname || '/';

      
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
          
        });
      }

      
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

      
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        form.reset();
        toast.show('Thank you! Redirecting to WhatsApp...', 'success');
        
        
        const successBanner = qs('.form-success-banner', form.parentElement);
        if (successBanner) {
          successBanner.classList.remove('hidden');
          form.classList.add('hidden');
        }

        
        const modal = form.closest('dialog');
        if (modal && typeof modal.close === 'function') {
          setTimeout(() => modal.close(), 1200);
        }

        
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = waUrl;
        } else {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }
      }, 450);
    });

    
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
