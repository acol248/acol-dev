import { useContext, useEffect, useState } from "react";

// next
import { useRouter } from "next/router";

// components
import Section from "../../components/Section";
import DetailedListBox from "../../components/DetailedListBox/DetailedListBox";

// hooks
import { AnalyticsContext } from "../../hooks/useAnalytics";

// styles
import styles from "../../styles/Projects.module.scss";

export default function Projects() {
  const { page, setPage } = useContext(AnalyticsContext);

  const [classList, setClassList] = useState("");

  const router = useRouter();

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["projects"]];

    setClassList(_classlist.join(" "));
  }, []);

  useEffect(() => {
    if (page === "projects") return;

    setPage("projects");
  }, [page, setPage]);

  return (
    <div className={classList}>
      <div className={styles["projects__header"]}>
        <h2 className={styles["projects__title"]}>Projects</h2>
      </div>

      <div className={styles["projects__content"]}>
        <Section>
          <div className={styles["projects__list"]}>
            <DetailedListBox
              variant="reverse"
              title="Expense"
              tags={[
                "React",
                "JavaScript",
                "TypeScript",
                "SCSS",
                "Frontend",
                "PWA",
              ]}
              icon="expense"
              status="Early Alpha Preview"
              onClick={() => router.push("/projects/expense")}
            >
              A React based PWA that helps the user to keep track of their
              monthly spending. Make note of your monthly outgoings, keep track
              of how much money should be taken and when. Keep finances under
              control.
            </DetailedListBox>

            <DetailedListBox
              variant="reverse"
              title="Basic QR Generator"
              tags={["React", "JavaScript", "SCSS", "Frontend"]}
              icon="qr"
              status="live"
              onClick={() => router.push("/projects/qr-generator")}
            >
              A web based QR code generator. Each QR code can be given a name
              and text content. The foreground and background colors of the QR
              code can be customised with hex color codes. The result can then
              be exported as either a JPG, PNG or SVG at any 1:1 dimensions
              (e.g. 1000x1000 or 8000x8000).
            </DetailedListBox>
          </div>
        </Section>
      </div>
    </div>
  );
}
