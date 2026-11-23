import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AreaField, Field, TextField } from "./field";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CourseModule, Lesson, ModuleIcon, QuizQuestion } from "@/content/types";
import {
  blankLesson,
  blankQuestion,
  cleanModule,
  toLines,
  toParagraphs,
  uniqueSlug,
  validateModule,
} from "@/lib/admin-helpers";

const iconOptions: { value: ModuleIcon; label: string }[] = [
  { value: "rocket", label: "Foguete" },
  { value: "cart", label: "Aperto de mão" },
  { value: "link", label: "Link" },
  { value: "share", label: "Compartilhar" },
  { value: "traffic", label: "Radar" },
  { value: "pen", label: "Caneta" },
  { value: "brain", label: "Cérebro" },
  { value: "chart", label: "Gráfico" },
  { value: "sparkles", label: "Brilho (IA)" },
];

function move<T>(arr: T[], from: number, to: number) {
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item!);
  return copy;
}

export function ModuleEditor({
  initial,
  saving,
  onSave,
  onDelete,
}: {
  initial: CourseModule;
  saving: boolean;
  onSave: (m: CourseModule) => void;
  onDelete: () => void;
}) {
  const [m, setM] = useState<CourseModule>(initial);
  const set = (patch: Partial<CourseModule>) => setM((prev) => ({ ...prev, ...patch }));
  const setLesson = (i: number, patch: Partial<Lesson>) =>
    set({ lessons: m.lessons.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) });
  const setQuestion = (i: number, patch: Partial<QuizQuestion>) =>
    set({ quiz: m.quiz.map((q, idx) => (idx === i ? { ...q, ...patch } : q)) });

  function save() {
    const cleaned = cleanModule(m);
    const problem = validateModule(cleaned);
    if (problem) {
      toast.error(problem);
      return;
    }
    onSave(cleaned);
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Título do módulo" value={m.title} onChange={(v) => set({ title: v })} />
        <Field label="Ícone">
          <select
            value={m.icon}
            onChange={(e) => set({ icon: e.target.value as ModuleIcon })}
            className="h-9 w-full rounded-md border border-input bg-surface px-3 text-sm"
          >
            {iconOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <TextField label="Frase curta" value={m.tagline} onChange={(v) => set({ tagline: v })} />
      <AreaField label="Descrição" value={m.description} onChange={(v) => set({ description: v })} />

      {/* Lessons */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Aulas ({m.lessons.length})</h3>
          <Button
            size="sm"
            variant="imperial"
            onClick={() =>
              set({
                lessons: [
                  ...m.lessons,
                  blankLesson(uniqueSlug("nova-aula", m.lessons.map((l) => l.id))),
                ],
              })
            }
          >
            <Plus /> Nova aula
          </Button>
        </div>
        <Accordion type="multiple" className="mt-4 space-y-2">
          {m.lessons.map((l, i) => (
            <AccordionItem key={l.id} value={l.id} className="rounded-xl border border-border bg-surface px-4">
              <AccordionTrigger className="text-left hover:no-underline">
                <span>
                  <span className="mr-2 font-mono text-xs text-primary">Aula {i + 1}</span>
                  {l.title || "Sem título"}
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-6">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="ghost" onClick={() => set({ lessons: move(m.lessons, i, i - 1) })}>
                    <ArrowUp /> Subir
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => set({ lessons: move(m.lessons, i, i + 1) })}>
                    <ArrowDown /> Descer
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => {
                      if (confirm(`Remover a aula "${l.title}"?`))
                        set({ lessons: m.lessons.filter((_, idx) => idx !== i) });
                    }}
                  >
                    <Trash2 /> Remover aula
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_140px]">
                  <TextField label="Título da aula" value={l.title} onChange={(v) => setLesson(i, { title: v })} />
                  <TextField label="Minutos" type="number" value={l.minutes} onChange={(v) => setLesson(i, { minutes: Number(v) })} />
                </div>
                <AreaField label="Resumo" value={l.summary} onChange={(v) => setLesson(i, { summary: v })} rows={2} />

                <div className="space-y-3">
                  <p className="text-sm font-semibold">Seções da explicação</p>
                  {l.sections.map((s, si) => (
                    <div key={si} className="space-y-3 rounded-lg border border-border p-4">
                      <TextField
                        label={`Título da seção ${si + 1}`}
                        value={s.heading}
                        onChange={(v) =>
                          setLesson(i, {
                            sections: l.sections.map((x, xi) => (xi === si ? { ...x, heading: v } : x)),
                          })
                        }
                      />
                      <AreaField
                        label="Texto"
                        hint="Deixe uma linha em branco entre parágrafos."
                        rows={6}
                        value={s.body.join("\n\n")}
                        onChange={(v) =>
                          setLesson(i, {
                            sections: l.sections.map((x, xi) => (xi === si ? { ...x, body: toParagraphs(v) } : x)),
                          })
                        }
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => setLesson(i, { sections: l.sections.filter((_, xi) => xi !== si) })}
                      >
                        <Trash2 /> Remover seção
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="imperial"
                    onClick={() => setLesson(i, { sections: [...l.sections, { heading: "", body: [""] }] })}
                  >
                    <Plus /> Nova seção
                  </Button>
                </div>

                <AreaField
                  label="Tutorial passo a passo"
                  hint="Um passo por linha."
                  rows={5}
                  value={l.steps.join("\n")}
                  onChange={(v) => setLesson(i, { steps: toLines(v) })}
                />
                <TextField
                  label="Título do exemplo prático"
                  value={l.example.title}
                  onChange={(v) => setLesson(i, { example: { ...l.example, title: v } })}
                />
                <AreaField
                  label="Exemplo prático"
                  rows={4}
                  value={l.example.body}
                  onChange={(v) => setLesson(i, { example: { ...l.example, body: v } })}
                />
                <AreaField
                  label="Pontos-chave"
                  hint="Um ponto por linha."
                  rows={3}
                  value={l.keyPoints.join("\n")}
                  onChange={(v) => setLesson(i, { keyPoints: toLines(v) })}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Quiz */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Questionário ({m.quiz.length})</h3>
          <Button size="sm" variant="imperial" onClick={() => set({ quiz: [...m.quiz, blankQuestion()] })}>
            <Plus /> Nova pergunta
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          {m.quiz.map((q, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-primary">Pergunta {i + 1}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => set({ quiz: m.quiz.filter((_, idx) => idx !== i) })}
                >
                  <Trash2 /> Remover
                </Button>
              </div>
              <TextField label="Pergunta" value={q.question} onChange={(v) => setQuestion(i, { question: v })} />
              <AreaField
                label="Alternativas"
                hint="Uma alternativa por linha."
                rows={4}
                value={q.options.join("\n")}
                onChange={(v) => setQuestion(i, { options: toLines(v) })}
              />
              <Field label="Alternativa correta">
                <select
                  value={q.answer}
                  onChange={(e) => setQuestion(i, { answer: Number(e.target.value) })}
                  className="h-9 w-full rounded-md border border-input bg-surface px-3 text-sm"
                >
                  {q.options.map((o, oi) => (
                    <option key={oi} value={oi}>
                      {String.fromCharCode(65 + oi)}) {o || "(vazia)"}
                    </option>
                  ))}
                </select>
              </Field>
              <AreaField label="Explicação da resposta" rows={2} value={q.explanation} onChange={(v) => setQuestion(i, { explanation: v })} />
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-4 z-10 flex flex-wrap justify-between gap-3 rounded-xl border border-border bg-surface-raised/95 p-3 backdrop-blur">
        <Button
          variant="ghost"
          className="text-destructive"
          onClick={() => {
            if (confirm(`Excluir o módulo "${m.title}" inteiro? Isso só vale depois de publicar.`)) onDelete();
          }}
        >
          <Trash2 /> Excluir módulo
        </Button>
        <Button variant="hero" onClick={save} disabled={saving}>
          <Save /> {saving ? "Salvando..." : "Salvar rascunho"}
        </Button>
      </div>
    </div>
  );
}
