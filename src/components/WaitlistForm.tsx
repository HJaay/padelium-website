"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "joined" | "already" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      const { status: result } = (await res.json()) as {
        status: "added" | "already_joined";
      };
      setStatus(result === "added" ? "joined" : "already");
    } catch {
      setStatus("error");
    }
  }

  if (status === "joined" || status === "already") {
    return (
      <p
        style={{
          margin: 0,
          color: "oklch(0.85 0.01 250)",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 15,
        }}
      >
        {status === "joined"
          ? "You're on the list — we'll email you the moment Padelium Studio is ready."
          : "You're already on the list — we'll be in touch."}
      </p>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <form
        onSubmit={handleSubmit}
        className="plnd-waitlist-form"
        style={{ display: "flex", gap: 10, width: "100%" }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          style={{
            flex: 1,
            minWidth: 0,
            borderRadius: 10,
            border: "1px solid rgba(255, 255, 255, 0.12)",
            background: "rgba(255, 255, 255, 0.05)",
            color: "#ededed",
            padding: "12px 14px",
            fontSize: 15,
            fontFamily: "Arial, Helvetica, sans-serif",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="plnd-btn-primary"
          style={{
            flexShrink: 0,
            borderRadius: 10,
            border: "none",
            padding: "12px 20px",
            fontFamily: "var(--font-oxanium), sans-serif",
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "0.02em",
            color: "#04121f",
            background:
              "linear-gradient(150deg, oklch(0.72 0.14 245), oklch(0.55 0.16 250))",
            cursor: status === "loading" ? "default" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          {status === "loading" ? "Joining…" : "Join Waitlist"}
        </button>
      </form>

      {status === "error" && (
        <p
          style={{
            marginTop: 10,
            marginBottom: 0,
            color: "oklch(0.7 0.18 25)",
            fontSize: 13,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          Something went wrong — please try again.
        </p>
      )}
    </div>
  );
}
