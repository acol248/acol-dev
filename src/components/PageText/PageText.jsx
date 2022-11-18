import { useState, useEffect } from "react";

// styles
import styles from "./PageText.module.scss";

export default function PageText({ className, title, subtitle, body }) {
  const [classlist, setClasslist] = useState("");

  // classlist
  useEffect(() => {
    const _classlist = [styles["text"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    setClasslist(_classlist.join(" "));
  }, [className]);

  return (
    <div className={classlist}>
      <div className={styles["text__header"]}>
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
      </div>

      <div
        className={styles["text__body"]}
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
    </div>
  );
}
