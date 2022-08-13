import { useEffect, useState } from "react";

import styles from "./Input.module.scss";

export default function Input({ className, icon, children, ...props }) {
  const [classlist, setClasslist] = useState([]);

  // classlist
  useEffect(() => {
    const _classlist = [styles["input"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    setClasslist(_classlist.join(" "));
  }, [className]);

  return (
    <label className={classlist}>
      {icon && icon} <span>{children}</span>
      <input {...props} />
    </label>
  );
}
