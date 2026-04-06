---
status: draft
created: 2026-04-05
completed:
depends-on: [speakpath-landing-scaffold]
---

# SpeakPath Landing — DNS and Deployment

## Goal

Register `speakpath.com`, connect it to Netlify for the landing page, and route `app.speakpath.com` to the existing Fly.io deployment — so both the marketing site and the app run under the same brand domain.

---

## Current State

The AgentVoice app is deployed on Fly.io with its own Fly-assigned domain. There is no `speakpath.com` domain or DNS configuration yet. The `speakpath-landing` repo will be connected to Netlify once scaffolded.

## Target State

- `speakpath.com` → Netlify (landing page, auto-deploys on push to `main`)
- `app.speakpath.com` → Fly.io (AgentVoice app, existing deploy unchanged)
- Both records proxied through Cloudflare for DDoS protection and analytics
- HTTPS active on both subdomains

---

## Implementation Plan

### Phase 1: Domain Registration

**Objective:** Secure the brand domain.

#### 1.1 — Register domain

- **Action:** Register `speakpath.com` (or `speakpath.app` as fallback) via preferred registrar (Cloudflare Registrar, Namecheap, etc.).
- **Note:** If using Cloudflare Registrar, DNS management is built-in. Otherwise, point nameservers to Cloudflare after registration.

### Phase 2: Netlify — Landing Page

**Objective:** Connect the `speakpath-landing` repo to Netlify and map the root domain.

#### 2.1 — Connect repo to Netlify

- **Action:** In Netlify dashboard → "Add new site" → "Import an existing project" → select `speakpath-landing` repo.
- **Build settings:** Command `npm run build`, publish directory `dist` (matches `netlify.toml` from scaffold).
- **Result:** Netlify assigns a preview URL (e.g., `speakpath-landing.netlify.app`). Every push to `main` auto-deploys.

#### 2.2 — Add custom domain in Netlify

- **Action:** Netlify dashboard → Domain settings → "Add custom domain" → `speakpath.com`.
- **Result:** Netlify provides its load balancer IP/CNAME for the DNS record.

### Phase 3: Cloudflare DNS Setup

**Objective:** Route both subdomains through Cloudflare.

#### 3.1 — Add root domain record (landing page)

- **Record type:** `A` or `CNAME` depending on Netlify's instruction
- **Name:** `@` (root)
- **Value:** Netlify load balancer IP or CNAME
- **Proxy:** Orange-cloud (proxied) ✓

#### 3.2 — Add app subdomain (Fly.io)

- **Record type:** `CNAME`
- **Name:** `app`
- **Value:** Fly.io app hostname (e.g., `agentvoiceweb.fly.dev`)
- **Proxy:** Orange-cloud (proxied) ✓
- **WebSocket gotcha:** Cloudflare's default HTTP proxy mode can break WebSocket connections. Enable **Network > WebSockets** in the Cloudflare dashboard for the zone, or set the subdomain to DNS-only (grey-cloud) if WebSocket issues persist. See the `fly-custom-domain-oauth` skill for full details.

#### 3.3 — Add `www` redirect (optional)

- **Record:** `CNAME www → speakpath.com` (or use Netlify's built-in redirect rule)
- **Change:** Netlify "Domain aliases" → add `www.speakpath.com` → Netlify redirects to apex automatically.

### Phase 4: SSL / HTTPS

**Objective:** Ensure HTTPS on both domains.

#### 4.1 — Netlify managed cert

- **Action:** Netlify auto-provisions a Let's Encrypt cert once the DNS record propagates. No manual steps needed.

#### 4.2 — Fly.io cert for app subdomain

- **Command:** `fly certs add app.speakpath.com`
- **Note:** Fly issues a cert for the custom domain automatically. May require adding a Cloudflare DNS verification record.

### Phase 5: Smoke Test

**Objective:** Verify both routes work end-to-end.

#### 5.1 — Verification checklist

- `https://speakpath.com` loads the Astro landing page
- `https://app.speakpath.dev` loads the AgentVoice React app
- WebSocket connections from the app work (open a conversation session)
- Both URLs redirect HTTP → HTTPS
- Google OAuth callback URL (if configured) includes `app.speakpath.com` — update Google Cloud Console allowed redirect URIs

---

## Files Affected

| File | Changes |
|---|---|
| `netlify.toml` | Already set in scaffold; no changes needed |
| Cloudflare DNS dashboard | Add `A`/`CNAME` for `@` and `app` records (manual, not file-based) |
| Google Cloud Console | Update OAuth redirect URIs to include `app.speakpath.com` (manual) |

---

## Risks & Considerations

| Risk | Mitigation |
|---|---|
| WebSocket broken on `app.speakpath.com` through Cloudflare | Enable Cloudflare WebSocket support or use DNS-only (grey-cloud) for the `app` subdomain |
| DNS propagation delay | Allow 5–60 min; use `dig speakpath.com` to verify before testing |
| Google OAuth redirect mismatch after domain change | Update allowed origins and redirect URIs in Google Cloud Console before switching traffic |
| `speakpath.com` already registered | Check availability; fallback to `speakpath.app` or `gospeakpath.com` |

---

## Out of Scope

- Content of the landing page itself (other roadmap docs)
- Setting up Google OAuth (see `fly-custom-domain-oauth` skill if needed)
- Email hosting for `hello@speakpath.com`
- CDN cache tuning beyond Cloudflare defaults

## Priority

| Priority | Item | Effort |
|---|---|---|
| P0 | Domain registration | Small |
| P0 | Netlify repo connection + custom domain | Small |
| P0 | Cloudflare DNS records | Small |
| P1 | WebSocket validation for `app.speakpath.com` | Small |
| P1 | Google OAuth redirect URI update | Small |

## Acceptance Criteria

1. `https://speakpath.com` loads the SpeakPath landing page with valid HTTPS cert.
2. `https://app.speakpath.dev` loads the AgentVoice app with valid HTTPS cert.
3. A push to `main` on `speakpath-landing` triggers an automatic Netlify deploy visible at `speakpath.com` within 2 minutes.
4. WebSocket-based voice conversations work on `app.speakpath.com`.
5. HTTP requests to both domains redirect to HTTPS.
