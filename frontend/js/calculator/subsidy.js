/**
 * JDC SOLAR 2.0 - PM SURYA GHAR SUBSIDY ENGINE
 * Implements official Government of India central subsidy slabs
 */

/**
 * Calculate official PM Surya Ghar Central Subsidy Amount
 * @param {number} systemSizeKw 
 * @param {string} serviceType 
 * @returns {number} Subsidy amount in INR (₹)
 */
export function getSubsidyAmount(systemSizeKw, serviceType = 'residential') {
  // Commercial and Industrial installations receive zero direct subsidy
  if (serviceType !== 'residential' || systemSizeKw <= 0) {
    return 0;
  }

  // Official PM Surya Ghar: Muft Bijli Yojana Central Slabs
  if (systemSizeKw <= 1.0) {
    return 30000; // ₹30,000 for 1 kW
  }
  if (systemSizeKw <= 2.0) {
    return 60000; // ₹60,000 for 2 kW
  }
  
  // 3 kW to 10 kW+ (Capped at ₹78,000 for residential individual connection)
  return 78000;
}
