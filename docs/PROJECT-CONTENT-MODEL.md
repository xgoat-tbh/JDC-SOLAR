# JDC Solar 2.0: Project Content Model & Schema Specification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/PROJECT-CONTENT-MODEL.md`  
**Data Storage:** `frontend/data/projects.json` (Single Source of Truth)  
**Standard:** JSON Schema Validated · WCAG 2.1 AA Compliant  
**Last Updated:** August 2026  

---

## 1. Project Information Model Overview

The JDC Solar Project Content Model defines the authoritative schema for all completed rooftop, commercial, industrial, institutional, and utility solar installations. This model ensures consistency across the project portfolio, case study modals, related service links, and Schema.org structured data.

---

## 2. Field Definitions & Data Dictionary

| Field Name | Type | Requirement | Description & Validation Rules | Display Behavior |
| :--- | :---: | :---: | :--- | :--- |
| `id` | String | **Required** | Unique identifier (e.g., `"proj-01"`). Format: `/^proj-\d{2}$/`. | Internal reference, modal binding |
| `slug` | String | **Required** | URL-friendly unique kebab-case slug (e.g., `"adityapur-250kw-industrial-solar"`). | Deep-linking, query routing |
| `title` | String | **Required** | Descriptive installation title (e.g., `"Commercial Industrial Manufacturing Rooftop"`). Max 70 chars. | Card H3 heading, modal title, SEO |
| `category` | String | **Required** | EPC vertical enum: `residential`, `commercial`, `institutional`, `government`, `street-lights`, `solar-parks`. | Filtering pill filter grouping |
| `categoryLabel` | String | **Required** | Human-readable badge text (e.g., `"Industrial Solar"`). | Visual badge pill overlay |
| `serviceSlug` | String | **Required** | Direct canonical path to parent service (e.g., `"/services/commercial-solar/"`). | "Explore Related Service" CTA |
| `capacityKw` | Number | **Required** | System peak capacity in kilowatts ($kW_p$). Integer or float. | Numerical sorting & calculations |
| `capacityDisplay`| String | **Required** | Formatted capacity string with unit (e.g., `"250 kWp Rooftop Solar"`). | Card top metric |
| `location` | String | **Required** | City and district in Eastern India (e.g., `"Adityapur Industrial Area, Jamshedpur, Jharkhand"`). | Location icon line |
| `sector` | String | **Required** | Industry or building classification (e.g., `"Automotive Ancillary & Heavy Engineering"`). | Card secondary subtext |
| `monthlyGenerationKwh` | Number | **Required** | Estimated average monthly generation in $kWh$ (Units). Baseline: $kW_p \times 120$. | Fact sheet metric |
| `annualSavingsInr` | Number | **Required** | Annual electricity bill savings in Indian Rupees ($\text{₹}$). | Savings highlight badge |
| `annualSavingsDisplay` | String | **Required** | Formatted Indian currency (e.g., `"₹ 28.5 Lakhs / yr"`). | Card bottom metric |
| `paybackYears` | String | **Required** | Estimated payback duration in years (e.g., `"3.2 Years"`). | Key fact pill |
| `co2OffsetTonsPerYear` | Number | **Required** | Lifetime environmental metric (approx. $1.2 \times kW_p$ tons/year). | Fact sheet metric |
| `panelBrand` | String | **Required** | Tier-1 panel specifications (e.g., `"Waaree 540W Mono PERC Modules"`). | Technical spec table |
| `inverterBrand` | String | **Required** | Inverter OEM & configuration (e.g., `"Growatt 50kW On-Grid String Inverters"`). | Technical spec table |
| `gridConnection` | String | **Required** | Net-metering voltage (e.g., `"High Tension (HT) 11kV Net-Metering"` or `"Low Tension (LT) 415V 3-Phase"`). | Technical spec table |
| `description` | String | **Required** | Factual 2-3 sentence project overview describing engineering scope and client results. | Modal / Detail narrative |
| `image` | String | **Required** | High-DPI optimized asset path (e.g., `"/assets/images/projects/project-adityapur-250kw.webp"`). | Card & modal visual header |
| `featured` | Boolean | **Required** | `true` if highlighted on homepage showcase; `false` otherwise. | Homepage rendering filter |
| `client` | String | *Optional* | Verified corporate client name (when authorized for disclosure). | Case study header |
| `gallery` | Array | *Optional* | Array of additional installation photograph paths. | Lightbox / Gallery view |

---

## 3. JSON Schema Validation Example

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JDC Solar Project Record",
  "type": "object",
  "required": [
    "id",
    "slug",
    "title",
    "category",
    "categoryLabel",
    "serviceSlug",
    "capacityKw",
    "capacityDisplay",
    "location",
    "sector",
    "monthlyGenerationKwh",
    "annualSavingsInr",
    "annualSavingsDisplay",
    "paybackYears",
    "co2OffsetTonsPerYear",
    "panelBrand",
    "inverterBrand",
    "gridConnection",
    "description",
    "image",
    "featured"
  ]
}
```
