import type { CourseModule, Lesson, QuizQuestion } from "@/content/types";

export function slugify(text: string) {
  return (
    text
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "item"
  );
}

export function uniqueSlug(base: string, taken: string[]) {
  const slug = slugify(base);
  if (!taken.includes(slug)) return slug;
  let i = 2;
  while (taken.includes(`${slug}-${i}`)) i++;
  return `${slug}-${i}`;
}

export const toLines = (text: string) => text.split("\n");
export const toParagraphs = (text: string) => text.split(/\n\n/);

const clean = (arr: string[]) => arr.map((s) => s.trim()).filter(Boolean);

/** Trims text and drops empty lines/paragraphs before saving. */
export function cleanModule(m: CourseModule): CourseModule {
  return {
    ...m,
    title: m.title.trim(),
    tagline: m.tagline.trim(),
    description: m.description.trim(),
    lessons: m.lessons.map(
      (l): Lesson => ({
        ...l,
        title: l.title.trim(),
        minutes: Math.max(1, Math.round(Number(l.minutes) || 1)),
        summary: l.summary.trim(),
        sections: l.sections
          .map((s) => ({ heading: s.heading.trim(), body: clean(s.body) }))
          .filter((s) => s.heading || s.body.length),
        steps: clean(l.steps),
        example: { title: l.example.title.trim(), body: l.example.body.trim() },
        keyPoints: clean(l.keyPoints),
      }),
    ),
    quiz: m.quiz.map((q): QuizQuestion => {
      const options = clean(q.options);
      return {
        question: q.question.trim(),
        options,
        answer: Math.min(Math.max(0, q.answer), Math.max(0, options.length - 1)),
        explanation: q.explanation.trim(),
      };
    }),
  };
}

export function validateModule(m: CourseModule): string | null {
  if (!m.title.trim()) return "O módulo precisa de um título.";
  for (const [i, l] of m.lessons.entries()) {
    if (!l.title.trim()) return `A aula ${i + 1} precisa de um título.`;
  }
  for (const [i, q] of m.quiz.entries()) {
    if (!q.question.trim()) return `A pergunta ${i + 1} está vazia.`;
    if (q.options.filter((o) => o.trim()).length < 2)
      return `A pergunta ${i + 1} precisa de pelo menos 2 alternativas.`;
  }
  return null;
}

export function blankLesson(id: string): Lesson {
  return {
    id,
    title: "Nova aula",
    minutes: 8,
    summary: "",
    sections: [{ heading: "", body: [""] }],
    steps: [],
    example: { title: "Exemplo prático", body: "" },
    keyPoints: [],
  };
}

export function blankQuestion(): QuizQuestion {
  return { question: "", options: ["", "", "", ""], answer: 0, explanation: "" };
}

export function blankModule(id: string, number: number): CourseModule {
  return {
    id,
    number,
    title: "Novo módulo",
    tagline: "",
    description: "",
    icon: "rocket",
    lessons: [],
    quiz: [],
  };
}
