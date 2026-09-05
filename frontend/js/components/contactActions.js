import { APP_CONFIG } from '../config.js';
import { qs } from '../core/dom.js';

function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.innerWidth <= 768 && ('ontouchstart' in window || navigator.maxTouchPoints > 0))
  );
}

function showToast(message, type = 'info') {
  let container = qs('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('role', 'status');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <svg class="icon" style="width: 18px; height: 18px; color: ${type === 'success' ? '#10B981' : '#FD8127'};" aria-hidden="true">
      <use href="/assets/icons/sprite.svg#icon-${type === 'success' ? 'check' : 'sun'}"></use>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

function ensureCallModal() {
  let modal = qs('#call-modal');
  if (modal) return modal;

  const phone = (APP_CONFIG && APP_CONFIG.PHONE) || '+91 92883 81112';
  const phoneClean = (APP_CONFIG && APP_CONFIG.PHONE_CLEAN) || '919288381112';
  const whatsappUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent('Hello JDC Solar, I would like to speak directly with an EPC engineer regarding solar installation.')}`;

  modal = document.createElement('dialog');
  modal.id = 'call-modal';
  modal.className = 'modal-dialog call-modal-dialog';
  modal.setAttribute('aria-labelledby', 'call-modal-title');
  modal.innerHTML = `
    <div class="call-modal-header">
      <div class="call-modal-header__left">
        <div class="call-modal-header__icon">
          <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg>
        </div>
        <div>
          <h3 id="call-modal-title" class="call-modal-title">Speak With Our Solar Engineers</h3>
          <p class="call-modal-subtitle">Official EPC Engineering &amp; Subsidy Desk</p>
        </div>
      </div>
      <button type="button" class="modal-dialog__close-btn" data-modal-close aria-label="Close call modal">
        <svg class="icon" style="width: 20px; height: 20px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-close"></use></svg>
      </button>
    </div>

    <div class="call-modal-body">
      <div class="call-number-card">
        <div class="call-number-card__label">Direct Helpline Number</div>
        <a href="tel:+${phoneClean}" class="call-number-card__number" title="Click to call via dialer">${phone}</a>
        <div class="call-number-card__actions">
          <button type="button" class="btn btn--secondary btn--sm" id="btn-copy-phone" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg class="icon" style="width: 15px; height: 15px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-document"></use></svg>
            <span id="copy-phone-text">Copy Number</span>
          </button>
          <a href="tel:+${phoneClean}" class="btn btn--primary btn--sm" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg class="icon" style="width: 15px; height: 15px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg>
            <span>Dial Now</span>
          </a>
        </div>
      </div>

      <div class="call-modal-info">
        <div class="call-modal-info-item">
          <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
          <span>Mon – Sat: 9 AM – 7 PM</span>
        </div>
        <div class="call-modal-info-item">
          <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
          <span>Adityapur Industrial Area</span>
        </div>
        <div class="call-modal-info-item">
          <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-shield"></use></svg>
          <span>MNRE Verified EPC</span>
        </div>
        <div class="call-modal-info-item">
          <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-sun"></use></svg>
          <span>Instant WhatsApp Feasibility</span>
        </div>
      </div>

      <div class="call-modal-ctas">
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--whatsapp btn--block" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
          <svg class="icon" style="width: 18px; height: 18px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-whatsapp"></use></svg>
          <span>Connect via WhatsApp (+91 92883 81112)</span>
        </a>
        <button type="button" class="btn btn--ghost btn--block" id="btn-switch-to-survey" style="font-size: 0.85rem; padding: 6px;">
          Prefer a callback? Book Free Rooftop Survey →
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  
  const copyBtn = qs('#btn-copy-phone', modal);
  const copyText = qs('#copy-phone-text', modal);
  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(phone);
        copyText.textContent = 'Copied to Clipboard';
        showToast(`Copied ${phone} to clipboard!`, 'success');
        setTimeout(() => {
          copyText.textContent = 'Copy Number';
        }, 3000);
      } catch (err) {
        showToast(`Helpline: ${phone}`, 'info');
      }
    });
  }

  
  const surveyBtn = qs('#btn-switch-to-survey', modal);
  if (surveyBtn) {
    surveyBtn.addEventListener('click', () => {
      if (typeof modal.close === 'function') modal.close();
      const surveyModal = qs('#survey-modal');
      if (surveyModal && typeof surveyModal.showModal === 'function') {
        surveyModal.showModal();
        document.body.style.overflow = 'hidden';
      }
    });
  }

  
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog && typeof modal.close === 'function') {
      modal.close();
      document.body.style.overflow = '';
    }
  });

  return modal;
}

function handlePhoneClick(e, link) {
  if (isMobileDevice()) {
    
    return;
  }

  
  e.preventDefault();
  const modal = ensureCallModal();
  if (modal && typeof modal.showModal === 'function') {
    modal.showModal();
    document.body.style.overflow = 'hidden';
  }
}

function handleEmailClick(e, link) {
  e.preventDefault();

  const rawHref = link.getAttribute('href') || '';
  let email = rawHref.replace(/^mailto:/i, '').split('?')[0].trim();
  if (!email) email = (APP_CONFIG && APP_CONFIG.EMAIL) || 'sales@jdcsolar.com';

  const subject = 'Solar Rooftop & EPC Inquiry - JDC Solar';
  const body = `Hello JDC Solar Team,

I would like to inquire about a solar rooftop installation for my property in Jharkhand.

My Details:
- Full Name: 
- Mobile Number: 
- City / District: 
- Property Type: Residential / Commercial / Industrial
- Estimated Monthly Electricity Bill: ₹ 

Please share feasibility, subsidy estimate (PM Surya Ghar), and proposal details.

Thank you!`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  showToast(`Opening Gmail compose window for ${email}...`, 'info');

  
  window.open(gmailUrl, '_blank', 'noopener,noreferrer');
}

export function initContactActions() {
  document.addEventListener('click', (e) => {
    
    const phoneLink = e.target.closest('a[href^="tel:"], [data-call-trigger]');
    if (phoneLink) {
      handlePhoneClick(e, phoneLink);
      return;
    }

    
    const emailLink = e.target.closest('a[href^="mailto:"], [data-email-trigger]');
    if (emailLink) {
      handleEmailClick(e, emailLink);
      return;
    }
  });
}
