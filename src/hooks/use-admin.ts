import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Json } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { getPublishedContent } from "@/lib/content.functions";
import { mergeContent, type ContentKind, type ContentRow } from "@/lib/content-merge";

export function useIsOwner() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["admin", "is-owner", user?.id],
    enabled: !!user,
    queryFn: async () => {
      // The database function checks the caller's verified Supabase UID against
      // the private owner_accounts table; browser-supplied role values are ignored.
      const callOwnerCheck = supabase.rpc as unknown as (
        functionName: string,
      ) => Promise<{ data: boolean | null; error: { message: string } | null }>;
      const { data, error } = await callOwnerCheck("is_owner");
      if (error) throw new Error(error.message);
      return data === true;
    },
  });
}

/** What the owner is editing: built-in course + published edits + unpublished drafts. */
export function useAdminContent(enabled: boolean) {
  return useQuery({
    queryKey: ["admin", "content"],
    enabled,
    queryFn: async () => {
      const [published, drafts] = await Promise.all([
        getPublishedContent(),
        supabase.from("content_drafts").select("kind, slug, position, data, updated_at"),
      ]);
      if (drafts.error) throw drafts.error;
      const draftRows = drafts.data as ContentRow[];
      return {
        content: mergeContent(published as ContentRow[], draftRows),
        published: published as ContentRow[],
        drafts: draftRows,
      };
    },
  });
}

export function useSaveDraft() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rows: { kind: ContentKind; slug: string; position: number; data: unknown }[]) => {
      const { error } = await supabase.from("content_drafts").upsert(
        rows.map((r) => ({
          kind: r.kind,
          slug: r.slug,
          position: r.position,
          data: r.data as Json,
          updated_at: new Date().toISOString(),
          updated_by: user?.id ?? null,
        })),
      );
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "content"] }),
  });
}

export function usePublish() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc("publish_content");
      if (error) throw error;
      return data;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin", "content"] });
      await qc.invalidateQueries({ queryKey: ["content"] });
    },
  });
}

export function useDiscardDrafts() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("content_drafts")
        .delete()
        .in("kind", ["module", "glossary", "tips", "settings"]);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "content"] }),
  });
}

export interface OwnerDashboardStats {
  total_users: number;
  total_admins: number;
  published_modules: number;
  recent_admin_actions: number;
}

export function useOwnerDashboardStats(enabled: boolean) {
  return useQuery({
    queryKey: ["owner", "dashboard-stats"],
    enabled,
    queryFn: async (): Promise<OwnerDashboardStats> => {
      const callStats = supabase.rpc as unknown as (
        functionName: string,
      ) => Promise<{ data: OwnerDashboardStats[] | null; error: { message: string } | null }>;
      const { data, error } = await callStats("owner_dashboard_stats");
      if (error) throw new Error(error.message);
      if (!data?.[0]) throw new Error("Owner dashboard statistics were not returned.");
      return data[0];
    },
  });
}

export function useSetAdminRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { targetUserId: string; enabled: boolean }) => {
      const callSetRole = supabase.rpc as unknown as (
        functionName: string,
        args: { _target_user_id: string; _enabled: boolean },
      ) => Promise<{ error: { message: string } | null }>;
      const { error } = await callSetRole("set_admin_role", {
        _target_user_id: input.targetUserId,
        _enabled: input.enabled,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["owner"] });
      await qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}
