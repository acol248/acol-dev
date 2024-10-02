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
import Card from "@/components/Card";

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
            I am a Fullstack Web Developer at{" "}
            <a href="https://bloc.digital/" target="_blank" rel="noreferrer" className={mc("home__bloc")}>
              Bloc Digital
            </a>
            . I work/have worked on a wide range of different projects - from small single-page applications to complex
            systems. I am dedicated to self improvement and constantly strive to make use of, and promote the use of,
            new and exciting technologies in the space.
          </p>
          <p>
            In my personal time I work on enhancing a range skills that allow me to progress in my day-to-day work. In
            some cases projects I produce/work on are available to try out via the{" "}
            <a href="#projects" className={mc("home__acol")}>
              my projects
            </a>{" "}
            section of this website.
          </p>
        </Block>

        <Block title="Competencies Overview">
          <p>
            <b>Client-Side Development</b> - PWAs, SPAs, responsive and accessible websites, framework component
            development, performance and optimisation testing.
          </p>

          <p>
            <b>Server-Side Development</b> - RESTful API development and documentation, authentication, SQL and noSQL
            database connections, data modelling, server setup, deployment.
          </p>
        </Block>

        <Block title="What are my skills?">
          <div className={mc("home__skills")}>
            <InfoBubble icon={<SkillIcon type="javascript" />}>JavaScript</InfoBubble>
            <InfoBubble icon={<SkillIcon type="typescript" />}>TypeScript</InfoBubble>
            <InfoBubble icon={<SkillIcon type="react" />}>React</InfoBubble>
            <InfoBubble variant="two-tone" icon={<SkillIcon type="vite" />}>
              Vite
            </InfoBubble>
            <InfoBubble icon={<SkillIcon type="nextjs" />}>NextJS</InfoBubble>
            <InfoBubble icon={<SkillIcon type="nodejs" />}>NodeJS</InfoBubble>
            <InfoBubble icon={<SkillIcon type="express" />}>Express</InfoBubble>
            <InfoBubble icon={<SkillIcon type="html" />}>HTML</InfoBubble>
            <InfoBubble icon={<SkillIcon type="css" />}>CSS</InfoBubble>
            <InfoBubble icon={<SkillIcon type="sass" />}>SASS</InfoBubble>
            <InfoBubble icon={<SkillIcon type="python" />}>Python</InfoBubble>
            <InfoBubble icon={<SkillIcon type="figma" />}>Figma</InfoBubble>
            <InfoBubble icon={<SkillIcon type="mongo" />}>MongoDB</InfoBubble>
            <InfoBubble icon={<SkillIcon type="sql" />}>MySQL</InfoBubble>
            <InfoBubble icon={<SkillIcon type="git" />}>Git</InfoBubble>
            <InfoBubble icon={<SkillIcon type="env" />}>ENV</InfoBubble>
            <InfoBubble icon={<SkillIcon type="webhooks" />}>Webhooks</InfoBubble>
            <InfoBubble icon={<SkillIcon type="rest" />}>Rest API</InfoBubble>
          </div>
        </Block>
      </section>

      <section id="projects" className={mc("home__projects")}>
        <Card title="Bills" img="/assets/bills-screenshots.webp">
          <h2>Bills</h2>

          <p>
            A basic application that helps the user keep track of their financial obligations. It makes use of a number
            of modern web APIs that not only run the core of the application, but add additional functionality (Web
            Vibration API).
          </p>
          <p>All data input it stored locally on-device.</p>

          <div className={mc("home__card-base")}>
            <a href="/app/bills/" target="_blank">
              Try It Out
            </a>

            <div className={mc("home__card-tags")}>
              <span>PWA</span>
              <span>React</span>
              <span>TypeScript</span>
            </div>
          </div>
        </Card>

        <Card title="Focus" img="/assets/focus-screenshots.webp">
          <h2>Focus</h2>

          <p>A basic experiment that makes use of the WakeLock API, now available in all mainstream browsers.</p>
          <p>The goal is to encourage a user to put down their phone and focus on doing something in the real world.</p>

          <div className={mc("home__card-base")}>
            <a href="/app/focus/" target="_blank">
              Try It Out
            </a>

            <div className={mc("home__card-tags")}>
              <span>React</span>
              <span>TypeScript</span>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
