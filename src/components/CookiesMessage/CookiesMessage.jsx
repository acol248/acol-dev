import { useState, useEffect, useContext } from "react";

// components
import Modal from "../Modal";

// hooks
import { AnalyticsContext } from "../../hooks/useAnalytics";

// Styles
import styles from "./CookiesMessage.module.scss";
import Button from "../../interface/button";

export default function CookiesMessage({
  className,
  title,
  message,
  websiteName,
  ...props
}) {
  const { enabled, acceptAnalytics } = useContext(AnalyticsContext);

  const [classlist, setClasslist] = useState("");

  const [promptOpen, setPromptOpen] = useState(false);
  const [cookiePrompted, setCookiePrompted] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  /**
   * Handles cookie response
   *
   * @param {array} cookies array of objects with cookie name, value, and time its valid for
   * @returns returns if no cookies need adding/changing
   */
  const cookieResponse = (state, response) => {
    acceptAnalytics(state, response);

    setPromptOpen(false);
  };

  // if enabled, set open
  useEffect(() => {
    const analyticsAccepted = localStorage.getItem(
      `${websiteName}_analytics-prompted`
    );

    if (enabled && !cookiesAccepted && !analyticsAccepted) setPromptOpen(true);
  }, [cookiesAccepted, enabled, websiteName]);

  // check if cookies have been accepted
  useEffect(() => {
    const analyticsAccepted = localStorage.getItem(
      `${websiteName}_analytics-accepted`
    );

    setCookiePrompted(analyticsAccepted === null ? false : true);
    setCookiesAccepted(analyticsAccepted);
  }, [websiteName]);

  // classlist
  useEffect(() => {
    const _classlist = [styles["cookies-message"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    setClasslist(_classlist.join(" "));
  }, [className]);

  return (
    <Modal open={promptOpen} className={classlist} noClose={true}>
      <div className={styles["cookies-message__inner"]}>
        <h2 className={styles["cookies-message__title"]}>{title}</h2>
        <p
          className={styles["cookies-message__text"]}
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
        <div className={styles["cookies-message__button-container"]}>
          <Button
            className={styles["cookies-message__button"]}
            variant="secondary"
            onClick={() => cookieResponse(false)}
          >
            Deny
          </Button>

          <Button
            className={styles["cookies-message__button"]}
            variant="secondary"
            onClick={() => cookieResponse(true, "basic")}
          >
            Accept Basic
          </Button>

          <Button
            className={styles["cookies-message__button"]}
            onClick={() => cookieResponse(true, "enhanced")}
          >
            Accept Enhanced
          </Button>
        </div>
      </div>
    </Modal>
  );
}
