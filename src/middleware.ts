import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set MAINTENANCE_MODE=true in the Vercel project's env vars (or .env.local
// for local dev) to take the site offline behind this page. Flip it back to
// unset/false and redeploy (or just re-run) to bring it back — no code
// changes needed either way.
const MAINTENANCE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Padelium Studio</title>
<style>
  html, body { height: 100%; margin: 0; }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(120% 60% at 50% -10%, oklch(0.32 0.09 250 / 0.35), transparent 60%), #0a0a0a;
    color: #ededed;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    padding: 24px;
    box-sizing: border-box;
  }
  .card { max-width: 440px; }
  .mark { margin: 0 auto 24px; display: block; }
  h1 {
    font-size: clamp(24px, 4vw, 32px);
    font-weight: 600;
    margin: 0 0 12px;
    color: #f5f5f5;
  }
  p {
    font-size: 15px;
    line-height: 1.6;
    color: oklch(0.62 0.02 250);
    margin: 0;
  }
</style>
</head>
<body>
  <div class="card">
    <svg class="mark" width="40" height="40" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="16" fill="#020617" />
      <g transform="translate(12.8 12.8) scale(1.6)" stroke="#74c2ee" stroke-width="1.5" stroke-linecap="round">
        <circle cx="15" cy="7" r="5.2" />
        <line x1="7.5" y1="14.5" x2="3" y2="19" />
        <line x1="9" y1="16" x2="4.5" y2="20.5" />
      </g>
    </svg>
    <h1>Be right back</h1>
    <p>Padelium Studio is offline for a bit while we sort some things out. Check back soon.</p>
  </div>
</body>
</html>`;

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
