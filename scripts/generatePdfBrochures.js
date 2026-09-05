import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsDir = path.resolve(__dirname, '../frontend/assets/docs');

function createSimplePdf(title, subtitle, sections) {
  let contentStream = `BT
/F1 20 Tf
50 750 Td
(${title}) Tj
ET
BT
/F1 12 Tf
50 725 Td
(${subtitle}) Tj
ET
BT
/F1 9 Tf
50 705 Td
(JDC Solar - Jagatdhan Commodities Pvt. Ltd. | Adityapur, Jamshedpur | +91 92883 81112 | sales@jdcsolar.com) Tj
ET
`;

  let currentY = 665;
  for (const sec of sections) {
    contentStream += `
BT
/F2 13 Tf
50 ${currentY} Td
(${sec.heading}) Tj
ET
`;
    currentY -= 18;

    for (const line of sec.lines) {
      
      const cleanLine = line.replace(/[\(\)]/g, '');
      contentStream += `
BT
/F1 10 Tf
60 ${currentY} Td
(${cleanLine}) Tj
ET
`;
      currentY -= 15;
    }
    currentY -= 12;
  }

  
  contentStream += `
BT
/F1 8 Tf
50 40 Td
(c 2026 JDC Solar. All rights reserved. Official MNRE Channel Partner Jharkhand. www.jdcsolar.com) Tj
ET
`;

  const streamLength = Buffer.byteLength(contentStream, 'utf8');

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLength} >>
stream
${contentStream}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
000000${(294 + streamLength).toString().padStart(4, '0')} 00000 n 
000000${(365 + streamLength).toString().padStart(4, '0')} 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
${440 + streamLength}
%%EOF`;

  return Buffer.from(pdf, 'utf8');
}

const brochureSections = [
  {
    heading: "1. Corporate Profile & Engineering Heritage",
    lines: [
      "JDC Solar is the specialized solar EPC division of Jagatdhan Commodities Pvt. Ltd.",
      "Backed by a 20+ year industrial engineering heritage in Jharkhand and Eastern India.",
      "Delivered 500+ turnkey residential, commercial, industrial, and institutional solar projects.",
      "Cumulative installed capacity: 25+ Megawatts of high-yield solar energy infrastructure.",
      "Approved Channel Partner for PM Surya Ghar: Muft Bijli Yojana with DISCOM liaisoning."
    ]
  },
  {
    heading: "2. EPC Service Verticals",
    lines: [
      "- Residential Rooftop Solar: 1 kW to 10 kW systems with up to Rs 78,000 direct central subsidy.",
      "- Commercial & Industrial Solar: 20 kW to 2 MW+ rooftop plants with 40% Accelerated Depreciation.",
      "- Institutional Solar: Medical colleges, universities, and hospitals with DG synchronization.",
      "- Government & PSU Tenders: 100% DCR module compliance and turnkey execution.",
      "- Solar Street Lighting: Autonomous dusk-to-dawn LiFePO4 intelligent lighting arrays.",
      "- Utility-Scale Solar Parks: Megawatt ground-mounted plants with 33kV/132kV substation evacuation."
    ]
  },
  {
    heading: "3. Quality Assurance & Tier-1 Component Standards",
    lines: [
      "- Modules: Monocrystalline PERC and TOPCon Bifacial panels with 25-year performance warranty.",
      "- Inverters: High-efficiency on-grid string inverters with dual/quad MPPT and Wi-Fi cloud telemetry.",
      "- Mounting Structure: HDG Hot-Dip Galvanized steel certified for 150 km/h wind survivability.",
      "- Protection: Dual-pole DC/AC surge protection devices (SPDs) and chemical earthing pits (< 5 Ohms)."
    ]
  },
  {
    heading: "4. Contact & Headquarters",
    lines: [
      "Headquarters: A-21, 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109",
      "Phone: +91 92883 81112 | WhatsApp: +91 92883 81112 | Email: sales@jdcsolar.com",
      "Website: https://jdcsolar.com | Free Site Surveys across Jharkhand & Eastern India"
    ]
  }
];

const checklistSections = [
  {
    heading: "1. Mandatory Consumer Identity & Property Documents",
    lines: [
      "[ ] Electricity Bill: Latest JBVNL / TSUISL bill with clear Consumer Number and Connected Load.",
      "[ ] Identification Proof: Aadhaar Card copy of the property owner (matching electricity bill).",
      "[ ] Bank Account Details: Cancelled cheque or bank passbook copy for Direct Benefit Transfer (DBT).",
      "[ ] Property Ownership: Proof of roof ownership / municipal holding tax receipt."
    ]
  },
  {
    heading: "2. Central Subsidy Slabs Schedule (2024-2026)",
    lines: [
      "- 1.0 kWp Sizing: Rs 30,000 Fixed Central Subsidy (Ideal for monthly bill Rs 800 - Rs 1,200)",
      "- 2.0 kWp Sizing: Rs 60,000 Fixed Central Subsidy (Ideal for monthly bill Rs 1,500 - Rs 2,500)",
      "- 3.0 kWp to 10 kWp Sizing: Rs 78,000 Maximum Capped Central Subsidy (Ideal for bills > Rs 3,000)",
      "- Group Housing / RWA Common Meters: Rs 18,000 per kW up to 500 kW capacity."
    ]
  },
  {
    heading: "3. Step-by-Step National Portal Application Workflow",
    lines: [
      "Step 1: Rooftop Site Survey & 3D Shading Report by JDC Solar engineers.",
      "Step 2: Registration on National PM Surya Ghar Portal (pmsuryaghar.gov.in) with Consumer No.",
      "Step 3: DISCOM Feasibility Approval issued by JBVNL / TSUISL.",
      "Step 4: Installation of Tier-1 DCR solar panels and on-grid inverter by JDC Solar.",
      "Step 5: DISCOM Net-Meter Inspection and bidirectional meter commissioning.",
      "Step 6: Direct Benefit Transfer (DBT) subsidy credited directly to consumer bank account within 30 days."
    ]
  },
  {
    heading: "4. JDC Solar Assistance Helpline",
    lines: [
      "Need end-to-end liaisoning support? JDC Solar handles 100% of portal registration and DISCOM approvals.",
      "Call: +91 92883 81112 | WhatsApp: +91 92883 81112 | Adityapur Industrial Area, Jamshedpur"
    ]
  }
];

fs.mkdirSync(docsDir, { recursive: true });

const brochurePdf = createSimplePdf(
  "JDC SOLAR - CORPORATE BROCHURE",
  "Turnkey Solar Engineering, Procurement & Construction (EPC) Partner",
  brochureSections
);
fs.writeFileSync(path.join(docsDir, 'jdc-solar-company-brochure.pdf'), brochurePdf);
console.log('✅ Generated brochure PDF:', path.join(docsDir, 'jdc-solar-company-brochure.pdf'), `(${brochurePdf.length} bytes)`);

const checklistPdf = createSimplePdf(
  "PM SURYA GHAR MUFT BIJLI YOJANA",
  "Jharkhand Rooftop Solar Subsidy Application Checklist & Guide",
  checklistSections
);
fs.writeFileSync(path.join(docsDir, 'pm-surya-ghar-checklist.pdf'), checklistPdf);
console.log('✅ Generated checklist PDF:', path.join(docsDir, 'pm-surya-ghar-checklist.pdf'), `(${checklistPdf.length} bytes)`);
