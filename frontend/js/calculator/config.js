/**
 * JDC SOLAR 2.0 - CALCULATOR BENCHMARKS & CONFIGURATION
 */

export const CALCULATOR_CONFIG = Object.freeze({
  DEFAULT_STATE: 'Jharkhand',
  DEFAULT_SERVICE_TYPE: 'residential',
  
  // Cost Benchmarks (₹ / kW)
  RESIDENTIAL_COST_PER_KW: 55000,
  COMMERCIAL_COST_PER_KW: 50000,
  
  // Energy Generation Benchmarks
  DAILY_UNITS_PER_KW: 4.0,           // 4.0 kWh / kW / day in Eastern India
  UNITS_PER_KW_MONTH: 120,           // 120 kWh / kW / month
  ANNUAL_GENERATION_PER_KW: 1460,    // 4.0 * 365
  
  // Area Benchmarks
  SQFT_PER_KW: 100,                  // 100 sq. ft / kW
  SQM_PER_KW: 9.29,                  // 9.29 sq. meters / kW
  
  // Financial & Degradation Benchmarks
  PANEL_ANNUAL_DEGRADATION: 0.007,   // 0.7% annual linear degradation
  INVERTER_REPLACEMENT_FACTOR: 0.10, // 10% reserve for Year 10 inverter maintenance
  CALCULATION_YEARS: 25,
  
  // Environmental Impact Benchmarks
  CO2_TONS_PER_KW_YEAR: 1.2,         // 1.2 tons CO2 avoided / kW / year
  TREES_PLANTED_PER_KW_YEAR: 28      // 28 mature trees equivalent / kW / year
});
