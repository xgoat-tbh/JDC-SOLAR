# JDC Solar 2.0: Production Rollback & Disaster Recovery Plan

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/ROLLBACK-PLAN.md`  
**Rollback Target Time (RTO):** < 5 Minutes  
**Data Loss Target (RPO):** 0 Data Loss (Zero dynamic databases)  
**Last Updated:** August 2026  

---

## 1. Pre-Deployment Snapshot Protocol

Prior to deploying JDC Solar 2.0 to `public_html/`:
1. Log into Hostinger hPanel -> **Files** -> **File Manager** (or connect via SFTP).
2. Select all files in `public_html/` and create an archive named `backup-legacy-jdcsolar-[YYYY-MM-DD].zip`.
3. Download a local copy of `backup-legacy-jdcsolar-[YYYY-MM-DD].zip` to secure external storage.
4. Move the archive outside `public_html/` into `/home/uXXXXXXX/backups/`.

---

## 2. Rollback Triggers (P0 Severity Conditions)
Rollback will be immediately initiated if any of the following occur post-deployment:
- 500 Internal Server Error or fatal server crash on root domain.
- HTTPS SSL handshake failure that cannot be resolved in < 10 minutes.
- Disruption to corporate business email MX records.
- Critical broken styling or missing assets rendering the website unusable.

---

## 3. 5-Minute Rollback Standard Operating Procedure (SOP)
1. **Purge Public Web Root:** Delete the contents of `public_html/` via File Manager or SFTP (`rm -rf public_html/*`).
2. **Extract Pre-Deployment Backup:** Unzip `/home/uXXXXXXX/backups/backup-legacy-jdcsolar-[YYYY-MM-DD].zip` directly into `public_html/`.
3. **Purge Edge Cache:** Flush Hostinger LiteSpeed cache via hPanel -> **Advanced** -> **Flush Cache**.
4. **Verify Restoration:** Verify homepage (`https://jdcsolar.com/`) loads properly within 60 seconds.
