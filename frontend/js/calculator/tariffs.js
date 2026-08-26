/**
 * JDC SOLAR 2.0 - STATE ELECTRICITY TARIFF MATRIX
 */

export const TARIFF_MATRIX = Object.freeze({
  'Jharkhand': { domestic: 6.50, commercial: 8.50, industrial: 8.00 },
  'Bihar': { domestic: 7.00, commercial: 8.80, industrial: 8.20 },
  'West Bengal': { domestic: 7.20, commercial: 9.20, industrial: 8.50 },
  'Odisha': { domestic: 6.00, commercial: 8.00, industrial: 7.50 },
  'Uttar Pradesh': { domestic: 7.00, commercial: 9.00, industrial: 8.40 },
  'Delhi': { domestic: 6.50, commercial: 9.50, industrial: 8.80 },
  'Maharashtra': { domestic: 8.50, commercial: 11.50, industrial: 10.00 },
  'Rajasthan': { domestic: 7.50, commercial: 9.50, industrial: 8.50 },
  'Gujarat': { domestic: 6.20, commercial: 8.20, industrial: 7.80 },
  'Karnataka': { domestic: 7.80, commercial: 9.80, industrial: 8.60 },
  'Tamil Nadu': { domestic: 6.80, commercial: 9.20, industrial: 8.20 },
  'Telangana': { domestic: 7.20, commercial: 9.60, industrial: 8.40 },
  'Andhra Pradesh': { domestic: 7.00, commercial: 9.40, industrial: 8.20 },
  'Chhattisgarh': { domestic: 6.20, commercial: 8.40, industrial: 7.60 },
  'Assam': { domestic: 7.20, commercial: 9.00, industrial: 8.00 },
  'Other States': { domestic: 7.00, commercial: 9.00, industrial: 8.20 }
});

/**
 * Get tariff rate per kWh for a given state and service type
 * @param {string} state 
 * @param {string} serviceType 
 * @returns {number}
 */
export function getTariffRate(state = 'Jharkhand', serviceType = 'residential') {
  const stateData = TARIFF_MATRIX[state] || TARIFF_MATRIX['Jharkhand'];
  
  if (serviceType === 'commercial') {
    return stateData.commercial;
  }
  if (serviceType === 'industrial') {
    return stateData.industrial;
  }
  return stateData.domestic;
}
