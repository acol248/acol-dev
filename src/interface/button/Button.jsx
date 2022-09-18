import { useEffect, useState } from "react";

import styles from "./Button.module.scss";

export default function Button({
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
    <button className={classlist} onClick={onClick}>
      {icon && icon} <span>{children}</span>
    </button>
  );
}
