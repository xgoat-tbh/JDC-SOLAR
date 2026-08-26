# JDC Solar 2.0: Solar Estimation Engine Requirements & Data Dictionary

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/CALCULATOR-REQUIREMENTS.md`  
**Engine Location:** `frontend/js/calculator/`  
**Standard:** Pure Functional Architecture · WCAG 2.1 AA Compliant  
**Last Updated:** August 2026  

---

## 1. Input Specification & Data Dictionary

| Input Field | Purpose | Type | Unit | Required | Default | Validation Rules | Source |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **`state`** | Resolves state DISCOM tariff schedule | Enum / String | None | **Yes** | `"Jharkhand"` | Must match a key in `TARIFF_MATRIX`. Fallback to `"Jharkhand"`. | Official DISCOM tariff schedules (JBVNL/TSUISL/UPPCL/etc.) |
| **`serviceType`** | Selects consumer category (Residential vs Commercial/Industrial) | Enum | None | **Yes** | `"residential"` | One of: `'residential'`, `'commercial'`, `'industrial'`. | Master Spec & PM Surya Ghar Guidelines |
| **`monthlyUnits`** | Monthly grid energy consumption | Number | $kWh$ (Units) | **Yes** *(or `monthlyBill`)* | `360` | Min: `50`, Max: `100000`, Step: `10`. Must be $> 0$. | Customer Electricity Bill |
| **`monthlyBill`** | Alternative monetary consumption input | Number | $\text{₹}$ (INR) | *Optional* | `0` | Min: `0`, Max: `1000000`. Converted via `monthlyUnits = monthlyBill / tariff`. | Customer Electricity Bill |
| **`connectedLoad`**| Grid sanction load | Number | $kW$ | *Optional* | `None` | Min: `1`, Max: `1000`. Used for feasibility checks. | JBVNL Connection Sanction |

---

## 2. Output Specification & Display Dictionary

| Output Field | Meaning & Engineering Value | Unit | Formula / Source | Display Rule & Format |
| :--- | :--- | :---: | :--- | :--- |
| **`systemSize`** | Recommended solar DC capacity | $kW_p$ | `Units / 120` (Rounded to 0.5 kW res, 1.0 kW comm) | `X.X kWp` (Min 1.0 kW) |
| **`dailyGeneration`** | Daily average energy production | $kWh / \text{day}$ | `systemSize * 4.0` | `X.X kWh / day` |
| **`annualGeneration`**| Total annual energy generation | $kWh / \text{year}$| `systemSize * 1,460` | `~X,XXX kWh / yr` (Formatted with comma) |
| **`rooftopAreaSqFt`** | Shadow-free rooftop space needed | $\text{sq.ft}$ | `systemSize * 100` | `~XXX sq.ft` |
| **`rooftopAreaSqM`** | Metric rooftop space needed | $m^2$ | `rooftopAreaSqFt * 0.0929` | `~XX sq.m` |
| **`grossCost`** | Baseline turnkey EPC project cost | $\text{₹}$ (INR) | `systemSize * costPerKw` (₹55k res / ₹50k comm) | `₹ X,XX,XXX` (Indian Rupee format) |
| **`subsidy`** | PM Surya Ghar Central Government DBT Subsidy | $\text{₹}$ (INR) | Slabs: 1kW=₹30k, 2kW=₹60k, >=3kW=₹78k | `₹ XX,XXX` (Green highlight; ₹0 for comm) |
| **`netCost`** | Net capital outflow for customer | $\text{₹}$ (INR) | `grossCost - subsidy` | `₹ X,XX,XXX` (Primary brand color) |
| **`annualSavings`** | Annual electricity bill reduction | $\text{₹} / \text{year}$ | `annualGeneration * tariff` | `₹ XX,XXX / yr` (Green highlight) |
| **`monthlySavings`** | Average monthly electricity bill reduction | $\text{₹} / \text{month}$| `annualSavings / 12` | `₹ X,XXX / mo` |
| **`paybackYears`** | Simple financial payback period | $\text{Years}$ | `netCost / annualSavings` | `X.X Years` (1 decimal place) |
| **`co2AvoidedTons`**| Annual carbon emissions avoided | $\text{Tons / yr}$| `systemSize * 1.2` | `X.X Tons / yr` |
| **`treesEquivalent`**| Lifetime mature tree equivalent | $\text{Trees}$ | `systemSize * 28` | `XX Trees` |

---

## 3. Assumptions & Legal Disclaimers

1. **Indicative Nature:** Calculations are mathematical estimates for preliminary feasibility based on average Eastern India irradiance ($4.0\text{ kWh/kWp/day}$) and standard tilt angles ($22^\circ\text{ South}$).
2. **Subsidy Eligibility:** Central subsidies apply strictly to individual grid-connected residential rooftop connections under the PM Surya Ghar scheme.
3. **DISCOM Approval:** Net-metering commissioning and final sanction depend on distribution company (JBVNL/TSUISL) transformer capacity.
