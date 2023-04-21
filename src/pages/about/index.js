import { useContext, useEffect, useRef, useState } from "react";

// components
import Section from "../../components/Section/Section";
import InfoBubble from "../../components/InfoBubble/InfoBubble";
import SkillIcon from "../../components/SkillIcon";

// hooks
import { AnalyticsContext } from "../../hooks/useAnalytics";

// styles
import styles from "../../styles/About.module.scss";

export default function Home() {
  const { page, setPage } = useContext(AnalyticsContext);

  const [classList, setClassList] = useState("");

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["about"]];

    setClassList(_classlist.join(" "));
  }, []);

  useEffect(() => {
    if (page === "about") return;

    setPage("about");
  }, [page, setPage]);

  return (
    <div className={classList}>
      <div className={styles["about__header"]}>
        <h2 className={styles["about__title"]}>About</h2>
      </div>

      <div className={styles["about__content"]}>
        <Section title="About Me">
          <p>
            I am a Web Developer at{" "}
            <a
              href="https://bloc.digital/"
              target="_blank"
              rel="noreferrer"
              className={styles["about__bloc"]}
            >
              Bloc Digital
            </a>
            . I work on frontend and backend projects, primarily in
            Javascript/Typescript. I work with technologies such as React and
            Babylon for frontend project and Express for backend projects.
          </p>
          <p>
            In my personal time I work on enhancing a range skills that allow me
            to progress in my day-to-day work. These culmulate into the
            projects/services available via{" "}
            <a
              href="https://acol.dev/"
              target="_blank"
              rel="noreferrer"
              className={styles["about__acol"]}
            >
              my website
            </a>
            .
          </p>
        </Section>

        <Section title="Where are my skills?">
          <div className={styles["about__skills"]}>
            <InfoBubble icon={<SkillIcon type="javascript" />}>
              JavaScript
            </InfoBubble>
            <InfoBubble icon={<SkillIcon type="typescript" />}>
              TypeScript
            </InfoBubble>
            <InfoBubble icon={<SkillIcon type="react" />}>React</InfoBubble>
            <InfoBubble icon={<SkillIcon type="nextjs" />}>NextJS</InfoBubble>
            <InfoBubble icon={<SkillIcon type="nodejs" />}>NodeJS</InfoBubble>
            <InfoBubble icon={<SkillIcon type="express" />}>Express</InfoBubble>
            <InfoBubble icon={<SkillIcon type="figma" />}>Figma</InfoBubble>
            <InfoBubble icon={<SkillIcon type="mongo" />}>Mongo</InfoBubble>
            <InfoBubble icon={<SkillIcon type="sql" />}>MySQL</InfoBubble>
            <InfoBubble icon={<SkillIcon type="html" />}>HTML</InfoBubble>
            <InfoBubble icon={<SkillIcon type="css" />}>CSS</InfoBubble>
            <InfoBubble icon={<SkillIcon type="sass" />}>SASS</InfoBubble>
            <InfoBubble icon={<SkillIcon type="git" />}>Git</InfoBubble>
            <InfoBubble icon={<SkillIcon type="env" />}>ENV</InfoBubble>
          </div>
        </Section>
      </div>
    </div>
  );
}
