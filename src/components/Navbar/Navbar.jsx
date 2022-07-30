import { useRouter } from "next/router";
import Link from "next/link";

// styles
import styles from "./Navbar.module.scss";

export default function Navbar({ items, ...props }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar__items"]}>
        {items.map((item, index) => (
          <Link key={index} href={item.href}>
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
