export const APP_CONFIG = Object.freeze({
  brandName: 'JDC Solar',
  parentEntity: 'Jagatdhan Commodities Pvt. Ltd.',
  canonicalUrl: 'https://jdcsolar.com',
  
  contact: {
    primaryPhoneDisplay: '+91 92883 81112',
    primaryPhoneE164: '+919288381112',
    whatsappNumber: '919288381112',
    formspreeEndpoint: '',
    salesEmail: 'sales@jdcsolar.com',
    infoEmail: 'info@jdcsolar.com',
    headquartersAddress: 'A-21, 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109'
  },

  offices: [
    {
      state: 'Jharkhand',
      badge: 'Corporate HQ',
      isHQ: true,
      address: 'A-21 2nd Phase, Industrial Area, Adityapur, Jamshedpur, Jharkhand 832109',
      coverage: 'Jamshedpur, Ranchi, Dhanbad, Bokaro & State-wide EPC',
      mapsUrl: 'https://maps.google.com/?q=A-21+2nd+Phase+Industrial+Area+Adityapur+Jamshedpur+Jharkhand+832109'
    },
    {
      state: 'West Bengal',
      badge: 'Regional Branch',
      isHQ: false,
      address: 'A/52/1, Baghajatin Colony, Near I block more, Kolkata - 700092',
      coverage: 'Greater Kolkata, Howrah, Durgapur, Asansol & South Bengal',
      mapsUrl: 'https://maps.google.com/?q=A/52/1+Baghajatin+Colony+Near+I+block+more+Kolkata+700092'
    },
    {
      state: 'Odisha',
      badge: 'Regional Branch',
      isHQ: false,
      address: 'New Capital Bhubaneswar, Near Siv Temple, Naharakanta, Khordha, Bhubaneswar, Odisha 752101',
      coverage: 'Bhubaneswar, Cuttack, Rourkela, Khordha & Coastal Belt',
      mapsUrl: 'https://maps.google.com/?q=Naharakanta+Khordha+Bhubaneswar+Odisha+752101'
    }
  ],

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

  forms: {
    honeypotFieldName: 'b_url',
    minPhoneDigits: 10
  }
});
