import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import CookiesMessage from "../components/CookiesMessage/CookiesMessage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageLoader from "../components/PageLoader";

// hooks
import useAnalytics, { AnalyticsContext } from "../hooks/useAnalytics";

// styles
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const analytics = useAnalytics({
    siteName: process.env.NEXT_PUBLIC_SITE_NAME
      ? process.env.NEXT_PUBLIC_SITE_NAME
      : "",
    id: process.env.NEXT_PUBLIC_GA_ID ? process.env.NEXT_PUBLIC_GA_ID : "",
    enabled: process.env.NEXT_PUBLIC_GA_ENABLED
      ? process.env.NEXT_PUBLIC_GA_ENABLED
      : false,
  });

  const pageRef = useRef(Component ? Component.name.toLowerCase() : null);

  const [theme, setTheme] = useState(false);

  const toggleTheme = (e) => {
    localStorage.setItem("theme", e);
    document.body.classList.add(e === "dark" ? "dark" : "light");
    document.body.classList.remove(e === "dark" ? "light" : "dark");
    setTheme(e);
  };

  /**
   * Check theme onLoad
   */
  const checkTheme = () => {
    const useSystemTheme = localStorage.getItem(
      `${process.env.NEXT_PUBLIC_SITE_NAME}_use-system-theme`
    );
    const theme = localStorage.getItem("theme");
    const payload = theme === null ? "dark" : theme;

    if (useSystemTheme === "true" || theme === null) {
      const getCurrentTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.body.classList.add(getCurrentTheme ? "dark" : "light");
      document.body.classList.remove(getCurrentTheme ? "light" : "dark");

      return setTheme(getCurrentTheme ? "dark" : "light");
    }

    document.body.classList.add(payload === "dark" ? "dark" : "light");
    document.body.classList.remove(payload === "dark" ? "light" : "dark");
    setTheme(payload);
  };

  // Trigger checkTheme
  useEffect(() => {
    checkTheme();
  }, []);

  return (
    <AnalyticsContext.Provider value={analytics}>
      <div className={`theme ${theme}`}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="author" content="Alex Collyer (acol248)" />
          <title>acol.dev</title>
          <meta
            name="description"
            content="A development website, by acol248 (github). A showcase of his work and skills; whilst also being somewhere to experiment, learn, and have fun."
          />
        </Head>

        <PageLoader isLoading={!theme} />
        <Navbar
          items={[
            { name: "Home", type: "internal", href: "/" },
            { name: "Development", type: "internal", href: "/development" },
          ]}
          theme={theme}
          themeChange={toggleTheme}
        />
        <Component {...pageProps} />

        <CookiesMessage
          page={pageRef.current}
          title="Privacy Policy"
          message={`We need to ask your permission to use cookies for usage analytics. To find out more about data that would be collected and how it is handled, click <a href='/privacy-policy' target='_blank'><u>here</u></a> or go to acol.dev/privacy-policy.`}
          websiteName="acol-dev"
        />
        <Footer setTheme={() => checkTheme()} />
      </div>
    </AnalyticsContext.Provider>
  );
}
