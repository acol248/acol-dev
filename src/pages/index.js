import Image from "next/image";

// styles
import profilePicture from "../assets/images/profile.png";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
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
      <div className={styles.container}>
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
    </>
  );
}
