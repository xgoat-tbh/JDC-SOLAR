export function getSubsidyAmount(systemSizeKw, serviceType = 'residential') {
  
  if (serviceType !== 'residential' || !Number.isFinite(systemSizeKw) || systemSizeKw <= 0) {
    return 0;
  }

  
  
  if (systemSizeKw <= 2.0) {
    return Math.round(systemSizeKw * 30000);
  }
  
  
  if (systemSizeKw < 3.0) {
    return Math.round(60000 + (systemSizeKw - 2.0) * 18000);
  }
  
  
  return 78000;
}
