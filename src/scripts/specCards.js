/**
 * Interactive SaaS Telemetry & Specification Cards
 * Handles tactile spring toggles, ARIA accessibility,
 * and smooth grid height transitions with zero layout jank.
 */

export function initSpecCards() {
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.card-telemetry-spec__toggle-btn');
    if (!toggleBtn) return;

    const card = toggleBtn.closest('.card-telemetry-spec');
    if (!card) return;

    const isExpanded = card.classList.contains('is-expanded');
    const labelSpan = toggleBtn.querySelector('span');

    if (isExpanded) {
      card.classList.remove('is-expanded');
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (labelSpan) labelSpan.textContent = 'View Technical Specs';
    } else {
      // Collapse other open cards in the same grid so only the selected card extends
      const parentGrid = card.closest('.grid') || card.parentElement;
      if (parentGrid) {
        const openSiblings = parentGrid.querySelectorAll('.card-telemetry-spec.is-expanded');
        openSiblings.forEach((sibling) => {
          if (sibling !== card) {
            sibling.classList.remove('is-expanded');
            const sibBtn = sibling.querySelector('.card-telemetry-spec__toggle-btn');
            if (sibBtn) {
              sibBtn.setAttribute('aria-expanded', 'false');
              const sibSpan = sibBtn.querySelector('span');
              if (sibSpan) sibSpan.textContent = 'View Technical Specs';
            }
          }
        });
      }

      card.classList.add('is-expanded');
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (labelSpan) labelSpan.textContent = 'Hide Specs';
    }
  });
}
