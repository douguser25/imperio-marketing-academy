import { introducao } from "./modules/01-introducao";
import { vendasOnline } from "./modules/02-vendas-online";
import { afiliados } from "./modules/03-afiliados";
import { redesSociais } from "./modules/04-redes-sociais";
import { trafego } from "./modules/05-trafego";
import { conteudo } from "./modules/06-conteudo";
import { psicologia } from "./modules/07-psicologia";
import { gestao } from "./modules/08-gestao";
import { inteligenciaArtificial } from "./modules/09-inteligencia-artificial";
import type { CourseModule } from "./types";

/** Built-in course content. Published edits from the owner panel are merged over it. */
export const defaultModules: CourseModule[] = [
  introducao,
  vendasOnline,
  afiliados,
  redesSociais,
  trafego,
  conteudo,
  psicologia,
  gestao,
  inteligenciaArtificial,
];

/** Stable key stored in the database for a lesson. */
export function lessonKey(moduleId: string, lessonId: string) {
  return `${moduleId}/${lessonId}`;
}

export function courseStats(modules: CourseModule[]) {
  return {
    totalLessons: modules.reduce((sum, m) => sum + m.lessons.length, 0),
    totalQuestions: modules.reduce((sum, m) => sum + m.quiz.length, 0),
    totalMinutes: modules.reduce(
      (sum, m) => sum + m.lessons.reduce((s, l) => s + (Number(l.minutes) || 0), 0),
      0,
    ),
  };
}

export function getModule(modules: CourseModule[], moduleId: string) {
  return modules.find((m) => m.id === moduleId);
}

export function getLessonContext(modules: CourseModule[], moduleId: string, lessonId: string) {
  const sequence = modules.flatMap((module) => module.lessons.map((lesson) => ({ module, lesson })));
  const index = sequence.findIndex((r) => r.module.id === moduleId && r.lesson.id === lessonId);
  if (index === -1) return undefined;
  const current = sequence[index]!;
  return {
    module: current.module,
    lesson: current.lesson,
    position: current.module.lessons.findIndex((l) => l.id === lessonId) + 1,
    prev: sequence[index - 1],
    next: sequence[index + 1],
  };
}
