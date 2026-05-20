---
status: completed
created: 2026-05-08
completed: 2026-05-08
depends-on: [speakpath-landing-scaffold]
---

# SpeakPath FAQ Page

## Goal

Add localized FAQ pages to the SpeakPath landing site so visitors, search engines, and AI assistants can quickly understand what SpeakPath is, which languages it supports, whether it is free to start, how it handles installation, device support, and voice recording privacy.

---

## Current State

Before this work, the landing site explained SpeakPath across the homepage sections and privacy page, but it did not have a focused FAQ URL with concise question-and-answer content. The shared `Base.astro` layout already provided site metadata, Open Graph tags, JSON-LD for the product, navigation, and footer links.

| Area | Previous Behavior |
|---|---|
| FAQ content | No dedicated `/faq/` page or localized FAQ routes |
| Crawler support | Product JSON-LD existed, but no FAQPage schema |
| Footer navigation | Linked to Privacy and Contact only |
| App conversion tracking | CTA links existed, but no FAQ-specific UTM source |

## Target State

The landing site should include crawlable FAQ pages at `/faq/`, `/es/faq/`, `/fr/faq/`, `/de/faq/`, and `/pt/faq/` with localized visible content and matching `FAQPage` JSON-LD. Each page should answer the current product questions without requiring new long-form content pages, include a tracked CTA into `app.speakpath.dev`, and emit hreflang alternates to the other FAQ language versions.

FAQ questions:

1. What is SpeakPath?
2. Which languages does SpeakPath support?
3. Is SpeakPath free to start?
4. Do I need to install anything?
5. Does SpeakPath store voice recordings?
6. Does SpeakPath work on all devices?

---

## Implementation Plan

### Phase 1: Localized FAQ Content

**Objective:** Store FAQ content in the existing locale system so visible content and structured data stay aligned in every supported language.

#### 1.1 — Add FAQ copy

- **File:** `src/i18n/site.ts`
- **Change:** Add `faq` copy for English, Spanish, French, German, and Portuguese, including page metadata, intro text, CTA text, back-link text, and the six FAQ answers.

### Phase 2: FAQ Routes And Rendering

**Objective:** Create reusable rendering and route files for the default and localized FAQ pages.

#### 2.1 — Add reusable FAQ component

- **File:** `src/components/FAQPage.astro`
- **Change:** Render the localized FAQ page, generate `FAQPage` JSON-LD from the same localized FAQ data, and add a CTA with locale-specific UTM content.

#### 2.2 — Add default FAQ route

- **File:** `src/pages/faq.astro`
- **Change:** Render the English FAQ page at `/faq/`.

#### 2.3 — Add localized FAQ routes

- **File:** `src/pages/[lang]/faq.astro`
- **Change:** Generate `/es/faq/`, `/fr/faq/`, `/de/faq/`, and `/pt/faq/` using the same locale routing pattern as localized landing pages.

### Phase 3: Site Navigation And Hreflang

**Objective:** Make the FAQ discoverable from the existing site shell.

#### 3.1 — Add footer FAQ link

- **File:** `src/layouts/Base.astro`
- **Change:** Add an FAQ link beside Privacy and Contact in the shared footer, resolving to the current locale's FAQ page when available.

#### 3.2 — Add localized footer label

- **File:** `src/i18n/site.ts`
- **Change:** Add `footer.faq` to the localized copy object so landing pages can render the footer link consistently.

#### 3.3 — Add route-aware language alternates

- **File:** `src/layouts/Base.astro`
- **Change:** Add `languageAlternatePath` so FAQ pages emit alternates for `/faq/`, `/es/faq/`, `/fr/faq/`, `/de/faq/`, and `/pt/faq/` instead of homepage alternates.

#### 3.4 — Keep privacy page English-only

- **File:** `src/pages/privacy.astro`
- **Change:** Disable language alternates on the English-only privacy page.

---

## Files Affected

| File | Changes |
|---|---|
| `src/components/FAQPage.astro` | New reusable localized FAQ page component, FAQPage JSON-LD, tracked CTA |
| `src/pages/faq.astro` | English FAQ route |
| `src/pages/[lang]/faq.astro` | Localized FAQ route generator |
| `src/layouts/Base.astro` | Adds optional `includeLanguageAlternates`, `languageAlternatePath`, route-aware language links, and localized footer FAQ link |
| `src/i18n/site.ts` | Adds FAQ page copy and `footer.faq` copy for existing locales |
| `src/pages/privacy.astro` | Disables homepage language alternates on the English-only privacy page |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| FAQ answers drift from product behavior | Keep FAQ entries short and update them when supported languages, pricing, or privacy behavior changes |
| FAQPage schema conflicts with visible content | Generate JSON-LD from the same `faqs` array rendered on the page |
| Localized FAQ pages emit homepage hreflang alternates | Use `languageAlternatePath="/faq/"` so alternates point to FAQ routes |
| CTA attribution is lost after landing on the app | Preserve UTM parameters in the FAQ CTA URL |

---

## Out of Scope

- New long-form SEO content pages
- Analytics instrumentation inside the app
- Changes to Fly.io, Cloudflare, or Google Search Console settings

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Create `/faq/` with visible FAQ content | Small |
| P0 | Add FAQPage JSON-LD | Small |
| P0 | Link FAQ from the footer | Small |
| P0 | Add localized FAQ routes for all supported site languages | Small |
| P1 | Add UTM tracking to the FAQ CTA | Small |
| P1 | Emit FAQ-specific hreflang alternates | Small |
| P1 | Disable incorrect language alternates on English-only pages | Small |

## Acceptance Criteria

1. `/faq/`, `/es/faq/`, `/fr/faq/`, `/de/faq/`, and `/pt/faq/` render standalone FAQ pages.
2. Each FAQ page answers all six requested questions in the page locale.
3. Each FAQ page includes valid `FAQPage` JSON-LD matching its visible FAQ text.
4. The footer includes a discoverable FAQ link that points to the current locale's FAQ page.
5. The FAQ CTA links to `app.speakpath.dev` with FAQ-specific UTM parameters and locale-specific `utm_content`.
6. FAQ pages emit hreflang alternates for all FAQ language versions plus `x-default`.
7. `src/pages/privacy.astro` does not emit homepage hreflang alternates.
8. The production build passes with `npm run build`.
