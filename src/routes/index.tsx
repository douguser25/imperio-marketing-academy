import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BookOpenCheck,
  ChartNoAxesCombined,
  ClipboardCheck,
  GraduationCap,
  ListChecks,
  Megaphone,
  MousePointer2,
  Play,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import heroImage from "@/assets/hero-imperio.jpg";
import { Button } from "@/components/ui/button";
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

const orbitItems = [
  { icon: Play, label: "Conteúdo" },
  { icon: ChartNoAxesCombined, label: "Estratégia" },
  { icon: Megaphone, label: "Alcance" },
  { icon: ShoppingCart, label: "Vendas" },
];

function CrownArtwork() {
  return (
    <svg
      className="imperial-crown__art"
      viewBox="0 0 360 270"
      role="img"
      aria-label="Coroa dourada tridimensional do Império Marketing Academy"
    >
      <defs>
        <linearGradient id="imperial-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary-glow)" />
          <stop offset=".28" stopColor="var(--primary)" />
          <stop offset=".53" stopColor="color-mix(in oklch, var(--primary) 52%, #fff)" />
          <stop offset=".78" stopColor="var(--primary-deep)" />
          <stop offset="1" stopColor="var(--primary-glow)" />
        </linearGradient>
        <linearGradient id="imperial-crown-face" x1="0" y1="0" x2=".9" y2="1">
          <stop offset="0" stopColor="color-mix(in oklch, var(--primary-glow) 76%, #fff)" />
          <stop offset=".32" stopColor="var(--primary)" />
          <stop offset=".7" stopColor="var(--primary-deep)" />
          <stop offset="1" stopColor="color-mix(in oklch, var(--primary) 68%, #17110a)" />
        </linearGradient>
        <radialGradient id="imperial-gem">
          <stop offset="0" stopColor="#fff4cf" />
          <stop offset=".42" stopColor="var(--primary-glow)" />
          <stop offset="1" stopColor="var(--primary-deep)" />
        </radialGradient>
        <filter id="imperial-crown-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <ellipse cx="180" cy="226" rx="115" ry="17" fill="var(--primary)" opacity=".15" filter="url(#imperial-crown-glow)" />
      <path d="M61 91 103 148 126 44 179 126 229 43 257 147 300 88 277 199 84 199Z" fill="url(#imperial-crown-face)" stroke="url(#imperial-gold)" strokeWidth="7" strokeLinejoin="round" />
      <path d="m61 91 42 57 23-104 53 82 50-83 28 104 43-59-23 108H84Z" fill="none" stroke="color-mix(in oklch, var(--primary-glow) 82%, #fff)" strokeWidth="3" strokeLinejoin="round" opacity=".85" />
      <path d="M91 174 114 154l24 30 42-46 41 46 25-31 21 21-7 32H99Z" fill="color-mix(in oklch, var(--primary-deep) 46%, #17110a)" opacity=".72" />
      <path d="M84 199h193l-13 30H97Z" fill="url(#imperial-gold)" stroke="var(--primary-glow)" strokeWidth="4" />
      <path d="M97 216h168" stroke="#fff2bd" strokeWidth="3" opacity=".8" />
      <path d="M61 91 46 78m57 70-18-33m41-71-7-25m60 107V91m50-48 8-24m20 128 20-37m23-22 17-13" fill="none" stroke="url(#imperial-gold)" strokeWidth="8" strokeLinecap="round" />
      <g fill="url(#imperial-gem)" stroke="#fff1bd" strokeWidth="2">
        <path d="m180 147 15 15-15 18-15-18Z" />
        <path d="m126 166 9 9-9 11-9-11Z" />
        <path d="m234 166 9 9-9 11-9-11Z" />
        <circle cx="103" cy="148" r="6" /><circle cx="126" cy="44" r="6" />
        <circle cx="179" cy="126" r="7" /><circle cx="229" cy="43" r="6" />
        <circle cx="257" cy="147" r="6" /><circle cx="300" cy="88" r="6" />
      </g>
      <g fill="#fff7de" opacity=".9" filter="url(#imperial-crown-glow)">
        <circle cx="76" cy="126" r="3" /><circle cx="283" cy="135" r="3" />
        <circle cx="180" cy="208" r="3" /><circle cx="155" cy="60" r="2.5" />
      </g>
    </svg>
  );
}

function Index() {
  const { user } = useAuth();
  const { modules, glossary, settings } = useSiteContent();
  const { totalLessons, totalMinutes, totalQuestions } = courseStats(modules);
  const firstModule = modules[0];
  const firstLesson = firstModule?.lessons[0];
  const stats = [
    { value: modules.length, label: "módulos" },
    { value: totalLessons, label: "aulas" },
    { value: totalQuestions, label: "questões" },
    { value: glossary.length, label: "termos no glossário" },
  ];

  function tiltCrown(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const stage = event.currentTarget;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty("--crown-tilt-x", `${-y * 10}deg`);
    stage.style.setProperty("--crown-tilt-y", `${x * 14}deg`);
  }

  function resetCrownTilt(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--crown-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--crown-tilt-y", "0deg");
  }

  return (
    <>
      <style>{`
        .imperial-home {
          --home-gold: var(--primary);
          --home-glow: var(--primary-glow);
          --home-ink: var(--background);
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background: var(--background);
        }
        .imperial-home__hero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, .94fr) minmax(0, 1.06fr);
          align-items: center;
          gap: clamp(1rem, 3vw, 4rem);
          width: min(100% - 3rem, 88rem);
          min-height: min(790px, calc(100svh - 4rem));
          margin-inline: auto;
          padding-block: clamp(3rem, 7vh, 6.5rem) 4.5rem;
        }
        .imperial-home__backdrop {
          position: absolute;
          z-index: -3;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 70% center;
          opacity: .31;
          filter: saturate(.72) contrast(1.12);
          mask-image: linear-gradient(90deg, transparent 0%, #000 45%, #000 100%);
        }
        .imperial-home__wash {
          position: absolute;
          z-index: -2;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 74% 44%, color-mix(in oklch, var(--home-gold) 19%, transparent), transparent 38%),
            radial-gradient(ellipse at 50% 110%, color-mix(in oklch, var(--home-glow) 12%, transparent), transparent 50%),
            linear-gradient(90deg, var(--background) 0%, color-mix(in oklch, var(--background) 94%, transparent) 38%, color-mix(in oklch, var(--background) 45%, transparent) 100%),
            linear-gradient(180deg, var(--background) 0%, transparent 25%, transparent 78%, var(--background) 100%);
        }
        .imperial-home__stars {
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          opacity: .56;
          background-image: radial-gradient(circle, var(--home-glow) 1px, transparent 1.6px), radial-gradient(circle, var(--home-gold) 1px, transparent 1.5px);
          background-position: 11px 18px, 72px 94px;
          background-size: 137px 131px, 211px 197px;
          mask-image: radial-gradient(ellipse at 73% 45%, #000 0%, transparent 65%);
          animation: imperial-star-drift 22s linear infinite;
        }
        .imperial-home__copy { position: relative; z-index: 2; max-width: 39rem; }
        .imperial-home__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .65rem;
          border: 1px solid color-mix(in oklch, var(--home-gold) 60%, transparent);
          border-radius: 999px;
          padding: .62rem 1rem;
          color: var(--home-glow);
          background: color-mix(in oklch, var(--background) 55%, transparent);
          box-shadow: 0 0 24px color-mix(in oklch, var(--home-gold) 15%, transparent), inset 0 1px 0 #ffffff17;
          font: 600 .72rem/1.1 var(--font-mono);
          letter-spacing: .13em;
          text-transform: uppercase;
          backdrop-filter: blur(12px);
        }
        .imperial-home__eyebrow::before { content: ""; width: .43rem; height: .43rem; border-radius: 50%; background: var(--home-glow); box-shadow: 0 0 12px var(--home-gold); }
        .imperial-home__title {
          margin-top: 1.5rem;
          max-width: 11ch;
          color: var(--foreground);
          font: 700 clamp(3.35rem, 7.1vw, 7.25rem)/.84 var(--font-display);
          letter-spacing: -.055em;
          text-transform: uppercase;
          text-shadow: 0 5px 32px #0009;
        }
        .imperial-home__title span {
          display: block;
          margin-top: .2em;
          color: transparent;
          background: linear-gradient(105deg, var(--primary-deep) 5%, var(--home-glow) 37%, color-mix(in oklch, var(--home-gold) 54%, #fff) 54%, var(--home-glow) 73%, var(--primary-deep) 100%);
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          filter: drop-shadow(0 0 18px color-mix(in oklch, var(--home-gold) 21%, transparent));
          animation: imperial-metal-sheen 8s linear infinite;
        }
        .imperial-home__subtitle { max-width: 34rem; margin-top: 1.5rem; color: var(--muted-foreground); font-size: clamp(.98rem, 1.2vw, 1.14rem); line-height: 1.75; }
        .imperial-home__actions { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem; }
        .imperial-home__actions > a { transition: transform .25s ease, filter .25s ease, box-shadow .25s ease; }
        .imperial-home__actions > a:hover { transform: translateY(-3px); filter: brightness(1.08); }
        .imperial-home__trust { display: flex; align-items: center; gap: .55rem; margin-top: 1.35rem; color: var(--muted-foreground); font-size: .75rem; line-height: 1.5; }
        .imperial-home__trust svg { flex: 0 0 auto; color: var(--home-glow); }
        .imperial-home__stage {
          position: relative;
          display: grid;
          min-height: clamp(350px, 42vw, 590px);
          place-items: center;
          perspective: 1100px;
          touch-action: pan-y;
          --crown-tilt-x: 0deg;
          --crown-tilt-y: 0deg;
        }
        .imperial-home__halo {
          position: absolute;
          width: min(92%, 34rem);
          aspect-ratio: 1;
          border-radius: 50%;
          border: 1px solid color-mix(in oklch, var(--home-gold) 29%, transparent);
          box-shadow: 0 0 75px color-mix(in oklch, var(--home-gold) 15%, transparent), inset 0 0 70px color-mix(in oklch, var(--home-gold) 9%, transparent);
          transform: rotateX(68deg) rotateZ(-14deg);
          animation: imperial-halo-turn 28s linear infinite;
        }
        .imperial-home__halo::before, .imperial-home__halo::after { content: ""; position: absolute; inset: 12%; border: 1px solid color-mix(in oklch, var(--home-glow) 24%, transparent); border-radius: 50%; transform: rotateY(42deg); }
        .imperial-home__halo::after { inset: 24%; transform: rotateY(-46deg) rotateZ(25deg); }
        .imperial-crown__shadow {
          position: absolute;
          width: 46%; height: 13%; bottom: 17%;
          border-radius: 50%;
          background: color-mix(in oklch, var(--home-gold) 42%, transparent);
          filter: blur(32px);
          animation: imperial-shadow-pulse 7s ease-in-out infinite;
        }
        .imperial-crown__tilt {
          position: relative;
          display: grid;
          width: min(83%, 27rem);
          aspect-ratio: 1.12;
          place-items: center;
          transform: rotateX(var(--crown-tilt-x)) rotateY(var(--crown-tilt-y));
          transform-style: preserve-3d;
          transition: transform .55s cubic-bezier(.2,.8,.2,1);
          animation: imperial-crown-float 7s ease-in-out infinite;
          will-change: transform;
        }
        .imperial-crown__spin {
          position: relative;
          display: grid;
          width: 100%;
          height: 100%;
          place-items: center;
          transform-style: preserve-3d;
          animation: imperial-crown-rotation 26s cubic-bezier(.45,.05,.55,.95) infinite;
          filter: drop-shadow(0 24px 20px #0008) drop-shadow(0 0 23px color-mix(in oklch, var(--home-gold) 36%, transparent));
        }
        .imperial-crown__spin::before {
          content: ""; position: absolute; inset: 12%; border-radius: 50%;
          background: radial-gradient(ellipse, color-mix(in oklch, var(--home-glow) 28%, transparent), transparent 66%);
          filter: blur(14px); transform: translateZ(-36px);
        }
        .imperial-crown__art { width: 100%; height: 100%; overflow: visible; transform: translateZ(30px); }
        .imperial-home__orbit {
          position: absolute;
          display: grid;
          width: clamp(3.2rem, 6vw, 4.7rem);
          aspect-ratio: 1;
          place-items: center;
          border: 1px solid color-mix(in oklch, var(--home-gold) 45%, transparent);
          border-radius: 1.1rem;
          color: var(--home-glow);
          background: linear-gradient(145deg, color-mix(in oklch, var(--surface) 88%, transparent), color-mix(in oklch, var(--background) 72%, transparent));
          box-shadow: 0 12px 30px #0007, inset 0 1px #ffffff18, 0 0 25px color-mix(in oklch, var(--home-gold) 12%, transparent);
          backdrop-filter: blur(14px);
          animation: imperial-orbit-float 6s ease-in-out infinite;
        }
        .imperial-home__orbit svg { width: 40%; height: 40%; filter: drop-shadow(0 0 8px color-mix(in oklch, var(--home-gold) 48%, transparent)); }
        .imperial-home__orbit--one { top: 17%; left: 8%; transform: rotate(-12deg); }
        .imperial-home__orbit--two { top: 13%; right: 9%; animation-delay: -1.7s; transform: rotate(9deg); }
        .imperial-home__orbit--three { right: 2%; bottom: 24%; animation-delay: -3.1s; transform: rotate(12deg); }
        .imperial-home__orbit--four { left: 2%; bottom: 24%; animation-delay: -4.4s; transform: rotate(-9deg); }
        .imperial-home__stage-caption {
          position: absolute; bottom: 4%; left: 50%; transform: translateX(-50%);
          width: max-content; max-width: 90%; text-align: center;
          color: var(--muted-foreground); font: 600 .62rem/1.4 var(--font-mono); letter-spacing: .24em; text-transform: uppercase;
        }
        .imperial-home__stage-caption::before { content: ""; display: block; width: 4.5rem; height: 1px; margin: 0 auto .75rem; background: linear-gradient(90deg, transparent, var(--home-gold), transparent); }
        .imperial-home__benefits {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .8rem;
          width: min(100% - 3rem, 88rem); margin: -1rem auto 3rem;
        }
        .imperial-home__benefit {
          display: flex; align-items: center; gap: .8rem; min-width: 0;
          border: 1px solid color-mix(in oklch, var(--home-gold) 21%, transparent);
          border-radius: 1rem; padding: 1rem 1.1rem;
          background: linear-gradient(130deg, color-mix(in oklch, var(--surface) 82%, transparent), color-mix(in oklch, var(--background) 72%, transparent));
          box-shadow: inset 0 1px #ffffff10, 0 15px 34px #0004;
          backdrop-filter: blur(12px);
        }
        .imperial-home__benefit-icon { display: grid; flex: 0 0 auto; width: 2.45rem; height: 2.45rem; place-items: center; border: 1px solid color-mix(in oklch, var(--home-gold) 34%, transparent); border-radius: .75rem; color: var(--home-glow); background: color-mix(in oklch, var(--home-gold) 11%, transparent); }
        .imperial-home__benefit-icon svg { width: 1.1rem; height: 1.1rem; }
        .imperial-home__benefit strong { display: block; color: var(--foreground); font-size: .78rem; font-weight: 650; }
        .imperial-home__benefit span { display: block; margin-top: .2rem; color: var(--muted-foreground); font-size: .68rem; line-height: 1.35; }
        .imperial-home__scroll { position: absolute; bottom: 1rem; left: 50%; display: grid; width: 2.6rem; height: 2.6rem; place-items: center; border: 1px solid color-mix(in oklch, var(--home-gold) 42%, transparent); border-radius: 50%; color: var(--home-glow); background: color-mix(in oklch, var(--background) 55%, transparent); box-shadow: 0 0 22px color-mix(in oklch, var(--home-gold) 19%, transparent); transform: translateX(-50%); animation: imperial-scroll-bob 2s ease-in-out infinite; }
        .imperial-home__scroll svg { width: 1.15rem; }
        @keyframes imperial-crown-rotation { 0%, 8% { transform: rotateY(0deg) rotateZ(-3deg); } 92%, 100% { transform: rotateY(360deg) rotateZ(-3deg); } }
        @keyframes imperial-crown-float { 0%, 100% { translate: 0 4px; } 50% { translate: 0 -15px; } }
        @keyframes imperial-halo-turn { to { rotate: 360deg; } }
        @keyframes imperial-orbit-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -9px; } }
        @keyframes imperial-shadow-pulse { 0%, 100% { opacity: .45; scale: .9; } 50% { opacity: .8; scale: 1.08; } }
        @keyframes imperial-star-drift { to { background-position: 148px 155px, -139px 291px; } }
        @keyframes imperial-metal-sheen { to { background-position: -220% center; } }
        @keyframes imperial-scroll-bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 5px; } }
        @media (max-width: 900px) {
          .imperial-home__hero { width: min(100% - 2.25rem, 48rem); grid-template-columns: minmax(0, 1fr) minmax(0, .92fr); gap: 0; }
          .imperial-home__title { font-size: clamp(3rem, 8vw, 5.2rem); }
          .imperial-home__stage { min-height: 390px; }
          .imperial-home__benefits { width: min(100% - 2.25rem, 48rem); }
        }
        @media (max-width: 680px) {
          .imperial-home__hero { display: flex; width: 100%; min-height: 0; flex-direction: column; gap: .25rem; padding: 1.1rem 1.15rem 4.5rem; }
          .imperial-home__backdrop { object-position: 65% center; opacity: .23; mask-image: linear-gradient(180deg, #000 0%, #000 35%, transparent 78%); }
          .imperial-home__wash { background: radial-gradient(ellipse at 50% 24%, color-mix(in oklch, var(--home-gold) 18%, transparent), transparent 37%), linear-gradient(180deg, color-mix(in oklch, var(--background) 45%, transparent), var(--background) 47%, var(--background)); }
          .imperial-home__stars { opacity: .38; mask-image: radial-gradient(ellipse at 50% 22%, #000, transparent 53%); }
          .imperial-home__stage { order: 0; width: min(100%, 28rem); min-height: 0; aspect-ratio: 1.08; margin: -.25rem auto -.3rem; }
          .imperial-home__halo { width: 88%; }
          .imperial-crown__tilt { width: 78%; }
          .imperial-home__orbit { width: clamp(3rem, 14vw, 3.8rem); border-radius: .9rem; }
          .imperial-home__orbit--one { top: 15%; left: 4%; }
          .imperial-home__orbit--two { top: 12%; right: 4%; }
          .imperial-home__orbit--three { right: 0; bottom: 20%; }
          .imperial-home__orbit--four { left: 0; bottom: 20%; }
          .imperial-home__stage-caption { bottom: 1%; font-size: .55rem; letter-spacing: .19em; }
          .imperial-home__copy { order: 1; width: 100%; max-width: 35rem; margin-inline: auto; text-align: center; }
          .imperial-home__eyebrow { padding: .55rem .85rem; font-size: .61rem; letter-spacing: .1em; }
          .imperial-home__title { max-width: 12ch; margin: 1rem auto 0; font-size: clamp(3.15rem, 13vw, 5rem); line-height: .88; }
          .imperial-home__subtitle { max-width: 30rem; margin: 1rem auto 0; font-size: .93rem; line-height: 1.65; }
          .imperial-home__actions { justify-content: center; margin-top: 1.45rem; }
          .imperial-home__actions > a { width: 100%; max-width: 22rem; }
          .imperial-home__trust { justify-content: center; margin: 1rem auto 0; max-width: 28rem; text-align: left; }
          .imperial-home__benefits { grid-template-columns: 1fr; gap: .6rem; width: calc(100% - 2.3rem); max-width: 35rem; margin: 0 auto 2.5rem; }
          .imperial-home__benefit { padding: .8rem .9rem; }
          .imperial-home__benefit strong { font-size: .77rem; }
          .imperial-home__benefit span { font-size: .67rem; }
          .imperial-home__scroll { bottom: .7rem; }
        }
        @media (max-width: 380px) {
          .imperial-home__hero { padding-inline: .9rem; }
          .imperial-home__title { font-size: 3rem; }
          .imperial-home__stage { width: 112%; margin-inline: -6%; }
          .imperial-home__actions { gap: .6rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .imperial-home__stars, .imperial-home__halo, .imperial-crown__tilt, .imperial-crown__spin,
          .imperial-crown__shadow, .imperial-home__orbit, .imperial-home__title span, .imperial-home__scroll { animation: none !important; }
          .imperial-crown__tilt { transform: none !important; }
          .imperial-home__actions > a { transition: none !important; }
        }
      `}</style>
      <div className="imperial-home">
        <section className="imperial-home__hero" aria-labelledby="home-title">
          <img src={heroImage} alt="" aria-hidden="true" className="imperial-home__backdrop" />
          <div className="imperial-home__wash" aria-hidden="true" />
          <div className="imperial-home__stars" aria-hidden="true" />

          <div className="imperial-home__copy">
            <p className="imperial-home__eyebrow animate-fade-up">{settings.heroEyebrow}</p>
            <h1 id="home-title" className="imperial-home__title animate-fade-up">
              {settings.heroTitle} <span>{settings.heroHighlight}</span>
            </h1>
            <p className="imperial-home__subtitle animate-fade-up [animation-delay:120ms]">
              {settings.heroSubtitle}
            </p>
            <div className="imperial-home__actions animate-fade-up [animation-delay:200ms]">
              <Button asChild variant="hero" size="xl">
                <Link to="/cursos">
                  Começar a estudar <ArrowRight />
                </Link>
              </Button>
              {!user ? (
                <Button asChild variant="imperial" size="xl">
                  <Link to="/auth" search={{ redirect: undefined }}>Criar conta gratuita</Link>
                </Button>
              ) : (
                <Button asChild variant="imperial" size="xl">
                  <Link to="/progresso">Ver meu progresso</Link>
                </Button>
              )}
            </div>
            <p className="imperial-home__trust animate-fade-up [animation-delay:280ms]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {settings.trustLine}
            </p>
          </div>

          <div
            className="imperial-home__stage"
            aria-label="Ilustração animada da coroa imperial e elementos de marketing"
            onPointerMove={tiltCrown}
            onPointerLeave={resetCrownTilt}
          >
            <div className="imperial-home__halo" aria-hidden="true" />
            <div className="imperial-crown__shadow" aria-hidden="true" />
            {orbitItems.map(({ icon: Icon, label }, index) => (
              <div
                key={label}
                className={`imperial-home__orbit imperial-home__orbit--${["one", "two", "three", "four"][index]}`}
                aria-hidden="true"
              >
                <Icon />
              </div>
            ))}
            <div className="imperial-crown__tilt" aria-hidden="true">
              <div className="imperial-crown__spin"><CrownArtwork /></div>
            </div>
            <p className="imperial-home__stage-caption">Conhecimento que constrói seu império</p>
          </div>
          <a className="imperial-home__scroll" href="#home-content" aria-label="Explorar os cursos">
            <ArrowDown aria-hidden="true" />
          </a>
        </section>

        <div className="imperial-home__benefits" aria-label="Destaques da plataforma">
          <div className="imperial-home__benefit">
            <div className="imperial-home__benefit-icon"><MousePointer2 aria-hidden="true" /></div>
            <div><strong>Aprenda no seu ritmo</strong><span>Acesso às aulas a qualquer hora</span></div>
          </div>
          <div className="imperial-home__benefit">
            <div className="imperial-home__benefit-icon"><GraduationCap aria-hidden="true" /></div>
            <div><strong>Conhecimento aplicável</strong><span>Teoria com prática guiada</span></div>
          </div>
          <div className="imperial-home__benefit">
            <div className="imperial-home__benefit-icon"><ShieldCheck aria-hidden="true" /></div>
            <div><strong>Uma jornada segura</strong><span>Aprendizado sem promessas falsas</span></div>
          </div>
        </div>

        <div id="home-content" className="scroll-mt-20">
          {/* Stats */}
          <section className="border-y border-border bg-surface">
            <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-5 py-8 text-center ${i % 2 === 1 ? "border-l border-border" : ""} ${i >= 2 ? "border-t border-border md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
                >
                  <p className="font-display text-gold text-5xl font-semibold">{s.value}</p>
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
                  className="group flex animate-fade-up flex-col rounded-2xl border border-border bg-card-imperial p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/50"
                  style={{ animationDelay: `${i * 60}ms` }}
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
            <div className="rounded-3xl border border-border bg-surface p-8 md:p-12">
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
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="eyebrow">Nosso compromisso</p>
                <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
                  {settings.commitmentTitle} <span className="text-gold">{settings.commitmentHighlight}</span>
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                {settings.commitmentBody
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((p) => (
                    <p key={p.slice(0, 24)} className="leading-relaxed">{p}</p>
                  ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mx-auto max-w-6xl px-5 pt-24">
            <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-hero p-10 text-center md:p-16">
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
        </div>
      </div>
    </>
  );
}
