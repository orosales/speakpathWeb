---
status: completed
created: 2026-05-08
completed: 2026-05-08
depends-on:
  - learn-language-picker-and-native-explanations
---

# Native-Language Grammar Instructions

## Goal

Make localized English-learning pages feel written for the learner's native language, while
keeping English as the study target. `/es/learn/english/grammar/`,
`/fr/learn/english/grammar/`, `/de/learn/english/grammar/`, and
`/pt/learn/english/grammar/` should explain the grammar system in the page language, while
preserving English rule names, forms, examples, and practice sentences.

## Current State

The localized grammar route existed, and Spanish helper notes were shown inside some rule cards.
However, the main page title, introduction, section headings, rule descriptions, table labels,
article explanations, and final guidance originally read in English.

This made `/es/learn/english/grammar/` look like an English page with Spanish annotations, not
a native-language-first lesson.

After the Spanish pass, French, German, and Portuguese routes still had English instructional
copy and rendered Spanish example translations, which made those pages confusing for non-Spanish
learners.

## Target State

- Spanish learners see Spanish instructions on `/es/learn/english/grammar/`.
- French learners see French instructions on `/fr/learn/english/grammar/`.
- German learners see German instructions on `/de/learn/english/grammar/`.
- Portuguese learners see Portuguese instructions on `/pt/learn/english/grammar/`.
- English examples remain in English so students still study the target language.
- Native-language translations and notes remain visible where they help clarify meaning.
- The default English route `/learn/english/grammar/` keeps the English copy.
- The implementation is centralized in `GrammarContent.astro`, so no localized page duplicates
  markup.

## Implementation

1. Add localized copy for the grammar page shell:
   - Page title and introduction
   - Main grammar rules heading
   - Table headers
   - Note labels
   - Common mistakes heading
   - Articles section labels and explanations
   - Final "why this helps" guidance

2. Add localized rule descriptions for each auxiliary-verb rule in Spanish, French, German,
   and Portuguese:
   - BE
   - DO / DOES
   - HAVE / HAS
   - WILL
   - GOING TO
   - WOULD
   - SHOULD
   - COULD
   - CAN / BE ABLE TO
   - MAY
   - MUST

3. Add native-language example translations and rule notes for Spanish, French, German, and
   Portuguese.

4. Localize grammar route metadata so search previews match the visible page language.

5. Make the learn layout's Open Graph locale follow the current URL locale instead of always
   declaring `en_US`.

## Files Affected

| File | Change |
|---|---|
| `src/components/learn/GrammarContent.astro` | Adds Spanish, French, German, and Portuguese instructional copy while keeping English examples and rule forms |
| `src/pages/[lang]/learn/english/grammar.astro` | Adds localized title and description metadata |
| `src/layouts/LearnLayout.astro` | Uses the active locale for `og:locale` on learn pages |
| `docs/roadmap/native-language-grammar-instructions.md` | Records the scope, rationale, and acceptance criteria for this pass |

## Out of Scope

- Translating English examples, forms, or rule names.
- Localizing the remaining learn topic pages in this pass.

## Acceptance Criteria

1. `/es/learn/english/grammar/` shows the page title as `Gramática`.
2. `/fr/learn/english/grammar/` shows the page title as `Grammaire`.
3. `/de/learn/english/grammar/` shows the page title as `Grammatik`.
4. `/pt/learn/english/grammar/` shows the page title as `Gramática`.
5. The grammar intro, section headings, rule descriptions, table labels, article guidance, notes,
   and closing explanation use the current page language.
6. English examples such as `She IS happy.` and `Do you study English?` remain in English.
7. French, German, and Portuguese pages do not render Spanish example translations or Spanish-only notes.
8. `/learn/english/grammar/` keeps the existing English instructional copy.
9. Each localized grammar page has localized metadata for the title and description.
10. Localized grammar pages declare the matching Open Graph locale, such as `es_ES`, `fr_FR`, `de_DE`, and `pt_BR`.
11. The site builds successfully.
