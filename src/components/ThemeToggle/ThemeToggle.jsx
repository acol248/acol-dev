import { useContext, useEffect } from "react";

import { ThemeContext } from "../../hooks/useTheme";

// styles
import styles from "./ThemeToggle.module.scss";
import Icon from "./ThemeToggle.icons";

export default function ThemeToggle({ deviceThemeMatch, ...props }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    setTheme(theme === "night" ? "day" : "night");
  };

  useEffect(() => {
    console.log(deviceThemeMatch);
  }, [deviceThemeMatch]);

  return (
    <div className={styles["theme-toggle"]}>
      <button onClick={handleThemeToggle}>
        {theme === "day" ? <Icon type="day" /> : <Icon type="night" />}
      </button>
    </div>
  );
}
