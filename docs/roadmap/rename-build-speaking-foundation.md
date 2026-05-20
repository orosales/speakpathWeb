---
status: completed
created: 2026-05-18
completed: 2026-05-18
depends-on: []
---

# Rename "Write Better to Speak Better" → "Build Your Speaking Foundation"

## Goal

Rewrite the `writeToSpeak` homepage section copy so it leads with speaking — not writing —
eliminating the risk that first-time visitors mistake SpeakPath for a writing tool.

---

## Current State

### English copy (`src/i18n/site.ts`, line 338)

| Field | Current value |
|---|---|
| `title.line1` | `'Write Better to'` |
| `title.accent` | `'Speak Better'` |
| `description` | `'The fastest path to fluency starts on paper. Six structured theory pages connecting grammar, vocabulary, and speaking practice — with a direct link into the app to practice what you learn.'` |
| `body1` | `'Writing forces you to slow down and get things right. When you fix a sentence on paper, you build a pattern that later comes out automatically in conversation — no conscious effort.'` |
| `body2` | `'Work through the foundation. Then open the app and speak. When you get grammar feedback, come back to the relevant page and study it. That closed loop is where the learning happens.'` |
| `cta` | `'Explore the Foundation'` *(unchanged)* |
| `ctaNote` | `'Free — no account needed to read the theory'` *(unchanged)* |
| `steps` | Grammar, Key Verbs, Connectors, Phrasal Verbs, Nouns, Essay Template *(unchanged)* |

### Other locales

All four non-English locales (es, fr, de, pt) carry the same "write to speak" framing in
their `writeToSpeak` blocks — titles, descriptions, and body copy all lead with writing.

---

## Target State

### English copy — after

| Field | New value |
|---|---|
| `title.line1` | `'Build Your'` |
| `title.accent` | `'Speaking Foundation'` |
| `description` | `'Fluency means speaking without thinking. Six theory pages covering the grammar patterns that come up most in real conversation — study the foundation here, then practice it out loud in SpeakPath.'` |
| `body1` | `'Real fluency is when grammar becomes automatic — you stop translating and start speaking. Studying the patterns behind natural speech builds that automation faster than conversation practice alone.'` |
| `body2` | `'Work through the pages, then open the app and speak. When SpeakPath flags a grammar issue, come back to the relevant page. That closed loop is where real fluency builds.'` |

**Messaging principle:** Speaking is the goal, grammar study is the accelerator. Every line
of copy anchors on the speaking outcome — the writing/study method is never the destination.

### Other locales

Same messaging principle applied: re-translate each non-English `writeToSpeak` block so it
leads with the speaking outcome, not the writing method.

---

## Implementation Plan

### Phase 1: English copy update

**Objective:** Update the English `writeToSpeak` block in `site.ts`.

#### 1.1 — Update `title`, `description`, `body1`, `body2`

- **File:** `src/i18n/site.ts`
- **Change:** Replace the four fields listed in the Current State → Target State table above.
  Leave `eyebrow`, `cta`, `ctaNote`, and `steps` untouched.

---

### Phase 2: Other locale review

**Objective:** Apply the speaking-first framing to es, fr, de, pt.

#### 2.1 — Rewrite non-English `writeToSpeak` blocks

- **File:** `src/i18n/site.ts`
- **Locales:** es (line 579), fr (line 819), de (line 1059), pt (line 1299)
- **Change:** For each locale, update `title`, `description`, `body1`, `body2` so they
  parallel the new English messaging — speaking outcome first, grammar study as the tool.
  Keep translated `cta`, `ctaNote`, and `steps` as-is.

---

### Phase 3: Roadmap reference update

**Objective:** Keep internal docs consistent with the new section name.

#### 3.1 — Update `write-better-speak-better.md` references

- **File:** `docs/roadmap/write-better-speak-better.md`
- **Change:** Anywhere the document refers to "Write Better to Speak Better" as the section
  name or heading, update to "Build Your Speaking Foundation". The document title and Goal
  can stay as-is since the file describes the structural feature (the learn pages), not the
  copy.

---

## Files Affected

| File | Change |
|---|---|
| `src/i18n/site.ts` | English `writeToSpeak` — update 4 copy fields; review and update 4 non-English locales |
| `docs/roadmap/write-better-speak-better.md` | Update in-document references to the old section name |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Non-English rewrites introduce mistranslations | Treat as a copy pass, not a structural change — each locale rewrite can be reviewed independently |
| "Build Your Speaking Foundation" may conflict with `cta: 'Explore the Foundation'` | Both use "Foundation" intentionally — one names the section, one is the button. Acceptable because they appear in different positions. |
| Other roadmap docs reference the old section name | Only `write-better-speak-better.md` is confirmed to reference it; a quick grep for `"Write Better to"` covers the rest |

---

## Out of Scope

- Renaming the `writeToSpeak` key itself in `site.ts` (needless refactor, no user-facing impact)
- Changes to `WriteToSpeak.astro` component structure or layout
- Changes to the `/learn` theory pages themselves
- Updating the roadmap document file name (`write-better-speak-better.md` stays as-is)

---

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | English copy update (Phase 1) | Small |
| P1 | Non-English locale rewrites (Phase 2) | Small |
| P2 | Internal roadmap reference cleanup (Phase 3) | Small |

---

## Acceptance Criteria

1. Homepage `writeToSpeak` section title reads "Build Your **Speaking Foundation**" (not "Write Better to Speak Better")
2. English description, body1, body2 match the target copy exactly
3. `cta`, `ctaNote`, and `steps` are unchanged in all locales
4. Non-English locales no longer lead with "write" — each title and description frames speaking as the outcome
5. No TypeScript errors (`tsc --noEmit` passes)
6. All existing e2e tests pass (`npm run test:e2e`)
