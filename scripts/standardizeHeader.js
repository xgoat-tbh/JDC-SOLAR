import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = walk(path.join(__dirname, '../frontend'));

const targetServicesLink = `<a href="/services/" class="nav-desktop__link">
              Services
              <svg class="nav-chevron icon" aria-hidden="true">
                <use href="/assets/icons/sprite.svg#icon-chevron-down"></use>
              </svg>
            </a>`;

const targetDropdown = `<ul class="nav-desktop__dropdown" role="list">
              <li><a href="/services/residential-solar/" class="nav-desktop__dropdown-link"><span class="dropdown-icon"><svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-home"></use></svg></span><span>Residential Rooftop Solar</span></a></li>
              <li><a href="/services/commercial-solar/" class="nav-desktop__dropdown-link"><span class="dropdown-icon"><svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-building"></use></svg></span><span>Commercial & Industrial Solar</span></a></li>
              <li><a href="/services/institutional-solar/" class="nav-desktop__dropdown-link"><span class="dropdown-icon"><svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-hospital"></use></svg></span><span>Institutional Solar</span></a></li>
              <li><a href="/services/government-solar/" class="nav-desktop__dropdown-link"><span class="dropdown-icon"><svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-government"></use></svg></span><span>Government & Tender EPC</span></a></li>
              <li><a href="/services/street-lights/" class="nav-desktop__dropdown-link"><span class="dropdown-icon"><svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-lightbulb"></use></svg></span><span>Solar Street Lighting</span></a></li>
              <li><a href="/services/solar-parks/" class="nav-desktop__dropdown-link"><span class="dropdown-icon"><svg class="icon" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-solar-park"></use></svg></span><span>Utility Solar Parks</span></a></li>
            </ul>`;

let updatedCount = 0;
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  
  content = content.replace(/<a href="\/services\/" class="nav-desktop__link">[\s\S]*?<\/a>/g, targetServicesLink);

  
  content = content.replace(/<ul class="nav-desktop__dropdown" role="list">[\s\S]*?<\/ul>/g, targetDropdown);

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log('Updated header in:', path.relative(path.join(__dirname, '../frontend'), file));
  }
});

console.log(`Successfully standardized header in ${updatedCount} HTML files!`);
