import Image from "next/image";
import { useContext, useEffect } from "react";

// hooks
import { AnalyticsContext } from "../hooks/useAnalytics";

// components
import Button from "../interface/Button";

// styles
import profilePicture from "../assets/images/profile.png";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
  const { page, setPage } = useContext(AnalyticsContext);

  useEffect(() => {
    if (page === "home") return;

    setPage("home");
  }, [page, setPage]);

  return (
    <div className={styles["container"]}>
      <div className={styles["container__inner"]}>
        <div className={styles["container__left"]}>
          <h1 className={styles["container__title"]}>
            Welcome to <br />
            <span>acol.dev</span>
          </h1>

          <Link href="/about">
            <Button variant="secondary" tabIndex={-1}>
              Learn More
            </Button>
          </Link>
        </div>

        <div className={styles["container__right"]}>
          <Image
            src={profilePicture}
            alt="Alex Collyer (acol248) profile picture"
            width={524}
            height={678}
            quality={90}
          />
        </div>
      </div>
    </div>
  );
}
