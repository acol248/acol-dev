import { useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import QRCode from "react-qr-code";

// components
import Input from "../interface/Input";
import Select from "../interface/Select";
import Button from "../interface/Button";
import Modal from "../components/Modal";

// styles
import styles from "../styles/QRGenerator.module.scss";

export default function QRGenerator() {
  const selectRef = useRef(null);
  const QRContentRef = useRef(null);
  const QRColorRef = useRef(null);

  const [exportOpen, setExportOpen] = useState(false);

  const [qrName, setQrName] = useState("");
  const [qrValue, setQrValue] = useState(null);
  const [colorValue, setColorValue] = useState("");

  const [qrFileType, setQrFileType] = useState("");
  const [qrSize, setQrSize] = useState("1000px");

  const handleDownloadSVG = () => {
    if (!qrFileType) return;

    const svgString = renderToStaticMarkup(
      <QRCode
        size={parseInt(qrSize)}
        bgColor="#ffffff"
        fgColor={colorValue ? colorValue : "#212121"}
        value={qrValue ? qrValue : "https://acol.dev"}
        viewBox={`0 0 ${parseInt(qrSize)} ${parseInt(qrSize)}`}
      />
    );

    let blob;
    let blobUrl;
    switch (qrFileType) {
      case "png":
        blob = new Blob([svgString], { type: "image/png" });
        blobUrl = URL.createObjectURL(blob);

        break;
      case "svg":
        blob = new Blob([svgString], { type: "image/svg+xml" });
        blobUrl = URL.createObjectURL(blob);

        break;
      default:
        console.error("qrFileType not recognised.");

        break;
    }

    if (!blobUrl) throw new Error("Blob generation failed.");

    const downloadEl = document.createElement("a");
    downloadEl.setAttribute("href", blobUrl);
    downloadEl.setAttribute("download", qrName ? qrName : "example");

    document.body.appendChild(downloadEl);
    downloadEl.click();
    document.body.removeChild(downloadEl);
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
                    placeholder="e.g. example"
                  >
                    Name
                  </Input>

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
        className={styles['modal']}
        title="Export"
        open={exportOpen}
        onClose={() => setExportOpen(false)}
      >
        <div className={styles['modal__inner']}>
          <Input
            value={qrSize}
            onChange={({ target }) => setQrSize(target.value)}
          ></Input>

          <Select
            selectedPayload={(e) => setQrFileType(e)}
            items={[
              { text: "PNG", payload: "png" },
              { text: "SVG", payload: "svg" },
            ]}
            ref={selectRef}
          ></Select>

          <Button variant="inverted" onClick={handleDownloadSVG}>
            Download
          </Button>
        </div>
      </Modal>
    </div>
  );
}
