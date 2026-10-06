"use client";

import { useSyncExternalStore } from "react";
import { nextThemePreference, parseThemePreference, resolveTheme, THEME_STORAGE_KEY, type ThemePreference } from "@/lib/theme";

type ThemeState = { preference: ThemePreference | null; storageError: boolean };
const serverState: ThemeState = { preference: null, storageError: false };
let state = serverState;
const listeners = new Set<() => void>();

function apply(preference: ThemePreference, storageError = false) {
  const root = document.documentElement;
  root.dataset.themePreference = preference;
  root.dataset.theme = resolveTheme(preference, window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (storageError) root.dataset.themeStorageError = "true";
  else delete root.dataset.themeStorageError;
  state = { preference, storageError };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const root = document.documentElement;
  apply(parseThemePreference(root.dataset.themePreference ?? null), root.dataset.themeStorageError === "true");
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (state.preference === "system") apply("system", state.storageError);
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      apply(parseThemePreference(event.newValue));
    }
  };
  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

const labels: Record<ThemePreference, string> = { system: "System", light: "Light", dark: "Dark" };

export function ThemeControl() {
  const { preference, storageError } = useSyncExternalStore(subscribe, () => state, () => serverState);
  if (!preference) return null;
  const next = nextThemePreference(preference);

  return (
    <li>
      <button
        type="button"
        className="link-underline cursor-pointer text-left transition-colors duration-300 hover:text-theme-ink"
        aria-label={`Theme: ${labels[preference]}. Switch to ${labels[next]}.`}
        onClick={() => {
          let failed = false;
          try {
            localStorage.setItem(THEME_STORAGE_KEY, next);
          } catch (error) {
            console.warn("Theme preference could not be saved to storage.", error);
            failed = true;
          }
          apply(next, failed);
        }}
      >
        Theme: {labels[preference]}
      </button>
      <span role="status" className={storageError ? "mt-2 block max-w-56 text-theme-error" : "sr-only"}>
        {storageError
          ? "Your theme works for this visit, but could not be saved on this device."
          : `${labels[preference]} theme selected.`}
      </span>
    </li>
  );
}
