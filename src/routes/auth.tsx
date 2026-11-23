import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { lovable } from "@/integrations/lovable/index";
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
      { name: "twitter:card", content: "summary_large_image" },
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

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth", data: { full_name: name } },
        });
        if (error) throw error;
        setNotice("Conta criada! Confirme pelo link que enviamos para o seu e-mail e depois entre.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setNotice("Se houver uma conta com esse e-mail, você receberá um link para criar nova senha.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Algo deu errado.";
      toast.error(
        message.includes("Invalid login credentials")
          ? "E-mail ou senha incorretos."
          : message.includes("Email not confirmed")
            ? "Confirme seu e-mail antes de entrar."
            : message,
      );
    } finally {
      setBusy(false);
    }
  }

  async function social(provider: "google" | "lovable") {
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) toast.error("Não foi possível entrar. Tente novamente.");
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-hero px-5 py-16">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="relative w-full max-w-md animate-fade-up rounded-3xl border border-border bg-card-imperial p-8 shadow-card">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-3xl font-semibold">
          {mode === "signin" ? "Entrar na sua conta" : mode === "signup" ? "Criar conta gratuita" : "Recuperar senha"}
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {mode === "forgot"
            ? "Enviaremos um link para você criar uma nova senha."
            : "Salve seu progresso e continue de qualquer aparelho."}
        </p>

        {notice ? (
          <p className="mt-6 rounded-lg border border-primary/30 bg-accent p-3 text-sm">{notice}</p>
        ) : null}

        {mode !== "forgot" ? (
          <div className="mt-6 space-y-3">
            <Button type="button" variant="google" className="h-11 w-full" onClick={() => social("google")}>
              <GoogleLogo /> Continuar com Google
            </Button>
            <Button type="button" variant="outline" className="h-11 w-full" onClick={() => social("lovable")}>
              <LovableMark /> Continuar com Lovable
            </Button>
            <div className="flex items-center gap-3 py-2 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> ou com e-mail <span className="h-px flex-1 bg-border" />
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {mode === "signup" ? (
            <div className="space-y-1.5">
              <Label htmlFor="name">Seu nome</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="h-11 bg-surface" />
            </div>
          ) : null}
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11 bg-surface" />
          </div>
          {mode !== "forgot" ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                {mode === "signin" ? (
                  <button type="button" className="text-xs text-primary hover:underline" onClick={() => setMode("forgot")}>
                    Esqueci a senha
                  </button>
                ) : null}
              </div>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-surface"
              />
            </div>
          ) : null}
          <Button type="submit" variant="hero" className="h-11 w-full" disabled={busy}>
            {busy ? "Aguarde..." : mode === "signin" ? "Entrar" : mode === "signup" ? "Criar conta" : "Enviar link"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "signin" ? (
            <>
              Ainda não tem conta?{" "}
              <button type="button" className="text-primary hover:underline" onClick={() => setMode("signup")}>
                Criar conta
              </button>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <button type="button" className="text-primary hover:underline" onClick={() => setMode("signin")}>
                Entrar
              </button>
            </>
          )}
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            Voltar ao início
          </Link>
        </p>
      </div>
    </div>
  );
}
