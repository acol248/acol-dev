import { forwardRef, useState, useEffect } from "react";

// components
import Icon from "./Select.icon";

// styles
import styles from "./Select.module.scss";

function Select({ className, variant, items, selectedPayload, children }, ref) {
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
    <div className={classlist}>
      <span className={styles['select__label']}>{children}</span>
      <div className={styles["select__dropdown"]} ref={ref}>
        <button
          className={styles["select__persistent"]}
          onClick={() => setSelectedOpen((s) => !s)}
        >
          <span>
            {Number.isInteger(selected) ? items[selected]?.text : "-"}
          </span>
          <Icon type="expand" />
        </button>

        <div className={styles["select__dropmenu"]}>
          {items &&
            items.map(({ text, payload }, index) => (
              <button
                key={text + payload}
                className={styles["select__dropmenu-item"]}
                onClick={() => handleSelect(index)}
              >
                {text}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Select);
