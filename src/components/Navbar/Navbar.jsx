import { useRouter } from "next/router";
import Link from "next/link";

// components
import ThemeToggle from "../ThemeToggle/ThemeToggle";

// styles
import styles from "./Navbar.module.scss";

export default function Navbar({ items, ...props }) {
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
        <ThemeToggle />
      </div>
    </nav>
  );
}
