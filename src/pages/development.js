// components
import Card from "../components/Card/Card";

// styles
import styles from "../styles/Development.module.scss";

// data
import cardsData from "../data/development/cards.static.json";

export default function Development() {
  return (
    <div className={styles["container"]}>
      <div className={styles["container__inner"]}>
        <div className={styles["container__header"]}>
          <h2 className={styles["container__title"]}>Development</h2>
          <p className={styles["container__body"]}>
            I have worked on a wide range of projects throughout my career as a
            developer. Below will be a range of projects I have worked on either
            personally or that I can show from my employment.
          </p>
        </div>

        <div className={styles["container__content"]}>
          <div className={styles["container__cards"]}>
            {cardsData?.cards.map(({ title, body, buttons }) => (
              <Card
                key={title + body}
                title={title}
                body={body}
                buttons={buttons}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
