# JDC Solar 2.0: Subsidy Content Maintenance & Periodic Review Protocol

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/SUBSIDY-MAINTENANCE.md`  
**Governing Scheme:** PM Surya Ghar: Muft Bijli Yojana (MNRE)  
**Review Frequency:** Quarterly (Every 90 Days)  
**Last Updated:** August 2026  

---

## 1. Maintenance & Review Cadence

Because central and state solar subsidy schemes are subject to annual budgetary updates and regulatory revisions by the Ministry of New and Renewable Energy (MNRE) and the Jharkhand State Electricity Regulatory Commission (JSERC), the following periodic maintenance protocol is established:

1. **Quarterly Audit:** Every 90 days, the Lead Content Architect shall inspect `https://pmsuryaghar.gov.in/` and `https://jbvnl.co.in/` for any changes to central financial assistance slabs, state top-ups, or net-metering thresholds.
2. **Centralized Data Update:** Any updated subsidy amounts or DISCOM tariff rates must be edited exclusively inside `frontend/data/subsidies.json` and `frontend/js/calculator/subsidy.js` (Single Source of Truth).
3. **Visible Timestamp Update:** The visible "Last Verified" date in `frontend/pm-surya-ghar/index.html` and `frontend/solar-calculator/index.html` shall be updated to reflect the new audit date.

---

## 2. Scheme Lifecycle & Policy Change Checklist

When MNRE or JBVNL updates a subsidy scheme or issues a new gazette notification:
- [ ] Verify notification authenticity on official `.gov.in` portal.
- [ ] Record notification number, date, and verified parameters in `docs/SUBSIDY-SOURCE-REGISTER.md`.
- [ ] Update `frontend/data/subsidies.json` residential slabs and RWA thresholds.
- [ ] Run test suite (`npm test`) to ensure unit tests validate new thresholds.
- [ ] If an older scheme expires, archive older details in `docs/archive/` and update user-facing text with current scheme names.
