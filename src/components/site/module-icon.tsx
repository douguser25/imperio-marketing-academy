import {
  BarChart3,
  Brain,
  Handshake,
  Link2,
  PenTool,
  Radar,
  Rocket,
  Share2,
  Sparkles,
  type LucideProps,
} from "lucide-react";
import type { ModuleIcon as IconName } from "@/content/types";

const icons = {
  rocket: Rocket,
  cart: Handshake,
  link: Link2,
  share: Share2,
  traffic: Radar,
  pen: PenTool,
  brain: Brain,
  chart: BarChart3,
  sparkles: Sparkles,
} satisfies Record<IconName, unknown>;

export function ModuleIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon {...props} />;
}

export function ModuleBadge({ name, number }: { name: IconName; number: number }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-accent text-primary">
      <ModuleIcon name={name} className="h-5 w-5" />
      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 font-mono text-[10px] font-bold text-primary-foreground">
        {number}
      </span>
    </div>
  );
}
