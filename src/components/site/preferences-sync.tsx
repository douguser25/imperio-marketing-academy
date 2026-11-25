import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { profileQuery } from "@/lib/profile-query";
import { applyPreferences, resetPreferences, type Preferences } from "@/lib/preferences";
import { normalizeLocale } from "@/lib/locale";
import { supabase } from "@/integrations/supabase/client";

/** Applies account preferences everywhere and lets the user persist their UI language. */
export function PreferencesSync() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { data } = useQuery({ ...profileQuery(user?.id ?? ""), enabled: !!user });
  const hadUser = useRef(false);
  const browserLocale = normalizeLocale(typeof navigator === "undefined" ? "pt-BR" : navigator.language);

  const saveLocale = useMutation({
    mutationFn: async (locale: "pt-BR" | "en") => {
      if (!user) throw new Error("Authentication required");
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, locale }, { onConflict: "id" });
      if (error) throw error;
      return locale;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      toast.success(normalizeLocale(data?.locale) === "en" ? "Language saved." : "Idioma salvo.");
    },
    onError: (error) => {
      console.error("[Profile] Failed to save language preference:", error);
      toast.error(normalizeLocale(data?.locale) === "en" ? "Could not save language." : "Não foi possível salvar o idioma.");
    },
  });

  useEffect(() => {
    if (loading) return;
    if (!user) {
      if (hadUser.current) resetPreferences();
      hadUser.current = false;
      document.documentElement.lang = browserLocale;
      return;
    }
    hadUser.current = true;
    document.documentElement.lang = normalizeLocale(data?.locale);
    if (!data) return;
    const prefs = data as Preferences;
    applyPreferences(prefs);
    if (prefs.theme !== "system" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyPreferences(prefs);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [user, loading, data, browserLocale]);

  if (!user || !location.pathname.endsWith("/configuracoes")) return null;

  const locale = normalizeLocale(data?.locale);
  return (
    <section className="mx-auto mt-8 w-full max-w-3xl px-5" aria-labelledby="language-setting-title">
      <div className="rounded-2xl border border-border bg-card-imperial p-5 shadow-card md:p-8">
        <p className="eyebrow">04</p>
        <h2 id="language-setting-title" className="mt-1 text-2xl font-semibold">
          {locale === "en" ? "Language" : "Idioma"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {locale === "en" ? "Saved to your account and synced across devices." : "Salvo na sua conta e sincronizado entre dispositivos."}
        </p>
        <label htmlFor="account-locale" className="sr-only">
          {locale === "en" ? "Choose language" : "Escolha o idioma"}
        </label>
        <select
          id="account-locale"
          className="mt-4 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground sm:max-w-xs"
          value={locale}
          disabled={saveLocale.isPending || !data}
          onChange={(event) => {
            const nextLocale = normalizeLocale(event.currentTarget.value);
            document.documentElement.lang = nextLocale;
            saveLocale.mutate(nextLocale);
          }}
        >
          <option value="pt-BR">Português</option>
          <option value="en">English</option>
        </select>
      </div>
    </section>
  );
}
