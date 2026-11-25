import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { CategoryMenu } from "@/components/site/category-menu";
import { ModuleBadge } from "@/components/site/module-icon";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { courseStats } from "@/content";
import { categories } from "@/content/categories";
import { useAuth } from "@/hooks/use-auth";
import { useCompletedLessons, useQuizResults } from "@/hooks/use-progress";
import { contentQuery, useSiteContent } from "@/lib/content-query";
import { filterCourseModules } from "@/lib/course-search";
import { moduleProgress } from "@/lib/progress";

export const Route = createFileRoute("/cursos/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  head: () => ({
    meta: [
      { title: "Cursos e módulos — IMPÉRIO DIGITAL" },
      {
        name: "description",
        content:
          "Todos os módulos do IMPÉRIO DIGITAL: introdução ao marketing digital, vendas online, afiliados, redes sociais, tráfego, conteúdo, psicologia, gestão e inteligência artificial.",
      },
      { property: "og:title", content: "Cursos e módulos — IMPÉRIO DIGITAL" },
      {
        property: "og:description",
        content: "A trilha completa para aprender marketing digital e vendas do zero.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { modules } = useSiteContent();
  const { user } = useAuth();
  const { data: completed } = useCompletedLessons();
  const { data: quiz } = useQuizResults();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const stats = courseStats(modules);
  const visibleModules = useMemo(
    () => filterCourseModules(modules, query, categoryId),
    [modules, query, categoryId],
  );

  return (
    <>
      <PageHero
        eyebrow="Cursos"
        title={
          <>
            Explore por <span className="text-gold">categoria</span>
          </>
        }
        description={`${stats.totalLessons} aulas e ${stats.totalQuestions} questões. Toque na seta de uma categoria para ver os temas e abrir as aulas.`}
      />
      <section className="mx-auto max-w-4xl px-5 pt-10">
        <CategoryMenu modules={modules} />
      </section>
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <p className="eyebrow">Trilha completa</p>
        <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Todos os {modules.length} módulos em ordem</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_16rem]">
          <label className="relative block">
            <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar módulos e aulas"
              aria-label="Buscar módulos e aulas"
              className="h-11 bg-surface pl-10"
            />
          </label>
          <label>
            <span className="sr-only">Filtrar por categoria</span>
            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.currentTarget.value)}
              className="h-11 w-full rounded-md border border-input bg-surface px-3 text-sm text-foreground"
            >
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
          {visibleModules.length} de {modules.length} módulos
        </p>
        {visibleModules.length ? (
          <div className="mt-4 space-y-4">
            {visibleModules.map((m, i) => {
              const p = moduleProgress(m, completed ?? new Set());
              const minutes = m.lessons.reduce((s, l) => s + (Number(l.minutes) || 0), 0);
              const q = quiz?.get(m.id);
              return (
                <Link
                  key={m.id}
                  to="/cursos/$moduloId"
                  params={{ moduloId: m.id }}
                  className="group block animate-fade-up rounded-2xl border border-border bg-card-imperial p-6 shadow-card transition-all hover:border-primary/50 md:p-8"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center">
                    <ModuleBadge name={m.icon} number={m.number} />
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold md:text-3xl">{m.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        <span>{m.lessons.length} aulas</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {minutes} min</span>
                        {q ? <span className="flex items-center gap-1 text-primary"><CheckCircle2 className="h-3.5 w-3.5" /> Quiz {q.best_score}/{q.total}</span> : null}
                      </div>
                    </div>
                    <div className="md:w-48">
                      {user ? (
                        <>
                          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                            <span>Progresso</span><span className="text-primary">{p.percent}%</span>
                          </div>
                          <Progress value={p.percent} />
                        </>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-primary">Abrir módulo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-8 rounded-xl border border-border bg-surface p-6 text-muted-foreground">
            Nenhum módulo encontrado. Tente outro termo ou categoria.
          </p>
        )}
      </section>
    </>
  );
}
