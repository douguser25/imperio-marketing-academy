import { describe, expect, it } from "vitest";
import { defaultModules as modules, lessonKey, courseStats } from "@/content";
import { mergeContent } from "@/lib/content-merge";
import { isPassing, moduleProgress, nextLesson, overallProgress, scoreQuiz } from "@/lib/progress";

describe("course content", () => {
  it("has the 8 modules from the brief plus the AI module", () => {
    expect(modules).toHaveLength(9);
    expect(modules[8]!.id).toBe("inteligencia-artificial-no-marketing");
  });

  it("has unique lesson keys", () => {
    const keys = modules.flatMap((m) => m.lessons.map((l) => lessonKey(m.id, l.id)));
    expect(new Set(keys).size).toBe(courseStats(modules).totalLessons);
  });

  it("every quiz answer points to an existing option", () => {
    for (const m of modules) {
      for (const q of m.quiz) {
        expect(q.options[q.answer]).toBeDefined();
      }
    }
  });
});

describe("progress", () => {
  const first = modules[0]!;

  it("counts completed lessons of a module", () => {
    const done = new Set([lessonKey(first.id, first.lessons[0]!.id)]);
    const p = moduleProgress(first, done);
    expect(p.done).toBe(1);
    expect(p.total).toBe(first.lessons.length);
  });

  it("reports 0% when nothing is completed", () => {
    expect(overallProgress(modules, new Set()).percent).toBe(0);
  });

  it("suggests the second lesson after finishing the first", () => {
    const done = new Set([lessonKey(first.id, first.lessons[0]!.id)]);
    expect(nextLesson(modules, done)?.lesson.id).toBe(first.lessons[1]!.id);
  });
});

describe("quiz", () => {
  it("passes with 70% correct and fails below", () => {
    expect(isPassing(7, 10)).toBe(true);
    expect(isPassing(3, 5)).toBe(false);
    expect(isPassing(4, 5)).toBe(true);
  });

  it("scores answers against the answer key", () => {
    const quiz = modules[0]!.quiz;
    const allRight = quiz.map((q) => q.answer);
    expect(scoreQuiz(quiz, allRight).correct).toBe(quiz.length);
    expect(scoreQuiz(quiz, quiz.map(() => null)).correct).toBe(0);
  });
});

describe("owner edits", () => {
  it("a published module edit replaces the built-in module", () => {
    const first = modules[0]!;
    const merged = mergeContent([
      { kind: "module", slug: first.id, position: 1, data: { ...first, title: "Novo título" } },
    ]);
    expect(merged.modules[0]!.title).toBe("Novo título");
    expect(merged.modules).toHaveLength(9);
  });

  it("a deleted module disappears and numbering stays sequential", () => {
    const merged = mergeContent([
      { kind: "module", slug: modules[0]!.id, position: 1, data: { deleted: true } },
    ]);
    expect(merged.modules).toHaveLength(8);
    expect(merged.modules[0]!.number).toBe(1);
  });

  it("drafts layered after published content win", () => {
    const first = modules[0]!;
    const merged = mergeContent(
      [{ kind: "module", slug: first.id, position: 1, data: { ...first, title: "Publicado" } }],
      [{ kind: "module", slug: first.id, position: 1, data: { ...first, title: "Rascunho" } }],
    );
    expect(merged.modules[0]!.title).toBe("Rascunho");
  });
});

describe("category navigation", () => {
  it("every category reference points to an existing module and lesson", async () => {
    const { categories } = await import("@/content/categories");
    for (const c of categories) {
      for (const s of c.subcategories) {
        for (const ref of s.items) {
          const m = modules.find((x) => x.id === ref.module);
          expect(m, `${s.id} → ${ref.module}`).toBeDefined();
          if (ref.lesson) expect(m!.lessons.some((l) => l.id === ref.lesson), `${s.id} → ${ref.lesson}`).toBe(true);
        }
      }
    }
  });

  it("has the 4 main categories requested", async () => {
    const { categories } = await import("@/content/categories");
    expect(categories.map((c) => c.title)).toEqual([
      "Marketing Digital",
      "Redes Sociais",
      "Empreendedorismo",
      "Tecnologia",
    ]);
  });
});
