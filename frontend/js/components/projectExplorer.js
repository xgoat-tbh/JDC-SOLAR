/**
 * JDC SOLAR 2.0 - PROJECT EXPLORER COMPONENT CONTROLLER
 * Handles client-side filtering, category pills, URL query synchronization, empty states, and case study detail modal.
 */

import { $, $$ } from '../core/dom.js';

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

  // Read URL query parameter if present
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || urlParams.get('type') || 'all';

  function applyFilter(category, updateUrl = true) {
    activeCategory = category.toLowerCase();
    let visibleCount = 0;

    // Update active filter pill styling and ARIA
    filterButtons.forEach(btn => {
      const btnCategory = (btn.dataset.filter || 'all').toLowerCase();
      const isActive = btnCategory === activeCategory;
      btn.classList.toggle('filter-pill--active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Filter project cards
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

    // Update results count indicator
    if (countBadge) {
      countBadge.textContent = `${visibleCount} Project${visibleCount === 1 ? '' : 's'}`;
    }

    // Toggle empty state
    if (emptyState) {
      emptyState.classList.toggle('hidden', visibleCount > 0);
    }

    // Update URL query parameter
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

  // Bind filter button click events
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter || 'all';
      applyFilter(category);
    });
  });

  // Bind "Reset Filters" button in empty state
  const resetBtn = $('#reset-project-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      applyFilter('all');
    });
  }

  // Initial filter application
  applyFilter(initialCategory, false);

  // Setup Case Study Detail Modal Interaction
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

    // Fetch projects data for rich modal population
    let projectsData = [];
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        projectsData = data.projects || [];
        
        // Check if direct deep link to case study exists in URL hash
        const hash = window.location.hash;
        if (hash && hash.startsWith('#project-')) {
          const slug = hash.replace('#project-', '');
          openCaseStudyBySlug(slug);
        }
      })
      .catch(() => {
        // Fallback gracefully
      });

    function openCaseStudyBySlug(slug) {
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

      if (typeof caseStudyModal.showModal === 'function') {
        caseStudyModal.showModal();
        window.history.replaceState({}, '', `#project-${project.slug}`);
      }
    }

    // Bind click on case study buttons inside cards
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-case-study-slug]');
      if (trigger) {
        e.preventDefault();
        const slug = trigger.dataset.caseStudySlug;
        openCaseStudyBySlug(slug);
      }
    });

    // Clear hash on modal close
    caseStudyModal.addEventListener('close', () => {
      if (window.location.hash.startsWith('#project-')) {
        history.replaceState({}, '', window.location.pathname + window.location.search);
      }
    });
  }
}
