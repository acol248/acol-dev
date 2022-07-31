import { createContext, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("night");

  return {
    theme,
    setTheme,
  };
}

export const ThemeContext = createContext(null);
