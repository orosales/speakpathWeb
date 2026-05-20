# Learn Index Copy Improvements

**Status:** Done  
**Date:** 2026-05-19  
**Scope:** `src/components/learn/LearnIndexContent.astro` — all 5 locales (en, es, fr, de, pt)

## Problem

The intro and method paragraphs on `/learn/english` (and translated equivalents) didn't clearly signal that these lessons are for beginners or people with grammar gaps. The tone was abstract and didn't tell the reader "this is built for you."

Specific issues:
- **Intro** was phrased as a "reference path" — sounds like a glossary, not a foundation course.
- **Para 2** said "you are not learning to write" — correct, but the implicit contrast with speaking was weak. Needed "for its own sake" to land the point.
- **Para 3** jumped straight into instructions without acknowledging who the audience is.

## Changes

### Intro line
- Before: abstract description of a "six-step reference path through structural blocks"
- After: positions it as a **foundation for learners who want to speak confidently**, ending with the same payoff line

### Paragraph 2 (The Method section)
- Before: "you are not learning to write"
- After: "you are not learning to write for its own sake" — clarifies writing is a tool, not the goal

### Paragraph 3 (Instructions)
- Before: jumped straight to "Work through each section in order..."
- After: opens with an inclusive statement — "If you are starting from zero — or if grammar has always felt confusing — these lessons are built for you." Then flows into the step-by-step instructions with added emphasis on building confidence before going to SpeakPath.

## Locales updated
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Portuguese (pt)
