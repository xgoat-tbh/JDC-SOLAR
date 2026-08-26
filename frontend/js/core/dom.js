/**
 * JDC SOLAR 2.0 - DOM UTILITIES
 * Defensive, lightweight helpers for querying, creating, and manipulating DOM nodes
 */

/**
 * Defensive querySelector wrapper
 * @param {string} selector 
 * @param {ParentNode} scope 
 * @returns {Element|null}
 */
export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

/**
 * Defensive querySelectorAll wrapper returning standard Array
 * @param {string} selector 
 * @param {ParentNode} scope 
 * @returns {Element[]}
 */
export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

// Aliases for convenience
export const $ = qs;
export const $$ = qsa;

/**
 * Sanitize string to prevent XSS injection
 * @param {string} str 
 * @returns {string}
 */
export function sanitizeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Create a DOM element with attributes and optional children
 * @param {string} tag 
 * @param {Object} attrs 
 * @param {Array<string|Node>} children 
 * @returns {HTMLElement}
 */
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

/**
 * Set multiple attributes on an element
 * @param {Element} el 
 * @param {Object} attrs 
 */
export function setAttributes(el, attrs = {}) {
  if (!el) return;
  Object.entries(attrs).forEach(([key, val]) => {
    el.setAttribute(key, val);
  });
}
