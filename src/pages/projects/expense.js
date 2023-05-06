/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";

// components
import Button from "../../interface/Button";

// hooks
import { AnalyticsContext } from "../../hooks/useAnalytics";
import { ThemeContext } from "../../hooks/useTheme";

// styles
import styles from "../../styles/Expense.module.scss";

export default function Expense() {
  const { page, setPage } = useContext(AnalyticsContext);
  const { theme } = useContext(ThemeContext);

  const [classList, setClassList] = useState("");

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["expense"]];

    _classlist.push(styles[`expense--${theme}`]);

    setClassList(_classlist.join(" "));
  }, [theme]);

  useEffect(() => {
    if (page === "expense") return;

    setPage("expense");
  }, [page, setPage]);

  return (
    <div className={classList}>
      <div className={styles["expense__cover"]}>
        <div className={styles["expense__inner"]}>
          <div className={styles["expense__title-box"]}>
            <div className={styles["expense__text"]}>
              <h1 className={styles["expense__title"]}>Expense</h1>
              <h3 className={styles["expense__subtitle"]}>
                Web-based personal finance tracker.
              </h3>

              <p className={styles["expense__small-text"]}>
                This is an early access application. It should be expected that
                bugs will be present, features will be removed/changes regularly
                and that features may not work properly.
              </p>
            </div>

            <Button variant="secondary" disabled>Coming Soon</Button>
          </div>

          <img
            className={styles["expense__logo"]}
            src="/assets/images/expense-icon.png"
            alt="Icon for Expense application"
          />
        </div>
      </div>
    </div>
  );
}
