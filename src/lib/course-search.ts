import { categories, resolveLessons } from "@/content/categories";
import type { CourseModule } from "@/content/types";

/** Filter existing course modules by text and existing category references. */
export function filterCourseModules(
  modules: CourseModule[],
  query: string,
  categoryId: string,
): CourseModule[] {
  const normalizedQuery = normalize(query.trim());
  const selectedCategory = categories.find((category) => category.id === categoryId);
  const categoryModuleIds = selectedCategory
    ? new Set(
        selectedCategory.subcategories.flatMap((subcategory) =>
          resolveLessons(subcategory, modules).map(({ module }) => module.id),
        ),
      )
    : null;

  return modules.filter((module) => {
    if (categoryModuleIds && !categoryModuleIds.has(module.id)) return false;
    if (!normalizedQuery) return true;
    const searchable = [
      module.title,
      module.tagline,
      module.description,
      ...module.lessons.flatMap((lesson) => [lesson.title, lesson.summary]),
    ];
    return searchable.some((value) => normalize(value).includes(normalizedQuery));
  });
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}
