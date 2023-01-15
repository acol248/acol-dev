import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";

// hooks
import { ThemeContext } from "../../hooks/useTheme";

// components
import Modal from "../Modal";
import Toggle from "../../interface/toggle/Toggle";

// styles
import styles from "./Footer.module.scss";

export default function Footer({ setTheme }) {
  const { toggleSystemTheme, useSystemTheme } = useContext(ThemeContext);

  const useSystemThemeRef = useRef(null);
  const privacyPolicyAcceptedRef = useRef(null);

  const [optionsOpen, setOptionsOpen] = useState(false);

  const [privacyAcceptedToggle, setPrivacyAcceptedToggle] = useState(null);

  /**
   * Handles options close
   */
  const handleOptionsClose = () => {
    setOptionsOpen(false);

    setPrivacyAcceptedToggle(null);
  };

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

    const privacyAccepted = localStorage.getItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_privacy-accepted`
    );

    theme.checked = useSystemTheme;
    privacy.checked = privacyAccepted === "true" ? true : false;

    setPrivacyAcceptedToggle(privacyAccepted === "true" ? true : false);
  }, [optionsOpen, useSystemTheme]);

  return (
    <footer className={styles["footer"]}>
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
            onChange={({ target }) => toggleSystemTheme(target.checked)}
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
