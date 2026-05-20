---
status: completed
created: 2026-05-20
completed: 2026-05-20
depends-on:
  - learn-language-picker-and-native-explanations
  - native-language-grammar-instructions
---

# Native-Language Explanations for All Learn Topic Pages

## Goal

Extend the native-language-first approach — already completed for the Grammar page — to the
five remaining English-learning topic pages, so every learner on a localized route sees
explanations, headings, and notes in their own language while still studying English content.

---

## Current State

After completing `native-language-grammar-instructions`, the Grammar page fully supported
es / fr / de / pt. The five other topic pages accepted a `locale` prop but never used it —
every heading, note, and explanation was hardcoded in English, regardless of URL locale.

| Component | Locale-aware before this work |
|---|---|
| `GrammarContent.astro` | ✓ Fully localized (completed prior) |
| `KeyVerbsContent.astro` | ✗ All text hardcoded in English |
| `ConnectorsContent.astro` | ✗ All text hardcoded in English |
| `PhrasalVerbsContent.astro` | ✗ All text hardcoded in English |
| `NounsContent.astro` | ✗ All text hardcoded in English |
| `EssayTemplateContent.astro` | ✗ All text hardcoded in English |

A Spanish speaker visiting `/es/learn/english/key-verbs/` would see everything in English —
the same experience as the default English route.

---

## Target State

- All five topic pages render in the learner's native language when a localized URL is used.
- **English content being taught** (verbs, connectors, phrasal verbs, nouns, essay phrases,
  example sentences) stays in English — it is the study target.
- **Instructional scaffolding** (page titles, section headings, category labels, usage notes,
  meanings, "Why this helps" guidance) renders in the page locale.
- The default `/learn/english/` routes continue to render in English.
- Implementation is centralized in each `*Content.astro` component — no changes needed to
  page files or layouts.

---

## Implementation

The same `localizedCopy` + locale-keyed data pattern used in `GrammarContent.astro` was
applied to all five components.

### Pattern applied

Each component was updated with:

1. **`type SupportedLocale`** and a `currentLocale` guard identical to `GrammarContent.astro`.
2. **`localizedCopy` object** — a map of `en | es | fr | de | pt` → all UI strings for
   that component (page title, intro, section headings, table headers, "Why this helps" text).
3. **Locale-keyed data maps** — arrays of content items were refactored to embed a
   `{ en, es, fr, de, pt }` map on each field that benefits from translation:
   - Verb notes in `KeyVerbsContent`
   - Category labels in `ConnectorsContent`, `PhrasalVerbsContent`, `NounsContent`
   - Phrasal verb meanings in `PhrasalVerbsContent`
   - Noun usage notes and plural notes in `NounsContent`
4. **Helper functions** (`getNote`, `getMeaning`, `getCategoryLabel`) that select the
   right locale string at render time — same approach as `getRuleDescription` in Grammar.
5. **Template updated** to use `copy.xxx` and helper calls instead of hardcoded strings.

### What was translated per component

| Component | Translated |
|---|---|
| `KeyVerbsContent.astro` | Page title, intro, section titles, verb usage notes (all 15 verbs), make/do explanation, stative verbs description, "Why this helps" |
| `ConnectorsContent.astro` | Page title, intro, 6 category labels, table headers, Formal vs Conversational labels, register note, "Why this helps" |
| `PhrasalVerbsContent.astro` | Page title, intro, "How they work" section, Separable/Inseparable section, 5 category labels, meanings for all 27 phrasal verbs, table headers, "Why this helps" |
| `NounsContent.astro` | Page title, intro, 6 category labels, uncountable section title and description, all 8 uncountable noun notes, collocations section, table headers, all 6 tricky plural notes, "Why this helps" |
| `EssayTemplateContent.astro` | Page title, intro, connection section, structure section (all labels and descriptions for Introduction/PEEL/Conclusion), section starter labels, weekly exercise (title, description, all 5 daily steps), "Why this helps" |

### What was kept in English

- All English example sentences
- All actual English words being taught (verbs, connectors, phrasal verb entries, nouns)
- Essay sentence starters (these are the English patterns being studied)
- PEEL letter labels (`P`, `E`, `E`, `L`) and their English names (`Point`, `Evidence`, etc.)

---

## Files Affected

| File | Changes |
|---|---|
| `src/components/learn/KeyVerbsContent.astro` | Added `localizedCopy` + per-verb `note` locale maps; template uses `copy.*` |
| `src/components/learn/ConnectorsContent.astro` | Added `localizedCopy` + per-category `label` locale maps; template uses `copy.*` |
| `src/components/learn/PhrasalVerbsContent.astro` | Added `localizedCopy` + per-category `label` and per-item `meaning` locale maps |
| `src/components/learn/NounsContent.astro` | Added `localizedCopy` + locale maps for categories, uncountable notes, plural notes |
| `src/components/learn/EssayTemplateContent.astro` | Added full `localizedCopy` object per locale including all prose sections and daily steps |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Translation quality for fr / de / pt | Copy was authored to match the style and register of Grammar page translations |
| English phrases embedded in translated prose (e.g. "give up") | Kept in English intentionally — they are the target vocabulary |
| Essay PEEL labels shown in English even in non-English locales | Intentional: P/E/E/L and their English names are the universal acronym; descriptions are localized |
| Component file size grows significantly | Accepted trade-off — all locale data in one file keeps co-location and avoids import complexity |

---

## Out of Scope

- Localizing `LearnNav` step labels (covered by `learn-language-picker-and-native-explanations`)
- Localizing `LearnLayout` breadcrumbs and chrome
- Translating the actual English examples and example sentences
- Adding new locales beyond en / es / fr / de / pt

---

## Acceptance Criteria

1. `/es/learn/english/key-verbs/` shows the page title as `Verbos clave` and all verb
   usage notes in Spanish.
2. `/fr/learn/english/connectors/` shows the page title as `Connecteurs` and category labels
   in French.
3. `/de/learn/english/phrasal-verbs/` shows phrasal verb meanings in German (e.g. `aufgeben`
   for "give up").
4. `/pt/learn/english/nouns/` shows uncountable noun notes in Portuguese.
5. `/es/learn/english/essay-template/` shows the weekly exercise steps in Spanish.
6. All five English default routes (`/learn/english/key-verbs/`, etc.) continue to render in English.
7. French, German, and Portuguese pages do not display Spanish text or Spanish-only notes.
8. `astro build` completes with no errors across all locale routes.
