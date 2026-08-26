/**
 * JDC SOLAR 2.0 - DATA & CURRENCY FORMATTERS
 * Standards-based Indian currency (₹ INR), units, and numerical formatters
 */

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0
});

/**
 * Format number as Indian Rupees (e.g. ₹ 78,000)
 * @param {number} amount 
 * @returns {string}
 */
export function formatINR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹ 0';
  return inrFormatter.format(amount);
}

/**
 * Format standard number with Indian comma grouping (e.g. 25,000)
 * @param {number} num 
 * @returns {string}
 */
export function formatNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  return numberFormatter.format(num);
}

/**
 * Format system capacity in kWp / MWp
 * @param {number} kw 
 * @returns {string}
 */
export function formatCapacity(kw) {
  if (typeof kw !== 'number' || isNaN(kw)) return '0 kW';
  if (kw >= 1000) {
    return `${(kw / 1000).toFixed(1)} MW`;
  }
  return `${kw} kW`;
}
