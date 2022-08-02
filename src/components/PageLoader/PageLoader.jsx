import { useState, useEffect } from "react";
import styles from "./PageLoader.module.scss";

export default function PageLoader({ isLoading, ...props }) {
  return (
    <div
      className={`${styles["page-loader"]} ${
        isLoading ? styles["page-loader--loading"] : ""
      }`}
    >
      <div className={styles["page-loader__spinner"]}></div>
    </div>
  );
}
