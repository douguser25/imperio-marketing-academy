import type { CourseModule, QuizQuestion } from "@/content/types";
import { lessonKey } from "@/content";

/** Minimum share of correct answers (in %) to pass a module quiz. */
export const PASSING_PERCENT = 70;

export interface ProgressSummary {
  done: number;
  total: number;
  percent: number;
}

function toPercent(done: number, total: number) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

export function moduleProgress(module: CourseModule, completed: Set<string>): ProgressSummary {
  const total = module.lessons.length;
  const done = module.lessons.filter((l) => completed.has(lessonKey(module.id, l.id))).length;
  return { done, total, percent: toPercent(done, total) };
}

export function overallProgress(all: CourseModule[], completed: Set<string>): ProgressSummary {
  let done = 0;
  let total = 0;
  for (const m of all) {
    const p = moduleProgress(m, completed);
    done += p.done;
    total += p.total;
  }
  return { done, total, percent: toPercent(done, total) };
}

export function scoreQuiz(questions: QuizQuestion[], answers: (number | null)[]) {
  const correct = questions.filter((q, i) => answers[i] === q.answer).length;
  const total = questions.length;
  return { correct, total, percent: toPercent(correct, total) };
}

export function isPassing(correct: number, total: number) {
  return total > 0 && (correct / total) * 100 >= PASSING_PERCENT;
}

/** The first lesson not yet completed, in course order. */
export function nextLesson(all: CourseModule[], completed: Set<string>) {
  for (const module of all) {
    for (const lesson of module.lessons) {
      if (!completed.has(lessonKey(module.id, lesson.id))) return { module, lesson };
    }
  }
  return undefined;
}
