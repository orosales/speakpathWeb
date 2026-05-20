---
date: 2026-05-19
last-reviewed: 2026-05-19
status: idea
roadmap:
tags: [infrastructure, reliability, performance]
---

# Cloudflare Proxy + Always Online Fallback

## Summary

Enable Cloudflare's proxy (orange cloud) on the `speakpath.dev` DNS records pointing to
Netlify. This adds automatic edge caching and activates "Always Online" — so when Netlify
has an outage (as happened on 2026-05-19), Cloudflare serves the cached landing page
automatically with no manual intervention. Free tier, zero ongoing maintenance.

## Details

### Why this matters

Today (2026-05-19) Netlify had an incident — "elevated response times affecting origin
services" — that made speakpath.dev return a generic error page for all visitors. Since
the site is a static landing page, there's no reason visitors should ever see a broken
page; the HTML doesn't change between deploys.

### How Cloudflare proxy works for a static site

```
Visitor → Cloudflare edge (cached) → Netlify origin (only on cache miss)
```

- Cloudflare sits in front of Netlify as a CDN proxy
- Static assets (`/_astro/*`) are cached indefinitely (they're content-hashed)
- HTML pages need an explicit Cache Rule to be cached (not cached by default)
- "Always Online" serves a Cloudflare-held snapshot when the origin returns 5xx

### Step-by-step setup

**Step 1 — Confirm speakpath.dev is in Cloudflare DNS**
Go to Cloudflare dashboard → select the `speakpath.dev` zone → DNS tab.
The `A` or `CNAME` record pointing to Netlify should exist there.

**Step 2 — Enable the orange cloud (proxy)**
Click the proxy toggle on the `speakpath.dev` record so it turns orange.
Do the same for `www.speakpath.dev` if it exists.
> Note: `app.speakpath.dev` (Fly.io) should stay grey/DNS-only or use its own proxy
> setting — don't touch it here.

**Step 3 — Add a Cache Rule for HTML pages**
In Cloudflare → Caching → Cache Rules → Create rule:
- **Match:** `hostname eq speakpath.dev`
- **Cache eligibility:** Eligible for cache
- **Edge TTL:** 1 hour (or "respect origin" — Netlify already sends `max-age=0, must-revalidate` for HTML)
- **Browser TTL:** 0 (let Netlify control browser cache)

This tells Cloudflare to hold a copy of the HTML at the edge, even if for a short time.

**Step 4 — Enable Always Online**
In Cloudflare → Caching → Configuration → Always Online → On.
This makes Cloudflare serve its cached snapshot of the site when Netlify returns 5xx errors.

**Step 5 — Verify**
- Visit speakpath.dev and confirm it loads
- Check response headers: `cf-cache-status: HIT` on the second request confirms caching works
- Check `server: cloudflare` in response headers

### What this does NOT fix
- If Cloudflare itself has an outage (rare — they have 100% SLA on the free tier CDN)
- Cold cache: if no one has visited recently, Always Online has nothing to serve
- The actual app at `app.speakpath.dev` — that's on Fly.io and has its own resilience

### Tradeoffs
| Pro | Con |
|---|---|
| Automatic — no action needed during incidents | Cache needs to be warm to serve stale content |
| Also improves global load time via CDN | Deploys may take a few minutes to propagate through Cloudflare cache |
| Free on Cloudflare's free tier | Need to purge Cloudflare cache after each deploy (or set short TTL) |

### Cache purge after deploy
After running `netlify deploy --prod`, also run:
```bash
# Requires Cloudflare API token with Cache Purge permission
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \
  -H "Authorization: Bearer <CF_TOKEN>" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```
Or do it manually from Cloudflare dashboard → Caching → Purge Everything after deploys.

## Open Questions

- Is speakpath.dev DNS already managed in Cloudflare, or is it pointing directly to Netlify
  without Cloudflare in the middle?
- Is there a Cloudflare API token already set up for cache purges, or does that need to be
  created?

## Next Step

Promote to roadmap
