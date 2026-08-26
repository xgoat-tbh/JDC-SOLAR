/**
 * JDC SOLAR 2.0 - GLOBAL APPLICATION CONFIGURATION
 */

export const APP_CONFIG = Object.freeze({
  brandName: 'JDC Solar',
  parentEntity: 'Jagatdhan Commodities Pvt. Ltd.',
  canonicalUrl: 'https://jdcsolar.com',
  
  // Primary Telephony & Communication Channels
  contact: {
    primaryPhoneDisplay: '+91 92346 11112',
    primaryPhoneE164: '+919234611112',
    whatsappNumber: '919288381112',
    salesEmail: 'sales@jdcsolar.com',
    infoEmail: 'info@jdcsolar.com',
    headquartersAddress: 'A-21, 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109'
  },

  // Calculator Benchmark Constants
  calculator: {
    defaultState: 'Jharkhand',
    defaultCostPerKw: 55000,
    dailyUnitsPerKw: 4.0,
    monthlyUnitsPerKw: 120,
    sqFtPerKw: 100,
    sqMetersPerKw: 9.29,
    co2TonsPerKwYear: 1.2,
    treesPlantedPerKwYear: 28,
    maxResidentialSubsidy: 78000
  },

  // Form & Lead Generation
  forms: {
    honeypotFieldName: 'b_url',
    minPhoneDigits: 10
  }
});
