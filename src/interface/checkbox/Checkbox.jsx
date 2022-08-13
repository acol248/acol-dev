import { useEffect, useState } from "react";

import styles from "./Checkbox.module.scss";

export default function Checkbox({
  className,
  onClick,
  icon,
  children,
  ...props
}) {
  const [classlist, setClasslist] = useState([]);

  // classlist
  useEffect(() => {
    const _classlist = [styles["button"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    setClasslist(_classlist.join(" "));
  }, [className]);

  return (
    <label className={classlist}>
      <input {...props} type="checkbox" />
      <span>{children}</span>
    </label>
  );
}
