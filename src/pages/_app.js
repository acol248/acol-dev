import Head from "next/head";
import { useEffect, useState } from "react";
import CookiesMessage from "../components/CookiesMessage/CookiesMessage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageLoader from "../components/PageLoader";

// hooks
import useAnalytics, { AnalyticsContext } from "../hooks/useAnalytics";

// styles
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const analytics = useAnalytics({
    siteName: "acol-dev",
    id: "",
    enabled: true,
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
    const theme = localStorage.getItem("theme");
    const payload = theme === null ? "dark" : theme;

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
        <Footer />
      </div>
    </AnalyticsContext.Provider>
  );
}
