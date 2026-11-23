import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export interface QuizResult {
  module_id: string;
  best_score: number;
  total: number;
  attempts: number;
}

const lessonsKey = (userId: string | undefined) => ["progress", "lessons", userId] as const;
const quizKey = (userId: string | undefined) => ["progress", "quiz", userId] as const;

export function useCompletedLessons() {
  const { user } = useAuth();
  return useQuery({
    queryKey: lessonsKey(user?.id),
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("lesson_progress").select("lesson_id");
      if (error) throw error;
      return new Set(data.map((r) => r.lesson_id));
    },
  });
}

export function useQuizResults() {
  const { user } = useAuth();
  return useQuery({
    queryKey: quizKey(user?.id),
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("module_id, best_score, total, attempts");
      if (error) throw error;
      return new Map<string, QuizResult>(data.map((r) => [r.module_id, r]));
    },
  });
}

export function useToggleLesson() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { lessonKey: string; moduleId: string; completed: boolean }) => {
      if (!user) throw new Error("Entre na sua conta para salvar o progresso.");
      if (input.completed) {
        const { error } = await supabase.from("lesson_progress").upsert({
          user_id: user.id,
          lesson_id: input.lessonKey,
          module_id: input.moduleId,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("lesson_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("lesson_id", input.lessonKey);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: lessonsKey(user?.id) }),
  });
}

export function useSaveQuiz() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { moduleId: string; score: number; total: number }) => {
      if (!user) throw new Error("Entre na sua conta para salvar sua nota.");
      const { data: existing, error: readError } = await supabase
        .from("quiz_results")
        .select("best_score, attempts")
        .eq("user_id", user.id)
        .eq("module_id", input.moduleId)
        .maybeSingle();
      if (readError) throw readError;
      const { error } = await supabase.from("quiz_results").upsert({
        user_id: user.id,
        module_id: input.moduleId,
        best_score: Math.max(existing?.best_score ?? 0, input.score),
        total: input.total,
        attempts: (existing?.attempts ?? 0) + 1,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: quizKey(user?.id) }),
  });
}
