import { useState, useEffect } from "react";

// components
import Icon from "./DetailedListBox.icons";

// styles
import styles from "./DetailedListBox.module.scss";

export default function DetailedListBox({
  className,
  variant,
  title,
  tags,
  status,
  image,
  icon,
  children,
}) {
  const [classList, setClassList] = useState("");

  // classlist and variant
  useEffect(() => {
    const _classList = [styles["detailed-box"]];

    if (className)
      for (const item of className.split(" ")) _classList.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classList.push(styles[`detailed-box--${item}`]);

    setClassList(_classList.join(" "));
  }, [className]);

  return (
    <div className={classList}>
      <div className={styles["detailed-box__image"]}>
        {image ? image : <Icon type={icon ? icon : "missing"} />}
      </div>

      <div className={styles["detailed-box__content"]}>
        <div className={styles["detailed-box__header"]}>
          {title && <h2 className={styles["detailed-box__title"]}>{title}</h2>}
          {tags && (
            <div className={styles["detailed-box__tags"]}>
              {tags?.map((tag) => (
                <span className={styles["detailed-box__tag"]}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className={styles["detailed-box__body"]}>{children}</div>

        {status && (
          <div className={styles["detailed-box__footer"]}>
            <div className={styles["detailed-box__status"]}>
              <Icon type="web" /> <span>{status}</span>
            </div>

            <button className={styles["detailed-box__action"]}>
              Learn More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
