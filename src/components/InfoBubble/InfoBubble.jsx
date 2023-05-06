import { useState, useEffect } from "react";

// styles
import styles from "./InfoBubble.module.scss";

export default function InfoBubble({ className, variant, icon, children }) {
  const [classList, setClassList] = useState("");

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["info-bubble"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classlist.push(styles[`info-bubble--${item}`]);

    setClassList(_classlist.join(" "));
  }, []);

  return (
    <div className={classList}>
      {icon} <span className={styles["info-bubble__body"]}>{children}</span>
    </div>
  );
}
