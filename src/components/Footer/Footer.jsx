import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// components
import Modal from "../Modal";
import Toggle from "../../interface/toggle/Toggle";

// styles
import styles from "./Footer.module.scss";

export default function Footer({ setTheme }) {
  const useSystemThemeRef = useRef(null);
  const privacyPolicyAcceptedRef = useRef(null);

  const [optionsOpen, setOptionsOpen] = useState(false);

  const [systemThemeToggle, setSystemThemeToggle] = useState(null);
  const [privacyAcceptedToggle, setPrivacyAcceptedToggle] = useState(null);

  /**
   * Handles options close
   */
  const handleOptionsClose = () => {
    setOptionsOpen(false);

    setSystemThemeToggle(null);
    setPrivacyAcceptedToggle(null);
  };

  // handle 'use system theme' change
  useEffect(() => {
    if (systemThemeToggle === null) return;

    localStorage.removeItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_use-system-theme`
    );
    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_use-system-theme`,
      systemThemeToggle
    );

    setTheme();
  }, [systemThemeToggle, setTheme]);

  // handle 'privacy accepted' change
  useEffect(() => {
    if (privacyAcceptedToggle === null) return;

    localStorage.removeItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_privacy-accepted`
    );
    localStorage.setItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_privacy-accepted`,
      privacyAcceptedToggle
    );
  }, [privacyAcceptedToggle]);

  // set toggle state on open
  useEffect(() => {
    if (!optionsOpen) return;

    const { current: theme } = useSystemThemeRef;
    const { current: privacy } = privacyPolicyAcceptedRef;

    if (!theme || !privacy) return;

    const useSystemTheme = localStorage.getItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_use-system-theme`
    );
    const privacyAccepted = localStorage.getItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_privacy-accepted`
    );

    theme.checked = useSystemTheme === "true" ? true : false;
    privacy.check = privacyAccepted === "true" ? true : false;

    setSystemThemeToggle(useSystemTheme === "true" ? true : false);
    setPrivacyAcceptedToggle(privacyAccepted === "true" ? true : false);
  }, [optionsOpen]);

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
          User Options
        </button>

        <p className={styles["footer__copyright"]}>
          acol.dev &copy; {new Date().getFullYear()}
        </p>
      </div>

      <Modal
        className={styles["options-modal"]}
        open={optionsOpen}
        onClose={handleOptionsClose}
        title="User Options"
      >
        <div className={styles["options-modal__inner"]}>
          <Toggle
            onChange={({ target }) => setSystemThemeToggle(target.checked)}
            ref={useSystemThemeRef}
          >
            Use System Theme
          </Toggle>
          <Toggle
            onChange={({ target }) => setPrivacyAcceptedToggle(target.checked)}
            ref={privacyPolicyAcceptedRef}
          >
            Privacy Policy Accepted
          </Toggle>
        </div>
      </Modal>
    </footer>
  );
}
