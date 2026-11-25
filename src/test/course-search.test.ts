import { describe, expect, it } from "vitest";
import { defaultModules } from "@/content";
import { filterCourseModules } from "@/lib/course-search";

describe("course search and category filters", () => {
  it("searches module and lesson text without removing course data", () => {
    const before = defaultModules.length;
    const matches = filterCourseModules(defaultModules, "  trafego pago ", "");
    expect(matches.length).toBeGreaterThan(0);
    expect(defaultModules).toHaveLength(before);
  });

  it("filters using existing category references without duplicating modules", () => {
    const matches = filterCourseModules(defaultModules, "", "marketing-digital");
    expect(matches.length).toBeGreaterThan(0);
    expect(new Set(matches.map((module) => module.id)).size).toBe(matches.length);
  });

  it("normalizes accents and returns no matches for unknown terms", () => {
    expect(filterCourseModules(defaultModules, "inteligencia artificial", "").map((module) => module.id))
      .toContain("inteligencia-artificial-no-marketing");
    expect(filterCourseModules(defaultModules, "termo-sem-resultados", "")).toEqual([]);
  });
});
