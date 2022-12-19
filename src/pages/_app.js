import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageLoader from "../components/PageLoader";

// styles
import "../styles/globals.css";

function App({ Component, pageProps }) {
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
    <div className={`theme ${theme}`}>
      <Head>
        <meta charset="utf-8" />
        <meta name="author" content="Alex Collyer (acol248)" />
        <meta
          name="theme-color"
          content={theme === "dark" ? "#212121" : "#eeeeee"}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>acol.dev</title>
        <meta
          name="description"
          content="A development website, by acol248 (github). A showcase of his work and skills; whilst also being somewhere to experiment, learn, and have fun."
        />
      </Head>

      <PageLoader isLoading={!theme} />
      <Navbar
        items={[{ name: "Home", type: "internal", href: "/" }]}
        theme={theme}
        themeChange={toggleTheme}
      />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default App;
