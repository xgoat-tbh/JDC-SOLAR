const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0
});

export function formatINR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹ 0';
  return inrFormatter.format(amount);
}

export function formatNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  return numberFormatter.format(num);
}

export function formatCapacity(kw) {
  if (typeof kw !== 'number' || isNaN(kw)) return '0 kW';
  if (kw >= 1000) {
    return `${(kw / 1000).toFixed(1)} MW`;
  }
  return `${kw} kW`;
}
