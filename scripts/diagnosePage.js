import { auditUrl } from './auditMobilePerformance.js';

const res = await auditUrl('http://localhost:3000/solar-calculator/');
console.log('Results:', JSON.stringify(res, null, 2));
