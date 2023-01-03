import { useState, useEffect, forwardRef, useRef } from "react";

// helpers
import generateString from "../../helpers/generateString";

// styles
import styles from "./Toggle.module.scss";

function Toggle(
  { className, variant, children, checked, setChecked, ...props },
  ref
) {
  const idRef = useRef(generateString(8));

  const [classlist, setClasslist] = useState("");

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["toggle"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classlist.push(styles[`toggle--${item}`]);

    setClasslist(_classlist.join(" "));
  }, [className, variant]);

  return (
    <div className={classlist}>
      <label className={styles["toggle__label"]}>{children}</label>

      <div className={styles["toggle__switch"]}>
        <input
          className={styles["toggle__switch-checkbox"]}
          type="checkbox"
          id={idRef.current}
          value={checked ? checked : false}
          onChange={(s) => setChecked(s)}
          ref={ref}
          {...props}
        />
        <label
          className={styles["toggle__switch-highlight"]}
          htmlFor={idRef.current}
        ></label>
      </div>
    </div>
  );
}

export default forwardRef(Toggle);
