import { describe, expect, it } from "vitest";
import { safeInternalRedirect } from "@/lib/auth-redirect";

describe("safe internal login redirects", () => {
  it("keeps ordinary relative application paths and query strings", () => {
    expect(safeInternalRedirect("/progresso?tab=cursos#recentes")).toBe("/progresso?tab=cursos#recentes");
    expect(safeInternalRedirect("/cursos/modulo/aula/1")).toBe("/cursos/modulo/aula/1");
  });

  it("rejects external, protocol-relative, backslash, and control-character URLs", () => {
    expect(safeInternalRedirect("https://attacker.example/path")).toBeUndefined();
    expect(safeInternalRedirect("//attacker.example/path")).toBeUndefined();
    expect(safeInternalRedirect("/\\attacker.example/path")).toBeUndefined();
    expect(safeInternalRedirect("/path\nheader")).toBeUndefined();
    expect(safeInternalRedirect(null)).toBeUndefined();
  });
});
