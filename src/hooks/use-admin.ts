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
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
  });
}

/** What the owner is editing: built-in content + published edits + unpublished drafts. */
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
