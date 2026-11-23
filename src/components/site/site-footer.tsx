import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Logo } from "./logo";
import { useSiteContent } from "@/lib/content-query";

export function SiteFooter() {
  const { settings } = useSiteContent();
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {settings.footerAbout}
          </p>
          <p className="flex max-w-sm items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Não vendemos produtos e não prometemos ganhos financeiros. Os resultados de cada pessoa
            dependem de estudo, prática e contexto.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Aprender</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/cursos" className="hover:text-foreground">Todos os módulos</Link></li>
            <li><Link to="/progresso" className="hover:text-foreground">Meu progresso</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Consultar</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/glossario" className="hover:text-foreground">Glossário</Link></li>
            <li><Link to="/dicas" className="hover:text-foreground">Dicas e estratégias</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center font-mono text-[11px] tracking-widest text-muted-foreground">
        © {new Date().getFullYear()} IMPÉRIO DIGITAL · CONTEÚDO EDUCACIONAL
      </div>
    </footer>
  );
}
