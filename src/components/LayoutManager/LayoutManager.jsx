import { useContext } from "react";

// hooks
import { ThemeContext } from "../../hooks/useTheme";

// styles
import styles from "./LayoutManager.module.scss";

export default function LayoutManager({ children }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      id="__layout"
      className={`${styles["layout-manager"]} ${
        styles[`layout-manager--${theme}`]
      }`}
    >
      {children}
    </div>
  );
}
