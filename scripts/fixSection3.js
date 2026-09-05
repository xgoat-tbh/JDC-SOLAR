import fs from 'fs';

const file = 'd:/JDC solar/frontend/solar-calculator/index.html';
let content = fs.readFileSync(file, 'utf8');

const targetSection = `    <!-- Section 3: Engineering Sizing Methodology & Transparency -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="badge--saas-pulse"><span class="badge-pulse-dot"><span class="badge-pulse-dot__ping"></span><span class="badge-pulse-dot__core"></span></span><span>CALCULATION TRANSPARENCY</span></div>
          <h2>How We Calculate Your Solar Sizing & Returns</h2>
          <p class="lead">Our mathematical estimation engine is built on deterministic engineering standards.</p>
        </div>

        <div class="grid grid--3col">
          <div class="card">
            <h3 style="color: var(--color-brand-primary); margin-bottom: 0.5rem;">1. Solar Yield Factor</h3>
            <p class="text-small text-muted">Eastern India receives an average of 4.0 Peak Sun Hours (PSH) per day, producing 120 kWh of electricity per kilowatt-peak capacity per month.</p>
          </div>
          <div class="card">
            <h3 style="color: var(--color-brand-primary); margin-bottom: 0.5rem;">2. Subsidy Architecture</h3>
            <p class="text-small text-muted">Residential systems receive official Central Government PM Surya Ghar subsidies (₹30,000 for 1kW, ₹60,000 for 2kW, capped at ₹78,000 for 3kW+).</p>
          </div>
          <div class="card">
            <h3 style="color: var(--color-brand-primary); margin-bottom: 0.5rem;">3. Payback & Degradation</h3>
            <p class="text-small text-muted">Payback is calculated as Net Capital Outflow divided by Annual Bill Savings, modeling 25-year Tier-1 panel linear degradation at 0.7% annually.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: State Tariff Benchmark Table -->
    <section class="section section--alt">
      <div class="container container--medium">
        <div class="section-header">
          <span class="badge badge--primary">STATE DISCOM TARIFFS</span>
          <h2>Electricity Board Tariff Reference Matrix</h2>
          <p class="lead">Baseline domestic and commercial power tariffs used in financial yield calculations.</p>
        </div>

        <div style="background: var(--color-bg-surface); border: 1px solid var(--color-border-default); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-md);">
          <table>`;

content = content.replace(/<!-- Section 3: Engineering Sizing Methodology & Transparency -->[\s\S]*?<table>/, targetSection);
fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated Section 3 and 4 in solar-calculator/index.html');
