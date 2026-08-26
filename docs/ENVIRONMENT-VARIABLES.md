# JDC Solar 2.0: Environment Variables & Runtime Secrets Specification

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/ENVIRONMENT-VARIABLES.md`  
**Standard:** Zero Secrets in Client-Side Code · Static Deployment Hardened  
**Last Updated:** August 2026  

---

## 1. Environment Variable Architecture

In strict adherence to the static frontend architecture decision:
- **Zero Frontend Secrets:** No private API keys, SMTP credentials, or database tokens are baked into client-side bundles or repository commits.
- **Serverless Webhook Routing (Optional Future Lead Delivery):** If JDC configures an external lead webhook (e.g. Hostinger email relay or Zapier), the destination endpoint is configured server-side or via serverless function.

---

## 2. Environment Configuration Matrix

| Variable Name | Environment | Required? | Purpose | Example Placeholder |
| :--- | :---: | :---: | :--- | :--- |
| `NODE_ENV` | Build / CI | No | Node environment indicator | `production` |
| `PORT` | Local Dev | No | Local static preview server port | `3000` |
| `LEAD_WEBHOOK_URL` | Serverless Edge (Optional) | Optional | Secure webhook endpoint for routing survey bookings | `https://api.jdcsolar.com/leads` |
