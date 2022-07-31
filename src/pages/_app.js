import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import useTheme, { ThemeContext } from "../hooks/useTheme";

// styles
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const theme = useTheme();

  return (
    <ThemeContext.Provider value={theme}>
      <div className={theme.theme}>
        <Head>
          <title>acol.dev</title>
          <meta name="description" content="The website of a web developer. A showcase of his work and skills; whilst also being somewhere to experiment, learn, and have fun." />
        </Head>
        <Navbar
          items={[
            { name: "Home", type: "internal", href: "/" },
            {
              name: "Github",
              type: "external",
              href: "https://github.com/acol248",
            },
          ]}
        />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default MyApp;
