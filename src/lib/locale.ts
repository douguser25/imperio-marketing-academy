export type SupportedLocale = "pt-BR" | "en";

/** Keep account language values constrained to the locales the UI supports. */
export function normalizeLocale(value: unknown): SupportedLocale {
  return value === "en" || value === "en-US" || value === "en-GB" ? "en" : "pt-BR";
}

export function htmlLocale(value: unknown): "pt-BR" | "en" {
  return normalizeLocale(value);
}
