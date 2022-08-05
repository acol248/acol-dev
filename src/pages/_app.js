import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageLoader from "../components/PageLoader";

// styles
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(false);

  const checkTheme = () => {
    const theme = localStorage.getItem("theme");
    const payload = theme === null ? "dark" : theme;

    document.documentElement.classList.toggle(payload);
    setTheme(payload);
  };

  useEffect(() => {
    checkTheme();
  }, []);

  return (
    <div className={`theme ${theme}`}>
      <Head>
        <title>acol.dev</title>
        <meta
          name="description"
          content="The website of a web developer. A showcase of his work and skills; whilst also being somewhere to experiment, learn, and have fun."
        />
      </Head>

      <PageLoader isLoading={!theme} />
      <Navbar
        items={[
          { name: "Home", type: "internal", href: "/" },
          {
            name: "Github",
            type: "external",
            href: "https://github.com/acol248",
          },
        ]}
        theme={theme}
        themeChange={(e) => {
          setTheme(e);
          localStorage.setItem("theme", e);
        }}
      />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default App;
