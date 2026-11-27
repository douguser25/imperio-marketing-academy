import { memo, useEffect, useRef } from "react";
import { BookOpen, Crown, Play, TrendingUp } from "lucide-react";

// Deterministic particle layout so server and browser render the same markup.
const PARTICLES = Array.from({ length: 26 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    size: 2 + Math.round(r(2) * 3),
    duration: 9 + r(3) * 10,
    delay: -r(4) * 18,
    drift: `${Math.round((r(5) - 0.5) * 120)}px`,
  };
});

/** Animated crown, glowing rings, floating icons and gold particles. Pure CSS motion + light pointer parallax. */
export const HeroScene = memo(function HeroScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--px", `${(x * 24).toFixed(1)}px`);
        el.style.setProperty("--py", `${(y * 18).toFixed(1)}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="scene-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              ["--drift" as string]: p.drift,
            }}
          />
        ))}
      </div>

      {/* Crown stage */}
      <div
        className="absolute right-[-30%] top-[6%] h-[420px] w-[420px] opacity-45 transition-transform duration-300 ease-out sm:right-[-12%] md:right-[2%] md:top-[12%] md:h-[520px] md:w-[520px] md:opacity-100"
        style={{ transform: "translate3d(var(--px,0), var(--py,0), 0)", perspective: "900px" }}
      >
        <div
          className="scene-anim absolute inset-[18%] rounded-full bg-primary/30 blur-3xl"
          style={{ animation: "glow-pulse 6s ease-in-out infinite" }}
        />
        <div className="scene-ring h-[92%] w-[92%]" />
        <div className="scene-ring h-[72%] w-[72%] opacity-70" style={{ animationName: "ring-spin-rev", animationDuration: "24s" }} />
        <div className="scene-ring h-[52%] w-[52%] opacity-50" style={{ animationDuration: "12s" }} />

        <div className="scene-anim absolute inset-0 grid place-items-center" style={{ animation: "crown-float 7s ease-in-out infinite" }}>
          <Crown
            className="h-36 w-36 text-primary drop-shadow-[0_0_28px_var(--primary)] md:h-44 md:w-44"
            strokeWidth={1.1}
          />
        </div>

        {[
          { Icon: Play, cls: "left-[4%] top-[18%]", rot: "-10deg", d: "0s" },
          { Icon: TrendingUp, cls: "right-[2%] top-[8%]", rot: "8deg", d: "-2s" },
          { Icon: BookOpen, cls: "left-[10%] bottom-[16%]", rot: "-6deg", d: "-4s" },
        ].map(({ Icon, cls, rot, d }) => (
          <div
            key={cls}
            className={`scene-anim absolute ${cls} grid h-14 w-14 place-items-center rounded-2xl border border-primary/40 bg-background/70 shadow-gold backdrop-blur-md md:h-16 md:w-16`}
            style={{ animation: `orbit-item 6s ease-in-out ${d} infinite`, ["--rot" as string]: rot }}
          >
            <Icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
          </div>
        ))}
      </div>
    </div>
  );
});
