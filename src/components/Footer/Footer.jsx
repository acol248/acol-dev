// styles
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer__title-box']}>
        <p className={styles['footer__site-title']}>acol.dev</p>
        <p className={styles['footer__copyright']}>acol.dev &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
