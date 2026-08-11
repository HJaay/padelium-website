import { kv } from "@vercel/kv";

const SET_KEY = "waitlist:emails";

/**
 * Backed by Vercel KV rather than anything per-instance — the landing page
 * runs on Vercel's serverless runtime, so in-memory state wouldn't survive
 * between requests. A set (not a list) gives free de-duplication:
 * resubmitting the same email is a no-op rather than a growing pile of
 * duplicates.
 */
export async function addToWaitlist(email: string): Promise<"added" | "already_joined"> {
  const added = await kv.sadd(SET_KEY, email.toLowerCase());
  return added > 0 ? "added" : "already_joined";
}
