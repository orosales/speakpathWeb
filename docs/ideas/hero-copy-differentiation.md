---
date: 2026-05-18
last-reviewed: 2026-05-18
status: promoted
roadmap: hero-copy-differentiation
tags: [copy, landing-page, messaging, hero]
---

# Hero Copy Differentiation

## Summary

The current hero presents SpeakPath with generic language-learning promises ("Speak. Learn.
Improve.", "build confidence, vocabulary, and fluency") that any competitor could claim.
The actual differentiator — speak, get per-issue grammar feedback, study the linked theory
page, speak again — never appears in the hero. Five targeted copy changes would fix this
without touching layout or structure.

## Details

All changes are in `src/i18n/site.ts`, English locale only (other locales follow once
the English copy is validated).

### 1. Hero eyebrow

| | Text |
|---|---|
| **Current** | `AI-Powered Fluency Engine` |
| **Proposed** | `Real Conversation Practice` |

"Fluency Engine" is internal product language. "Real Conversation Practice" orients a
stranger in one second and separates SpeakPath from grammar drill apps immediately.

---

### 2. Hero title

| | Text |
|---|---|
| **Current** | `Speak.` / `Learn.` / `Improve.` |
| **Proposed** | `Speak.` / `Get Corrected.` / `Speak Better.` |

"Learn. Improve." is what every language product promises. "Get Corrected." names the
feedback loop mechanism — the thing no competitor front-loads — and is concrete enough
to be memorable.

---

### 3. Hero description

| | Text |
|---|---|
| **Current** | `Master any language through real conversation practice. SpeakPath helps you build confidence, vocabulary, and fluency with responsive AI sessions in real time.` |
| **Proposed** | `Have a real AI conversation — no typing, no scripts. After each session, SpeakPath shows you the grammar mistakes you made and tells you exactly which topic to work on. Then you go back and speak again.` |

The current description is indistinguishable from Duolingo or Babbel marketing. The proposed
version describes the actual product experience — conversation → grammar feedback → topic
guidance → repeat — which is the real differentiator and currently appears nowhere in the hero.

---

### 4. How It Works — Step 3

| | Text |
|---|---|
| **Current** | Title: `Get feedback` / Body: `After each session, review grammar insights, vocabulary notes, and progress.` |
| **Proposed** | Title: `Get feedback — and fix it` / Body: `After each session, SpeakPath flags your grammar patterns and links you directly to the theory page for each issue. Study it, then come back and speak again.` |

Step 3 currently reads like a passive report card. The link between feedback and the theory
pages is the core product mechanic and it's missing from the How It Works narrative entirely.
This bridges How It Works (position 3) and WriteToSpeak (position 6) so the closed loop
lands early and the detail lands later.

---

### 5. WriteToSpeak CTA button

| | Text |
|---|---|
| **Current** | `Explore the Foundation` |
| **Proposed** | `Open the Theory Pages` |

"Foundation" appears twice in the same visual block: section title "Build Your **Speaking
Foundation**" and button "Explore the **Foundation**". "Open the Theory Pages" is direct,
descriptive, and removes the echo.

---

### What to leave unchanged

- `Start Practicing Free` / `No credit card. Get started in minutes.` — honest and friction-free.
- All Features section copy — "Interrupt anytime" description is particularly strong.
- All WriteToSpeak body copy — the messaging we just updated is correct.
- Page structure and section order — no layout changes needed.

## Open Questions

- Does "Get Corrected." land well for the target audience, or does it feel negative/harsh?
  Could test "Speak. Get Feedback. Speak Better." as a softer variant.
- Once English is validated, do the same changes apply to all 5 locales, or only the
  locales with significant traffic?
