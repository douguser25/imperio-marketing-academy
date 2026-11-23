import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Lightbulb,
  ListChecks,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { LoginPrompt } from "@/components/site/login-prompt";
import { Button } from "@/components/ui/button";
import { getLessonContext, lessonKey } from "@/content";
import { useAuth } from "@/hooks/use-auth";
import { useCompletedLessons, useToggleLesson } from "@/hooks/use-progress";
import { contentQuery, useSiteContent } from "@/lib/content-query";

export const Route = createFileRoute("/cursos/$moduloId/aula/$aulaId")({
  loader: async ({ context, params }) => {
    const content = await context.queryClient.ensureQueryData(contentQuery);
    const ctx = getLessonContext(content.modules, params.moduloId, params.aulaId);
    if (!ctx) throw notFound();
    return { title: ctx.lesson.title, summary: ctx.lesson.summary, module: ctx.module.title };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.title} — ${loaderData.module} | IMPÉRIO DIGITAL`
      : "Aula indisponível — IMPÉRIO DIGITAL";
    const description = loaderData?.summary ?? "Aula do IMPÉRIO DIGITAL.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: LessonPage,
});

function LessonPage() {
  const { moduloId, aulaId } = Route.useParams();
  const { modules } = useSiteContent();
  const ctx = getLessonContext(modules, moduloId, aulaId);
  const { user } = useAuth();
  const { data: completed } = useCompletedLessons();
  const toggle = useToggleLesson();
  if (!ctx) return null;
  const { module, lesson, position, prev, next } = ctx;
  const key = lessonKey(module.id, lesson.id);
  const isDone = completed?.has(key) ?? false;

  function handleToggle() {
    toggle.mutate(
      { lessonKey: key, moduleId: module.id, completed: !isDone },
      {
        onSuccess: () => toast.success(isDone ? "Aula desmarcada." : "Aula concluída! Continue assim."),
        onError: (e) => toast.error(e.message),
      },
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-5 pt-10">
      <Link
        to="/cursos/$moduloId"
        params={{ moduloId: module.id }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Módulo {module.number}: {module.title}
      </Link>

      <header className="mt-8 animate-fade-up">
        <p className="eyebrow">
          Aula {position} de {module.lessons.length}
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.1] md:text-5xl">{lesson.title}</h1>
        <p className="mt-4 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> {lesson.minutes} min de leitura
        </p>
        <p className="mt-6 border-l-2 border-primary pl-5 text-lg leading-relaxed text-foreground/90">
          {lesson.summary}
        </p>
      </header>

      <div className="gold-rule my-10" />

      <div className="space-y-10">
        {lesson.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-3xl font-semibold">{section.heading}</h2>
            <div className="prose-lesson mt-4">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {lesson.steps.length > 0 ? (
        <section className="mt-12 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Tutorial passo a passo</h2>
          </div>
          <ol className="mt-6 space-y-4">
            {lesson.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold font-mono text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-relaxed text-foreground/90">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {lesson.example.body ? (
        <section className="mt-8 rounded-2xl border border-primary/30 bg-accent p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <p className="eyebrow">Exemplo prático</p>
          </div>
          <h3 className="mt-3 text-2xl font-semibold">{lesson.example.title}</h3>
          <p className="mt-3 leading-relaxed text-foreground/90">{lesson.example.body}</p>
        </section>
      ) : null}

      {lesson.keyPoints.length > 0 ? (
        <section className="mt-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Pontos-chave</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {lesson.keyPoints.map((k, i) => (
              <li key={i} className="flex gap-3 text-foreground/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {k}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-12">
        {user ? (
          <Button
            variant={isDone ? "imperial" : "hero"}
            size="xl"
            className="w-full"
            disabled={toggle.isPending}
            onClick={handleToggle}
          >
            <CheckCircle2 />
            {isDone ? "Aula concluída — desmarcar" : "Marcar aula como concluída"}
          </Button>
        ) : (
          <LoginPrompt
            title="Salve seu progresso"
            body="Entre na sua conta para marcar aulas como concluídas e continuar de qualquer aparelho."
          />
        )}
      </div>

      <nav className="mt-8 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            to="/cursos/$moduloId/aula/$aulaId"
            params={{ moduloId: prev.module.id, aulaId: prev.lesson.id }}
            className="rounded-xl border border-border p-4 transition-colors hover:border-primary/50"
          >
            <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Anterior
            </span>
            <span className="mt-1 block font-semibold">{prev.lesson.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/cursos/$moduloId/aula/$aulaId"
            params={{ moduloId: next.module.id, aulaId: next.lesson.id }}
            className="rounded-xl border border-border p-4 text-right transition-colors hover:border-primary/50"
          >
            <span className="flex items-center justify-end gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Próxima <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="mt-1 block font-semibold">{next.lesson.title}</span>
          </Link>
        ) : null}
      </nav>

      {position === module.lessons.length && module.quiz.length > 0 ? (
        <div className="mt-6 text-center">
          <Button asChild variant="imperial">
            <Link to="/cursos/$moduloId/quiz" params={{ moduloId: module.id }}>
              Fazer o questionário do módulo
            </Link>
          </Button>
        </div>
      ) : null}
    </article>
  );
}
