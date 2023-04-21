import { useEffect, useContext } from "react";

// hooks
import { AnalyticsContext } from "../hooks/useAnalytics";

// styles
import styles from "../styles/Policies.module.scss";

export default function Privacy_Policy() {
  const { page, setPage } = useContext(AnalyticsContext);

  // set current page
  useEffect(() => {
    if (page === "privacypolicy") return;

    setPage("privacypolicy");
  }, [page, setPage]);

  return (
    <div className={styles["policies"]}>
      <div className={styles["policies__inner"]}>
        <div className={styles["policies__header"]}>
          <h2 className={styles["policies__title"]}>Privacy Policy</h2>
        </div>

        <div className={styles["policies__content"]}>
          <div className={styles["policies__content-part"]}>
            <h2>Cookies</h2>

            <p>
              This website uses cookies as a part of Google Analytics. These
              cookies are used to track a user&apos;s usage of this website.
            </p>

            <p>
              Cookies are data files that are placed on your device or computer
              and often include an anonymous unique identifier. For more
              information about cookies, and how to disable cookies, visit
              http://www.allaboutcookies.org.
            </p>

            <p>
              For more information about how Google uses the data it collects,
              click <a href="https://policies.google.com/privacy?hl=en">here</a>{" "}
              or visit https://policies.google.com/privacy?hl=en.
            </p>
          </div>

          <div className={styles["policies__content-part"]}>
            <h2>Usage Analytics</h2>
            <h3>Google Analytics</h3>

            <p>
              This website use Google Analytics to help us understand how our
              customers use the Site--you can read more about how Google uses
              your Personal Information, click{" "}
              <a href="https://www.google.com/intl/en/policies/privacy/">
                here
              </a>{" "}
              or visit https://www.google.com/intl/en/policies/privacy/. You can
              also opt-out of Google Analytics, click{" "}
              <a href="https://tools.google.com/dlpage/gaoptout">here</a> or
              visit https://tools.google.com/dlpage/gaoptout.
            </p>

            <p>
              By accepting our privacy policy, you are allowing this website to
              enable and use Google Analytics to track your usage of this
              website.
            </p>

            <p>
              To find out how Google Analyics collects and uses your data, along
              with other Google services, click{" "}
              <a href="https://policies.google.com/privacy?hl=en">here</a> or
              visit https://policies.google.com/privacy?hl=en.
            </p>

            <p>Analytics tracking does not take place on this page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
