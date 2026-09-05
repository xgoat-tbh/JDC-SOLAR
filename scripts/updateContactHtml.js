import fs from 'fs';

const contactPath = 'd:/JDC solar/frontend/contact/index.html';

const fullContactHtml = `<!DOCTYPE html>
<html lang="en" dir="ltr" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Primary SEO Metadata -->
  <title>Contact JDC Solar | Book Free Rooftop Survey & Subsidy Assessment</title>
  <meta name="description" content="Contact JDC Solar engineering headquarters in Adityapur, Jamshedpur. Schedule a free rooftop solar site survey, calculate PM Surya Ghar subsidies, or speak to our technical team.">
  <meta name="author" content="JDC Solar / Jagatdhan Commodities Pvt. Ltd.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://jdcsolar.com/contact/">

  <!-- OpenGraph Social Metadata -->
  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Contact JDC Solar | Book Free Rooftop Survey">
  <meta property="og:description" content="Reach Jharkhand's premier solar EPC engineering team. Book an on-site feasibility inspection and claim up to ₹78,000 central subsidy.">
  <meta property="og:url" content="https://jdcsolar.com/contact/">
  <meta property="og:site_name" content="JDC Solar">
  <meta property="og:image" content="https://jdcsolar.com/assets/images/brand/og-preview.jpg">

  <!-- Theme & Favicon -->
  <meta name="theme-color" content="#0B132B">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/brand/apple-touch-icon.png">

  <!-- Professional SaaS Typography (Plus Jakarta Sans + Inter) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/main.css">

  <!-- JSON-LD Structured Data: LocalBusiness & ContactPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://jdcsolar.com/contact/#webpage",
        "url": "https://jdcsolar.com/contact/",
        "name": "Contact JDC Solar",
        "description": "Contact JDC Solar engineering headquarters in Adityapur, Jamshedpur.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jdcsolar.com/" },
            { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://jdcsolar.com/contact/" }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://jdcsolar.com/#organization",
        "name": "JDC Solar",
        "legalName": "Jagatdhan Commodities Pvt. Ltd.",
        "url": "https://jdcsolar.com",
        "telephone": "+91-92346-11112",
        "email": "sales@jdcsolar.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "A-21, 2nd Phase, Industrial Area, Adityapur",
          "addressLocality": "Jamshedpur",
          "addressRegion": "Jharkhand",
          "postalCode": "832109",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "22.7925",
          "longitude": "86.1764"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:30",
            "closes": "18:30"
          }
        ]
      }
    ]
  }
  </script>
</head>
<body data-page="contact">

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
        <img src="/assets/brand/logo-mark.png" alt="JDC Solar" class="header__logo-img" width="40" height="40">
        <div>
          <div class="header__logo-text">JDC <span>SOLAR</span></div>
          <span class="header__logo-tag">Engineering • EPC • Subsidies</span>
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
          <li class="nav__item"><a href="/contact/" class="nav__link nav__link--active" aria-current="page">Contact</a></li>
        </ul>
      </nav>

      <!-- Header CTAs -->
      <div class="header__actions flex gap-xs" style="align-items: center;">
        <button type="button" class="theme-toggle-btn" aria-label="Switch to light mode" title="Switch to light mode">
          <svg class="icon icon-sun" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-sun"></use></svg>
          <svg class="icon icon-moon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-moon"></use></svg>
        </button>
        <button type="button" class="btn btn--primary hide-on-mobile" data-modal-open="survey-modal">
          Book Site Survey →
        </button>
        <button type="button" class="header__hamburger hide-on-desktop" aria-label="Open Mobile Menu" aria-expanded="false" aria-controls="mobile-drawer" data-drawer-trigger="mobile-drawer">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Off-Canvas Drawer -->
  <aside id="mobile-drawer" class="drawer" aria-label="Mobile Navigation Drawer" aria-hidden="true" inert>
    <div class="drawer__header">
      <div class="flex gap-xs" style="align-items: center;">
        <img src="/assets/brand/logo-mark.png" alt="JDC Solar Logo" style="width: 32px; height: 32px; object-fit: contain;">
        <span style="font-size: 1.3rem; font-weight: 800; color: #FFFFFF;">JDC <span style="color: var(--color-brand-accent);">SOLAR</span></span>
      </div>
      <div class="flex gap-xs" style="align-items: center;">
        <button type="button" class="theme-toggle-btn" aria-label="Switch to light mode" title="Switch to light mode">
          <svg class="icon icon-sun" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-sun"></use></svg>
          <svg class="icon icon-moon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-moon"></use></svg>
        </button>
        <button type="button" class="drawer__close-btn" data-drawer-close aria-label="Close Menu">
          <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-close"></use></svg>
        </button>
      </div>
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
        <li class="drawer__nav-item"><a href="/contact/" class="drawer__nav-link drawer__nav-link--active">Contact Us</a></li>
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
    <section class="page-hero page-hero--contact" aria-label="Contact JDC Solar">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumbs">
          <ol class="breadcrumb__list">
            <li class="breadcrumb__item"><a href="/" class="breadcrumb__link">Home</a></li>
            <li class="breadcrumb__separator" aria-hidden="true">/</li>
            <li class="breadcrumb__item" aria-current="page">Contact Us</li>
          </ol>
        </nav>

        <div class="page-hero__badge">
          <div class="badge--saas-pulse">
            <span class="badge-pulse-dot"><span class="badge-pulse-dot__ping"></span><span class="badge-pulse-dot__core"></span></span>
            <span>Free On-Site Rooftop Survey</span>
          </div>
        </div>
        <h1 class="display-title page-hero__title">
          Let's Engineer Your Solar Power Plant
        </h1>
        <p class="lead page-hero__lead">
          Connect with our solar EPC engineers in Adityapur Industrial Area. Schedule a site inspection, get 3D shadow analysis, and receive a customized financial proposal.
        </p>
        <div class="page-hero__chips">
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-clock"></use></svg>
            <span>2-Hour WhatsApp Response</span>
          </div>
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-shield"></use></svg>
            <span>MNRE Verified Channel Partner</span>
          </div>
          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>100% Free Site Feasibility</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Contact Info & Interactive Consultation Form -->
    <section class="section">
      <div class="container">
        <div class="grid grid--2col grid--gap-xl" style="align-items: start;">
          
          <!-- Left Column: Verified Headquarters & Contact Channels -->
          <div data-reveal="fade-up">
            <div class="section-tag" style="color: var(--color-brand-accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.8rem; margin-bottom: 0.5rem;">DIRECT ENGINEERING DESK</div>
            <h2 style="font-size: 1.85rem; margin-bottom: 1.5rem;">Get in Touch With Our EPC Team</h2>
            <p style="color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 2rem;">
              Whether you are looking to solarize a residential bungalow in Ranchi, an industrial factory in Adityapur, or a hospital in Bokaro, our certified engineers are ready to assist.
            </p>

            <div class="flex flex--column gap-lg">
              
              <!-- Address Card -->
              <div class="card" style="display: flex; gap: var(--space-md); align-items: flex-start;">
                <div style="font-size: 1.5rem; color: var(--color-brand-accent);">
                  <svg class="icon" style="width: 28px; height: 28px;"><use href="/assets/icons/sprite.svg#icon-location"></use></svg>
                </div>
                <div>
                  <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem;">Engineering Headquarters</h3>
                  <p class="text-small text-muted" style="line-height: 1.5; margin-bottom: 0.5rem;">
                    JDC Solar / Jagatdhan Commodities Pvt. Ltd.<br>
                    A-21, 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109
                  </p>
                  <span class="badge badge--outline" style="font-size: 0.75rem;">Mon - Sat: 9:30 AM - 6:30 PM</span>
                </div>
              </div>

              <!-- Phone Card -->
              <div class="card" style="display: flex; gap: var(--space-md); align-items: flex-start;">
                <div style="font-size: 1.5rem; color: var(--color-brand-accent);">
                  <svg class="icon" style="width: 28px; height: 28px;"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg>
                </div>
                <div>
                  <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem;">Phone Hotline</h3>
                  <p class="text-small text-muted" style="margin-bottom: 0.25rem;">Direct Line: <a href="tel:+919234611112" style="color: var(--color-brand-primary); font-weight: 600;">+91 92346 11112</a></p>
                  <p class="text-small text-muted">WhatsApp: <a href="https://wa.me/919288381112" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent-whatsapp); font-weight: 600;">+91 92883 81112</a></p>
                </div>
              </div>

              <!-- Email Card -->
              <div class="card" style="display: flex; gap: var(--space-md); align-items: flex-start;">
                <div style="font-size: 1.5rem; color: var(--color-brand-accent);">
                  <svg class="icon" style="width: 28px; height: 28px;"><use href="/assets/icons/sprite.svg#icon-email"></use></svg>
                </div>
                <div>
                  <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem;">Email Inquiries</h3>
                  <p class="text-small text-muted" style="margin-bottom: 0.25rem;">Sales & Tenders: <a href="mailto:sales@jdcsolar.com" style="color: var(--color-brand-primary); font-weight: 600;">sales@jdcsolar.com</a></p>
                  <p class="text-small text-muted">General & Corporate: <a href="mailto:info@jdcsolar.com" style="color: var(--color-brand-primary); font-weight: 600;">info@jdcsolar.com</a></p>
                </div>
              </div>

            </div>
          </div>

          <!-- Right Column: Accessible Consultation & Site Survey Form -->
          <div class="card" style="padding: var(--space-2xl);" data-reveal="zoom">
            <span class="badge badge--primary" style="margin-bottom: 0.5rem;">FREE ROOFTOP SURVEY</span>
            <h2 style="font-size: 1.4rem; margin-bottom: 0.5rem;">Book an On-Site Rooftop Inspection</h2>
            <p class="text-small text-muted" style="margin-bottom: 1.5rem;">
              Fill out the details below. Our technical team in Adityapur will inspect your roof topography, conduct a 3D shadow analysis, and prepare an exact proposal.
            </p>

            <!-- Accessible Success Banner (hidden by default) -->
            <div class="form-success-banner hidden" style="background: #F0FDF4; border: 1px solid #86EFAC; border-radius: var(--radius-lg); padding: var(--space-xl); text-align: center; margin-bottom: 1.5rem;">
              <svg class="icon" style="width: 48px; height: 48px; color: #15803D; margin-bottom: 0.75rem;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
              <h3 style="color: #15803D; margin-bottom: 0.5rem;">Thank You! Your Request Has Been Received.</h3>
              <p class="text-small" style="color: #166534; line-height: 1.5;">Our engineering team will connect via WhatsApp and call you within 2 business hours.</p>
            </div>

            <!-- Contact Form -->
            <form data-validate="true" action="#" method="POST" novalidate>
              
              <!-- Anti-Spam Honeypot -->
              <input type="text" name="b_url" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true">

              <div class="form-group">
                <label class="form-label" for="contact-name">Full Name <span class="required-mark">*</span></label>
                <input type="text" id="contact-name" name="name" class="form-control" placeholder="e.g. Rajesh Sharma" autocomplete="name" required>
                <span id="contact-name-error" class="form-error-msg hidden">Please enter your full name.</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-phone">Mobile Phone (10 Digits) <span class="required-mark">*</span></label>
                <input type="tel" id="contact-phone" name="phone" class="form-control" placeholder="e.g. 9876543210" autocomplete="tel" required>
                <span id="contact-phone-error" class="form-error-msg hidden">Please enter a valid 10-digit Indian phone number.</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-service">Solar Installation Type <span class="required-mark">*</span></label>
                <select id="contact-service" name="service" class="form-select" required>
                  <option value="Residential Rooftop Solar" selected>Residential Rooftop Solar</option>
                  <option value="Commercial & Industrial Solar">Commercial & Industrial Solar</option>
                  <option value="Institutional Solar (Hospital/School)">Institutional Solar (Hospital/School)</option>
                  <option value="Government & Tender EPC">Government & Tender EPC</option>
                  <option value="Solar Street Lighting">Solar Street Lighting</option>
                  <option value="Utility Solar Parks">Utility Solar Parks</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-city">City / Pincode in Jharkhand <span class="required-mark">*</span></label>
                <input type="text" id="contact-city" name="city" class="form-control" placeholder="e.g. Jamshedpur, 831001" autocomplete="address-level2" required>
                <span id="contact-city-error" class="form-error-msg hidden">Please enter your city or pincode.</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-message">Project Details / Roof Area <span class="text-muted">(Optional)</span></label>
                <textarea id="contact-message" name="message" class="form-control" rows="3" placeholder="e.g. Looking for a 5 kW rooftop system for my home in Morabadi, Ranchi." maxlength="500"></textarea>
              </div>

              <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 1.25rem;">
                By submitting this form, you agree to our <a href="/privacy-policy/" style="color: var(--color-brand-primary); text-decoration: underline;">Privacy Policy</a>. We never share your contact details.
              </div>

              <button type="submit" class="btn btn--primary btn--block btn--lg">
                Book Free Consultation & Site Survey →
              </button>
            </form>

          </div>

        </div>
      </div>
    </section>

    <!-- Section 3: Regional Coverage Area -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag" style="color: var(--color-brand-accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.8rem; margin-bottom: 0.5rem;">SERVICE TERRITORY</div>
          <h2>Active Service Coverage Across Eastern India</h2>
          <p class="lead">Deploying certified solar installation teams across major Jharkhand industrial and residential hubs.</p>
        </div>

        <div class="grid grid--3col">
          <div class="card">
            <h3 style="color: var(--color-brand-accent); margin-bottom: 0.25rem;">Jamshedpur & Adityapur</h3>
            <p class="text-small text-muted">Headquarters hub serving Bistupur, Sakchi, Kadma, Mango, Telco, and Adityapur Industrial Area.</p>
          </div>
          <div class="card">
            <h3 style="color: var(--color-brand-accent); margin-bottom: 0.25rem;">Ranchi & Surrounds</h3>
            <p class="text-small text-muted">Dedicated engineering teams serving Morabadi, Doranda, Kanke, Bariatu, and Hatia industrial zones.</p>
          </div>
          <div class="card">
            <h3 style="color: var(--color-brand-accent); margin-bottom: 0.25rem;">Bokaro & Dhanbad</h3>
            <p class="text-small text-muted">Commercial cold storages, educational campuses, and industrial plants across Bokaro Steel City and Dhanbad.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: FAQ -->
    <section class="section">
      <div class="container container--medium">
        <div class="section-header">
          <div class="section-tag" style="color: var(--color-brand-accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.8rem; margin-bottom: 0.5rem;">FREQUENTLY ASKED QUESTIONS</div>
          <h2>Contact & Site Inspection Queries</h2>
        </div>

        <div class="accordion" data-accordion>
          <div class="accordion__item">
            <button class="accordion__trigger" aria-expanded="false">
              <span>Is the rooftop site inspection truly free of cost?</span>
              <svg class="icon accordion__icon"><use href="/assets/icons/sprite.svg#icon-chevron-down"></use></svg>
            </button>
            <div class="accordion__panel" hidden>
              <p>Yes. Our preliminary site survey, 3D shadow simulation, and subsidy ROI proposal are 100% complimentary across Jamshedpur, Ranchi, Bokaro, Dhanbad, and surrounding districts in Jharkhand.</p>
            </div>
          </div>
          <div class="accordion__item">
            <button class="accordion__trigger" aria-expanded="false">
              <span>How quickly can JDC Solar visit my location?</span>
              <svg class="icon accordion__icon"><use href="/assets/icons/sprite.svg#icon-chevron-down"></use></svg>
            </button>
            <div class="accordion__panel" hidden>
              <p>Our engineering team typically schedules site inspections within 24 to 48 hours of form submission or direct WhatsApp contact.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- Global Footer -->
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 0.75rem;">
            <img src="/assets/brand/logo-mark.png" alt="JDC Solar Logo" style="width: 40px; height: 40px; object-fit: contain;">
            <div style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF; line-height: 1;">JDC <span style="color: var(--color-brand-accent);">SOLAR</span></div>
          </div>
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

fs.writeFileSync(contactPath, fullContactHtml, 'utf8');
console.log('✅ Synchronized contact/index.html with full header, hero, theme switcher, and form.');
