"use client";

import { elementTheme, generateCSSVariables, theme } from "@/interface/index";

// types
import type { IThemeWrapper } from "./ThemeWrapper.interface";

export default function Section({ children }: IThemeWrapper) {
  const themeStyles = generateCSSVariables(theme);
  const elementsTheme = generateCSSVariables(elementTheme);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
      <style dangerouslySetInnerHTML={{ __html: elementsTheme }} />

      {children}
    </>
  );
}
