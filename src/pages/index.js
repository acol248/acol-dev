import Image from "next/image";
import { useContext, useLayoutEffect } from "react";

// hooks
import { AnalyticsContext } from "../hooks/useAnalytics";

// styles
import profilePicture from "../assets/images/profile.png";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const { page, setPage } = useContext(AnalyticsContext);

  useLayoutEffect(() => {
    if (page === "home") return;

    setPage("home");
  }, [page, setPage]);

  return (
    <div className={styles["container"]}>
      <div className={styles["container__inner"]}>
        <div className={styles["container__profile-wrapper"]}>
          <Image
            src={profilePicture}
            alt="Alex Collyer (acol248) profile picture"
            width={524}
            height={678}
            quality={90}
          />
        </div>

        <h1 className={styles["container__title"]}>
          Welcome to <br />
          <span>acol.dev</span>
        </h1>
      </div>
    </div>
  );
}
