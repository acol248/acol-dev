// styles
import { forwardRef, useState, useEffect } from "react";
import styles from "./Select.module.scss";

function Select({ className, variant, items, selectedPayload }, ref) {
  const [classlist, setClasslist] = useState("");
  const [selected, setSelected] = useState(null);

  const [selectedOpen, setSelectedOpen] = useState(false);

  /**
   * Handle select
   */
  const handleSelect = (index) => {
    setSelected(index);
    selectedPayload(items[index]?.payload);

    setSelectedOpen(false);
  };

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["select"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classlist.push(styles[`select--${item}`]);

    if (selectedOpen) _classlist.push(styles["select--open"]);

    setClasslist(_classlist.join(" "));
  }, [className, selectedOpen, variant]);

  return (
    <div className={classlist} ref={ref}>
      <button
        className={styles["select__persistent"]}
        onClick={() => setSelectedOpen((s) => !s)}
      >
        {Number.isInteger(selected) ? items[selected]?.text : "-"}
      </button>

      <div className={styles["select__dropdown"]}>
        {items &&
          items.map(({ text, payload }, index) => (
            <button
              key={text + payload}
              className={styles["select__dropdown-item"]}
              onClick={() => handleSelect(index)}
            >
              {text}
            </button>
          ))}
      </div>
    </div>
  );
}

export default forwardRef(Select);
