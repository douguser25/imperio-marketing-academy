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

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function displayName(user: User | null) {
  if (!user) return "";
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const name = (meta?.["full_name"] ?? meta?.["name"]) as string | undefined;
  return name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "Aluno";
}
