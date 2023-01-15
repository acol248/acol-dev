import {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(null);
  const [useSystemTheme, setUseSystemTheme] = useState(false);

  /**
   * Toggle system theme enabled
   *
   * @param {string} state checkbox checked?
   */
  const toggleSystemTheme = useCallback((state) => {
    localStorage.removeItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_use-system-theme`
    );
    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_use-system-theme`,
      state
    );

    const getCurrentTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(getCurrentTheme ? "dark" : "light");
    setUseSystemTheme(state);
  }, []);

  /**
   * Toggle theme either automatically or by target
   *
   * @param {object} t target theme
   */
  const toggleTheme = useCallback(
    (t) => {
      const target = theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", t || target);
      setTheme(() => t || target);
    },
    [theme]
  );

  // update theme prior to page render
  useLayoutEffect(() => {
    const getSystemTheme = localStorage.getItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_use-system-theme`
    );
    const themeLS = localStorage.getItem("theme");
    const payload = themeLS === null ? "dark" : themeLS;

    setUseSystemTheme(getSystemTheme === "true" ? true : false);

    if (getSystemTheme === "true" || themeLS === null) {
      const getCurrentTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      return setTheme(getCurrentTheme ? "dark" : "light");
    }

    setTheme(payload);
  }, []);

  return useMemo(
    () => ({ toggleSystemTheme, toggleTheme, theme, useSystemTheme }),
    [toggleSystemTheme, toggleTheme, theme, useSystemTheme]
  );
}

export const ThemeContext = createContext(null);
