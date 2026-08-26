# JDC Solar 2.0: Technical SEO Verification Checklist

**Document:** `tests/seo/seo-checklist.md`  
**Purpose:** Technical SEO validation checklist.

- [ ] **Single H1 Rule:** Exactly one `<h1>` tag present per page, containing target primary keywords.
- [ ] **Metadata Uniqueness:** Custom `<title>` (50-60 chars) and unique `<meta name="description">` (140-155 chars) on all pages.
- [ ] **Canonical Self-Reference:** Absolute `<link rel="canonical" href="https://jdcsolar.com/...">` present on every page.
- [ ] **OpenGraph / Twitter Tags:** `og:title`, `og:description`, `og:image` (1200x630px), `og:url`, and `twitter:card` tags present.
- [ ] **Schema.org JSON-LD:** Validated on Google Rich Results Test for `LocalBusiness`, `SolarEnergyCompany`, and `FAQPage` schemas with zero errors.
- [ ] **Robots.txt:** Valid syntax, disallowing internal/test directories and referencing HTTPS sitemap.
- [ ] **XML Sitemap:** Clean `sitemap.xml` listing all canonical URLs with `<priority>` and `<lastmod>` tags.
- [ ] **301 Redirects:** All 13 legacy URL aliases (e.g. `/about-us/`, `/calculator/`, `/project/`) successfully redirect to canonical targets.
