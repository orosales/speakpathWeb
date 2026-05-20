---
status: completed
created: 2026-05-19
completed: 2026-05-19
depends-on: []
---

# Frontend Performance — Initial Pass

## Goal

Reduce perceived page-load time on speakpath.dev by eliminating render-blocking external
resources, cutting unnecessary font downloads, and adding proper caching and security
headers to the Netlify edge.

---

## Current State

Before these changes, the landing page had three categories of performance debt:

| Issue | Location | Impact |
|---|---|---|
| Material Symbols loaded as render-blocking CSS | `Base.astro` line 190 | Blocked first paint while browser resolved `fonts.googleapis.com` + `fonts.gstatic.com` and downloaded a large variable font |
| No `preconnect` / `dns-prefetch` hints | `Base.astro` `<head>` | Extra ~100–300 ms RTT for each external domain on first visit |
| 9 self-hosted font weight files (5 Plus Jakarta Sans + 4 Manrope) | `global.css` | Plus Jakarta Sans 400 and 500 were imported but never used by any component |
| No cache headers for font assets, robots, llms.txt | `netlify.toml` | Repeat visitors re-fetched static files unnecessarily |
| No security headers | `netlify.toml` | Missing `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` |

## Target State

- First paint is not blocked by any external font or stylesheet request.
- Browser begins DNS/TLS resolution for Google Fonts and Google Analytics CDN domains as
  early as possible.
- Only font weights actually used in the UI are downloaded on first visit.
- Static assets have appropriate cache lifetimes so repeat visits load instantly from CDN.
- Security headers present on all responses.

---

## Implementation Plan

### Phase 1: Remove render-blocking font (highest impact)

**Objective:** First paint should not wait for Material Symbols Outlined to download.

#### 1.1 — Async-load Material Symbols via `media="print"` trick

- **File:** `src/layouts/Base.astro`
- **Change:** Replace `<link rel="stylesheet" href="...">` with
  `<link rel="stylesheet" media="print" onload="this.media='all'" ...>`. Add `<noscript>`
  fallback. Append `&display=optional` to the URL so icons snap in without triggering
  layout shift.

#### 1.2 — Add `preconnect` and `dns-prefetch` hints

- **File:** `src/layouts/Base.astro`
- **Change:** Add before the first external resource reference:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  ```

### Phase 2: Cut unused font weights

**Objective:** Reduce the number of woff2 files the browser must download on first visit.

#### 2.1 — Remove Plus Jakarta Sans 400 and 500

- **File:** `src/styles/global.css`
- **Change:** Delete `@import '@fontsource/plus-jakarta-sans/400.css'` and
  `@import '@fontsource/plus-jakarta-sans/500.css'`. All `font-headline` and `font-label`
  usages in components use 600 (`font-semibold`), 700 (`font-bold`), or 800
  (`font-extrabold`) only. Manrope 400/500/600/700 are all kept for body text.

### Phase 3: Netlify headers

**Objective:** Edge caching and security headers for all routes.

#### 3.1 — Cache static text files

- **File:** `netlify.toml`
- **Change:** Add `Cache-Control: public, max-age=3600` for `/llms.txt` and `/robots.txt`.

#### 3.2 — Add security headers

- **File:** `netlify.toml`
- **Change:** Add a catch-all `[[headers]]` block for `/*` with:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`

---

## Files Affected

| File | Changes |
|---|---|
| `src/layouts/Base.astro` | Preconnect hints, async Material Symbols load |
| `src/styles/global.css` | Removed Plus Jakarta Sans 400 and 500 imports |
| `netlify.toml` | Cache headers for llms.txt/robots.txt, security headers for all routes |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| Icons invisible on first paint before font loads | `display=optional` tells browser to show nothing rather than wait — icons snap in ~100ms after paint, which is acceptable |
| JS-disabled browsers miss the async font | `<noscript>` fallback loads the stylesheet synchronously for those cases |
| Removing font weights causes fallback rendering | Verified all `font-headline`/`font-label` usages in components — none use 400 or 500 |
| Security headers breaking embedded iframes | No iframes used; `X-Frame-Options: DENY` is safe |

---

## Out of Scope

- Self-hosting Material Symbols Outlined (would eliminate the Google Fonts dependency
  entirely — worth doing later if icon set stabilizes)
- Subsetting font files to only the glyphs actually used
- Critical CSS inlining / above-the-fold CSS extraction
- Image optimization (no raster images currently in the landing page)
- Service worker / offline caching

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Async Material Symbols + preconnect | Small |
| P0 | Remove unused font weights | Small |
| P1 | Netlify cache + security headers | Small |
| P2 | Self-host Material Symbols (future) | Medium |

## Acceptance Criteria

1. Chrome DevTools Network tab shows no render-blocking requests from `fonts.googleapis.com`
   on first load.
2. Lighthouse Performance score improves vs. pre-change baseline (measure on mobile,
   throttled 4G).
3. Material Symbols icons render correctly across all landing page sections on desktop and
   mobile.
4. No visual regressions in font rendering — headlines display at correct weights (semibold,
   bold, extrabold).
5. `curl -I https://speakpath.dev` returns `x-frame-options: DENY` and
   `x-content-type-options: nosniff` headers.
6. `astro build` completes without errors.
