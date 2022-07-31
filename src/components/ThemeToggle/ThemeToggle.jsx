import { useContext } from "react";

import { ThemeContext } from "../../hooks/useTheme";

// styles
import styles from "./ThemeToggle.module.scss";
import Icon from "./ThemeToggle.icons";

export default function ThemeToggle({ ...props }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    setTheme(theme === "night" ? "day" : "night");
  };

  return (
    <div className={styles["theme-toggle"]}>
      <button onClick={handleThemeToggle}>
        {theme === "day" ? <Icon type="day" /> : <Icon type="night" />}
      </button>
    </div>
  );
}
