// next

// components

// styles
import styles from "@/styles/About.module.scss";

export default function Blog() {
  return (
    <section className={styles["about"]}>
      <div className={styles["about__header"]}>
        <h2 className={styles["about__title"]}>Blog</h2>
      </div>

      <div className={styles["about__content"]}></div>
    </section>
  );
}
