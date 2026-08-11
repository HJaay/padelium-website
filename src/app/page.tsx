import type { Metadata } from "next";

import { PadeliumMark } from "@/components/PadeliumMark";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Padelium Studio — Broadcast-quality padel scoreboards",
  description:
    "Score the match, overlay a live broadcast scoreboard, and export a pro-look highlight reel. Padelium Studio is coming soon to Windows.",
};

// The auth/sign-in flow is hosted by the separate `backend` service, so
// links to it need to be absolute rather than routed within this app.
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";
const SIGN_IN_URL = `${BACKEND_URL}/auth/link`;

const textMuted = "oklch(0.62 0.02 250)";
const textFaint = "oklch(0.55 0.02 250)";
const accentGradient =
  "linear-gradient(150deg, oklch(0.72 0.14 245), oklch(0.55 0.16 250))";
const cardBorder = "1px solid rgba(255, 255, 255, 0.09)";
const cardBg = "rgba(255, 255, 255, 0.035)";

const FEATURES: { title: string; body: string; premium?: boolean }[] = [
  {
    title: "Live match scoring",
    body: "Track sets, games, and points with padel's golden-point rules built in — no manual math, ever.",
  },
  {
    title: "Broadcast scoreboard overlay",
    body: "A clean, animated scoreboard synced to the match, burned straight into your export.",
  },
  {
    title: "Highlight timeline",
    body: "Mark the rallies that matter and jump straight to them when it's time to cut the video.",
    premium: true,
  },
  {
    title: "Custom branding",
    body: "Put your own logo, colors, font, and social handle on the board.",
    premium: true,
  },
  {
    title: "Up to 4K export",
    body: "Export a broadcast-ready MP4 at 720p, 1080p, or 4K — whatever the footage deserves.",
    premium: true,
  },
  {
    title: "Runs on your machine",
    body: "A fast native Windows app. Your footage never leaves your computer.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Overlay the scoreboard",
    body: "Drop your footage in and Padelium Studio renders a broadcast-style scoreboard on top.",
  },
  {
    n: "2",
    title: "Score the match",
    body: "Track the match, point by point, marking highlights as you go.",
  },
  {
    n: "3",
    title: "Export & share",
    body: "Render your match ready to upload wherever you want.",
  },
];

export default function LandingPage() {
  return (
    <>
      {/* Small scoped stylesheet for the handful of things inline styles
          can't do (hover states, media queries) — the rest of this page
          follows the inline-style convention used by the other hosted
          pages in the backend app. */}
      <style>{`
        .plnd-link { transition: color .15s ease; }
        .plnd-link:hover { color: #ededed !important; }
        .plnd-btn-primary { transition: opacity .15s ease, transform .15s ease; }
        .plnd-btn-primary:hover { opacity: .88; }
        .plnd-btn-ghost { transition: background .15s ease, border-color .15s ease; }
        .plnd-btn-ghost:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.18) !important; }
        .plnd-card { transition: border-color .15s ease, background .15s ease; }
        .plnd-card:hover { border-color: rgba(255,255,255,0.16); background: rgba(255,255,255,0.055); }
        .plnd-hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: center; }
        .plnd-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .plnd-pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .plnd-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) {
          .plnd-hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .plnd-features-grid { grid-template-columns: repeat(2, 1fr); }
          .plnd-pricing-grid { grid-template-columns: 1fr; }
          .plnd-steps-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .plnd-features-grid { grid-template-columns: 1fr; }
          .plnd-waitlist-form { flex-direction: column; }
        }
      `}</style>

      <main
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#ededed",
          overflowX: "hidden",
        }}
      >
        {/* Background: dark base + soft radial accent */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background:
              "radial-gradient(120% 60% at 50% -10%, oklch(0.32 0.09 250 / 0.35), transparent 60%), #0a0a0a",
          }}
        />

        {/* Nav */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "24px 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <PadeliumMark size={30} />
            <span
              style={{
                fontFamily: "var(--font-oxanium), sans-serif",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "oklch(0.92 0.01 250)",
              }}
            >
              Padelium Studio
            </span>
          </div>

          <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a
              href="#pricing"
              className="plnd-link"
              style={{ color: textMuted, fontSize: 14, textDecoration: "none" }}
            >
              Pricing
            </a>
            <a
              href={SIGN_IN_URL}
              className="plnd-link"
              style={{ color: textMuted, fontSize: 14, textDecoration: "none" }}
            >
              Sign In
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section
          style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 24px 96px" }}
        >
          <div className="plnd-hero-grid">
            <div>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-oxanium), sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "oklch(0.75 0.14 250)",
                  background: "oklch(0.6 0.16 250 / 0.14)",
                  border: "1px solid oklch(0.6 0.16 250 / 0.3)",
                  borderRadius: 999,
                  padding: "6px 14px",
                  marginBottom: 22,
                }}
              >
                Coming soon to Windows
              </span>

              <h1
                style={{
                  fontFamily: "var(--font-oxanium), sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(32px, 4.5vw, 52px)",
                  lineHeight: 1.12,
                  margin: "0 0 20px",
                  color: "#f5f5f5",
                }}
              >
                Broadcast-quality padel scoreboards, in minutes.
              </h1>

              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: textMuted,
                  maxWidth: 480,
                  margin: "0 0 32px",
                }}
              >
                Score the match, sync a live scoreboard overlay to your
                footage, and export a pro-look highlight reel — built for
                padel players and clubs who want their footage to look like
                TV.
              </p>

              <div id="waitlist">
                <WaitlistForm />
                <p style={{ fontSize: 13, color: textFaint, marginTop: 10 }}>
                  We&apos;ll email you the moment it&apos;s ready. No spam.
                </p>
              </div>
            </div>

            <ScoreboardMock />
          </div>
        </section>

        {/* How it works */}
        <section style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 96px" }}>
          <SectionHeading eyebrow="Workflow" title="From sideline to shareable in three steps" />

          <div className="plnd-steps-grid" style={{ marginTop: 36 }}>
            {STEPS.map((step) => (
              <div key={step.n}>
                <div
                  style={{
                    fontFamily: "var(--font-oxanium), sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "oklch(0.75 0.14 250)",
                    marginBottom: 10,
                  }}
                >
                  {step.n.padStart(2, "0")}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-oxanium), sans-serif",
                    fontWeight: 600,
                    fontSize: 17,
                    margin: "0 0 8px",
                    color: "#ededed",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: textMuted, margin: 0 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 96px" }}>
          <SectionHeading eyebrow="Features" title="Everything the footage needs" />

          <div className="plnd-features-grid" style={{ marginTop: 36 }}>
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="plnd-card"
                style={{
                  borderRadius: 14,
                  border: cardBorder,
                  background: cardBg,
                  padding: "22px 22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-oxanium), sans-serif",
                      fontWeight: 600,
                      fontSize: 15.5,
                      margin: 0,
                      color: "#ededed",
                    }}
                  >
                    {f.title}
                  </h3>
                  {f.premium && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "oklch(0.75 0.14 250)",
                        background: "oklch(0.6 0.16 250 / 0.14)",
                        border: "1px solid oklch(0.6 0.16 250 / 0.3)",
                        borderRadius: 999,
                        padding: "2px 8px",
                      }}
                    >
                      Premium
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: textMuted, margin: 0 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 96px" }}>
          <SectionHeading eyebrow="Pricing" title="Start free, upgrade when you're ready" />

          <div className="plnd-pricing-grid" style={{ marginTop: 36 }}>
            <PricingCard
              tier="Free"
              price="£0"
              cadence=""
              description="Everything you need to score a match and share a clip."
              items={[
                "Live match scoring",
                "Broadcast scoreboard overlay",
                "720p export",
                "Padelium Studio watermark",
              ]}
            />
            <PricingCard
              tier="Premium"
              price="£7.99"
              cadence="/ month"
              description="For players and clubs who want it looking fully custom."
              highlighted
              items={[
                "Everything in Free",
                "1080p & 4K export",
                "No watermark",
                "Custom logo, font & colors",
                "Highlight timeline",
                "Full scoreboard library",
              ]}
            />
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 110px", textAlign: "center" }}>
          <div
            style={{
              borderRadius: 20,
              border: cardBorder,
              background: cardBg,
              padding: "48px 32px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-oxanium), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(22px, 3vw, 30px)",
                margin: "0 0 12px",
                color: "#f5f5f5",
              }}
            >
              Be first to try Padelium Studio
            </h2>
            <p style={{ fontSize: 15, color: textMuted, margin: "0 0 28px" }}>
              Join the waitlist and we&apos;ll email you the moment it&apos;s
              ready to download.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <WaitlistForm />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "28px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <PadeliumMark size={20} radius={6} />
              <span style={{ fontSize: 13, color: textFaint }}>
                © {new Date().getFullYear()} Padelium Studio
              </span>
            </div>

            <a
              href={SIGN_IN_URL}
              className="plnd-link"
              style={{ color: textFaint, fontSize: 13, textDecoration: "none" }}
            >
              Sign In
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-oxanium), sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "oklch(0.72 0.05 235)",
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-oxanium), sans-serif",
          fontWeight: 600,
          fontSize: "clamp(22px, 3vw, 28px)",
          margin: 0,
          color: "#f5f5f5",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function PricingCard({
  tier,
  price,
  cadence,
  description,
  items,
  highlighted,
}: {
  tier: string;
  price: string;
  cadence: string;
  description: string;
  items: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className="plnd-card"
      style={{
        borderRadius: 16,
        border: highlighted ? "1px solid oklch(0.6 0.16 250 / 0.4)" : cardBorder,
        background: highlighted
          ? "linear-gradient(180deg, oklch(0.6 0.16 250 / 0.1), rgba(255,255,255,0.035))"
          : cardBg,
        padding: "28px 26px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-oxanium), sans-serif",
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: highlighted ? "oklch(0.75 0.14 250)" : textMuted,
          marginBottom: 14,
        }}
      >
        {tier}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
        <span
          style={{
            fontFamily: "var(--font-oxanium), sans-serif",
            fontWeight: 600,
            fontSize: 36,
            color: "#f5f5f5",
          }}
        >
          {price}
        </span>
        {cadence && <span style={{ fontSize: 14, color: textFaint }}>{cadence}</span>}
      </div>

      <p style={{ fontSize: 14, color: textMuted, margin: "0 0 22px", lineHeight: 1.6 }}>
        {description}
      </p>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
        {items.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 14,
              color: "oklch(0.85 0.01 250)",
            }}
          >
            <span
              aria-hidden
              style={{
                marginTop: 2,
                width: 14,
                height: 14,
                flexShrink: 0,
                borderRadius: 4,
                background: highlighted ? accentGradient : "rgba(255,255,255,0.12)",
              }}
            />
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#waitlist"
        className={highlighted ? "plnd-btn-primary" : "plnd-btn-ghost"}
        style={{
          display: "block",
          textAlign: "center",
          marginTop: 26,
          borderRadius: 10,
          padding: "11px 0",
          fontFamily: "var(--font-oxanium), sans-serif",
          fontWeight: 600,
          fontSize: 14,
          textDecoration: "none",
          color: highlighted ? "#04121f" : "#ededed",
          background: highlighted ? accentGradient : "transparent",
          border: highlighted ? "none" : "1px solid rgba(255,255,255,0.12)",
        }}
      >
        Join the waitlist
      </a>
    </div>
  );
}

// Colours/spacing below mirror the app's actual "Dark" scoreboard preset
// (src/themes/defaultTheme.ts + builtInPresets.ts in the main app) rather
// than an invented look, so the marketing page shows the real product.
const BOARD_BG = "#16171c";
const BOARD_BORDER = "#96969a";
const BOARD_TEXT = "#ffffff";
const POINT_BG = "#69686d";
const SERVER_DOT = "#69686d";

type MockScoreRowProps = {
  name: string;
  serving?: boolean;
  set: string;
  game: string;
  point: string;
};

function MockScoreRow({ name, serving, set, game, point }: MockScoreRowProps) {
  const numberStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    color: BOARD_TEXT,
    textAlign: "center",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", background: BOARD_BG }}>
      <span
        className="truncate"
        style={{
          width: 180,
          padding: "6px 12px",
          fontSize: 15,
          letterSpacing: "0.025em",
          color: BOARD_TEXT,
          fontWeight: 600,
        }}
      >
        {name}
      </span>
      <span style={{ width: 20, display: "flex", justifyContent: "center" }}>
        {serving && (
          <span
            aria-hidden
            style={{ width: 9, height: 9, borderRadius: "50%", background: SERVER_DOT }}
          />
        )}
      </span>
      <span style={{ ...numberStyle, width: 36 }}>{set}</span>
      <span style={{ ...numberStyle, width: 36 }}>{game}</span>
      <span style={{ ...numberStyle, width: 42, padding: "4px 0", background: POINT_BG }}>
        {point}
      </span>
    </div>
  );
}

/** Static mockup of the app's live scoreboard overlay for the hero — a
    simplified stand-in for BroadcastScoreboard.tsx (which needs match state
    it doesn't make sense to fake here), styled to match the real "Dark"
    preset's colours, spacing, and typeface. */
function ScoreboardMock() {
  return (
    <div
      style={{
        borderRadius: 20,
        border: cardBorder,
        background: cardBg,
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "fit-content",
          border: `1px solid ${BOARD_BORDER}`,
          borderRadius: 2,
          overflow: "hidden",
          fontFamily: "var(--font-oxanium), sans-serif",
          filter: "drop-shadow(0 20px 60px -20px oklch(0.55 0.16 250 / 0.45))",
        }}
      >
        <MockScoreRow name="MARTINEZ / RUIZ" set="6" game="4" point="40" />
        <MockScoreRow name="SANCHEZ / VEGA" serving set="3" game="6" point="30" />
      </div>
    </div>
  );
}
