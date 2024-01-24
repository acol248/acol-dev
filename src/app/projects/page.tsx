// parts
import ProjectsPart from "@/parts/Projects";

// styles
import styles from "@/styles/Projects/Projects.module.scss";

export default function Projects() {
  return (
    <section className={styles["projects"]}>
      <div className={styles["projects__header"]}>
        <h2 className={styles["projects__title"]}>Projects</h2>
      </div>

      <div className={styles["projects__content"]}>
        <ProjectsPart />
      </div>
    </section>
  );
}
