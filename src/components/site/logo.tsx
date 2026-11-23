import { Crown } from "lucide-react";

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-primary-foreground shadow-gold">
        <Crown className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-[0.08em] text-foreground">
          IMPÉRIO
        </span>
        <span className="font-mono text-[9px] tracking-[0.42em] text-primary">DIGITAL</span>
      </span>
    </span>
  );
}
