import { THEMES, Theme } from "../types";

export const STORAGE_KEY_THEME = "theme";

export const setTheme = (
  window: Window,
  toRemove: Theme,
  toSet: Theme,
  { key = STORAGE_KEY_THEME } = {}
): void => {
  const root = window.document.documentElement;

  root.classList.remove(toRemove);
  root.classList.add(toSet);

  window.localStorage.setItem(key, toSet);
};

export const getTheme = ({ key = STORAGE_KEY_THEME } = {}): Theme => {
  if (typeof window !== "undefined") {
    const storedTheme = getStoredTheme(window, { key });

    if (storedTheme) return storedTheme;

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

    if (userMedia.matches) {
      return "dark";
    }
  }

  // Default
  return "light";
};

export const getStoredTheme = (
  window: Window,
  { key = STORAGE_KEY_THEME } = {}
): Theme | undefined => {
  const theme = window.localStorage.getItem(key);

  if (theme && THEMES.includes(theme as any)) {
    return theme as Theme;
  }

  return undefined;
};

export const getNextThemeIdx = (currentThemeIdx: number): number =>
  currentThemeIdx + 1 in THEMES ? currentThemeIdx + 1 : 0;

export const getThemeIdx = (theme: Theme): number => THEMES.indexOf(theme);

export const getThemeWithIdx = (idx: number) => THEMES[idx];
