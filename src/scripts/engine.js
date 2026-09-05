import { CALCULATOR_CONFIG } from './config.js';
import { getSubsidyAmount } from './subsidy.js';
import { getTariffRate } from './tariffs.js';

export function calculateSolar(inputs = {}) {
  const {
    state = CALCULATOR_CONFIG.DEFAULT_STATE,
    serviceType = CALCULATOR_CONFIG.DEFAULT_SERVICE_TYPE,
    monthlyUnits = 0,
    monthlyBill = 0
  } = inputs;

  const tariff = getTariffRate(state, serviceType);
  
  
  const parsedUnits = Number(monthlyUnits);
  const parsedBill = Number(monthlyBill);

  let effectiveUnits = Number.isFinite(parsedUnits) && parsedUnits > 0 ? parsedUnits : 0;
  
  if (effectiveUnits <= 0 && Number.isFinite(parsedBill) && parsedBill > 0 && tariff > 0) {
    effectiveUnits = parsedBill / tariff;
  }

  if (!Number.isFinite(effectiveUnits) || effectiveUnits <= 0) {
    return {
      isValid: false,
      error: 'Please enter valid monthly electricity units or monthly bill amount.'
    };
  }

  
  const rawKw = effectiveUnits / CALCULATOR_CONFIG.UNITS_PER_KW_MONTH;
  let systemSize = 0;

  if (serviceType === 'residential') {
    
    systemSize = Math.max(1.0, Math.round(rawKw * 2) / 2);
  } else {
    
    systemSize = Math.max(5.0, Math.round(rawKw));
  }

  
  const dailyGeneration = systemSize * CALCULATOR_CONFIG.DAILY_UNITS_PER_KW;
  const annualGeneration = systemSize * CALCULATOR_CONFIG.ANNUAL_GENERATION_PER_KW;
  const rooftopAreaSqFt = systemSize * CALCULATOR_CONFIG.SQFT_PER_KW;
  const rooftopAreaSqM = Math.round(rooftopAreaSqFt * 0.092903);

  
  const costPerKw = serviceType === 'residential'
    ? CALCULATOR_CONFIG.RESIDENTIAL_COST_PER_KW
    : CALCULATOR_CONFIG.COMMERCIAL_COST_PER_KW;

  const grossCost = systemSize * costPerKw;
  const subsidy = getSubsidyAmount(systemSize, serviceType);
  const netCost = Math.max(0, grossCost - subsidy);

  
  const annualSavings = annualGeneration * tariff;
  const monthlySavings = Math.round(annualSavings / 12);
  const paybackYears = annualSavings > 0 ? Number((netCost / annualSavings).toFixed(1)) : 0;
  
  
  const cumulativeSavings25Yr = Math.round((annualSavings * CALCULATOR_CONFIG.CALCULATION_YEARS) - netCost - (grossCost * CALCULATOR_CONFIG.INVERTER_REPLACEMENT_FACTOR));

  
  const co2AvoidedTons = Number((systemSize * CALCULATOR_CONFIG.CO2_TONS_PER_KW_YEAR).toFixed(1));
  const treesEquivalent = Math.round(systemSize * CALCULATOR_CONFIG.TREES_PLANTED_PER_KW_YEAR);

  return {
    isValid: true,
    inputs: {
      state,
      serviceType,
      monthlyUnits: Math.round(effectiveUnits),
      tariff
    },
    outputs: {
      systemSize,
      dailyGeneration: Number(dailyGeneration.toFixed(1)),
      annualGeneration: Math.round(annualGeneration),
      rooftopAreaSqFt,
      rooftopAreaSqM,
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
