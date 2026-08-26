# JDC Solar 2.0: 9-Viewport Responsive Testing Matrix

**Document:** `tests/responsive/viewport-matrix.md`  
**Purpose:** Responsive layout verification across 9 standardized device viewports.

| Viewport Width | Reference Device | Key Elements to Verify | Pass/Fail |
| :---: | :--- | :--- | :---: |
| **320px** | iPhone SE (1st Gen) | No horizontal scrollbar; fluid typography wraps cleanly; padding >= 12px | [ ] |
| **375px** | iPhone 12/13 Mini | Header <= 56px; floating FAB does not overlap bottom content | [ ] |
| **390px** | iPhone 14 / 15 / 16 | Sticky bottom mobile action bar is visible and accessible | [ ] |
| **414px** | iPhone Plus / Max | 2-column stat grids format with balanced whitespace | [ ] |
| **768px** | iPad (Portrait) | 2-column service cards; 2-column calculator layout; drawer menu | [ ] |
| **1024px** | iPad (Landscape) | Desktop navigation bar reveals without text wrapping or collision | [ ] |
| **1280px** | Standard Laptop | Centered 1200px max-width container; crisp hero graphics | [ ] |
| **1440px** | 1080p Desktop | 3-column project and service cards; rich hover elevation active | [ ] |
| **1920px** | Widescreen HD / 4K | 1360px container containment; zero vector pixelation | [ ] |
