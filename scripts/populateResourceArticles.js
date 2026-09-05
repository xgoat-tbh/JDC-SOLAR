import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const frontendDir = path.join(rootDir, 'frontend');

function getHeader(activePage = 'resources') {
  return `  <!-- Top Trust Micro-Bar -->
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
          <li class="nav__item"><a href="/resources/" class="nav__link nav__link--active" aria-current="page">Resources</a></li>
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
        <li class="drawer__nav-item"><a href="/resources/" class="drawer__nav-link" aria-current="page">Resources</a></li>
        <li class="drawer__nav-item"><a href="/contact/" class="drawer__nav-link">Contact Us</a></li>
      </ul>
    </div>
    <div class="drawer__footer">
      <button type="button" class="btn btn--primary btn--block" data-modal-open="survey-modal">Book Free Site Survey</button>
      <a href="tel:+919234611112" class="btn btn--secondary btn--block"><svg class="icon" style="margin-right: 6px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg> Call +91 92346 11112</a>
    </div>
  </aside>`;
}

function getFooter() {
  return `  <!-- Global Footer -->
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

  <!-- Application Bootstrap Module -->
  <script type="module" src="/js/main.js"></script>
</body>
</html>`;
}

const article1Html = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Primary SEO Metadata -->
  <title>How Rooftop Solar Works: Net-Metering, Inverters & Grid Synchronization | JDC Solar</title>
  <meta name="description" content="Learn how rooftop solar converts sunlight into usable AC electricity, synchronizes with the DISCOM grid, and utilizes bidirectional net-metering to slash power bills.">
  <meta name="keywords" content="how rooftop solar works, net metering explained Jharkhand, grid-tied inverter working, photovoltaic effect solar panels, bidirectional meter working">
  <meta name="author" content="JDC Solar / Jagatdhan Commodities Pvt. Ltd.">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="https://jdcsolar.com/resources/how-solar-rooftop-works/">

  <!-- OpenGraph Social Metadata -->
  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="article">
  <meta property="og:title" content="How Rooftop Solar Works: Net-Metering & Grid Synchronization | JDC Solar">
  <meta property="og:description" content="A comprehensive technical breakdown of solar PV systems, string inverters, and DISCOM net-metering.">
  <meta property="og:url" content="https://jdcsolar.com/resources/how-solar-rooftop-works/">
  <meta property="og:site_name" content="JDC Solar">
  <meta property="og:image" content="https://jdcsolar.com/assets/images/banners/banner-resources.jpg">

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

  <!-- Schema.org JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://jdcsolar.com/resources/how-solar-rooftop-works/#article",
        "headline": "How Rooftop Solar Works: Net-Metering, Inverters & Grid Synchronization",
        "description": "Comprehensive engineering guide explaining the photovoltaic conversion of sunlight, on-grid inverters, and bidirectional net-metering.",
        "image": "https://jdcsolar.com/assets/images/banners/banner-resources.jpg",
        "datePublished": "2026-08-01T08:00:00+05:30",
        "dateModified": "2026-08-01T08:00:00+05:30",
        "author": {
          "@type": "Organization",
          "name": "JDC Solar Technical Engineering Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "JDC Solar",
          "logo": {
            "@type": "ImageObject",
            "url": "https://jdcsolar.com/assets/images/brand/logo.png"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jdcsolar.com/" },
          { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://jdcsolar.com/resources/" },
          { "@type": "ListItem", "position": 3, "name": "How Rooftop Solar Works", "item": "https://jdcsolar.com/resources/how-solar-rooftop-works/" }
        ]
      }
    ]
  }
  </script>
</head>
<body data-page="resource-detail">

  <!-- Accessible Skip Link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

${getHeader('resources')}

  <!-- Main Content Landmark -->
  <main id="main-content" role="main">

    <!-- Section 1: Cinematic Subpage Hero Banner -->
    <section class="page-hero page-hero--resources" aria-label="Technical Solar Guide">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumbs">
          <ol class="breadcrumb__list">
            <li class="breadcrumb__item"><a href="/" class="breadcrumb__link">Home</a></li>
            <li class="breadcrumb__separator" aria-hidden="true">/</li>
            <li class="breadcrumb__item"><a href="/resources/" class="breadcrumb__link">Resources</a></li>
            <li class="breadcrumb__separator" aria-hidden="true">/</li>
            <li class="breadcrumb__item" aria-current="page">How Solar Works</li>
          </ol>
        </nav>

        <div class="page-hero__badge">
          <div class="badge--saas-pulse">
            <span class="badge-pulse-dot"><span class="badge-pulse-dot__ping"></span><span class="badge-pulse-dot__core"></span></span>
            <span>Technical Solar Guide</span>
          </div>
        </div>
        <h1 class="display-title page-hero__title">
          How Rooftop Solar Works: Net-Metering, Inverters & Grid Synchronization
        </h1>
        <p class="lead page-hero__lead">
          A clear engineering explanation of how photovoltaic silicon modules generate DC power, how on-grid inverters synchronize with state electricity grids, and how bidirectional net-meters reduce electric bills by up to 90%.
        </p>
        <div class="page-hero__chips">
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Photovoltaic Working Principle</span>
          </div>
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Grid-Tied Net-Metering Flow</span>
          </div>
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Monocrystalline Efficiency</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Core Engineering Breakdown -->
    <section class="section">
      <div class="container container--medium">
        
        <!-- Pillar 1: Photovoltaic Physics -->
        <article class="card card--neomorph" style="padding: var(--space-2xl); margin-bottom: var(--space-2xl);">
          <div class="badge badge--primary" style="margin-bottom: 1rem;">STAGE 1: GENERATION</div>
          <h2 style="font-size: 1.6rem; color: var(--color-brand-primary); margin-bottom: 1rem;">1. Photovoltaic Silicon Physics (Sunlight to DC Power)</h2>
          <p style="line-height: 1.8; color: var(--color-text-default); margin-bottom: 1.25rem;">
            When sunlight hits the surface of a monocrystalline silicon solar panel, photons are absorbed by semiconductor material (P-N junction). This photon energy excites electrons, knocking them free from their atomic bonds. An integrated electrical field inside the cell directs these free electrons into a continuous flow, creating direct current (DC) electricity.
          </p>
          <div class="grid grid--2col gap-md" style="margin-top: 1.5rem;">
            <div style="background: var(--color-bg-surface-sunken); padding: 1.25rem; border-radius: var(--radius-lg); border-left: 4px solid var(--color-brand-accent);">
              <strong style="color: #FFFFFF;">Mono PERC / TOPCon Technology:</strong>
              <p class="text-small text-muted" style="margin-top: 0.5rem;">Modern Tier-1 panels achieve 21.5% to 22.8% cell conversion efficiency, generating substantial power even during cloudy or diffused monsoon days in Jharkhand.</p>
            </div>
            <div style="background: var(--color-bg-surface-sunken); padding: 1.25rem; border-radius: var(--radius-lg); border-left: 4px solid var(--color-status-success);">
              <strong style="color: #FFFFFF;">Temperature Coefficient:</strong>
              <p class="text-small text-muted" style="margin-top: 0.5rem;">Engineered with a low temperature coefficient (-0.30%/°C) ensuring optimal summer yield across Jamshedpur, Ranchi, and Dhanbad heatwaves.</p>
            </div>
          </div>
        </article>

        <!-- Pillar 2: Inverter & Grid Sync -->
        <article class="card card--neomorph" style="padding: var(--space-2xl); margin-bottom: var(--space-2xl);">
          <div class="badge badge--primary" style="margin-bottom: 1rem;">STAGE 2: INVERSION & SYNCHRONIZATION</div>
          <h2 style="font-size: 1.6rem; color: var(--color-brand-primary); margin-bottom: 1rem;">2. On-Grid String Inverter & Phase Synchronization</h2>
          <p style="line-height: 1.8; color: var(--color-text-default); margin-bottom: 1.25rem;">
            Homes and industrial plants run on Alternating Current (AC) at 230V single-phase or 415V three-phase, 50 Hz. The on-grid solar string inverter converts the raw DC current into pure sine-wave AC power that matches the exact voltage, frequency, and phase angle of the DISCOM grid (JBVNL / TSUISL).
          </p>
          <p style="line-height: 1.8; color: var(--color-text-default); margin-bottom: 1.25rem;">
            <strong>Maximum Power Point Tracking (MPPT):</strong> Dual or quad MPPT microprocessors continuously sweep voltage-current curves thousands of times per second to extract maximum peak wattage regardless of partial shading or cloud movement.
          </p>
        </article>

        <!-- Pillar 3: Net-Metering Flow -->
        <article class="card card--neomorph" style="padding: var(--space-2xl); margin-bottom: var(--space-2xl);">
          <div class="badge badge--primary" style="margin-bottom: 1rem;">STAGE 3: DISCOM NET-METERING</div>
          <h2 style="font-size: 1.6rem; color: var(--color-brand-primary); margin-bottom: 1rem;">3. Bidirectional Net-Metering & Monthly Settlement</h2>
          <p style="line-height: 1.8; color: var(--color-text-default); margin-bottom: 1.25rem;">
            A bidirectional net-meter replaces your standard electricity meter. It records both the electricity you import from the grid during nighttime and the excess clean solar energy you export to the grid during sunny daytime hours.
          </p>
          <div style="background: var(--color-bg-surface-sunken); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--color-border-subtle); margin-top: 1rem;">
            <h3 style="font-size: 1.15rem; color: var(--color-brand-accent); margin-bottom: 0.75rem;">Sample Jharkhand Monthly Net-Metering Calculation:</h3>
            <ul style="list-style: disc; padding-left: 1.5rem; line-height: 1.9; color: var(--color-text-default);">
              <li><strong>Total Consumption:</strong> 400 kWh (units consumed by your household)</li>
              <li><strong>Solar Generation (3 kWp):</strong> 360 kWh (units generated on your roof)</li>
              <li><strong>Self-Consumed Solar:</strong> 250 kWh (instant daytime utilization)</li>
              <li><strong>Surplus Exported to JBVNL:</strong> 110 kWh (sent to grid via bidirectional meter)</li>
              <li><strong>Grid Import at Night:</strong> 150 kWh (drawn from grid after sunset)</li>
              <li><strong>Billed Units:</strong> 150 Import - 110 Export = <span style="color: var(--color-status-success); font-weight: 700;">Only 40 kWh Billed!</span> (90% Bill Reduction)</li>
            </ul>
          </div>
        </article>

        <!-- Pillar 4: Anti-Islanding Safety -->
        <article class="card card--neomorph" style="padding: var(--space-2xl); margin-bottom: var(--space-2xl);">
          <div class="badge badge--accent" style="margin-bottom: 1rem;">STAGE 4: GRID SAFETY & PROTOCOLS</div>
          <h2 style="font-size: 1.6rem; color: var(--color-brand-primary); margin-bottom: 1rem;">4. Anti-Islanding Protection & Grid Safety (IEEE 1547 / CEA)</h2>
          <p style="line-height: 1.8; color: var(--color-text-default); margin-bottom: 1rem;">
            In the event of a power outage on the DISCOM line, on-grid inverters shut down within 100 milliseconds. This automatic safety mechanism prevents back-feeding power into dead utility lines, protecting lineworkers and engineers repairing transformers from fatal electrocution.
          </p>
        </article>

      </div>
    </section>

    <!-- Section 3: Solar Systems Comparison Table -->
    <section class="section section--alt">
      <div class="container container--medium">
        <div class="section-header">
          <span class="badge badge--primary">SYSTEM ARCHITECTURES</span>
          <h2>On-Grid vs. Off-Grid vs. Hybrid Solar Systems</h2>
          <p class="lead">Understanding the differences to choose the optimal solar configuration for your property.</p>
        </div>

        <div style="background: var(--color-bg-surface); border: 1px solid var(--color-border-default); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-md);">
          <table>
            <thead>
              <tr style="background: var(--color-bg-surface-sunken); text-align: left;">
                <th style="padding: 1rem; font-weight: 700;">Feature / Attribute</th>
                <th style="padding: 1rem; font-weight: 700; color: var(--color-brand-accent);">On-Grid (Recommended)</th>
                <th style="padding: 1rem; font-weight: 700;">Hybrid Solar</th>
                <th style="padding: 1rem; font-weight: 700;">Off-Grid Solar</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--color-border-subtle);">
                <td style="padding: 1rem; font-weight: 600;">PM Surya Ghar Subsidy</td>
                <td style="padding: 1rem; color: var(--color-status-success); font-weight: 700;">Eligible (Up to ₹78,000)</td>
                <td style="padding: 1rem;">Eligible on PV component</td>
                <td style="padding: 1rem; color: var(--color-status-error);">Not Eligible</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border-subtle);">
                <td style="padding: 1rem; font-weight: 600;">Battery Storage Required</td>
                <td style="padding: 1rem;">No (Virtual Grid Battery)</td>
                <td style="padding: 1rem;">Yes (LiFePO4 Lithium)</td>
                <td style="padding: 1rem;">Yes (Lead-Acid/Lithium)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border-subtle);">
                <td style="padding: 1rem; font-weight: 600;">Capital Investment</td>
                <td style="padding: 1rem; color: var(--color-status-success); font-weight: 700;">Lowest (Fastest Payback ~3 yrs)</td>
                <td style="padding: 1rem;">Moderate (4–5 yrs Payback)</td>
                <td style="padding: 1rem;">Highest (Battery Replacement)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--color-border-subtle);">
                <td style="padding: 1rem; font-weight: 600;">Maintenance Requirement</td>
                <td style="padding: 1rem; color: var(--color-status-success);">Minimal (Periodic Panel Wash)</td>
                <td style="padding: 1rem;">Moderate</td>
                <td style="padding: 1rem;">High (Battery Monitoring)</td>
              </tr>
              <tr>
                <td style="padding: 1rem; font-weight: 600;">Best Suited For</td>
                <td style="padding: 1rem; font-weight: 600;">Homes & Businesses with Grid Power</td>
                <td style="padding: 1rem;">Areas with frequent load-shedding</td>
                <td style="padding: 1rem;">Remote farmhouses & un-electrified sites</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Section 4: Pre-Footer CTA -->
    <section class="section section--compact">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-banner__content">
            <span class="badge badge--accent" style="margin-bottom: 1rem;">ENGINEERED FOR EASTERN INDIA</span>
            <h2 class="cta-banner__title">Calculate Your Exact Rooftop Solar ROI</h2>
            <p class="cta-banner__description">
              Use JDC Solar's interactive calculator to model monthly power bill savings, PM Surya Ghar subsidy deductions, and rooftop space requirements for your home or enterprise.
            </p>
            <div class="cta-banner__actions">
              <a href="/solar-calculator/" class="btn btn--primary btn--lg">Open Solar Calculator →</a>
              <button type="button" class="btn btn--secondary btn--lg" data-modal-open="survey-modal">Book Site Survey</button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

${getFooter()}
`;

const article2Html = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Primary SEO Metadata -->
  <title>Section 32 Accelerated Depreciation: 40% Solar Tax Shield for Businesses | JDC Solar</title>
  <meta name="description" content="Detailed corporate financial guide explaining Section 32 40% accelerated tax depreciation on commercial and industrial solar installations in India.">
  <meta name="keywords" content="Section 32 accelerated depreciation solar, commercial solar tax benefits India, solar corporate tax shield, C&I solar ROI Jharkhand, solar CAPEX vs OPEX depreciation">
  <meta name="author" content="JDC Solar / Jagatdhan Commodities Pvt. Ltd.">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="https://jdcsolar.com/resources/commercial-solar-tax-benefits/">

  <!-- OpenGraph Social Metadata -->
  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="article">
  <meta property="og:title" content="Section 32 Accelerated Depreciation: 40% Solar Tax Shield | JDC Solar">
  <meta property="og:description" content="Corporate financial advisory explaining 40% Accelerated Depreciation tax write-offs for commercial and industrial solar in India.">
  <meta property="og:url" content="https://jdcsolar.com/resources/commercial-solar-tax-benefits/">
  <meta property="og:site_name" content="JDC Solar">
  <meta property="og:image" content="https://jdcsolar.com/assets/images/banners/banner-resources.jpg">

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

  <!-- Schema.org JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://jdcsolar.com/resources/commercial-solar-tax-benefits/#article",
        "headline": "Section 32 Accelerated Depreciation: 40% Year-1 Tax Shield for Businesses",
        "description": "Corporate financial analysis explaining 40% Accelerated Depreciation (Section 32), GST input tax credits, and financial payback models for commercial solar in India.",
        "image": "https://jdcsolar.com/assets/images/banners/banner-resources.jpg",
        "datePublished": "2026-08-01T08:00:00+05:30",
        "dateModified": "2026-08-01T08:00:00+05:30",
        "author": {
          "@type": "Organization",
          "name": "JDC Solar Commercial Advisory Group"
        },
        "publisher": {
          "@type": "Organization",
          "name": "JDC Solar",
          "logo": {
            "@type": "ImageObject",
            "url": "https://jdcsolar.com/assets/images/brand/logo.png"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jdcsolar.com/" },
          { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://jdcsolar.com/resources/" },
          { "@type": "ListItem", "position": 3, "name": "Commercial Tax Benefits", "item": "https://jdcsolar.com/resources/commercial-solar-tax-benefits/" }
        ]
      }
    ]
  }
  </script>
</head>
<body data-page="resource-detail">

  <!-- Accessible Skip Link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

${getHeader('resources')}

  <!-- Main Content Landmark -->
  <main id="main-content" role="main">

    <!-- Section 1: Cinematic Subpage Hero Banner -->
    <section class="page-hero page-hero--resources" aria-label="Financial & Tax Advisory">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumbs">
          <ol class="breadcrumb__list">
            <li class="breadcrumb__item"><a href="/" class="breadcrumb__link">Home</a></li>
            <li class="breadcrumb__separator" aria-hidden="true">/</li>
            <li class="breadcrumb__item"><a href="/resources/" class="breadcrumb__link">Resources</a></li>
            <li class="breadcrumb__separator" aria-hidden="true">/</li>
            <li class="breadcrumb__item" aria-current="page">Commercial Tax Benefits</li>
          </ol>
        </nav>

        <div class="page-hero__badge">
          <div class="badge--saas-pulse">
            <span class="badge-pulse-dot"><span class="badge-pulse-dot__ping"></span><span class="badge-pulse-dot__core"></span></span>
            <span>Financial & Tax Advisory</span>
          </div>
        </div>
        <h1 class="display-title page-hero__title">
          Section 32 Accelerated Depreciation: 40% Year-1 Tax Shield for Businesses
        </h1>
        <p class="lead page-hero__lead">
          While direct PM Surya Ghar DBT subsidies apply to domestic consumers, Indian enterprises, manufacturing plants, and hospitals can claim 40% Accelerated Depreciation (AD) under the Income Tax Act to write off substantial solar capital expenditures.
        </p>
        <div class="page-hero__chips">
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>40% Accelerated Depreciation</span>
          </div>
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Corporate Tax Savings</span>
          </div>
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Accelerated ROI Calculation</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Tax Structure & Corporate ROI -->
    <section class="section">
      <div class="container container--medium">
        
        <!-- Tax Shield Mechanics -->
        <article class="card card--neomorph" style="padding: var(--space-2xl); margin-bottom: var(--space-2xl);">
          <div class="badge badge--primary" style="margin-bottom: 1rem;">INCOME TAX ACT, 1961</div>
          <h2 style="font-size: 1.6rem; color: var(--color-brand-primary); margin-bottom: 1rem;">How Section 32 Accelerated Depreciation Works</h2>
          <p style="line-height: 1.8; color: var(--color-text-default); margin-bottom: 1.25rem;">
            Under Section 32(1)(ii) of the Income Tax Act, commercial enterprises and manufacturing units that invest in renewable energy assets (specifically solar photovoltaic power plants) are entitled to an <strong>Accelerated Depreciation (AD) rate of 40%</strong> on a Written Down Value (WDV) basis in the first financial year of commissioning.
          </p>
          <div class="grid grid--2col gap-md" style="margin-top: 1.5rem;">
            <div style="background: var(--color-bg-surface-sunken); padding: 1.25rem; border-radius: var(--radius-lg); border-left: 4px solid var(--color-brand-accent);">
              <strong style="color: #FFFFFF;">Commissioned Before Oct 1 (Full Rate):</strong>
              <p class="text-small text-muted" style="margin-top: 0.5rem;">If the solar plant is commissioned on or before September 30 of the financial year (>180 days of operation), the full 40% depreciation can be claimed in Year 1.</p>
            </div>
            <div style="background: var(--color-bg-surface-sunken); padding: 1.25rem; border-radius: var(--radius-lg); border-left: 4px solid var(--color-status-success);">
              <strong style="color: #FFFFFF;">Commissioned After Oct 1 (Half Rate):</strong>
              <p class="text-small text-muted" style="margin-top: 0.5rem;">If commissioned after October 1 (<180 days), 20% is claimed in Year 1, with the remaining balance rolling over to Year 2.</p>
            </div>
          </div>
        </article>

        <!-- Financial Case Study Model -->
        <article class="card card--neomorph" style="padding: var(--space-2xl); margin-bottom: var(--space-2xl);">
          <div class="badge badge--accent" style="margin-bottom: 1rem;">FINANCIAL CASE STUDY</div>
          <h2 style="font-size: 1.6rem; color: var(--color-brand-primary); margin-bottom: 1rem;">Financial Model: 100 kWp Plant (₹50 Lakh CAPEX)</h2>
          <p style="line-height: 1.8; color: var(--color-text-default); margin-bottom: 1.25rem;">
            Assumed corporate tax bracket: <strong>25.17%</strong> (inclusive of standard surcharge and health/education cess for Indian domestic companies):
          </p>
          
          <div style="background: var(--color-bg-surface-sunken); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); padding: 1.5rem; margin-top: 1rem;">
            <ul style="list-style: disc; padding-left: 1.5rem; line-height: 2.0; color: var(--color-text-default);">
              <li><strong>Gross Solar Capital Expenditure:</strong> ₹ 50,00,000</li>
              <li><strong>Year 1 Depreciation Claim (40%):</strong> ₹ 20,00,000 (written off taxable profit)</li>
              <li><strong>Direct Corporate Tax Saved in Year 1 (25.17% of ₹20L):</strong> <span style="color: var(--color-status-success); font-weight: 700;">₹ 5,03,400</span></li>
              <li><strong>Year 2 Depreciation Claim (40% of remaining ₹30L WDV):</strong> ₹ 12,00,000</li>
              <li><strong>Direct Corporate Tax Saved in Year 2 (25.17% of ₹12L):</strong> <span style="color: var(--color-status-success); font-weight: 700;">₹ 3,02,040</span></li>
              <li><strong>Cumulative 3-Year Direct Tax Shield:</strong> <span style="color: var(--color-brand-accent); font-weight: 800;">₹ 9,87,000+ (~20% of Project Cost!)</span></li>
              <li><strong>Annual Electricity Bill Savings (100 kWp @ ₹8.50/unit JBVNL):</strong> <span style="color: var(--color-status-success); font-weight: 700;">₹ 12,41,000 / year</span></li>
              <li><strong>Combined Effective Payback Period:</strong> <span style="color: var(--color-status-success); font-weight: 800; font-size: 1.15rem;">Under 2.8 Years!</span></li>
            </ul>
          </div>
        </article>

        <!-- GST Input Tax Credit -->
        <article class="card card--neomorph" style="padding: var(--space-2xl); margin-bottom: var(--space-2xl);">
          <div class="badge badge--primary" style="margin-bottom: 1rem;">GOODS & SERVICES TAX</div>
          <h2 style="font-size: 1.6rem; color: var(--color-brand-primary); margin-bottom: 1rem;">GST Input Tax Credit (ITC) on Solar Power Equipment</h2>
          <p style="line-height: 1.8; color: var(--color-text-default); margin-bottom: 1rem;">
            Commercial and manufacturing GST-registered entities can claim 100% Input Tax Credit (ITC) on the GST paid for solar panels, on-grid inverters, structure materials, and EPC installation services, offsetting output GST liabilities on finished goods.
          </p>
        </article>

      </div>
    </section>

    <!-- Section 3: Pre-Footer CTA -->
    <section class="section section--compact section--alt">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-banner__content">
            <span class="badge badge--accent" style="margin-bottom: 1rem;">COMMERCIAL SOLAR ADVISORY</span>
            <h2 class="cta-banner__title">Schedule a Commercial Solar Feasibility & Tax Audit</h2>
            <p class="cta-banner__description">
              Our EPC engineers and financial analysts will audit your factory or commercial complex in Jharkhand, calculating exact HT net-metering yields, 40% AD schedules, and turnkey cost proposals.
            </p>
            <div class="cta-banner__actions">
              <button type="button" class="btn btn--primary btn--lg" data-modal-open="survey-modal">Schedule Corporate Site Audit →</button>
              <a href="https://wa.me/919288381112" class="btn btn--whatsapp btn--lg" target="_blank" rel="noopener noreferrer">
                <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-whatsapp"></use></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

${getFooter()}
`;

const article3Html = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Primary SEO Metadata -->
  <title>Solar Panel Maintenance & Cleaning Guide: Preventive Care | JDC Solar</title>
  <meta name="description" content="Best practices for solar panel cleaning cycles, water quality standards, thermal hotspot prevention, and inverter health monitoring from JDC Solar engineers.">
  <meta name="keywords" content="solar panel maintenance guide Jharkhand, solar panel cleaning water quality TDS, thermal hotspot inspection solar, solar inverter preventive maintenance, JDC Solar O&M services">
  <meta name="author" content="JDC Solar / Jagatdhan Commodities Pvt. Ltd.">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="https://jdcsolar.com/resources/solar-maintenance-guide/">

  <!-- OpenGraph Social Metadata -->
  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="article">
  <meta property="og:title" content="Solar Panel Maintenance & Cleaning Guide | JDC Solar">
  <meta property="og:description" content="Comprehensive engineering guide for solar panel cleaning, O&M preventive care, and generation maximization in Eastern India.">
  <meta property="og:url" content="https://jdcsolar.com/resources/solar-maintenance-guide/">
  <meta property="og:site_name" content="JDC Solar">
  <meta property="og:image" content="https://jdcsolar.com/assets/images/banners/banner-resources.jpg">

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

  <!-- Schema.org JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://jdcsolar.com/resources/solar-maintenance-guide/#article",
        "headline": "Solar Panel Maintenance & Cleaning: Preventive Care for Maximum Generation",
        "description": "Engineering guide on solar panel cleaning intervals, water quality benchmarks, thermal hotspot prevention, and inverter electrical inspections in Eastern India.",
        "image": "https://jdcsolar.com/assets/images/banners/banner-resources.jpg",
        "datePublished": "2026-08-01T08:00:00+05:30",
        "dateModified": "2026-08-01T08:00:00+05:30",
        "author": {
          "@type": "Organization",
          "name": "JDC Solar Operations & Maintenance Division"
        },
        "publisher": {
          "@type": "Organization",
          "name": "JDC Solar",
          "logo": {
            "@type": "ImageObject",
            "url": "https://jdcsolar.com/assets/images/brand/logo.png"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jdcsolar.com/" },
          { "@type": "ListItem", "position": 2, "name": "Resources", "item": "https://jdcsolar.com/resources/" },
          { "@type": "ListItem", "position": 3, "name": "Solar Maintenance Guide", "item": "https://jdcsolar.com/resources/solar-maintenance-guide/" }
        ]
      }
    ]
  }
  </script>
</head>
<body data-page="resource-detail">

  <!-- Accessible Skip Link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

${getHeader('resources')}

  <!-- Main Content Landmark -->
  <main id="main-content" role="main">

    <!-- Section 1: Cinematic Subpage Hero Banner -->
    <section class="page-hero page-hero--resources" aria-label="O&M Technical Manual">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumbs">
          <ol class="breadcrumb__list">
            <li class="breadcrumb__item"><a href="/" class="breadcrumb__link">Home</a></li>
            <li class="breadcrumb__separator" aria-hidden="true">/</li>
            <li class="breadcrumb__item"><a href="/resources/" class="breadcrumb__link">Resources</a></li>
            <li class="breadcrumb__separator" aria-hidden="true">/</li>
            <li class="breadcrumb__item" aria-current="page">Maintenance Guide</li>
          </ol>
        </nav>

        <div class="page-hero__badge">
          <div class="badge--saas-pulse">
            <span class="badge-pulse-dot"><span class="badge-pulse-dot__ping"></span><span class="badge-pulse-dot__core"></span></span>
            <span>O&M Technical Manual</span>
          </div>
        </div>
        <h1 class="display-title page-hero__title">
          Solar Panel Maintenance & Cleaning: Preventive Care for Maximum Generation
        </h1>
        <p class="lead page-hero__lead">
          Industrial dust, seasonal soot, and hard water scaling can degrade solar plant yields by 15% to 30%. Follow our certified EPC maintenance protocols to ensure your 25-year performance warranty remains fully intact.
        </p>
        <div class="page-hero__chips">
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Cleaning SOPs & Water Quality</span>
          </div>
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Thermal Hotspot Detection</span>
          </div>
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>Quarterly O&M Checklist</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Maintenance Protocols & SOPs -->
    <section class="section">
      <div class="container container--medium">
        
        <!-- Cleaning SOP -->
        <article class="card card--neomorph" style="padding: var(--space-2xl); margin-bottom: var(--space-2xl);">
          <div class="badge badge--primary" style="margin-bottom: 1rem;">CLEANING PROTOCOL</div>
          <h2 style="font-size: 1.6rem; color: var(--color-brand-primary); margin-bottom: 1rem;">1. Solar Module Cleaning Standards & Water Quality</h2>
          <p style="line-height: 1.8; color: var(--color-text-default); margin-bottom: 1.25rem;">
            In industrial corridors like Adityapur, Bistupur, and Dhanbad, fine airborne particulates settle on solar glass. Routine cleaning ensures maximum light transmittance through anti-reflective coatings.
          </p>
          <div class="grid grid--2col gap-md" style="margin-top: 1.5rem;">
            <div style="background: var(--color-bg-surface-sunken); padding: 1.25rem; border-radius: var(--radius-lg); border-left: 4px solid var(--color-brand-accent);">
              <strong style="color: #FFFFFF;">Water Quality Benchmark:</strong>
              <p class="text-small text-muted" style="margin-top: 0.5rem;">Use water with <strong>TDS &lt; 150 ppm</strong> and pH 6.5–7.5. Never use hard borewell water without filtration, as mineral scaling creates permanent calcium carbonate crusting on glass.</p>
            </div>
            <div style="background: var(--color-bg-surface-sunken); padding: 1.25rem; border-radius: var(--radius-lg); border-left: 4px solid var(--color-status-success);">
              <strong style="color: #FFFFFF;">Optimal Cleaning Time:</strong>
              <p class="text-small text-muted" style="margin-top: 0.5rem;">Clean panels only during early morning (06:00–08:30) or late evening. Washing hot panels during peak midday sun causes thermal shock and micro-cracks in tempered glass.</p>
            </div>
          </div>
        </article>

        <!-- Thermal Hotspot Prevention -->
        <article class="card card--neomorph" style="padding: var(--space-2xl); margin-bottom: var(--space-2xl);">
          <div class="badge badge--accent" style="margin-bottom: 1rem;">DIAGNOSTICS & SAFETY</div>
          <h2 style="font-size: 1.6rem; color: var(--color-brand-primary); margin-bottom: 1rem;">2. Thermal Hotspot Inspection & Drone Thermography</h2>
          <p style="line-height: 1.8; color: var(--color-text-default); margin-bottom: 1.25rem;">
            Localised shading from bird droppings, dry leaves, or damaged bypass diodes causes shaded cells to act as electrical resistors rather than generators. These cells overheat, reaching temperatures up to 150°C, risking delamination or localized fires.
          </p>
          <p style="line-height: 1.8; color: var(--color-text-default);">
            JDC Solar deploys calibrated FLIR thermal imaging cameras during annual preventive maintenance audits to detect invisible hotspots and module bypass diode failures before they degrade string output.
          </p>
        </article>

        <!-- Preventive Schedule Table -->
        <article class="card card--neomorph" style="padding: var(--space-2xl); margin-bottom: var(--space-2xl);">
          <div class="badge badge--primary" style="margin-bottom: 1rem;">O&M SCHEDULE</div>
          <h2 style="font-size: 1.6rem; color: var(--color-brand-primary); margin-bottom: 1rem;">3. Recommended Preventive Maintenance Schedule</h2>
          
          <div style="background: var(--color-bg-surface-sunken); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); overflow: hidden; margin-top: 1rem;">
            <table style="width: 100%;">
              <thead>
                <tr style="background: var(--color-bg-surface); text-align: left;">
                  <th style="padding: 1rem; font-weight: 700;">Frequency</th>
                  <th style="padding: 1rem; font-weight: 700;">Maintenance Action Item</th>
                  <th style="padding: 1rem; font-weight: 700;">Target Component</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--color-border-subtle);">
                  <td style="padding: 1rem; font-weight: 600; color: var(--color-brand-accent);">Bi-Weekly (15 Days)</td>
                  <td style="padding: 1rem;">Soft de-mineralized water wash using micro-fiber squeegees</td>
                  <td style="padding: 1rem;">Solar PV Module Surface</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-border-subtle);">
                  <td style="padding: 1rem; font-weight: 600; color: var(--color-brand-accent);">Monthly</td>
                  <td style="padding: 1rem;">Check cloud telemetry app, log daily kWh output vs. theoretical model</td>
                  <td style="padding: 1rem;">Inverter SCADA App / Portal</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-border-subtle);">
                  <td style="padding: 1rem; font-weight: 600; color: var(--color-brand-accent);">Quarterly</td>
                  <td style="padding: 1rem;">Inspect AC/DC disconnect isolators, check SPD surge status indicators</td>
                  <td style="padding: 1rem;">AJB / ACDB / DCDB Junction Boxes</td>
                </tr>
                <tr>
                  <td style="padding: 1rem; font-weight: 600; color: var(--color-brand-accent);">Annually</td>
                  <td style="padding: 1rem;">Measure earthing pit resistance (&lt; 5 Ohms), re-torque module mounting clamps</td>
                  <td style="padding: 1rem;">Galvanized Structure & Earthing Array</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

      </div>
    </section>

    <!-- Section 3: Pre-Footer CTA -->
    <section class="section section--compact section--alt">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-banner__content">
            <span class="badge badge--accent" style="margin-bottom: 1rem;">ANNUAL MAINTENANCE CONTRACTS</span>
            <h2 class="cta-banner__title">Need Professional Solar O&M or Revamping Support?</h2>
            <p class="cta-banner__description">
              JDC Solar offers comprehensive Annual Maintenance Contracts (AMC) across Jamshedpur, Ranchi, Dhanbad, and Bokaro with guaranteed 24-hour breakdown response times.
            </p>
            <div class="cta-banner__actions">
              <button type="button" class="btn btn--primary btn--lg" data-modal-open="survey-modal">Inquire for O&M AMC Support →</button>
              <a href="https://wa.me/919288381112" class="btn btn--whatsapp btn--lg" target="_blank" rel="noopener noreferrer">
                <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-whatsapp"></use></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

${getFooter()}
`;

const path1 = path.join(frontendDir, 'resources', 'how-solar-rooftop-works', 'index.html');
const path2 = path.join(frontendDir, 'resources', 'commercial-solar-tax-benefits', 'index.html');
const path3 = path.join(frontendDir, 'resources', 'solar-maintenance-guide', 'index.html');

fs.writeFileSync(path1, article1Html, 'utf8');
console.log('✅ Generated article 1:', path1);

fs.writeFileSync(path2, article2Html, 'utf8');
console.log('✅ Generated article 2:', path2);

fs.writeFileSync(path3, article3Html, 'utf8');
console.log('✅ Generated article 3:', path3);

console.log('\nAll 3 technical resource articles populated successfully!');
