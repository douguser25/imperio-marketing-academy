import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Menu, UserRound } from "lucide-react";
import { useState } from "react";
import { CategoryMenu } from "./category-menu";
import { Logo } from "./logo";
import { useSiteContent } from "@/lib/content-query";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { displayName, useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const nav = [
  { to: "/", label: "Início" },
  { to: "/cursos", label: "Cursos" },
  { to: "/dicas", label: "Dicas" },
  { to: "/glossario", label: "Glossário" },
  { to: "/progresso", label: "Meu progresso" },
] as const;

export function SiteHeader() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { modules } = useSiteContent();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    setOpen(false);
    navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" aria-label="IMPÉRIO DIGITAL — início">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {loading ? null : user ? (
            <>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserRound className="h-4 w-4 text-primary" />
                {displayName(user)}
              </span>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut /> Sair
              </Button>
            </>
          ) : (
            <Button asChild variant="hero" size="sm">
              <Link to="/auth" search={{ redirect: undefined }}>
                Entrar
              </Link>
            </Button>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="imperial" size="icon" className="lg:hidden" aria-label="Abrir menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto border-border bg-surface pb-10">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1 px-4">
              {nav.filter((item) => item.to !== "/cursos").map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  className="rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 px-4">
              <p className="eyebrow mb-3">Categorias</p>
              <CategoryMenu modules={modules} compact onNavigate={() => setOpen(false)} />
              <Link
                to="/cursos"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-lg px-3 py-2 text-sm text-primary hover:bg-accent"
              >
                Ver todos os módulos →
              </Link>
            </div>
            <div className="mt-6 border-t border-border px-4 pt-6">
              {user ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Olá, <span className="text-foreground">{displayName(user)}</span>
                  </p>
                  <Button variant="imperial" className="w-full" onClick={signOut}>
                    <LogOut /> Sair
                  </Button>
                </div>
              ) : (
                <Button asChild variant="hero" className="w-full">
                  <Link to="/auth" search={{ redirect: undefined }} onClick={() => setOpen(false)}>
                    Entrar ou criar conta
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
