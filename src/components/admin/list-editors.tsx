import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { AreaField, TextField } from "./field";
import { Button } from "@/components/ui/button";
import type { GlossaryTerm } from "@/content/glossary";
import type { SiteSettings } from "@/content/settings";
import type { Tip } from "@/content/tips";

function SaveBar({ saving, onSave }: { saving: boolean; onSave: () => void }) {
  return (
    <div className="sticky bottom-4 z-10 flex justify-end rounded-xl border border-border bg-surface-raised/95 p-3 backdrop-blur">
      <Button variant="hero" onClick={onSave} disabled={saving}>
        <Save /> {saving ? "Salvando..." : "Salvar rascunho"}
      </Button>
    </div>
  );
}

export function GlossaryEditor({
  initial,
  saving,
  onSave,
}: {
  initial: GlossaryTerm[];
  saving: boolean;
  onSave: (terms: GlossaryTerm[]) => void;
}) {
  const [terms, setTerms] = useState(initial);
  const update = (i: number, patch: Partial<GlossaryTerm>) =>
    setTerms(terms.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  return (
    <div className="space-y-4">
      <Button variant="imperial" size="sm" onClick={() => setTerms([{ term: "", definition: "" }, ...terms])}>
        <Plus /> Novo termo
      </Button>
      {terms.map((t, i) => (
        <div key={i} className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-[220px_1fr_auto] md:items-start">
          <TextField label="Termo" value={t.term} onChange={(v) => update(i, { term: v })} />
          <AreaField label="Definição" rows={2} value={t.definition} onChange={(v) => update(i, { definition: v })} />
          <Button variant="ghost" size="icon" className="text-destructive md:mt-6" aria-label="Remover termo" onClick={() => setTerms(terms.filter((_, idx) => idx !== i))}>
            <Trash2 />
          </Button>
        </div>
      ))}
      <SaveBar
        saving={saving}
        onSave={() =>
          onSave(
            terms
              .map((t) => ({ term: t.term.trim(), definition: t.definition.trim() }))
              .filter((t) => t.term && t.definition),
          )
        }
      />
    </div>
  );
}

export function TipsEditor({
  initial,
  saving,
  onSave,
}: {
  initial: Tip[];
  saving: boolean;
  onSave: (tips: Tip[]) => void;
}) {
  const [tips, setTips] = useState(initial);
  const update = (i: number, patch: Partial<Tip>) =>
    setTips(tips.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  return (
    <div className="space-y-4">
      <Button
        variant="imperial"
        size="sm"
        onClick={() => setTips([{ title: "", body: "", category: "Começando" }, ...tips])}
      >
        <Plus /> Nova dica
      </Button>
      {tips.map((t, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-border bg-surface p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_200px_auto] md:items-end">
            <TextField label="Título" value={t.title} onChange={(v) => update(i, { title: v })} />
            <TextField label="Categoria" value={t.category} onChange={(v) => update(i, { category: v as Tip["category"] })} />
            <Button variant="ghost" size="icon" className="text-destructive" aria-label="Remover dica" onClick={() => setTips(tips.filter((_, idx) => idx !== i))}>
              <Trash2 />
            </Button>
          </div>
          <AreaField label="Texto" rows={2} value={t.body} onChange={(v) => update(i, { body: v })} />
        </div>
      ))}
      <SaveBar
        saving={saving}
        onSave={() =>
          onSave(
            tips
              .map((t) => ({ title: t.title.trim(), body: t.body.trim(), category: (t.category.trim() || "Começando") as Tip["category"] }))
              .filter((t) => t.title && t.body),
          )
        }
      />
    </div>
  );
}

const settingsFields: { key: keyof SiteSettings; label: string; long?: boolean }[] = [
  { key: "heroEyebrow", label: "Página inicial — texto acima do título" },
  { key: "heroTitle", label: "Página inicial — título" },
  { key: "heroHighlight", label: "Página inicial — parte dourada do título" },
  { key: "heroSubtitle", label: "Página inicial — subtítulo", long: true },
  { key: "trustLine", label: "Página inicial — frase de compromisso abaixo dos botões" },
  { key: "commitmentTitle", label: "Seção compromisso — título" },
  { key: "commitmentHighlight", label: "Seção compromisso — parte dourada" },
  { key: "commitmentBody", label: "Seção compromisso — texto (linha em branco separa parágrafos)", long: true },
  { key: "footerAbout", label: "Rodapé — descrição", long: true },
];

export function SettingsEditor({
  initial,
  saving,
  onSave,
}: {
  initial: SiteSettings;
  saving: boolean;
  onSave: (s: SiteSettings) => void;
}) {
  const [s, setS] = useState(initial);
  return (
    <div className="space-y-4">
      {settingsFields.map((f) =>
        f.long ? (
          <AreaField key={f.key} label={f.label} rows={4} value={s[f.key]} onChange={(v) => setS({ ...s, [f.key]: v })} />
        ) : (
          <TextField key={f.key} label={f.label} value={s[f.key]} onChange={(v) => setS({ ...s, [f.key]: v })} />
        ),
      )}
      <SaveBar saving={saving} onSave={() => onSave(s)} />
    </div>
  );
}
