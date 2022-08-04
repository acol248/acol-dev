import { useEffect, useState } from "react";

import styles from "./Button.module.scss";

export default function Button({ onClick, icon, children, ...props }) {
  return (
    <button className={styles["button"]} onClick={onClick}>
      {icon && icon} <span>{children}</span>
    </button>
  );
}
