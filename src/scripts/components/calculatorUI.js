import { calculateSolar } from '../calculator/engine.js';
import { generateWhatsAppQuoteURI } from '../calculator/quoteGenerator.js';
import { generateProposalReport } from './proposalGenerator.js';
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
    this.downloadPdfBtn = qs('#btn-download-proposal', this.root) || qs('[data-download-proposal]', this.root);

    
    this.outSystemSize = qs('#out-system-size', this.root);
    this.outGrossCost = qs('#out-gross-cost', this.root);
    this.outSubsidy = qs('#out-subsidy', this.root);
    this.outNetCost = qs('#out-net-cost', this.root);
    this.outAnnualSavings = qs('#out-annual-savings', this.root);
    this.outPayback = qs('#out-payback', this.root);
    this.outArea = qs('#out-area', this.root);
    this.outGeneration = qs('#out-generation', this.root);
    this.outCo2 = qs('#out-co2', this.root);

    this.lastChanged = 'units'; 
    this.currentResult = null;

    this.init();
  }

  init() {
    if (this.stateSelect) {
      this.stateSelect.addEventListener('change', () => this.update());
    }

    this.typeRadios.forEach(r => {
      r.addEventListener('change', () => this.update());
    });

    if (this.unitsInput) {
      this.unitsInput.addEventListener('input', () => {
        this.lastChanged = 'units';
        if (this.billInput && this.unitsInput.value.trim() !== '') {
          this.billInput.value = ''; 
        }
        this.update();
      });
    }

    if (this.billInput) {
      this.billInput.addEventListener('input', () => {
        this.lastChanged = 'bill';
        if (this.unitsInput && this.billInput.value.trim() !== '') {
          this.unitsInput.value = ''; 
        }
        this.update();
      });
    }

    
    if (this.downloadPdfBtn) {
      this.downloadPdfBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerProposalDownload();
      });
    }

    this.update();
  }

  getServiceType() {
    const checked = this.typeRadios.find(r => r.checked);
    return checked ? checked.value : 'residential';
  }

  update() {
    const state = this.stateSelect ? this.stateSelect.value : 'Jharkhand';
    const serviceType = this.getServiceType();
    
    let monthlyUnits = this.unitsInput ? parseFloat(this.unitsInput.value) || 0 : 0;
    let monthlyBill = this.billInput ? parseFloat(this.billInput.value) || 0 : 0;

    
    if (this.lastChanged === 'bill' && monthlyBill > 0) {
      monthlyUnits = 0;
    } else if (this.lastChanged === 'units' && monthlyUnits > 0) {
      monthlyBill = 0;
    }

    const result = calculateSolar({
      state,
      serviceType,
      monthlyUnits,
      monthlyBill
    });

    this.currentResult = result;

    if (!result.isValid) {
      this.clearOutputs();
      return;
    }

    const { outputs } = result;

    if (this.outSystemSize) this.outSystemSize.innerHTML = `${outputs.systemSize.toFixed(1)} <small class="metric-unit" style="font-size: 1.1rem; color: var(--color-brand-accent);">kWp</small>`;
    if (this.outGrossCost) this.outGrossCost.textContent = formatINR(outputs.grossCost);
    if (this.outSubsidy) this.outSubsidy.textContent = outputs.subsidy > 0 ? formatINR(outputs.subsidy) : '₹ 0 (Tax Shield)';
    if (this.outNetCost) this.outNetCost.textContent = formatINR(outputs.netCost);
    if (this.outAnnualSavings) this.outAnnualSavings.innerHTML = `${formatINR(outputs.annualSavings)} <small class="metric-unit">/ yr</small>`;
    if (this.outPayback) this.outPayback.innerHTML = `${outputs.paybackYears.toFixed(1)} <small class="metric-unit">Years</small>`;
    if (this.outArea) this.outArea.innerHTML = `~${formatNumber(outputs.rooftopAreaSqFt)} <small class="metric-unit">sq.ft</small>`;
    if (this.outGeneration) this.outGeneration.innerHTML = `~${formatNumber(outputs.annualGeneration)} <small class="metric-unit">kWh/yr</small>`;
    if (this.outCo2) this.outCo2.innerHTML = `${outputs.co2AvoidedTons.toFixed(1)} <small class="metric-unit">Tons/yr</small>`;

    if (this.whatsappBtn) {
      this.whatsappBtn.href = generateWhatsAppQuoteURI(result);
    }
  }

  triggerProposalDownload() {
    if (!this.currentResult || !this.currentResult.isValid) {
      this.update();
    }

    const outputs = this.currentResult && this.currentResult.outputs ? this.currentResult.outputs : {};
    const serviceType = this.getServiceType();
    const serviceLabel = serviceType === 'residential' ? 'Residential Rooftop (PM Surya Ghar)' :
                         serviceType === 'commercial' ? 'Commercial Rooftop (Section 32 Tax Benefit)' :
                         'Industrial High-Tension Solar Power Plant';

    generateProposalReport({
      systemSize: (outputs.systemSize || 3.0).toFixed(1),
      monthlyBill: this.billInput && this.billInput.value ? formatNumber(parseFloat(this.billInput.value)) : '3,000',
      grossCost: formatNumber(outputs.grossCost || 165000),
      subsidy: formatNumber(outputs.subsidy || 78000),
      netCost: formatNumber(outputs.netCost || 87000),
      annualSavings: formatNumber(outputs.annualSavings || 28470),
      monthlySavings: formatNumber(Math.round((outputs.annualSavings || 28470) / 12)),
      payback: (outputs.paybackYears || 3.1).toFixed(1),
      savings25Yr: formatNumber((outputs.annualSavings || 28470) * 25),
      roofArea: formatNumber(outputs.rooftopAreaSqFt || 300),
      panels: Math.ceil((outputs.systemSize || 3) * 1000 / 550),
      category: serviceLabel
    });
  }

  clearOutputs() {
    if (this.outSystemSize) this.outSystemSize.innerHTML = `— <small class="metric-unit">kWp</small>`;
    if (this.outGrossCost) this.outGrossCost.textContent = `₹ —`;
    if (this.outSubsidy) this.outSubsidy.textContent = `₹ —`;
    if (this.outNetCost) this.outNetCost.textContent = `₹ —`;
    if (this.outAnnualSavings) this.outAnnualSavings.innerHTML = `₹ — <small class="metric-unit">/ yr</small>`;
    if (this.outPayback) this.outPayback.innerHTML = `— <small class="metric-unit">Years</small>`;
    if (this.outArea) this.outArea.innerHTML = `~— <small class="metric-unit">sq.ft</small>`;
    if (this.outGeneration) this.outGeneration.innerHTML = `~— <small class="metric-unit">kWh/yr</small>`;
    if (this.outCo2) this.outCo2.innerHTML = `— <small class="metric-unit">Tons/yr</small>`;
  }
}

export function initCalculator() {
  const calcRoots = qsa('.solar-calculator-ui');
  calcRoots.forEach(root => new CalculatorUIController(root));
}
