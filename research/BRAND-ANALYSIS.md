# JDC Solar: Complete Brand & Visual Identity Forensic Audit

**Audit Date:** August 2026  
**Auditor:** Brand Strategist & UI/UX Specialist  
**Target:** Visual Identity, Color System, Typography, Iconography, UI Components, and Design Tokens  
**Evidence Standard:** DIRECTLY OBSERVED & EXTRACTED from CSS and Asset Files  

---

## 1. Brand Essence & Positioning

- **Company Name:** JDC Solar (Parent Entity: Jagatdhan Commodities Pvt. Ltd.)
- **Tagline / Value Proposition:** *“Smart Solar Solutions”* / *“Powering a Sustainable Future with Smart Solar Solutions”*
- **Market Positioning:** Regional EPC leader in Jharkhand, expanding pan-India across residential rooftop, commercial power plants, industrial solar, and government utility projects.
- **Tone of Voice:** Professional, trustworthy, engineering-backed, community-centric, sustainable.

---

## 2. Logo System & Visual Assets

### 2.1 Logo Variants
1. **Primary Header Logo:**
   - **Asset URL:** `http://jdcsolar.com/wp-content/uploads/2023/09/Untitled-design.png` (or `cropped-Untitled-design.png`)
   - **Dimensions:** 1172px × 312px (Rendered at ~220px × 60px)
   - **Format:** PNG with transparency
   - **Composition:** Stylized Sun & Solar Panel abstract icon in warm amber/orange with dark navy blue bold typography *"JDC SOLAR"* and subtitle *"Smart Solar Solutions"*.
   - **Usage:** Light background header.

2. **Footer / Inverted Logo Variant:**
   - **Asset URL:** `https://jdcsolar.com/wp-content/uploads/2023/09/Untitled-design-4.png`
   - **Dimensions:** 1800px × 1800px
   - **Format:** PNG
   - **Usage:** Rendered against dark navy footer surface.

3. **Favicon:**
   - **Asset URL:** `http://jdcsolar.com/wp-content/uploads/2023/09/Untitled-design-150x150.png` / `cropped-Untitled-design-32x32.png`
   - **Format:** PNG (32×32 and 180×180 touch icon).

---

## 3. Forensic Color Palette

The current site utilizes a primary palette anchored in solar clean energy: Deep Industrial Navy Blue, Warm Solar Orange, Clean Light Grays, and Pure White.

| Role | Color Name | Verified HEX Code | RGB Code | Where Used Across Production Site |
| :--- | :--- | :---: | :---: | :--- |
| **Primary Brand** | Deep Solar Navy | `#1B3766` | `rgb(27, 55, 102)` | Headings, main navigation links, primary brand identity, trust banners |
| **Primary Accent** | Solar Orange / Amber | `#FD8127` | `rgb(253, 129, 39)` | Primary CTA buttons, highlight badges, active nav states, icons, step numbers |
| **Secondary Accent** | Clean Amber Orange | `#FF6900` | `rgb(255, 105, 0)` | Elementor gradient highlights, button hover states, rating stars |
| **Support Accent** | Royal Purple | `#605BE5` | `rgb(96, 91, 229)` | Subtitle badges, secondary accent borders |
| **Floating Action** | Violet Indigo | `#5636D1` | `rgb(86, 54, 209)` | Scroll-to-top floating button background |
| **Hover Action** | Magenta Pink | `#E2498A` | `rgb(226, 73, 138)` | Scroll-to-top hover background |
| **Dark Neutral (Text)** | Off-Black / Charcoal | `#333333` | `rgb(51, 51, 51)` | Body copy text, paragraph descriptions |
| **Pure Neutral (Dark)** | Midnight Black | `#000000` | `rgb(0, 0, 0)` | High-contrast headings, borders |
| **Muted Neutral** | Slate Grey | `#888888` | `rgb(136, 136, 136)` | Subtitles, input placeholders, metadata, dates |
| **Light Surface** | Soft Ice Blue / Grey | `#D8E1EB` | `rgb(216, 225, 235)` | Section backgrounds, card containers |
| **Border Neutral** | Divider Grey | `#D6D6D6` | `rgb(214, 214, 214)` | Card borders, input outlines, table dividers |
| **Base Background** | Off-White / Pale Grey | `#E8E8E8` / `#EFEFEF` | `rgb(232, 232, 232)` | Alternate section backgrounds, calculator container |
| **Pure Light** | Crisp White | `#FFFFFF` | `rgb(255, 255, 255)` | Page background, cards, button text on dark surfaces |

---

## 4. Typography System

The website relies on modern geometric sans-serif fonts imported via Google Fonts:

| Typography Role | Font Family | Fallback | Font Weights | Typical Sizes | Line Height | Usage Location |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **Primary Headings** | `"Poppins"` | Sans-Serif | 600 (Semi-Bold), 700 (Bold) | 28px - 48px | 1.2 - 1.3 | Hero headlines, section titles (H1, H2, H3) |
| **Body & Narrative** | `"Inter"` | Sans-Serif | 400 (Regular), 500 (Medium) | 15px - 16px | 1.6 - 1.7 | Paragraph text, service descriptions, FAQs |
| **Accent / Subtitles** | `"Poppins"` | Sans-Serif | 500 (Medium), 600 (Semi-Bold) | 13px - 14px | 1.4 | Category tags, badges, uppercase labels |
| **Buttons & CTAs** | `"Poppins"` | Sans-Serif | 600 (Semi-Bold) | 14px - 16px | 1.0 | Action buttons, form submit buttons |
| **Legacy References** | `"Raleway"`, `"Lato"` | Sans-Serif | 400, 600 | - | - | Imported via Google Fonts link tag in header |

---

## 5. UI Components & Styling Patterns

### 5.1 Buttons
- **Primary Action Button:**
  - Background: `#FD8127` (Solar Orange)
  - Color: `#FFFFFF`
  - Padding: `14px 28px`
  - Border Radius: `6px` to `8px` (softly rounded)
  - Hover: Darker orange `#E06A14` with subtle scale transform (`scale(1.02)`)
  - Typography: Poppins 600 Semi-Bold, uppercase/title case
- **Secondary / Outline Button:**
  - Border: `2px solid #1B3766`
  - Color: `#1B3766`
  - Background: Transparent
  - Hover: Background `#1B3766`, Color `#FFFFFF`

### 5.2 Cards & Containers
- **Content Cards:** White background (`#FFFFFF`), `1px solid #D6D6D6` border, `12px` border radius, subtle drop shadow (`0 4px 16px rgba(0,0,0,0.06)`).
- **Service Cards:** Highlight border on hover (`border-color: #FD8127`).
- **Calculator Box:** Neutral container (`#FFFFFF`) with `16px` padding and rounded inputs.

### 5.3 Section Spacing & Structure
- **Container Max Width:** `1200px` (Elementor wide container default)
- **Section Vertical Padding:** `80px - 100px` desktop, `40px - 60px` mobile
- **Card Grid Gap:** `24px` to `30px`
