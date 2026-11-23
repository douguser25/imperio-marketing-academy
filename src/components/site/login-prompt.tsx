import { Link, useLocation } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoginPrompt({ title, body }: { title: string; body: string }) {
  const location = useLocation();
  return (
    <div className="rounded-2xl border border-primary/30 bg-accent p-6">
      <div className="flex items-start gap-3">
        <Lock className="mt-1 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          <Button asChild variant="hero" size="sm" className="mt-4">
            <Link to="/auth" search={{ redirect: location.href }}>
              Entrar ou criar conta
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
