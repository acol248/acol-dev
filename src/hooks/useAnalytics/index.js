import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

// analytics
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

export default function useAnalytics({ siteName, id, enabled }) {
  const analyticsRef = useRef(null);

  const [isAccepted, setIsAccepted] = useState(false);

  /**
   * Accept cookies
   */
  const acceptAnalytics = useCallback(
    (state, type) => {
      if (!enabled) return;

      localStorage.setItem(`${siteName}_analytics-prompted`, true);

      if (!state) return;

      setIsAccepted(state);
      localStorage.setItem(`${siteName}_analytics-accepted`, state);

      if (type === "basic")
        localStorage.setItem(`${siteName}_analytics-basic`, state);

      if (type === "enhanced")
        localStorage.setItem(`${siteName}_analytics-enhanced`, state);
    },
    [enabled, siteName]
  );

  /**
   * Custom track event
   *
   * @param {string} event event string
   * @param {object} payload object containing track data
   */
  const track = useCallback(
    (event, payload) => {
      const { current: analytics } = analyticsRef;

      if (!event) throw new Error("Event missing.");
      if (!payload) throw new Error("Payload missing.");

      if (!enabled || !isAccepted || !analytics) return;

      analytics.track(event, payload);
    },
    [isAccepted, enabled]
  );

  /**
   * Tracks page view
   */
  const pageView = useCallback(() => {
    const { current: analytics } = analyticsRef;

    if (!enabled || !isAccepted || !analytics) return;

    analytics.page();
  }, [isAccepted, enabled]);

  // sets up analytics plugin if enabled & accepted
  useEffect(() => {
    if (!isAccepted || !enabled) return;

    analyticsRef.current = Analytics({
      app: "acol-dev",
      plugins: [
        googleAnalytics({
          measurementIds: id,
        }),
      ],
    });
  }, [isAccepted, enabled, id]);

  // set accepted if previously accepted
  useEffect(() => {
    const accepted = localStorage.getItem(`${siteName}_analytics-accepted`);
    const basic = localStorage.getItem(`${siteName}_analytics-basic`);
    const enhanced = localStorage.getItem(`${siteName}_analytics-enhanced`);

    if (accepted !== "true") return;

    setIsAccepted(accepted === "true" ? true : false);
  }, [siteName]);

  return useMemo(
    () => ({ enabled, track, pageView, acceptAnalytics }),
    [enabled, track, pageView, acceptAnalytics]
  );
}

export const AnalyticsContext = createContext(null);
