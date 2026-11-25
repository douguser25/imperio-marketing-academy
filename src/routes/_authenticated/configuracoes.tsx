import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, Check, LogOut, Monitor, Moon, Save, Sun, Trash2, UserRound } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { profileQuery } from "@/lib/profile-query";
import {
  accentPalettes,
  applyPreferences,
  primaryPalettes,
  resetPreferences,
  themeVars,
  type Theme,
} from "@/lib/preferences";
import {
  DELETE_CONFIRMATION,
  MAX_DISPLAY_NAME,
  validateAvatar,
  validateDisplayName,
  validateNewPassword,
} from "@/lib/account-rules";
import { deleteMyAccount } from "@/lib/account.functions";

export const Route = createFileRoute("/_authenticated/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — IMPÉRIO DIGITAL" },
      { name: "description", content: "Perfil, aparência e conta do aluno no IMPÉRIO DIGITAL." },
      { property: "og:title", content: "Configurações — IMPÉRIO DIGITAL" },
      { property: "og:description", content: "Gerencie seu perfil, tema e conta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsPage,
});

const en = typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("en");
const t = (pt: string, eng: string) => (en ? eng : pt);

function Section({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card-imperial p-5 shadow-card md:p-8">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

function SettingsPage() {
  const { user } = useAuth();
  if (!user) return null;
  return <SettingsContent userId={user.id} />;
}

function SettingsContent({ userId }: { userId: string }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useQuery(profileQuery(userId));

  const [name, setName] = useState("");
  const [theme, setTheme] = useState<Theme>("dark");
  const [primary, setPrimary] = useState("dourado");
  const [accent, setAccent] = useState("champanhe");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [confirmText, setConfirmText] = useState("");

  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const providers = (user?.app_metadata?.["providers"] as string[] | undefined) ?? [];
  const hasPassword = providers.includes("email");

  useEffect(() => {
    if (!profile) return;
    setName(profile.display_name ?? String(meta["full_name"] ?? meta["name"] ?? ""));
    setTheme((["dark", "light", "system"].includes(profile.theme) ? profile.theme : "dark") as Theme);
    setPrimary(profile.primary_color);
    setAccent(profile.accent_color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  useEffect(() => {
    const path = profile?.avatar_path;
    if (!path) return setAvatarUrl(null);
    let active = true;
    supabase.storage.from("avatars").createSignedUrl(path, 3600).then(({ data }) => {
      if (active) setAvatarUrl(data?.signedUrl ?? null);
    });
    return () => { active = false; };
  }, [profile?.avatar_path]);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  async function saveRow(values: Record<string, unknown>) {
    const { error } = await supabase.from("profiles").upsert({ id: userId, ...values }, { onConflict: "id" });
    if (error) throw error;
    await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
  }

  async function saveProfile() {
    const err = validateDisplayName(name);
    if (err) { toast.error(en ? "Enter a name of up to 60 characters." : err); return; }
    setSaving("profile");
    try {
      let avatar_path = profile?.avatar_path ?? null;
      if (file) {
        const ext = file.type.split("/")[1] ?? "jpg";
        const path = `${userId}/avatar-${Date.now()}.${ext}`;
        const up = await supabase.storage.from("avatars").upload(path, file, { contentType: file.type });
        if (up.error) throw up.error;
        if (avatar_path) await supabase.storage.from("avatars").remove([avatar_path]);
        avatar_path = path;
      }
      await saveRow({ display_name: name.trim(), avatar_path });
      await supabase.auth.updateUser({ data: { full_name: name.trim() } });
      setFile(null);
      setPreview(null);
      toast.success(t("Perfil salvo.", "Profile saved."));
    } catch (e) {
      console.error(e);
      toast.error(t("Não foi possível salvar o perfil.", "Could not save your profile."));
    } finally {
      setSaving(null);
    }
  }

  async function saveAppearance() {
    setSaving("look");
    try {
      await saveRow({ theme, primary_color: primary, accent_color: accent });
      applyPreferences({ theme, primary_color: primary, accent_color: accent });
      toast.success(t("Aparência salva.", "Appearance saved."));
    } catch (e) {
      console.error(e);
      toast.error(t("Não foi possível salvar a aparência.", "Could not save the appearance."));
    } finally {
      setSaving(null);
    }
  }

  async function changePassword() {
    const err = validateNewPassword(pw.next, pw.confirm, pw.current);
    if (err) { toast.error(en ? "Check the new password: at least 6 characters, matching, and different from the current one." : err); return; }
    setSaving("pw");
    const { error } = await supabase.auth.updateUser({ password: pw.next, current_password: pw.current } as never);
    setSaving(null);
    if (error) { toast.error(t("Não foi possível trocar a senha. Confira a senha atual.", "Could not change the password. Check your current password.")); return; }
    setPw({ current: "", next: "", confirm: "" });
    toast.success(t("Senha alterada.", "Password changed."));
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  }

  async function deleteAccount() {
    setSaving("delete");
    try {
      await deleteMyAccount({ data: { confirmation: confirmText.trim() } });
      queryClient.clear();
      resetPreferences();
      await supabase.auth.signOut({ scope: "local" });
      toast.success(t("Sua conta foi excluída.", "Your account was deleted."));
      navigate({ to: "/", replace: true });
    } catch (e) {
      console.error(e);
      toast.error(t("Não foi possível excluir a conta.", "Could not delete the account."));
      setSaving(null);
    }
  }

  function pickFile(f: File | undefined) {
    if (!f) return;
    const err = validateAvatar(f);
    if (err) { toast.error(en ? "Use a JPG, PNG or WEBP image up to 2 MB." : err); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  const fmt = (d?: string | null) => (d ? new Date(d).toLocaleString(en ? "en-US" : "pt-BR") : "—");
  const shownAvatar = preview ?? avatarUrl;
  const themes: { id: Theme; label: string; icon: ReactNode }[] = [
    { id: "light", label: t("Claro", "Light"), icon: <Sun className="h-5 w-5" /> },
    { id: "dark", label: t("Escuro", "Dark"), icon: <Moon className="h-5 w-5" /> },
    { id: "system", label: t("Automático", "Automatic"), icon: <Monitor className="h-5 w-5" /> },
  ];

  if (isLoading) {
    return <div className="mx-auto max-w-3xl px-5 py-16 text-muted-foreground">{t("Carregando...", "Loading...")}</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-5 py-10 md:py-16">
      <header>
        <p className="eyebrow">{t("Sua conta", "Your account")}</p>
        <h1 className="mt-2 text-4xl font-semibold">{t("Configurações", "Settings")}</h1>
      </header>

      <Section eyebrow="01" title={t("Perfil", "Profile")}>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface">
            {shownAvatar ? (
              <img src={shownAvatar} alt={t("Foto de perfil", "Profile photo")} className="h-full w-full object-cover" />
            ) : (
              <UserRound className="h-9 w-9 text-primary" />
            )}
          </div>
          <div>
            <Button asChild variant="imperial" size="sm">
              <label className="cursor-pointer">
                <Camera /> {shownAvatar ? t("Trocar foto", "Change photo") : t("Adicionar foto", "Add photo")}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
              </label>
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">JPG, PNG {t("ou", "or")} WEBP · 2 MB</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">{t("Nome de exibição", "Display name")}</Label>
          <Input id="name" value={name} maxLength={MAX_DISPLAY_NAME} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" value={user?.email ?? ""} readOnly disabled />
        </div>
        <Button variant="hero" onClick={saveProfile} disabled={saving === "profile"}>
          <Save /> {saving === "profile" ? t("Salvando...", "Saving...") : t("Salvar perfil", "Save profile")}
        </Button>
      </Section>

      <Section eyebrow="02" title={t("Aparência", "Appearance")}>
        <div>
          <p className="mb-3 text-sm font-medium">{t("Tema", "Theme")}</p>
          <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label={t("Tema", "Theme")}>
            {themes.map((o) => (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={theme === o.id}
                onClick={() => setTheme(o.id)}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-4 text-sm transition-colors hover:bg-accent aria-checked:border-primary aria-checked:text-primary"
              >
                {o.icon}
                {o.label}
              </button>
            ))}
          </div>
          {theme === "system" && (
            <p className="mt-2 text-xs text-muted-foreground">{t("Segue o modo claro ou escuro do seu aparelho.", "Follows your device's light or dark mode.")}</p>
          )}
        </div>
        <Swatches label={t("Cor principal", "Main color")} list={primaryPalettes} value={primary} onChange={setPrimary} kind="primary" />
        <Swatches label={t("Cor de destaque", "Highlight color")} list={accentPalettes} value={accent} onChange={setAccent} kind="accent" />
        <Button variant="hero" onClick={saveAppearance} disabled={saving === "look"}>
          <Save /> {saving === "look" ? t("Salvando...", "Saving...") : t("Salvar aparência", "Save appearance")}
        </Button>
      </Section>

      <Section eyebrow="03" title={t("Conta", "Account")}>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <Info k="E-mail" v={user?.email ?? "—"} />
          <Info k={t("Forma de acesso", "Sign-in method")} v={providers.map((p) => (p === "email" ? t("E-mail e senha", "Email and password") : p.charAt(0).toUpperCase() + p.slice(1))).join(", ") || "—"} />
          <Info k={t("Conta criada em", "Created on")} v={fmt(user?.created_at)} />
          <Info k={t("Último acesso", "Last sign-in")} v={fmt(user?.last_sign_in_at)} />
        </dl>

        {hasPassword && (
          <div className="space-y-3 rounded-xl border border-border p-4">
            <p className="font-medium">{t("Trocar senha", "Change password")}</p>
            <Input type="password" autoComplete="current-password" placeholder={t("Senha atual", "Current password")} value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
            <Input type="password" autoComplete="new-password" placeholder={t("Nova senha", "New password")} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
            <Input type="password" autoComplete="new-password" placeholder={t("Confirmar nova senha", "Confirm new password")} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
            <Button variant="imperial" onClick={changePassword} disabled={saving === "pw"}>
              <Save /> {t("Salvar nova senha", "Save new password")}
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="imperial" onClick={signOut}><LogOut /> {t("Sair da conta", "Sign out")}</Button>
          <AlertDialog onOpenChange={(o) => !o && setConfirmText("")}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive"><Trash2 /> {t("Excluir conta", "Delete account")}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("Excluir sua conta?", "Delete your account?")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t(
                    "Isso apaga na hora seu perfil, sua foto, seu progresso e os resultados dos questionários. Não dá para desfazer.",
                    "This immediately erases your profile, photo, progress and quiz results. It cannot be undone.",
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-2">
                <Label htmlFor="confirm-delete">
                  {t("Digite", "Type")} <strong>{DELETE_CONFIRMATION}</strong> {t("para confirmar", "to confirm")}
                </Label>
                <Input id="confirm-delete" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} autoComplete="off" />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("Cancelar", "Cancel")}</AlertDialogCancel>
                <Button variant="destructive" disabled={confirmText.trim() !== DELETE_CONFIRMATION || saving === "delete"} onClick={deleteAccount}>
                  <Trash2 /> {saving === "delete" ? t("Excluindo...", "Deleting...") : t("Excluir definitivamente", "Delete permanently")}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Section>
    </div>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <dt className="text-xs text-muted-foreground">{k}</dt>
      <dd className="mt-1 break-all">{v}</dd>
    </div>
  );
}

function Swatches({ label, list, value, onChange, kind }: {
  label: string;
  list: typeof primaryPalettes;
  value: string;
  onChange: (id: string) => void;
  kind: "primary" | "accent";
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-3">
        {list.map((s) => {
          const vars = themeVars({ theme: "dark", primary_color: kind === "primary" ? s.id : "dourado", accent_color: kind === "accent" ? s.id : "champanhe" });
          const color = kind === "primary" ? vars["--primary"] : vars["--primary-glow"];
          return (
            <button
              key={s.id}
              type="button"
              title={s.label}
              aria-label={s.label}
              aria-pressed={value === s.id}
              onClick={() => onChange(s.id)}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-transparent ring-offset-2 ring-offset-background aria-pressed:ring-2 aria-pressed:ring-primary"
              style={{ background: color }}
            >
              {value === s.id && <Check className="h-4 w-4 text-background" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
