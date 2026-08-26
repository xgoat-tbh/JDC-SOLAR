# JDC Solar 2.0: Functional Testing Checklist

**Document:** `tests/functional/test-checklist.md`  
**Purpose:** Functional test verification checklist for future component and page implementations.

| Component / Feature | Action / Input | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :---: |
| **Skip to Main Content** | Press `Tab` on initial page load | Skip link reveals; pressing `Enter` focuses `#main-content` | [ ] |
| **Sticky Header** | Scroll down > 100px | Header transitions smoothly to compact sticky bar with zero CLS | [ ] |
| **Mobile Drawer** | Tap hamburger toggle | Drawer slides in; focus traps inside; pressing `Escape` closes drawer | [ ] |
| **Mobile Action Bar** | Scroll on viewport < 768px | Pinned bottom bar shows Call, WhatsApp, and Calculate buttons | [ ] |
| **Solar Sizing Input** | Enter monthly units (e.g. 360 kWh) | Dynamic calculation updates system size, subsidy, and savings | [ ] |
| **State Tariff Switch** | Change State (e.g. Maharashtra) | Tariff updates; annual savings recalculate | [ ] |
| **WhatsApp Quote Link** | Click "Share Quote on WhatsApp" | Opens `wa.me` with pre-filled kW size, net cost, and client location | [ ] |
| **Site Survey Modal** | Click "Book Free Site Survey" | Modal opens with focus trap; pressing `Escape` dismisses | [ ] |
| **Phone Number Validation** | Enter invalid phone (e.g. "12345") | Field displays red border and inline error message | [ ] |
| **Honeypot Spam Check** | Fill hidden `b_url` field | Submission discarded silently | [ ] |
| **FAQ Accordion** | Click `<summary>` question | Details expand smoothly; chevron rotates 180deg | [ ] |
| **Project Category Filter** | Click "Commercial" filter | Grid displays only commercial projects; hides residential | [ ] |
| **Scroll-to-Top FAB** | Scroll > 300px and click | Viewport smoothly scrolls to window top | [ ] |
| **404 Recovery Links** | Navigate to non-existent route | Branded 404 page renders with recovery navigation links | [ ] |
