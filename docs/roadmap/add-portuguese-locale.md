---
status: completed
created: 2026-05-02
completed: 2026-05-02
depends-on: [language-switcher-dropdown]
---

# Add Brazilian Portuguese (pt) Locale

## Goal

Reach the Brazilian Portuguese-speaking audience — one of the world's largest English-learning markets (~215 million speakers) — by adding a fully translated `/pt/` landing page, making SpeakPath accessible to users who prefer to read in Portuguese before committing to the app.

---

## Current State

The site supported four locales: `en`, `es`, `fr`, `de`. All copy lived in `src/i18n/site.ts` and new locales required only adding an entry to the `locales` array and a matching copy block — routing and the language dropdown were already generic.

| File | Role |
|---|---|
| `src/i18n/site.ts` | Single source of truth for all locale copy and config |
| `src/pages/[lang]/index.astro` | Auto-generates routes for every non-`en` locale in `locales` |
| `src/layouts/Base.astro` | Renders the language dropdown from `localeLabels` |

## Target State

A fully translated `/pt/` page reachable from the globe dropdown (`Português`) with all sections matching the structure of existing locales. Translations are Brazilian Portuguese (informal register, `você` form) — native reviewers will validate before deploy.

---

## Implementation Plan

### Phase 1: Locale registration (completed)

#### 1.1 — Add `pt` to the locales tuple

- **File:** `src/i18n/site.ts`
- **Change:** Append `'pt'` to the `locales` array. The `Locale` type and all downstream generics (`localeLabels`, `localeOgLocales`, `pageCopy`) are keyed by this type, so TypeScript will enforce completeness.

#### 1.2 — Add labels and OG locale

- **File:** `src/i18n/site.ts`
- **Change:** Add `pt: { label: 'Portuguese', nativeLabel: 'Português' }` to `localeLabels` and `pt: 'pt_BR'` to `localeOgLocales`.

### Phase 2: Full copy translation (completed)

#### 2.1 — Write all `pt` copy

- **File:** `src/i18n/site.ts`
- **Change:** Add complete `pt` entry to `pageCopy` covering all sections: `meta`, `nav`, `hero`, `languages`, `howItWorks`, `levels`, `features`, `comingSoon`, `cta`, `footer`.
- **Register:** Brazilian Portuguese informal register (`você`). Hero tagline: *Fale. Aprenda. Evolua.*

### Phase 3: Native review (pending)

#### 3.1 — Review by native speakers

- **Who:** User's Portuguese-speaking contacts
- **What:** Check `/pt/` page for unnatural phrasing, regional vocabulary, and tone consistency
- **Outcome:** Corrections committed before the Portuguese page is promoted in marketing

---

## Files Affected

| File | Changes |
|---|---|
| `src/i18n/site.ts` | Added `pt` to `locales`, `localeLabels`, `localeOgLocales`, and full `pageCopy.pt` block |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| AI-generated translation has unnatural phrasing | Phase 3 native review before marketing push |
| `pt` could be ambiguous (Portugal vs. Brazil) | `ogLocale: 'pt_BR'` and `hreflang="pt"` is sufficient for now; add `pt-PT` later if needed |
| Future locales require the same effort | The copy structure is well-defined; each new locale is a self-contained block |

---

## Out of Scope

- European Portuguese (`pt-PT`) variant — add only if audience data supports it
- Adding Portuguese as a *practice language* in the app (separate feature entirely)
- `localStorage` locale persistence — handled by URL routing

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Locale registration + full copy | Small |
| P0 | Native speaker review | Small |
| P1 | Marketing push to Brazilian Portuguese channels | Medium |
| P2 | European Portuguese (`pt-PT`) variant | Small |

## Acceptance Criteria

1. `https://speakpath.dev/pt/` returns 200 and renders fully in Brazilian Portuguese
2. The globe dropdown shows **Português** and navigates to `/pt/` correctly
3. All 9 page sections (hero, languages, how it works, levels, features, coming soon, CTA, nav, footer) display translated copy
4. `<html lang="pt">` and `<link rel="alternate" hreflang="pt">` are present in the page source
5. Native speakers confirm phrasing is natural before the page is promoted
