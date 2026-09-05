export function qs(selector, scope = document) {
  if (!scope || typeof scope.querySelector !== 'function') return null;
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  if (!scope || typeof scope.querySelectorAll !== 'function') return [];
  return Array.from(scope.querySelectorAll(selector));
}

export const $ = qs;
export const $$ = qsa;

export function sanitizeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  
  Object.entries(attrs).forEach(([key, val]) => {
    if (key === 'className' || key === 'class') {
      el.className = val;
    } else if (key.startsWith('data-') || key.startsWith('aria-')) {
      el.setAttribute(key, val);
    } else if (key in el) {
      el[key] = val;
    } else {
      el.setAttribute(key, val);
    }
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });

  return el;
}

export function setAttributes(el, attrs = {}) {
  if (!el) return;
  Object.entries(attrs).forEach(([key, val]) => {
    el.setAttribute(key, val);
  });
}
