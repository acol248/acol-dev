"use client";

import { createContext, useCallback, useMemo, useState } from "react";

// theme
import { generateCSSVariables, theme, elementsLight, elementsDark } from "@/interface/index";

// types
import type { IThemeWrapper } from "./ThemeWrapper.interface";
import { setCookie } from "@/helpers/cookie";

interface ITheme {
  themeState: string;
  toggleTheme: () => void;
}

function useTheme(value: string) {
  const [theme, setTheme] = useState(value);

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const update = t === "light" ? "dark" : "light";

      if (localStorage) setCookie("theme", update, 10000);

      return update;
    });
  }, []);

  return useMemo(() => ({ themeState: theme, toggleTheme }), [theme, toggleTheme]);
}

export const ThemeContext = createContext<ITheme | any>(null);

export default function ThemeWrapper({ children, value }: IThemeWrapper) {
  const _theme = useTheme(value);

  const themeStyles = generateCSSVariables(theme);
  const elementsTheme = generateCSSVariables(_theme.themeState === "light" ? elementsLight : elementsDark);

  return (
    <ThemeContext.Provider value={_theme}>
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
      <style dangerouslySetInnerHTML={{ __html: elementsTheme }} />

      {children}
    </ThemeContext.Provider>
  );
}
