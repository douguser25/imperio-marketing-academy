export type ModuleIcon =
  | "rocket"
  | "cart"
  | "link"
  | "share"
  | "traffic"
  | "pen"
  | "brain"
  | "chart"
  | "sparkles";

export interface LessonSection {
  heading: string;
  body: string[];
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  summary: string;
  sections: LessonSection[];
  steps: string[];
  example: { title: string; body: string };
  keyPoints: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  tagline: string;
  description: string;
  icon: ModuleIcon;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}
