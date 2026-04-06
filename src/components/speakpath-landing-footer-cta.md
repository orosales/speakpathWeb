---
status: draft
created: 2026-04-05
completed:
depends-on: [speakpath-landing-scaffold]
---

# SpeakPath Landing — Footer CTA Section

## Goal

Build the bottom conversion section and footer, giving visitors a final nudge to try the app and providing essential navigation links (Privacy, Contact, GitHub).

---

## Current State

Greenfield. `speakpath-landing-scaffold` provides Base layout and design tokens. This component closes the page after the content sections.

## Target State

A `CTA.astro` component and a `<footer>` element that together render:
- **Section heading:** "Ready to start speaking?"
- **Subtext:** "No credit card. No setup. Just open it and talk."
- **CTA button:** "Try SpeakPath Free →" linking to `https://app.speakpath.dev`
- **Footer links:** Privacy · Contact · GitHub (with `href` placeholders for Privacy and Contact; GitHub links to the repo)

---

## Implementation Plan

### Phase 1: Bottom CTA Component

**Objective:** Render the final call-to-action section above the footer.

#### 1.1 — Create CTA.astro

- **File:** `src/components/CTA.astro`
- **Change:** `<section>` with a centered layout. Heading (`<h2>`) "Ready to start speaking?", subtext (`<p>`), and a `<a>` styled identically to the hero CTA button (teal background, navy text, bold, rounded). Link to `https://app.speakpath.dev`. Add enough top/bottom padding to make this section feel like a natural close.

### Phase 2: Footer

**Objective:** Provide essential footer links without visual clutter.

#### 2.1 — Add footer to Base layout

- **File:** `src/layouts/Base.astro`
- **Change:** Add a `<footer>` after `<slot />`. Render three links separated by `·` (or `·`):
  - Privacy → `/privacy` (placeholder page or `#`)
  - Contact → `mailto:hello@speakpath.com` (placeholder)
  - GitHub → `https://github.com/` + repo URL (fill in when known)
- Style footer with small muted text, centered, with top border in a low-contrast navy tone.

### Phase 3: Mount CTA in index page

#### 3.1 — Update index.astro

- **File:** `src/pages/index.astro`
- **Change:** Import and render `<CTA />` as the last component before the closing `</main>`. The footer renders automatically via `Base.astro`.

---

## Files Affected

| File | Changes |
|---|---|
| `src/components/CTA.astro` | New — bottom conversion section |
| `src/layouts/Base.astro` | Add `<footer>` with Privacy · Contact · GitHub links |
| `src/pages/index.astro` | Mount `<CTA />` as last section |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| GitHub and Contact URLs not known at build time | Use placeholder `href="#"` with a TODO comment; fill in before DNS goes live |
| Privacy policy page doesn't exist yet | Link to `#` initially; add a real `/privacy` page when needed |

---

## Out of Scope

- Writing the Privacy Policy page content
- A Contact form (link-only for MVP)
- Site-wide navigation header
- Social media icons beyond GitHub

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | CTA section with button | Small |
| P0 | Footer with three links | Small |

## Acceptance Criteria

1. "Ready to start speaking?" section renders with heading, subtext, and CTA button.
2. CTA button links to `https://app.speakpath.dev`.
3. Footer renders three links: Privacy, Contact, GitHub.
4. Footer appears on every page (rendered via `Base.astro`).
5. Both CTA button and footer links are keyboard-navigable and have visible focus states.
