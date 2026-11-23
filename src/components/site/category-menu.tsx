import { Link } from "@tanstack/react-router";
import { Briefcase, ChevronDown, ChevronRight, Cpu, Megaphone, Share2 } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { categories, resolveLessons, type Category } from "@/content/categories";
import type { CourseModule } from "@/content/types";
import { cn } from "@/lib/utils";

const icons = { megaphone: Megaphone, share: Share2, briefcase: Briefcase, cpu: Cpu } satisfies Record<
  Category["icon"],
  unknown
>;

export function CategoryMenu({
  modules,
  compact = false,
  onNavigate,
}: {
  modules: CourseModule[];
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className={cn("space-y-2", compact && "space-y-1")}>
      {categories.map((category) => {
        const Icon = icons[category.icon];
        const isOpen = !!open[category.id];
        return (
          <Collapsible
            key={category.id}
            open={isOpen}
            onOpenChange={(v) => setOpen((prev) => ({ ...prev, [category.id]: v }))}
            className={cn(
              "overflow-hidden rounded-xl border transition-colors",
              isOpen ? "border-primary/50 bg-accent" : "border-border bg-surface",
              compact && "rounded-lg",
            )}
          >
            <CollapsibleTrigger
              className={cn(
                "flex w-full items-center gap-3 text-left transition-colors hover:bg-surface-raised/60",
                compact ? "px-3 py-3" : "px-4 py-4 md:px-5",
              )}
            >
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-accent text-primary",
                  compact ? "h-8 w-8" : "h-10 w-10",
                )}
              >
                <Icon className={compact ? "h-4 w-4" : "h-5 w-5"} />
              </span>
              <span className="flex-1">
                <span className={cn("block font-semibold", compact ? "text-base" : "text-lg md:text-xl")}>
                  {category.title}
                </span>
                {!compact ? (
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {category.subcategories.length} subcategorias
                  </span>
                ) : null}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
              <ul className={cn("border-t border-border", compact ? "py-1" : "py-2")}>
                {category.subcategories.map((sub) => {
                  const count = resolveLessons(sub, modules).length;
                  return (
                    <li key={sub.id}>
                      <Link
                        to="/categorias/$subcategoriaId"
                        params={{ subcategoriaId: sub.id }}
                        onClick={onNavigate}
                        className={cn(
                          "group flex items-center gap-3 transition-colors hover:bg-surface-raised/60",
                          compact ? "py-2.5 pl-14 pr-3" : "py-3 pl-[4.25rem] pr-4 md:pr-5",
                        )}
                      >
                        <span className="flex-1">
                          <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                            {sub.title}
                          </span>
                          {!compact ? (
                            <span className="mt-0.5 block text-xs text-muted-foreground">{sub.description}</span>
                          ) : null}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {count ? `${count} aulas` : "em breve"}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}
