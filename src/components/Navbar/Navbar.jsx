import { useState } from "react";
import Link from "next/link";
import Router from "next/router";

// components
import Button from "../../interface/button";
import Modal from "../Modal";

// styles
import styles from "./Navbar.module.scss";
import Icon from "./Navbar.icons";
import { useEffect } from "react";

export default function Navbar({ items, theme, themeChange, ...props }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  /**
   * Handles theme toggle
   */
  const handleThemeToggle = () => {
    themeChange(theme === "dark" ? "light" : "dark");
  };

  // auto-close mobile nav on route change
  useEffect(() => {
    Router.events.on("routeChangeComplete", () => setMobileNavOpen(false));

    return () =>
      Router.events.off("routeChangeComplete", () => setMobileNavOpen(false));
  }, []);

  // sets isMobile to true if window width is less than 768px
  useEffect(() => {
    if (typeof window !== "undefined") {
      /**
       * IsMobile resize event listener
       */
      const handleIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      setIsMobile(window.innerWidth < 768);

      window.addEventListener("resize", handleIsMobile);

      return () => window.removeEventListener("resize", handleIsMobile);
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <Modal
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        className={styles["nav-menu"]}
        variant="nav-menu"
      >
        <div className={styles["nav-menu__container"]}>
          {items &&
            items.map(({ name, href, type, ...props }, index) => {
              let out;

              if (type === "internal")
                out = (
                  <Link href={href} key={index}>
                    <a className={styles["nav-menu__item"]}>{name}</a>
                  </Link>
                );

              if (type === "external")
                out = (
                  <a
                    href={href}
                    key={index}
                    className={styles["nav-menu__item"]}
                  >
                    {name}
                  </a>
                );

              return out;
            })}
        </div>
      </Modal>

      {isMobile && isMobile ? (
        <button
          onClick={() => setMobileNavOpen(true)}
          className={styles["navbar__menu-button"]}
        >
          <Icon type="menu" />
        </button>
      ) : (
        <div className={styles["navbar__links"]}>
          {items.map(({ name, href, type }, index) => {
            let out;

            if (type === "internal")
              out = (
                <Link href={href} key={index}>
                  <a className={styles["navbar__item"]}>{name}</a>
                </Link>
              );

            if (type === "external")
              out = (
                <a href={href} key={index} className={styles["navbar__item"]}>
                  {name}
                </a>
              );

            return out;
          })}
        </div>
      )}

      <div className={styles["navbar__items"]}>
        <button
          className={styles["navbar__theme-toggle"]}
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Icon type="light" /> : <Icon type="dark" />}
        </button>

        <div className={styles["navbar__items-divider"]}></div>

        <a className={styles["navbar__icon"]} href="https://github.com/acol248">
          <Icon type="github" />
        </a>

        <a
          className={styles["navbar__icon"]}
          href="https://www.linkedin.com/in/alex-collyer"
        >
          <Icon type="linkedin" />
        </a>

        <a
          className={styles["navbar__icon"]}
          target="_blank"
          rel="noreferrer"
          href="https://drive.google.com/file/d/1VBmGbFeAkBS8umXGFzi27iDj-_7WoyD3/view?usp=sharing"
        >
          <Icon type="paper" />
        </a>
      </div>
    </nav>
  );
}
