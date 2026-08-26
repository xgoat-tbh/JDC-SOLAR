# JDC Solar 2.0: Application Security Threat Model

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/SECURITY-THREAT-MODEL.md`  
**Threat Framework:** STRIDE & OWASP Top 10 Static Edge Risk Evaluation  
**Last Updated:** August 2026  

---

## 1. Threat Modeling & Mitigation Matrix

| Threat Category | Potential Attack Vector | Realistic Impact Level | Implemented Mitigation | Verification Mechanism |
| :--- | :--- | :---: | :--- | :--- |
| **Automated Form Spam** | Headless bots scraping and submitting spam via forms | Medium | Hidden honeypot field (`input[name="b_url"]`), 10-digit Indian phone regex validation, and client-side rate throttling. | Tested via `tests/security/security.test.js` |
| **Cross-Site Scripting (XSS)** | Injection of malicious scripts via DOM manipulation or URL parameters | High | Zero usage of `eval()`, `document.write()`, or `new Function()`; all dynamic rendering uses sanitized text nodes (`textContent`); CSP enforced. | Tested via static AST scanner |
| **Cross-Site Request Forgery (CSRF)** | Exploitation of authenticated sessions | Low / N/A | **Zero session cookies, zero authentication tokens, and zero persistent user sessions.** | Confirmed zero cookie usage |
| **SQL Injection (SQLi)** | Concatenation of malicious SQL queries | Critical | **Zero database, zero SQL drivers, and zero database queries.** Completely eliminated by architecture. | Package audit confirmed |
| **Clickjacking** | Embedding JDC Solar pages inside malicious iframes | Medium | `X-Frame-Options: SAMEORIGIN` and CSP `frame-ancestors 'self'` headers in `.htaccess`. | Tested via `.htaccess` assertions |
| **MIME-Type Sniffing** | Browser executing non-script files as scripts | Medium | `X-Content-Type-Options: nosniff` header active across all static responses. | Verified in `.htaccess` |
| **Secret / Key Exposure** | Hardcoded API tokens, SMTP passwords, or SSH keys in public frontend | Critical | Automated regex scan for secrets in `frontend/`, `docs/`, and `tests/`; zero runtime secrets required. | Scanned 100% of files |
| **Directory Traversal / File Exposure** | Scanners probing for `.git`, `.env`, or backup files | High | Apache `.htaccess` directives (`Options -Indexes` and `<FilesMatch>` block) explicitly deny all requests to hidden/sensitive files. | Verified in `.htaccess` |
| **Insecure Transport** | Downgrade attacks or unencrypted HTTP traffic | High | HTTPS enforcement rewrite rules in `.htaccess` + HSTS header (`max-age=31536000`). | Verified in `.htaccess` |
| **Open Redirects** | Manipulation of URL parameters to redirect users to phishing sites | Medium | Pure relative routing; zero dynamic redirect query parameters processed in frontend JavaScript. | Codebase inspection |
