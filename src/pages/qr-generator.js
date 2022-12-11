import { useRef, useState } from "react";
import QRCode from "react-qr-code";

// components
import Input from "../interface/input";

// styles
import styles from "../styles/QRGenerator.module.scss";

export default function QRGenerator({ theme }) {
  const QRContentRef = useRef(null);

  const [qrValue, setQrValue] = useState("https://acol.dev");

  /**
   * Handle QR form submit
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container__inner"]}>
        <div className={styles["container__header"]}>
          <h2 className={styles["container__title"]}>QR Generator</h2>
        </div>

        <div className={styles["container__content"]}>
          <div className={styles["container__content-inner"]}>
            <p className={styles['container__content-description']}></p>

            <div className={styles['container__qr']}>
              <div className={styles["container__form-container"]}>
                <form
                  className={styles["container__form"]}
                  onSubmit={handleFormSubmit}
                >
                  <Input variant="invert" ref={QRContentRef}>
                    QR Text Data
                  </Input>
                </form>
              </div>

              <div className={styles["container__qr-container"]}>
                <QRCode
                  size={256}
                  bgColor={theme === "dark" ? "#eeeeee" : "#212121"}
                  fgColor={theme === "dark" ? "#212121" : "#eeeeee"}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={qrValue ? qrValue : "https://acol.dev"}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
