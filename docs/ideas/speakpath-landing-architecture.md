# SpeakPath — Landing Page Architecture

Technical blueprint for building and deploying the SpeakPath landing page.  
See `personal-website-architecture.md` for the general pattern this follows.

---

## Stack Decision

| Layer | Tech | Host | Cost |
|---|---|---|---|
| Landing page (`speakpath.com`) | Astro (static) | Netlify or Vercel | Free |
| App (`app.speakpath.com`) | Node/Express + React/Vite | Fly.io | Existing |

**Why Astro:**
- Ships near-zero JavaScript — perfect Lighthouse scores
- MDX support for future blog posts ("How to practice Spanish at home")
- Free hosting on Netlify with custom domain + HTTPS
- Independent deploy cycle from the app — landing page changes never touch Fly.io

---

## Repository Structure

Separate repo from the app to avoid config conflicts and keep independent deploy cycles.

```
repo: speakpath-landing       -> Netlify
├── astro.config.mjs
├── src/
│   ├── pages/
│   │   └── index.astro       -> Main landing page
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

---

## DNS Setup

One domain, subdomain routing:

```
speakpath.com        -> Netlify  (landing page)
app.speakpath.com    -> Fly.io   (AgentVoice app)
```

If using Cloudflare for DNS: proxy both records through Cloudflare for DDoS protection and analytics. For the Fly.io subdomain, see `fly-custom-domain-oauth` skill for the WebSocket gotcha.

---

## Deploy Steps

1. Register domain (`speakpath.com` or `speakpath.app`)
2. Create `speakpath-landing` repo and scaffold Astro project (`npm create astro@latest`)
3. Build components from `speakpath-landing-content.md`
4. Connect repo to Netlify — auto-deploys on push to `main`
5. Point DNS: `speakpath.com → Netlify`, `app.speakpath.com → Fly.io`
6. Add "Try SpeakPath" CTA inside the AgentVoice app linking back to `speakpath.com`

## Live URLs

| What | URL |
|---|---|
| Production (Netlify default) | https://speakpath.netlify.app |
| Custom domain (once DNS is set) | https://speakpath.dev |
| Netlify project dashboard | https://app.netlify.com/projects/speakpath |

---

## Future Evolution

| Trigger | Action |
|---|---|
| Want to write posts from phone/browser | Add Decap CMS (free, stores `.md` in same repo) |
| Need live data on the landing page | Switch Astro to SSR mode |
| Blog grows large | Add content collections with tag filtering |
