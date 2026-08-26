# JDC Solar 2.0: OpenGraph & Social Sharing Image Strategy

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/SOCIAL-IMAGE-STRATEGY.md`  
**Optimal Dimensions:** $1200 \times 630\text{ px}$ (Aspect Ratio: $1.91 : 1$)  
**Format:** High-Quality WebP / Compressed Progressive JPEG  
**Last Updated:** August 2026  

---

## 1. Social Image Matrix & Standards

| Page Category | Target OG Image File Path | Target Dimensions | Visual Representation & Brand Overlay |
| :--- | :--- | :---: | :--- |
| **Global Default (Sitewide Fallback)** | `/assets/brand/og-preview.jpg` | $1200 \times 630$ | High-res industrial rooftop solar installation in Adityapur with JDC Solar logo & "Jharkhand's Premier Solar EPC Partner" headline. |
| **Homepage (`/`)** | `/assets/brand/og-preview.jpg` | $1200 \times 630$ | Flagship corporate visual with clean branding and trust metrics. |
| **Residential Solar & PM Surya Ghar** | `/assets/brand/og-preview.jpg` | $1200 \times 630$ | Modern residential villa with rooftop solar array and "₹78,000 Central Subsidy" trust badge. |
| **Commercial & Industrial Services** | `/assets/brand/og-preview.jpg` | $1200 \times 630$ | Heavy industrial factory rooftop with 250 kWp plant and "Section 32 40% Tax Shield" callout. |
| **Projects Portfolio** | `/assets/brand/og-preview.jpg` | $1200 \times 630$ | Aerial collage of completed Eastern India commercial and residential solar installations. |
| **Solar Calculator** | `/assets/brand/og-preview.jpg` | $1200 \times 630$ | Interactive solar dashboard mockup with instant sizing and payback modeling. |

---

## 2. Social Meta Tag Standards

All pages implement the following standardized OpenGraph and Twitter/X metadata in `<head>`:
```html
<!-- OpenGraph Social Metadata -->
<meta property="og:locale" content="en_IN">
<meta property="og:type" content="website"> <!-- or "article" on educational pages -->
<meta property="og:title" content="[Unique Page Title]">
<meta property="og:description" content="[Unique Meta Description]">
<meta property="og:url" content="[Canonical Absolute HTTPS URL]">
<meta property="og:site_name" content="JDC Solar">
<meta property="og:image" content="https://jdcsolar.com/assets/images/brand/og-preview.jpg">

<!-- Twitter / X Card Metadata -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Unique Page Title]">
<meta name="twitter:description" content="[Unique Meta Description]">
<meta name="twitter:image" content="https://jdcsolar.com/assets/images/brand/og-preview.jpg">
```
