import os
import re

base_dir = 'd:/JDC solar/frontend'

# Task 1: Fix topbar across 17 files
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

print(f'Total topbar files updated: {count}')

# Task 2: Fix 404.html
p_404 = os.path.join(base_dir, '404.html')
if os.path.exists(p_404):
    with open(p_404, 'r', encoding='utf-8') as file:
        content_404 = file.read()
    
    # Replace raw emoji 📞 with SVG icon
    # Need to match "<a href="tel:+919234611112" class="btn btn--secondary">📞 Call Support</a>" 
    # Or just "📞 " with the SVG icon if we can't be sure
    old_call = r'📞 Call Support'
    new_call = r'<svg class="icon" style="width: 16px; height: 16px; margin-right: 8px; margin-bottom: -2px;" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-phone"></use></svg>Call Support'
    
    content_404 = re.sub(old_call, new_call, content_404)
    
    # Add Google Fonts preconnect links in <head>
    if 'fonts.googleapis.com' not in content_404:
        head_end = content_404.find('</head>')
        if head_end != -1:
            fonts = """
  <!-- Professional SaaS Typography (Plus Jakarta Sans + Inter) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
"""
            content_404 = content_404[:head_end] + fonts + content_404[head_end:]
    
    with open(p_404, 'w', encoding='utf-8') as file:
        file.write(content_404)
    print("Fixed 404.html")

# Task 3: Fix privacy-policy/index.html
p_priv = os.path.join(base_dir, 'privacy-policy/index.html')
if os.path.exists(p_priv):
    with open(p_priv, 'r', encoding='utf-8') as file:
        content_priv = file.read()
        
    if '<script type="module" src="/js/main.js"></script>' not in content_priv:
        content_priv = content_priv.replace('</body>', '  <script type="module" src="/js/main.js"></script>\n</body>')
        with open(p_priv, 'w', encoding='utf-8') as file:
            file.write(content_priv)
        print("Fixed privacy-policy/index.html")
