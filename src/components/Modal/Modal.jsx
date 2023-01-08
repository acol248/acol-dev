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
  noClose,
  ...props
}) {
  const modalRef = useRef(null);

  const [classlist, setClasslist] = useState([]);
  const [active, setActive] = useState(false);

  const [isDesktop, setIsDesktop] = useState(null);

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

  // set inert on open
  useEffect(() => {
    const nextApp = document.getElementById("__next");
    if (!nextApp) return;

    nextApp.inert = open;
    document.body.style.overflow = open ? "hidden" : "unset";
    document.body.style.paddingRight = open && isDesktop ? "8px" : "0";
  }, [active, open, isDesktop]);

  // update query
  useEffect(() => {
    if (!window) return;

    const handleUpdateQuery = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);

      console.log(window.matchMedia("(min-width: 768px)").matches);
    };

    window.addEventListener("resize", handleUpdateQuery);

    handleUpdateQuery();

    return () => window.removeEventListener("resize", handleUpdateQuery);
  }, []);

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
              {!noClose && (
                <button className={styles["modal__close"]} onClick={onClose}>
                  <Icon type="close" />
                </button>
              )}
            </div>
            <div className={styles["modal__body"]}>{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;
}
