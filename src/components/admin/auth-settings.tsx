import { CheckCircle2, CircleHelp, Copy, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const isEnglish = typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("en");

export function AuthSettings() {
  const [copied, setCopied] = useState(false);
  const projectUrl = supabase.supabaseUrl.replace(/\/+$/, "");
  const providerCallback = `${projectUrl}/auth/v1/callback`;
  const appRedirect = typeof window === "undefined" ? "/auth" : new URL("/auth", window.location.origin).toString();

  async function copyCallback() {
    try {
      await navigator.clipboard.writeText(providerCallback);
      setCopied(true);
      toast.success(isEnglish ? "Callback URL copied." : "Endereço de callback copiado.");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(isEnglish ? "Could not copy the callback URL." : "Não foi possível copiar o callback.");
    }
  }

  return (
    <section className="max-w-3xl space-y-6 rounded-2xl border border-border bg-card-imperial p-5 shadow-card md:p-8">
      <div>
        <p className="eyebrow">{isEnglish ? "Security and users" : "Segurança e usuários"}</p>
        <h2 className="mt-2 text-2xl font-semibold">
          {isEnglish ? "Google authentication" : "Autenticação com Google"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isEnglish
            ? "Google OAuth uses Supabase Auth. The application does not store or expose the Google client secret."
            : "O OAuth do Google usa o Supabase Auth. O aplicativo não armazena nem expõe o client secret do Google."}
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
        <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-medium">
            {isEnglish ? "Provider status: cannot be verified in the browser" : "Status do provedor: não verificável pelo navegador"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {isEnglish
              ? "The sign-in screen is wired to Google, but Supabase does not expose whether provider credentials are enabled to client applications. Verify the provider in the Supabase dashboard."
              : "A tela de login está conectada ao Google, mas o Supabase não disponibiliza às aplicações do navegador se as credenciais do provedor estão habilitadas. Confirme o provedor no painel do Supabase."}
          </p>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-border p-4">
        <h3 className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-primary" />
          {isEnglish ? "Provider callback URL" : "Callback do provedor"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isEnglish
            ? "Register this URL in Google Cloud OAuth and use it as the Supabase Google provider callback:"
            : "Cadastre este endereço no OAuth do Google Cloud e use-o como callback do provedor Google no Supabase:"}
        </p>
        <code className="block break-all rounded-lg bg-surface p-3 text-xs">{providerCallback}</code>
        <Button type="button" variant="outline" size="sm" onClick={copyCallback}>
          {copied ? <CheckCircle2 /> : <Copy />}
          {copied ? (isEnglish ? "Copied" : "Copiado") : (isEnglish ? "Copy callback URL" : "Copiar callback")}
        </Button>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        <h3 className="font-semibold text-foreground">{isEnglish ? "Required Supabase setup" : "Configuração necessária no Supabase"}</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>{isEnglish ? "Enable Google under Authentication → Sign In / Providers." : "Ative Google em Authentication → Sign In / Providers."}</li>
          <li>{isEnglish ? "Enter the Google OAuth Client ID and Client Secret in the Supabase dashboard only." : "Informe o OAuth Client ID e o Client Secret do Google somente no painel do Supabase."}</li>
          <li>{isEnglish ? "Allow the application redirect URL in Authentication → URL Configuration:" : "Permita o redirecionamento do aplicativo em Authentication → URL Configuration:"}</li>
        </ol>
        <code className="block break-all rounded-lg bg-surface p-3 text-xs text-foreground">{appRedirect}</code>
        <p>
          {isEnglish
            ? "Never put the Client Secret in frontend code. Central authentication error history requires secure server-side logging; the browser cannot read Supabase provider secrets or administrative logs."
            : "Nunca coloque o Client Secret no código frontend. O histórico central de erros exige registro seguro no servidor; o navegador não pode ler segredos do provedor ou logs administrativos do Supabase."}
        </p>
      </div>
    </section>
  );
}
