# JDC Solar 2.0: 301 Permanent Redirect Mapping Specification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/SEO-REDIRECT-MAP.md`  
**Server Target:** Apache / Hostinger `.htaccess` Edge Rewrites  
**Standard:** 301 Permanent Redirects (Preserving SEO Link Equity)  
**Last Updated:** August 2026  

---

## 1. Legacy URL to JDC Solar 2.0 Redirect Table

| Legacy WordPress URL | New Clean Destination URL | Status Code | Architectural Rationale |
| :--- | :--- | :---: | :--- |
| `https://jdcsolar.com/project/` | `https://jdcsolar.com/projects/` | **301** | Standardized plural `/projects/` URL structure. |
| `https://jdcsolar.com/detail-service/` | `https://jdcsolar.com/services/` | **301** | Removed legacy WordPress template placeholder page. |
| `https://jdcsolar.com/elementor-9/` | `https://jdcsolar.com/` | **301** | Removed indexed Elementor draft junk page. |
| `https://jdcsolar.com/team/` | `https://jdcsolar.com/about/` | **301** | Consolidated template team placeholders into authoritative About page. |
| `https://jdcsolar.com/wp-content/uploads/*` | `https://jdcsolar.com/assets/*` | **301** | Migrated legacy WordPress upload directories to clean `/assets/` directory. |
| `http://jdcsolar.com/*` | `https://jdcsolar.com/*` | **301** | Universal HTTP to HTTPS edge encryption enforcement. |
| `https://www.jdcsolar.com/*` | `https://jdcsolar.com/*` | **301** | Universal non-www canonical domain standardization. |
| `https://jdcsolar.com/index.html` | `https://jdcsolar.com/` | **301** | Root index normalization. |
