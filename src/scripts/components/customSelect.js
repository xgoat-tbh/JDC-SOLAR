export function initCustomSelects() {
  const selects = document.querySelectorAll('select.form-select, select#calc-state, select#contact-service');
  selects.forEach(select => {
    
    if (select.dataset.customized === 'true') return;
    select.dataset.customized = 'true';

    buildCustomSelect(select);
  });

  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-wrap')) {
      closeAllCustomSelects();
    }
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllCustomSelects();
    }
  });
}

function buildCustomSelect(nativeSelect) {
  
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-select-wrap';

  
  nativeSelect.classList.add('sr-only-select');
  nativeSelect.tabIndex = -1;
  nativeSelect.setAttribute('aria-hidden', 'true');

  
  nativeSelect.parentNode.insertBefore(wrapper, nativeSelect);
  wrapper.appendChild(nativeSelect);

  
  const selectedOption = nativeSelect.options[nativeSelect.selectedIndex] || nativeSelect.options[0];
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'custom-select-trigger';
  trigger.setAttribute('role', 'combobox');
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-label', nativeSelect.getAttribute('aria-label') || 'Select option');

  const triggerLabel = document.createElement('span');
  triggerLabel.className = 'custom-select-label';
  triggerLabel.textContent = selectedOption ? selectedOption.text : 'Select...';

  const chevronSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  chevronSvg.setAttribute('class', 'icon custom-select-chevron');
  chevronSvg.setAttribute('aria-hidden', 'true');
  chevronSvg.innerHTML = '<use href="/assets/icons/sprite.svg#icon-chevron-down"></use>';

  trigger.appendChild(triggerLabel);
  trigger.appendChild(chevronSvg);
  wrapper.appendChild(trigger);

  
  wrapper.setAttribute('data-lenis-prevent', 'true');

  const menu = document.createElement('div');
  menu.className = 'custom-select-menu';
  menu.setAttribute('role', 'listbox');
  menu.setAttribute('data-lenis-prevent', 'true');

  // Direct, smooth internal wheel scrolling whenever hovered
  menu.addEventListener('wheel', (e) => {
    e.stopPropagation();
    e.preventDefault();
    menu.scrollTop += e.deltaY;
  }, { passive: false });

  Array.from(nativeSelect.options).forEach((opt, idx) => {
    const optBtn = document.createElement('div');
    optBtn.className = 'custom-select-option';
    optBtn.setAttribute('role', 'option');
    optBtn.setAttribute('data-value', opt.value);
    optBtn.setAttribute('tabindex', '-1');

    if (opt.selected) {
      optBtn.classList.add('is-selected');
      optBtn.setAttribute('aria-selected', 'true');
    }

    const optText = document.createElement('span');
    optText.textContent = opt.text;
    optBtn.appendChild(optText);

    
    const checkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    checkIcon.setAttribute('class', 'icon custom-select-check');
    checkIcon.setAttribute('aria-hidden', 'true');
    checkIcon.innerHTML = '<use href="/assets/icons/sprite.svg#icon-check"></use>';
    optBtn.appendChild(checkIcon);

    
    optBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectOption(nativeSelect, wrapper, trigger, triggerLabel, menu, opt.value, opt.text);
    });

    menu.appendChild(optBtn);
  });

  wrapper.appendChild(menu);

  
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = wrapper.classList.contains('is-open');
    closeAllCustomSelects();
    if (!isOpen) {
      openCustomSelect(wrapper, trigger);
    }
  });

  
  trigger.addEventListener('keydown', (e) => {
    const options = Array.from(menu.querySelectorAll('.custom-select-option'));
    let activeIdx = options.findIndex(o => o.classList.contains('is-focused') || o.classList.contains('is-selected'));

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!wrapper.classList.contains('is-open')) {
        openCustomSelect(wrapper, trigger);
      } else {
        if (e.key === 'ArrowDown') {
          activeIdx = (activeIdx + 1) % options.length;
        } else {
          activeIdx = (activeIdx - 1 + options.length) % options.length;
        }
        focusOption(menu, options, activeIdx);
      }
    } else if ((e.key === 'Enter' || e.key === ' ') && wrapper.classList.contains('is-open')) {
      e.preventDefault();
      const focused = menu.querySelector('.custom-select-option.is-focused') || menu.querySelector('.custom-select-option.is-selected');
      if (focused) {
        focused.click();
      }
    }
  });

  
  nativeSelect.addEventListener('change', () => {
    const currentOpt = nativeSelect.options[nativeSelect.selectedIndex];
    if (currentOpt && triggerLabel.textContent !== currentOpt.text) {
      triggerLabel.textContent = currentOpt.text;
      menu.querySelectorAll('.custom-select-option').forEach(o => {
        const isMatch = o.getAttribute('data-value') === currentOpt.value;
        o.classList.toggle('is-selected', isMatch);
        o.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
    }
  });
}

function scrollOptionIntoMenu(menu, option) {
  if (!menu || !option) return;
  const menuRect = menu.getBoundingClientRect();
  const optRect = option.getBoundingClientRect();
  if (optRect.top < menuRect.top) {
    menu.scrollTop -= (menuRect.top - optRect.top + 6);
  } else if (optRect.bottom > menuRect.bottom) {
    menu.scrollTop += (optRect.bottom - menuRect.bottom + 6);
  }
}

function openCustomSelect(wrapper, trigger) {
  const menu = wrapper.querySelector('.custom-select-menu');
  if (!menu) return;

  // Calculate boundary relative to nearest modal or viewport
  const triggerRect = trigger.getBoundingClientRect();
  const modal = wrapper.closest('.modal-dialog');
  const modalBody = wrapper.closest('.modal-dialog__body') || modal;
  
  const boundaryBottom = modalBody ? modalBody.getBoundingClientRect().bottom : window.innerHeight;
  const boundaryTop = modalBody ? modalBody.getBoundingClientRect().top : 0;

  const spaceBelow = boundaryBottom - triggerRect.bottom;
  const spaceAbove = triggerRect.top - boundaryTop;

  // If space below is limited (< 220px) and space above has more room, drop upwards!
  if (spaceBelow < 220 && spaceAbove > spaceBelow) {
    wrapper.classList.add('is-dropup');
    menu.style.maxHeight = `${Math.min(240, Math.max(120, spaceAbove - 16))}px`;
  } else {
    wrapper.classList.remove('is-dropup');
    menu.style.maxHeight = `${Math.min(240, Math.max(120, spaceBelow - 16))}px`;
  }

  wrapper.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');

  if (modal) {
    modal.classList.add('has-select-open');
  }

  // Scroll active option using menu.scrollTop directly (never scroll parent modal!)
  const selected = menu.querySelector('.custom-select-option.is-selected');
  if (selected) {
    scrollOptionIntoMenu(menu, selected);
  }
}

function closeAllCustomSelects() {
  document.querySelectorAll('.custom-select-wrap.is-open').forEach(w => {
    w.classList.remove('is-open');
    w.classList.remove('is-dropup');
    const trigger = w.querySelector('.custom-select-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });

  document.querySelectorAll('.modal-dialog.has-select-open').forEach(m => {
    m.classList.remove('has-select-open');
  });
}

function focusOption(menu, options, index) {
  options.forEach((opt, idx) => {
    if (idx === index) {
      opt.classList.add('is-focused');
      scrollOptionIntoMenu(menu, opt);
    } else {
      opt.classList.remove('is-focused');
    }
  });
}

function selectOption(nativeSelect, wrapper, trigger, labelEl, menu, value, text) {
  labelEl.textContent = text;
  nativeSelect.value = value;

  
  menu.querySelectorAll('.custom-select-option').forEach(o => {
    const isSel = o.getAttribute('data-value') === value;
    o.classList.toggle('is-selected', isSel);
    o.classList.remove('is-focused');
    o.setAttribute('aria-selected', isSel ? 'true' : 'false');
  });

  closeAllCustomSelects();
  trigger.focus();

  
  nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
  nativeSelect.dispatchEvent(new Event('input', { bubbles: true }));
}
