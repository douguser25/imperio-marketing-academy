import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Criar nova senha — IMPÉRIO DIGITAL" },
      { name: "description", content: "Defina uma nova senha para sua conta do IMPÉRIO DIGITAL." },
      { property: "og:title", content: "Criar nova senha — IMPÉRIO DIGITAL" },
      { property: "og:description", content: "Defina uma nova senha para sua conta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setIsRecovery(true);
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setIsRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Senha atualizada!");
    navigate({ to: "/progresso" });
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-hero px-5 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-3xl border border-border bg-card-imperial p-8 shadow-card">
        <h1 className="text-3xl font-semibold">Criar nova senha</h1>
        {!isRecovery ? (
          <p className="text-sm text-muted-foreground">
            Abra esta página pelo link enviado para o seu e-mail.
          </p>
        ) : null}
        <div className="space-y-1.5">
          <Label htmlFor="new-password">Nova senha</Label>
          <Input id="new-password" type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 bg-surface" />
        </div>
        <Button type="submit" variant="hero" className="h-11 w-full" disabled={busy || !isRecovery}>
          Salvar nova senha
        </Button>
      </form>
    </div>
  );
}
