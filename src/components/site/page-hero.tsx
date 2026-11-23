import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-hero">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-20">
        <p className="eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl animate-fade-up text-4xl font-semibold leading-[1.05] md:text-6xl [animation-delay:80ms]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-muted-foreground md:text-lg [animation-delay:160ms]">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8 animate-fade-up [animation-delay:240ms]">{children}</div> : null}
      </div>
    </section>
  );
}
