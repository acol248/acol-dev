import { useContext, useEffect, useState } from "react";

// next
import Link from "next/link";

// components
import Section from "../components/Section";

// hooks
import { AnalyticsContext } from "../hooks/useAnalytics";

// styles
import styles from "../styles/Snippets.module.scss";
import Card from "../components/Card/Card";

export default function Snippets({ fiddleItems }) {
  const { page, setPage } = useContext(AnalyticsContext);

  const [classList, setClassList] = useState("");

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["snippets"]];

    setClassList(_classlist.join(" "));
  }, []);

  // analytics stuff
  useEffect(() => {
    if (page === "snippets") return;

    setPage("snippets");
  }, [page, setPage]);

  return (
    <div className={classList}>
      <div className={styles["snippets__header"]}>
        <h2 className={styles["snippets__title"]}>Snippets</h2>
      </div>

      <div className={styles["snippets__content"]}>
        <Section
          title="JSFiddle"
          subtitle="A live preview of each time I mess around with code"
        >
          {fiddleItems && fiddleItems.length ? (
            <div className={styles["snippets__card-list"]}>
              {fiddleItems.map(({ title, description, url, created }) => (
                <Card
                  key={url + created}
                  title={title || "Untitled"}
                  href={url}
                  previewURL={url + "/embedded/result"}
                >
                  {description || "..."}
                </Card>
              ))}
            </div>
          ) : (
            <div>Nothing to see here...</div>
          )}
        </Section>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const jsFiddleRes = await fetch(
    "https://jsfiddle.net/api/user/acol248/demo/list.json"
  ).then((res) => res.json());

  return { props: { fiddleItems: jsFiddleRes } };
}
