import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LoginPrompt } from "@/components/site/login-prompt";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getModule } from "@/content";
import { useAuth } from "@/hooks/use-auth";
import { useSaveQuiz } from "@/hooks/use-progress";
import { contentQuery, useSiteContent } from "@/lib/content-query";
import { isPassing, PASSING_PERCENT, scoreQuiz } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cursos/$moduloId/quiz")({
  loader: async ({ context, params }) => {
    const content = await context.queryClient.ensureQueryData(contentQuery);
    const module = getModule(content.modules, params.moduloId);
    if (!module) throw notFound();
    return { title: module.title };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `Questionário: ${loaderData.title} — IMPÉRIO DIGITAL`
      : "Questionário indisponível — IMPÉRIO DIGITAL";
    const description = "Teste seus conhecimentos e veja a explicação de cada resposta.";
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
  component: QuizPage,
});

function QuizPage() {
  const { moduloId } = Route.useParams();
  const { modules } = useSiteContent();
  const module = getModule(modules, moduloId);
  const { user } = useAuth();
  const save = useSaveQuiz();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const savedRef = useRef(false);

  const questions = module?.quiz ?? [];
  const result = scoreQuiz(questions, answers);

  useEffect(() => {
    if (finished && user && module && !savedRef.current) {
      savedRef.current = true;
      save.mutate({ moduleId: module.id, score: result.correct, total: result.total });
    }
  }, [finished, user, module, result.correct, result.total, save]);

  if (!module) return null;
  const q = questions[index];

  function choose(option: number) {
    if (revealed) return;
    const nextAnswers = [...answers];
    nextAnswers[index] = option;
    setAnswers(nextAnswers);
    setRevealed(true);
  }

  function advance() {
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
      setRevealed(false);
    }
  }

  function restart() {
    setIndex(0);
    setAnswers([]);
    setRevealed(false);
    setFinished(false);
    savedRef.current = false;
  }

  return (
    <div className="mx-auto max-w-2xl px-5 pt-10">
      <Link
        to="/cursos/$moduloId"
        params={{ moduloId: module.id }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Módulo {module.number}: {module.title}
      </Link>
      <p className="eyebrow mt-8">Questionário</p>
      <h1 className="mt-2 text-4xl font-semibold leading-tight">{module.title}</h1>

      {questions.length === 0 ? (
        <p className="mt-8 text-muted-foreground">Este módulo ainda não tem perguntas.</p>
      ) : finished ? (
        <div className="mt-10 animate-fade-up rounded-2xl border border-primary/30 bg-card-imperial p-8 text-center shadow-card">
          <Trophy className="mx-auto h-12 w-12 text-primary" strokeWidth={1.4} />
          <p className="mt-4 font-display text-gold text-6xl font-semibold">
            {result.correct}/{result.total}
          </p>
          <p className="mt-2 text-lg">
            {isPassing(result.correct, result.total)
              ? "Parabéns! Você concluiu este módulo."
              : `Quase lá! Você precisa de ${PASSING_PERCENT}% para concluir. Revise as aulas e tente de novo.`}
          </p>
          {user ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {save.isPending ? "Salvando nota..." : save.isError ? "Não foi possível salvar a nota." : "Nota salva no seu progresso."}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="imperial" onClick={restart}>
              <RotateCcw /> Refazer
            </Button>
            <Button asChild variant="hero">
              <Link to="/cursos">Ver outros módulos</Link>
            </Button>
          </div>
          {!user ? (
            <div className="mt-8 text-left">
              <LoginPrompt title="Guarde sua nota" body="Entre na sua conta para salvar suas notas e acompanhar sua evolução." />
            </div>
          ) : null}
        </div>
      ) : q ? (
        <div className="mt-8">
          <div className="mb-2 flex justify-between font-mono text-xs text-muted-foreground">
            <span>
              Pergunta {index + 1} de {questions.length}
            </span>
            <span>{result.correct} acertos</span>
          </div>
          <Progress value={(index / questions.length) * 100} />
          <h2 className="mt-8 text-2xl font-semibold leading-snug md:text-3xl">{q.question}</h2>
          <div className="mt-6 space-y-3">
            {q.options.map((option, i) => {
              const chosen = answers[index] === i;
              const correct = q.answer === i;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={revealed}
                  onClick={() => choose(i)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all",
                    !revealed && "border-border bg-surface hover:border-primary/60 hover:bg-surface-raised",
                    revealed && correct && "border-success bg-success/10",
                    revealed && chosen && !correct && "border-destructive bg-destructive/10",
                    revealed && !chosen && !correct && "border-border opacity-60",
                  )}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current font-mono text-xs">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {revealed && correct ? <CheckCircle2 className="h-5 w-5 text-success" /> : null}
                  {revealed && chosen && !correct ? <XCircle className="h-5 w-5 text-destructive" /> : null}
                </button>
              );
            })}
          </div>
          {revealed ? (
            <div className="mt-6 animate-fade-up rounded-xl border border-primary/30 bg-accent p-5">
              <p className="font-semibold">
                {answers[index] === q.answer ? "Resposta correta!" : "Resposta incorreta."}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/85">{q.explanation}</p>
              <Button variant="hero" className="mt-4" onClick={advance}>
                {index + 1 >= questions.length ? "Ver resultado" : "Próxima pergunta"} <ArrowRight />
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
