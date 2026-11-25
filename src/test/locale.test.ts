import { describe, expect, it } from "vitest";
import { htmlLocale, normalizeLocale } from "@/lib/locale";

describe("account locale preferences", () => {
  it("supports Portuguese and English and safely defaults invalid values", () => {
    expect(normalizeLocale("pt-BR")).toBe("pt-BR");
    expect(normalizeLocale("en")).toBe("en");
    expect(normalizeLocale("en-US")).toBe("en");
    expect(normalizeLocale("unexpected")).toBe("pt-BR");
    expect(normalizeLocale(null)).toBe("pt-BR");
  });

  it("uses the supported locale for the document language", () => {
    expect(htmlLocale("en")).toBe("en");
    expect(htmlLocale("pt-BR")).toBe("pt-BR");
  });
});
