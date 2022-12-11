import { forwardRef, useEffect, useState } from "react";

import styles from "./Input.module.scss";

function Input({ className, icon, children, ...props }, ref) {
  const [classlist, setClasslist] = useState([]);
  const [focusActive, setFocusActive] = useState(false);

  // classlist
  useEffect(() => {
    const _classlist = [styles["input"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    if (focusActive) _classlist.push(styles['input--focus']);

    setClasslist(_classlist.join(" "));
  }, [className, focusActive]);

  // handle focus detection
  useEffect(() => {
    if (!ref) return;

    const { current: input } = ref;

    const onFocusIn = () => setFocusActive(true);
    const onFocusOut = () => setFocusActive(false);

    input?.addEventListener("focusin", onFocusIn);
    input?.addEventListener("focusout", onFocusOut);

    return () => {
      input?.removeEventListener("focusin", onFocusIn);
      input?.removeEventListener("focusout", onFocusOut);
    };
  }, [ref]);

  return (
    <label className={classlist}>
      {icon && icon} <span className={styles["input__label"]}>{children}</span>
      <input className={styles["input__input"]} ref={ref} {...props} />
    </label>
  );
}

export default forwardRef(Input);
