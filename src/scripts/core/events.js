export function on(root, eventType, selector, handler) {
  root.addEventListener(eventType, (e) => {
    const target = e.target.closest(selector);
    if (target && root.contains(target)) {
      handler.call(target, e, target);
    }
  });
}

export function debounce(fn, delay = 250) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

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
