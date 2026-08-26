# JDC Solar: Complete Forensic Sitemap & URL Inventory

**Audit Date:** August 2026  
**Auditor:** Lead Web Auditor & Technical Reverse Engineer  
**Target Domain:** `https://jdcsolar.com/`  
**Evidence Standard:** DIRECTLY OBSERVED / VERIFIED via Live Crawler & WordPress REST API  

---

## 1. Actual Website Hierarchy

```text
https://jdcsolar.com/ (Home)
├── /about/ (About Us)
├── /services/ (Services Overview)
│   └── /detail-service/ (Detail Service Template - Unconverted)
├── /project/ (Projects / Case Studies Listing)
├── /team/ (Team Page - Template Data)
├── /solar-calculator/ (Interactive Solar Calculator Tool)
├── /contact/ (Contact Us & Lead Form)
├── /privacy-policy/ (Legal & Data Policy)
├── /elementor-9/ (Orphan Draft Elementor Page)
└── System / Royal Elementor Addons Templates (Indexed in XML Sitemap)
    ├── /?wpr_templates=user-header-solar-energy-v1-header
    ├── /?wpr_templates=user-footer-solar-energy-v1-footer
    ├── /?wpr_templates=user-single-solar-energy-v1-404
    ├── /?wpr_templates=user-single-solar-energy-v1-page
    ├── /?wpr_templates=user-single-solar-energy-v1-post
    ├── /?wpr_templates=user-archive-solar-energy-v1-blog
    ├── /?wpr_templates=user-archive-solar-energy-v1-category-tag
    └── /?wpr_templates=user-archive-solar-energy-v1-search
```

---

## 2. Complete Discovered URL Inventory Table

| URL | Page Name | Page Type | HTTP Status | Navigation Location | Discovery Method | Importance | Rebuild Requirement |
| :--- | :--- | :--- | :---: | :--- | :--- | :---: | :--- |
| `https://jdcsolar.com/` | Home | Homepage | 200 OK | Main Nav / Logo / Footer | Direct / Root | **Critical** | Complete Redesign & Rebuild |
| `https://jdcsolar.com/about/` | About Us | Company / Profile | 200 OK | Main Nav / Footer | Main Menu / WP API | **High** | Rebuild with Verified Stats |
| `https://jdcsolar.com/services/` | Services | Service Listing | 200 OK | Main Nav / Footer | Main Menu / WP API | **High** | Rebuild with Dedicated Sub-pages |
| `https://jdcsolar.com/detail-service/` | Detail Service | Service Template | 200 OK | Unlinked (Orphan) | Sitemaps / WP API | **Low** (Template) | Replace with Real Service Pages |
| `https://jdcsolar.com/project/` | Projects | Project Gallery | 200 OK | Main Nav / Footer | Main Menu / WP API | **High** | Rebuild with Real Case Studies |
| `https://jdcsolar.com/team/` | Team | Team / Leadership | 200 OK | Unlinked (Orphan) | Sitemaps / WP API | **Medium** | Rebuild or Merge into About |
| `https://jdcsolar.com/solar-calculator/` | Solar Calculator | Interactive Tool | 200 OK | Main Nav / Footer | Main Menu / WP API | **Critical** | Rebuild with Exact Tariff/Subsidy Engine |
| `https://jdcsolar.com/contact/` | Contact Us | Contact / Lead Gen | 200 OK | Main Nav / Footer | Main Menu / WP API | **Critical** | Rebuild with CRM/WhatsApp Integration |
| `https://jdcsolar.com/privacy-policy/` | Privacy Policy | Legal | 200 OK | Footer Link | Footer / WP API | **High** | Rebuild / Retain Legal Text |
| `https://jdcsolar.com/elementor-9/` | Elementor #9 | Draft Page | 200 OK | Unlinked (Orphan) | Sitemaps / WP API | **None** (Junk) | Delete / Exclude in Rebuild |
| `https://jdcsolar.com/?wpr_templates=user-header-solar-energy-v1-header` | Header Template | Template Component | 200 OK | System Component | XML Sitemap | **None** (System) | Replace with Clean Header Component |
| `https://jdcsolar.com/?wpr_templates=user-footer-solar-energy-v1-footer` | Footer Template | Template Component | 200 OK | System Component | XML Sitemap | **None** (System) | Replace with Clean Footer Component |
| `https://jdcsolar.com/?wpr_templates=user-single-solar-energy-v1-404` | 404 Template | Template Component | 200 OK | System Component | XML Sitemap | **Low** (System) | Custom 404 Error Page |
| `https://jdcsolar.com/?wpr_templates=user-single-solar-energy-v1-page` | Single Page Template | Template Component | 200 OK | System Component | XML Sitemap | **None** (System) | Exclude |
| `https://jdcsolar.com/?wpr_templates=user-single-solar-energy-v1-post` | Single Post Template | Template Component | 200 OK | System Component | XML Sitemap | **None** (System) | Exclude (No Blog Posts Exist) |
| `https://jdcsolar.com/?wpr_templates=user-archive-solar-energy-v1-blog` | Blog Archive Template | Template Component | 200 OK | System Component | XML Sitemap | **None** (System) | Exclude (No Blog Posts Exist) |
| `https://jdcsolar.com/?wpr_templates=user-archive-solar-energy-v1-category-tag` | Category/Tag Archive | Template Component | 200 OK | System Component | XML Sitemap | **None** (System) | Exclude |
| `https://jdcsolar.com/?wpr_templates=user-archive-solar-energy-v1-search` | Search Template | Template Component | 200 OK | System Component | XML Sitemap | **None** (System) | Exclude |

---

## 3. Discovered 404 & Dead-End Links Crawled

During deep crawling and URL discovery, the following common URLs and potential sub-service paths returned HTTP 404 Not Found:

| Attempted URL | Intended Content | HTTP Status | Status Notes |
| :--- | :--- | :---: | :--- |
| `https://jdcsolar.com/about-us/` | About Us Alias | 404 | Missing redirect to `/about/` |
| `https://jdcsolar.com/contact-us/` | Contact Us Alias | 404 | Missing redirect to `/contact/` |
| `https://jdcsolar.com/projects/` | Projects Plural Alias | 404 | Missing redirect to `/project/` |
| `https://jdcsolar.com/our-projects/` | Projects Alternate Alias | 404 | 404 Dead End |
| `https://jdcsolar.com/calculator/` | Calculator Short URL | 404 | Missing redirect to `/solar-calculator/` |
| `https://jdcsolar.com/faq/` / `/faqs/` | FAQ Standalone Page | 404 | FAQs only embedded on Homepage |
| `https://jdcsolar.com/terms-and-conditions/` | Terms of Service | 404 | No Terms page published |
| `https://jdcsolar.com/pm-surya-ghar/` | PM Surya Ghar Landing | 404 | Mentioned on Home but no dedicated page |
| `https://jdcsolar.com/residential-solar/` | Residential Landing | 404 | Mentioned in Footer but no dedicated page |
| `https://jdcsolar.com/commercial-solar/` | Commercial Landing | 404 | Mentioned in Footer but no dedicated page |
| `https://jdcsolar.com/industrial-solar/` | Industrial Landing | 404 | Mentioned in Footer but no dedicated page |
| `https://jdcsolar.com/solar-water-pump/` | Solar Water Pump | 404 | Not created |
| `https://jdcsolar.com/gallery/` | Gallery Page | 404 | Not created |

---

## 4. Sitemaps & robots.txt Configuration

- **`robots.txt`**:
  ```text
  User-agent: *
  Disallow: /wp-content/uploads/wpo/wpo-plugins-tables-list.json

  # START YOAST BLOCK
  # ---------------------------
  User-agent: *
  Disallow:

  Sitemap: http://jdcsolar.com/sitemap_index.xml
  # ---------------------------
  # END YOAST BLOCK
  ```
  *Flaw Identified:* The sitemap directive points to `http://` instead of secure `https://`.

- **Sitemap Index (`https://jdcsolar.com/sitemap_index.xml`)**:
  - `page-sitemap.xml` (Contains 8 core pages)
  - `wpr_templates-sitemap.xml` (Contains 8 Royal Elementor Addons internal theme builder templates that should NEVER be exposed to search engines)
  - `post-sitemap.xml` (Contains 0 posts - empty)
