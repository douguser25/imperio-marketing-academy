import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/page-hero";
import { Input } from "@/components/ui/input";
import { contentQuery, useSiteContent } from "@/lib/content-query";

export const Route = createFileRoute("/glossario")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  head: () => ({
    meta: [
      { title: "Glossário de marketing digital — IMPÉRIO DIGITAL" },
      {
        name: "description",
        content:
          "Os principais termos de marketing digital e vendas explicados de forma simples: CTR, CPC, funil, persona, SEO, ROI e muito mais.",
      },
      { property: "og:title", content: "Glossário de marketing digital — IMPÉRIO DIGITAL" },
      {
        property: "og:description",
        content: "Termos de marketing digital e vendas explicados de forma simples.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GlossaryPage,
});

function normalize(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

function GlossaryPage() {
  const { glossary } = useSiteContent();
  const [query, setQuery] = useState("");
  const groups = useMemo(() => {
    const q = normalize(query.trim());
    const filtered = glossary.filter(
      (t) => !q || normalize(t.term).includes(q) || normalize(t.definition).includes(q),
    );
    const map = new Map<string, typeof filtered>();
    for (const t of filtered) {
      const letter = normalize(t.term).charAt(0).toUpperCase();
      map.set(letter, [...(map.get(letter) ?? []), t]);
    }
    return [...map.entries()];
  }, [glossary, query]);

  return (
    <>
      <PageHero
        eyebrow="Consulta rápida"
        title={
          <>
            Glossário de <span className="text-gold">marketing digital</span>
          </>
        }
        description={`${glossary.length} termos explicados em linguagem simples, para você nunca mais travar numa sigla.`}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar termo, ex.: CTR, persona, funil"
            className="h-12 border-input bg-surface pl-10"
            aria-label="Buscar no glossário"
          />
        </div>
      </PageHero>
      <section className="mx-auto max-w-4xl px-5 pt-12">
        {groups.length === 0 ? (
          <p className="text-muted-foreground">Nenhum termo encontrado para “{query}”.</p>
        ) : (
          <div className="space-y-12">
            {groups.map(([letter, terms]) => (
              <div key={letter} className="grid gap-4 md:grid-cols-[80px_1fr]">
                <p className="font-display text-gold text-5xl font-semibold">{letter}</p>
                <dl className="space-y-3">
                  {terms.map((t) => (
                    <div key={t.term} className="rounded-xl border border-border bg-surface p-5">
                      <dt className="text-xl font-semibold text-primary">{t.term}</dt>
                      <dd className="mt-1.5 leading-relaxed text-foreground/85">{t.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
