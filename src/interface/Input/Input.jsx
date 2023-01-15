import { forwardRef, useContext, useEffect, useLayoutEffect, useState } from "react";

// hooks
import { ThemeContext } from "../../hooks/useTheme";

// styles
import styles from "./Input.module.scss";

function Input(
  { className, variant, icon, children, defaultValue, ...props },
  ref
) {
  const { theme } = useContext(ThemeContext);

  const [classlist, setClasslist] = useState([]);
  const [focusActive, setFocusActive] = useState(false);

  // classlist and variant
  useLayoutEffect(() => {
    const _classlist = [styles["input"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classlist.push(styles[`input--${item}`]);

    if (focusActive) _classlist.push(styles["input--focus"]);

    _classlist.push(styles[`input--${theme}`]);

    setClasslist(_classlist.join(" "));
  }, [className, variant, focusActive, theme]);

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

  // handle auto-population
  useEffect(() => {
    if (!ref) return;

    const { current: input } = ref;

    if (!input || !defaultValue) return;

    if (!input.value) ref.current.value === defaultValue;
  }, [defaultValue, ref]);

  return (
    <label className={classlist}>
      {icon && icon} <span className={styles["input__label"]}>{children}</span>
      <input
        className={styles["input__input"]}
        ref={ref ? ref : null}
        {...props}
      />
    </label>
  );
}

export default forwardRef(Input);
