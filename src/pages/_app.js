import Head from "next/head";
import CookiesMessage from "../components/CookiesMessage/CookiesMessage";
import Footer from "../components/Footer";
import LayoutManager from "../components/LayoutManager/LayoutManager";
import Navbar from "../components/Navbar";

// hooks
import useAnalytics, { AnalyticsContext } from "../hooks/useAnalytics";
import useTheme, { ThemeContext } from "../hooks/useTheme";

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
  const theme = useTheme();

  return (
    <ThemeContext.Provider value={theme}>
      <AnalyticsContext.Provider value={analytics}>
        <LayoutManager>
          <Head>
            <meta charSet="utf-8" />
            <meta name="author" content="Alex Collyer (acol248)" />
            <title>acol.dev</title>
            <meta
              name="description"
              content="A development website, by acol248 (github). A showcase of his work and skills; whilst also being somewhere to experiment, learn, and have fun."
            />
          </Head>

          <Navbar
            items={[
              { name: "About", type: "internal", href: "/about" },
              { name: "Projects", type: "internal", href: "/projects" },
            ]}
          />

          <Component {...pageProps} />

          <CookiesMessage
            title="Privacy Policy"
            message={`We need to ask your permission to use cookies for usage analytics. To find out more about data that would be collected and how it is handled, click <a href='/privacy-policy' target='_blank'><u>here</u></a> or go to acol.dev/privacy-policy.`}
            websiteName="acol-dev"
          />

          <Footer />
        </LayoutManager>
      </AnalyticsContext.Provider>
    </ThemeContext.Provider>
  );
}
