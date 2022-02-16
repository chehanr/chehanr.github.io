import React, { FunctionComponent, useState, useEffect } from "react";
import { usePrevious } from "react-use";

import {
  setTheme,
  getNextThemeIdx,
  getTheme,
  getThemeIdx,
  getThemeWithIdx,
} from "../lib/utils/theme";

// https://tabler-icons.io/static/tabler-icons/icons/sun.svg
export const SunIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
    </svg>
  );
};

// https://tabler-icons.io/static/tabler-icons/icons/moon.svg
export const MoonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
    </svg>
  );
};

const ThemeSwitchButton: FunctionComponent = () => {
  const [mounted, setMounted] = useState(false);
  const [themeIdx, setThemeIdx] = useState(getThemeIdx(getTheme()));
  const previousThemeIdx = usePrevious(themeIdx);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTheme(
      window,
      getThemeWithIdx(previousThemeIdx || 0),
      getThemeWithIdx(themeIdx)
    );
  }, [previousThemeIdx, themeIdx]);

  return mounted ? (
    <button
      title="Switch theme"
      aria-label="Switch theme"
      onClick={() => setThemeIdx(getNextThemeIdx(themeIdx))}
    >
      {getThemeWithIdx(themeIdx) === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  ) : null;
};

export default ThemeSwitchButton;
