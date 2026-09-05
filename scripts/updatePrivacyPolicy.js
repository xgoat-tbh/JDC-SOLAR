import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const privacyPath = path.resolve(__dirname, '../frontend/privacy-policy/index.html');

const privacyHtml = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Primary SEO Metadata -->
  <title>Privacy Policy | JDC Solar</title>
  <meta name="description" content="Read JDC Solar's privacy policy and data protection commitments regarding customer information and rooftop solar consultation requests.">
  <meta name="author" content="JDC Solar / Jagatdhan Commodities Pvt. Ltd.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://jdcsolar.com/privacy-policy/">

  <!-- OpenGraph Social Metadata -->
  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Privacy Policy | JDC Solar">
  <meta property="og:description" content="Transparent data governance and privacy policy of JDC Solar.">
  <meta property="og:url" content="https://jdcsolar.com/privacy-policy/">
  <meta property="og:site_name" content="JDC Solar">
  <meta property="og:image" content="https://jdcsolar.com/assets/images/brand/og-preview.jpg">

  <!-- Theme & Favicon -->
  <meta name="theme-color" content="#1B3766">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/brand/apple-touch-icon.png">

  <!-- Professional SaaS Typography (Plus Jakarta Sans + Inter) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/main.css">
</head>
<body data-page="privacy-policy">

  <!-- Accessible Skip Link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Top Trust Micro-Bar -->
  <div class="header-topbar hide-on-mobile">
    <div class="container flex flex--between">
      <div class="header-topbar__trust-badge">
        <svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-sun"></use></svg>
        <span>A Jagatdhan Commodities Pvt. Ltd. Company</span>
        <span>•</span>
        <span>Jharkhand's Premier Solar EPC Partner</span>
      </div>
      <div class="flex gap-md">
        <a href="tel:+919234611112" style="display: inline-flex; align-items: center; gap: 6px;">
          <svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg>
          <span>+91 92346 11112</span>
        </a>
        <a href="mailto:sales@jdcsolar.com" style="display: inline-flex; align-items: center; gap: 6px;">
          <svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-email"></use></svg>
          <span>sales@jdcsolar.com</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Primary Sticky Navigation Header -->
  <header class="header" role="banner">
    <div class="container flex flex--between">
      <a href="/" class="header__brand" aria-label="JDC Solar Homepage">
        <div class="header__logo-wrap">
          <span style="font-size: 1.65rem; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">JDC <span style="color: var(--color-brand-accent);">SOLAR</span></span>
          <span class="header__logo-subtext">SMART SOLAR SOLUTIONS</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="nav hide-on-mobile" aria-label="Main Navigation">
        <ul class="nav__list">
          <li class="nav__item"><a href="/" class="nav__link">Home</a></li>
          <li class="nav__item"><a href="/about/" class="nav__link">About Us</a></li>
          <li class="nav__item nav__item--has-dropdown">
            <a href="/services/" class="nav__link" aria-expanded="false" aria-haspopup="true">
              Services
              <svg class="icon icon--inline" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-chevron-down"></use></svg>
            </a>
            <div class="nav__dropdown" role="menu">
              <div class="nav__dropdown-item"><a href="/services/residential-solar/" class="nav__dropdown-link" role="menuitem">Residential Rooftop Solar (PM Surya Ghar)</a></div>
              <div class="nav__dropdown-item"><a href="/services/commercial-solar/" class="nav__dropdown-link" role="menuitem">Commercial & Industrial Rooftop Solar</a></div>
              <div class="nav__dropdown-item"><a href="/services/institutional-solar/" class="nav__dropdown-link" role="menuitem">Institutional Solar (Hospitals & Schools)</a></div>
              <div class="nav__dropdown-item"><a href="/services/government-solar/" class="nav__dropdown-link" role="menuitem">Government & PSU Solar Tenders</a></div>
              <div class="nav__dropdown-item"><a href="/services/street-lights/" class="nav__dropdown-link" role="menuitem">Solar Street Lighting Systems</a></div>
              <div class="nav__dropdown-item"><a href="/services/solar-parks/" class="nav__dropdown-link" role="menuitem">Utility-Scale Solar Parks</a></div>
            </div>
          </li>
          <li class="nav__item"><a href="/projects/" class="nav__link">Projects</a></li>
          <li class="nav__item"><a href="/pm-surya-ghar/" class="nav__link">PM Surya Ghar</a></li>
          <li class="nav__item"><a href="/solar-calculator/" class="nav__link">Solar Calculator</a></li>
          <li class="nav__item"><a href="/resources/" class="nav__link">Resources</a></li>
          <li class="nav__item"><a href="/contact/" class="nav__link">Contact</a></li>
        </ul>
      </nav>

      <!-- Header CTAs -->
      <div class="header__actions hide-on-mobile">
        <button type="button" class="btn btn--primary" data-modal-open="survey-modal">
          Book Site Survey →
        </button>
      </div>

      <!-- Mobile Hamburger Button -->
      <button type="button" class="header__hamburger hide-on-desktop" aria-label="Open Mobile Menu" aria-expanded="false" aria-controls="mobile-drawer" data-drawer-trigger="mobile-drawer">
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
    </div>
  </header>

  <!-- Mobile Off-Canvas Drawer -->
  <aside id="mobile-drawer" class="drawer" aria-label="Mobile Navigation Drawer" aria-hidden="true" inert>
    <div class="drawer__header">
      <span style="font-size: 1.4rem; font-weight: 800; color: #FFFFFF;">JDC <span style="color: var(--color-brand-accent);">SOLAR</span></span>
      <button type="button" class="drawer__close-btn" data-drawer-close aria-label="Close Menu">
        <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-close"></use></svg>
      </button>
    </div>
    <div class="drawer__body">
      <ul class="drawer__nav-list">
        <li class="drawer__nav-item"><a href="/" class="drawer__nav-link">Home</a></li>
        <li class="drawer__nav-item"><a href="/about/" class="drawer__nav-link">About Us</a></li>
        <li class="drawer__nav-item"><a href="/services/" class="drawer__nav-link">All Solar Services</a></li>
        <li class="drawer__nav-item"><a href="/projects/" class="drawer__nav-link">Projects</a></li>
        <li class="drawer__nav-item"><a href="/pm-surya-ghar/" class="drawer__nav-link">PM Surya Ghar Subsidy</a></li>
        <li class="drawer__nav-item"><a href="/solar-calculator/" class="drawer__nav-link">Solar Calculator</a></li>
        <li class="drawer__nav-item"><a href="/resources/" class="drawer__nav-link">Resources</a></li>
        <li class="drawer__nav-item"><a href="/contact/" class="drawer__nav-link">Contact Us</a></li>
      </ul>
    </div>
    <div class="drawer__footer">
      <button type="button" class="btn btn--primary btn--block" data-modal-open="survey-modal">Book Free Site Survey</button>
      <a href="tel:+919234611112" class="btn btn--secondary btn--block"><svg class="icon" style="margin-right: 6px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg> Call +91 92346 11112</a>
    </div>
  </aside>

  <!-- Main Content Landmark -->
  <main id="main-content" role="main">

    <!-- Section 1: Cinematic Subpage Hero Banner -->
    <section class="page-hero page-hero--privacy" aria-label="Privacy Policy">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumbs">
          <ol class="breadcrumb__list">
            <li class="breadcrumb__item"><a href="/" class="breadcrumb__link">Home</a></li>
            <li class="breadcrumb__separator" aria-hidden="true">/</li>
            <li class="breadcrumb__item" aria-current="page">Privacy Policy</li>
          </ol>
        </nav>

        <div class="page-hero__badge">
          <div class="badge--saas-pulse">
            <span class="badge-pulse-dot"><span class="badge-pulse-dot__ping"></span><span class="badge-pulse-dot__core"></span></span>
            <span>Data Protection Commitment</span>
          </div>
        </div>
        <h1 class="display-title page-hero__title">
          Privacy Policy & Data Security
        </h1>
        <p class="lead page-hero__lead">
          Transparent information on how JDC Solar protects your personal data, site survey records, and rooftop energy audits.
        </p>
        <div class="page-hero__chips">
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-shield"></use></svg>
            <span>SSL Encrypted Data</span>
          </div>
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Zero Third-Party Sharing</span>
          </div>
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>DISCOM Compliance Protected</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy Policy Content -->
    <article class="section section--compact">
      <div class="container container--medium">
        <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">Last Updated: August 2026</div>

        <div style="font-size: 1rem; line-height: 1.8; color: var(--color-text-primary);">
          
          <h2 style="font-size: 1.35rem; color: var(--color-brand-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">
            1. Overview & Data Controller
          </h2>
          <p>
            <strong>JDC Solar</strong> (a brand of <strong>Jagatdhan Commodities Pvt. Ltd.</strong>, having its registered office at A-21, 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109) respects your privacy and is committed to protecting any personal information you share with us.
          </p>

          <h2 style="font-size: 1.35rem; color: var(--color-brand-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">
            2. Information We Collect
          </h2>
          <p>
            When you request a solar rooftop feasibility survey, submit a contact form, or utilize our solar estimation calculator, we may collect:
          </p>
          <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
            <li><strong>Contact Details:</strong> Full Name, Mobile Phone Number, Email Address.</li>
            <li><strong>Property Location:</strong> City, District, or Pincode in Jharkhand.</li>
            <li><strong>Energy Consumption Data:</strong> Monthly electricity units (kWh) or average bill amount.</li>
          </ul>

          <h2 style="font-size: 1.35rem; color: var(--color-brand-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">
            3. Purpose of Data Processing
          </h2>
          <p>
            We process your information exclusively for the following operational purposes:
          </p>
          <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
            <li>To contact you and schedule an on-site rooftop feasibility inspection.</li>
            <li>To calculate solar system sizing and prepare a customized financial ROI proposal.</li>
            <li>To assist with National Portal and JBVNL net-metering documentation upon your explicit authorization.</li>
          </ul>

          <h2 style="font-size: 1.35rem; color: var(--color-brand-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">
            4. Zero Data Selling Guarantee
          </h2>
          <p>
            JDC Solar does <strong>not sell, rent, trade, or distribute</strong> your personal contact information to third-party telemarketers, lead brokers, or advertising networks.
          </p>

          <h2 style="font-size: 1.35rem; color: var(--color-brand-primary); margin-top: 1.5rem; margin-bottom: 0.5rem;">
            5. Grievance Officer & Contact
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to have your contact details updated or deleted from our records, please reach out to our privacy desk:
          </p>
          <div style="background: var(--color-bg-surface-sunken); padding: 1.25rem 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle); margin-top: 1rem;">
            <strong>Privacy Grievance Officer:</strong><br>
            JDC Solar / Jagatdhan Commodities Pvt. Ltd.<br>
            A-21, 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109<br>
            Email: <a href="mailto:info@jdcsolar.com" style="color: var(--color-brand-primary); font-weight: 600;">info@jdcsolar.com</a> | Phone: <a href="tel:+919234611112" style="color: var(--color-brand-primary); font-weight: 600;">+91 92346 11112</a>
          </div>

        </div>

      </div>
    </article>

  </main>

  <!-- Global Footer -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF; margin-bottom: 0.75rem;">JDC <span style="color: var(--color-brand-accent);">SOLAR</span></div>
          <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text-inverse-muted); margin-bottom: 1.5rem;">A Jagatdhan Commodities Pvt. Ltd. Company. Engineering high-performance rooftop solar across Eastern India.</p>
          <div class="badge badge--accent">Verified MNRE Channel Partner</div>
        </div>
        <div>
          <h3 class="footer__column-title">Solar Services</h3>
          <ul class="footer__links-list">
            <li class="footer__link-item"><a href="/services/residential-solar/" class="footer__link">Residential Rooftop Solar</a></li>
            <li class="footer__link-item"><a href="/services/commercial-solar/" class="footer__link">Commercial & Industrial Solar</a></li>
            <li class="footer__link-item"><a href="/services/institutional-solar/" class="footer__link">Institutional Solar</a></li>
            <li class="footer__link-item"><a href="/services/government-solar/" class="footer__link">Government & Tender EPC</a></li>
            <li class="footer__link-item"><a href="/services/street-lights/" class="footer__link">Solar Street Lighting</a></li>
            <li class="footer__link-item"><a href="/services/solar-parks/" class="footer__link">Utility Solar Parks</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer__column-title">Quick Links</h3>
          <ul class="footer__links-list">
            <li class="footer__link-item"><a href="/about/" class="footer__link">About JDC Solar</a></li>
            <li class="footer__link-item"><a href="/projects/" class="footer__link">Project Portfolio</a></li>
            <li class="footer__link-item"><a href="/pm-surya-ghar/" class="footer__link">PM Surya Ghar Guide</a></li>
            <li class="footer__link-item"><a href="/solar-calculator/" class="footer__link">Solar Calculator</a></li>
            <li class="footer__link-item"><a href="/resources/" class="footer__link">Resources & FAQ</a></li>
            <li class="footer__link-item"><a href="/contact/" class="footer__link">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer__column-title">Headquarters</h3>
          <div class="footer-contact">
            <div class="footer-contact__item"><svg class="icon"><use href="/assets/icons/sprite.svg#icon-location"></use></svg><span>A-21, 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109</span></div>
            <div class="footer-contact__item"><svg class="icon"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg><a href="tel:+919234611112">+91 92346 11112</a></div>
            <div class="footer-contact__item"><svg class="icon"><use href="/assets/icons/sprite.svg#icon-whatsapp"></use></svg><a href="https://wa.me/919288381112" target="_blank" rel="noopener noreferrer">+91 92883 81112 (WhatsApp)</a></div>
            <div class="footer-contact__item"><svg class="icon"><use href="/assets/icons/sprite.svg#icon-email"></use></svg><a href="mailto:sales@jdcsolar.com">sales@jdcsolar.com</a></div>
          </div>
        </div>
      </div>
      <div class="sub-footer">
        <div>© 2026 JDC Solar. A Jagatdhan Commodities Pvt. Ltd. Company. All rights reserved.</div>
        <div class="sub-footer__legal-links"><a href="/privacy-policy/">Privacy Policy</a><span>•</span><a href="/contact/">Site Survey</a></div>
      </div>
    </div>
  </footer>

  <!-- Sticky Mobile Action Bar -->
  <aside class="mobile-action-bar" aria-label="Quick Mobile Actions">
    <a href="tel:+919234611112" class="mobile-action-bar__tile mobile-action-bar__tile--call"><svg class="icon"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg><span>Call Us</span></a>
    <a href="https://wa.me/919288381112" class="mobile-action-bar__tile mobile-action-bar__tile--whatsapp" target="_blank" rel="noopener noreferrer"><svg class="icon"><use href="/assets/icons/sprite.svg#icon-whatsapp"></use></svg><span>WhatsApp</span></a>
    <a href="/solar-calculator/" class="mobile-action-bar__tile mobile-action-bar__tile--calc"><svg class="icon"><use href="/assets/icons/sprite.svg#icon-calculator"></use></svg><span>Calculate</span></a>
  </aside>

  <!-- Reusable Accessible Modal Dialog -->
  <dialog id="survey-modal" class="modal-dialog" aria-labelledby="survey-modal-title">
    <div class="modal-dialog__header">
      <h2 id="survey-modal-title" class="modal-dialog__title">Book Free Rooftop Survey</h2>
      <button type="button" class="modal-dialog__close-btn" data-modal-close aria-label="Close Dialog"><svg class="icon"><use href="/assets/icons/sprite.svg#icon-close"></use></svg></button>
    </div>
    <div class="modal-dialog__body">
      <p class="text-small text-muted" style="margin-bottom: 1.5rem;">Enter your contact details. Our solar engineering team will inspect your roof and prepare an exact proposal.</p>
      <form data-validate="true">
        <input type="text" name="b_url" class="sr-only" tabindex="-1" autocomplete="off">
        <div class="form-group">
          <label class="form-label" for="survey-name">Full Name <span class="required-mark">*</span></label>
          <input type="text" id="survey-name" name="name" class="form-control" placeholder="e.g. Ramesh Kumar" required>
          <span id="survey-name-error" class="form-error-msg hidden">Please enter your full name.</span>
        </div>
        <div class="form-group">
          <label class="form-label" for="survey-phone">Mobile Number (10 Digits) <span class="required-mark">*</span></label>
          <input type="tel" id="survey-phone" name="phone" class="form-control" placeholder="e.g. 9876543210" required>
          <span id="survey-phone-error" class="form-error-msg hidden">Please enter a valid 10-digit Indian phone number.</span>
        </div>
        <div class="form-group">
          <label class="form-label" for="survey-city">City / Pincode in Jharkhand <span class="required-mark">*</span></label>
          <input type="text" id="survey-city" name="city" class="form-control" placeholder="e.g. Jamshedpur, 831001" required>
          <span id="survey-city-error" class="form-error-msg hidden">Please enter your city or pincode.</span>
        </div>
        <button type="submit" class="btn btn--primary btn--block btn--lg" style="margin-top: 1rem;">Submit Survey Request →</button>
      </form>
    </div>
  </dialog>

  <script type="module" src="/js/main.js"></script>
</body>
</html>`;

fs.writeFileSync(privacyPath, privacyHtml, 'utf8');
console.log('✅ Synchronized privacy-policy/index.html with standard site-wide navigation, footer, and modal');
