/**
 * JDC SOLAR 2.0 - WHATSAPP QUOTATION GENERATOR
 * Builds pre-populated, structured WhatsApp message payloads for instant lead capture
 */

import { APP_CONFIG } from '../config.js';
import { formatINR } from '../core/formatters.js';

/**
 * Generate formatted WhatsApp link with pre-populated calculation quote
 * @param {Object} calculationResult 
 * @param {Object} [userInfo]
 * @param {string} [userInfo.name]
 * @param {string} [userInfo.city]
 * @returns {string} WhatsApp URL string
 */
export function generateWhatsAppQuoteURI(calculationResult, userInfo = {}) {
  if (!calculationResult || !calculationResult.isValid) {
    return `https://wa.me/${APP_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent('Hello JDC Solar, I would like to inquire about solar panel installation for my property.')}`;
  }

  const { inputs, outputs } = calculationResult;
  const name = userInfo.name || 'Website Visitor';
  const city = userInfo.city || inputs.state || 'Jharkhand';

  const messageText = `*New Solar Feasibility Inquiry — JDC Solar Website*

👤 *Client:* ${name}
📍 *Location:* ${city} (${inputs.state})
🏠 *Category:* ${inputs.serviceType.toUpperCase()}
⚡ *Monthly Consumption:* ${inputs.monthlyUnits} kWh (Units)

📊 *ESTIMATED SYSTEM DETAILS:*
• *Recommended Capacity:* ${outputs.systemSize} kWp
• *Rooftop Space Required:* ~${outputs.rooftopAreaSqFt} sq. ft
• *Gross Turnkey Cost:* ${formatINR(outputs.grossCost)}
• *PM Surya Ghar Subsidy:* ${outputs.subsidy > 0 ? formatINR(outputs.subsidy) : 'N/A (C&I Tax Benefit)'}
• *Net Estimated Outflow:* ${formatINR(outputs.netCost)}

💰 *ESTIMATED RETURNS:*
• *Annual Bill Savings:* ${formatINR(outputs.annualSavings)} / year
• *Estimated Payback:* ${outputs.paybackYears} Years

_Please connect me with a JDC Solar engineer to schedule a free rooftop site inspection._`;

  return `https://wa.me/${APP_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
}
