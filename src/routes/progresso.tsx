import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, CheckCircle2, ClipboardCheck } from "lucide-react";
import { LoginPrompt } from "@/components/site/login-prompt";
import { ModuleBadge } from "@/components/site/module-icon";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { displayName, useAuth } from "@/hooks/use-auth";
import { useCompletedLessons, useQuizResults } from "@/hooks/use-progress";
import { contentQuery, useSiteContent } from "@/lib/content-query";
import { isPassing, moduleProgress, nextLesson, overallProgress } from "@/lib/progress";

export const Route = createFileRoute("/progresso")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  head: () => ({
    meta: [
      { title: "Meu progresso — IMPÉRIO DIGITAL" },
      { name: "description", content: "Acompanhe as aulas concluídas e as notas dos questionários." },
      { property: "og:title", content: "Meu progresso — IMPÉRIO DIGITAL" },
      { property: "og:description", content: "Acompanhe sua evolução no IMPÉRIO DIGITAL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { user, loading } = useAuth();
  const { modules } = useSiteContent();
  const { data: completed } = useCompletedLessons();
  const { data: quiz } = useQuizResults();
  const done = completed ?? new Set<string>();
  const overall = overallProgress(modules, done);
  const upNext = nextLesson(modules, done);
  const passed = modules.filter((m) => {
    const q = quiz?.get(m.id);
    return q && isPassing(q.best_score, q.total);
  }).length;

  return (
    <>
      <PageHero
        eyebrow="Área do aluno"
        title={
          user ? (
            <>
              Olá, <span className="text-gold">{displayName(user)}</span>
            </>
          ) : (
            <>
              Meu <span className="text-gold">progresso</span>
            </>
          )
        }
        description="Veja o quanto você já avançou e continue de onde parou."
      />
      <section className="mx-auto max-w-5xl px-5 pt-10">
        {loading ? null : !user ? (
          <LoginPrompt
            title="Entre para ver seu progresso"
            body="Crie uma conta gratuita para salvar as aulas concluídas e as notas dos questionários."
          />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card-imperial p-6 shadow-card">
                <p className="eyebrow">Curso completo</p>
                <p className="mt-3 font-display text-gold text-6xl font-semibold">{overall.percent}%</p>
                <Progress value={overall.percent} className="mt-4" />
              </div>
              <div className="rounded-2xl border border-border bg-card-imperial p-6 shadow-card">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <p className="mt-3 text-4xl font-semibold">
                  {overall.done}
                  <span className="text-xl text-muted-foreground">/{overall.total}</span>
                </p>
                <p className="text-sm text-muted-foreground">aulas concluídas</p>
              </div>
              <div className="rounded-2xl border border-border bg-card-imperial p-6 shadow-card">
                <Award className="h-6 w-6 text-primary" />
                <p className="mt-3 text-4xl font-semibold">
                  {passed}
                  <span className="text-xl text-muted-foreground">/{modules.length}</span>
                </p>
                <p className="text-sm text-muted-foreground">questionários aprovados</p>
              </div>
            </div>

            {upNext ? (
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-primary/30 bg-accent p-6 md:flex-row md:items-center">
                <div className="flex-1">
                  <p className="eyebrow">Continue de onde parou</p>
                  <p className="mt-2 text-2xl font-semibold">{upNext.lesson.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Módulo {upNext.module.number}: {upNext.module.title}
                  </p>
                </div>
                <Button asChild variant="hero">
                  <Link
                    to="/cursos/$moduloId/aula/$aulaId"
                    params={{ moduloId: upNext.module.id, aulaId: upNext.lesson.id }}
                  >
                    Continuar <ArrowRight />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-primary/30 bg-accent p-6">
                <p className="text-2xl font-semibold">Você concluiu todas as aulas! 🎉</p>
              </div>
            )}

            <h2 className="mt-12 text-3xl font-semibold">Por módulo</h2>
            <div className="mt-5 space-y-3">
              {modules.map((m) => {
                const p = moduleProgress(m, done);
                const q = quiz?.get(m.id);
                return (
                  <Link
                    key={m.id}
                    to="/cursos/$moduloId"
                    params={{ moduloId: m.id }}
                    className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/50 sm:flex-row sm:items-center"
                  >
                    <ModuleBadge name={m.icon} number={m.number} />
                    <div className="flex-1">
                      <p className="font-semibold">{m.title}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <Progress value={p.percent} className="flex-1" />
                        <span className="w-10 text-right font-mono text-xs text-primary">{p.percent}%</span>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground sm:w-36 sm:justify-end">
                      <ClipboardCheck className="h-4 w-4 text-primary" />
                      {q ? `Quiz ${q.best_score}/${q.total}` : "Quiz pendente"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}
