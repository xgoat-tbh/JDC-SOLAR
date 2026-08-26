/**
 * JDC SOLAR 2.0 - EVENT UTILITIES
 * Event delegation, debounce, and throttling utilities
 */

/**
 * Event delegation helper
 * @param {Element|Document} root 
 * @param {string} eventType 
 * @param {string} selector 
 * @param {Function} handler 
 */
export function on(root, eventType, selector, handler) {
  root.addEventListener(eventType, (e) => {
    const target = e.target.closest(selector);
    if (target && root.contains(target)) {
      handler.call(target, e, target);
    }
  });
}

/**
 * Debounce function execution
 * @param {Function} fn 
 * @param {number} delay 
 * @returns {Function}
 */
export function debounce(fn, delay = 250) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle function execution
 * @param {Function} fn 
 * @param {number} limit 
 * @returns {Function}
 */
export function throttle(fn, limit = 200) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
