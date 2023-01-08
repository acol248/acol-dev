import { forwardRef, useEffect, useState } from "react";

import styles from "./Checkbox.module.scss";

function Checkbox(
  { className, variant, onClick, icon, children, ...props },
  ref
) {
  const [classlist, setClasslist] = useState([]);

  // classlist
  useEffect(() => {
    const _classlist = [styles["checkbox"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classlist.push(styles[`checkbox--${item}`]);

    setClasslist(_classlist.join(" "));
  }, [className, variant]);

  return (
    <label className={classlist}>
      <input {...props} type="checkbox" ref={ref ? ref : null} />
      <span>{children}</span>
    </label>
  );
}

export default forwardRef(Checkbox);
