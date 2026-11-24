import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const REDIRECT_KEY = "imperio:after-login";

function safePath(value: unknown): string | undefined {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : undefined;
}

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { redirect: string | undefined } => ({
    redirect: safePath(search["redirect"]),
  }),
  head: () => ({
    meta: [
      { title: "Entrar ou criar conta — IMPÉRIO DIGITAL" },
      {
        name: "description",
        content: "Acesse sua conta do IMPÉRIO DIGITAL para salvar o progresso das aulas.",
      },
      { property: "og:title", content: "Entrar — IMPÉRIO DIGITAL" },
      { property: "og:description", content: "Acesse sua conta para salvar seu progresso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "social" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function GoogleLogo() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" className="!size-[18px]">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" className="!size-[18px]" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.21 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3c.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [busy, setBusy] = useState<"google" | "apple" | null>(null);

  useEffect(() => {
    if (redirect) sessionStorage.setItem(REDIRECT_KEY, redirect);
  }, [redirect]);

  useEffect(() => {
    if (!loading && user) {
      const target = safePath(sessionStorage.getItem(REDIRECT_KEY)) ?? "/progresso";
      sessionStorage.removeItem(REDIRECT_KEY);
      navigate({ to: target, replace: true });
    }
  }, [user, loading, navigate]);

  async function social(provider: "google" | "apple") {
    setBusy(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth`,
          queryParams: provider === "google" ? { prompt: "select_account" } : undefined,
        },
      });
      if (error) throw error;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível entrar.";
      toast.error(message);
      setBusy(null);
    }
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-hero px-5 py-16">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="relative w-full max-w-md animate-fade-up rounded-3xl border border-border bg-card-imperial p-8 shadow-card">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-6 text-center text-3xl font-semibold">Entrar na sua conta</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Salve seu progresso e continue de qualquer aparelho.
        </p>

        <div className="mt-6 space-y-3">
          <Button type="button" variant="google" className="h-11 w-full" disabled={busy !== null} onClick={() => social("google")}> 
            <GoogleLogo /> {busy === "google" ? "Conectando..." : "Continuar com Google"}
          </Button>
          <Button type="button" variant="outline" className="h-11 w-full" disabled={busy !== null} onClick={() => social("apple")}> 
            <AppleLogo /> {busy === "apple" ? "Conectando..." : "Continuar com Apple"}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ao continuar, você cria ou acessa sua conta usando o provedor escolhido.
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">Voltar ao início</Link>
        </p>
      </div>
    </div>
  );
}
