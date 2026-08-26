# JDC Solar 2.0: Content Security Policy (CSP) Specification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/CONTENT-SECURITY-POLICY.md`  
**Header Target:** Apache / Hostinger `.htaccess` HTTP Response Header  
**Standard:** Strict CSP with Minimal External Origins  
**Last Updated:** August 2026  

---

## 1. Content Security Policy Directives

The production HTTP response header is configured as:
```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'self';
```

---

## 2. Directive Rationale & Justification

| Directive | Allowed Sources | Security Rationale |
| :--- | :--- | :--- |
| `default-src` | `'self'` | Disallows loading unauthorized external origins by default. |
| `script-src` | `'self'` | Enforces execution of strictly local, first-party ES6 JavaScript modules. Blocks untrusted third-party injected scripts. |
| `style-src` | `'self' 'unsafe-inline'` | Allows local tokenized stylesheets while supporting inline CSS custom properties for dynamic theming. |
| `img-src` | `'self' data: https:` | Permits first-party images, data URI SVGs, and external secure HTTPS images. |
| `font-src` | `'self'` | Uses native system fonts; restricts unauthorized font downloads. |
| `connect-src` | `'self'` | Restricts fetch and XHR requests strictly to the first-party origin. |
| `frame-ancestors` | `'self'` | Eliminates clickjacking vulnerabilities by preventing untrusted sites from embedding JDC Solar in iframes. |
