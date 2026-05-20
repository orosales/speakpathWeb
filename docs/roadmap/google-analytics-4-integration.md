---
status: in-progress
created: 2026-05-18
completed:
depends-on: []
---

# Google Analytics 4 Integration

## Goal

Track user behavior across all SpeakPath pages — which pages are visited, where users come from, how they navigate, and where they drop off — so we can make data-driven decisions about content and UX.

---

## Current State

Cloudflare Web Analytics is active via automatic proxy setup and shows:

| Metric | Available |
|---|---|
| Total visits / page views | Yes |
| Country, browser, OS breakdown | Yes |
| Core Web Vitals (LCP, INP, CLS) | Yes |
| Which specific subpages were visited | No |
| User navigation flow | No |
| Time on page / bounce rate per page | No |
| Button click tracking | No |
| Conversion goals | No |

Cloudflare is useful for performance monitoring but does not provide per-page behavior data, which is critical now that the site has multiple pages (`/`, `/faq`, `/learn`, `/[lang]/...`).

## Target State

GA4 tracks every page visit, user flow, scroll depth, and outbound click across all SpeakPath pages. Data is visible in the Google Analytics dashboard within 24–48 hours of deployment. Future phases add custom event tracking for key conversion actions (e.g. "Start Free" button clicks, app sign-in link clicks).

---

## Implementation Plan

### Phase 1: Base Tag Installation ✅ Done

**Objective:** Load the GA4 beacon on every page of the site.

#### 1.1 — Add gtag script to Base layout

- **File:** `src/layouts/Base.astro`
- **Change:** Added the Google tag (`G-T4CNRLSJ9G`) just before the Material Symbols stylesheet in `<head>`. Covers all pages that use this layout (landing, FAQ, learn, privacy).

#### 1.2 — Deploy to production

- **Command:** Deploy via Netlify (skill: `deploy-netlify`)
- **Change:** Push built output so the tag is live on `speakpath.dev`

### Phase 2: Verify Data Collection

**Objective:** Confirm GA4 is receiving hits before relying on the data.

#### 2.1 — Real-time verification

- Open Google Analytics → **Reports → Realtime**
- Visit `speakpath.dev` in an incognito window
- Confirm a hit appears in the Realtime report within 30 seconds

#### 2.2 — Page-level report check

- After 48 hours, check **Reports → Engagement → Pages and screens**
- Confirm individual pages (`/`, `/faq`, `/en/learn`, etc.) appear as separate rows

### Phase 3: Custom Event Tracking (Future)

**Objective:** Track key user interactions beyond pageviews.

#### 3.1 — CTA button clicks

- **File:** `src/components/LandingPage.astro`
- **Change:** Add `gtag('event', 'cta_click', { button: 'start_free' })` on primary CTA buttons

#### 3.2 — App sign-in link clicks

- **File:** `src/layouts/Base.astro` (nav Sign In link)
- **Change:** Track clicks on the `https://app.speakpath.dev` link as a conversion event

#### 3.3 — Language switcher usage

- **File:** `src/layouts/Base.astro` (lang switcher script)
- **Change:** Fire an event when a user switches site language, including which locale they picked

### Phase 4: Goal / Conversion Setup (Future)

**Objective:** Define what "success" looks like in GA4 so we can measure it.

#### 4.1 — Mark app sign-in clicks as a conversion

- In GA4 dashboard: **Configure → Events** → mark `app_signin_click` as a conversion
- This lets us see conversion rate by traffic source (organic, direct, referral)

#### 4.2 — Funnel exploration

- Build a funnel in **Explore** tab: Landing → FAQ → App sign-in
- Identify where users drop off before converting

---

## Files Affected

| File | Changes |
|---|---|
| `src/layouts/Base.astro` | GA4 gtag script added in `<head>` (Phase 1 ✅) |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Ad blockers preventing GA4 from loading | Cloudflare Web Analytics (server-side) remains as a backup for true visitor counts |
| GDPR / privacy compliance | GA4 Enhanced Measurement does not collect PII; add a cookie consent banner if targeting EU users |
| Tag fires in development/preview builds | Consider checking `import.meta.env.PROD` to only load in production |

---

## Out of Scope

- Google Tag Manager (overkill for current scale — direct gtag is simpler)
- A/B testing via GA4 Experiments (separate initiative)
- Heatmaps / session recordings (consider Microsoft Clarity separately if needed)

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Deploy tag to production (Phase 1.2) | Small |
| P0 | Verify real-time data (Phase 2.1) | Small |
| P1 | CTA click event tracking (Phase 3.1) | Small |
| P1 | App sign-in conversion goal (Phase 4.1) | Small |
| P2 | Language switcher tracking (Phase 3.3) | Small |
| P2 | Funnel exploration setup (Phase 4.2) | Medium |

## Acceptance Criteria

1. Deploying to `speakpath.dev` and visiting the site shows a real-time hit in GA4 within 30 seconds
2. After 48 hours, **Pages and screens** report shows `/`, `/faq`, `/learn` as separate rows with individual view counts
3. Cloudflare Web Analytics continues to function independently as a backup
4. No console errors related to gtag on any page
