import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

// components
import Button from "../Button/Button";

// styles
import styles from "./Navbar.module.scss";
import Icon from "./Navbar.icons";

export default function Navbar({ items, theme, themeChange, ...props }) {
  const handleThemeToggle = () => {
    themeChange(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar__links"]}>
        {items.map(({ name, href, type }, index) => {
          let out;

          if (type === "internal") {
            out = (
              <Link href={href} key={index}>
                <a className={styles["navbar__item"]}>{name}</a>
              </Link>
            );
          }

          if (type === "external") {
            out = (
              <a href={href} key={index} className={styles["navbar__item"]}>
                {name}
              </a>
            );
          }

          return out;
        })}
      </div>

      <div className={styles["navbar__items"]}>
        <button
          className={styles["navbar__theme-toggle"]}
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Icon type="light" /> : <Icon type="dark" />}
        </button>

        <a href="https://drive.google.com/file/d/1_fxqfuKwHhW-Sh7U9IWs4wHH3Rw6AZEK/view?usp=sharing">
          <Button>Résumé</Button>
        </a>
      </div>
    </nav>
  );
}
