import { useState, useEffect, useMemo } from "react";

// styles
import styles from "./InfoBubble.module.scss";

export default function InfoBubble({ className, variant, icon, children }) {
  const classList = useMemo(() => {
    const _classlist = [styles["info-bubble"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classlist.push(styles[`info-bubble--${item}`]);

    return _classlist.join(" ");
  }, [className, variant]);

  return (
    <div className={classList}>
      {icon} <span className={styles["info-bubble__body"]}>{children}</span>
    </div>
  );
}
