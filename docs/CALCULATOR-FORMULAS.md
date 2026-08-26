# JDC Solar 2.0: Solar Estimation Engine Mathematical Formulas

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/CALCULATOR-FORMULAS.md`  
**Engine Implementation:** `frontend/js/calculator/engine.js`  
**Standard:** Deterministic Pure Mathematical Sizing  
**Last Updated:** August 2026  

---

## 1. System Sizing Formula

### Formula Name: `DC Peak Capacity Sizing (kWp)`
- **Purpose:** Determine the optimal DC solar panel capacity required to offset the client's monthly grid consumption.
- **Inputs:**
  - $E_{\text{month}}$: Monthly electricity consumption ($kWh$)
  - $Y_{\text{specific}}$: Monthly generation yield factor per $kW_p$ ($120\text{ kWh/kWp/month}$)
- **Formula:**
  $$\text{Raw Capacity (kWp)} = \frac{E_{\text{month}}}{120}$$
- **Rounding Rules:**
  - *Residential:* $\text{systemSize} = \max(1.0, \text{round}(\text{Raw Capacity} \times 2) / 2)$ (Step: $0.5\text{ kWp}$)
  - *Commercial:* $\text{systemSize} = \max(5.0, \text{round}(\text{Raw Capacity}))$ (Step: $1.0\text{ kWp}$)
- **Units:** Kilowatt Peak ($kW_p$)
- **Source:** MNRE & Eastern India Solar Insolation Guidelines ($4.0\text{ PSH/day} \times 30\text{ days} = 120\text{ kWh/kW/month}$).

---

## 2. Energy Generation Formulas

### Formula Name: `Daily & Annual Generation (kWh)`
- **Purpose:** Project expected solar power generation over daily and annual cycles.
- **Formula:**
  $$\text{Daily Generation (kWh/day)} = \text{systemSize} \times 4.0$$
  $$\text{Annual Generation (kWh/year)} = \text{systemSize} \times 1,460$$
- **Units:** Kilowatt Hours ($kWh$)
- **Assumptions:** Average annual Global Horizontal Irradiance (GHI) for Jharkhand/Eastern India ($1,750\text{ kWh/m}^2/\text{year}$) with Performance Ratio (PR) of $78\%–80\%$.

---

## 3. Rooftop Area Requirement Formula

### Formula Name: `Shadow-Free Rooftop Area`
- **Purpose:** Estimate required physical shadow-free roof footprint.
- **Formula:**
  $$\text{Area}_{\text{sq.ft}} = \text{systemSize} \times 100$$
  $$\text{Area}_{\text{sq.m}} = \text{Area}_{\text{sq.ft}} \times 0.092903$$
- **Units:** Square Feet ($\text{sq.ft}$) and Square Meters ($m^2$)
- **Assumptions:** High-efficiency Mono PERC / TOPCon modules ($540W–550W$) requiring $\sim 9.29\text{ m}^2$ per $kW_p$ including inter-row walkway spacing.

---

## 4. Financial Capital Sizing & Subsidy Formulas

### Formula Name: `Turnkey Gross & Net Investment Cost`
- **Formula:**
  $$\text{Gross Turnkey Cost (₹)} = \text{systemSize} \times C_{\text{turnkey}}$$
  $$\text{Net Investment Outflow (₹)} = \max(0, \text{Gross Cost} - \text{Subsidy})$$
- **Where:**
  - $C_{\text{turnkey, res}} = \text{₹}55,000 / \text{kW}$
  - $C_{\text{turnkey, comm}} = \text{₹}50,000 / \text{kW}$
  - $\text{Subsidy}_{\text{residential}}(\text{kWp}) = \begin{cases} \text{₹}30,000 & \text{if } kW_p \le 1.0 \\ \text{₹}60,000 & \text{if } 1.0 < kW_p \le 2.0 \\ \text{₹}78,000 & \text{if } kW_p \ge 3.0 \end{cases}$
  - $\text{Subsidy}_{\text{commercial}} = \text{₹}0$

---

## 5. Financial Returns & Payback Period Formula

### Formula Name: `Annual Bill Savings & Payback Duration`
- **Formula:**
  $$\text{Annual Savings (₹/year)} = \text{Annual Generation (kWh)} \times T_{\text{state}}$$
  $$\text{Monthly Savings (₹/month)} = \text{round}\left(\frac{\text{Annual Savings}}{12}\right)$$
  $$\text{Payback Period (Years)} = \frac{\text{Net Investment Outflow}}{\text{Annual Savings}}$$
- **Units:** Indian Rupees ($\text{₹}$) and Years
- **Assumptions:** Baseline JBVNL Domestic Tariff $T_{\text{res}} = \text{₹}6.50/\text{kWh}$, Commercial Tariff $T_{\text{comm}} = \text{₹}8.50/\text{kWh}$.

---

## 6. Environmental Impact Formulas

### Formula Name: `CO₂ Emission Avoidance & Tree Equivalency`
- **Formula:**
  $$\text{CO}_2\text{ Offset (Tons/year)} = \text{systemSize} \times 1.2$$
  $$\text{Trees Equivalent} = \text{systemSize} \times 28$$
- **Source:** Central Electricity Authority (CEA) Carbon Baseline Database for Indian Grid ($0.82\text{ kg CO}_2/\text{kWh}$).
