# Riffly

Sing it in anyone's voice. Covers, duets, parodies — studio-quality vocals from ethically licensed artists.

**Status:** v0 skeleton — landing page + voice studio mock. No real audio generation yet.

**Landing:** https://riffly.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy & design preserved) |
| `/try` | v0 voice studio — pick a voice, paste lyrics, see animated waveform (mocked) |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma |

## What's next

- Wire real voice synthesis behind `/try`
- Audio playback + download
- Auth + per-user generation history
