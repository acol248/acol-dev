import { useContext, useEffect, useState } from "react";

// next
import Image from "next/image";

// components
import Button from "../../interface/Button";

// hooks
import { AnalyticsContext } from "../../hooks/useAnalytics";
import { ThemeContext } from "../../hooks/useTheme";

// styles
import styles from "../../styles/Expense.module.scss";
import expenseIcon from "../../assets/images/expense/icon.png";

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

            <a
              href="https://inpensa.acol.dev/"
              target="_black"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">Try Expense</Button>
            </a>
          </div>

          <Image
            className={styles["expense__logo"]}
            src={expenseIcon}
            alt="Icon for Expense application"
            width={384}
            height={384}
            quality={95}
          />
        </div>
      </div>
    </div>
  );
}
