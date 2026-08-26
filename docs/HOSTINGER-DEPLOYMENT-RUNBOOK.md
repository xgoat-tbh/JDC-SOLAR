# JDC Solar 2.0: Hostinger Production Deployment Runbook

**Document Status:** RATIFIED / OPERATIONAL RUNBOOK  
**File Path:** `docs/HOSTINGER-DEPLOYMENT-RUNBOOK.md`  
**Execution Target:** Production Hostinger `public_html/`  
**Standard:** 12-Step Reproducible Zero-Downtime Deployment SOP  
**Last Updated:** August 2026  

---

## 1. Step-by-Step Production Deployment Procedure

### Step 1: Execute Complete Local Automated Verification
On the developer workstation, ensure all 121 automated tests and 21 HTML validations pass:
```bash
npm test
npm run lint:html
```

### Step 2: Generate Production Build Package
Generate the clean production distribution in `dist/`:
```bash
npm run build
```

### Step 3: Log into Hostinger Control Panel (hPanel)
Navigate to [https://hpanel.hostinger.com](https://hpanel.hostinger.com) and select the **`jdcsolar.com`** hosting account.

### Step 4: Create Pre-Deployment Backup Archive
1. Open **Files** -> **File Manager**.
2. Select all files currently in `public_html/`.
3. Create a ZIP archive named `backup-legacy-jdcsolar-[DATE].zip`.
4. Download a copy to your secure workstation storage, then move the server archive into `/home/uXXXXXXX/backups/`.

### Step 5: Upload & Extract Production Artifact
**Option A: via Hostinger File Manager (Recommended)**
1. In `public_html/`, delete the old files (except any verified sub-directories not related to the main site).
2. Zip the contents of local `dist/` directory into `jdc-solar-2.0-dist.zip`.
3. Upload `jdc-solar-2.0-dist.zip` into `public_html/`.
4. Right-click and select **Extract** to `public_html/`.
5. Delete the temporary `jdc-solar-2.0-dist.zip` archive.

**Option B: via Hostinger Git Deployment**
1. In hPanel -> **Advanced** -> **Git**.
2. Set repository URL and branch `master`.
3. Set deployment directory to `/public_html`.
4. Click **Deploy**.

### Step 6: Verify File Permissions
Ensure file permissions are set securely:
- Directories: `755` (`rwxr-xr-x`)
- Files: `644` (`rw-r--r--`)

### Step 7: Verify HTTPS & SSL Status
In hPanel -> **Security** -> **SSL**, confirm the Let's Encrypt SSL certificate is **Active** and **Force HTTPS** is enabled.

### Step 8: Flush Edge Cache
In hPanel -> **Performance** -> **LiteSpeed**, click **Purge All Cache**.

### Step 9: Post-Deployment Smoke Test
Open an incognito browser window and verify:
1. `https://jdcsolar.com/` loads instantly with full styling.
2. `https://jdcsolar.com/services/residential-solar/` loads with DCR & subsidy details.
3. `https://jdcsolar.com/solar-calculator/` computes accurate sizing and payback.
4. `https://jdcsolar.com/projects/` category filters update in real time.
5. `https://jdcsolar.com/contact/` form validation works cleanly.
6. `https://jdcsolar.com/nonexistent-test-url/` returns branded 404 page.

### Step 10: Canonical & Redirect Verification
1. Test `http://jdcsolar.com/` -> Redirects (301) to `https://jdcsolar.com/`.
2. Test `https://www.jdcsolar.com/` -> Redirects (301) to `https://jdcsolar.com/`.
3. Test legacy `/project/` -> Redirects (301) to `/projects/`.

### Step 11: Google Search Console Verification
1. Open Google Search Console.
2. Verify `https://jdcsolar.com/sitemap.xml` is submitted and processed with 0 errors.

### Step 12: Deployment Sign-off
Record completion timestamp and git commit hash in release logs.
