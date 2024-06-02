// next
import Link from "next/link";
import Image from "next/image";

// components
import Button from "@/interface/Button";
import InfoBubble from "@/components/InfoBubble";
import SkillIcon from "@/components/SkillIcon";
import Block from "@/components/Block";

// styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "@/styles/Home.module.scss";
const mc = mapClassesCurried(maps, true) as (c: string) => string;

// assets
import profilePicture from "@/assets/profile.png";

export default function Home() {
  const classList = useClassList({ defaultClass: "home", maps, string: true }) as string;

  return (
    <main className={classList}>
      <section id="home" className={mc("home__head")}>
        <div className={mc("home__head-inner")}>
          <div className={mc("home__left")}>
            <h1 className={mc("home__title")}>
              Welcome to <br />
              <span>acol.dev</span>
            </h1>

            <Link href="#about">
              <Button variant="secondary" tabIndex={-1}>
                Learn More
              </Button>
            </Link>
          </div>

          <div className={mc("home__right")}>
            <Image
              src={profilePicture}
              alt="Alex Collyer (acol248) profile picture"
              width={524}
              height={678}
              quality={90}
            />
          </div>
        </div>
      </section>

      <section id="about" className={mc("home__about")}>
        <Block title="About Me">
          <p>
            I am a Web Developer at{" "}
            <a href="https://bloc.digital/" target="_blank" rel="noreferrer" className={mc("home__bloc")}>
              Bloc Digital
            </a>
            . I work on frontend and backend projects, primarily in Javascript/Typescript. I work with technologies such
            as React and Babylon for frontend project and Express for backend projects.
          </p>
          <p>
            In my personal time I work on enhancing a range skills that allow me to progress in my day-to-day work.
            These culmulate into the projects/services available via{" "}
            <a href="https://acol.dev/" target="_blank" rel="noreferrer" className={mc("home__acol")}>
              my website
            </a>
            .
          </p>
        </Block>

        <Block title="What are my skills?">
          <div className={mc("home__skills")}>
            <InfoBubble icon={<SkillIcon type="javascript" />}>JavaScript</InfoBubble>
            <InfoBubble icon={<SkillIcon type="typescript" />}>TypeScript</InfoBubble>
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
        </Block>

        <Block title="Where are my skills?">
          <p>
            I present some of my skills outside of my working environment in a number of personal projects. These can be
            found on the website under the{" "}
            <Link href="/projects" className={mc("home__projects")}>
              projects
            </Link>{" "}
            page.
          </p>
        </Block>
      </section>

      <section id="projects" className={mc("home__projects")}></section>
    </main>
  );
}
