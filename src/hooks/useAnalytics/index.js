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
  const acceptAnalytics = useCallback(() => {
    if (!enabled) return;

    setIsAccepted(true);
    localStorage.setItem(`${siteName}_analytics-accepted`, true);
  }, [enabled, siteName]);

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
    const accepted = localStorage.getItem(`${siteName}_cookie-accepted`);

    if (!accepted) return;

    setIsAccepted(typeof accepted === Boolean ? accepted : false);
  }, [siteName]);

  return useMemo(
    () => ({ track, pageView, acceptAnalytics }),
    [track, pageView, acceptAnalytics]
  );
}

export const AnalyticsContext = createContext(null);
