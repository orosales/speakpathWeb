---
status: completed
created: 2026-05-02
completed: 2026-05-02
depends-on: []
---

# Language Switcher — Globe Icon Dropdown

## Goal

Replace the flat inline language-code links in the nav with a single globe icon + dropdown that shows native language names, so the switcher scales cleanly as more languages are added and is immediately recognisable to a global audience.

---

## Current State

The nav rendered four separate `<a>` tags — `EN`, `ES`, `FR`, `DE` — as pill-shaped links side by side. The active locale got a filled teal pill (`bg-primary text-surface`), the rest were muted.

| Problem | Detail |
|---|---|
| Doesn't scale | Adding more locales pushes other nav items off screen |
| Codes aren't universal | `DE` (Deutsch) is not obvious to non-European users |
| Takes up nav real estate | Four elements where one would do |

**File:** `src/layouts/Base.astro` lines 180–201 (pre-change)

## Target State

A single trigger button — globe icon (`language` Material Symbol) + active locale code + chevron — opens a dropdown `<ul>` listing every locale by its native name. The active locale has a checkmark. Clicking outside or navigating away closes the menu.

| Behaviour | Detail |
|---|---|
| Trigger | Globe icon + `EN` / `ES` / `FR` / `DE` + chevron |
| Dropdown items | Native labels: English, Español, Français, Deutsch |
| Active indicator | Checkmark icon + highlighted row |
| Dismiss | Click outside, or select a language |
| Accessible | `aria-haspopup`, `aria-expanded`, `role="listbox"`, `role="option"` |

---

## Implementation Plan

### Phase 1: Core dropdown (completed)

**Objective:** Ship the new UI in `Base.astro` with zero new dependencies.

#### 1.1 — Replace inline links with dropdown markup

- **File:** `src/layouts/Base.astro`
- **Change:** Wrap the language switcher in a `relative` container (`#lang-switcher`). Add a `<button id="lang-btn">` with the globe icon, locale code, and chevron. Render the locale list as a `<ul id="lang-menu">` with `role="listbox"`, hidden by default.

#### 1.2 — Wire open/close with vanilla JS

- **File:** `src/layouts/Base.astro` (inline `<script>` before `</body>`)
- **Change:** Toggle `hidden` class on the menu, flip `aria-expanded`, rotate the chevron 180° when open, and close on outside-click via `document.addEventListener('click', …)`.

#### 1.3 — Style active language

- **File:** `src/layouts/Base.astro`
- **Change:** Active row gets `text-primary font-semibold bg-surface-container-high` and a `check` Material Symbol icon. Inactive rows hover to `text-tertiary`.

---

## Files Affected

| File | Changes |
|---|---|
| `src/layouts/Base.astro` | Replaced inline lang links with globe-button + `<ul>` dropdown; added inline `<script>` for toggle logic |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| JS disabled / SSR-only | Menu stays hidden without JS — add a `<noscript>` fallback showing inline links if needed |
| Mobile nav overlap | Dropdown is `right-0` anchored; test on narrow viewports when a mobile hamburger menu is added |
| Keyboard navigation | Currently only click is handled; Phase 2 should add arrow-key and Escape support |

---

## Out of Scope

- Mobile hamburger menu integration (separate roadmap item)
- Flag emoji next to native language names
- Persisting language preference in `localStorage` (redirects already handle this via URL)

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Globe button + dropdown with native names | Small |
| P1 | Keyboard navigation (arrow keys + Escape) | Small |
| P1 | Flag icons in dropdown rows | Small |
| P2 | Mobile menu integration | Medium |
| P2 | `localStorage` preference persistence | Small |

## Acceptance Criteria

1. Clicking the globe button opens a dropdown listing English, Español, Français, Deutsch
2. The active locale shows a checkmark; clicking it closes the menu without navigating
3. Clicking any other locale navigates to the correct localised URL (`/`, `/es/`, `/fr/`, `/de/`)
4. Clicking outside the dropdown closes it
5. The nav bar does not reflow when the dropdown is open
6. `aria-expanded` toggles correctly between `true` / `false` on the trigger button
