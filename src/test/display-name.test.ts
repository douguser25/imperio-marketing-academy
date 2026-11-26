import { describe, expect, it } from "vitest";
import type { User } from "@supabase/supabase-js";
import { displayName } from "@/hooks/use-auth";

function user(metadata: Record<string, unknown> = {}, email = "samuel@example.com"): User {
  return {
    id: "user-1",
    app_metadata: {},
    user_metadata: metadata,
    aud: "authenticated",
    created_at: "2026-01-01T00:00:00.000Z",
    email,
  } as User;
}

describe("displayName", () => {
  it("keeps the complete saved profile name rather than truncating the surname", () => {
    expect(displayName(user({ full_name: "Google Name" }), "Samuel Ribas")).toBe("Samuel Ribas");
  });

  it("uses the complete Google name as the initial fallback", () => {
    expect(displayName(user({ full_name: "Samuel Ribas" }))).toBe("Samuel Ribas");
  });

  it("falls back to the email name when auth metadata has no usable name", () => {
    expect(displayName(user({ full_name: "  " }, "samuel@example.com")).toBe("samuel");
  });

  it("returns an empty string when there is no signed-in user", () => {
    expect(displayName(null)).toBe("");
  });
});
