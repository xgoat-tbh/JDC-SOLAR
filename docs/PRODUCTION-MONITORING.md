# JDC Solar 2.0: Production Monitoring & Health Check Specification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/PRODUCTION-MONITORING.md`  
**Monitoring Framework:** Lightweight Synthetic Edge Probing & Status Alerting  
**Last Updated:** August 2026  

---

## 1. Production Health & Uptime Monitoring Checks

| Monitoring Target | Check Frequency | Probe Method & Endpoint | Failure Condition & Alert Threshold | Alert Channel |
| :--- | :---: | :--- | :--- | :--- |
| **Root Website Uptime** | Every 1 Minute | HTTP GET `https://jdcsolar.com/` | HTTP status $\ne 200$ or latency $> 2.5\text{s}$ for 2 consecutive checks | Instant Email & SMS alert to DevOps Lead |
| **SSL Certificate Health** | Daily | TLS Handshake probe on port 443 | Certificate validity $< 15\text{ days}$ remaining without auto-renewal | Email notification to Engineering Admin |
| **Core Interactive Routes** | Every 5 Minutes | HTTP GET `/solar-calculator/`, `/contact/`, `/pm-surya-ghar/` | HTTP status $\ne 200$ | Email notification to Web Team |
| **Sitemap & Robots Accessibility**| Daily | HTTP GET `/sitemap.xml` & `/robots.txt` | HTTP status $\ne 200$ or missing canonical tags | Email notification to SEO Lead |
| **404 Error Tracking** | Continuous | Hostinger LiteSpeed Access & Error Logs | Spike in 404/500 errors ($> 50\text{ errors/hr}$) | Weekly server log review |
