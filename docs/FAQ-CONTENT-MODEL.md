# JDC Solar 2.0: FAQ Content Model & Schema Specification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/FAQ-CONTENT-MODEL.md`  
**Storage Location:** `frontend/data/faqs.json`  
**Standard:** Structured Schema.org FAQPage Compatible  
**Last Updated:** August 2026  

---

## 1. FAQ Data Dictionary

| Field Name | Type | Required | Purpose & Display Behavior | Validation Rule |
| :--- | :---: | :---: | :--- | :--- |
| **`id`** | String | **Yes** | Unique question identifier (e.g. `faq-01`). | Pattern `^faq-[0-9]{2}$` |
| **`category`** | Enum | **Yes** | Domain taxonomy (`general`, `subsidy`, `technical`, `financial`). | Valid category key |
| **`question`** | String | **Yes** | Consumer question text rendered in `<summary>`. | Max 150 characters |
| **`answer`** | String | **Yes** | Verified, fact-checked response rendered in `<p>`. | Concise, factual text |
| **`relatedPage`** | String | *Optional* | Link to deep-dive page or calculator. | Valid URL path |
| **`priority`** | Number | **Yes** | Sorting weight (lower number = higher placement). | Integer >= 1 |
| **`source`** | String | **Yes** | Fact verification origin (e.g. `MNRE Guidelines`, `JBVNL Tariff`). | Non-empty string |

---

## 2. FAQ Categories

1. **`general`** — Rooftop suitability, installation timelines, and system warranties.
2. **`subsidy`** — PM Surya Ghar DBT transfers, eligibility, and sanctioned load limits.
3. **`technical`** — Net-metering, inverter synchronization, and battery backup options.
4. **`financial`** — Payback periods, commercial depreciation, and electricity bill savings.
