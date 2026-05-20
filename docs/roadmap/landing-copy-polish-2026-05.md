---
status: proposal
created: 2026-05-19
completed:
depends-on: [translation-audit-2026-05]
---

# Landing Page Copy Polish — May 2026

## Goal

Fix four content clarity and consistency gaps introduced during the WriteToSpeak section
and FAQ additions. None are translation errors (those were fixed in the May audit) — these
are semantic ambiguity, cross-locale inconsistency, and a minor formatting defect.

---

## Current State

| Issue | Location | Problem |
|---|---|---|
| `langNote` confuses non-English visitors | `writeToSpeak.langNote` × 5 locales | Spanish/French/German/Portuguese sites show "currently available for English learners" with no context — unclear if *they* are the English learners or if the section doesn't apply to them |
| Privacy claim weaker in 4 languages | `faq.items[4].answer` ES / FR / DE / PT | English was upgraded to "never retained after your session ends" in the translation audit; other locales still say "processed only when necessary for the live conversation" — a weaker, vague claim |
| Spanish CTA object has trailing blank line | `src/i18n/site.ts` line 576 | Blank line inside the `es.cta.title` object — cosmetic but messy |
| WriteToSpeak eyebrow says "Learning Path" | `writeToSpeak.eyebrow` (EN) | Section is about theory/foundation study, not a sequential path with levels. "Learning Path" implies progression/stages; the section is reference material |

---

## Target State

| Issue | Target copy |
|---|---|
| `langNote` | Reframe to clarify *what* is limited (the content covers English grammar), not *who* it's for. Example: "Theory pages cover English grammar — more languages coming." |
| Privacy claim | All 5 locales match the English claim: audio is processed in real time and never retained after the session ends |
| Spanish trailing newline | Removed |
| WriteToSpeak eyebrow | Changed from "Learning Path" to "Speaking Foundation" (EN) with matching locale equivalents |

---

## Implementation Plan

### Phase 1: Copy fixes in `src/i18n/site.ts`

**Objective:** All four issues resolved in one file, one commit.

#### 1.1 — Fix `langNote` across all 5 locales

- **File:** `src/i18n/site.ts`
- **Change:** Replace the current `langNote` strings with phrasing that names *what* is
  English-only (the content), not *who* it targets. Visitors on the Spanish or German site
  should immediately understand: "the theory pages are written in English — more language
  versions are coming."

| Locale | Current | Target |
|---|---|---|
| `en` | `Currently available for English learners — more languages coming.` | `Theory pages cover English grammar — Spanish, French, and German coming.` |
| `es` | `Actualmente disponible para estudiantes de inglés — más idiomas próximamente.` | `Las páginas de teoría cubren gramática en inglés — español, francés y alemán próximamente.` |
| `fr` | `Actuellement disponible pour les apprenants d'anglais — d'autres langues bientôt.` | `Les pages de théorie couvrent la grammaire anglaise — espagnol, français et allemand bientôt.` |
| `de` | `Derzeit für Englischlernende verfügbar — weitere Sprachen kommen bald.` | `Die Theorie-Seiten behandeln englische Grammatik — Spanisch, Französisch und Deutsch kommen bald.` |
| `pt` | `Atualmente disponível para estudantes de inglês — mais idiomas em breve.` | `As páginas de teoria cobrem gramática em inglês — espanhol, francês e alemão em breve.` |

#### 1.2 — Align privacy FAQ answer across ES / FR / DE / PT

- **File:** `src/i18n/site.ts`
- **Change:** Update `faq.items[4].answer` in each non-English locale to match the English
  claim. The English version (fixed in the translation audit) reads:
  > "No. SpeakPath does not store voice recordings. Audio is processed in real time and
  > never retained after your session ends."

| Locale | Target |
|---|---|
| `es` | `No. SpeakPath no guarda grabaciones de voz. El audio se procesa en tiempo real y nunca se retiene una vez que termina tu sesión.` |
| `fr` | `Non. SpeakPath ne stocke pas les enregistrements vocaux. L'audio est traité en temps réel et n'est jamais conservé une fois votre session terminée.` |
| `de` | `Nein. SpeakPath speichert keine Sprachaufnahmen. Audio wird in Echtzeit verarbeitet und nach dem Ende deiner Session nicht mehr gespeichert.` |
| `pt` | `Não. O SpeakPath não armazena gravações de voz. O áudio é processado em tempo real e nunca é retido após o término da sua sessão.` |

#### 1.3 — Remove trailing blank line in Spanish CTA

- **File:** `src/i18n/site.ts` — `es.cta.title` object (around line 576)
- **Change:** Remove the blank line between `line2: 'a hablar?',` and the closing `}`.

#### 1.4 — Update WriteToSpeak eyebrow

- **File:** `src/i18n/site.ts`
- **Change:** Update `writeToSpeak.eyebrow` in all 5 locales.

| Locale | Current | Target |
|---|---|---|
| `en` | `Learning Path` | `Speaking Foundation` |
| `es` | `Ruta de aprendizaje` | `Base para hablar` |
| `fr` | `Parcours d'apprentissage` | `Fondation orale` |
| `de` | `Lernpfad` | `Sprech-Fundament` |
| `pt` | `Caminho de Aprendizado` | `Base para falar` |

---

## Files Affected

| File | Changes |
|---|---|
| `src/i18n/site.ts` | `langNote` × 5, `faq.items[4].answer` × 4, trailing newline × 1, `writeToSpeak.eyebrow` × 5 |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Locale translations for `langNote` and privacy claims may not be perfectly idiomatic | Review with a native speaker before shipping, or use the same multi-agent review process as the May audit |
| "Fondation orale" (FR) or "Sprech-Fundament" (DE) may sound awkward | Alternatives: FR → `Base à l'oral`, DE → `Sprechen verstehen` — flag for native review |

---

## Out of Scope

- Changing the "Essay Template" step label (intentional — it is an actual page at `/learn/english/essay-template` per the write-better-speak-better roadmap)
- Adding translated theory pages for non-English learners (tracked in write-better-speak-better.md as v2 scope)
- Any other copy changes beyond the four issues listed above

---

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | `langNote` reframe — semantic clarity for non-English visitors | Small |
| P0 | Privacy claim alignment — trust copy must be consistent across all languages | Small |
| P1 | WriteToSpeak eyebrow rename | Small |
| P2 | Spanish CTA trailing newline | Small |

---

## Acceptance Criteria

1. On the Spanish, French, German, and Portuguese landing pages, the `langNote` text makes clear that the *content* is in English — not that the section is only for people learning English
2. The privacy FAQ answer in ES, FR, DE, and PT contains an explicit "never retained" or equivalent strong claim, matching English
3. The Spanish CTA section (`es.cta.title`) has no trailing blank line inside the object
4. `writeToSpeak.eyebrow` reads "Speaking Foundation" (EN) and locale equivalents — not "Learning Path"
5. No visual regressions on any of the 5 locale landing pages
