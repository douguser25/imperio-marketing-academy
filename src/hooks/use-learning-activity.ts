import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export interface RecentLessonActivity {
  kind: "lesson";
  lesson_id: string;
  module_id: string;
  occurred_at: string;
}

export interface RecentQuizActivity {
  kind: "quiz";
  module_id: string;
  best_score: number;
  total: number;
  occurred_at: string;
}

export type RecentActivity = RecentLessonActivity | RecentQuizActivity;

/** Fetches the signed-in user's existing progress records; RLS restricts these rows to their UID. */
export function useRecentLearningActivity(enabled = true) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["progress", "activity", user?.id],
    enabled: !!user && enabled,
    queryFn: async (): Promise<RecentActivity[]> => {
      const [lessons, quizzes] = await Promise.all([
        supabase
          .from("lesson_progress")
          .select("lesson_id, module_id, completed_at")
          .order("completed_at", { ascending: false })
          .limit(8),
        supabase
          .from("quiz_results")
          .select("module_id, best_score, total, updated_at")
          .order("updated_at", { ascending: false })
          .limit(8),
      ]);
      if (lessons.error) throw lessons.error;
      if (quizzes.error) throw quizzes.error;

      return [
        ...(lessons.data ?? []).map((row): RecentLessonActivity => ({
          kind: "lesson",
          lesson_id: row.lesson_id,
          module_id: row.module_id,
          occurred_at: row.completed_at,
        })),
        ...(quizzes.data ?? []).map((row): RecentQuizActivity => ({
          kind: "quiz",
          module_id: row.module_id,
          best_score: row.best_score,
          total: row.total,
          occurred_at: row.updated_at,
        })),
      ]
        .sort((a, b) => Date.parse(b.occurred_at) - Date.parse(a.occurred_at))
        .slice(0, 8);
    },
  });
}
