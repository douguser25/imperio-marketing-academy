import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, ClipboardCheck, Clock } from "lucide-react";
import { ModuleBadge } from "@/components/site/module-icon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getModule, lessonKey } from "@/content";
import { useAuth } from "@/hooks/use-auth";
import { useCompletedLessons, useQuizResults } from "@/hooks/use-progress";
import { contentQuery, useSiteContent } from "@/lib/content-query";
import { moduleProgress, PASSING_PERCENT } from "@/lib/progress";

export const Route = createFileRoute("/cursos/$moduloId/")({
  loader: async ({ context, params }) => {
    const content = await context.queryClient.ensureQueryData(contentQuery);
    const module = getModule(content.modules, params.moduloId);
    if (!module) throw notFound();
    return { title: module.title, description: module.description, number: module.number };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `Módulo ${loaderData.number}: ${loaderData.title} — IMPÉRIO DIGITAL`
      : "Módulo indisponível — IMPÉRIO DIGITAL";
    const description = loaderData?.description ?? "Módulo do IMPÉRIO DIGITAL.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const { moduloId } = Route.useParams();
  const { modules } = useSiteContent();
  const module = getModule(modules, moduloId);
  const { user } = useAuth();
  const { data: completed } = useCompletedLessons();
  const { data: quiz } = useQuizResults();
  if (!module) return null;
  const done = completed ?? new Set<string>();
  const p = moduleProgress(module, done);
  const q = quiz?.get(module.id);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-hero">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto max-w-4xl px-5 py-12 md:py-16">
          <Link to="/cursos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Todos os módulos
          </Link>
          <div className="mt-8 flex items-start gap-5">
            <ModuleBadge name={module.icon} number={module.number} />
            <div>
              <p className="eyebrow">Módulo {module.number}</p>
              <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">{module.title}</h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{module.description}</p>
          {user ? (
            <div className="mt-6 max-w-sm">
              <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                <span>
                  {p.done} de {p.total} aulas concluídas
                </span>
                <span className="text-primary">{p.percent}%</span>
              </div>
              <Progress value={p.percent} />
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pt-10">
        <p className="eyebrow mb-4">Aulas</p>
        <ol className="space-y-3">
          {module.lessons.map((lesson, i) => {
            const isDone = done.has(lessonKey(module.id, lesson.id));
            return (
              <li key={lesson.id}>
                <Link
                  to="/cursos/$moduloId/aula/$aulaId"
                  params={{ moduloId: module.id, aulaId: lesson.id }}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:bg-surface-raised"
                >
                  {isDone ? (
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-success" />
                  ) : (
                    <Circle className="h-6 w-6 shrink-0 text-muted-foreground" />
                  )}
                  <div className="flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      Aula {i + 1}
                    </p>
                    <p className="mt-1 text-lg font-semibold leading-snug">{lesson.title}</p>
                  </div>
                  <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                    <Clock className="h-3.5 w-3.5" /> {lesson.minutes} min
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            );
          })}
        </ol>

        {module.quiz.length > 0 ? (
          <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-primary/30 bg-accent p-6 md:flex-row md:items-center md:p-8">
            <ClipboardCheck className="h-10 w-10 shrink-0 text-primary" strokeWidth={1.4} />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">Questionário do módulo</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {module.quiz.length} perguntas. Acerte pelo menos {PASSING_PERCENT}% para concluir o
                módulo.
                {q ? ` Sua melhor nota: ${q.best_score}/${q.total}.` : ""}
              </p>
            </div>
            <Button asChild variant="hero">
              <Link to="/cursos/$moduloId/quiz" params={{ moduloId: module.id }}>
                {q ? "Refazer questionário" : "Fazer questionário"}
              </Link>
            </Button>
          </div>
        ) : null}
      </section>
    </>
  );
}
