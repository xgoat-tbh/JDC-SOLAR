import { $, $$ } from '../core/dom.js';

function animateMetricValue(el, rawText) {
  if (!el || !rawText) return;
  const match = rawText.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    el.textContent = rawText;
    return;
  }
  const prefix = match[1];
  const numStr = match[2].replace(/,/g, '');
  const suffix = match[3];
  const targetNum = parseFloat(numStr);
  if (isNaN(targetNum)) {
    el.textContent = rawText;
    return;
  }

  const isDecimal = numStr.includes('.');
  const decimalPlaces = isDecimal ? (numStr.split('.')[1] || '').length : 0;
  const hasComma = match[2].includes(',');

  const duration = 480;
  let startTime = null;

  function update(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const currentNum = Math.max(0, targetNum * ease);

    let formattedNum = isDecimal ? currentNum.toFixed(decimalPlaces) : Math.round(currentNum);
    if (hasComma) {
      formattedNum = parseFloat(formattedNum).toLocaleString('en-IN');
    }

    el.textContent = `${prefix}${formattedNum}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = rawText;
    }
  }

  // Delay 50ms so modal layout is fully stable before counter rolls
  setTimeout(() => {
    requestAnimationFrame(update);
  }, 50);
}

export function initProjectExplorer() {
  const filterContainer = $('.project-filters');
  const projectGrid = $('#projects-grid');
  const emptyState = $('#projects-empty-state');
  const countBadge = $('#project-count-badge');
  const caseStudyModal = $('#case-study-modal');

  if (!projectGrid) return;

  const projectCards = $$('.card-project', projectGrid);
  const filterButtons = $$('.filter-pill', filterContainer);

  let activeCategory = 'all';

  
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || urlParams.get('type') || 'all';

  function applyFilter(category, updateUrl = true) {
    activeCategory = category.toLowerCase();
    let visibleCount = 0;

    
    filterButtons.forEach(btn => {
      const btnCategory = (btn.dataset.filter || 'all').toLowerCase();
      const isActive = btnCategory === activeCategory;
      btn.classList.toggle('filter-pill--active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    
    projectCards.forEach(card => {
      const cardCategory = (card.dataset.category || '').toLowerCase();
      const isVisible = activeCategory === 'all' || cardCategory === activeCategory || (activeCategory === 'commercial' && (cardCategory === 'commercial' || cardCategory === 'industrial'));
      
      if (isVisible) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    
    if (countBadge) {
      countBadge.textContent = `${visibleCount} Project${visibleCount === 1 ? '' : 's'}`;
    }

    
    if (emptyState) {
      emptyState.classList.toggle('hidden', visibleCount > 0);
    }

    
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (activeCategory === 'all') {
        url.searchParams.delete('category');
        url.searchParams.delete('type');
      } else {
        url.searchParams.set('category', activeCategory);
      }
      window.history.replaceState({}, '', url.toString());
    }
  }

  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter || 'all';
      applyFilter(category);
    });
  });

  
  const resetBtn = $('#reset-project-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      applyFilter('all');
    });
  }

  
  applyFilter(initialCategory, false);

  
  if (caseStudyModal) {
    const modalTitle = $('#case-study-title', caseStudyModal);
    const modalLocation = $('#case-study-location', caseStudyModal);
    const modalBadge = $('#case-study-badge', caseStudyModal);
    const modalDesc = $('#case-study-desc', caseStudyModal);
    const modalCapacity = $('#case-study-capacity', caseStudyModal);
    const modalSavings = $('#case-study-savings', caseStudyModal);
    const modalGeneration = $('#case-study-generation', caseStudyModal);
    const modalPayback = $('#case-study-payback', caseStudyModal);
    const modalPanels = $('#case-study-panels', caseStudyModal);
    const modalInverters = $('#case-study-inverters', caseStudyModal);
    const modalGrid = $('#case-study-grid', caseStudyModal);
    const modalServiceLink = $('#case-study-service-link', caseStudyModal);

    
    let pendingSlug = null;
    let projectsData = [];
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        projectsData = data.projects || [];
        
        const hash = window.location.hash;
        if (hash && hash.startsWith('#project-')) {
          const slug = hash.replace('#project-', '');
          openCaseStudyBySlug(slug);
        } else if (pendingSlug) {
          openCaseStudyBySlug(pendingSlug);
          pendingSlug = null;
        }
      })
      .catch(() => {
        
      });

    function openCaseStudyBySlug(slug) {
      if (!projectsData.length) {
        pendingSlug = slug;
        return;
      }

      const project = projectsData.find(p => p.slug === slug || p.id === slug);
      if (!project) return;

      if (modalTitle) modalTitle.textContent = project.title;
      if (modalLocation) modalLocation.textContent = project.location;
      if (modalBadge) modalBadge.textContent = project.categoryLabel || project.category;
      if (modalDesc) modalDesc.textContent = project.description;
      if (modalCapacity) modalCapacity.textContent = project.capacityDisplay;
      if (modalSavings) modalSavings.textContent = project.annualSavingsDisplay;
      if (modalGeneration) modalGeneration.textContent = `~${project.monthlyGenerationKwh.toLocaleString('en-IN')} kWh / month`;
      if (modalPayback) modalPayback.textContent = project.paybackYears;
      if (modalPanels) modalPanels.textContent = project.panelBrand;
      if (modalInverters) modalInverters.textContent = project.inverterBrand;
      if (modalGrid) modalGrid.textContent = project.gridConnection;
      if (modalServiceLink) {
        modalServiceLink.href = project.serviceSlug;
        modalServiceLink.textContent = `Explore ${project.categoryLabel || 'Related'} Service →`;
      }

      // Trigger High-End SaaS spring modal opening
      if (window.modalController) {
        window.modalController.open('case-study-modal');
      } else {
        caseStudyModal.style.display = 'flex';
        if (typeof caseStudyModal.showModal === 'function') {
          try {
            caseStudyModal.showModal();
          } catch (err) {
            caseStudyModal.setAttribute('open', '');
          }
        } else {
          caseStudyModal.setAttribute('open', '');
        }
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        if (window.__lenis) window.__lenis.stop();
      }

      // Smooth Telemetry Number Roll-Up Animation
      animateMetricValue(modalCapacity, project.capacityDisplay);
      animateMetricValue(modalSavings, project.annualSavingsDisplay);
      animateMetricValue(modalGeneration, `~${project.monthlyGenerationKwh.toLocaleString('en-IN')} kWh / month`);
      animateMetricValue(modalPayback, project.paybackYears);

      window.history.replaceState({}, '', `#project-${project.slug}`);
    }

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-case-study-slug]');
      if (trigger) {
        e.preventDefault();
        const slug = trigger.dataset.caseStudySlug;
        openCaseStudyBySlug(slug);
      }
    });

    caseStudyModal.addEventListener('close', () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      if (window.__lenis) window.__lenis.start();
      caseStudyModal.style.removeProperty('display');
      if (window.location.hash.startsWith('#project-')) {
        history.replaceState({}, '', window.location.pathname + window.location.search);
      }
    });
  }
}
