import { useState, useEffect } from "react";

// styles
import styles from "./Card.module.scss";

export default function Card({
  className,
  variant,
  title,
  href,
  previewURL,
  children,
}) {
  const [classList, setClassList] = useState("");

  // classlist and variant
  useEffect(() => {
    const _classList = [styles["card"]];

    if (className)
      for (const item of className.split(" ")) _classList.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classList.push(styles[`card--${item}`]);

    setClassList(_classList.join(" "));
  }, [className, variant]);

  return (
    <a className={classList} href={href || ""} target="__blank" rel="noreferrer">
      <div className={styles["card__inner"]}>
        {previewURL && (
          <iframe className={styles["card__preview"]} src={previewURL} />
        )}

        <div className={styles["card__text"]}>
          <h3 className={styles["card__title"]}>{title}</h3>
          <p className={styles["card__body"]}>{children}</p>
        </div>
      </div>
    </a>
  );
}
