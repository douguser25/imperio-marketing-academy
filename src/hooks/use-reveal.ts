import { useEffect } from "react";

/** Fades in every `.reveal` element once as it scrolls into view (one shared observer). */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not([data-visible='true'])"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => (el.dataset["visible"] = "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset["visible"] = "true";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Pointer-follow spotlight for `.card-glow` elements, without React re-renders. */
export function trackGlow(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}
