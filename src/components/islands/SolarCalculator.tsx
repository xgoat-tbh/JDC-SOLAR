import React, { useState, useMemo } from 'react';

const TARIFFS: Record<string, { domestic: number; commercial: number; industrial: number }> = {
  'Jharkhand': { domestic: 6.50, commercial: 8.50, industrial: 8.00 },
  'Bihar': { domestic: 7.00, commercial: 8.80, industrial: 8.20 },
  'West Bengal': { domestic: 7.20, commercial: 9.20, industrial: 8.50 },
  'Odisha': { domestic: 6.00, commercial: 8.00, industrial: 7.50 },
  'Uttar Pradesh': { domestic: 7.00, commercial: 9.00, industrial: 8.40 },
  'Other States': { domestic: 7.00, commercial: 9.00, industrial: 8.20 }
};

export default function SolarCalculator() {
  const [serviceType, setServiceType] = useState<'residential' | 'commercial' | 'industrial'>('residential');
  const [state, setState] = useState<string>('Jharkhand');
  const [inputMode, setInputMode] = useState<'bill' | 'units'>('bill');
  const [billAmount, setBillAmount] = useState<number>(3500);
  const [unitsAmount, setUnitsAmount] = useState<number>(400);

  const calculations = useMemo(() => {
    const stateData = TARIFFS[state] || TARIFFS['Jharkhand'];
    const tariff = serviceType === 'commercial' ? stateData.commercial : (serviceType === 'industrial' ? stateData.industrial : stateData.domestic);
    
    let effectiveUnits = inputMode === 'bill' ? (billAmount / tariff) : unitsAmount;
    if (effectiveUnits <= 0) effectiveUnits = 100;

    const rawKw = effectiveUnits / 120;
    let systemSize = serviceType === 'residential'
      ? Math.max(1.0, Math.round(rawKw * 2) / 2)
      : Math.max(5.0, Math.round(rawKw));

    const costPerKw = serviceType === 'residential' ? 55000 : 50000;
    const grossCost = systemSize * costPerKw;

    // PM Surya Ghar Subsidy formula
    let subsidy = 0;
    if (serviceType === 'residential') {
      if (systemSize <= 2.0) {
        subsidy = Math.round(systemSize * 30000);
      } else if (systemSize < 3.0) {
        subsidy = Math.round(60000 + (systemSize - 2.0) * 18000);
      } else {
        subsidy = 78000;
      }
    }

    const netCost = Math.max(0, grossCost - subsidy);
    const annualGeneration = systemSize * 1460;
    const annualSavings = annualGeneration * tariff;
    const monthlySavings = Math.round(annualSavings / 12);
    const paybackYears = annualSavings > 0 ? Number((netCost / annualSavings).toFixed(1)) : 0;
    const lifetimeSavings25Yr = Math.round((annualSavings * 25) - netCost - (grossCost * 0.10));
    const co2Tons = Number((systemSize * 1.2).toFixed(1));
    const trees = Math.round(systemSize * 28);
    const areaSqFt = systemSize * 100;

    return {
      tariff,
      systemSize,
      grossCost,
      subsidy,
      netCost,
      monthlySavings,
      annualSavings,
      paybackYears,
      lifetimeSavings25Yr,
      co2Tons,
      trees,
      areaSqFt
    };
  }, [serviceType, state, inputMode, billAmount, unitsAmount]);

  const formatInr = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Service Type Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              1. Installation Category
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800/70 p-1.5 rounded-2xl">
              {(['residential', 'commercial', 'industrial'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setServiceType(type)}
                  className={`py-2.5 px-3 rounded-xl font-heading font-semibold text-xs sm:text-sm capitalize transition-all ${
                    serviceType === type
                      ? 'bg-white dark:bg-slate-700 text-brand-primary dark:text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* State / Region Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                2. State / Discom
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-accent font-semibold"
              >
                {Object.keys(TARIFFS).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                3. Input Calculation By
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setInputMode('bill')}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    inputMode === 'bill'
                      ? 'bg-white dark:bg-slate-700 text-brand-primary dark:text-white shadow'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Monthly Bill (₹)
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('units')}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    inputMode === 'units'
                      ? 'bg-white dark:bg-slate-700 text-brand-primary dark:text-white shadow'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Units (kWh)
                </button>
              </div>
            </div>
          </div>

          {/* Slider & Number Input */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {inputMode === 'bill' ? 'Average Monthly Electricity Bill' : 'Average Monthly Units Consumed'}
              </span>
              <span className="font-heading font-extrabold text-xl text-brand-accent">
                {inputMode === 'bill' ? formatInr(billAmount) : `${unitsAmount} kWh`}
              </span>
            </div>

            {inputMode === 'bill' ? (
              <>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={billAmount}
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>₹1,000</span>
                  <span>₹25,000</span>
                  <span>₹50,000+</span>
                </div>
              </>
            ) : (
              <>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={unitsAmount}
                  onChange={(e) => setUnitsAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>100 kWh</span>
                  <span>2,500 kWh</span>
                  <span>5,000+ kWh</span>
                </div>
              </>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-center">
              <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400">Tariff Rate</span>
              <span className="font-heading font-bold text-sm text-slate-800 dark:text-slate-100">₹{calculations.tariff.toFixed(2)}/u</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-center">
              <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400">Roof Area</span>
              <span className="font-heading font-bold text-sm text-slate-800 dark:text-slate-100">{calculations.areaSqFt} sq.ft</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 text-center">
              <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400">Payback Period</span>
              <span className="font-heading font-bold text-sm text-emerald-600 dark:text-emerald-400">{calculations.paybackYears} Years</span>
            </div>
          </div>
        </div>

        {/* Right Column: Output Card */}
        <div className="lg:col-span-5 rounded-2xl p-6 bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Recommended Plant Size</span>
                <div data-metric="system-size" className="font-heading font-extrabold text-4xl text-white mt-1">
                  {calculations.systemSize.toFixed(1)} <span className="text-brand-accent text-2xl">kW</span>
                </div>
              </div>
              {calculations.subsidy > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  PM Surya Ghar Eligible
                </span>
              )}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-3 pb-6 border-b border-white/10 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Estimated Turnkey Cost:</span>
                <span className="font-medium text-white">{formatInr(calculations.grossCost)}</span>
              </div>
              {calculations.subsidy > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Central Govt Subsidy:</span>
                  <span>- {formatInr(calculations.subsidy)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-white/10 text-base font-bold text-white">
                <span>Net Effective Cost:</span>
                <span className="text-xl text-brand-accent font-heading">{formatInr(calculations.netCost)}</span>
              </div>
            </div>

            {/* Savings Highlights */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur-sm">
                <span className="block text-xs text-slate-300 mb-1">Monthly Savings</span>
                <span className="font-heading font-extrabold text-lg text-emerald-400">
                  {formatInr(calculations.monthlySavings)}
                </span>
              </div>
              <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur-sm">
                <span className="block text-xs text-slate-300 mb-1">25-Yr Net Savings</span>
                <span className="font-heading font-extrabold text-lg text-white">
                  {formatInr(calculations.lifetimeSavings25Yr)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-4">
            <button
              type="button"
              onClick={() => {
                const modal = document.getElementById('survey-modal') as HTMLDialogElement;
                if (modal && typeof modal.showModal === 'function') modal.showModal();
              }}
              className="w-full py-3.5 rounded-xl font-heading font-bold text-sm bg-brand-accent hover:bg-brand-accent-hover text-white shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Claim ₹{calculations.subsidy.toLocaleString('en-IN')} Subsidy Now →
            </button>
            <p className="text-center text-[11px] text-slate-400">
              *Estimates based on JBVNL/TSUISL benchmarks. Subject to physical roof shadow analysis.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
