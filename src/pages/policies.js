/* eslint-disable react/no-unescaped-entities */
// styles
import styles from "../styles/Policies.module.scss";

export default function Policies() {
  return (
    <div className={styles["policies"]}>
      <div className={styles["policies__inner"]}>
        <div className={styles["policies__header"]}>
          <h2 className={styles["policies__title"]}>Policies</h2>
        </div>

        <div className={styles["policies__content"]}>
          <div className={styles["policies__content-part"]}>
            <h2>Analytics Data</h2>

            <p>
              "https://acol.dev" uses Google Analytics basic tracking to track
              the number of users using the website. Basic tracking is enabled
              by default and does not collect any personal data about any
              individual user. This falls in line with data protection and
              privacy regulations worldwide.
            </p>

            <p>
              "acol.dev" does not collect any personal user data nor does it
              allow Google Analytics to collect any personal information without
              your consent.
            </p>

            <p>
              Enhanced Analytics allows "acol.dev" to see information such as
              location data (where the website is being viewed from), website
              interactions (such as, however not limited to, file downloads,
              click events, form interactions and video engagements).
            </p>
          </div>

          <div className={styles["policies__content-part"]}>
            <h2>Cookies</h2>

            <p>
              This website only uses cookies for analytics tracking, using
              Google Analytics. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
