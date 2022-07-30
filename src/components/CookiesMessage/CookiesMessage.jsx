import { useState, useEffect, useContext } from "react";

// Hooks
import { ConfigContext } from "../../Hooks/useConfig";
import { CookieContext } from "../../Hooks/useCookies";

// Styles
import "./CookiesMessage.scss";

export default function CookiesMessage({
  className,
  title,
  message,
  ...props
}) {
  const { getWebsiteName } = useContext(ConfigContext);
  const { checkCookie, setCookie } = useContext(CookieContext);
  const [classlist, setClasslist] = useState("");
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  /**
   * Handles cookie response
   *
   * @param {array} cookies array of objects with cookie name, value, and time its valid for
   * @returns returns if no cookies need adding/changing
   */
  const cookieResponse = (cookies) => {
    const websiteName = getWebsiteName();

    for (const cookie of cookies) {
      if (checkCookie(`${websiteName}_${cookie.type}-cookies`)) return;

      setCookie(`${websiteName}_${cookie.type}-cookies`, cookie.resp, 365);
    }

    setCookie(`${websiteName}_cookies-menu-accepted`, true, 365);
    setCookiesAccepted(true);
  };

  // check if cookies have been accepted
  useEffect(() => {
    const websiteName = getWebsiteName();
    const state = checkCookie(`${websiteName}_cookies-menu-accepted`);

    setCookiesAccepted(state);
  }, [checkCookie, getWebsiteName]);

  // classlist
  useEffect(() => {
    const _classlist = ["cookies-message"];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    setClasslist(_classlist.join(" "));
  }, [className]);

  return (
    !cookiesAccepted && (
      <div className={classlist}>
        <h2 className="cookies-message__title">{title}</h2>
        <p className="cookies-message__text">{message}</p>
        <div className="cookies-message__button-container">
          <button
            className="cookies-message__button"
            onClick={() =>
              cookieResponse([
                { type: "advanced", resp: true, time: 365 },
                { type: "basic", resp: true, time: 365 },
              ])
            }
          >
            Accept all
          </button>
          <button
            className="cookies-message__button"
            onClick={() =>
              cookieResponse([
                { type: "advanced", resp: false, time: 365 },
                { type: "basic", resp: true, time: 365 },
              ])
            }
          >
            Accept basic
          </button>
        </div>
      </div>
    )
  );
}
