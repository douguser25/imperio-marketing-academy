import { defaultModules } from "@/content";
import { glossary as defaultGlossary, type GlossaryTerm } from "@/content/glossary";
import { defaultSettings, type SiteSettings } from "@/content/settings";
import { tips as defaultTips, type Tip } from "@/content/tips";
import type { CourseModule } from "@/content/types";

export type ContentKind = "module" | "glossary" | "tips" | "settings";

export interface ContentRow {
  kind: string;
  slug: string;
  position: number;
  data: unknown;
}

export interface SiteContent {
  modules: CourseModule[];
  glossary: GlossaryTerm[];
  tips: Tip[];
  settings: SiteSettings;
}

function isDeleted(data: unknown) {
  return typeof data === "object" && data !== null && (data as { deleted?: boolean }).deleted === true;
}

/**
 * Applies content rows (published, then drafts for the owner preview) on top of the built-in
 * course. A module row replaces the module with the same id, adds a new one, or removes it
 * when its data is { deleted: true }.
 */
export function mergeContent(...layers: ContentRow[][]): SiteContent {
  const byId = new Map<string, { position: number; module: CourseModule }>();
  defaultModules.forEach((m, i) => byId.set(m.id, { position: i + 1, module: m }));
  let glossary = defaultGlossary;
  let tips = defaultTips;
  let settings = defaultSettings;

  for (const rows of layers) {
    for (const row of rows) {
      if (row.kind === "module") {
        if (isDeleted(row.data)) byId.delete(row.slug);
        else byId.set(row.slug, { position: row.position, module: row.data as CourseModule });
      } else if (row.kind === "glossary" && Array.isArray(row.data)) {
        glossary = row.data as GlossaryTerm[];
      } else if (row.kind === "tips" && Array.isArray(row.data)) {
        tips = row.data as Tip[];
      } else if (row.kind === "settings" && row.data && typeof row.data === "object") {
        settings = { ...defaultSettings, ...(row.data as Partial<SiteSettings>) };
      }
    }
  }

  const modules = [...byId.values()]
    .sort((a, b) => a.position - b.position)
    .map((entry, i) => ({ ...entry.module, number: i + 1 }));

  return {
    modules,
    glossary: [...glossary].sort((a, b) => a.term.localeCompare(b.term, "pt-BR")),
    tips,
    settings,
  };
}
