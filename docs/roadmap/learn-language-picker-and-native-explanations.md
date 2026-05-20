---
status: proposal
created: 2026-05-06
completed:
depends-on: []
---

# Learn: Language Picker + Native-Language Grammar Explanations

## Goal

Give students a clear "what do you want to learn?" entry point before the learning path,
and adapt grammar explanations to the student's native language so rules feel intuitive
rather than abstract — the same approach used in the source material
`docs/lessons/THE FUNDAMENTALS OF ENGLISH.doc`.

---

## Current State

| Area | Current behavior |
|---|---|
| Entry point | `/learn/english/` lands directly on the 6-step English path — no language selection |
| Learn pages locale | Routes exist for locales, but the learn index and topic pages originally rendered mostly English content |
| Grammar content | Covers tenses (Present Simple, Past Simple, Present Perfect, Future) and articles — missing the full auxiliary verb system |
| Native explanations | None — grammar rules have no native-language context notes |
| Locale routing | Landing page has `/[lang]/` routes but learn pages have no locale equivalent |

**Relevant files:**

| File | Role |
|---|---|
| `src/pages/learn/english/index.astro` | 6-step path index (currently the first learn page a user sees) |
| `src/pages/learn/english/grammar.astro` | Grammar reference page |
| `src/layouts/LearnLayout.astro` | Shell for all learn pages — nav, breadcrumb, prev/next; paths are hardcoded to `/learn/english/` |
| `src/components/LearnNav.astro` | Sidebar + mobile step pills; step paths hardcoded |
| `src/components/WriteToSpeak.astro` | Homepage learning-path CTA was hardcoded to `/learn/`, which sends localized landing pages to the English picker instead of locale-prefixed learn pages |
| `src/i18n/site.ts` | Locale list: `['en', 'es', 'fr', 'de', 'pt']` |
| `src/pages/[lang]/index.astro` | Locale-specific landing pages (pattern to follow) |

---

## Target State

1. **`/learn/` and localized `/[lang]/learn/` pages are language picker pages.** Students
   see "What do you want to learn?" in their current site language, with one active card
   (English) and locked "coming soon" cards for Spanish, French, German, and Portuguese.
   Picking English navigates to the matching locale-prefixed learn path.

2. **Locale is in the URL**, following the existing site pattern:
   - Default English: `/learn/english/grammar`
   - Spanish: `/es/learn/english/grammar`
   - French: `/fr/learn/english/grammar`
   - etc.

3. **Learn content is explained in the learner's native site language.** The English learning
   path can still teach English words, examples, and phrase patterns, but instructions,
   headings, summaries, navigation, and explanatory notes should use the URL locale.

4. **Grammar page is expanded** with the full auxiliary verb system from the source doc
   (BE, DO/DOES/DID, HAVE/HAS/HAD, WILL, GOING TO, WOULD, SHOULD, COULD, CAN vs BE ABLE TO,
   MAY, MUST) plus Spanish native-language notes for each rule as the first supported
   explanation language.

---

## Architecture Decision: URL-Based Locale Routing

Locale belongs in the URL — not in localStorage. Reasons:

- **Consistent with existing pattern.** Landing pages already use `/[lang]/`. Learn pages
  should follow the same convention.
- **SEO.** A Spanish speaker searching *"regla DO DOES en inglés"* can land directly on
  `/es/learn/english/grammar`. localStorage-only content is invisible to search engines.
- **Shareable.** A teacher can send a student the Spanish URL and know they'll see Spanish.
- **No flash of wrong language.** SSG renders the right locale server-side — no client-side
  content swap needed.

**How it maps to Astro's router:**

```
src/pages/
  learn/
    index.astro                    →  /learn/           (language picker)
    english/
      grammar.astro                →  /learn/english/grammar          (English, default)
      key-verbs.astro              →  /learn/english/key-verbs
      ...
  [lang]/
    index.astro                    →  /es/, /fr/, /de/, /pt/          (already exists)
    learn/
      index.astro                  →  /es/learn/                     (localized picker)
      english/
        grammar.astro              →  /es/learn/english/grammar       (new)
        key-verbs.astro            →  /es/learn/english/key-verbs     (new)
        ...
```

Shared content lives in `src/components/learn/` components that accept a `locale` prop —
no duplication of HTML between the English and locale pages.

---

## Implementation Plan

### Phase 1: Language Picker Page

**Objective:** Add a `/learn/` entry point that lets students pick the language they want
to learn before entering the path. Shows intent for multiple languages early.

#### 1.1 — Create `src/pages/learn/index.astro`

- **File:** `src/pages/learn/index.astro` *(new file)*
- **Change:** New page with a "What do you want to learn?" heading. Renders a grid of
  language cards:
  - **English** — active, links to `/learn/english/`
  - **Spanish, French, German, Portuguese** — locked, show a "Coming soon" badge,
    non-clickable
  - Style matches the existing `Languages.astro` card pattern on the landing page.

#### 1.1b — Create localized learn picker routes

- **Files:** `src/components/LearnPickerPage.astro`, `src/pages/[lang]/learn/index.astro`
- **Change:** Move the picker UI into a reusable component and render it for `/learn/`,
  `/es/learn/`, `/fr/learn/`, `/de/learn/`, and `/pt/learn/`. The English card links to
  `/learn/english/` for English and `/{locale}/learn/english/` for localized pages.

#### 1.2 — Update LearnLayout top nav link

- **File:** `src/layouts/LearnLayout.astro` (line 70)
- **Change:** The "Learn" `<a>` currently points to `/learn/english`. Change to `/learn/`
  so the nav always leads back through the picker.

#### 1.3 — Make landing learning CTA locale-aware

- **Files:** `src/components/WriteToSpeak.astro`, `src/components/LandingPage.astro`
- **Change:** Pass the active landing locale into `WriteToSpeak`. Keep the English CTA pointed
  at `/learn/`, and send localized landing pages to their localized picker pages, for example
  `/es/learn/`, `/fr/learn/`, `/de/learn/`, and `/pt/learn/`.
- **Reason:** Users should see the "what language do you want to learn?" step in their current
  site language, even while English is the only available learning path.

---

### Phase 2: Locale-Aware Routing for Learn Pages

**Objective:** Create `[lang]/learn/english/` routes in Astro that mirror the existing
English pages, pass the locale through to shared content components, and make
`LearnLayout` and `LearnNav` locale-aware.

#### 2.1 — Add `locale` prop to `LearnLayout`

- **File:** `src/layouts/LearnLayout.astro`
- **Change:** Accept an optional `locale?: string` prop (defaults to `'en'`). Use it to:
  - Compute a `basePath` helper: `locale === 'en' ? '/learn/english' : `/${locale}/learn/english``
  - Pass `basePath` to `LearnNav`
  - Update breadcrumb links to use `basePath`
  - Set `<html lang={locale}>` correctly

#### 2.2 — Add `locale` + `basePath` prop to `LearnNav`

- **File:** `src/components/LearnNav.astro`
- **Change:** Currently step paths are hardcoded as `/learn/english/grammar` etc. Accept a
  `basePath` prop and prefix all step paths with it:
  ```
  { slug: 'grammar', label: 'Grammar', path: `${basePath}/grammar` }
  ```

#### 2.3 — Create `src/pages/[lang]/learn/english/` locale routes

- **Files:** *(new files)*
  - `src/pages/[lang]/learn/english/index.astro`
  - `src/pages/[lang]/learn/english/grammar.astro`
  - `src/pages/[lang]/learn/english/key-verbs.astro`
  - `src/pages/[lang]/learn/english/connectors.astro`
  - `src/pages/[lang]/learn/english/phrasal-verbs.astro`
  - `src/pages/[lang]/learn/english/nouns.astro`
  - `src/pages/[lang]/learn/english/essay-template.astro`
- **Change:** Each file uses `getStaticPaths()` filtering out `'en'` (same pattern as the
  existing `src/pages/[lang]/index.astro`). Each page imports the corresponding shared
  content component and passes `locale` as a prop.

```ts
export function getStaticPaths() {
  return locales
    .filter((l) => l !== 'en')
    .map((l) => ({ params: { lang: l } }));
}
const { lang } = Astro.params;
```

#### 2.4 — Extract page content into shared components

- **Files:** *(new files in `src/components/learn/`)*
  - `GrammarContent.astro`
  - `KeyVerbsContent.astro`
  - `ConnectorsContent.astro`
  - `PhrasalVerbsContent.astro`
  - `NounsContent.astro`
  - `EssayTemplateContent.astro`
  - `LearnIndexContent.astro`
- **Change:** Move the `<slot />` body content out of each existing `src/pages/learn/english/*.astro`
  into these components. Each component accepts `locale: string`. The original English pages
  import and render the component with `locale="en"`. The new `[lang]` pages render the same
  component with the dynamic locale.

---

### Phase 3: Expand Grammar Page with Auxiliary Verb System

**Objective:** Replace the tense-focused grammar page with the auxiliary-verb-as-operator
framework from the source doc, including native-language notes rendered when `locale ≠ 'en'`.

#### 3.1 — Restructure `GrammarContent.astro`

- **File:** `src/components/learn/GrammarContent.astro` *(from Phase 2)*
- **Change:** Replace the current "Core Tenses" section with "Grammar Rules (Auxiliary Verbs)".
  Keep "Common Mistakes" and "Articles" sections.

New rules to add, in order:

| Rule | English description | Spanish note (locale="es") |
|---|---|---|
| **BE** (am/is/are/was/were) | Expresses "to be" — present and past | "Úsalos solo si hay un 'ser o estar' al lado del pronombre" |
| **DO / DOES / DID** | Manages every common verb (non-BE, non-HAVE) | "Invisible en la afirmación; aparece en negación y pregunta" |
| **HAVE / HAS / HAD** | Two meanings: TENER (common verb) and HABER (perfect) | "Como TENER es verbo común → lo maneja DO. Como HABER → lo maneja HAVE/HAS" |
| **WILL** | Certain future: promise, strong intention | "No es solo '-ré'. Es: 'fijo que', 'de hecho que', 'en serio que'" |
| **GOING TO** | Planned future, no emphasis; WAS GOING TO = frustrated plan | "Solo menciona el plan, sin énfasis. WAS GOING TO = plan que ya no sucedió" |
| **WOULD** | Conditional — what would happen if… | "'Haría, diría, iría…' — siempre implica una condición" |
| **SHOULD** | Strong recommendation | "'Debería' — hay libre albedrío, no es una orden, pero hay consecuencias" |
| **COULD** | Past/conditional of CAN | "'Podría, podía, pudo' — pasado o condición de CAN" |
| **CAN / BE ABLE TO** | CAN = personal will to act; BE ABLE TO = physical capacity | "CAN = me da la gana / decido hacerlo. BE ABLE TO = estoy apto físicamente" |
| **MAY** | 50/50 probability or formal permission | "'Talvez, quizás' (50/50). En pregunta: '¿Me permite…?' (muy formal)" |
| **MUST** | Strong obligation with consequence if not met | "'Deber imprescindible' — no es orden, pero si no se cumple hay consecuencias" |

#### 3.2 — Card structure per rule

Each rule card renders conditionally based on `locale`:

```
[Rule name]  [English one-liner]
─────────────────────────────────────
Table: Affirmative | Negative | Question | Negative Q
─────────────────────────────────────
Example sentences with EN ↔ translation
─────────────────────────────────────
{locale !== 'en' && <NativeNote locale={locale} rule="be" />}
```

Native notes are stored as a typed map inside `GrammarContent.astro` — no separate files
needed for now. When more languages are added, the map grows.

### Phase 4: Native-Language Learn Experience

**Objective:** Make `/[lang]/learn/english/` feel like a learning page written for that
language's speakers, not an English page behind a localized URL.

#### 4.1 — Localize the learn path index

- **File:** `src/components/learn/LearnIndexContent.astro`
- **Change:** Add locale-specific headings, intro copy, method explanation, step titles,
  step descriptions, and CTA labels for `en`, `es`, `fr`, `de`, and `pt`.

#### 4.2 — Localize learn chrome and navigation

- **Files:** `src/layouts/LearnLayout.astro`, `src/components/LearnNav.astro`
- **Change:** Localize breadcrumb labels, nav labels, step names, previous/next labels,
  practice CTAs, sidebar helper text, and footer text.

#### 4.3 — Localize remaining topic pages

- **Files:** `src/components/learn/GrammarContent.astro`, `KeyVerbsContent.astro`,
  `ConnectorsContent.astro`, `PhrasalVerbsContent.astro`, `NounsContent.astro`,
  `EssayTemplateContent.astro`
- **Change:** For each topic, keep English examples visible, but translate explanations,
  headings, helper notes, table labels, and "why this helps" sections into the page locale.
  This preserves the English study target while making the pedagogy native-language-first.

---

## Files Affected

| File | Changes |
|---|---|
| `src/pages/learn/index.astro` | **New** — language picker page |
| `src/components/LearnPickerPage.astro` | **New** — shared localized picker UI |
| `src/pages/[lang]/learn/index.astro` | **New** — locale picker routes |
| `src/pages/[lang]/learn/english/index.astro` | **New** — locale index route |
| `src/pages/[lang]/learn/english/grammar.astro` | **New** — locale grammar route |
| `src/pages/[lang]/learn/english/key-verbs.astro` | **New** — locale route |
| `src/pages/[lang]/learn/english/connectors.astro` | **New** — locale route |
| `src/pages/[lang]/learn/english/phrasal-verbs.astro` | **New** — locale route |
| `src/pages/[lang]/learn/english/nouns.astro` | **New** — locale route |
| `src/pages/[lang]/learn/english/essay-template.astro` | **New** — locale route |
| `src/components/learn/GrammarContent.astro` | **New** — extracted + expanded grammar with locale prop |
| `src/components/learn/LearnIndexContent.astro` | **New** — extracted learn index content |
| `src/components/learn/KeyVerbsContent.astro` | **New** — extracted content |
| `src/components/learn/ConnectorsContent.astro` | **New** — extracted content |
| `src/components/learn/PhrasalVerbsContent.astro` | **New** — extracted content |
| `src/components/learn/NounsContent.astro` | **New** — extracted content |
| `src/components/learn/EssayTemplateContent.astro` | **New** — extracted content |
| `src/layouts/LearnLayout.astro` | Add `locale` prop; make breadcrumb + nav links locale-aware; update "Learn" link to `/learn/` |
| `src/components/LearnNav.astro` | Accept `basePath` prop; prefix all step paths |
| `src/components/learn/LearnIndexContent.astro` | Localize learn path overview by locale |
| `src/components/WriteToSpeak.astro` | Accept `locale` and compute locale-aware CTA href |
| `src/components/LandingPage.astro` | Pass active locale into `WriteToSpeak` |
| `src/pages/learn/english/*.astro` | Refactored to import + render shared content components |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Many new files in Phase 2 | The locale routes are thin wrappers — each is ~10 lines. Content lives in one shared component per page |
| `LearnLayout` path logic gets complex | Centralise in a single `basePath` helper derived from `locale`; pass it down — don't compute it in multiple places |
| Localized landing CTA sends users to the English `/learn/` picker | Compute the CTA href in `WriteToSpeak` from the current locale and link to localized picker routes |
| Grammar page gets very long with 11 rules | Add an in-page anchor nav at the top of `GrammarContent.astro` linking to each rule section |
| Spanish notes written poorly | Derive all Spanish copy directly from `docs/lessons/THE FUNDAMENTALS OF ENGLISH.doc` — don't paraphrase |
| English examples disappear in translated pages | Keep examples in English, but translate surrounding explanations and guidance |

---

## Out of Scope

- A language switcher widget on individual learn pages (users change locale by navigating)

---

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Language picker at `/learn/` — English active, others locked | Small |
| P0 | Localized language pickers at `/es/learn/`, `/fr/learn/`, `/de/learn/`, `/pt/learn/` | Small |
| P0 | `LearnLayout` + `LearnNav` accept locale/basePath props | Small |
| P1 | `[lang]/learn/english/` route files + shared content components (extraction only, no new content) | Medium |
| P1 | Grammar page expanded with full auxiliary verb system (English) | Medium |
| P2 | Spanish native-language notes on each grammar rule | Medium |
| P1 | Native-language learn index and shared learn chrome | Small |
| P1 | Native-language explanations for all topic pages | Large |

---

## Acceptance Criteria

1. Visiting `/learn/` shows a language selection screen with English as the only active
   option and 4 locked "coming soon" cards.
2. Clicking the English card navigates to `/learn/english/`.
3. `/es/learn/english/grammar` renders and shows Spanish explanation notes on grammar rules.
4. `/learn/english/grammar` (English default) shows no Spanish notes — only English content.
5. All step links in `LearnNav` resolve correctly on both `/learn/english/grammar` and
   `/es/learn/english/grammar` (no broken internal links).
6. The grammar page covers all 11 auxiliary verb rules from the source doc.
7. The "Learn" link in the top nav of every learn page points to `/learn/` (the picker).
8. `/es/learn/`, `/fr/learn/`, `/de/learn/`, and `/pt/learn/` render localized language picker pages.
9. On localized landing pages, the "Write Better to Speak Better" CTA links to the matching
   localized picker (`/es/learn/`, `/fr/learn/`, `/de/learn/`, `/pt/learn/`) instead of `/learn/`
   or directly to `/[lang]/learn/english/`.
10. `astro build` completes with no errors across all locale routes.
11. `/es/learn/english/`, `/fr/learn/english/`, `/de/learn/english/`, and
    `/pt/learn/english/` render the learning path overview in the page locale.
12. Shared learn chrome, including breadcrumbs, sidebar labels, and CTAs, follows the page locale.
