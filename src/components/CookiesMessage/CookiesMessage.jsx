import { useState, useEffect, useContext } from "react";

// hooks
import { AnalyticsContext } from "../../hooks/useAnalytics";

// Styles
import styles from "./CookiesMessage.module.scss";

export default function CookiesMessage({
  className,
  title,
  message,
  websiteName,
  ...props
}) {
  const { enabled, acceptAnalytics } = useContext(AnalyticsContext);

  const [classlist, setClasslist] = useState("");

  const [cookiePrompted, setCookiePrompted] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  /**
   * Handles cookie response
   *
   * @param {array} cookies array of objects with cookie name, value, and time its valid for
   * @returns returns if no cookies need adding/changing
   */
  const cookieResponse = (state, response) => {
    if (state) acceptAnalytics();

    setCookiesAccepted(true);
  };

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
    enabled &&
    !cookiesAccepted &&
    !cookiePrompted && (
      <div className={classlist}>
        <h2 className={styles["cookies-message__title"]}>{title}</h2>
        <p
          className={styles["cookies-message__text"]}
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
        <div className={styles["cookies-message__button-container"]}>
          <button
            className={styles["cookies-message__button"]}
            onClick={() => cookieResponse(true, "analytics")}
          >
            Accept
          </button>
          <button
            className={styles["cookies-message__button"]}
            onClick={() => cookieResponse(false, "deny")}
          >
            Deny
          </button>
        </div>
      </div>
    )
  );
}
