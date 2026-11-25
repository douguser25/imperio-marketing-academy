import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { defaultPreferences } from "@/lib/preferences";
import { normalizeLocale } from "@/lib/locale";

export interface Profile {
  display_name: string | null;
  avatar_path: string | null;
  theme: string;
  primary_color: string;
  accent_color: string;
  locale: string;
}

/** Read only the signed-in user's row; RLS enforces ownership in the database. */
export const profileQuery = (userId: string) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: async (): Promise<Profile> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, avatar_path, theme, primary_color, accent_color, locale")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data
        ? { ...data, locale: normalizeLocale(data.locale) }
        : { display_name: null, avatar_path: null, ...defaultPreferences, locale: "pt-BR" };
    },
  });
