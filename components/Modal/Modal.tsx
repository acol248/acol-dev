import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// components
import Icon from "./Modal.icons";

// styles
import styles from "./Modal.module.scss";

// types
import { IModal } from "./Modal.interface";

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
}: IModal) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [classList, setClassList] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  // classlist and variant
  useEffect(() => {
    const _classList: string[] = [styles["modal"]];

    if (open) setActive(true);

    if (className)
      for (const item of className.split(" ")) _classList.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classList.push(styles[`modal--${item}`]);

    if (open && active) _classList.push(styles["modal--active"]);

    setClassList(_classList.join(" "));
  }, [active, className, open, variant]);

  // TransitionEnd detection
  useEffect(() => {
    const { current: modal } = modalRef;

    const transitionEnd = () => {
      if (!open) {
        setActive(false);
        if (onTransitionEnd) onTransitionEnd();
      }
    };

    if (modal) modal.addEventListener("transitionend", transitionEnd);

    return () => {
      if (modal) modal.removeEventListener("transitionend", transitionEnd);
    };
  }, [className, open, onClose, onTransitionEnd]);

  // set compensations on open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    document.body.style.paddingRight = open && isDesktop ? "8px" : "0";
  }, [active, open, isDesktop]);

  // update query
  useEffect(() => {
    if (!window) return;

    const handleUpdateQuery = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };

    window.addEventListener("resize", handleUpdateQuery);

    handleUpdateQuery();

    return () => window.removeEventListener("resize", handleUpdateQuery);
  }, []);

  return open || active
    ? createPortal(
        <div className={classList} ref={modalRef}>
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
