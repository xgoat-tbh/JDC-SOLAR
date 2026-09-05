import { APP_CONFIG } from '../config.js';

export function generateProposalReport(calcData = {}) {
  const systemSize = calcData.systemSize || '3.0';
  const monthlyBill = calcData.monthlyBill || '3,000';
  const grossCost = calcData.grossCost || '1,65,000';
  const subsidy = calcData.subsidy || '78,000';
  const netCost = calcData.netCost || '87,000';
  const annualSavings = calcData.annualSavings || '28,470';
  const monthlySavings = calcData.monthlySavings || '2,372';
  const payback = calcData.payback || '3.1';
  const savings25Yr = calcData.savings25Yr || '7,11,750';
  const roofArea = calcData.roofArea || '300';
  const panels = calcData.panels || '6';
  const category = calcData.category || 'Residential Rooftop (PM Surya Ghar)';

  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const proposalId = `JDC-SOL-${Math.floor(100000 + Math.random() * 900000)}`;

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JDC Solar - Feasibility Proposal (${proposalId})</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: #0F172A;
      background: #FFFFFF;
      padding: 32px 40px;
      line-height: 1.5;
      font-size: 13px;
    }
    
    .proposal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #FD8127;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .brand-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 24px;
      font-weight: 800;
      color: #1B3766;
      line-height: 1;
    }
    
    .brand-title span { color: #FD8127; }
    
    .brand-sub {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748B;
      margin-top: 4px;
    }
    
    .meta-block {
      text-align: right;
      font-size: 11px;
      color: #475569;
    }
    
    .meta-ref {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: 14px;
      color: #FD8127;
    }
    
    .doc-title-bar {
      background: #1B3766;
      color: #FFFFFF;
      padding: 12px 18px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .doc-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 16px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    
    .badge-mnre {
      background: #FD8127;
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 99px;
      text-transform: uppercase;
    }
    
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 20px;
    }
    
    .card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 16px;
    }
    
    .card-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1B3766;
      margin-bottom: 12px;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 6px;
    }
    
    .row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px dashed #E2E8F0;
      font-size: 12px;
    }
    
    .row:last-child { border-bottom: none; }
    
    .row-val {
      font-weight: 700;
      color: #0F172A;
    }
    
    .highlight-net {
      background: #FFF4EC;
      border: 1.5px solid #FD8127;
      border-radius: 10px;
      padding: 16px;
      text-align: center;
      margin-bottom: 20px;
    }
    
    .highlight-net__title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748B;
      margin-bottom: 4px;
    }
    
    .highlight-net__val {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 32px;
      font-weight: 800;
      color: #FD8127;
      line-height: 1;
    }
    
    .highlight-net__sub {
      font-size: 11px;
      color: #10B981;
      font-weight: 600;
      margin-top: 4px;
    }
    
    .specs-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 11px;
    }
    
    .specs-table th {
      background: #1B3766;
      color: #FFFFFF;
      text-align: left;
      padding: 8px 12px;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    
    .specs-table td {
      padding: 8px 12px;
      border: 1px solid #E2E8F0;
    }
    
    .specs-table tr:nth-child(even) { background: #F8FAFC; }
    
    .footer-bar {
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      color: #64748B;
    }
    
    .print-actions {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      gap: 10px;
      z-index: 999;
    }
    
    .btn-print {
      background: #FD8127;
      color: #FFFFFF;
      border: none;
      padding: 12px 24px;
      border-radius: 99px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(253, 129, 39, 0.4);
    }
    
    @media print {
      body { padding: 0; }
      .print-actions { display: none; }
    }
  </style>
</head>
<body>
  <div class="proposal-header">
    <div class="brand-logo">
      <div>
        <div class="brand-title">JDC <span>SOLAR</span></div>
        <div class="brand-sub">A Jagatdhan Commodities Pvt. Ltd. Company • Solar EPC Partner</div>
      </div>
    </div>
    <div class="meta-block">
      <div class="meta-ref">Proposal Ref: ${proposalId}</div>
      <div>Date: ${dateStr}</div>
      <div>Helpline: +91 92883 81112</div>
      <div>Email: sales@jdcsolar.com</div>
    </div>
  </div>

  <div class="doc-title-bar">
    <div class="doc-title">Solar Rooftop Feasibility &amp; ROI Proposal</div>
    <div class="badge-mnre">MNRE Verified EPC Partner</div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-title">Technical System Specs</div>
      <div class="row"><span>Target Installation Type:</span><span class="row-val">${category}</span></div>
      <div class="row"><span>Recommended Capacity:</span><span class="row-val" style="color: #FD8127; font-size: 14px;">${systemSize} kWp</span></div>
      <div class="row"><span>Estimated Module Count:</span><span class="row-val">${panels} x Tier-1 Mono PERC</span></div>
      <div class="row"><span>Required Shadow-Free Roof:</span><span class="row-val">~${roofArea} sq.ft</span></div>
      <div class="row"><span>Estimated Monthly Generation:</span><span class="row-val">~${Math.round(parseFloat(systemSize) * 120)} Units (kWh)</span></div>
      <div class="row"><span>Annual Green Energy Output:</span><span class="row-val">~${Math.round(parseFloat(systemSize) * 1460)} Units / Year</span></div>
    </div>

    <div class="card">
      <div class="card-title">Financial Investment Model</div>
      <div class="row"><span>Current Monthly Electricity Bill:</span><span class="row-val">₹ ${monthlyBill}</span></div>
      <div class="row"><span>Gross Estimated Project CAPEX:</span><span class="row-val">₹ ${grossCost}</span></div>
      <div class="row"><span>PM Surya Ghar Direct Subsidy:</span><span class="row-val" style="color: #10B981;">- ₹ ${subsidy}</span></div>
      <div class="row"><span>Estimated Monthly Electricity Savings:</span><span class="row-val" style="color: #10B981;">₹ ${monthlySavings} / mo</span></div>
      <div class="row"><span>Annual DISCOM Bill Savings:</span><span class="row-val" style="color: #10B981;">₹ ${annualSavings} / yr</span></div>
      <div class="row"><span>Estimated Payback Horizon:</span><span class="row-val">${payback} Years</span></div>
    </div>
  </div>

  <div class="highlight-net">
    <div class="highlight-net__title">Net Effective Capital Outlay (Post Central Govt Subsidy)</div>
    <div class="highlight-net__val">₹ ${netCost}</div>
    <div class="highlight-net__sub">Estimated 25-Year Cumulative Utility Savings: ₹ ${savings25Yr}</div>
  </div>

  <table class="specs-table">
    <thead>
      <tr>
        <th>Component</th>
        <th>Engineering Specification</th>
        <th>Warranty Standards</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Solar Photovoltaic Modules</strong></td>
        <td>Tier-1 Bifacial / Monocrystalline PERC (550Wp+)</td>
        <td>25-Year Linear Performance Warranty (84.8%+)</td>
      </tr>
      <tr>
        <td><strong>On-Grid String Inverter</strong></td>
        <td>High-Efficiency MPPT Smart Inverter (TSUISL/JBVNL compliant)</td>
        <td>10-Year Comprehensive Inverter Warranty</td>
      </tr>
      <tr>
        <td><strong>Mounting Structure</strong></td>
        <td>Hot-Dip Galvanized (HDG) Steel Structure (150 km/h wind rated)</td>
        <td>10-Year Structural Integrity Warranty</td>
      </tr>
      <tr>
        <td><strong>DISCOM Liaisoning</strong></td>
        <td>End-to-end net metering documentation &amp; DISCOM approval</td>
        <td>100% Subsidy Portal Processing Included</td>
      </tr>
    </tbody>
  </table>

  <div class="footer-bar">
    <div><strong>JDC Solar EPC Division</strong> • Regional Presence in Jharkhand (HQ), West Bengal &amp; Odisha • sales@jdcsolar.com</div>
    <div>Official Proposal • Generated via jdcsolar.com</div>
  </div>

  <div class="print-actions">
    <button type="button" class="btn-print" onclick="window.print()">Print / Save as PDF</button>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  const printWindow = window.open(blobUrl, '_blank', 'width=900,height=800');

  if (!printWindow) {
    alert('Please allow popups to generate your official Solar Proposal PDF.');
  }
}
