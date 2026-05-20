---
status: completed
created: 2026-05-19
completed: 2026-05-19
depends-on: []
---

# BE Verb Clarity — Grammar Page

## Goal

Make the BE rule card on `/learn/english/grammar` self-explanatory for speakers of all
five supported languages, by surfacing the present/past distinction visually and showing
the native-language equivalent for every conjugation form.

---

## Problem

The BE rule section had two gaps that forced learners to mentally cross-reference:

1. **No tense label on table rows.** The two example rows (IS / WERE) had no visual
   indicator of which was present and which was past. A learner scanning the table had
   to infer this from the auxiliary itself.

2. **No native-language conjugation equivalent.** The conjugation breakdown showed only
   the English forms (`I AM · He/She/It IS · You/We/They ARE`). Non-English speakers
   had no anchor connecting those forms to what they already know in their language.

---

## Solution

### 1 — Tense label on each table row

A small uppercase label (`PRESENT` / `PAST`) appears above the affirmative cell of each
BE row. The label is pulled from `copy.conjugationLabels` so it renders in the page
language (Presente, Présent, Präsens, etc.).

Only the BE rule triggers this — other rules don't use `tenseKey` on their rows.

### 2 — Native-language equivalent in the conjugation breakdown

Each tense box in the BE conjugation breakdown now shows two lines:

```
PRESENT
I AM · He/She/It IS · You/We/They ARE     ← English (always shown)
soy/estoy · es/está · somos/estamos       ← native equivalent (non-English only)

PAST
I/He/She/It WAS · You/We/They WERE
era/estaba · era/estaba · eran/estaban
```

The native equivalents are stored in `beEquivalent` inside `localizedCopy`. English
locale has empty strings so nothing extra renders.

---

## Native-language equivalents per locale

| Locale | Present | Past |
|--------|---------|------|
| es | `soy/estoy · es/está · somos/estamos` | `era/estaba · era/estaba · eran/estaban` |
| fr | `suis · est · sommes/êtes/sont` | `étais/était · étions/étiez/étaient` |
| de | `bin · ist · sind/seid` | `war · war · waren/wart` |
| pt | `sou/estou · é/está · somos/estamos` | `era/estava · era/estava · eram/estavam` |

Order follows the English reference: I → He/She/It → You/We/They.
For past: I/He/She/It (WAS) → You/We/They (WERE).

---

## Files changed

| File | Change |
|------|--------|
| `src/components/learn/GrammarContent.astro` | Added `beEquivalent` to all locales in `localizedCopy`; added `tenseKey` to BE rule rows; updated conjugation breakdown template and table row rendering |

---

## Notes

- BE maps to two verbs in Spanish and Portuguese (`ser`/`estar`), so equivalents use
  slash notation (`soy/estoy`). French and German map to a single verb.
- The `tenseKey` field is only present on BE rows. The template uses `'tenseKey' in row`
  to guard against undefined access on all other rules.
