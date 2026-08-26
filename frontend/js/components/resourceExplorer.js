/**
 * JDC SOLAR 2.0 - RESOURCE & FAQ EXPLORER CONTROLLER
 * Pure ES6 client-side category filtering and search controller for educational resources and FAQs
 */

import { qs, qsa } from '../core/dom.js';

export function initResourceExplorer() {
  const filterPills = qsa('.resource-filter-pill');
  const resourceCards = qsa('.card-resource');
  const searchInput = qs('#resource-search-input');
  const emptyState = qs('#resources-empty-state');
  const countBadge = qs('#resource-count-badge');
  const resetButton = qs('#reset-resource-filters');

  if (!resourceCards.length) return;

  let activeCategory = 'all';
  let activeQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    resourceCards.forEach(card => {
      const category = card.dataset.category || '';
      const title = (card.querySelector('.card-resource__title')?.textContent || '').toLowerCase();
      const summary = (card.querySelector('.card-resource__summary')?.textContent || '').toLowerCase();

      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = !activeQuery || title.includes(activeQuery) || summary.includes(activeQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countBadge) {
      countBadge.textContent = `${visibleCount} ${visibleCount === 1 ? 'Guide' : 'Guides'}`;
    }

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.remove('hidden');
      } else {
        emptyState.classList.add('hidden');
      }
    }
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('filter-pill--active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('filter-pill--active');
      pill.setAttribute('aria-pressed', 'true');

      activeCategory = pill.dataset.filter || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeQuery = (e.target.value || '').trim().toLowerCase();
      applyFilters();
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      activeCategory = 'all';
      activeQuery = '';
      if (searchInput) searchInput.value = '';

      filterPills.forEach(p => {
        if (p.dataset.filter === 'all') {
          p.classList.add('filter-pill--active');
          p.setAttribute('aria-pressed', 'true');
        } else {
          p.classList.remove('filter-pill--active');
          p.setAttribute('aria-pressed', 'false');
        }
      });

      applyFilters();
    });
  }
}
