import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import styles from "../../styles/Documents.module.scss";

export default function Post() {
  const router = useRouter();
  const { target } = router.query;

  const pageData = useRef(null);

  const [querySuccess, setQuerySuccess] = useState(false);

  useEffect(() => {
    if (!target) return;

    (async () => {
      const request = await fetch(`/api/documents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          target: target,
        },
      });

      const result = await request.json();
      pageData.current = result.content;
      setQuerySuccess(() => pageData.current?.found);

      console.log(pageData.current);
    })();
  }, [target]);

  return (
    <div className={styles["container"]}>
      <div className={styles["container__inner"]}>
        <div className={styles["container__header"]}>
          <h2 className={styles["container__title"]}>
            {querySuccess ? pageData.current?.title : `'${target}' not found.`}
          </h2>
        </div>

        <div className={styles["container__content"]}>
          {pageData.current &&
            pageData.current.sections.map(({ title, type, content }) => {
              let out;

              switch (type) {
                case 'text':
                  break;
                default:
                  break;
              }

              return out;
            })}
        </div>
      </div>
    </div>
  );
}
