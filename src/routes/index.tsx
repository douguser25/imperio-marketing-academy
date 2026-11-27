import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  GraduationCap,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Gift,
  TrendingUp,
} from "lucide-react";
import heroImage from "@/assets/hero-imperio.webp";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/site/hero-scene";
import { trackGlow, useReveal } from "@/hooks/use-reveal";
import { ModuleBadge } from "@/components/site/module-icon";
import { courseStats } from "@/content";
import { useAuth } from "@/hooks/use-auth";
import { useSiteContent } from "@/lib/content-query";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IMPÉRIO DIGITAL — Aprenda marketing digital e vendas do zero" },
      {
        name: "description",
        content:
          "Plataforma educacional gratuita com 9 módulos, aulas completas, tutoriais, questionários e glossário de marketing digital e vendas para iniciantes.",
      },
      { property: "og:title", content: "IMPÉRIO DIGITAL — Aprenda marketing digital do zero" },
      {
        property: "og:description",
        content:
          "9 módulos com aulas, exemplos práticos e questionários para aprender vendas e marketing digital desde o início.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: BookOpenCheck,
    title: "Aulas completas",
    body: "Explicações claras, do conceito à prática, escritas para quem nunca estudou o assunto.",
  },
  {
    icon: ListChecks,
    title: "Tutoriais passo a passo",
    body: "Cada aula traz um exercício guiado para você aplicar o que aprendeu na hora.",
  },
  {
    icon: ClipboardCheck,
    title: "Questionários",
    body: "Teste seus conhecimentos ao fim de cada módulo e veja a explicação de cada resposta.",
  },
  {
    icon: TrendingUp,
    title: "Acompanhe seu progresso",
    body: "Marque as aulas concluídas e veja sua evolução em qualquer aparelho.",
  },
];

const highlights = [
  { icon: Gift, title: "100% gratuito", body: "Estude sem pagar nada" },
  { icon: BookOpenCheck, title: "Passo a passo", body: "Do zero ao avançado" },
  { icon: ClipboardCheck, title: "Questionários", body: "Teste o que aprendeu" },
  { icon: Smartphone, title: "Em qualquer lugar", body: "Celular ou computador" },
];

function Index() {
  const { user } = useAuth();
  const { modules, glossary, settings } = useSiteContent();
  const { totalLessons, totalMinutes, totalQuestions } = courseStats(modules);
  const firstModule = modules[0];
  const firstLesson = firstModule?.lessons[0];
  useReveal([modules.length]);
  const stats = [
    { value: modules.length, label: "módulos" },
    { value: totalLessons, label: "aulas" },
    { value: totalQuestions, label: "questões" },
    { value: glossary.length, label: "termos no glossário" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          width={1672}
          height={941}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-35 md:opacity-50"
        />
        <div className="absolute inset-0 -z-10 bg-fade-left" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-fade-bottom" />
        <HeroScene />
        <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-5 pb-10 pt-16 md:min-h-[82vh] md:pt-20">
          <span className="inline-flex w-fit animate-fade-up items-center gap-2 rounded-full border border-primary/40 bg-background/50 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            {settings.heroEyebrow}
          </span>
          <h1 className="mt-6 max-w-3xl animate-fade-up text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl [animation-delay:80ms]">
            {settings.heroTitle}{" "}
            <span className="text-gold animate-shimmer italic">{settings.heroHighlight}</span>
          </h1>
          <div className="gold-rule mt-6 w-24 animate-fade-up [animation-delay:120ms]" />
          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-muted-foreground md:text-lg [animation-delay:160ms]">
            {settings.heroSubtitle}
          </p>
          <div className="mt-9 grid animate-fade-up gap-3 sm:flex sm:flex-wrap [animation-delay:240ms]">
            <Button asChild variant="hero" size="xl" className="rounded-full">
              <Link to="/cursos">
                Começar a estudar <ArrowRight />
              </Link>
            </Button>
            {!user ? (
              <Button asChild variant="imperial" size="xl" className="rounded-full backdrop-blur-md">
                <Link to="/auth" search={{ redirect: undefined }}>
                  Criar conta gratuita
                </Link>
              </Button>
            ) : (
              <Button asChild variant="imperial" size="xl" className="rounded-full backdrop-blur-md">
                <Link to="/progresso">Ver meu progresso</Link>
              </Button>
            )}
          </div>
          <p className="mt-6 flex animate-fade-up items-center gap-2 text-xs text-muted-foreground [animation-delay:320ms]">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            {settings.trustLine}
          </p>

          <div className="mt-12 grid animate-fade-up grid-cols-2 gap-3 lg:grid-cols-4 [animation-delay:400ms]">
            {highlights.map((h) => (
              <div
                key={h.title}
                onPointerMove={trackGlow}
                className="card-glow flex min-w-0 flex-col items-start gap-3 overflow-hidden rounded-2xl border border-primary/25 bg-background/55 p-3 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-gold sm:flex-row sm:items-center sm:p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold text-primary-foreground shadow-gold">
                  <h.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold sm:truncate">{h.title}</p>
                  <p className="text-xs text-muted-foreground sm:truncate">{h.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-5 py-8 text-center md:py-10 ${i % 2 === 1 ? "border-l border-border" : ""} ${i >= 2 ? "border-t border-border md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            >
              <p className="font-display text-gold text-4xl font-semibold md:text-5xl">{s.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">A trilha completa</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
              {modules.length} módulos, do básico à estratégia
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Cerca de {Math.round(totalMinutes / 60)} horas de leitura organizadas na ordem ideal para
            quem está começando.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <Link
              key={m.id}
              to="/cursos/$moduloId"
              params={{ moduloId: m.id }}
              onPointerMove={trackGlow}
              className="card-glow reveal group flex flex-col overflow-hidden rounded-2xl border border-border bg-card-imperial p-6 shadow-card transition-[transform,border-color,box-shadow] duration-300 will-change-transform hover:-translate-y-1 hover:border-primary/60 hover:shadow-gold"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <ModuleBadge name={m.icon} number={m.number} />
              <h3 className="mt-5 text-2xl font-semibold leading-tight">{m.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{m.tagline}</p>
              <p className="mt-5 flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-primary">
                {m.lessons.length} aulas
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 pt-24">
        <div className="reveal rounded-3xl border border-border bg-surface p-8 md:p-12">
          <div className="max-w-xl">
            <p className="eyebrow">Como funciona</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Estude, pratique, teste e evolua</h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title}>
                <f.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="mx-auto max-w-6xl px-5 pt-24">
        <div className="reveal grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Nosso compromisso</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
              {settings.commitmentTitle}{" "}
              <span className="text-gold">{settings.commitmentHighlight}</span>
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            {settings.commitmentBody
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((p) => (
                <p key={p.slice(0, 24)} className="leading-relaxed">
                  {p}
                </p>
              ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-5 pt-24">
        <div className="reveal relative overflow-hidden rounded-3xl border border-primary/30 bg-hero p-10 text-center md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-grid" />
          <GraduationCap className="relative mx-auto h-10 w-10 animate-float text-primary" strokeWidth={1.4} />
          <h2 className="relative mt-5 text-4xl font-semibold md:text-5xl">Comece pela primeira aula</h2>
          <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
            Leva cerca de 8 minutos. Crie sua conta para salvar o progresso e continuar de qualquer
            aparelho.
          </p>
          <div className="relative mt-8 flex justify-center">
            {firstModule && firstLesson ? (
              <Button asChild variant="hero" size="xl">
                <Link
                  to="/cursos/$moduloId/aula/$aulaId"
                  params={{ moduloId: firstModule.id, aulaId: firstLesson.id }}
                >
                  Abrir a primeira aula <ArrowRight />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
