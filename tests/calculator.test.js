import { calculateSolar } from '../frontend/js/calculator/engine.js';
import { getSubsidyAmount } from '../frontend/js/calculator/subsidy.js';
import { getTariffRate } from '../frontend/js/calculator/tariffs.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✅ [PASS] ${message}`);
  } else {
    failed++;
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

console.log('\n--- 1. Testing PM Surya Ghar Subsidy Engine ---');
assert(getSubsidyAmount(1.0, 'residential') === 30000, '1 kW Residential receives ₹30,000 subsidy');
assert(getSubsidyAmount(1.5, 'residential') === 45000, '1.5 kW Residential receives ₹45,000 proportional subsidy');
assert(getSubsidyAmount(2.0, 'residential') === 60000, '2 kW Residential receives ₹60,000 subsidy');
assert(getSubsidyAmount(2.5, 'residential') === 69000, '2.5 kW Residential receives ₹69,000 proportional subsidy');
assert(getSubsidyAmount(3.0, 'residential') === 78000, '3 kW Residential receives ₹78,000 subsidy');
assert(getSubsidyAmount(5.0, 'residential') === 78000, '5 kW Residential is capped at ₹78,000 subsidy');
assert(getSubsidyAmount(10.0, 'residential') === 78000, '10 kW Residential is capped at ₹78,000 subsidy');
assert(getSubsidyAmount(50.0, 'commercial') === 0, 'Commercial installations receive ₹0 direct subsidy');
assert(getSubsidyAmount(100.0, 'industrial') === 0, 'Industrial installations receive ₹0 direct subsidy');
assert(getSubsidyAmount(NaN, 'residential') === 0, 'NaN input receives ₹0 subsidy safely');

console.log('\n--- 2. Testing State DISCOM Tariffs ---');
assert(getTariffRate('Jharkhand', 'residential') === 6.50, 'Jharkhand domestic tariff is ₹6.50/kWh');
assert(getTariffRate('Jharkhand', 'commercial') === 8.50, 'Jharkhand commercial tariff is ₹8.50/kWh');
assert(getTariffRate('Jharkhand', 'industrial') === 8.00, 'Jharkhand industrial tariff is ₹8.00/kWh');
assert(getTariffRate('Maharashtra', 'residential') === 8.50, 'Maharashtra domestic tariff is ₹8.50/kWh');
assert(getTariffRate('UnknownState', 'residential') === 6.50, 'Fallback to Jharkhand tariff for unknown state');

console.log('\n--- 3. Testing Solar Calculation Engine Scenarios ---');

const res1kW = calculateSolar({ state: 'Jharkhand', serviceType: 'residential', monthlyUnits: 120 });
assert(res1kW.isValid === true, '1 kW test returns valid result');
assert(res1kW.outputs.systemSize === 1.0, '120 units gives 1.0 kW system size');
assert(res1kW.outputs.grossCost === 55000, '1 kW gross cost is ₹55,000');
assert(res1kW.outputs.subsidy === 30000, '1 kW subsidy is ₹30,000');
assert(res1kW.outputs.netCost === 25000, '1 kW net cost is ₹25,000');
assert(res1kW.outputs.annualGeneration === 1460, '1 kW annual generation is 1,460 kWh');
assert(res1kW.outputs.rooftopAreaSqFt === 100, '1 kW requires 100 sq.ft rooftop space');

const res3kW = calculateSolar({ state: 'Jharkhand', serviceType: 'residential', monthlyUnits: 360 });
assert(res3kW.outputs.systemSize === 3.0, '360 units gives 3.0 kW system size');
assert(res3kW.outputs.grossCost === 165000, '3 kW gross cost is ₹165,000');
assert(res3kW.outputs.subsidy === 78000, '3 kW subsidy is ₹78,000');
assert(res3kW.outputs.netCost === 87000, '3 kW net cost is ₹87,000');
assert(res3kW.outputs.annualSavings === 28470, '3 kW annual savings in JH is ₹28,470 (3kW * 1460 * 6.5)');
assert(res3kW.outputs.paybackYears === 3.1, '3 kW payback is 3.1 years');

const res50kW = calculateSolar({ state: 'Jharkhand', serviceType: 'commercial', monthlyUnits: 6000 });
assert(res50kW.outputs.systemSize === 50.0, '6000 units gives 50.0 kW system size');
assert(res50kW.outputs.grossCost === 2500000, '50 kW gross cost is ₹2,500,000 (@ ₹50,000/kW)');
assert(res50kW.outputs.subsidy === 0, 'Commercial subsidy is ₹0');
assert(res50kW.outputs.netCost === 2500000, 'Commercial net cost is ₹2,500,000');
assert(res50kW.outputs.annualSavings === 620500, '50 kW annual savings in JH is ₹620,500 (50kW * 1460 * 8.5)');

const resInvalid = calculateSolar({ state: 'Jharkhand', serviceType: 'residential', monthlyUnits: 0, monthlyBill: 0 });
assert(resInvalid.isValid === false, 'Zero input returns isValid: false with descriptive error');

const resNaN = calculateSolar({ state: 'Jharkhand', serviceType: 'residential', monthlyUnits: NaN, monthlyBill: NaN });
assert(resNaN.isValid === false, 'NaN input returns isValid: false safely');

console.log(`\n========================================`);
console.log(`Calculator Unit Tests: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
