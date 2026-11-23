import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { lessonKey } from "@/content";
import { findSubcategory, resolveLessons } from "@/content/categories";
import { useCompletedLessons } from "@/hooks/use-progress";
import { contentQuery, useSiteContent } from "@/lib/content-query";

export const Route = createFileRoute("/categorias/$subcategoriaId")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(contentQuery);
    const found = findSubcategory(params.subcategoriaId);
    if (!found) throw notFound();
    return { title: found.sub.title, category: found.category.title, description: found.sub.description };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.title} — ${loaderData.category} | IMPÉRIO DIGITAL`
      : "Categoria indisponível — IMPÉRIO DIGITAL";
    const description = loaderData?.description ?? "Categoria do IMPÉRIO DIGITAL.";
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
  component: SubcategoryPage,
});

function SubcategoryPage() {
  const { subcategoriaId } = Route.useParams();
  const { modules } = useSiteContent();
  const { data: completed } = useCompletedLessons();
  const found = findSubcategory(subcategoriaId);
  if (!found) return null;
  const { category, sub } = found;
  const lessons = resolveLessons(sub, modules);

  return (
    <>
      <PageHero
        eyebrow={category.title}
        title={<span className="text-gold">{sub.title}</span>}
        description={sub.description}
      >
        <Link to="/cursos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Todas as categorias
        </Link>
      </PageHero>
      <section className="mx-auto max-w-4xl px-5 pt-10">
        {lessons.length === 0 ? (
          <div className="rounded-2xl border border-primary/30 bg-accent p-8 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-primary" strokeWidth={1.4} />
            <p className="mt-4 text-2xl font-semibold">Conteúdo em preparação</p>
            <p className="mt-2 text-sm text-muted-foreground">
              As aulas desta subcategoria estão sendo preparadas. Enquanto isso, explore as outras
              categorias.
            </p>
          </div>
        ) : (
          <>
            <p className="eyebrow mb-4">{lessons.length} aulas</p>
            <ol className="space-y-3">
              {lessons.map(({ module, lesson }) => {
                const isDone = completed?.has(lessonKey(module.id, lesson.id)) ?? false;
                return (
                  <li key={`${module.id}/${lesson.id}`}>
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
                          Módulo {module.number} · {module.title}
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
          </>
        )}
      </section>
    </>
  );
}
