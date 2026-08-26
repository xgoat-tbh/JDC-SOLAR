# JDC Solar 2.0: Structured Data (JSON-LD Schema) Audit & Verification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/STRUCTURED-DATA-AUDIT.md`  
**Validator:** Schema.org & Google Rich Results Test Standards  
**Format:** Native JSON-LD Script Blocks (`<script type="application/ld+json">`)  
**Last Updated:** August 2026  

---

## 1. Schema.org Implementation Audit Matrix

| Page URL | Implemented Schemas (@type) | Key Required Fields Included | Validation Status | Justification & Visual Parity |
| :--- | :--- | :--- | :---: | :--- |
| **`/`** (Home) | `Organization`, `LocalBusiness`, `WebSite`, `FAQPage` | `name`, `legalName`, `telephone`, `email`, `address`, `geo`, `openingHoursSpecification`, `mainEntity` (Q&A) | ✅ **100% VALID** | Accurately describes corporate entity and matches visible FAQs. |
| **`/about/`** | `AboutPage`, `Organization`, `BreadcrumbList` | `name`, `description`, `parentOrganization`, `itemListElement` | ✅ **100% VALID** | Reflects company history and Jagatdhan Commodities parent entity. |
| **`/services/`** | `CollectionPage`, `Service`, `BreadcrumbList` | `name`, `serviceType`, `provider`, `itemListElement` | ✅ **100% VALID** | Accurately outlines solar EPC service portfolio. |
| **`/services/*`** (7 Service Pages) | `Service`, `BreadcrumbList` | `name`, `serviceType`, `provider`, `areaServed`, `description` | ✅ **100% VALID** | Each service page carries dedicated schema matching visible content. |
| **`/projects/`** | `CollectionPage`, `BreadcrumbList` | `name`, `description`, `itemListElement` | ✅ **100% VALID** | Case studies collection page. |
| **`/solar-calculator/`** | `WebApplication`, `BreadcrumbList` | `name`, `applicationCategory`, `operatingSystem`, `browserRequirements` | ✅ **100% VALID** | Describes interactive browser-based mathematical tool. |
| **`/pm-surya-ghar/`** | `WebPage`, `FAQPage`, `BreadcrumbList` | `name`, `description`, `mainEntity` (Q&A) | ✅ **100% VALID** | Includes valid visible citizen Q&A schema. |
| **`/resources/`** | `CollectionPage`, `FAQPage`, `BreadcrumbList` | `name`, `description`, `mainEntity` (Q&A) | ✅ **100% VALID** | Validated FAQ markup matching visible accordion items. |
| **`/resources/*`** (3 Guides) | `Article`, `BreadcrumbList` | `headline`, `datePublished`, `dateModified`, `author`, `publisher` | ✅ **100% VALID** | Non-fabricated author & publisher metadata. |
| **`/contact/`** | `ContactPage`, `LocalBusiness`, `BreadcrumbList` | `name`, `telephone`, `address`, `geo`, `openingHoursSpecification` | ✅ **100% VALID** | Matches Adityapur corporate headquarters exactly. |
| **`/privacy-policy/`** | `WebPage`, `BreadcrumbList` | `name`, `description`, `itemListElement` | ✅ **100% VALID** | Standard compliance schema. |
