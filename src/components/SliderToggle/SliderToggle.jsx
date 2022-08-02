import styles from "./SliderToggle.module.scss";

export default function SliderToggle({ ...props }) {
  return (
    <div className={styles["slider-toggle"]}>
      <label className={styles["slider-toggle__switch"]} id="switch">
        <input type="checkbox" />
        <span
          className={`${styles["slider-toggle__slider"]} ${styles["slider-toggle__round"]}`}
        ></span>
      </label>
    </div>
  );
}
