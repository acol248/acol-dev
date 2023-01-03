import Link from "next/link";
import { useState } from "react";

// components
import Modal from "../Modal";
import Toggle from "../../interface/toggle/Toggle";

// styles
import styles from "./Footer.module.scss";

export default function Footer() {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles["footer__title-box"]}>
        <p className={styles["footer__site-title"]}>acol.dev</p>

        <Link href="/privacy-policy">
          <a className={styles["footer__link"]}>Privacy Policy</a>
        </Link>

        <button
          className={styles["footer__link"]}
          onClick={() => setOptionsOpen(true)}
        >
          Privacy Options
        </button>

        <p className={styles["footer__copyright"]}>
          acol.dev &copy; {new Date().getFullYear()}
        </p>
      </div>

      <Modal
        className={styles["settings-modal"]}
        open={optionsOpen}
        onClose={() => setOptionsOpen(false)}
        title="Privacy Options"
      >
        <div className={styles["settings-modal__inner"]}>
          <Toggle>Use System Theme</Toggle>
          <Toggle>Privacy Policy Accepted</Toggle>
        </div>
      </Modal>
    </footer>
  );
}
