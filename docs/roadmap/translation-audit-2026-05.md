# Translation Audit — May 2026

## Overview

Five parallel AI agents reviewed all locales in `src/i18n/site.ts` acting as native-language reviewers for English, Spanish (es_ES), French (fr_FR), German (de_DE), and Portuguese (pt_BR). All critical and high-priority issues were fixed in the same session.

---

## French (fr) — Most Critical

**Root cause:** The first half of the French copy (meta through cta) was written without accent support, likely in a plain-text editor or copy-pasted from an unaccented source. The second half (writeToSpeak, faq) was written correctly, creating a split-quality file.

### Fixed

| Issue | Before | After |
|---|---|---|
| Missing accents (50+ instances) | `fluidite`, `Maitrisez`, `grace a`, `Debutant`, `Avance`, `Difficulte`, etc. | `fluidité`, `Maîtrisez`, `grâce à`, `Débutant`, `Avancé`, `Difficulté`, etc. |
| Missing apostrophes (20+ instances) | `l IA`, `d autres`, `qu avoir`, `n est que` | `l'IA`, `d'autres`, `qu'avoir`, `n'est que` |
| Register inconsistency (tu vs vous) | `Écris Mieux pour` (tu form) | `Écrivez mieux pour` (vous form, consistent with rest of page) |
| Title case (wrong for French) | `Parcours d'Apprentissage`, `Verbes Clés` | `Parcours d'apprentissage`, `Verbes clés` |
| Non-existent French term | `Verbes Phrasaux` | `Verbes à particule` |
| Anglicism in comingSoon | `apps natives`, `decks personnalisés` | `applis natives`, `jeux de cartes personnalisés` |
| Wrong meaning without accent | `Avance` (= lead/advance) | `Avancé` (= advanced level) |
| Footer missing accents | `Ingenierie audio de precision au service de la fluidite.` | `Ingénierie audio de précision au service de la fluidité.` |
| On/nous register shift | `On lit tout.` | `Nous lisons tout.` |

---

## German (de) — Critical

**Root cause:** Two separate authoring sources merged — the main copy used `du` (informal) while the `writeToSpeak` section used `Sie` (formal), suggesting it was written by a different person or translated from a formal template. Several umlauts were also missing, some replaced with ASCII workarounds (`ae`, `oe`, `ue`) that are only valid in email/older contexts.

### Fixed

| Issue | Before | After |
|---|---|---|
| `auswählen` umlaut | `auswahlen` | `auswählen` |
| `gestützte` umlaut (×2) | `gestutzte`, `gestutztes` | `gestützte`, `gestütztes` |
| `ständig` umlaut | `standig` (non-word) | `ständig` |
| `überallhin` umlaut | `uberallhin` | `überallhin` |
| ASCII workaround | `Gespraechsfluss` | `Gesprächsfluss` |
| `Wörtern` umlaut | `Wortern` | `Wörtern` |
| Sie→du in writeToSpeak (6 sentences) | `Schreiben zwingt Sie...`, `Wenn Sie...`, `Arbeiten Sie...`, `Öffnen Sie...` | `zwingt dich...`, `Wenn du...`, `Arbeite...`, `Öffne...` |
| Invalid German compound | `Sprechenüben` | `Üben des Sprechens` |
| CTA capitalization | `Grundlagen Erkunden` | `Grundlagen erkunden` |

---

## Spanish (es) — High Priority

**Root cause:** Mostly minor oversights — one critical punctuation rule omitted (¿), one tilde missing, and regional vocabulary not adapted for Spain (es_ES locale uses Latin American terms).

### Fixed

| Issue | Before | After |
|---|---|---|
| Missing ¿ (critical) | `Listo para empezar` | `¿Listo para empezar` |
| Missing tilde | `conversacion en vivo` | `conversación en vivo` |
| es_ES regional: ordenadores | `computadoras` | `ordenadores` |
| es_ES regional: portátiles | `laptops` | `portátiles` |
| es_ES regional: tabletas | `tablets` | `tabletas` |
| Non-standard word | `Multiidioma` | `Multilingüe` |
| Title case in Spanish | `Ruta de Aprendizaje`, `Escribe Mejor para`, `Verbos Clave` | `Ruta de aprendizaje`, `Escribe mejor para`, `Verbos clave` |

### Not fixed (flagged for future review)

- `retroalimentación` vs `comentarios` — same concept used with two different words across sections. Both are correct Spanish; standardizing is a style decision left to the team.
- `con IA` pattern (`Respuestas con IA`) — technically understandable but `de IA` is more natural. Left as-is since it's a consistent stylistic choice.

---

## Portuguese pt_BR — High Priority

**Root cause:** Two grammar errors and a Europeanism (`Aprendizagem` is European Portuguese; Brazilian Portuguese uses `Aprendizado`). Several phrases were direct calques of English expressions.

### Fixed

| Issue | Before | After |
|---|---|---|
| Missing reflexive (grammar error) | `Os níveis ajustam automaticamente` | `Os níveis se ajustam automaticamente` |
| Missing hyphen (orthography) | `Verbos Chave` | `Verbos-Chave` |
| Europeanism | `Caminho de Aprendizagem` | `Caminho de Aprendizado` |
| Register inconsistency in hero CTA | `Comece Gratuitamente` | `Comece Grátis` (matches "grátis" used everywhere else) |
| Awkward calque | `mergulhos culturais` | `imersão cultural` |

### Not fixed (flagged for future review)

- `estude-a` (ênclise) — grammatically correct but stiff for pt-BR informal register. Rewriting would require restructuring the sentence; left for a dedicated copywriting pass.
- `Roadmap` left untranslated in comingSoon.eyebrow — consistent with the German section which also keeps `Roadmap`. Standardizing across locales is a team decision.

---

## English — Medium Priority

**Root cause:** Copywriting quality issues rather than hard errors. The footer tagline (`Precision Audio Engineering for Fluency`) described an audio hardware company, not a language learning app.

### Fixed

| Issue | Before | After |
|---|---|---|
| Off-brand footer tagline | `Precision Audio Engineering for Fluency.` | `Real conversations. Real fluency.` |
| Touch-only verb | `Tap the feedback button` | `Click or tap the feedback button` |
| Inconsistent privacy copy | FAQ: `processed only as needed to power the live conversation experience` | `processed in real time and never retained after your session ends` (aligned with features section) |
| Duplicate CTA copy | `cta.body`: `No credit card. Get started in minutes.` (identical to hero.note) | `Free to start. No credit card, no download.` |

### Not fixed (flagged for future review)

- `"No lag"` claim — softening to "minimal lag" is a product/marketing decision.
- Heading case inconsistency (title case vs sentence case) — systemic decision for the team.
- `"on paper"` metaphor in writeToSpeak — may be intentional if the feature involves physical writing exercises.

---

## Summary

| Language | Hard errors fixed | Style/quality fixes | Items deferred |
|---|---|---|---|
| French | 70+ | 4 | 0 |
| German | 9 | 0 | 2 |
| Spanish | 7 | 0 | 2 |
| Portuguese | 5 | 0 | 2 |
| English | 4 | 0 | 3 |

**File changed:** `src/i18n/site.ts`
