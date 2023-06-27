"use client";

// next
import Link from "next/link";

// styles
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__title-box"]}>
        <p className={styles["footer__site-title"]}>acol.dev</p>

        <Link href="/privacy-policy">Privacy Policy</Link>

        <p className={styles["footer__copyright"]}>acol.dev &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
