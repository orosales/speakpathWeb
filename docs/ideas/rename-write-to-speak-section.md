---
date: 2026-05-18
last-reviewed: 2026-05-18
status: promoted
roadmap: rename-build-speaking-foundation
tags: [copy, landing-page, messaging]
---

# Rename "Write Better to Speak Better" Section

## Summary

Rename the `writeToSpeak` homepage section from "Write Better to Speak Better" to "Build
Your Speaking Foundation" to eliminate visitor confusion about whether SpeakPath is a writing
tool. Every line of copy should anchor on the speaking outcome — grammar study is the
accelerator, not the destination.

## Details

### Problem

"Write Better to Speak Better" leads with "write" on a product whose entire identity is
speaking. First-time visitors may misread the product category and search traffic from
writing-tool queries (email/essay) could pollute the funnel.

### English copy changes (`src/i18n/site.ts`, en locale)

| Field | Before | After |
|---|---|---|
| `title.line1` | `Write Better to` | `Build Your` |
| `title.accent` | `Speak Better` | `Speaking Foundation` |
| `description` | "The fastest path to fluency starts on paper…" | "Fluency means speaking without thinking…" |
| `body1` | "Writing forces you to slow down…" | "Real fluency is when grammar becomes automatic…" |
| `body2` | "Work through the foundation. Then open the app…" | "Work through the pages, then open the app…" |

Unchanged: `cta`, `ctaNote`, `steps` (Grammar, Key Verbs, Connectors, Phrasal Verbs, Nouns,
Essay Template).

### Other locales

All four non-English locales (es, fr, de, pt) carry the same writing-first framing. Each
should be updated to parallel the new messaging — speaking outcome first, grammar study as
the tool.

### Messaging principle

Speaking is the goal, grammar study is the accelerator. Every line of copy anchors on the
speaking outcome — the writing/study method is never the destination.

## Open Questions

## Next Step

Promote to roadmap
