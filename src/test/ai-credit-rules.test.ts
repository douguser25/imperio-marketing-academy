import { describe, expect, it } from "vitest";
import { AI_INITIAL_CREDITS, renewAiCredits, spendAiMessageCredit } from "@/lib/ai-credit-rules";

const twentyHours = 20 * 60 * 60 * 1000;
// Refill quantities here are test inputs, not a production quota.
describe("AI credit rules", () => {
  it("allows exactly 20 initial messages before exhausting the initial balance", () => {
    let state = { balance: AI_INITIAL_CREDITS, renewedAt: 0 };
    for (let index = 0; index < 20; index++) state = spendAiMessageCredit(state);
    expect(state.balance).toBe(0);
    expect(() => spendAiMessageCredit(state)).toThrow("Insufficient credits");
  });
  it("charges exactly one credit per message", () => {
    expect(spendAiMessageCredit({ balance: 7, renewedAt: 0 }).balance).toBe(6);
  });
  it("preserves the remaining credits at the 20-hour renewal", () => {
    expect(renewAiCredits({ balance: 7, renewedAt: 0 }, twentyHours, 3)).toEqual({ balance: 10, renewedAt: twentyHours });
  });
  it("does not renew before 20 hours", () => {
    expect(renewAiCredits({ balance: 7, renewedAt: 0 }, twentyHours - 1, 3).balance).toBe(7);
  });
  it("does not grant twice when the renewed state is read again", () => {
    const renewed = renewAiCredits({ balance: 7, renewedAt: 0 }, twentyHours, 3);
    expect(renewAiCredits(renewed, twentyHours, 3)).toEqual(renewed);
  });
  it("rejects a message with no credits", () => {
    expect(() => spendAiMessageCredit({ balance: 0, renewedAt: 0 })).toThrow("Insufficient credits");
  });
  it("does not grant credits when time moves backwards", () => {
    expect(renewAiCredits({ balance: 7, renewedAt: twentyHours }, 0, 3)).toEqual({ balance: 7, renewedAt: twentyHours });
  });
});