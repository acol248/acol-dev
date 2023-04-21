import { useRef, useState } from "react";
import { useLayer } from "react-laag";

// styles
import styles from "./PopoverLink.module.scss";

export default function PopoverLink({ children, href, items }) {
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen: popoverOpen,
    onOutsideClick: () => setPopoverOpen(false),
    onDisappear: () => setPopoverOpen(false),
    overflowContainer: false,
    auto: false,
    placement: "bottom-left",
    triggerOffset: 12,
    containerOffset: 16,
  });

  return (
    <>
      <div
        className={styles["popover-link"]}
        ref={(ref) => {
          buttonRef.current = ref;
          console.log(triggerProps);
        }}
      >
        <Link href={href}>{children}</Link>
      </div>

      <div className={styles["popover"]}></div>
    </>
  );
}
