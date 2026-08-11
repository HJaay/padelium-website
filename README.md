# Padelium Studio website

The public marketing site (landing page + waitlist) for Padelium Studio.
Deployed separately from both the desktop app and the `backend` auth/billing
service — this project has no dependency on either.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in:
   - Vercel KV credentials (`KV_REST_API_URL` / `KV_REST_API_TOKEN`) — can
     reuse the same KV store as the `backend` service.
   - `NEXT_PUBLIC_BACKEND_URL` — origin of the `backend` service, used to
     link "Sign In" to `/auth/link` there.
3. `npm run dev` (runs on port 3002 by default, so it can run alongside
   `backend` on 3001 during local development)

## Endpoints

- `POST /api/waitlist` — adds an email to the waitlist (body `{ "email": "..." }`).

## Maintenance mode

To take the site offline temporarily (e.g. while sorting things out) without
touching any code, set the `MAINTENANCE_MODE` environment variable to `true`
in the Vercel project (Settings → Environment Variables), then redeploy — or
set it in `.env.local` for local dev. Every route serves a static "be right
back" page with a `503` status instead of the real site. Set it back to
`false` (or remove it) and redeploy to bring the site back. See
`src/middleware.ts`.
