# JDC Solar 2.0: Comprehensive Security Inventory

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/SECURITY-INVENTORY.md`  
**Standard:** Minimal Attack Surface · Static Fast-Edge Hosting  
**Last Updated:** August 2026 (Phase 10 Security Hardening)  

---

## 1. System Component Security Inventory

| Component / Layer | Purpose | Data Handled | Threat / Risk | Protection / Mitigation | Security Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Frontend Static Web Root** | Public customer experience | Public HTML/CSS/JS | File tampering, clickjacking, MIME sniffing | Static files on edge; `X-Frame-Options: SAMEORIGIN`, `nosniff`, CSP | 🟢 **HARDENED** |
| **Client-Side Form Submissions** | Consultation & survey booking | Full name, phone, city, optional message | Automated bot spam, malformed input | Honeypot field (`b_url`), 10-digit Indian phone regex, zero database storage | 🟢 **HARDENED** |
| **Solar Savings Calculator** | System sizing estimation | Monthly units (kWh) or bill amount | Input tampering, out-of-bounds inputs | Pure client-side math engine with boundary checks; zero external API requests | 🟢 **HARDENED** |
| **WhatsApp Direct CTAs** | Instant mobile quote dispatch | Pre-formatted sizing summary string | Unsafe URI scheme injection | Encoded query params via `encodeURIComponent()`; verified `https://wa.me/` domain | 🟢 **HARDENED** |
| **Server Configuration (`.htaccess`)** | Edge security headers & rewrites | None | Directory browsing, hidden file exposure | `Options -Indexes`, block `\.git|\.env|\.bak|\.sql`, HTTPS rewrites | 🟢 **HARDENED** |
| **External Dependencies** | Zero external runtime scripts | None | Supply chain compromise | **Zero third-party runtime npm packages, CDNs, or trackers** | 🟢 **ZERO RISK** |
| **Database & ORM** | Not used | None | SQL injection, credential stuffing | **NO database tables, NO connection strings, NO DB drivers** | 🟢 **NOT APPLICABLE** |
| **Admin Panel / Authentication** | Not used | None | Brute-force, privilege escalation | **NO admin URLs or login dashboards exposed to the public internet** | 🟢 **NOT APPLICABLE** |
| **Cookies & Local Storage** | Not used | None | Cookie theft, session hijacking | **Zero cookies set; zero sensitive data in localStorage** | 🟢 **COMPLIANT** |
