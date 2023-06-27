"use client";

import { useState, useEffect, useMemo, useContext } from "react";

// next
import Link from "next/link";
import Router from "next/router";

// hooks
import { ThemeContext } from "../ThemeWrapper/ThemeWrapper";

// components
import Icon from "./Navbar.icons";
import Modal from "../Modal";

// styles
import styles from "./Navbar.module.scss";

// types
import type { INavbar } from "./Navbar.interface";

export default function Navbar({ className, items, ...props }: INavbar) {
  const { themeState, toggleTheme } = useContext(ThemeContext);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const classList = useMemo(() => {
    const _classlist = [styles["navbar"]];

    if (scrolled) _classlist.push(styles["navbar--scroll"]);

    return _classlist.join(" ");
  }, [scrolled]);

  // auto-close mobile nav on route change
  useEffect(() => {
    Router.events.on("routeChangeComplete", () => setMobileNavOpen(false));

    return () => Router.events.off("routeChangeComplete", () => setMobileNavOpen(false));
  }, []);

  // scroll detection
  useEffect(() => {
    if (!window) return;

    const handleScroll = () => {
      const { scrollY } = window;

      if (scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
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
    <nav className={classList}>
      <Modal
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        className={styles["nav-menu"]}
        variant="nav-menu"
      >
        <div className={styles["nav-menu__container"]}>
          <div className={styles["nav-menu__logo"]}>
            <Link href="/">acol.dev</Link>
          </div>

          <div className={styles["nav-menu__items"]}>
            {items &&
              items.map(({ name, href, type, ...props }, index) => {
                let out;

                if (type === "internal")
                  out = (
                    <Link href={href} key={index}>
                      {name}
                    </Link>
                  );

                if (type === "external")
                  out = (
                    <a href={href} key={index} className={styles["nav-menu__item"]}>
                      {name}
                    </a>
                  );

                return out;
              })}
          </div>
        </div>
      </Modal>

      <div className={styles["navbar__items"]}>
        {isMobile ? (
          <>
            <button onClick={() => setMobileNavOpen(true)} className={styles["navbar__menu-button"]}>
              <Icon type="menu" />
            </button>
          </>
        ) : (
          <>
            <div className={styles["navbar__logo"]}>
              <Link href="/">acol.dev</Link>
            </div>

            <div className={styles["navbar__items-divider"]}></div>

            <div className={styles["navbar__links"]}>
              {items.map(({ name, href, type }, index) => {
                let out;

                if (type === "internal")
                  out = (
                    <Link href={href} key={index}>
                      {name}
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
          </>
        )}
      </div>

      <div className={styles["navbar__items"]}>
        <button className={styles["navbar__theme-toggle"]} onClick={toggleTheme} aria-label="Toggle theme">
          {themeState === "light" ? <Icon type="light" /> : <Icon type="dark" />}
        </button>

        <div className={styles["navbar__items-divider"]}></div>

        <div className={styles["navbar__icons"]}>
          <a className={styles["navbar__icon"]} target="_blank" rel="noreferrer" href="https://github.com/acol248">
            <Icon type="github" />
          </a>

          <a
            className={styles["navbar__icon"]}
            target="_blank"
            rel="noreferrer"
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
      </div>
    </nav>
  );
}
