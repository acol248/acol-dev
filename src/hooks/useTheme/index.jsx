import { createContext, useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("day");

  return {
    theme,
    setTheme,
  };
}

export const ThemeContext = createContext(null);
