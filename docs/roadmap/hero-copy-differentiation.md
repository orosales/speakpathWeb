---
status: completed
created: 2026-05-18
completed: 2026-05-19
depends-on: []
---

# Hero Copy Differentiation

## Goal

Replace the generic language-learning promises in the hero and How It Works sections with
copy that describes SpeakPath's actual differentiator — the closed feedback loop: speak,
get per-issue grammar feedback, act on the topic guidance, speak again.

---

## Current State

All copy lives in `src/i18n/site.ts`. The five fields that need changing are in the English
locale block (`en:`, starting at line 160).

### Hero (`hero:`, line ~172)

| Field | Current value |
|---|---|
| `eyebrow` | `'AI-Powered Fluency Engine'` |
| `title.top` | `'Speak.'` |
| `title.accent` | `'Learn.'` |
| `title.bottom` | `'Improve.'` |
| `description` | `'Master any language through real conversation practice. SpeakPath helps you build confidence, vocabulary, and fluency with responsive AI sessions in real time.'` |

### How It Works — Step 3 (`howItWorks.steps[2]`, line ~218)

| Field | Current value |
|---|---|
| `title` | `'Get feedback'` |
| `body` | `'After each session, review grammar insights, vocabulary notes, and progress.'` |

### WriteToSpeak CTA (`writeToSpeak.cta`, line ~344)

| Field | Current value |
|---|---|
| `cta` | `'Explore the Foundation'` |

### What's wrong

- `'AI-Powered Fluency Engine'` is internal product jargon — no visitor thinks in those words.
- `'Speak. Learn. Improve.'` is the promise of every language app. It communicates nothing specific.
- The hero description is indistinguishable from Duolingo or Babbel copy.
- How It Works Step 3 describes a passive report card, not the active feedback loop that is the product's core mechanic.
- `'Explore the Foundation'` echoes "Foundation" from the section title ("Build Your **Speaking Foundation**") in the same visual block.

---

## Target State

### Hero — after

| Field | Proposed value |
|---|---|
| `eyebrow` | `'Real Conversation Practice'` |
| `title.top` | `'Speak.'` |
| `title.accent` | `'Get Corrected.'` |
| `title.bottom` | `'Speak Better.'` |
| `description` | `'Have a real AI conversation — no typing, no scripts. After each session, SpeakPath shows you the grammar mistakes you made and tells you exactly which topic to work on. Then you go back and speak again.'` |

**Note on `title.accent`:** "Get Corrected." names the mechanism no competitor front-loads.
The risk is that some visitors read it as harsh. A softer fallback is `'Get Feedback.'` —
less distinctive but safer. Decide before implementing.

### How It Works — Step 3 — after

| Field | Proposed value |
|---|---|
| `title` | `'Get feedback — and fix it'` |
| `body` | `'After each session, SpeakPath flags your grammar patterns and links you directly to the theory page for each issue. Study it, then come back and speak again.'` |

This bridges How It Works (position 3 on the page) and the WriteToSpeak section (position 6)
so the closed loop is introduced early and expanded on later.

### WriteToSpeak CTA — after

| Field | Proposed value |
|---|---|
| `cta` | `'Open the Theory Pages'` |
| `note` *(new)* | `'Currently available for English learners — more languages coming.'` |

---

## Implementation Plan

### Phase 1: English copy

**Objective:** Update the five English fields. No layout, no component, no locale changes.

#### 1.1 — Update hero eyebrow, title, and description

- **File:** `src/i18n/site.ts`
- **Block:** `en.hero` (~line 172)
- **Change:** Replace `eyebrow`, `title.accent`, `title.bottom`, and `description` with the
  values in the Target State table above. `title.top` (`'Speak.'`) and `note`, `cta`,
  `companionEyebrow`, `companionTitle`, `companionLanguages` are unchanged.

#### 1.2 — Update How It Works Step 3

- **File:** `src/i18n/site.ts`
- **Block:** `en.howItWorks.steps[2]` (~line 218)
- **Change:** Replace `title` and `body` with the values in the Target State table above.
  Steps 1 and 2 are unchanged.

#### 1.3 — Update WriteToSpeak CTA

- **File:** `src/i18n/site.ts`
- **Block:** `en.writeToSpeak.cta` (~line 344)
- **Change:** Replace `'Explore the Foundation'` with `'Open the Theory Pages'`.
  All other writeToSpeak fields are unchanged.

#### 1.4 — Add language availability note to WriteToSpeak

- **File:** `src/i18n/site.ts`
- **Block:** `en.writeToSpeak` (~line 344)
- **Change:** Add a `note` field (or equivalent) with the text
  `'Currently available for English learners — more languages coming.'`
  Display it below the CTA button in the WriteToSpeak section.
- **Why:** Without this, non-English visitors (and AI models browsing the page) may infer
  that theory pages exist for all languages. This one line sets the correct expectation
  and signals active development rather than a gap.

---

### Phase 2: Non-English locales

**Objective:** Apply parallel changes to es, fr, de, pt alongside Phase 1.

#### 2.1 — Update hero eyebrow, title, description

- **File:** `src/i18n/site.ts`
- **Locales:** es (~line 400), fr (~line 640), de (~line 880), pt (~line 1120)
- **Change:** For each locale, re-translate the three hero fields to parallel the new
  English framing — concrete mechanism over generic promise.

#### 2.2 — Update How It Works Step 3

- **File:** `src/i18n/site.ts`
- **Change:** For each non-English locale, adapt Step 3 body to avoid mentioning the theory
  page link (English-only feature). Use phrasing like "tells you which grammar topics to
  focus on" instead of "links you directly to the theory page". Title (`'Get feedback — and fix it'`
  equivalent) can be translated as-is.

#### 2.3 — Update WriteToSpeak CTA

- **File:** `src/i18n/site.ts`
- **Change:** Replace the "Explore the Foundation" equivalent in each locale with a
  direct translation of "Open the Theory Pages". Also translate the `note` field
  (`'Currently available for English learners — more languages coming.'`) for each locale.

---

## Files Affected

| File | Changes |
|---|---|
| `src/i18n/site.ts` | 6 English fields (Phase 1); 3 fields × 4 locales (Phase 2) |

No component files, no layout files, no CSS changes.

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| `'Get Corrected.'` reads as harsh or discouraging | Decide between primary and fallback before coding; `'Get Feedback.'` is the safe alternative |
| Phase 2 translations introduce tone drift | Treat each locale as an independent review; the English version is the reference |
| Hero title change affects line breaks at large screen sizes | Spot-check at `md:text-7xl` and `lg:text-[5.2rem]` breakpoints — the three-word structure is the same length as current |

---

## Out of Scope

- Changes to `Hero.astro`, `HowItWorks.astro`, or `WriteToSpeak.astro` component structure
- Changes to any other copy fields (Features, Levels, ComingSoon, CTA, FAQ)
- SEO meta title/description (separate concern)
- A/B testing infrastructure
- Analytics tracking of copy variant performance

---

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | English hero eyebrow, title, description (1.1) | Small |
| P0 | How It Works Step 3 (1.2) | Small |
| P1 | WriteToSpeak CTA button (1.3) | Small |
| P1 | WriteToSpeak language availability note (1.4) | Small |
| P2 | Non-English locale updates (Phase 2) | Small |

---

## Acceptance Criteria

1. Hero eyebrow reads `'Real Conversation Practice'` (not `'AI-Powered Fluency Engine'`)
2. Hero title reads `Speak. / [Get Corrected. or Get Feedback.] / Speak Better.`
3. Hero description describes the conversation → feedback → topic guidance → repeat loop explicitly
4. How It Works Step 3 title and body reference the theory page link
5. WriteToSpeak CTA button no longer repeats "Foundation"
6. WriteToSpeak section displays the language availability note below the CTA button
7. All unchanged fields (`title.top`, `note`, `cta`, Steps 1–2, all other sections) are unmodified
8. No TypeScript errors (`tsc --noEmit` or `astro check` passes)
9. Page renders correctly at mobile, tablet, and desktop breakpoints
