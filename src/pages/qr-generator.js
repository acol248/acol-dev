import { useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import QRCode from "react-qr-code";

// components
import Input from "../interface/input";
import Button from "../interface/button";
import Modal from "../components/Modal";

// styles
import styles from "../styles/QRGenerator.module.scss";

export default function QRGenerator() {
  const QRContentRef = useRef(null);
  const QRColorRef = useRef(null);

  const [exportOpen, setExportOpen] = useState(false);

  const [qrValue, setQrValue] = useState("");
  const [colorValue, setColorValue] = useState("");

  const [qrSize, setQrSize] = useState("1000px");

  const handleDownloadSVG = () => {
    const svgString = renderToStaticMarkup(
      <QRCode
        size={parseInt(qrSize)}
        bgColor="#f5f5f5"
        fgColor={colorValue ? colorValue : "#212121"}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={qrValue ? qrValue : "https://acol.dev"}
        viewBox={`0 0 256 256`}
      />
    );

    console.log(svgString);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container__inner"]}>
        <div className={styles["container__header"]}>
          <h2 className={styles["container__title"]}>QR Generator</h2>
        </div>

        <div className={styles["container__content"]}>
          <div className={styles["container__content-inner"]}>
            <p className={styles["container__content-description"]}>
              Fill out the below fields to customise your QR code. Watch it
              change as you type.
            </p>

            <div className={styles["container__qr"]}>
              <div className={styles["container__input-container"]}>
                <div className={styles["container__inputs"]}>
                  <Input
                    variant="hold-dark"
                    ref={QRContentRef}
                    value={qrValue}
                    onChange={({ target }) => setQrValue(target.value)}
                    placeholder="e.g. https://www.acol.dev/"
                  >
                    Content
                  </Input>

                  <Input
                    variant="hold-dark"
                    ref={QRColorRef}
                    value={colorValue}
                    onChange={({ target }) => setColorValue(target.value)}
                    placeholder="e.g. #212121"
                  >
                    Color
                  </Input>
                </div>

                <Button variant="hold-dark" onClick={() => setExportOpen(true)}>
                  Export
                </Button>
              </div>

              <div className={styles["container__qr-container"]}>
                <QRCode
                  size={256}
                  bgColor="#f5f5f5"
                  fgColor={colorValue ? colorValue : "#212121"}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={qrValue ? qrValue : "https://acol.dev"}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Export"
        open={exportOpen}
        onClose={() => setExportOpen(false)}
      >
        <Input
          value={qrSize}
          onChange={({ target }) => setQrSize(target.value)}
        ></Input>

        <Button variant="inverted" onClick={handleDownloadSVG}>Download SVG</Button>
      </Modal>
    </div>
  );
}
