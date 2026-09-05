import { qsa } from '../core/dom.js';

export function initAccordions() {
  const accordions = qsa('.accordion-item');
  if (!accordions.length) return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  accordions.forEach(item => {
    const summary = item.querySelector('.accordion-summary');
    const content = item.querySelector('.accordion-content');
    if (!summary || !content) return;

    summary.addEventListener('click', (e) => {
      e.preventDefault();

      if (prefersReducedMotion) {
        item.open = !item.open;
        return;
      }

      if (item.classList.contains('is-animating')) return;

      if (item.open) {
        closeAccordion(item, content);
      } else {
        
        const parentGroup = item.closest('.accordion-group[data-single-expand="true"]');
        if (parentGroup) {
          const siblings = qsa('.accordion-item', parentGroup);
          siblings.forEach(sibling => {
            if (sibling !== item && sibling.open) {
              const siblingContent = sibling.querySelector('.accordion-content');
              if (siblingContent) closeAccordion(sibling, siblingContent);
            }
          });
        }

        openAccordion(item, content);
      }
    });
  });
}

function openAccordion(item, content) {
  item.classList.add('is-animating');
  item.open = true;

  
  content.style.height = 'auto';
  content.style.overflow = 'hidden';
  const targetHeight = content.scrollHeight;

  const animation = content.animate([
    { height: '0px', opacity: 0, transform: 'translateY(-6px)' },
    { height: `${targetHeight}px`, opacity: 1, transform: 'translateY(0)' }
  ], {
    duration: 280,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
  });

  animation.onfinish = () => {
    item.classList.remove('is-animating');
    content.style.height = '';
    content.style.overflow = '';
  };
}

function closeAccordion(item, content) {
  item.classList.add('is-animating');
  content.style.overflow = 'hidden';
  const startHeight = content.scrollHeight;

  const animation = content.animate([
    { height: `${startHeight}px`, opacity: 1, transform: 'translateY(0)' },
    { height: '0px', opacity: 0, transform: 'translateY(-6px)' }
  ], {
    duration: 240,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
  });

  animation.onfinish = () => {
    item.open = false;
    item.classList.remove('is-animating');
    content.style.height = '';
    content.style.overflow = '';
  };
}
