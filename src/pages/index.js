// components

// styles
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles["container__inner"]}>
        <h1>
          Welcome to {' '}
          <span>acol.dev</span>
        </h1>
      </div>
    </div>
  );
}
