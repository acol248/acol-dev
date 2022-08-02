import { useRouter } from "next/router";
import Link from "next/link";

// styles
import styles from "./Navbar.module.scss";
import Icon from "./Navbar.icons";

export default function Navbar({ items, theme, themeChange, ...props }) {
  const handleThemeToggle = () => {
    themeChange(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar__items"]}>
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
        <button className={styles['navbar__theme-toggle']} onClick={handleThemeToggle}>
          {theme === "light" ? <Icon type="light" /> : <Icon type="dark" />}
        </button>
      </div>
    </nav>
  );
}
