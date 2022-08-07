import { useState, useEffect, useRef } from "react";

import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";
import Icon from "./Modal.icons";

export default function Modal({
  className,
  variant,
  children,
  open,
  onClose,
  onTransitionEnd,
  locked,
  title,
  ...props
}) {
  const modalRef = useRef(null);

  const [classlist, setClasslist] = useState([]);
  const [active, setActive] = useState(false);

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["modal"]];

    if (open) setActive(true);

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classlist.push(styles[`modal--${item}`]);

    if (open && active) _classlist.push(styles["modal--active"]);

    setClasslist(_classlist.join(" "));
  }, [active, className, open, variant]);

  // TransitionEnd detection
  useEffect(() => {
    const { current: e } = modalRef;

    const transitionEnd = () => {
      if (!open) setActive(false);
    };

    if (e) e.addEventListener("transitionend", transitionEnd);

    return () => {
      if (e) e.removeEventListener("transitionend", transitionEnd);
    };
  }, [className, open, onClose, onTransitionEnd]);

  return open || active
    ? createPortal(
        <div className={classlist} ref={modalRef}>
          <div
            className={styles["modal__backdrop"]}
            onClick={() => (!locked ? onClose : "")}
          />
          <div className={styles["modal__content"]}>
            <div className={styles["modal__header"]}>
              {title && <h2 className={styles["modal__title"]}>{title}</h2>}
              <button className={styles["modal__close"]} onClick={onClose}>
                <Icon type="close" />
              </button>
            </div>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
}
