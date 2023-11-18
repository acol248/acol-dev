// components
import DetailedButton from "@/components/DetailedButton";
import Section from "@/components/Section";

// styles
import styles from "@/styles/Projects.module.scss";
import { CSSProperties } from "react";

export default function Projects() {
  return (
    <section className={styles["projects"]}>
      <div className={styles["projects__content"]}>
        <Section style={{ minHeight: "calc(100vh - 72px)" }}>
          <DetailedButton>
            <h3>Title</h3>
          </DetailedButton>
        </Section>
      </div>
    </section>
  );
}
