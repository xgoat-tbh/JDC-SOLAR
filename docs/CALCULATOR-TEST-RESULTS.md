# JDC Solar 2.0: Solar Calculator Mathematical Engine Test Results

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/CALCULATOR-TEST-RESULTS.md`  
**Test Suite:** `tests/calculator.test.js` (30/30 Unit Tests Passed)  
**Standard:** MNRE & PM Surya Ghar Benchmark Formulations  
**Last Updated:** August 2026  

---

## 1. Mathematical Test Vectors & Verification

| Test Scenario | Input Parameter | Expected Output Value | Actual Engine Output | Test Status |
| :--- | :--- | :--- | :--- | :---: |
| **1 kW Residential Subsidy** | 1.0 kW System Size | ₹30,000 fixed CFA subsidy | `calculateSubsidy(1, 'residential') === 30000` | ✅ **PASS** |
| **2 kW Residential Subsidy** | 2.0 kW System Size | ₹60,000 fixed CFA subsidy | `calculateSubsidy(2, 'residential') === 60000` | ✅ **PASS** |
| **3 kW Residential Subsidy** | 3.0 kW System Size | ₹78,000 maximum CFA subsidy | `calculateSubsidy(3, 'residential') === 78000` | ✅ **PASS** |
| **5 kW Residential Subsidy** | 5.0 kW System Size | ₹78,000 maximum capped subsidy | `calculateSubsidy(5, 'residential') === 78000` | ✅ **PASS** |
| **10 kW Residential Subsidy**| 10.0 kW System Size | ₹78,000 maximum capped subsidy | `calculateSubsidy(10, 'residential') === 78000` | ✅ **PASS** |
| **Commercial Solar Subsidy** | 50.0 kW Commercial | ₹0 direct subsidy (Sec 32 tax benefit) | `calculateSubsidy(50, 'commercial') === 0` | ✅ **PASS** |
| **Industrial Solar Subsidy** | 250.0 kW Industrial | ₹0 direct subsidy (Sec 32 tax benefit) | `calculateSubsidy(250, 'industrial') === 0` | ✅ **PASS** |
| **Jharkhand Domestic Tariff**| State: `JH`, Type: Domestic | ₹6.50 per kWh | `getTariff('JH', 'domestic') === 6.50` | ✅ **PASS** |
| **Jharkhand Commercial Tariff**| State: `JH`, Type: Commercial | ₹8.50 per kWh | `getTariff('JH', 'commercial') === 8.50` | ✅ **PASS** |
| **3 kW System Economics (JH)**| 360 monthly units ($3\text{ kW}$) | Gross: ₹1.65L, Subsidy: ₹78k, Net: ₹87k, Savings: ₹28,470/yr, Payback: 3.1 yrs | Net Cost: ₹87,000, Annual Savings: ₹28,470, Payback: 3.1 yrs | ✅ **PASS** |
| **50 kW Commercial Economics**| 6,000 monthly units ($50\text{ kW}$)| Gross: ₹25L, Subsidy: ₹0, Net: ₹25L, Savings: ₹620,500/yr, Payback: 4.0 yrs | Net Cost: ₹2,500,000, Annual Savings: ₹620,500, Payback: 4.0 yrs | ✅ **PASS** |
| **Zero Input Boundary Test** | 0 monthly units | `isValid: false`, descriptive error | Returns graceful error object without script crashes | ✅ **PASS** |
