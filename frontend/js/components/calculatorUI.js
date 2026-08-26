/**
 * JDC SOLAR 2.0 - SOLAR CALCULATOR UI CONTROLLER
 * Synchronizes user inputs (State, Service Type, Units / Bill) with the pure calculation engine
 */

import { calculateSolar } from '../calculator/engine.js';
import { generateWhatsAppQuoteURI } from '../calculator/quoteGenerator.js';
import { qs, qsa } from '../core/dom.js';
import { formatINR, formatNumber } from '../core/formatters.js';

export class CalculatorUIController {
  constructor(rootElement) {
    this.root = rootElement;
    if (!this.root) return;

    this.stateSelect = qs('#calc-state', this.root);
    this.typeRadios = qsa('input[name="calc_service_type"]', this.root);
    this.unitsInput = qs('#calc-units', this.root);
    this.billInput = qs('#calc-bill', this.root);
    this.whatsappBtn = qs('#calc-whatsapp-quote', this.root);

    // Output target elements
    this.outSystemSize = qs('#out-system-size', this.root);
    this.outGrossCost = qs('#out-gross-cost', this.root);
    this.outSubsidy = qs('#out-subsidy', this.root);
    this.outNetCost = qs('#out-net-cost', this.root);
    this.outAnnualSavings = qs('#out-annual-savings', this.root);
    this.outPayback = qs('#out-payback', this.root);
    this.outArea = qs('#out-area', this.root);
    this.outGeneration = qs('#out-generation', this.root);
    this.outCo2 = qs('#out-co2', this.root);

    this.init();
  }

  init() {
    const handleInput = () => this.update();

    if (this.stateSelect) this.stateSelect.addEventListener('change', handleInput);
    this.typeRadios.forEach(r => r.addEventListener('change', handleInput));
    if (this.unitsInput) this.unitsInput.addEventListener('input', handleInput);
    if (this.billInput) this.billInput.addEventListener('input', handleInput);

    this.update();
  }

  getServiceType() {
    const checked = this.typeRadios.find(r => r.checked);
    return checked ? checked.value : 'residential';
  }

  update() {
    const state = this.stateSelect ? this.stateSelect.value : 'Jharkhand';
    const serviceType = this.getServiceType();
    const monthlyUnits = this.unitsInput ? parseFloat(this.unitsInput.value) || 0 : 0;
    const monthlyBill = this.billInput ? parseFloat(this.billInput.value) || 0 : 0;

    const result = calculateSolar({
      state,
      serviceType,
      monthlyUnits,
      monthlyBill
    });

    if (!result.isValid) return;

    const { outputs } = result;

    if (this.outSystemSize) this.outSystemSize.textContent = `${outputs.systemSize} kWp`;
    if (this.outGrossCost) this.outGrossCost.textContent = formatINR(outputs.grossCost);
    if (this.outSubsidy) this.outSubsidy.textContent = outputs.subsidy > 0 ? formatINR(outputs.subsidy) : '₹ 0 (Tax Shield)';
    if (this.outNetCost) this.outNetCost.textContent = formatINR(outputs.netCost);
    if (this.outAnnualSavings) this.outAnnualSavings.textContent = `${formatINR(outputs.annualSavings)} / yr`;
    if (this.outPayback) this.outPayback.textContent = `${outputs.paybackYears} Years`;
    if (this.outArea) this.outArea.textContent = `~${formatNumber(outputs.rooftopAreaSqFt)} sq.ft`;
    if (this.outGeneration) this.outGeneration.textContent = `~${formatNumber(outputs.annualGeneration)} kWh / yr`;
    if (this.outCo2) this.outCo2.textContent = `${outputs.co2AvoidedTons} Tons / yr`;

    if (this.whatsappBtn) {
      this.whatsappBtn.href = generateWhatsAppQuoteURI(result);
    }
  }
}

export function initCalculator() {
  const calcRoots = qsa('.solar-calculator-ui');
  calcRoots.forEach(root => new CalculatorUIController(root));
}
