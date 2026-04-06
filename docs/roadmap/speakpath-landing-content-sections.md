---
status: draft
created: 2026-04-05
completed:
depends-on: [speakpath-landing-scaffold]
---

# SpeakPath Landing — Content Sections

## Goal

Build the five middle content sections of the landing page — Languages, How It Works, Levels, Features, and What's Coming — that together explain the product's value to prospective users.

---

## Current State

Greenfield. `speakpath-landing-scaffold` provides the base layout and design tokens. `speakpath-landing-hero` provides the first section. These five sections fill the body of the page between the hero and the footer CTA.

## Target State

Five Astro components, each self-contained, mounted in order in `index.astro`:

1. **Languages.astro** — Flag + language + tagline cards for English, Spanish, French, German. Footer note: "More languages coming soon."
2. **HowItWorks.astro** — Numbered 3-step sequence: Choose → Talk → Feedback.
3. **Levels.astro** — Beginner / Intermediate / Advanced cards with descriptions and auto-adjust note.
4. **Features.astro** — Six feature bullets (Voice-first, Real-time AI, Grammar analysis, Multi-language, No downloads, Private by design).
5. **ComingSoon.astro** — Teaser list of upcoming features (progress tracking, topic scenarios, pronunciation scoring, more languages, mobile app, vocabulary flashcards).

---

## Implementation Plan

### Phase 1: Languages Section

**Objective:** Show the four supported languages as cards with flag emoji, name, and tagline.

#### 1.1 — Create Languages.astro

- **File:** `src/components/Languages.astro`
- **Change:** `<section>` with heading "Pick Your Language". Render four cards in a CSS grid (2-col mobile, 4-col desktop). Each card: flag emoji, language name (`<h3>`), tagline (`<p>`). Footer note below grid: "More languages coming soon."

**Data (inline in component):**
```js
const languages = [
  { flag: '🇺🇸', name: 'English',  tagline: "The world's business language" },
  { flag: '🇪🇸', name: 'Spanish',  tagline: '500 million native speakers' },
  { flag: '🇫🇷', name: 'French',   tagline: 'Romance, culture, opportunity' },
  { flag: '🇩🇪', name: 'German',   tagline: 'Precision, science, career growth' },
];
```

### Phase 2: How It Works Section

**Objective:** Show the 3-step process in a scannable numbered layout.

#### 2.1 — Create HowItWorks.astro

- **File:** `src/components/HowItWorks.astro`
- **Change:** `<section>` with heading "As easy as having a conversation". Three steps rendered as a horizontal row on desktop, vertical stack on mobile. Each step: large number (styled in teal), bold label, short description.

**Steps:**
1. Choose a language and level — Pick what fits you today.
2. Start talking — Speak naturally. No typing, no lag.
3. Get feedback — After each session, see grammar insights and progress.

### Phase 3: Levels Section

**Objective:** Show the three conversation levels as a comparison table or card row.

#### 3.1 — Create Levels.astro

- **File:** `src/components/Levels.astro`
- **Change:** `<section>` with heading "Your pace. Your level." Three cards (Beginner, Intermediate, Advanced) with name and description. Include note below: "Levels adjust difficulty, vocabulary complexity, and AI response depth automatically."

### Phase 4: Features Section

**Objective:** List the six key differentiators in a scannable grid.

#### 4.1 — Create Features.astro

- **File:** `src/components/Features.astro`
- **Change:** `<section>` with heading "Built for real improvement". Six feature items in a 2-col or 3-col grid, each with a bold label and short description. Use a teal checkmark or icon prefix.

**Features:**
- Voice-first — No typing. Speak and be heard.
- Real-time AI responses — Natural back-and-forth, not scripted drills.
- Grammar analysis — Session summary highlights what to work on.
- Multi-language — Switch languages anytime.
- No downloads — Runs in your browser.
- Private by design — Conversations stay yours.

### Phase 5: What's Coming Section

**Objective:** Build excitement and reduce churn by showing the product roadmap.

#### 5.1 — Create ComingSoon.astro

- **File:** `src/components/ComingSoon.astro`
- **Change:** `<section>` with heading "This is just the beginning". A styled list of upcoming features. Subtle styling (muted text, dashed borders, or a "coming soon" badge) to signal these are not yet available.

**Items:**
- Progress tracking & streaks
- Topic-based scenarios (job interview, travel, ordering food)
- Pronunciation scoring
- More languages (Portuguese, Italian, Japanese, Mandarin)
- Mobile app
- Vocabulary flashcards tied to your sessions

### Phase 6: Mount All Sections

**Objective:** Wire all five components into the index page.

#### 6.1 — Update index.astro

- **File:** `src/pages/index.astro`
- **Change:** Import and render all five components in order after `<Hero />`: `<Languages />`, `<HowItWorks />`, `<Levels />`, `<Features />`, `<ComingSoon />`.

---

## Files Affected

| File | Changes |
|---|---|
| `src/components/Languages.astro` | New — 4-language card grid |
| `src/components/HowItWorks.astro` | New — 3-step numbered sequence |
| `src/components/Levels.astro` | New — Beginner/Intermediate/Advanced cards |
| `src/components/Features.astro` | New — 6 feature grid |
| `src/components/ComingSoon.astro` | New — upcoming features list |
| `src/pages/index.astro` | Mount all five components |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Flag emoji rendering inconsistently across OSes | Accept emoji (standard and widely supported); no SVG flags needed for MVP |
| Section ordering feels arbitrary | Follow the content doc's specified order exactly; re-ordering is a single-line change in `index.astro` |

---

## Out of Scope

- Hero section (see `speakpath-landing-hero`)
- Footer CTA section (see `speakpath-landing-footer-cta`)
- Any interactivity beyond hover states (language selector, level quiz, etc.)
- Blog or CMS content

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Languages + HowItWorks + Levels + Features | Medium |
| P1 | ComingSoon section | Small |

## Acceptance Criteria

1. All five sections render on `index.astro` in the correct order.
2. Language cards display flag, name, and tagline for all four languages; footer note is visible.
3. How It Works shows exactly three numbered steps with correct copy.
4. Levels section shows three cards with the auto-adjust note.
5. Features section shows all six items.
6. What's Coming section shows all six upcoming items with a visual indicator that they are not yet available.
7. All sections are readable and correctly laid out at 320px mobile width.
