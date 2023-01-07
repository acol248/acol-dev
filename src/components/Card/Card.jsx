import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./Card.module.scss";

export default function Card({
  className,
  variant,
  headerImage,
  title,
  body,
  buttons,
  ...props
}) {
  const [classlist, setClasslist] = useState("");

  const handleButtonClick = () => {
    console.log("click!");
  };

  // classlist and variant
  useEffect(() => {
    const _classlist = [styles["card"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    if (variant)
      for (const item of variant.split(" "))
        _classlist.push(styles[`card--${item}`]);

    if (headerImage) _classlist.push(styles["card--header"]);

    setClasslist(_classlist.join(" "));
  }, [className, headerImage, variant]);

  return (
    <div
      className={classlist}
      style={{ backgroundImage: `url(${headerImage})` }}
      aria-label="card"
    >
      <div className={styles["card__inner"]}>
        <h2 className={styles["card__title"]}>{title}</h2>
        <p
          className={styles["card__body"]}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className={styles["card__buttons"]}>
          {buttons &&
            buttons.map(({ label, variant }) => (
              <button
                key={label}
                className={`${styles["card__button"]} ${
                  variant ? styles[`card__button--${variant}`] : ""
                }`}
                onClick={handleButtonClick}
              >
                {label}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  headerImage: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.object),
};
