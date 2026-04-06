---
status: draft
created: 2026-04-05
completed:
depends-on: []
---

# SpeakPath Landing — Astro Project Scaffold

## Goal

Bootstrap the `speakpath-landing` Astro project with base layout, global design tokens (palette, typography), and Netlify deploy config so that every subsequent component doc has a working foundation to build on.

---

## Current State

Greenfield. No landing page code exists. The app itself lives in the current repo (`agentVoiceWeb`) and is deployed on Fly.io. The landing page is a separate static site and will live in its own repo.

## Target State

A deployable Astro project at `speakpath-landing/` (separate repo) that:
- Renders a blank page at `speakpath.com` via Netlify
- Applies global CSS variables for the deep-navy + electric-teal palette
- Loads Inter or Plus Jakarta Sans via a `<link>` in `<head>`
- Has a `Base.astro` layout wrapping all pages with `<html>`, `<head>`, meta tags, and viewport
- Has `netlify.toml` wired for auto-deploy on push to `main`

---

## Implementation Plan

### Phase 1: Scaffold Astro Project

**Objective:** Create a minimal Astro project with correct repo structure.

#### 1.1 — Initialize project

- **Command:** `npm create astro@latest speakpath-landing -- --template minimal --no-install`
- **Change:** Produces `astro.config.mjs`, `src/pages/index.astro`, `package.json`

#### 1.2 — Create Base layout

- **File:** `src/layouts/Base.astro`
- **Change:** HTML shell with `<html lang="en">`, `<head>` (meta charset, viewport, title, Google Fonts link for Inter or Plus Jakarta Sans), and `<slot />` for page body.

#### 1.3 — Global CSS tokens

- **File:** `src/styles/global.css`
- **Change:** CSS custom properties:
  ```css
  :root {
    --color-bg: #0b1120;        /* deep navy */
    --color-accent: #00d4c8;    /* electric teal */
    --color-text: #e8edf5;
    --font-sans: 'Inter', 'Plus Jakarta Sans', sans-serif;
  }
  body { background: var(--color-bg); color: var(--color-text); font-family: var(--font-sans); margin: 0; }
  ```
- Import in `Base.astro` via `<style is:global>` or `import`.

#### 1.4 — Wire Base layout into index page

- **File:** `src/pages/index.astro`
- **Change:** Wrap with `<Base>` layout, add a placeholder `<main>` so Netlify preview renders something visible.

### Phase 2: Netlify Deploy Config

**Objective:** Enable automatic deploys on push to `main`.

#### 2.1 — Add netlify.toml

- **File:** `netlify.toml`
- **Change:**
  ```toml
  [build]
    command = "npm run build"
    publish = "dist"
  ```

#### 2.2 — Add .nvmrc or engines field

- **File:** `package.json`
- **Change:** Add `"engines": { "node": ">=18" }` to avoid Netlify defaulting to an old Node version.

---

## Files Affected

| File | Changes |
|---|---|
| `astro.config.mjs` | Default Astro config (static output) |
| `src/layouts/Base.astro` | HTML shell, font link, global style import |
| `src/styles/global.css` | CSS custom properties for palette and typography |
| `src/pages/index.astro` | Entry page wrapped in Base layout |
| `netlify.toml` | Build command + publish dir |
| `package.json` | Node engine constraint |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Google Fonts privacy concern (GDPR) | Self-host Inter via `@fontsource/inter` npm package instead of a remote `<link>` |
| Astro version churn | Pin to a specific Astro major in `package.json` |

---

## Out of Scope

- All page content sections (covered in subsequent roadmap docs)
- DNS setup and domain registration (see `speakpath-landing-dns-deploy`)
- Any CMS or SSR — this is purely static

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Astro project init + Base layout | Small |
| P0 | Global CSS tokens | Small |
| P0 | netlify.toml deploy config | Small |

## Acceptance Criteria

1. `npm run build` completes without errors.
2. `dist/index.html` exists and references the correct font and global styles.
3. Connecting the repo to Netlify and pushing to `main` triggers a successful deploy.
4. The deployed URL renders a page with the navy background and teal accent applied.
