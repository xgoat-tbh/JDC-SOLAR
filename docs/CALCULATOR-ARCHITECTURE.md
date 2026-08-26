# JDC Solar 2.0: Solar Calculator Subsystem Architecture

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**Subsystem:** Interactive Solar Savings & Subsidy Engine  
**Module Path:** `frontend/js/calculator/`  
**Dependencies:** ZERO External Libraries (100% Pure JavaScript ES Modules)  
**Author:** Lead Software & Systems Architect  
**Last Updated:** August 2026  

---

## 1. Subsystem Overview & Objectives

The JDC Solar Calculator is an interactive, client-side engineering tool designed to empower homeowners, commercial enterprises, and industrial facility managers to calculate:
1. **Accurate Solar System Sizing (kWp)** based on electricity bills or units consumed.
2. **Rooftop Shadow-Free Area Requirements** (in square feet and square meters).
3. **Turnkey System Investment Costs** under verified EPC benchmarks.
4. **Exact Government Subsidies** under the national **PM Surya Ghar: Muft Bijli Yojana**.
5. **25-Year Financial Savings, Payback Period (ROI), and Environmental Impact**.
6. **Instant 1-Tap WhatsApp Quotation Generation**.

---

## 2. Decoupled Subsystem Architecture

The calculator subsystem is strictly partitioned into 5 independent modules:

```text
frontend/js/calculator/
├── config.js          # Engine constants, defaults & benchmark parameters
├── tariffs.js         # State DISCOM electricity tariff matrix (16 states)
├── subsidy.js         # PM Surya Ghar central subsidy calculation engine
├── engine.js          # Pure mathematical calculation pipeline (Zero DOM references)
├── quoteGenerator.js  # WhatsApp link builder & text formatter
└── controller.js      # DOM event listeners, input validation, and UI state updates
```

---

## 3. Mathematical Models & Benchmark Formulas

### 3.1 Sizing Formulas

1. **Monthly Units Input Mode (Default):**
   $$\text{System Size (kWp)} = \frac{\text{Monthly Consumption (kWh)}}{120\text{ kWh/kW/month}}$$
   *(Rounded to nearest 0.5 kW for residential systems; 1.0 kW for commercial).*

2. **Monthly Bill Input Mode:**
   $$\text{Estimated Monthly Units (kWh)} = \frac{\text{Monthly Electricity Bill (₹)}}{\text{State DISCOM Tariff (₹/kWh)}}$$
   $$\text{System Size (kWp)} = \frac{\text{Estimated Monthly Units}}{120}$$

3. **Required Shadow-Free Rooftop Area:**
   $$\text{Rooftop Area (sq. ft)} = \text{System Size (kWp)} \times 100\text{ sq.ft}$$
   $$\text{Rooftop Area (sq. meters)} = \text{System Size (kWp)} \times 9.29\text{ sq.m}$$

---

### 3.2 Generation & Energy Metrics

1. **Daily Electricity Generation:**
   $$\text{Daily Generation (kWh)} = \text{System Size (kWp)} \times 4.0\text{ units/kW/day}$$
2. **Annual Electricity Generation:**
   $$\text{Annual Generation (kWh)} = \text{System Size (kWp)} \times 4.0 \times 365 = \text{System Size} \times 1,460\text{ kWh/year}$$
3. **25-Year Lifetime Generation:**
   $$\text{25-Year Generation (kWh)} = \sum_{t=1}^{25} \left(\text{Annual Generation} \times (1 - 0.007)^{t-1}\right)$$
   *(Accounts for standard 0.7% annual solar panel linear degradation).*

---

### 3.3 Financial & Subsidy Calculation Engine

#### Central PM Surya Ghar Slabs (Residential Consumers):
- **1 kW System:** Fixed Subsidy = **₹30,000**
- **2 kW System:** Fixed Subsidy = **₹60,000**
- **3 kW to 10 kW System:** Fixed Subsidy = **₹78,000** (Capped at ₹78,000 for single residential connection)
- **Residential Welfare Associations (RWA) / Group Housing:** **₹18,000 per kW** (Capped at 500 kW capacity)
- **Commercial & Industrial Consumers:** Central Subsidy = **₹0** *(Eligible for Section 32 Accelerated Depreciation 40% tax benefit)*.

#### Capital Investment & Net Outflow:
$$\text{Gross Turnkey Cost (₹)} = \text{System Size (kWp)} \times \text{Cost per kW (₹55,000/kW)}$$
$$\text{Net Customer Investment (₹)} = \text{Gross Turnkey Cost} - \text{PM Surya Ghar Subsidy}$$

#### Savings & Payback:
$$\text{Annual Electricity Savings (₹)} = \text{Annual Generation (kWh)} \times \text{State DISCOM Tariff (₹/kWh)}$$
$$\text{Simple Payback Period (Years)} = \frac{\text{Net Customer Investment (₹)}}{\text{Annual Electricity Savings (₹)}}$$
$$\text{25-Year Net Cumulative Savings (₹)} = (\text{Annual Savings} \times 25) - \text{Net Investment} - (\text{Inverter Replacement Reserve at Year 10})$$

---

### 3.4 Environmental Impact Formulas
$$\text{Annual CO}_2\text{ Offset (Tons)} = \text{System Size (kWp)} \times 1.2\text{ Tons/kW/year}$$
$$\text{Equivalent Trees Planted} = \text{System Size (kWp)} \times 28\text{ Trees/kW/year}$$

---

## 4. State DISCOM Tariff Matrix (`tariffs.js`)

| State | Default DISCOM Code | Domestic Tariff (₹/kWh) | Commercial Tariff (₹/kWh) | Industrial Tariff (₹/kWh) |
| :--- | :--- | :---: | :---: | :---: |
| **Jharkhand (HQ)** | JBVNL / TSUISL | **₹6.50** | **₹8.50** | **₹8.00** |
| **Bihar** | NBPDCL / SBPDCL | **₹7.00** | **₹8.80** | **₹8.20** |
| **West Bengal** | WBSEDCL / CESC | **₹7.20** | **₹9.20** | **₹8.50** |
| **Odisha** | TPCODL / TPNODL | **₹6.00** | **₹8.00** | **₹7.50** |
| **Uttar Pradesh** | UPPCL | **₹7.00** | **₹9.00** | **₹8.40** |
| **Delhi** | BSES / TPDDL | **₹6.50** | **₹9.50** | **₹8.80** |
| **Maharashtra** | MSEDCL / Adani | **₹8.50** | **₹11.50** | **₹10.00** |
| **Rajasthan** | JVVNL | **₹7.50** | **₹9.50** | **₹8.50** |
| **Gujarat** | DGVCL / Torrent | **₹6.20** | **₹8.20** | **₹7.80** |
| **Karnataka** | BESCOM | **₹7.80** | **₹9.80** | **₹8.60** |
| **Tamil Nadu** | TANGEDCO | **₹6.80** | **₹9.20** | **₹8.20** |
| **Telangana** | TSSPDCL | **₹7.20** | **₹9.60** | **₹8.40** |
| **Andhra Pradesh** | APCPDCL | **₹7.00** | **₹9.40** | **₹8.20** |
| **Chhattisgarh** | CSPDCL | **₹6.20** | **₹8.40** | **₹7.60** |
| **Assam** | APDCL | **₹7.20** | **₹9.00** | **₹8.00** |
| **Pan-India Other** | Generic Standard | **₹7.00** | **₹9.00** | **₹8.20** |

---

## 5. Verification Benchmark Test Cases

| Test Case | Inputs | Expected kWp | Expected Gross Cost | Expected Subsidy | Expected Net Cost | Expected Annual Savings (Jharkhand) | Expected Payback |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Case 1: 1 kW Home** | 120 units, Res, JH | **1.0 kW** | ₹55,000 | **₹30,000** | **₹25,000** | ₹9,490 / yr | **2.6 Years** |
| **Case 2: 2 kW Home** | 240 units, Res, JH | **2.0 kW** | ₹110,000 | **₹60,000** | **₹50,000** | ₹18,980 / yr | **2.6 Years** |
| **Case 3: 3 kW Home** | 360 units, Res, JH | **3.0 kW** | ₹165,000 | **₹78,000** | **₹87,000** | ₹28,470 / yr | **3.0 Years** |
| **Case 4: 5 kW Villa** | 600 units, Res, JH | **5.0 kW** | ₹275,000 | **₹78,000** | **₹197,000** | ₹47,450 / yr | **4.1 Years** |
| **Case 5: 10 kW Res** | 1200 units, Res, JH | **10.0 kW** | ₹550,000 | **₹78,000** | **₹472,000** | ₹94,900 / yr | **4.9 Years** |
| **Case 6: 50 kW Factory**| 6000 units, C&I, JH | **50.0 kW** | ₹2,500,000 | **₹0** | **₹2,500,000** | ₹584,000 / yr | **4.2 Years** |

---

## 6. JavaScript Implementation Architecture

```javascript
// frontend/js/calculator/engine.js (Pure Function Pipeline)

import { DEFAULT_CONFIG } from './config.js';
import { getSubsidyAmount } from './subsidy.js';
import { getTariffRate } from './tariffs.js';

export function calculateSolar(inputs) {
  const { state = 'Jharkhand', serviceType = 'residential', monthlyUnits = 0, monthlyBill = 0 } = inputs;

  const tariff = getTariffRate(state, serviceType);
  const effectiveUnits = monthlyUnits > 0 ? monthlyUnits : (monthlyBill > 0 ? monthlyBill / tariff : 0);

  if (effectiveUnits <= 0) {
    return { isValid: false, error: 'Please enter valid monthly units or bill amount.' };
  }

  // Sizing Calculation
  let rawKw = effectiveUnits / DEFAULT_CONFIG.UNITS_PER_KW_MONTH;
  let systemSize = serviceType === 'residential' 
    ? Math.max(1, Math.round(rawKw * 2) / 2) // Round to nearest 0.5 kW
    : Math.max(5, Math.round(rawKw));       // Round to nearest 1.0 kW for commercial

  const annualGeneration = systemSize * DEFAULT_CONFIG.DAILY_UNITS_PER_KW * 365;
  const rooftopAreaSqFt = systemSize * DEFAULT_CONFIG.SQFT_PER_KW;
  const rooftopAreaSqM = Math.round(rooftopAreaSqFt * 0.092903);

  const costPerKw = serviceType === 'residential' ? DEFAULT_CONFIG.RESIDENTIAL_COST_PER_KW : DEFAULT_CONFIG.COMMERCIAL_COST_PER_KW;
  const grossCost = systemSize * costPerKw;
  const subsidy = getSubsidyAmount(systemSize, serviceType);
  const netCost = grossCost - subsidy;

  const annualSavings = annualGeneration * tariff;
  const monthlySavings = Math.round(annualSavings / 12);
  const paybackYears = netCost > 0 ? Number((netCost / annualSavings).toFixed(1)) : 0;
  const cumulativeSavings25Yr = Math.round((annualSavings * 25) - netCost - (grossCost * 0.10));

  const co2AvoidedTons = Number((systemSize * 1.2).toFixed(1));
  const treesEquivalent = Math.round(systemSize * 28);

  return {
    isValid: true,
    inputs: { state, serviceType, monthlyUnits: effectiveUnits, tariff },
    outputs: {
      systemSize,
      rooftopAreaSqFt,
      rooftopAreaSqM,
      annualGeneration: Math.round(annualGeneration),
      grossCost,
      subsidy,
      netCost,
      annualSavings: Math.round(annualSavings),
      monthlySavings,
      paybackYears,
      cumulativeSavings25Yr,
      co2AvoidedTons,
      treesEquivalent
    }
  };
}
```

---

## 7. Accessibility, Formatting & Error States

1. **Currency Formatting:** All financial figures are formatted using the browser's native `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })`.
2. **Screen Reader Live Updates:** The output container utilizes `aria-live="polite"` to dynamically inform assistive technologies whenever inputs change and new totals are calculated.
3. **No Page Refresh:** Results are computed instantly in-memory (< 1 millisecond) and rendered seamlessly below the input card.
