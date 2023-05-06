import { useState, useEffect } from "react";

import styles from "./Section.module.scss";

export default function Section({
  className,
  title,
  subtitle,
  children,
  ...props
}) {
  const [classList, setClassList] = useState("");

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["section"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    setClassList(_classlist.join(" "));
  }, [className]);

  return (
    <div className={classList}>
      {(title || subtitle) && (
        <div className={styles["section__header"]}>
          {title && <h2 className={styles["section__title"]}>{title}</h2>}
          {subtitle && (
            <h4 className={styles["section__subtitle"]}>{subtitle}</h4>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
