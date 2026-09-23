---
name: Modern PropTech & KPR Ecosystem
colors:
  surface: '#fdf7ff'
  surface-dim: '#ded8e0'
  surface-bright: '#fdf7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f2fa'
  surface-container: '#f2ecf4'
  surface-container-high: '#ece6ee'
  surface-container-highest: '#e6e0e9'
  on-surface: '#1d1b20'
  on-surface-variant: '#494551'
  inverse-surface: '#322f35'
  inverse-on-surface: '#f5eff7'
  outline: '#7a7582'
  outline-variant: '#cbc4d2'
  surface-tint: '#6750a4'
  primary: '#4f378a'
  on-primary: '#ffffff'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#cfbcff'
  secondary: '#63597c'
  on-secondary: '#ffffff'
  secondary-container: '#e1d4fd'
  on-secondary-container: '#645a7d'
  tertiary: '#765b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#fdf7ff'
  on-background: '#1d1b20'
  surface-variant: '#e6e0e9'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.03em
  currency-stat:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies the intersection of consumer proptech and fintech in Indonesia: transparent, legally secure, welcoming, and hyper-efficient. Navigating secondary mortgages (takeover KPR) and residential capital expenditure (renovasi rumah) is traditionally fraught with bureaucratic opacity and anxiety. The UI shifts this perception into clarity and institutional trust with an approachable consumer touch.

The visual style blends **Corporate Modern** with light, high-precision tactile surfaces:
- **Trustworthy & Authoritative:** Clean lines, sharp data displays, structured loan breakdown cards, and explicit financial calculations that inspire legal and institutional confidence.
- **Airy & Contemporary:** Generous white space, subtle ocean-cool tints, fine structural borders, and crisp high-contrast typography eliminate visual clutter.
- **Action-Oriented Indonesian Localization:** Intentional integration of conversational commerce through high-visibility direct messaging touchpoints (specifically dedicated WhatsApp integration paths), making real estate financing feel accessible rather than intimidating.

## Colors

The system uses a strictly orchestrated palette designed to convey financial clarity, property stability, and rapid real-time communication:

- **Primary Cyan (`#01CDF1`, accents `#34C8ED`, deep `#0E7490`):** Represents institutional tech, liquidity, and modernization. Used for core navigation indicators, active calculation sliders, primary financial CTA buttons, and key progress milestones.
- **Secondary Slate (`#4D7E8C`):** Provides a balanced, complementary tone for supportive UI elements, badges, and secondary actions.
- **Tertiary Accent (`#FFB13A`):** Adds a vibrant warmth for highlights, warnings, and special promotional callouts.
- **Cool Neutral & Slate (`#71787B` body muted, `#E2E8F0` structural borders, `#CBD5E1` divider lines):** Formats comparison tables and loan schedules cleanly without overwhelming data density.
- **Surface Foundations (`#FFFFFF` primary canvas, `#F8FAFC` secondary canvas, `#F0FDFA` active highlight surface):** Provides distinct tonal contrast between user workspace layers and nested property cards.

## Typography

Typography relies on **Plus Jakarta Sans** across all roles. Designed with geometric clarity and balanced humanistic counters, it provides both warmth and high numeric legibility for Indonesian Rupiah (`Rp`) currency strings and complex amortization schedules.

- **Numerics and Currency:** Currency values should always enforce tabular numerals (`font-variant-numeric: tabular-nums`) to preserve optical alignment across comparison matrices and calculation cards.
- **Headings:** Bold and Extra-bold weights define clear visual hierarchies for property specs, appraisal estimates, and step titles.
- **Microcopy & Legal Disclaimers:** Kept legible with tight tracking and a minimum size threshold of 11px to ensure regulatory disclosures (OJK, notary statements) remain accessible on standard mobile displays.

## Layout & Spacing

The layout architecture employs a responsive 12-column grid optimized for financial tools, property browsing, and calculation forms:

- **Desktop (>= 1024px):** 12-column layout with a maximum container width of `1200px`, centered with `2rem` (`32px`) base margins and `1.5rem` (`24px`) gutters. Split views (such as simulator inputs beside dynamic monthly savings previews) use 7/5 or 6/6 column splits.
- **Tablet (768px - 1023px):** 8-column layout with `1.5rem` (`24px`) margins and `1rem` (`16px`) gutters. Heavy simulation controls collapse into progressive step panels.
- **Mobile (< 768px):** 4-column fluid layout with `1rem` (`16px`) gutters and margins. Sticky bottom action bars house primary conversion buttons (e.g., "Konsultasi WhatsApp" and "Cek Simulasi").
- **Spacing Rhythm:** Standard spacing increments adhere to a strict 4px/8px modular scale. Form inputs and card structures default to `space-md` (`16px`) internal padding, expanding to `space-lg` (`24px`) on desktop viewports.

## Elevation & Depth

This system avoids heavy drop shadows, relying instead on clean surface containment, thin architectural borders, and diffused ambient light to reflect structural integrity:

- **Level 0 (Flat Canvas):** `#FFFFFF` or `#F8FAFC`. Zero elevation, framed by a delicate 1px border (`#E2E8F0`) to delineate structural sections.
- **Level 1 (Property & Simulator Cards):** `#FFFFFF` surface with an ambient drop: `0px 2px 8px -2px rgba(15, 23, 42, 0.05)`, encased by a `1px solid #E2E8F0` border.
- **Level 2 (Interactive Hover & Active Comparison Modules):** `0px 8px 24px -4px rgba(1, 205, 241, 0.08), 0px 4px 12px -2px rgba(15, 23, 42, 0.04)`, with border switching to `#01CDF1` or `#A5F3FC`.
- **Level 3 (Sticky CTAs & Dropdown Modals):** `0px 16px 32px -6px rgba(15, 23, 42, 0.12)`, offering crisp visual lift over dense underlying lists.
- **Cyan Soft Tint Stack:** Highlighted tiers (such as potential interest savings or VIP takeover programs) use `#F0FDFA` background with a `1px solid rgba(1, 205, 241, 0.2)` border without shadow.

## Shapes

The interface embraces a balanced modern aesthetic with moderate curves (`border-radius: 12px` to `16px`) that soften numeric data while retaining clean structural lines:

- **Base Radius (`0.5rem` / `8px`):** Used on inner elements, input tags, data cells, calculation handles, and chips.
- **Container Radius (`rounded-lg` - `1rem` / `16px`):** The primary radius applied to property cards, simulation result cards, calculation modals, and interactive hero containers.
- **Section Radius (`rounded-xl` - `1.5rem` / `24px`):** Used for large featured promotional cards, modular renovation bundles, and distinct hero panels.
- **Pill Radius (`rounded-full`):** Reserved for badges (e.g., "Suku Bunga Rendah", "Renovasi Instan"), numerical step markers, and circular icon wrappers.

## Components

### Buttons
- **Primary Cyan Button:** Solid `#01CDF1` background, white bold label, `12px` radius, `12px 24px` padding. On hover: `#0E7490` with slight scale elevation. Used for "Hitung Penghematan", "Ajukan Takeover", and "Pilih Paket".
- **Secondary Accent Button:** Solid `#4D7E8C` background with white text. Hover state shifts to `#406370`. Used for secondary workflows and supportive actions.
- **Ghost Button:** Transparent background, `1px solid #CBD5E1`, text `#1E293B`. Hover shifts to `#F8FAFC` border `#94A3B8`.

### Input Fields & Calculation Sliders
- **Currency & Tenor Inputs:** `#FFFFFF` background, `1px solid #E2E8F0`, rounded `10px`, with a dedicated prefix container for `Rp` in `#F1F5F9` and text `#475569`. Focus state invokes a crisp `2px solid #01CDF1` ring with zero chromatic bleed.
- **Interactive Loan Sliders:** Clean track in `#E2E8F0`, filled progression bar in `#01CDF1`, and an easy-to-touch circular thumb (`20px`) with an ambient shadow and solid white center.

### Property & Renovation Cards
- **Structure:** Clean white surface enclosed in `1px solid #E2E8F0` with `16px` radius.
- **Media Header:** 16:9 property photo or architectural rendering with an absolute top-left status chip (`#F0FDFA` surface, `#01CDF1` text).
- **Metric Grid:** Two-column data summary (e.g., "Cicilan Baru", "Sisa Tenor", "Estimasi Hemat") separated by subtle slate dividers (`#F1F5F9`).

### Chips & Badges
- **Status Chips:** Light tinted pill tags (`#F0FDFA`) with `#0E7490` bold typography.
- **Comparison Metric Badges:** Display savings delta (e.g., "Hemat Rp 1,8 Jt / bln") in a soft emerald or supportive pill (`#DCFCE7` with `#15803D` text).

### Checkboxes & Radios
- Box/Circle with `1.5px solid #CBD5E1`, transitioning to solid `#01CDF1` fill with a crisp white check/dot when active. Form labels are styled in `#1E293B` medium typography.

### Specialized Ecosystem Components
- **KPR Takeover Amortization Diff:** A dual-column ledger component directly contrasting the current bank's floating rate against the proposed takeover rate, concluding with a highlighted net-savings summary pill.
- **RenovRumah Material & Milestone Accordion:** A multi-step expandable tracker outlining budget estimates (RAB), escrow status, and contractor progress updates.