# JDC Solar 2.0: Hostinger Deployment & Infrastructure Architecture

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**Hosting Target:** Hostinger Cloud / Web Hosting (Apache/Nginx Native)  
**Edge CDN:** Hostinger CDN (`hcdn`) Mumbai Node with HTTP/3 QUIC  
**Hostinger Plan Status:** HOSTINGER PLAN: PENDING CONFIRMATION (Architected for 100% compatibility across all Hostinger plans)  
**Author:** Lead DevOps & Systems Architect  
**Last Updated:** August 2026  

---

## 1. Hosting Architecture Overview

JDC Solar 2.0 is architected as an **Ultra-High-Performance Static Web Application**. It requires zero server-side runtimes (no Node.js, no PHP execution, no active database daemons).

The production build comprises pre-rendered HTML5 documents, modular CSS3 stylesheets, vanilla ES6 JavaScript modules, WebP/AVIF images, and structured JSON files.

```text
[User Browser (Pan-India / Jharkhand)]
       │
       ▼
[DNS: Cloudflare / Hostinger DNS]
       │
       ▼
[Hostinger Edge CDN (mum-edge6 Mumbai Node - HTTP/3 QUIC)]
       │ (Cached Static Assets: Fonts, Images, CSS, JS)
       ▼
[Hostinger Apache Web Root: public_html/]
       │
       ├──► index.html, pages/*.html
       ├──► css/*.css (Brotli/GZIP Compressed)
       ├──► js/*.js (ES Modules)
       ├──► assets/ (WebP, AVIF, SVG, WOFF2)
       └──► .htaccess (Security Headers, Caching, 301 Redirects, Clean URLs)
```

---

## 2. Hardened Apache Configuration (`.htaccess`)

This `.htaccess` file must be placed in the root of Hostinger's `public_html` directory:

```apache
# ==============================================================================
# JDC SOLAR 2.0 - PRODUCTION HOSTINGER APACHE CONFIGURATION
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. SECURITY HEADERS & HARDENING
# ------------------------------------------------------------------------------
<IfModule mod_headers.c>
    # Enforce HTTP Strict Transport Security (HSTS) - 1 Year Preload
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

    # Prevent MIME-Sniffing Execution
    Header always set X-Content-Type-Options "nosniff"

    # Prevent Clickjacking & Frame Overlays
    Header always set X-Frame-Options "SAMEORIGIN"

    # Referrer Information Protection
    Header always set Referrer-Policy "strict-origin-when-cross-origin"

    # Restrict Unused Browser Device Features
    Header always set Permissions-Policy "geolocation=(), camera=(), microphone=(), payment=()"

    # Modern Content Security Policy (CSP)
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://wa.me; frame-ancestors 'self';"

    # Disable Server Signature
    Header unset X-Powered-By
</IfModule>

# Prevent Directory Browsing
Options -Indexes

# Block Access to Hidden & System Files
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>

# Block Access to Test and Documentation Folders
RedirectMatch 404 ^/(research|tests|docs|scratch)/

# ------------------------------------------------------------------------------
# 2. CANONICAL HTTPS & CLEAN URL REWRITING
# ------------------------------------------------------------------------------
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Force HTTPS & Strip WWW Prefix
    RewriteCond %{HTTPS} off [OR]
    RewriteCond %{HTTP_HOST} ^www\.jdcsolar\.com$ [NC]
    RewriteRule ^(.*)$ https://jdcsolar.com/$1 [L,R=301]

    # Legacy 301 Permanent Redirects
    RewriteRule ^about-us/?$ /about/ [R=301,L]
    RewriteRule ^contact-us/?$ /contact/ [R=301,L]
    RewriteRule ^project/?$ /projects/ [R=301,L]
    RewriteRule ^our-projects/?$ /projects/ [R=301,L]
    RewriteRule ^calculator/?$ /solar-calculator/ [R=301,L]
    RewriteRule ^detail-service/?$ /services/ [R=301,L]
    RewriteRule ^team/?$ /about/ [R=301,L]
    RewriteRule ^elementor-9/?$ / [R=301,L]
    RewriteRule ^residential-solar/?$ /services/residential-solar/ [R=301,L]
    RewriteRule ^commercial-solar/?$ /services/commercial-solar/ [R=301,L]
    RewriteRule ^industrial-solar/?$ /services/commercial-solar/ [R=301,L]

    # Discard Legacy Royal Elementor Template Query Strings
    RewriteCond %{QUERY_STRING} ^wpr_templates= [NC]
    RewriteRule ^(.*)$ /? [R=301,L]

    # Clean URL: Serve .html without showing extension in address bar
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME}\.html -f
    RewriteRule ^(.*)$ $1.html [L]

    # Custom 404 Error Handler
    ErrorDocument 404 /404.html
</IfModule>

# ------------------------------------------------------------------------------
# 3. GZIP & BROTLI COMPRESSION (mod_deflate)
# ------------------------------------------------------------------------------
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/atom_xml
    AddOutputFilterByType DEFLATE image/svg+xml
    AddOutputFilterByType DEFLATE font/woff2
    AddOutputFilterByType DEFLATE font/woff
</IfModule>

# ------------------------------------------------------------------------------
# 4. BROWSER CACHING HEADERS (mod_expires)
# ------------------------------------------------------------------------------
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresDefault "access plus 1 month"

    # HTML Documents - Cache 1 Hour (Ensures fast content updates)
    ExpiresByType text/html "access plus 1 hour"

    # CSS & JavaScript - Cache 1 Month
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"

    # Webfonts (Immutable WOFF2) - Cache 1 Year
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"

    # Images (WebP, AVIF, PNG, JPG, SVG) - Cache 6 Months
    ExpiresByType image/webp "access plus 6 months"
    ExpiresByType image/avif "access plus 6 months"
    ExpiresByType image/jpeg "access plus 6 months"
    ExpiresByType image/png "access plus 6 months"
    ExpiresByType image/svg+xml "access plus 6 months"
    ExpiresByType image/x-icon "access plus 1 year"

    # Structured JSON Data - Cache 1 Day
    ExpiresByType application/json "access plus 1 day"
</IfModule>
```

---

## 3. Deployment Workflow & Build Packaging

```text
[Development / Source: frontend/]
            │
            ▼
[Validation & Build Verification]
  - HTML & CSS Linting
  - Calculator Unit Test Execution (`npm test` or `node tests/calculator.test.js`)
  - Image Asset Optimization Verification
            │
            ▼
[Export to Deployment Artifact: dist/]
  - Flattened Production Directory
  - `.htaccess` included at root
            │
            ▼
[Deployment to Hostinger Server]
  - Method 1: Git Deployment on Hostinger hPanel (Auto-deploy on push to main branch)
  - Method 2: Secure SFTP sync to `public_html/`
```

---

## 4. Rollback & Disaster Recovery Strategy

1. **Version-Controlled Repository:** The entire static web application is maintained in Git. Every deployment corresponds to a specific commit tag (e.g. `v2.0.0`, `v2.0.1`).
2. **Instant Rollback:** If a defect is detected in production, rolling back requires checking out the previous commit tag and pushing to Hostinger in under 60 seconds.
3. **Zero Database Dependencies:** Since no database exists, rollbacks involve zero risk of data corruption, schema migrations, or broken foreign key constraints.
