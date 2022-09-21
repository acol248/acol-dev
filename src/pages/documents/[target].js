import { useRouter } from "next/router";

import styles from "../../styles/Documents.module.scss";

export default function Post() {
  const router = useRouter();
  const { target } = router.query;

  if (target) console.log(target);

  return (
    <div className={styles["container"]}>
      <div className={styles["container__inner"]}>
        <div className={styles["container__header"]}>
          <h2 className={styles["container__title"]}>{target}</h2>
        </div>
      </div>
    </div>
  );
}
