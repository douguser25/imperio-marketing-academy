/** Per-user look of the site: theme plus main and highlight colors (Configurações). */

export type Theme = "dark" | "light";

export interface Preferences {
  theme: Theme;
  primary_color: string;
  accent_color: string;
}

interface Swatch {
  id: string;
  label: string;
  dark: string[];
  light: string[];
}

/** Main color: [primary, deep shade] for each theme. */
export const primaryPalettes: Swatch[] = [
  { id: "dourado", label: "Dourado imperial", dark: ["oklch(0.8 0.125 82)", "oklch(0.7 0.12 70)"], light: ["oklch(0.6 0.12 75)", "oklch(0.5 0.11 65)"] },
  { id: "bronze", label: "Bronze", dark: ["oklch(0.72 0.12 55)", "oklch(0.62 0.12 45)"], light: ["oklch(0.55 0.12 50)", "oklch(0.45 0.11 40)"] },
  { id: "esmeralda", label: "Esmeralda", dark: ["oklch(0.75 0.13 160)", "oklch(0.62 0.12 165)"], light: ["oklch(0.52 0.12 160)", "oklch(0.42 0.11 165)"] },
  { id: "safira", label: "Safira", dark: ["oklch(0.72 0.13 250)", "oklch(0.6 0.14 255)"], light: ["oklch(0.5 0.15 255)", "oklch(0.42 0.14 258)"] },
  { id: "rubi", label: "Rubi", dark: ["oklch(0.7 0.17 18)", "oklch(0.58 0.17 15)"], light: ["oklch(0.52 0.17 20)", "oklch(0.44 0.16 18)"] },
  { id: "ametista", label: "Ametista", dark: ["oklch(0.72 0.13 300)", "oklch(0.6 0.14 300)"], light: ["oklch(0.5 0.15 300)", "oklch(0.42 0.14 300)"] },
  { id: "prata", label: "Prata", dark: ["oklch(0.82 0.012 250)", "oklch(0.68 0.012 250)"], light: ["oklch(0.48 0.015 250)", "oklch(0.38 0.015 250)"] },
];

/** Highlight color: the bright tone of gradients, titles and hover states. */
export const accentPalettes: Swatch[] = [
  { id: "champanhe", label: "Champanhe", dark: ["oklch(0.88 0.11 92)"], light: ["oklch(0.68 0.12 85)"] },
  { id: "marfim", label: "Marfim", dark: ["oklch(0.94 0.03 90)"], light: ["oklch(0.62 0.05 80)"] },
  { id: "ambar", label: "Âmbar", dark: ["oklch(0.82 0.15 65)"], light: ["oklch(0.64 0.15 60)"] },
  { id: "rose", label: "Rosé", dark: ["oklch(0.85 0.08 20)"], light: ["oklch(0.62 0.12 20)"] },
  { id: "turquesa", label: "Turquesa", dark: ["oklch(0.86 0.1 190)"], light: ["oklch(0.58 0.1 195)"] },
  { id: "lavanda", label: "Lavanda", dark: ["oklch(0.84 0.08 290)"], light: ["oklch(0.58 0.12 290)"] },
];

export const defaultPreferences: Preferences = {
  theme: "dark",
  primary_color: "dourado",
  accent_color: "champanhe",
};

const CACHE_KEY = "imperio-prefs";

function pick(list: Swatch[], id: string) {
  return list.find((s) => s.id === id) ?? list[0]!;
}

/** CSS variables for a set of preferences. Unknown color ids fall back to the gold defaults. */
export function themeVars(prefs: Preferences): Record<string, string> {
  const theme: Theme = prefs.theme === "light" ? "light" : "dark";
  const [primary, deep] = pick(primaryPalettes, prefs.primary_color)[theme];
  const [glow] = pick(accentPalettes, prefs.accent_color)[theme];
  return { "--primary": primary!, "--primary-deep": deep!, "--primary-glow": glow! };
}

/** Browser only: applies the preferences to the page and remembers them for the next visit. */
export function applyPreferences(prefs: Preferences) {
  const root = document.documentElement;
  const theme: Theme = prefs.theme === "light" ? "light" : "dark";
  const vars = themeVars(prefs);
  root.classList.remove("dark", "light");
  root.classList.add(theme);
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ theme, vars }));
  } catch {
    // storage unavailable (private mode): the look still applies for this visit
  }
}

/** Browser only: back to the standard black-and-gold look (after signing out). */
export function resetPreferences() {
  const root = document.documentElement;
  root.classList.remove("light");
  root.classList.add("dark");
  for (const k of Object.keys(themeVars(defaultPreferences))) root.style.removeProperty(k);
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
}

/** Inline script for <head>: re-applies the remembered look before the first paint. */
export const preferencesBootScript = `(function(){try{var p=JSON.parse(localStorage.getItem("${CACHE_KEY}")||"null");if(!p)return;var d=document.documentElement;d.classList.remove("dark","light");d.classList.add(p.theme==="light"?"light":"dark");for(var k in p.vars){d.style.setProperty(k,p.vars[k])}}catch(e){}})();`;
