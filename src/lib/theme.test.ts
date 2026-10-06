import { describe, expect, it } from "vitest";
import { nextThemePreference, parseThemePreference, resolveTheme, themeBootstrap, THEME_STORAGE_KEY } from "./theme";

describe("theme preference", () => {
  it("defaults missing or invalid saved preferences to system", () => {
    for (const value of [null, "", "sepia", "DARK"]) expect(parseThemePreference(value)).toBe("system");
    for (const value of ["system", "light", "dark"]) expect(parseThemePreference(value)).toBe(value);
  });

  it("follows the system only when no explicit override is selected", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("cycles through all modes and back to system", () => {
    expect(nextThemePreference("system")).toBe("light");
    expect(nextThemePreference("light")).toBe("dark");
    expect(nextThemePreference("dark")).toBe("system");
  });

  it.each([
    [null, true, "system", "dark"],
    ["invalid", false, "system", "light"],
    ["light", true, "light", "light"],
    ["dark", false, "dark", "dark"],
    ["system", true, "system", "dark"],
  ])("initializes before hydration for stored %s", (saved, systemDark, preference, theme) => {
    const dataset: Record<string, string> = {};
    const run = new Function("document", "localStorage", "matchMedia", themeBootstrap);
    run(
      { documentElement: { dataset } },
      { getItem: (key: string) => { expect(key).toBe(THEME_STORAGE_KEY); return saved; } },
      () => ({ matches: systemDark }),
    );
    expect(dataset).toEqual({ themePreference: preference, theme });
  });

  it("uses the system and reports unavailable storage explicitly", () => {
    const dataset: Record<string, string> = {};
    const warnings: unknown[] = [];
    const run = new Function("document", "localStorage", "matchMedia", "console", themeBootstrap);
    run(
      { documentElement: { dataset } },
      { getItem: () => { throw new Error("Storage unavailable"); } },
      () => ({ matches: true }),
      { warn: (...args: unknown[]) => warnings.push(args) },
    );
    expect(dataset).toEqual({ themePreference: "system", theme: "dark", themeStorageError: "true" });
    expect(warnings).toHaveLength(1);
  });
});
