# JDC Solar 2.0: Calculator Number & Currency Formatting Specification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/CALCULATOR-FORMATTING.md`  
**Helper Implementation:** `frontend/js/core/formatters.js`  
**Standard:** Indian Numbering System (`en-IN`) · WCAG 2.1 AA Compliant  
**Last Updated:** August 2026  

---

## 1. Indian Currency Formatting Rules (`₹` / INR)

In accordance with Indian commercial standards, currency amounts are formatted using the Indian numbering system grouping (Thousands, Lakhs, Crores):
- Rule: 3 digits for rightmost group, followed by groups of 2 digits.
- Symbol: Prefix `₹` separated by a single non-breaking space.
- Precision: Zero decimal places for whole Rupee estimates (no false cents/paise precision).

### Examples:
| Raw Number | Formatted Output | Context |
| :--- | :--- | :--- |
| `55000` | `₹ 55,000` | Turnkey Gross Cost (1 kW) |
| `78000` | `₹ 78,000` | PM Surya Ghar Central Subsidy |
| `165000` | `₹ 1,65,000` | Turnkey Gross Cost (3 kW) |
| `2850000` | `₹ 28,50,000` | Industrial Project Turnkey Cost / Savings |

---

## 2. Metric & Generation Formatting Rules

| Metric | Unit Suffix | Formatting Rule | Example Output |
| :--- | :---: | :--- | :--- |
| **System Sizing** | `kWp` | 1 decimal place | `3.0 kWp`, `5.5 kWp`, `50.0 kWp` |
| **Daily Generation** | `kWh / day` | 1 decimal place | `12.0 kWh / day`, `20.0 kWh / day` |
| **Annual Generation** | `kWh / yr` | Integer with thousand commas | `~4,380 kWh / yr`, `~73,000 kWh / yr` |
| **Rooftop Area** | `sq.ft` | Integer with approximation `~` prefix | `~300 sq.ft`, `~5,000 sq.ft` |
| **Payback Period** | `Years` | 1 decimal place | `3.1 Years`, `3.5 Years` |
| **CO₂ Avoidance** | `Tons / yr` | 1 decimal place | `3.6 Tons / yr`, `60.0 Tons / yr` |

---

## 3. False Precision Prevention

The calculator prohibits confusing or unscientific false precision:
- **Disallowed:** `₹ 28,470.38921` → **Enforced:** `₹ 28,470`
- **Disallowed:** `2.9184729 Years` → **Enforced:** `2.9 Years`
- **Disallowed:** `298.4239 sq.ft` → **Enforced:** `~300 sq.ft`
