# JDC Solar 2.0: Production Deployment Architecture

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/DEPLOYMENT-ARCHITECTURE.md`  
**Architecture Type:** Pure Static Fast-Edge Delivery (Zero-Backend)  
**Hosting Target:** Hostinger LiteSpeed Web Server (`public_html/`)  
**Last Updated:** August 2026  

---

## 1. End-to-End Release & Delivery Pipeline

```text
[ Developer Workspace ]
         │
         ▼  (npm test: 121 tests pass + lint:html: 21 files pass)
[ Automated QA Gate ]
         │
         ▼  (node scripts/build.js)
[ Production Dist Package (dist/) ]
         │
         ├────────────────────────────────────────┐
         │                                        │
         ▼ (Git Deploy / SFTP Sync)               ▼ (Direct Zip Upload)
[ Hostinger Git Automation ]            [ Hostinger File Manager ]
         │                                        │
         └──────────────────┬─────────────────────┘
                            │
                            ▼
      [ Hostinger public_html/ (LiteSpeed Edge) ]
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
    [ HTTPS Enforcement ]       [ Security Headers & CSP ]
    (http:// → https://)        (HSTS, nosniff, SAMEORIGIN)
              │                           │
              └─────────────┬─────────────┘
                            │
                            ▼
             [ Production Domain: jdcsolar.com ]
```

---

## 2. Zero-Backend Statement
```text
NO BACKEND REQUIRED.
NO DATABASE REQUIRED.
```
The entire platform executes as standalone static assets on edge servers with sub-millisecond client-side calculations and native telephony/WhatsApp/modal consultation workflows.
