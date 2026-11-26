/** Arithmetic only: callers must use database time and persist results atomically. */
export const AI_MESSAGE_CREDIT_COST = 1;
export const AI_INITIAL_CREDITS = 20;
export const AI_REFILL_CREDITS = 20;
export const AI_RENEWAL_INTERVAL_MS = 20 * 60 * 60 * 1000;

export interface AiCreditState {
  balance: number;
  renewedAt: number;
}

export function renewAiCredits(state: AiCreditState, now: number, refillAmount = AI_REFILL_CREDITS): AiCreditState {
  if (!Number.isSafeInteger(state.balance) || state.balance < 0 ||
      !Number.isSafeInteger(refillAmount) || refillAmount < 0 ||
      !Number.isSafeInteger(state.renewedAt) || !Number.isSafeInteger(now)) {
    throw new Error("Invalid credit state");
  }
  const periods = Math.max(0, Math.floor((now - state.renewedAt) / AI_RENEWAL_INTERVAL_MS));
  const balance = state.balance + periods * refillAmount;
  if (!Number.isSafeInteger(balance)) throw new Error("Credit balance overflow");
  return { balance, renewedAt: state.renewedAt + periods * AI_RENEWAL_INTERVAL_MS };
}

export function spendAiMessageCredit(state: AiCreditState): AiCreditState {
  if (!Number.isSafeInteger(state.balance) || state.balance < AI_MESSAGE_CREDIT_COST) {
    throw new Error("Insufficient credits");
  }
  return { ...state, balance: state.balance - AI_MESSAGE_CREDIT_COST };
}