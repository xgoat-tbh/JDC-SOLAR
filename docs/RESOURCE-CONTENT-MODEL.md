# JDC Solar 2.0: Resource Content Model & Data Dictionary

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/RESOURCE-CONTENT-MODEL.md`  
**Storage Location:** `frontend/data/resources.json`  
**Standard:** Structured Static Content Model · Zero CMS Overhead  
**Last Updated:** August 2026  

---

## 1. Resource Data Dictionary

| Field Name | Type | Required | Purpose & Display Behavior | Validation Rule |
| :--- | :---: | :---: | :--- | :--- |
| **`id`** | String | **Yes** | Unique internal resource identifier (e.g. `res-01`). | Pattern `^res-[0-9]{2}$` |
| **`slug`** | String | **Yes** | URL path segment (e.g. `how-solar-rooftop-works`). | Lowercase hyphenated string |
| **`title`** | String | **Yes** | Canonical educational title rendered in H1 and cards. | Max 100 characters |
| **`category`** | Enum | **Yes** | Category identifier (`basics`, `subsidy`, `maintenance`, `commercial`). | Must match category filter keys |
| **`categoryLabel`** | String | **Yes** | User-facing category badge (e.g. `Solar Basics`). | Non-empty string |
| **`readTime`** | String | **Yes** | Estimated reading duration (e.g. `6 min read`). | Non-empty string |
| **`lastUpdated`** | String | **Yes** | ISO date string (`YYYY-MM-DD`). | Valid ISO date |
| **`summary`** | String | **Yes** | 2-sentence summary for card previews and meta descriptions. | 120–180 characters |
| **`featured`** | Boolean | **Yes** | Whether pinned on top of the resources hub. | `true` or `false` |
| **`relatedService`** | String | **Yes** | Path to the relevant service landing page. | Valid URL path (e.g. `/services/commercial-solar/`) |
| **`downloadUrl`** | String | *Optional* | Path to downloadable PDF asset if applicable. | Valid file path or null |

---

## 2. Resource Categories

1. **`basics`** — Solar Technology, Photovoltaic Physics, and Net-Metering.
2. **`subsidy`** — PM Surya Ghar: Muft Bijli Yojana & Central Financial Assistance.
3. **`maintenance`** — Operation, Cleaning, and Preventive Health Checks.
4. **`commercial`** — Section 32 Tax Shield, HT Evacuation & Industrial ROI.
