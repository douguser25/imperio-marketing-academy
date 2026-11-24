import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const REDIRECT_KEY = "imperio:after-login";
const isEnglish = typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("en");

function safePath(value: unknown): string | undefined {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : undefined;
}

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: safePath(search["redirect"]),
    error: typeof search["error"] === "string" ? search["error"] : undefined,
    error_description:
      typeof search["error_description"] === "string" ? search["error_description"] : undefined,
    error_code: typeof search["error_code"] === "string" ? search["error_code"] : undefined,
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

function AuthPage() {
  const { redirect, error, error_description, error_code } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (redirect) sessionStorage.setItem(REDIRECT_KEY, redirect);
  }, [redirect]);

  useEffect(() => {
    if (error || error_description || error_code) {
      toast.error(
        error_description ||
          (isEnglish ? "Google sign-in could not be completed. Please try again." : "Não foi possível concluir o login com Google. Tente novamente."),
      );
      navigate({
        to: "/auth",
        search: { redirect, error: undefined, error_description: undefined, error_code: undefined },
        replace: true,
      });
    }
  }, [error, error_description, error_code, navigate, redirect]);

  useEffect(() => {
    if (!loading && user) {
      const target = safePath(sessionStorage.getItem(REDIRECT_KEY)) ?? "/progresso";
      sessionStorage.removeItem(REDIRECT_KEY);
      navigate({ to: target, replace: true });
    }
  }, [user, loading, navigate]);

  async function social() {
    setBusy(true);
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: new URL("/auth", window.location.origin).toString(),
          queryParams: { prompt: "select_account" },
        },
      });
      if (authError) throw authError;
    } catch (authError) {
      const message =
        authError instanceof Error
          ? authError.message
          : isEnglish
            ? "Unable to sign in. Please try again."
            : "Não foi possível entrar. Tente novamente.";
      toast.error(message);
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-hero px-5 py-16">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="relative w-full max-w-md animate-fade-up rounded-3xl border border-border bg-card-imperial p-8 shadow-card">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-6 text-center text-3xl font-semibold">
          {isEnglish ? "Sign in to your account" : "Entrar na sua conta"}
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {isEnglish
            ? "Save your progress and continue on any device."
            : "Salve seu progresso e continue de qualquer aparelho."}
        </p>

        <div className="mt-6 space-y-3">
          <Button type="button" variant="google" className="h-11 w-full" disabled={busy} onClick={social}>
            <GoogleLogo />
            {busy
              ? isEnglish ? "Connecting..." : "Conectando..."
              : isEnglish ? "Continue with Google" : "Continuar com Google"}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isEnglish
            ? "Continue to create or access your account with Google."
            : "Ao continuar, você cria ou acessa sua conta usando o Google."}
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            {isEnglish ? "Back to home" : "Voltar ao início"}
          </Link>
        </p>
      </div>
    </div>
  );
}
