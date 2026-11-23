import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Plus, Rocket, ShieldAlert, Undo2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ModuleEditor } from "@/components/admin/module-editor";
import { GlossaryEditor, SettingsEditor, TipsEditor } from "@/components/admin/list-editors";
import { ModuleBadge } from "@/components/site/module-icon";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CourseModule } from "@/content/types";
import {
  useAdminContent,
  useDiscardDrafts,
  useIsOwner,
  usePublish,
  useSaveDraft,
} from "@/hooks/use-admin";
import { blankModule, uniqueSlug } from "@/lib/admin-helpers";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel do proprietário — IMPÉRIO DIGITAL" },
      { name: "description", content: "Área restrita para administrar o conteúdo do IMPÉRIO DIGITAL." },
      { property: "og:title", content: "Painel do proprietário — IMPÉRIO DIGITAL" },
      { property: "og:description", content: "Área restrita do IMPÉRIO DIGITAL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const owner = useIsOwner();

  if (owner.isLoading) {
    return <p className="mx-auto max-w-6xl px-5 py-16 text-muted-foreground">Verificando permissões...</p>;
  }
  if (!owner.data) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-primary" strokeWidth={1.4} />
        <h1 className="mt-5 text-4xl font-semibold">Acesso restrito</h1>
        <p className="mt-3 text-muted-foreground">
          Esta área é exclusiva do proprietário da plataforma. Se você é o proprietário, entre com o
          e-mail cadastrado e confirmado.
        </p>
        <Button asChild variant="hero" className="mt-6">
          <Link to="/progresso">Ir para a área do aluno</Link>
        </Button>
      </div>
    );
  }
  return <OwnerPanel />;
}

function OwnerPanel() {
  const admin = useAdminContent(true);
  const save = useSaveDraft();
  const publish = usePublish();
  const discard = useDiscardDrafts();
  const [selected, setSelected] = useState<string | null>(null);

  if (admin.isLoading || !admin.data) {
    return <p className="mx-auto max-w-6xl px-5 py-16 text-muted-foreground">Carregando conteúdo...</p>;
  }
  const { content, drafts } = admin.data;
  const modules = content.modules;
  const current = modules.find((m) => m.id === selected) ?? modules[0];
  const version = admin.dataUpdatedAt;

  function saveRows(rows: Parameters<typeof save.mutate>[0], message = "Rascunho salvo.") {
    save.mutate(rows, {
      onSuccess: () => toast.success(message),
      onError: (e) => toast.error(`Não foi possível salvar: ${e.message}`),
    });
  }

  function saveModule(m: CourseModule) {
    const position = modules.findIndex((x) => x.id === m.id) + 1;
    saveRows([{ kind: "module", slug: m.id, position, data: m }]);
  }

  function moveModule(index: number, dir: -1 | 1) {
    const other = modules[index + dir];
    const self = modules[index];
    if (!other || !self) return;
    saveRows(
      [
        { kind: "module", slug: self.id, position: index + dir + 1, data: self },
        { kind: "module", slug: other.id, position: index + 1, data: other },
      ],
      "Ordem atualizada no rascunho.",
    );
  }

  function addModule() {
    const id = uniqueSlug("novo-modulo", modules.map((m) => m.id));
    const m = blankModule(id, modules.length + 1);
    saveRows([{ kind: "module", slug: id, position: modules.length + 1, data: m }], "Módulo criado no rascunho.");
    setSelected(id);
  }

  function deleteModule(m: CourseModule) {
    saveRows([{ kind: "module", slug: m.id, position: 9999, data: { deleted: true } }], "Módulo removido do rascunho.");
    setSelected(null);
  }

  function handlePublish() {
    publish.mutate(undefined, {
      onSuccess: () => toast.success("Publicado! Os alunos já veem as alterações."),
      onError: (e) => toast.error(`Não foi possível publicar: ${e.message}`),
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Área do proprietário</p>
          <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Painel administrativo</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Edite e salve como rascunho. Nada muda para os alunos até você clicar em Publicar.
          </p>
        </div>
      </div>

      <div
        className={cn(
          "sticky top-16 z-30 mt-6 flex flex-col gap-3 rounded-2xl border p-4 backdrop-blur md:flex-row md:items-center",
          drafts.length ? "border-primary/50 bg-accent" : "border-border bg-surface/95",
        )}
      >
        <p className="flex-1 text-sm">
          {drafts.length
            ? `${drafts.length} ${drafts.length === 1 ? "alteração não publicada" : "alterações não publicadas"}`
            : "Tudo publicado. Os alunos estão vendo a versão atual."}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={!drafts.length || discard.isPending}
            onClick={() => {
              if (confirm("Descartar todas as alterações não publicadas?"))
                discard.mutate(undefined, { onSuccess: () => toast.success("Rascunhos descartados.") });
            }}
          >
            <Undo2 /> Descartar
          </Button>
          <Button variant="hero" size="sm" disabled={!drafts.length || publish.isPending} onClick={handlePublish}>
            <Rocket /> {publish.isPending ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="modules" className="mt-8">
        <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-surface p-1">
          <TabsTrigger value="modules">Módulos e aulas</TabsTrigger>
          <TabsTrigger value="glossary">Glossário</TabsTrigger>
          <TabsTrigger value="tips">Dicas</TabsTrigger>
          <TabsTrigger value="settings">Textos do site</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <aside className="space-y-2">
              {modules.map((m, i) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border p-2 transition-colors",
                    current?.id === m.id ? "border-primary/60 bg-accent" : "border-border bg-surface",
                  )}
                >
                  <button type="button" className="flex flex-1 items-center gap-3 p-1 text-left" onClick={() => setSelected(m.id)}>
                    <ModuleBadge name={m.icon} number={m.number} />
                    <span className="text-sm font-medium leading-snug">{m.title}</span>
                  </button>
                  <div className="flex flex-col">
                    <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Subir módulo" disabled={i === 0} onClick={() => moveModule(i, -1)}>
                      <ArrowUp />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Descer módulo" disabled={i === modules.length - 1} onClick={() => moveModule(i, 1)}>
                      <ArrowDown />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="imperial" className="w-full" onClick={addModule}>
                <Plus /> Novo módulo
              </Button>
            </aside>
            <div className="rounded-2xl border border-border bg-card-imperial p-5 shadow-card md:p-8">
              {current ? (
                <ModuleEditor
                  key={`${current.id}-${version}`}
                  initial={current}
                  saving={save.isPending}
                  onSave={saveModule}
                  onDelete={() => deleteModule(current)}
                />
              ) : (
                <p className="text-muted-foreground">Nenhum módulo. Crie o primeiro.</p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="glossary" className="mt-6">
          <GlossaryEditor
            key={`g-${version}`}
            initial={content.glossary}
            saving={save.isPending}
            onSave={(terms) => saveRows([{ kind: "glossary", slug: "main", position: 0, data: terms }])}
          />
        </TabsContent>

        <TabsContent value="tips" className="mt-6">
          <TipsEditor
            key={`t-${version}`}
            initial={content.tips}
            saving={save.isPending}
            onSave={(tips) => saveRows([{ kind: "tips", slug: "main", position: 0, data: tips }])}
          />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <SettingsEditor
            key={`s-${version}`}
            initial={content.settings}
            saving={save.isPending}
            onSave={(s) => saveRows([{ kind: "settings", slug: "main", position: 0, data: s }])}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
