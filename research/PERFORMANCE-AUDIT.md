# JDC Solar: Complete Performance & Core Web Vitals Forensic Audit

**Audit Date:** August 2026  
**Auditor:** Web Performance Engineer & Systems Analyst  
**Scope:** Asset Payloads, Render-Blocking Resources, CSS/JS Execution, Image Formats, Caching, and Core Web Vitals  
**Evidence Standard:** DIRECTLY EXTRACTED & CODE-PROFILED  

---

## 1. Executive Performance Summary

The existing JDC Solar website suffers from severe asset bloat caused by the WordPress + Elementor + multi-addon plugin architecture. A typical page load downloads over **59 separate CSS stylesheets (1.36 MB)**, multiple monolithic JavaScript libraries, uncompressed 2560px PNG graphics, and all weights of 4 separate Google Fonts.

---

## 2. Granular Asset & Payload Analysis

### 2.1 HTML Document Size
- **Homepage (`home.html`):** `254.63 KB` (`260,742 bytes`) of unminified DOM markup.
- **Root Cause:** Elementor's nested `<div>` wrappers and inline CSS definitions (`elementor-frontend-inline-css`, `wp-emoji-styles`, global custom styles) inject tens of kilobytes of redundant CSS directly into the HTML document stream.

### 2.2 Cascading Style Sheets (CSS) Payload
- **Total CSS Files Loaded:** **59 stylesheets**
- **Total CSS Payload Size:** **1,365.62 KB (1.36 MB)**
- **Top 10 Largest CSS Files:**
  1. `frontend.min.css` (Royal Elementor Addons): `437.28 KB`
  2. `post-1564.css` (Elementor Global Styles): `144.69 KB`
  3. `style.min.css` (Happy Addons Font Style): `116.58 KB`
  4. `all.min.css` (FontAwesome 5 Icons): `57.96 KB`
  5. `post-1565.css` (About Page Styles): `56.91 KB`
  6. `post-1566.css` (Services Page Styles): `54.92 KB`
  7. `custom-frontend.min.css` (Elementor Pro): `53.56 KB`
  8. `post-1567.css` (Detail Service Styles): `51.45 KB`
  9. `button-animations.min.css`: `40.00 KB`
  10. `post-40.css` (Contact Page Styles): `32.80 KB`
- **Render-Blocking Impact:** 59 HTTP requests block initial page rendering, severely hurting First Contentful Paint (FCP).

### 2.3 JavaScript Payload & Execution
- **Core Scripts Loaded:**
  - `jquery.min.js` + `jquery-migrate.min.js` (Legacy WordPress core)
  - `webpack.runtime.min.js` (Elementor)
  - `frontend.min.js` (Elementor frontend engine)
  - `frontend-modules.min.js` (Elementor core modules)
  - `wpr-addons.js` (Royal Elementor Addons)
  - `happy-elementor-addons.js` (Happy Addons)
  - `swiper.min.js` (Carousel library)
  - `lightgallery.min.js` (Lightbox)
  - `aos.js` (Animate on scroll)
  - `wp-emoji-release.min.js` (WordPress emoji script)
- **Total JavaScript Payload:** ~850 KB uncompressed.
- **Execution Bottlenecks:** Long-running main thread script evaluation parsing multiple overlapping animation engines (Elementor animations + Happy animations + Royal animations + AOS).

### 2.4 Images & Media Formats
- **Total Media Items:** 94 items in WP media library.
- **Format Breakdown:**
  - PNG: 61 images (64.9%)
  - JPEG: 29 images (30.9%)
  - WebP: 2 images (2.1%)
  - AVIF: 2 images (2.1%)
- **Unoptimized High-Resolution PNGs:**
  - Multiple 2560px wide PNG images (`Untitled-design-8-scaled.png`, `Untitled-design-5-scaled.png`, `1-scaled-1.png`, etc.) each exceeding 1.5MB to 3.5MB.
  - Lacks modern `next-gen` image formats (AVIF/WebP) and responsive `sizes` attributes.

### 2.5 Font Loading & Webfont Bloat
- Loads **all 9 font weights (100 to 900)** with italic variants for 4 separate Google Fonts:
  - `Poppins` (Used for headings)
  - `Inter` (Used for body)
  - `Raleway` (Unused legacy import)
  - `Lato` (Unused legacy import)
- Result: 36 font files requested or referenced, causing network congestion on slow mobile 4G networks.

---

## 3. Core Web Vitals Baseline (Estimated & Measured)

| Metric | Measured / Estimated Baseline | Google CWV Threshold | Status | Primary Root Cause |
| :--- | :---: | :---: | :---: | :--- |
| **Largest Contentful Paint (LCP)** | **3.8s - 4.6s** | <= 2.5s | **POOR (Failed)** | 2.5MB uncompressed hero PNG image loaded via CSS background without preloading |
| **Interaction to Next Paint (INP)** | **240ms - 320ms** | <= 200ms | **NEEDS IMPROVEMENT** | Heavy JavaScript thread execution during accordion clicks, slider touches, and form interactions |
| **Cumulative Layout Shift (CLS)** | **0.18 - 0.28** | <= 0.10 | **POOR (Failed)** | Unsized images (`width`/`height` missing on CSS background wrappers) and sticky header transition jumps |
| **First Contentful Paint (FCP)** | **2.4s - 3.1s** | <= 1.8s | **NEEDS IMPROVEMENT** | 59 render-blocking CSS files and webfont blocking |
| **Total Blocking Time (TBT)** | **480ms - 650ms** | <= 200ms | **POOR (Failed)** | Monolithic jQuery + Elementor runtime script compilation on mobile CPU |

---

## 4. Server & Caching Observations

- **Web Server:** Hostinger CDN Edge (`hcdn`) with HTTP/3 support (`alt-svc: h3=":443"`).
- **Caching Plugin:** `WP-Optimize` (`WPO-Cache-Status: cached`).
- **Compression:** GZIP compression active (`Content-Encoding: gzip`).
- **CDN Edge Response Time:** ~0.008s upstream RT to Mumbai edge (`mum-edge6`).
- *Insight:* Server hardware and edge caching are performant; the performance bottleneck is 100% on the frontend software architecture and unoptimized assets.

---

## 5. Performance Rebuild Targets

1. **Sub-second LCP (< 1.0s):** Preloaded responsive AVIF/WebP hero image with native high fetchpriority.
2. **Zero CLS (0.000):** Explicit aspect ratios on all image containers and static CSS grid layout.
3. **Ultra-lightweight Payload:** Reduce total CSS from `1.36 MB` to `< 40 KB` (Tailwind CSS tree-shaken) and total JS from `850 KB` to `< 50 KB`.
4. **Self-hosted Subsets:** Self-host Poppins and Inter in `woff2` format (only weights 400, 600, 700).
