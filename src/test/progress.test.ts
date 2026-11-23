import { describe, expect, it } from "vitest";
import { modules, lessonKey, totalLessons } from "@/content";
import { isPassing, moduleProgress, nextLesson, overallProgress, scoreQuiz } from "@/lib/progress";

describe("course content", () => {
  it("has the 8 modules from the brief", () => {
    expect(modules).toHaveLength(8);
  });

  it("has unique lesson keys", () => {
    const keys = modules.flatMap((m) => m.lessons.map((l) => lessonKey(m.id, l.id)));
    expect(new Set(keys).size).toBe(totalLessons);
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
