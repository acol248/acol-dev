// components
import DetailedButton from "@/components/DetailedButton";
import Section from "@/components/Section";

// styles
import styles from "@/styles/Projects.module.scss";

export default function Projects() {
  return (
    <section className={styles["projects"]}>
      <div className={styles["projects__content"]}>
        <Section style={{ minHeight: "calc(100vh - 72px)" }}>
          <DetailedButton className={styles['projects__button']}>
            <h3>Title</h3>
            <p>I am a description for the button.</p>
          </DetailedButton>
        </Section>
      </div>
    </section>
  );
}
