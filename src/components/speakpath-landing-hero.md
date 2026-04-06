---
status: draft
created: 2026-04-05
completed:
depends-on: [speakpath-landing-scaffold]
---

# SpeakPath Landing — Hero Section

## Goal

Build the hero section with headline, subheadline, animated waveform visualization, and primary CTA button — the first thing visitors see and the highest-conversion section of the page.

---

## Current State

Greenfield. The scaffold (`speakpath-landing-scaffold`) provides `Base.astro`, global CSS tokens, and a blank `index.astro`. No content components exist yet.

## Target State

A `Hero.astro` component mounted in `index.astro` that renders:
- **Headline:** "Speak. Learn. Improve."
- **Subheadline:** "Practice real conversations in English, Spanish, French, or German — with an AI that listens, responds, and helps you grow."
- **CTA button:** "Start Practicing Free →" linking to `https://app.speakpath.dev`
- **Waveform animation:** A looping SVG or Canvas audio-bar animation below or behind the headline to convey voice interaction
- Mobile-first layout, centered, full-viewport-height

---

## Implementation Plan

### Phase 1: Hero Component

**Objective:** Render the static text and CTA.

#### 1.1 — Create Hero.astro

- **File:** `src/components/Hero.astro`
- **Change:** Semantic `<section>` with `<h1>`, `<p>`, and `<a>` styled as a button. Use CSS custom properties from `global.css` for colors. Button styled with teal background, navy text, bold weight, rounded corners, hover state (brightness or transform scale).

#### 1.2 — Mount in index page

- **File:** `src/pages/index.astro`
- **Change:** Import and render `<Hero />` as the first child of `<main>`.

### Phase 2: Waveform Animation

**Objective:** Add a subtle looping waveform that communicates voice/audio without autoplay video.

#### 2.1 — SVG bar animation (CSS keyframes)

- **File:** `src/components/Hero.astro` (inline `<style>`)
- **Change:** Render a row of `<span>` bars (or inline SVG `<rect>` elements). Animate each bar's `height` with staggered `animation-delay` via CSS `@keyframes`. Bars pulse between short and tall on a 1–2 s loop. Use `--color-accent` for bar fill.

#### 2.2 — Respect reduced-motion

- **Change:** Wrap animation keyframes in `@media (prefers-reduced-motion: no-preference)` so users who opt out of motion see static bars.

### Phase 3: Responsive Layout

**Objective:** Ensure hero looks correct on mobile, tablet, and desktop.

#### 3.1 — Mobile-first CSS

- **File:** `src/components/Hero.astro`
- **Change:** Default styles target mobile (single column, padding, font sizes). Media queries at `48rem` and `72rem` widen content max-width and scale up typography.

---

## Files Affected

| File | Changes |
|---|---|
| `src/components/Hero.astro` | New component — headline, subheadline, CTA button, waveform animation |
| `src/pages/index.astro` | Import and render `<Hero />` |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Waveform animation janky on low-end devices | Use CSS-only animation (no JS), `will-change: transform`, and `@media (prefers-reduced-motion)` |
| CTA link hardcoded to `app.speakpath.com` before domain is live | Use an Astro env variable `PUBLIC_APP_URL` so it can be overridden during development |

---

## Out of Scope

- The bottom CTA section (see `speakpath-landing-footer-cta`)
- Navigation bar or sticky header (not specified in the content doc)
- Any backend or analytics integration

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Headline + subheadline + CTA button | Small |
| P0 | Waveform animation | Small |
| P1 | Reduced-motion support | Small |
| P1 | Responsive layout breakpoints | Small |

## Acceptance Criteria

1. Hero section renders headline, subheadline, and CTA button at all viewport widths (320px–1440px).
2. Waveform animation loops continuously without JavaScript errors.
3. Animation is static (no movement) when `prefers-reduced-motion: reduce` is set.
4. CTA button links to `https://app.speakpath.dev` and opens in the same tab.
5. Lighthouse performance score is ≥ 95 on mobile.
