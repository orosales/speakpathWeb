# SpeakPath — Landing Page

Marketing site for [SpeakPath](https://speakpath.dev), an AI-powered language practice app. Built with Astro and deployed to Netlify.

The app itself lives at [app.speakpath.dev](https://app.speakpath.dev).

---

## Stack

| Layer | Tech |
|---|---|
| Framework | [Astro](https://astro.build) (static) |
| Styling | Tailwind CSS |
| Fonts | Plus Jakarta Sans + Manrope (self-hosted via @fontsource) |
| Hosting | Netlify |

## Getting Started

```bash
npm install
npm run dev        # http://localhost:4321
```

## Deploy

```bash
npm run build
netlify deploy --prod --dir=dist
```

Requires [Netlify CLI](https://docs.netlify.com/cli/get-started/) and an authenticated session (`netlify login`).

## Project Structure

```
src/
├── layouts/
│   └── Base.astro          # HTML shell, nav, footer
├── pages/
│   └── index.astro         # Entry point — mounts all sections
├── components/
│   ├── Hero.astro
│   ├── Languages.astro
│   ├── HowItWorks.astro
│   ├── Levels.astro
│   ├── Features.astro
│   ├── ComingSoon.astro
│   └── CTA.astro
└── styles/
    └── global.css          # Tailwind directives + design tokens

docs/
├── ideas/                  # Product briefs and architecture notes
└── roadmap/                # Implementation roadmap documents

scripts/                    # Build and sync utilities
```

## Design System

Colors, typography, and component rules are documented in [`docs/design/DESIGN.md`](docs/design/DESIGN.md).

- **Background:** Deep navy `#010e24`
- **Accent:** Electric teal `#58f5d1`
- **Delight:** Purple `#c87dff`
- **Body font:** Manrope
- **Display font:** Plus Jakarta Sans
