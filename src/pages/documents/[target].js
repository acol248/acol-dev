import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import PageMedia from "../../components/PageMedia";

// components
import PageText from "../../components/PageText";

// styles
import styles from "../../styles/Documents.module.scss";

export default function Post() {
  const router = useRouter();
  const { target } = router.query;

  const [pageData, setPageData] = useState(null);
  const [querySuccess, setQuerySuccess] = useState(false);

  useEffect(() => {
    if (!target || pageData) return;

    (async () => {
      const request = await fetch(`/api/documents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          target: target,
        },
      });

      const result = await request.json();

      setPageData(result.body.data);
      setQuerySuccess(result.body?.found);
    })();
  }, [pageData, target]);

  return (
    <div className={styles["container"]}>
      <div className={styles["container__inner"]}>
        <div className={styles["container__header"]}>
          <h2 className={styles["container__title"]}>
            {querySuccess ? pageData.title : `'${target}' not found.`}
          </h2>
        </div>

        <div className={styles["container__content"]}>
          {pageData &&
            pageData.sections?.map(({ className, name, type, content }) => {
              let out;

              switch (type) {
                case "text":
                  out = (
                    <PageText
                      key={name + type}
                      className={className}
                      title={content.title}
                      subtitle={content.subtitle}
                      body={content.body}
                    />
                  );

                  break;
                case "video":
                  out = (
                    <PageMedia
                      key={name + type}
                      video={content.src}
                      title={content.title}
                      body={content.body}
                    />
                  );

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
