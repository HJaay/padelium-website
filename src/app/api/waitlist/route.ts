import { NextRequest, NextResponse } from "next/server";

import { addToWaitlist } from "@/lib/waitlistStore";

// Deliberately simple (not RFC 5322): good enough to catch typos in a
// marketing-page email field without rejecting valid-but-unusual addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const { email } = (await request.json().catch(() => ({}))) as {
    email?: string;
  };

  const trimmed = email?.trim() ?? "";
  if (!EMAIL_PATTERN.test(trimmed)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const result = await addToWaitlist(trimmed);
  return NextResponse.json({ status: result });
}
