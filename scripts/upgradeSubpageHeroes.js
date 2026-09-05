import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, '..', 'frontend');

const pages = [
  {
    file: 'contact/index.html',
    heroClass: 'page-hero--contact',
    badge: 'Contact JDC Solar',
    chips: ['Adityapur Regional HQ', 'Mon–Sat Technical Support', '2-Hour Response Time']
  },
  {
    file: 'pm-surya-ghar/index.html',
    heroClass: 'page-hero--surya-ghar',
    badge: 'Central Government Subsidy',
    chips: ['Up to ₹78,000 Direct DBT', '100% Portal Paperwork Managed', 'Zero Electricity Bills']
  },
  {
    file: 'solar-calculator/index.html',
    heroClass: 'page-hero--calculator',
    badge: 'Instant Financial Sizing',
    chips: ['16 State DISCOM Tariffs', 'PM Surya Ghar Subsidy Deduction', '25-Year ROI Forecast']
  },
  {
    file: 'projects/index.html',
    heroClass: 'page-hero--projects',
    badge: 'Verified Project Portfolio',
    chips: ['500+ Commissioned Installations', '25+ MW Cumulative Capacity', 'Residential, C&I, Utility']
  },
  {
    file: 'services/index.html',
    heroClass: 'page-hero--services',
    badge: 'Comprehensive Solar Solutions',
    chips: ['Residential, C&I & Utility Parks', 'Tier-1 DCR Monocrystalline Panels', '25-Year Performance Warranty']
  },
  {
    file: 'services/residential-solar/index.html',
    heroClass: 'page-hero--surya-ghar',
    badge: 'Residential Rooftop Solar',
    chips: ['₹78,000 PM Surya Ghar Subsidy', 'Direct JBVNL Net-Metering', 'Up to 90% Bill Reduction']
  },
  {
    file: 'services/commercial-solar/index.html',
    heroClass: 'page-hero--services',
    badge: 'Commercial Rooftop Solar',
    chips: ['40% Section 32 Tax Depreciation', 'HT 11kV/33kV Net-Metering', '3.2 Years Payback']
  },
  {
    file: 'services/industrial-solar/index.html',
    heroClass: 'page-hero--services',
    badge: 'Industrial High-Capacity Solar',
    chips: ['Heavy Engineering & Shed Mounts', 'CAPEX & RESCO OPEX Models', 'High-Demand Peak Tariffs Shield']
  },
  {
    file: 'services/institutional-solar/index.html',
    heroClass: 'page-hero--services',
    badge: 'Institutional Solar Solutions',
    chips: ['DG Synchronization & Zero Downtime', 'Hospitals, Clinics & Universities', 'Green Campus Certification']
  },
  {
    file: 'services/government-solar/index.html',
    heroClass: 'page-hero--about',
    badge: 'Government & PSU Solar EPC',
    chips: ['100% ALMM & DCR Compliance', 'JREDA / BREDA Liaisoning', 'ISO Certified Standards']
  },
  {
    file: 'services/street-lights/index.html',
    heroClass: 'page-hero--services',
    badge: 'Solar Street Lighting Systems',
    chips: ['Dusk-to-Dawn Intelligent Operation', 'LiFePO4 Lithium Storage', 'Hot-Dip Galvanized Poles']
  },
  {
    file: 'services/solar-parks/index.html',
    heroClass: 'page-hero--projects',
    badge: 'Utility-Scale Solar Parks',
    chips: ['Ground-Mounted MW Power Plants', '33kV/132kV Grid Evacuation', 'Full SCADA Cloud Telemetry']
  },
  {
    file: 'resources/index.html',
    heroClass: 'page-hero--resources',
    badge: 'Solar Knowledge Hub',
    chips: ['Technical EPC Guides', 'Government Policy Updates', 'Downloadable PDF Checklists']
  },
  {
    file: 'resources/how-solar-rooftop-works/index.html',
    heroClass: 'page-hero--resources',
    badge: 'Technical Solar Guide',
    chips: ['Photovoltaic Working Principle', 'Grid-Tied Net-Metering Flow', 'Monocrystalline Efficiency']
  },
  {
    file: 'resources/commercial-solar-tax-benefits/index.html',
    heroClass: 'page-hero--resources',
    badge: 'Financial & Tax Advisory',
    chips: ['40% Accelerated Depreciation', 'Corporate Tax Savings', 'Accelerated ROI Calculation']
  },
  {
    file: 'resources/solar-maintenance-guide/index.html',
    heroClass: 'page-hero--resources',
    badge: 'Operations & Maintenance',
    chips: ['Preventative Maintenance Protocol', 'Panel Cleaning Guidelines', 'Inverter Diagnostics']
  },
  {
    file: 'privacy-policy/index.html',
    heroClass: 'page-hero--privacy',
    badge: 'Data Protection & Privacy',
    chips: ['Transparent Data Practices', 'SSL Encrypted Submissions', 'Zero Third-Party Sharing']
  }
];

let updatedCount = 0;

pages.forEach(p => {
  const filePath = path.join(baseDir, p.file);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', p.file);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  
  const breadcrumbMatch = content.match(/<nav class="breadcrumb"[^>]*>([\s\S]*?)<\/nav>/i);
  const breadcrumbInner = breadcrumbMatch ? breadcrumbMatch[1].trim() : '';

  
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const leadMatch = content.match(/<p class="lead"[^>]*>([\s\S]*?)<\/p>/i);

  if (h1Match) {
    const title = h1Match[1].trim();
    const lead = leadMatch ? leadMatch[1].trim() : '';

    const chipsHtml = p.chips.map(chip => `          <div class="page-hero__chip">
            <svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-check"></use></svg>
            <span>${chip}</span>
          </div>`).join('\n');

    const newHeroBlock = `    <!-- Section 1: Cinematic Subpage Hero Banner -->
    <section class="page-hero ${p.heroClass}" aria-label="${p.badge}">
      <div class="container">
        ${breadcrumbInner ? `<nav class="breadcrumb" aria-label="Breadcrumbs">\n          ${breadcrumbInner}\n        </nav>` : ''}

        <div class="page-hero__badge">
          <div class="badge--saas-pulse">
            <span class="badge-pulse-dot"><span class="badge-pulse-dot__ping"></span><span class="badge-pulse-dot__core"></span></span>
            <span>${p.badge}</span>
          </div>
        </div>
        <h1 class="display-title page-hero__title">
          ${title}
        </h1>
        <p class="lead page-hero__lead">
          ${lead}
        </p>
        <div class="page-hero__chips">
${chipsHtml}
        </div>
      </div>
    </section>`;

    const mainStart = content.indexOf('<main id="main-content"');
    if (mainStart !== -1) {
      const sectionEnd = content.indexOf('</section>', mainStart);
      if (sectionEnd !== -1) {
        const fullOldHero = content.substring(mainStart, sectionEnd + 10);
        const mainTagMatch = content.match(/<main id="main-content"[^>]*>/);
        const mainTag = mainTagMatch ? mainTagMatch[0] : '<main id="main-content" role="main">';
        
        const replacement = `${mainTag}\n\n${newHeroBlock}`;
        content = content.replace(fullOldHero, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log('Successfully upgraded ' + p.file);
      }
    }
  }
});

console.log('Total pages upgraded with page-hero:', updatedCount);
