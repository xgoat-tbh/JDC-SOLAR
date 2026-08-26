# JDC Solar 2.0: Contact & Enquiry Experience Requirements

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/CONTACT-REQUIREMENTS.md`  
**Hosting Architecture:** Hostinger Static Fast-Edge Zero-Backend / Optional Webhook  
**Standard:** Minimal Data Collection · WCAG 2.1 AA Compliant · Zero Database Bloat  
**Last Updated:** August 2026  

---

## 1. Contact Requirements & Architecture Matrix

| Requirement | Current Baseline Behavior | Desired Phase 6F Behavior | Data Collected | Storage Required | Delivery Method | Security Requirements | Status |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :---: |
| **Direct Phone Calling** | `tel:+919234611112` in header/footer | Primary prominent phone CTA for immediate engineering support | None | **NO** | Native telephony URI handler | None | ✅ **VERIFIED** |
| **Direct WhatsApp Support** | `https://wa.me/919288381112` | Pre-filled engineering inquiry and quote sharing | None | **NO** | Native WhatsApp protocol | Official business number | ✅ **VERIFIED** |
| **Direct Email Inquiries** | `mailto:sales@jdcsolar.com` | Standard sales and corporate EPC consultation link | None | **NO** | Native mail client URI | Anti-harvesting formatting | ✅ **VERIFIED** |
| **Consultation & Survey Form** | Unstyled/unvalidated legacy form | Accessible HTML5 form with 10-digit Indian phone regex & honeypot | Name, Mobile, Email, Service, City, Message | **NO** (Zero database) | Client-side validation + Direct Toast / Webhook | Honeypot field, input sanitization, rate-limiting prevention | ✅ **VERIFIED** |
| **Physical Headquarters** | Adityapur Industrial Area | Verified NAP address + direct Google Maps navigation link | None | **NO** | Static link | Valid coordinates | ✅ **VERIFIED** |

---

## 2. Zero-Database & Zero-Admin Decision

In strict accordance with the master architecture decision:
- **No Database:** JDC Solar 2.0 does not store personal customer credentials, phone numbers, or messages in a MySQL/PostgreSQL/MongoDB database.
- **No Admin Dashboard:** No admin login panels or CRM interfaces are exposed to the public internet, eliminating database vulnerabilities, credential stuffing, and SQL injection risks.
- **Direct Lead Routing:** Form submissions trigger immediate client-side feedback and can forward to JDC's sales email (`sales@jdcsolar.com`) via serverless webhook or direct WhatsApp chat.
