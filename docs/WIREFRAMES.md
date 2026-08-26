# JDC Solar 2.0: Layout Wireframes & Structural Schematics

**Document Status:** RATIFIED / SOURCE OF TRUTH  
**File Path:** `docs/WIREFRAMES.md`  
**Scope:** Low & Mid-Fidelity Visual Wireframes Across Desktop and Mobile Viewports  
**Author:** Lead UI/UX Architect & Wireframe Specialist  
**Last Updated:** August 2026  

---

## 1. Global Navigation & Layout Wireframes

### 1.1 Desktop Header & Navigation Wireframe (`>= 1024px`)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [JDC SOLAR LOGO]       Home   About   Services [▾]   Projects   Calculator   PM Surya Ghar   Contact   │
│ [Smart Solar Sol.]                                    [ 📞 +91 9234611112 ]  [ Calculate Savings → ]   │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ (On Hover "Services [▾]")
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        ┌───────────────────────────────────────────────────────────┐                   │
│                        │ • Residential Rooftop Solar (PM Surya Ghar Subsidy)       │                   │
│                        │ • Commercial & Industrial Solar (High-Capacity Plants)    │                   │
│                        │ • Institutional Solar (Schools, Colleges, Hospitals)      │                   │
│                        │ • Government & PSU Rooftop Solar Solutions                │                   │
│                        │ • Solar Street Lighting Systems (All-in-One / Lithium)    │                   │
│                        │ • Utility-Scale Ground-Mounted Solar Parks                │                   │
│                        └───────────────────────────────────────────────────────────┘                   │
```

---

### 1.2 Mobile Navigation Drawer Wireframe (`< 1024px`)

```text
┌──────────────────────────────────────────────────┐
│ [JDC SOLAR LOGO]                            [ ✕ ] │
├──────────────────────────────────────────────────┤
│                                                  │
│   🏠 Home                                        │
│   🏢 About JDC Solar                             │
│   ⚡ Solar Services                           [▾]│
│      ├── Residential Rooftop (PM Surya Ghar)     │
│      ├── Commercial & Industrial Solar           │
│      ├── Institutional Solar (Healthcare/Campus) │
│      ├── Government & PSU Solar                  │
│      ├── Solar Street Lighting                   │
│      └── Utility-Scale Solar Parks               │
│   📁 Completed Projects & Case Studies           │
│   🧮 Solar Savings & Subsidy Calculator          │
│   🏛️ PM Surya Ghar Citizen's Guide               │
│   📞 Contact Us                                  │
│                                                  │
├──────────────────────────────────────────────────┤
│ [ 📞 Call: +91 9234611112 ]                      │
│ [ 💬 Chat on WhatsApp ]                          │
│                                                  │
│ 📍 A-21 2nd Phase, Adityapur Industrial Area,     │
│    Jamshedpur, Jharkhand 832109                  │
└──────────────────────────────────────────────────┘
```

---

### 1.3 Sticky Mobile Bottom Action Bar (`< 768px`)

```text
┌────────────────────────┬────────────────────────┬────────────────────────┐
│        [ 📞 ]          │        [ 💬 ]          │        [ 🧮 ]          │
│        Call Us         │        WhatsApp        │    Calculate Subsidy   │
│   (tel:+919234611112)  │  (wa.me/919288381112)  │   (/solar-calculator/) │
└────────────────────────┴────────────────────────┴────────────────────────┘
```

---

## 2. Page Template Wireframes

### 2.1 Homepage Wireframe (Desktop vs. Mobile)

#### Desktop Layout (`>= 1024px`)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [HEADER: Logo | Nav Links | Phone Dial | "Calculate Savings" CTA]                                      │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [HERO SECTION]                                                                                         │
│  [Badge: Jharkhand's Leading Solar EPC]                  ┌──────────────────────────────────────────┐  │
│  H1: Power Your Home & Business with Smart Solar Energy  │ [MINI CALCULATOR TEASER]                 │  │
│  Body: Slash electricity bills by 90% with ₹78,000       │ 📍 Select State: [ Jharkhand          ▾] │  │
│        PM Surya Ghar subsidy. Turnkey EPC solutions      │ ⚡ Monthly Bill: [ ₹ 3,000 / month     ] │  │
│        for residential and industrial plants.            │ ──────────────────────────────────────── │  │
│                                                          │ Estimated Size: 3.0 kWp                  │  │
│  [ Calculate Solar Savings → ]  [ 💬 Chat on WhatsApp ]  │ Estimated Subsidy: ₹78,000               │  │
│                                                          │ [ Calculate Full Savings & Subsidy → ]   │  │
│  [✔ 500+ Installations] [✔ 25+ MW Installed] [✔ Tier-1]  └──────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [CREDIBILITY PROOF BAR]                                                                                │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌───────────────────────────────────┐  │
│  │ 500+             │ │ 25+ MW           │ │ 90%              │ │ 25,000+ Tons                      │  │
│  │ Projects Done    │ │ Solar Installed  │ │ Bill Reduction   │ │ CO₂ Offset                        │  │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘ └───────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [PM SURYA GHAR SPOTLIGHT]                                                                              │
│  H2: Get Up to ₹78,000 Central Government Subsidy Under PM Surya Ghar                                  │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌─────────────────────────────────────────────┐  │
│  │ 1 kW System   │ │ 2 kW System   │ │ 3 kW System   │ │ 5 kW+ System                                │  │
│  │ ₹30,000 Sub.  │ │ ₹60,000 Sub.  │ │ ₹78,000 Sub.  │ │ ₹78,000 Fixed Max Central Subsidy           │  │
│  └───────────────┘ └───────────────┘ └───────────────┘ └─────────────────────────────────────────────┘  │
│  [ Claim Your PM Surya Ghar Subsidy → ]                                                                │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [6-PILLAR SOLAR SERVICES SHOWCASE]                                                                     │
│  H2: Smart Solar Solutions Designed for Every Need                                                     │
│  ┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────────────────────────────┐  │
│  │ 🏠 Residential Solar  │ │ 🏭 Commercial Solar   │ │ 🏥 Institutional Solar                        │  │
│  │ 1kW-10kW Rooftop      │ │ 20kW-1MW+ Rooftops    │ │ Schools & Hospitals                           │  │
│  │ Learn More →          │ │ Learn More →          │ │ Learn More →                                  │  │
│  ├───────────────────────┤ ├───────────────────────┤ ├───────────────────────────────────────────────┤  │
│  │ 🏛️ Government Solar   │ │ 💡 Solar Street Light │ │ ☀️ Utility Solar Parks                        │  │
│  │ Tender EPC Execution  │ │ All-in-One Lithium    │ │ MW Ground-Mounted                             │  │
│  │ Learn More →          │ │ Learn More →          │ │ Learn More →                                  │  │
│  └───────────────────────┘ └───────────────────────┘ └───────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [4-STEP INSTALLATION ROADMAP]                                                                          │
│  H2: How We Power Your Property in 4 Clear Steps                                                       │
│  [ 01: Site Assessment ] ──► [ 02: Custom Design ] ──► [ 03: Subsidy Approval ] ──► [ 04: Commission ] │
│  (Day 1-2)                   (Day 3-5)                 (Day 6-15)                   (Day 15-30)        │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [FEATURED CASE STUDIES]                                                                                │
│  H2: Proven Solar Execution Across Eastern India                                                       │
│  ┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────────────────────────────┐  │
│  │ [Image: 250kW Factory]│ │ [Image: 50kW Hospital]│ │ [Image: 5kW Residence]                        │  │
│  │ 250 kWp Rooftop Plant │ │ 50 kWp Rooftop Solar  │ │ 5 kWp Hybrid Solar                            │  │
│  │ Adityapur Ind. Area   │ │ Jamshedpur Campus     │ │ Morabadi, Ranchi                              │  │
│  └───────────────────────┘ └───────────────────────┘ └───────────────────────────────────────────────┘  │
│  [ Explore All Completed Projects → ]                                                                  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [CUSTOMER TESTIMONIALS CAROUSEL]                                                                       │
│  H2: Real Reviews from Real Solar Customers                                                            │
│  ┌─────────────────────────────────────────┐ ┌───────────────────────────────────────────────────────┐  │
│  │ ★★★★★ "The process was seamless..."     │ │ ★★★★★ "Reduced our factory electricity bills by 85%"  │  │
│  │ - Rajesh Sharma, Jamshedpur (5kW Solar) │ │ - A. K. Verma, MD Adityapur Auto (250kW Solar)        │  │
│  └─────────────────────────────────────────┘ └───────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [FAQ ACCORDION]                                                                                        │
│  H2: Frequently Asked Questions                                                                        │
│  [▾] How much can I save with rooftop solar under PM Surya Ghar?                                       │
│  [▾] What is the difference between On-Grid, Off-Grid, and Hybrid Solar?                               │
│  [▾] How long does net-metering approval take in Jharkhand (JBVNL)?                                    │
│  [▾] What warranty is provided on solar panels and inverters?                                          │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [BRAND PARTNERS LOGO TRACK: Waaree | Tata Power Solar | Adani | Growatt | Havells | Sungrow]           │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [PRE-FOOTER CTA: Ready to Slash Your Power Bill? | [Book Free Site Survey] [WhatsApp Us] ]             │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [GLOBAL FOOTER: Company Info | Services Links | Quick Tools | Registered Office NAP | Copyright]       │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Mobile Layout (`< 768px`)

```text
┌──────────────────────────────────────┐
│ [JDC LOGO]                     [ ☰ ] │
├──────────────────────────────────────┤
│ [HERO]                               │
│ [Jharkhand's Leading Solar EPC]      │
│ H1: Power Your Home & Business with  │
│     Smart Solar Energy               │
│ Body: Slash bills by 90% with        │
│       ₹78,000 PM Surya Ghar subsidy. │
│                                      │
│ [ Calculate Solar Savings → ]        │
│ [ 💬 Chat on WhatsApp ]              │
├──────────────────────────────────────┤
│ [MINI CALCULATOR TEASER CARD]        │
│ State: [ Jharkhand                ▾] │
│ Monthly Bill: [ ₹ 3,000 / mo       ] │
│ System Size: 3.0 kWp                 │
│ Subsidy: ₹78,000                     │
│ [ Full Savings Calculation → ]       │
├──────────────────────────────────────┤
│ [STATS GRID: 2x2]                    │
│ ┌────────────────┐ ┌───────────────┐ │
│ │ 500+ Projects  │ │ 25+ MW Cap.   │ │
│ ├────────────────┤ ├───────────────┤ │
│ │ 90% Bill Cut   │ │ 25k T CO₂     │ │
│ └────────────────┘ └───────────────┘ │
├──────────────────────────────────────┤
│ [PM SURYA GHAR CARDS: Stacked]       │
│ ┌──────────────────────────────────┐ │
│ │ 1 kW System -> ₹30,000 Subsidy   │ │
│ ├──────────────────────────────────┤ │
│ │ 2 kW System -> ₹60,000 Subsidy   │ │
│ ├──────────────────────────────────┤ │
│ │ 3 kW System -> ₹78,000 Subsidy   │ │
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│ [SERVICES: Stacked 1-Col Cards]      │
│ ┌──────────────────────────────────┐ │
│ │ 🏠 Residential Rooftop Solar     │ │
│ │ Learn More →                     │ │
│ └──────────────────────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │ 🏭 Commercial & Industrial Solar │ │
│ │ Learn More →                     │ │
│ └──────────────────────────────────┘ │
├──────────────────────────────────────┤
│ [TESTIMONIALS: 1-Slide Swipe Snap]   │
├──────────────────────────────────────┤
│ [FAQ ACCORDION: Touch Collapsible]   │
├──────────────────────────────────────┤
│ [PRE-FOOTER CTA]                     │
├──────────────────────────────────────┤
│ [FOOTER: Stacked Single-Column]      │
├──────────────────────────────────────┤
│ [STICKY MOBILE ACTION BAR]           │
│ [ 📞 Call ] [ 💬 WhatsApp ] [ 🧮 Calc]│
└──────────────────────────────────────┘
```

---

### 2.2 Solar Calculator Subsystem Wireframe (`/solar-calculator/`)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [HEADER]                                                                                               │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ H1: Solar Savings, Sizing & PM Surya Ghar Subsidy Calculator for India                                 │
│ Sub-heading: Estimate your optimal solar capacity, government subsidy, and 25-year financial returns.   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ ┌────────────────────────────────────────────────────┐ │
│ │ 🎛️ STEP 1: YOUR ENERGY DETAILS              │ │ 📊 STEP 2: ESTIMATED SYSTEM & SAVINGS SUMMARY      │ │
│ │                                             │ │                                                    │ │
│ │ 📍 Select Your State:                       │ │ ╔════════════════════════════════════════════════╗ │ │
│ │ [ Jharkhand (JBVNL / TSUISL)             ▾] │ │ ║ RECOMMENDED SYSTEM SIZE: 3.0 kWp               ║ │ │
│ │                                             │ │ ╚════════════════════════════════════════════════╝ │ │
│ │ 🏠 Select Property / Service Type:          │ │                                                    │ │
│ │ (•) Residential  ( ) Commercial  ( ) Industry│ │ • Required Rooftop Space: 300 sq. ft (28 sq. m)    │ │
│ │                                             │ │ • Estimated Monthly Generation: 360 kWh (Units)    │ │
│ │ ⚡ Calculation Input Mode:                   │ │ ────────────────────────────────────────────────── │ │
│ │ [ Monthly Units (kWh) ] [ Monthly Bill (₹) ]│ │ Gross Turnkey System Cost:        ₹ 1,65,000       │ │
│ │                                             │ │ PM Surya Ghar Central Subsidy:  - ₹   78,000 [GREEN]│ │
│ │ Enter Monthly Consumption:                  │ │ ────────────────────────────────────────────────── │ │
│ │ [ 360 kWh / month                         ] │ │ NET CUSTOMER INVESTMENT:          ₹   87,000       │ │
│ │ ───○──────────────────────── (Slider: 360)  │ │ ────────────────────────────────────────────────── │ │
│ │                                             │ │ • Estimated Annual Savings:       ₹   28,470 / yr  │ │
│ │ 🔌 Connected Load (Optional):               │ │ • Estimated Payback Period:       3.0 Years        │ │
│ │ [ 5 kW                                    ] │ │ • 25-Year Cumulative Savings:     ₹ 6,24,750       │ │
│ │                                             │ │ • Lifetime Carbon Offset:         90.0 Tons CO₂    │ │
│ │ [ ⚡ Recalculate Details ]                   │ │                                                    │ │
│ │                                             │ │ [ 💬 Share Full Quote on WhatsApp → ]              │ │
│ │                                             │ │ [ 📋 Book Free On-Site Rooftop Survey → ]          │ │
│ └─────────────────────────────────────────────┘ └────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [SUBSIDY SLABS REFERENCE TABLE: 1kW (₹30k) | 2kW (₹60k) | 3kW+ (₹78k) | Commercial (₹0 + 40% Tax)]    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                                                               │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.3 Free Rooftop Site Survey Modal Dialog Wireframe (`modal`)

```text
┌──────────────────────────────────────────────────────────────┐
│  Book Your Free Rooftop Solar Survey                  [ ✕ ]  │
│  Zero obligation. Our solar engineers inspect your roof      │
│  and provide an official PM Surya Ghar feasibility report.   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Full Name *                                                 │
│  [ Enter your name                                         ] │
│                                                              │
│  10-Digit Mobile Number (WhatsApp) *                         │
│  [ +91 | 92346 11112                                       ] │
│                                                              │
│  Installation City / Pincode *                               │
│  [ e.g. Adityapur, Jamshedpur (832109)                     ] │
│                                                              │
│  Property Type *                                             │
│  [ Residential Independent House / Villa                  ▾] │
│                                                              │
│  Estimated System Size (Pre-filled from Calculator):         │
│  [ 3.0 kWp Rooftop Solar                                   ] │
│                                                              │
│  [ ⚡ Confirm & Book Free Site Inspection → ]                │
│                                                              │
│  🔒 Privacy Guaranteed. Zero spam. We never share your data. │
└──────────────────────────────────────────────────────────────┘
```
