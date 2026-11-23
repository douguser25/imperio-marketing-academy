import { introducao } from "./modules/01-introducao";
import { vendasOnline } from "./modules/02-vendas-online";
import { afiliados } from "./modules/03-afiliados";
import { redesSociais } from "./modules/04-redes-sociais";
import { trafego } from "./modules/05-trafego";
import { conteudo } from "./modules/06-conteudo";
import { psicologia } from "./modules/07-psicologia";
import { gestao } from "./modules/08-gestao";
import type { CourseModule, Lesson } from "./types";

export const modules: CourseModule[] = [
  introducao,
  vendasOnline,
  afiliados,
  redesSociais,
  trafego,
  conteudo,
  psicologia,
  gestao,
];

export const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
export const totalQuestions = modules.reduce((sum, m) => sum + m.quiz.length, 0);
export const totalMinutes = modules.reduce(
  (sum, m) => sum + m.lessons.reduce((s, l) => s + l.minutes, 0),
  0,
);

/** Stable key stored in the database for a lesson. */
export function lessonKey(moduleId: string, lessonId: string) {
  return `${moduleId}/${lessonId}`;
}

export function getModule(moduleId: string): CourseModule | undefined {
  return modules.find((m) => m.id === moduleId);
}

export interface LessonRef {
  module: CourseModule;
  lesson: Lesson;
}

/** Every lesson in course order, used for "previous / next" navigation. */
export const lessonSequence: LessonRef[] = modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ module, lesson })),
);

export function getLessonContext(moduleId: string, lessonId: string) {
  const index = lessonSequence.findIndex(
    (ref) => ref.module.id === moduleId && ref.lesson.id === lessonId,
  );
  if (index === -1) return undefined;
  const current = lessonSequence[index]!;
  return {
    module: current.module,
    lesson: current.lesson,
    position: current.module.lessons.findIndex((l) => l.id === lessonId) + 1,
    prev: lessonSequence[index - 1],
    next: lessonSequence[index + 1],
  };
}
