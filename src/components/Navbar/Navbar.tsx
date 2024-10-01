"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import Icon from "./Navbar.icons";
import Modal from "../Modal";
import Button from "@/interface/Button";
import ThemeToggle from "../ThemeToggle";

// styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./Navbar.module.scss";
const mc = mapClassesCurried(maps, true) as (c: string) => string;

// types
import type { INavbar } from "./Navbar.interface";

export default function Navbar({ className, items }: INavbar) {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const classList = useClassList(
    { defaultClass: "navbar", className, maps, string: true },
    useCallback(
      (c: string[]) => {
        scrolled && c.push("navbar--scroll");
      },
      [scrolled]
    )
  ) as string;

  const handleRouteChange = (href: string) => {
    router.push(href);
    setMobileNavOpen(false);
  };

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

    handleScroll();

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
      <Modal open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} className={mc("nav-menu")} variant="nav-menu">
        <div className={mc("nav-menu__container")}>
          <a className={mc("nav-menu__logo")} onClick={() => handleRouteChange("/")}>
            <span>acol.dev</span>
          </a>

          <div className={mc("nav-menu__items")}>
            {items &&
              items.map(({ name, href, type, ...props }, index) => {
                let out;

                if (type === "internal")
                  out = (
                    <Button
                      className={mc("nav-menu__button")}
                      variant="tertiary"
                      onClick={() => handleRouteChange(href)}
                      key={index}
                    >
                      {name}
                    </Button>
                  );

                if (type === "external")
                  out = (
                    <a href={href} key={index} className={mc("nav-menu__item")}>
                      {name}
                    </a>
                  );

                return out;
              })}
          </div>
        </div>
      </Modal>

      <div className={mc("navbar__inner")}>
        <div className={mc("navbar__items")}>
          {isMobile ? (
            <>
              <button onClick={() => setMobileNavOpen(true)} className={mc("navbar__menu-button")}>
                <Icon type="menu" />
              </button>
            </>
          ) : (
            <>
              <div className={mc("navbar__logo")}>
                <Link href="#home">acol.dev</Link>
              </div>

              <div className={mc("navbar__items-divider")}></div>

              <div className={mc("navbar__links")}>
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
                      <a href={href} key={index} className={mc("navbar__item")}>
                        {name}
                      </a>
                    );

                  return out;
                })}
              </div>
            </>
          )}
        </div>

        <div className={mc("navbar__items")}>
          <ThemeToggle className={mc("navbar__theme-toggle")} />

          <div className={mc("navbar__items-divider")} />

          <div className={mc("navbar__icons")}>
            <a className={mc("navbar__icon")} target="_blank" rel="noreferrer" href="https://github.com/acol248">
              <Icon type="github" />
            </a>

            <a
              className={mc("navbar__icon")}
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/alex-collyer"
            >
              <Icon type="linkedin" />
            </a>

            <a
              className={mc("navbar__icon")}
              target="_blank"
              rel="noreferrer"
              href="https://drive.google.com/file/d/1_JbUgNYxCRgX61-WWCtFmRy8YBCclVmK/view?usp=sharing"
            >
              <Icon type="paper" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
