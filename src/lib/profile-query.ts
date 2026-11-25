import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { defaultPreferences } from "@/lib/preferences";

export interface Profile {
  display_name: string | null;
  avatar_path: string | null;
  theme: string;
  primary_color: string;
  accent_color: string;
}

/** The signed-in user's own profile row (RLS limits it to their row); defaults when none exists yet. */
export const profileQuery = (userId: string) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: async (): Promise<Profile> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, avatar_path, theme, primary_color, accent_color")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data ?? { display_name: null, avatar_path: null, ...defaultPreferences };
    },
  });
