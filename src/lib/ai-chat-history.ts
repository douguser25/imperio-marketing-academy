export type AiChatRole = "user" | "assistant";

export interface AiChatMessage {
  id: string;
  role: AiChatRole;
  content: string;
  createdAt: string;
}

export interface AiConversation {
  id: string;
  title: string;
  updatedAt: string;
  messages: AiChatMessage[];
}

const STORAGE_KEY = "imperio-ai-chat-history-v1";
const MAX_CONVERSATIONS = 30;
const MAX_MESSAGES_PER_CONVERSATION = 100;

function createId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createAiConversation(intro: string): AiConversation {
  const now = new Date().toISOString();
  return {
    id: createId(),
    title: "Nova conversa",
    updatedAt: now,
    messages: [{ id: createId(), role: "assistant", content: intro, createdAt: now }],
  };
}

function isMessage(value: unknown): value is AiChatMessage {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item["id"] === "string" && (item["role"] === "user" || item["role"] === "assistant") && typeof item["content"] === "string" && typeof item["createdAt"] === "string";
}

function isConversation(value: unknown): value is AiConversation {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item["id"] === "string" && typeof item["title"] === "string" && typeof item["updatedAt"] === "string" && Array.isArray(item["messages"]) && (item["messages"] as unknown[]).every(isMessage);
}

export function loadAiConversations(): AiConversation[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isConversation).map((conversation) => ({
      ...conversation,
      messages: conversation.messages.slice(-MAX_MESSAGES_PER_CONVERSATION),
    })).slice(0, MAX_CONVERSATIONS);
  } catch {
    return [];
  }
}

export function saveAiConversations(conversations: AiConversation[]): void {
  if (typeof window === "undefined") return;
  try {
    const bounded = conversations.slice(0, MAX_CONVERSATIONS).map((conversation) => ({
      ...conversation,
      messages: conversation.messages.slice(-MAX_MESSAGES_PER_CONVERSATION),
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bounded));
  } catch {
    // Storage can be disabled or full; conversations remain available in memory.
  }
}

export interface AiAssistantRequest {
  message: string;
  history: Array<Pick<AiChatMessage, "role" | "content">>;
  locale: "pt-BR" | "en";
  context?: { pathname?: string; title?: string };
}

export interface AiAssistantResponse {
  reply: string;
  creditsRemaining?: number;
}

/** Server-only provider integration point. Never put provider secrets in this module. */
export async function requestAiAssistant(request: AiAssistantRequest): Promise<AiAssistantResponse> {
  if (import.meta.env["VITE_AI_ASSISTANT_ENABLED"] !== "true") {
    throw new Error("O assistente de IA ainda não foi ativado.");
  }
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase.functions.invoke("ai-assistant", { body: request });
  if (error) throw new Error("Não foi possível conectar ao assistente. Tente novamente mais tarde.");
  if (!data || typeof data.reply !== "string") throw new Error("A resposta recebida do assistente está em formato inválido.");
  return { reply: data.reply, creditsRemaining: typeof data.creditsRemaining === "number" ? data.creditsRemaining : undefined };
}
