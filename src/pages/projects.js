import { useContext, useEffect, useState } from "react";

// components
import Section from "../components/Section";

// hooks
import { AnalyticsContext } from "../hooks/useAnalytics";

// styles
import styles from "../styles/Projects.module.scss";

export default function Projects() {
  const { page, setPage } = useContext(AnalyticsContext);

  const [classList, setClassList] = useState("");

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["projects"]];

    setClassList(_classlist.join(" "));
  }, []);

  useEffect(() => {
    if (page === "projects") return;

    setPage("projects");
  }, [page, setPage]);

  return (
    <div className={classList}>
      <div className={styles["projects__header"]}>
        <h2 className={styles["projects__title"]}>Projects</h2>
      </div>

      <div className={styles["projects__content"]}>
        <Section></Section>
      </div>
    </div>
  );
}
