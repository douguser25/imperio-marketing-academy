import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { profileQuery } from "@/lib/profile-query";
import { applyPreferences, resetPreferences, type Preferences } from "@/lib/preferences";

/** Applies the signed-in user's saved look on every page; "system" follows device changes live. */
export function PreferencesSync() {
  const { user, loading } = useAuth();
  const { data } = useQuery({ ...profileQuery(user?.id ?? ""), enabled: !!user });
  const hadUser = useRef(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      if (hadUser.current) resetPreferences();
      hadUser.current = false;
      return;
    }
    hadUser.current = true;
    if (!data) return;
    const prefs = data as Preferences;
    applyPreferences(prefs);
    if (prefs.theme !== "system" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyPreferences(prefs);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [user, loading, data]);

  return null;
}
