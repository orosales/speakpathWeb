---
status: proposal
created: 2026-05-04
completed:
depends-on: []
---

# Write Better to Speak Better — English Theory Section

## Goal

Add a structured English theory section to speakpath.dev and connect it to the app's
grammar feedback panel, creating a closed learning loop: users who practice speaking get
personalized links to theory pages for their weak spots, and visitors who start from
theory get a direct path into the app to practice what they learned.

---

## Current State

### Landing page (speakpath.dev — `/home/omar/u1/code/agentVoiceWeb`)

| Component | Description |
|---|---|
| `src/pages/index.astro` | English landing page root |
| `src/pages/[lang]/index.astro` | Localized variants (es, fr, de, pt) |
| `src/components/LandingPage.astro` | Assembles Hero, Languages, HowItWorks, Levels, Features, ComingSoon, CTA |
| `src/i18n/site.ts` | All copy and locale data (1054 lines) |
| `src/layouts/Base.astro` | Shared HTML shell, nav, footer |

No theory or `/learn` pages exist. No navigation to educational content.

### App (app.speakpath.dev — `/home/omar/u1/code/agentVoice`)

| Component | Description |
|---|---|
| `client/src/components/GrammarReport.tsx` | Post-session dialog showing grammar issues and progress |
| `client/src/types/progress.ts` | `UserProgress.issueRecurrence` has `fixed`, `persistent`, `emerging` string arrays |
| `server/src/services/grammarAnalyzer.ts` | Assigns a `category` slug to each grammar issue |

Grammar categories currently produced by the analyzer:
`verb-conjugation`, `gender-agreement`, `subjunctive`, `ser-estar`, `word-order`,
`vocabulary`, `article-use`, `tense`, `preposition`, `phrasal-verb`

No links from the feedback panel to external content exist today.

---

## Target State

### Landing page

- A new **"Write Better to Speak Better"** section on the homepage acts as the entry point
  to the theory content, with a CTA pointing to `/learn/english`.
- Seven new pages under `/learn/english/*` covering the full learning path:

| URL | Content |
|---|---|
| `/learn/english` | Index: personal story intro + learning path overview |
| `/learn/english/grammar` | Grammar fundamentals |
| `/learn/english/key-verbs` | Most-used verbs for natural speech |
| `/learn/english/connectors` | Openers and sentence connectors |
| `/learn/english/phrasal-verbs` | Common phrasal verbs used by native speakers |
| `/learn/english/nouns` | Core nouns vocabulary |
| `/learn/english/essay-template` | Essay structure template — putting it all together |

- Each theory page has:
  - Sticky sidebar (desktop) with numbered steps highlighting the current page
  - Horizontal step pills + prev/next buttons (mobile)
  - A **"Practice Speaking →"** CTA at the bottom linking to `https://app.speakpath.dev`
  - SEO meta title and description
- No exercises. Reference content only.
- English content only (v1). No i18n prefix — pages live at `/learn/english/*` directly.

### App

- New environment variable: `VITE_THEORY_BASE_URL=https://speakpath.dev`
- A category-to-page mapping table determines which theory URL to show per grammar issue.
- In `GrammarReport.tsx`, **persistent** grammar issues for English sessions show a
  "Study this topic →" link that opens the relevant theory page in a new tab.
- If a category has no mapping, no link is shown (silent fallback).
- Links only appear when the session language is English.

---

## Implementation Plan

### Phase 1: Landing page — structure and navigation

**Objective:** Create all `/learn/english` pages with correct layout and navigation. Content
can be placeholder text — the structure ships first.

#### 1.1 — Create `LearnLayout.astro`

- **File:** `src/layouts/LearnLayout.astro` *(new)*
- **Change:** Layout wrapper for all `/learn/*` pages. Includes the Base shell plus:
  - Sticky left sidebar on desktop listing all 6 steps (numbered, highlights current)
  - Horizontal step pills on mobile
  - Prev / Next navigation buttons at the bottom of each page
  - "Practice Speaking →" CTA button pointing to `https://app.speakpath.dev`
- Style using existing design tokens: dark theme, teal (`#58f5d1`) accent, `font-headline`,
  rounded cards consistent with the rest of speakpath.dev.

#### 1.2 — Create `LearnNav.astro`

- **File:** `src/components/LearnNav.astro` *(new)*
- **Change:** Sidebar/step navigation component. Accepts `currentSlug` prop and renders
  the ordered list of theory topics, linking each to its page. Marks the current page active.
  Reused by `LearnLayout.astro` for both sidebar (desktop) and step pills (mobile).

#### 1.3 — Create `/learn/english` index page

- **File:** `src/pages/learn/english/index.astro` *(new)*
- **Change:** Uses `LearnLayout`. Contains:
  - Short personal story section ("this is how I learned English")
  - Overview of the 6-step learning path as clickable cards
  - CTA to start at step 1 (Grammar)

#### 1.4 — Create the 6 topic pages

- **Files:** *(all new)*
  - `src/pages/learn/english/grammar.astro`
  - `src/pages/learn/english/key-verbs.astro`
  - `src/pages/learn/english/connectors.astro`
  - `src/pages/learn/english/phrasal-verbs.astro`
  - `src/pages/learn/english/nouns.astro`
  - `src/pages/learn/english/essay-template.astro`
- **Change:** Each uses `LearnLayout`. Placeholder content sections structured to receive
  the real content in Phase 2. Each page has correct `<meta>` title and description.

#### 1.5 — Add homepage entry point section

- **File:** `src/components/LandingPage.astro`
- **Change:** Add a new `<WriteToSpeak />` section between `Features` and `ComingSoon`.
  Section includes a heading ("Write Better to Speak Better"), 2–3 line explanation of the
  methodology, and a CTA button: "Explore the Foundation →" linking to `/learn/english`.

- **File:** `src/components/WriteToSpeak.astro` *(new)*
- **Change:** The section component itself, styled consistently with the landing page.

---

### Phase 2: Content creation

**Objective:** Fill each theory page with real reference content. This phase is content
work, not code work.

#### 2.1 — Write content for each page

For each of the 6 topic pages, the content follows this structure:
- Short intro (1–2 paragraphs)
- Reference material (tables, lists — no exercises)
- "Why this helps your speaking" closing note

**Content priority order** (matches the learning path):
1. Grammar
2. Key Verbs
3. Connectors
4. Phrasal Verbs
5. Nouns
6. Essay Template

#### 2.2 — Write the personal story intro for the index page

- 2–3 paragraphs explaining the "write to speak" methodology from personal experience.
- Should feel like advice from a mentor, not marketing copy.

---

### Phase 3: App integration

**Objective:** Connect the grammar feedback panel to the theory pages.

#### 3.1 — Add environment variable

- **File:** `client/.env.production` (and `.env` for local dev)
- **Change:** Add `VITE_THEORY_BASE_URL=https://speakpath.dev`

#### 3.2 — Create category mapping table

- **File:** `client/src/lib/theoryLinks.ts` *(new)*
- **Change:** Export a single mapping object and a helper function:

```typescript
const THEORY_LINKS: Record<string, string> = {
  "verb-conjugation": "/learn/english/grammar",
  "tense":            "/learn/english/grammar",
  "article-use":      "/learn/english/grammar",
  "word-order":       "/learn/english/grammar",
  "phrasal-verb":     "/learn/english/phrasal-verbs",
  "vocabulary":       "/learn/english/key-verbs",
  "preposition":      "/learn/english/connectors",
};

export function getTheoryUrl(category: string, baseUrl: string): string | null {
  const path = THEORY_LINKS[category];
  return path ? `${baseUrl}${path}` : null;
}
```

#### 3.3 — Add theory links to `GrammarReport.tsx`

- **File:** `client/src/components/GrammarReport.tsx`
- **Change:** In the `renderAnalysis` function, for each issue in `persistent` categories,
  call `getTheoryUrl(issue.category, import.meta.env.VITE_THEORY_BASE_URL)`. If a URL is
  returned, render a small "Study this topic →" anchor tag next to the issue explanation.
  Set `target="_blank" rel="noopener noreferrer"`. Only render links when session
  language is English.

---

### Phase 4: Finalization

**Objective:** Verify the full end-to-end flow across both directions.

#### 4.1 — End-to-end verification

- Visit `speakpath.dev` → click "Write Better to Speak Better" → navigate all 6 theory
  pages using sidebar and prev/next → click "Practice Speaking" → land on `app.speakpath.dev`
- Complete an English session in the app → open Grammar Report → verify persistent issues
  show theory links → click a link → opens correct theory page in new tab
- Verify no theory links appear for non-English sessions (Spanish, French, etc.)

---

## Files Affected

### Landing page (`/home/omar/u1/code/agentVoiceWeb`)

| File | Change |
|---|---|
| `src/layouts/LearnLayout.astro` | New — theory page layout with sidebar nav |
| `src/components/LearnNav.astro` | New — step navigation component |
| `src/components/WriteToSpeak.astro` | New — homepage entry point section |
| `src/components/LandingPage.astro` | Add WriteToSpeak between Features and ComingSoon |
| `src/pages/learn/english/index.astro` | New — theory index page |
| `src/pages/learn/english/grammar.astro` | New |
| `src/pages/learn/english/key-verbs.astro` | New |
| `src/pages/learn/english/connectors.astro` | New |
| `src/pages/learn/english/phrasal-verbs.astro` | New |
| `src/pages/learn/english/nouns.astro` | New |
| `src/pages/learn/english/essay-template.astro` | New |

### App (`/home/omar/u1/code/agentVoice`)

| File | Change |
|---|---|
| `client/.env` / `client/.env.production` | Add `VITE_THEORY_BASE_URL=https://speakpath.dev` |
| `client/src/lib/theoryLinks.ts` | New — category mapping + helper |
| `client/src/components/GrammarReport.tsx` | Add theory links to persistent issues |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Content creation is time-intensive | Phase 2 is decoupled — structure ships independently, content fills in later |
| Grammar categories may evolve over time | `theoryLinks.ts` is one file; update the map when new categories are added |
| Category not in mapping shows broken link | `getTheoryUrl` returns `null`; render no link — silent fallback |
| Links should not appear for non-English sessions | Check session language before rendering links in `GrammarReport.tsx` |

---

## Out of Scope

- Theory content translated to Spanish, French, or German UI (v2)
- Theory pages for learning Spanish, French, or German (v2)
- Exercises, quizzes, or interactive elements
- Analytics tracking which theory pages users visit from feedback (v2)
- Updating the "Structure" comparison row (separate product decision)
- Progress tracking within the theory section

---

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Landing page structure — layout, nav, page stubs (Phase 1) | Medium |
| P0 | English theory content — grammar, verbs, connectors, etc. (Phase 2) | Large |
| P0 | App integration — env var, mapping, GrammarReport links (Phase 3) | Small |
| P1 | SEO meta tags for each /learn page | Small |

---

## Acceptance Criteria

1. `speakpath.dev/learn/english` loads and displays the personal story intro and 6-step overview
2. All 6 topic pages load with content, correct sidebar navigation, and working prev/next buttons
3. "Practice Speaking →" on any theory page opens `https://app.speakpath.dev` in a new tab
4. "Write Better to Speak Better" section is visible on the speakpath.dev homepage with a working CTA
5. After an English session in the app, persistent grammar issues with a mapped category show a "Study this topic →" link
6. Clicking a theory link from the app opens the correct speakpath.dev page in a new tab
7. No theory links appear after a Spanish, French, or German session
8. Grammar categories with no mapping show no link (no broken links, no errors)
9. All existing e2e tests pass (`npm run test:e2e`)
