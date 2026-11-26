import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, History, Minimize2, Plus, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  createAiConversation,
  type AiConversation,
  loadAiConversations,
  saveAiConversations,
} from "@/lib/ai-chat-history";

const assistantIntro =
  "Estou sendo preparado para ajudar com marketing, negócios, aulas e o uso da plataforma. A integração ainda não foi ativada.";

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<AiConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadAiConversations();
    const initial = saved.length ? saved : [createAiConversation(assistantIntro)];
    setConversations(initial);
    setActiveId(initial[0]?.id ?? null);
  }, []);

  useEffect(() => {
    if (conversations.length) saveAiConversations(conversations);
  }, [conversations]);

  const activeConversation = conversations.find((item) => item.id === activeId) ?? null;

  useEffect(() => {
    if (open && !minimized) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [activeConversation?.messages.length, open, minimized]);

  function startConversation() {
    const conversation = createAiConversation(assistantIntro);
    setConversations((current) => [conversation, ...current]);
    setActiveId(conversation.id);
    setDraft("");
    setShowHistory(false);
    setMinimized(false);
  }

  function selectConversation(conversation: AiConversation) {
    setActiveId(conversation.id);
    setShowHistory(false);
  }

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Intentionally disabled until the Supabase Edge Function is deployed and verified.
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          aria-label="Assistente de inteligência artificial"
          className={cn(
            "flex w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/30 transition-all duration-200 sm:w-[min(25rem,calc(100vw-3rem))]",
            minimized ? "h-[4.25rem]" : "h-[min(36rem,calc(100dvh-7rem))]",
          )}
        >
          <header className="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Assistente Império</p>
              <p className="text-xs text-muted-foreground">IA preparada · ainda desativada</p>
            </div>
            <Button variant="ghost" size="icon" aria-label="Nova conversa" title="Nova conversa" onClick={startConversation} className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label={minimized ? "Expandir chat" : "Minimizar chat"} title={minimized ? "Expandir" : "Minimizar"} onClick={() => setMinimized((value) => !value)} className="h-8 w-8">
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Fechar chat" title="Fechar chat" onClick={() => setOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </header>

          {!minimized && (
            <>
              <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-2">
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" aria-expanded={showHistory} onClick={() => setShowHistory((value) => !value)}>
                  <History className="h-4 w-4" /> Histórico
                </Button>
                <span className="text-xs text-muted-foreground" aria-label="Créditos disponíveis">Créditos: —</span>
              </div>

              {showHistory ? (
                <div className="min-h-0 flex-1 overflow-y-auto p-3" aria-label="Histórico de conversas">
                  <div className="mb-2 flex items-center justify-between px-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Conversas neste dispositivo</p>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={startConversation}><Plus className="h-3.5 w-3.5" /> Nova</Button>
                  </div>
                  {conversations.map((conversation) => (
                    <button key={conversation.id} type="button" onClick={() => selectConversation(conversation)} className={cn("mb-1 w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent", activeId === conversation.id && "bg-accent text-accent-foreground")}>
                      <span className="block truncate font-medium">{conversation.title}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{conversation.messages.length} mensagens</span>
                    </button>
                  ))}
                  {!conversations.length && <p className="p-3 text-sm text-muted-foreground">Nenhuma conversa salva ainda.</p>}
                </div>
              ) : (
                <>
                  <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4" role="log" aria-live="polite" aria-relevant="additions text">
                    {activeConversation?.messages.map((message) => (
                      <div key={message.id} className={cn("flex gap-2.5", message.role === "user" && "flex-row-reverse")}>
                        {message.role === "assistant" && <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary"><Bot className="h-4 w-4" aria-hidden="true" /></span>}
                        <p className={cn("max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed", message.role === "user" ? "rounded-tr-sm bg-primary text-primary-foreground" : "rounded-tl-sm bg-surface text-foreground")}>{message.content}</p>
                      </div>
                    ))}
                    <div ref={endRef} />
                  </div>
                  <div className="shrink-0 border-t border-border p-3">
                    <div className="mb-3 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">O chat está em modo de preparação. As respostas serão habilitadas após a publicação e validação segura da Edge Function.</div>
                    <form onSubmit={submitQuestion} className="flex items-end gap-2">
                      <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="A caixa de perguntas será habilitada em breve" aria-label="Digite sua pergunta" rows={1} disabled className="min-h-11 max-h-28 resize-none text-sm disabled:cursor-not-allowed disabled:opacity-70" />
                      <Button type="submit" size="icon" aria-label="Enviar pergunta" disabled className="h-11 w-11 shrink-0"><Send className="h-4 w-4" /></Button>
                    </form>
                    <p className="mt-2 text-center text-[10px] text-muted-foreground">Histórico salvo apenas neste navegador · créditos serão validados no servidor</p>
                  </div>
                </>
              )}
            </>
          )}
        </section>
      )}
      <Button type="button" variant="hero" size="icon" className="h-14 w-14 rounded-full shadow-gold" aria-label={open ? "Fechar assistente de IA" : "Abrir assistente de IA"} aria-expanded={open} onClick={() => { setOpen((value) => !value); setMinimized(false); }}>
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </Button>
    </div>
  );
}
