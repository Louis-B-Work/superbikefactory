export const THEME_STORAGE_KEY = "sbf-theme";
export const themePreferences = ["system", "light", "dark"] as const;
export type ThemePreference = (typeof themePreferences)[number];

export function parseThemePreference(value: string | null): ThemePreference {
  if (value === "light" || value === "dark" || value === "system") return value;
  return "system";
}

export function resolveTheme(preference: ThemePreference, systemDark: boolean): "light" | "dark" {
  return preference === "system" ? (systemDark ? "dark" : "light") : preference;
}

export function nextThemePreference(preference: ThemePreference): ThemePreference {
  return themePreferences[(themePreferences.indexOf(preference) + 1) % themePreferences.length];
}

export const themeBootstrap = `(${function () {
  const root = document.documentElement;
  let preference = "system";
  try {
    const saved = localStorage.getItem("sbf-theme");
    if (saved === "light" || saved === "dark" || saved === "system") preference = saved;
  } catch (error) {
    console.warn("Theme preference could not be read from storage.", error);
    root.dataset.themeStorageError = "true";
  }
  root.dataset.themePreference = preference;
  root.dataset.theme = preference === "system"
    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : preference;
}.toString()})();`;
