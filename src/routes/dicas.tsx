import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { cn } from "@/lib/utils";
import { contentQuery, useSiteContent } from "@/lib/content-query";

export const Route = createFileRoute("/dicas")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  head: () => ({
    meta: [
      { title: "Dicas e estratégias — IMPÉRIO DIGITAL" },
      {
        name: "description",
        content:
          "Dicas práticas de marketing digital, redes sociais, vendas, criação de conteúdo, gestão e ética para quem está começando.",
      },
      { property: "og:title", content: "Dicas e estratégias — IMPÉRIO DIGITAL" },
      {
        property: "og:description",
        content: "Dicas práticas para aplicar marketing digital com consistência e ética.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TipsPage,
});

function TipsPage() {
  const { tips } = useSiteContent();
  const categories = [...new Set(tips.map((t) => t.category))];
  const [active, setActive] = useState<string>("Todas");
  const visible = active === "Todas" ? tips : tips.filter((t) => t.category === active);

  return (
    <>
      <PageHero
        eyebrow="Aplicação prática"
        title={
          <>
            Dicas e <span className="text-gold">estratégias</span>
          </>
        }
        description="Conselhos curtos e diretos para colocar em prática hoje mesmo."
      />
      <section className="mx-auto max-w-6xl px-5 pt-10">
        <div className="flex flex-wrap gap-2" role="tablist">
          {["Todas", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                active === c
                  ? "border-primary bg-gold text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t, i) => (
            <div
              key={t.title}
              className="animate-fade-up rounded-2xl border border-border bg-card-imperial p-6 shadow-card"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center justify-between">
                <Lightbulb className="h-5 w-5 text-primary" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t.category}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold leading-tight">{t.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
