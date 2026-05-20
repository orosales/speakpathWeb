---
date: 2026-04-05
last-reviewed: 2026-05-18
status: promoted
roadmap: speakpath-landing-scaffold
tags: [architecture, infrastructure, landing-page]
---

# SpeakPath — Landing Page Architecture

## Summary

Technical blueprint for building and deploying the SpeakPath landing page as a separate
Astro static site on Netlify, decoupled from the Fly.io app. Covers stack decision, repo
structure, DNS routing, and deploy steps.

## Details

### Stack

| Layer | Tech | Host | Cost |
|---|---|---|---|
| Landing page (`speakpath.dev`) | Astro (static) | Netlify | Free |
| App (`app.speakpath.dev`) | Node/Express + React/Vite | Fly.io | Existing |

**Why Astro:** near-zero JS ships → perfect Lighthouse scores; MDX for future blog posts;
free Netlify hosting; independent deploy cycle — landing page changes never touch Fly.io.

### Repository structure

```
repo: agentVoiceWeb  (this repo)  -> Netlify
├── astro.config.mjs
├── src/
│   ├── pages/
│   │   └── index.astro
│   ├── layouts/
│   │   └── Base.astro
│   └── components/
│       ├── Hero.astro
│       ├── Languages.astro
│       ├── HowItWorks.astro
│       ├── Levels.astro
│       ├── Features.astro
│       └── CTA.astro
└── package.json
```

### DNS setup

```
speakpath.dev        -> Netlify  (landing page)
app.speakpath.dev    -> Fly.io   (app)
```

Cloudflare proxies both records. For the Fly.io subdomain WebSocket gotcha, see the
`fly-custom-domain-oauth` skill.

### Deploy steps (original plan, now completed)

1. Register `speakpath.dev`
2. Scaffold Astro project
3. Build components from `speakpath-landing-content.md`
4. Connect to Netlify — auto-deploys on push to `main`
5. Point DNS: `speakpath.dev → Netlify`, `app.speakpath.dev → Fly.io`
6. Add "Try SpeakPath" CTA in the app linking back to `speakpath.dev`

### Live URLs

| What | URL |
|---|---|
| Production | https://speakpath.dev |
| Netlify dashboard | https://app.netlify.com/projects/speakpath |

### Future evolution

| Trigger | Action |
|---|---|
| Write posts from phone/browser | Add Decap CMS (stores `.md` in same repo) |
| Need live data on landing page | Switch Astro to SSR mode |
| Blog grows large | Add content collections with tag filtering |

## Open Questions

## Next Step

Promote to roadmap
