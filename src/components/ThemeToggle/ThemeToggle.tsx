import { useContext, useEffect, useMemo, useRef } from "react";

// hooks
import { ThemeContext } from "../ThemeWrapper/ThemeWrapper";

// components
import Icon from "./ThemeToggle.icons";

// styles
import styles from "./ThemeToggle.module.scss";

// types
import type { IThemeToggle } from "./ThemeToggle.interface";

export default function ThemeToggle({ className }: IThemeToggle) {
  const { themeState, toggleTheme } = useContext(ThemeContext);

  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // classList
  const classList = useMemo(() => {
    const _classlist = [styles["theme-toggle"]];

    if (className) for (const item of className.split(" ")) _classlist.push(item);

    return _classlist.join(" ");
  }, [className]);

  return (
    <button className={classList} onClick={() => toggleTheme()} data-theme-text={themeState} ref={toggleRef}>
      <Icon className={styles["theme-toggle__icon"]} type={themeState} />
    </button>
  );
}
