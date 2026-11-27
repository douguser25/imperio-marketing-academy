import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ user: null, session: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, session: null, loading: true });

  useEffect(() => {
    let active = true;
    let receivedAuthEvent = false;
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      receivedAuthEvent = true;
      if (active) setState({ session, user: session?.user ?? null, loading: false });
    });

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!active || receivedAuthEvent) return;
      if (error) console.error("[Auth] Unable to restore the saved session:", error.message);
      setState({ session: error ? null : session, user: error ? null : session?.user ?? null, loading: false });
    }).catch((error: unknown) => {
      if (!active || receivedAuthEvent) return;
      console.error("[Auth] Unable to restore the saved session:", error);
      setState({ session: null, user: null, loading: false });
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const userId = state.user?.id;
  useEffect(() => {
    if (!userId) return;
    let active = true;

    // profiles.display_name is the canonical persisted name. RLS restricts this
    // query to the signed-in user's own profile; OAuth metadata is only a fallback.
    void Promise.resolve(
      supabase.from("profiles").select("display_name").eq("id", userId).maybeSingle(),
    )
      .then(({ data, error }) => {
        if (error) {
          console.error("[Profile] Unable to load the saved display name:", error.message);
          return;
        }
        const savedName = data?.display_name?.trim();
        if (!active || !savedName) return;

        setState((current) => {
          if (!active || current.user?.id !== userId) return current;
          const user = current.user;
          const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
          if (metadata["full_name"] === savedName && metadata["name"] === savedName) return current;
          return {
            ...current,
            user: {
              ...user,
              user_metadata: { ...metadata, full_name: savedName, name: savedName },
            },
          };
        });
      })
      .catch((error: unknown) => {
        if (active) console.error("[Profile] Unable to load the saved display name:", error);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

/** Resolve the persisted profile name first, then use Google/Auth metadata as the initial fallback. */
export function displayName(user: User | null, persistedName?: string | null) {
  if (!user) return "";
  const savedName = persistedName?.trim();
  if (savedName) return savedName;

  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const metadataName = [meta?.["full_name"], meta?.["name"]].find(
    (value): value is string => typeof value === "string" && value.trim().length > 0,
  );
  return metadataName?.trim() ?? user.email?.split("@")[0] ?? "Aluno";
}
