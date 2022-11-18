import { useState, useEffect } from "react";

// components
import Video from "../Video";

// styles
import styles from "./PageMedia.module.scss";

export default function PageMedia({ className, video, title, body }) {
  const [classlist, setClasslist] = useState("");

  useEffect(() => {
    const _classlist = [styles["text"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    setClasslist(_classlist.join(" "));
  }, [className]);

  return (
    <div className={classlist}>
      <Video
        className={styles["page-media__video"]}
        sources={[{ src: video.src, type: 'video/mp4' }]}
      />

      <div className={styles["page-media__body"]}>
        <h2 className={styles["page-media__title"]}>{title}</h2>
        <p className={styles["page-media__text"]}>{body}</p>
      </div>
    </div>
  );
}
