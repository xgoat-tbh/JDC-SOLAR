# JDC Solar: Complete Passive Security Forensic Audit

**Audit Date:** August 2026  
**Auditor:** Information Security Analyst & Web Auditor  
**Scope:** Passive Non-Destructive Security Inspection of HTTP Headers, Server Exclusions, SSL/TLS, Form Submissions, and Public API Surface  
**Audit Standard:** PASSIVE & NON-DESTRUCTIVE ONLY (Zero Exploits, Scans, or Brute-Force Actions)  
**Evidence Standard:** DIRECTLY OBSERVED via Response Headers and Network Traffic  

---

## 1. HTTP Security Headers Audit

| Security Header | Observed Live Status | Risk Assessment | Forensic Details & Remediation |
| :--- | :---: | :---: | :--- |
| **Strict-Transport-Security (HSTS)** | **MISSING** | High | The server does not enforce HSTS (`max-age=31536000; includeSubDomains; preload`). Browsers may attempt initial connection over insecure HTTP, exposing users to SSL-stripping man-in-the-middle attacks. |
| **Content-Security-Policy (CSP)** | **WEAK / INCOMPLETE** | High | Only contains `upgrade-insecure-requests`. Lacks script-src, style-src, frame-ancestors, and object-src directives, leaving the site vulnerable to cross-site scripting (XSS) and iframe clickjacking. |
| **X-Frame-Options** | **MISSING** | Medium | Missing `DENY` or `SAMEORIGIN` header. Third-party malicious sites can embed `https://jdcsolar.com/` inside hidden `<iframe>` overlays to conduct clickjacking attacks on contact forms. |
| **X-Content-Type-Options** | **MISSING** | Medium | Missing `nosniff`. Browsers may MIME-sniff response payloads, potentially executing user-uploaded media files as script. |
| **Referrer-Policy** | **MISSING** | Low | Missing `strict-origin-when-cross-origin`. Outbound clicks to external websites (e.g. social platforms) may leak the full referring URL path. |
| **Permissions-Policy** | **MISSING** | Low | Missing restriction on browser device APIs (e.g. `camera=(), microphone=(), geolocation=()`). |
| **Cross-Origin-Opener-Policy (COOP)** | **MISSING** | Low | Missing `same-origin`. |
| **Cross-Origin-Embedder-Policy (COEP)** | **MISSING** | Low | Missing `require-corp`. |

---

## 2. Server Information Disclosure

- **PHP Version Exposure:** Response header explicitly advertises `X-Powered-By: PHP/8.3.31`.
  - *Risk:* Automated reconnaissance bots and scanners immediately discover the exact minor PHP runtime version, allowing targeted exploit attempts if zero-day vulnerabilities emerge in PHP 8.3.x.
  - *Remediation:* Set `expose_php = Off` in `php.ini`.
- **WordPress Infrastructure Signature:**
  - Plugin versions and directory paths (`/wp-content/plugins/royal-elementor-addons/assets/css/frontend.min.css?ver=1.7.1065`) are broadcast in raw HTML markup.

---

## 3. Public REST API Surface Exposure

- **Endpoint:** `https://jdcsolar.com/wp-json/wp/v2/`
- **Observed Public Data:**
  - `/wp-json/wp/v2/users` (Exposes internal WordPress author usernames and IDs)
  - `/wp-json/wp/v2/pages` (Exposes unpublished draft/internal pages like `elementor-9` and `detail-service`)
  - `/wp-json/wp/v2/media` (Exposes all 94 uploaded media files, file paths, and metadata)
- *Remediation:* Restrict REST API endpoints requiring public access (e.g. form submission only) and disable user enumeration (`/wp-json/wp/v2/users`).

---

## 4. Form Data Handling & Privacy Review

- **Submission Target:** WordPress AJAX endpoint `https://jdcsolar.com/wp-admin/admin-ajax.php`.
- **Spam Protection:** Lacks CAPTCHA or Cloudflare Turnstile token validation.
- **Privacy Assurance:** Site features an active, detailed Privacy Policy on `/privacy-policy/`, declaring no sale of customer data and limiting third-party sharing to operational project execution.
