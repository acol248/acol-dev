// next
import Link from "next/link";
import Image from "next/image";

// components
import Button from "@/interface/Button";

// styles
import styles from "@/styles/Home.module.scss";

// assets
import profilePicture from "@/assets/profile.png";

export default function Home() {
  return (
    <section className={styles["home"]}>
      <div className={styles["home__inner"]}>
        <div className={styles["home__left"]}>
          <h1 className={styles["home__title"]}>
            Welcome to <br />
            <span>acol.dev</span>
          </h1>

          <Link href="/about">
            <Button variant="secondary" tabIndex={-1}>
              Learn More
            </Button>
          </Link>
        </div>

        <div className={styles["home__right"]}>
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
  );
}
