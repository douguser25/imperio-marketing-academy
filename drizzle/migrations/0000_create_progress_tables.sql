CREATE TABLE public.lesson_progress (
  user_id uuid NOT NULL,
  lesson_id text NOT NULL,
  module_id text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, lesson_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own lesson progress select" ON public.lesson_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own lesson progress insert" ON public.lesson_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own lesson progress update" ON public.lesson_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own lesson progress delete" ON public.lesson_progress FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.quiz_results (
  user_id uuid NOT NULL,
  module_id text NOT NULL,
  best_score integer NOT NULL DEFAULT 0,
  total integer NOT NULL DEFAULT 0,
  attempts integer NOT NULL DEFAULT 1,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, module_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quiz_results TO authenticated;
GRANT ALL ON public.quiz_results TO service_role;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own quiz select" ON public.quiz_results FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own quiz insert" ON public.quiz_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own quiz update" ON public.quiz_results FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own quiz delete" ON public.quiz_results FOR DELETE TO authenticated USING (auth.uid() = user_id);