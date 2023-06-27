"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

// theme
import { generateCSSVariables, theme, elementsLight, elementsDark } from "@/interface/index";

// types
import type { IThemeWrapper } from "./ThemeWrapper.interface";

interface ITheme {
  themeState: string;
  toggleTheme: () => void;
}

function useTheme() {
  // const _theme = useMemo(() => {
  //   //if (typeof window !== "undefined") return;

  //   //return localStorage?.getItem("theme") || "light";

  //   return "light";
  // }, []);

  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const update = t === "light" ? "dark" : "light";

      if (localStorage) localStorage.setItem("theme", t === "light" ? "dark" : "light");

      return update;
    });
  }, []);

  // load theme
  useEffect(() => {
    if (typeof window !== "undefined") return;

    setTheme(localStorage?.getItem("theme") || "light");
  }, []);

  return useMemo(() => ({ themeState: theme, toggleTheme }), [theme, toggleTheme]);
}

export const ThemeContext = createContext<ITheme | any>(null);

export default function ThemeWrapper({ children }: IThemeWrapper) {
  const _theme = useTheme();

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
