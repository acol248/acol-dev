import { createContext, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("day");

  const setThemeDetails = async (theme) => {
    setTheme(theme);

    await fetch("/api/theme/set-theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme }),
    });
  };

  return {
    theme,
    setTheme: setThemeDetails,
  };
}

export const ThemeContext = createContext(null);
