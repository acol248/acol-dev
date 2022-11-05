// styles
import styles from "./Text.module.scss";

export default function Text({ className, title, subtitle, body }) {
  const [classlist, setClasslist] = useState("");

  // classlist
  useEffect(() => {
    const _classlist = [styles["text"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    setClasslist(_classlist.join(" "));
  }, [className]);

  return (
    <div className={classlist}>
      <div className={styles["text__header"]}>
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
      </div>

      <div
        className={styles["text__body"]}
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
    </div>
  );
}
