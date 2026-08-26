# JDC Solar 2.0: Developer & QA Testing Guide

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/TESTING-GUIDE.md`  
**Test Runner:** Pure Native Node.js ES Modules (Zero extra testing dependencies)  
**Last Updated:** August 2026  

---

## 1. Quick Start & Test Commands

### Run Master Automated Test Suite (All 4 Test Suites)
```bash
npm test
```
*Executes Calculator Engine (30 tests), Security & Secret Invariants (13 tests), Data Integrity (15 tests), and On-Page SEO (63 tests) — Total: 121 Automated Tests.*

### Run HTML5 Syntax & Landmark Validator (All 21 Files)
```bash
npm run lint:html
```

### Run Isolated Calculator Unit Tests
```bash
npm run test:calculator
```

### Run Isolated Security & Secret Scanning Tests
```bash
npm run test:security
```

### Start Local Development / Preview Server
```bash
npm run dev
```
*Starts native Node.js HTTP server on `http://localhost:3000` with clean MIME types.*
