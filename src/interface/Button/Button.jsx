import { useEffect, useState } from "react";

import styles from "./Button.module.scss";

export default function Button({
  className,
  variant,
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

    if (variant)
      for (const item of variant.split(" "))
        _classlist.push(styles[`button--${item}`]);

    setClasslist(_classlist.join(" "));
  }, [className, variant]);

  return (
    <button className={classlist} onClick={onClick}>
      {icon && icon} <span>{children}</span>
    </button>
  );
}
