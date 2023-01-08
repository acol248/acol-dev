import Link from "next/link";

// components
import Icon from "../../components/Icon";
import Button from "../../interface/Button";

// styles
import styles from "../../styles/Tools.module.scss";

export default function Tools() {
  return (
    <div className={styles["tools"]}>
      <div className={styles["tools__inner"]}>
        <div className={styles["tools__header"]}>
          <h2 className={styles["tools__title"]}>Tools</h2>
        </div>

        <div className={styles["tools__body"]}>
          <p className={styles["tools__body-text"]}>
            Below are web tools provided by acol.dev.
          </p>

          <div className={styles["tools__button-container"]}>
            <Link href="/tools/qr-generator">
              <a className={styles["tools__button"]}>
                <div className={styles["tools__content"]}>
                  <Icon type="qr-code" />

                  <span>QR Code Generator</span>
                </div>

                <span className={styles["tools__line"]} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
