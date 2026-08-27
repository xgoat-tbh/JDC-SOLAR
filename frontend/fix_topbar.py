import os
import re

files = [
    'about/index.html',
    'contact/index.html',
    'pm-surya-ghar/index.html',
    'solar-calculator/index.html',
    'projects/index.html',
    'services/index.html',
    'services/residential-solar/index.html',
    'services/commercial-solar/index.html',
    'services/industrial-solar/index.html',
    'services/institutional-solar/index.html',
    'services/government-solar/index.html',
    'services/street-lights/index.html',
    'services/solar-parks/index.html',
    'resources/index.html',
    'resources/how-solar-rooftop-works/index.html',
    'resources/commercial-solar-tax-benefits/index.html',
    'resources/solar-maintenance-guide/index.html'
]

base_dir = 'd:/JDC solar/frontend'

old_pattern = r'<div class="header-topbar__trust-badge">\s*<span>☀️ A Jagatdhan Commodities Pvt\. Ltd\. Company</span>\s*<span>•</span>\s*<span>Jharkhand\'s Premier Solar EPC Partner</span>\s*</div>\s*<div class="flex gap-md">\s*<a href="tel:\+919234611112">📞 \+91 92346 11112</a>\s*<a href="mailto:sales@jdcsolar\.com">✉️ sales@jdcsolar\.com</a>\s*</div>'

new_pattern = '''<div class="header-topbar__trust-badge">
        <svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-sun"></use></svg>
        <span>A Jagatdhan Commodities Pvt. Ltd. Company</span>
        <span>•</span>
        <span>Jharkhand's Premier Solar EPC Partner</span>
      </div>
      <div class="flex gap-md">
        <a href="tel:+919234611112" style="display: inline-flex; align-items: center; gap: 6px;">
          <svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg>
          <span>+91 92346 11112</span>
        </a>
        <a href="mailto:sales@jdcsolar.com" style="display: inline-flex; align-items: center; gap: 6px;">
          <svg class="icon" style="width: 14px; height: 14px; color: var(--color-brand-accent);" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-email"></use></svg>
          <span>sales@jdcsolar.com</span>
        </a>
      </div>'''

count = 0
for f in files:
    path = os.path.join(base_dir, f)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        new_content, num_subs = re.subn(old_pattern, new_pattern, content)
        if num_subs > 0:
            with open(path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            count += 1
            print(f'Fixed topbar in {f}')
        else:
            print(f'Pattern not found in {f}')
    else:
        print(f'File not found: {f}')

print(f'Total files updated: {count}')
