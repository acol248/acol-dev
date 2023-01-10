import { useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import QRCode from "react-qr-code";

// components
import Input from "../../interface/Input";
import Select from "../../interface/Select";
import Button from "../../interface/Button";
import Checkbox from "../../interface/Checkbox";
import Modal from "../../components/Modal";

// styles
import styles from "../../styles/QRGenerator.module.scss";

export default function QRGenerator() {
  const selectRef = useRef(null);

  const QRNameRef = useRef(null);
  const QRContentRef = useRef(null);
  const QRForegroundColorRef = useRef(null);
  const QRBackgroundColorRef = useRef(null);
  const QRBackgroundTransparentRef = useRef(null);

  const [modalError, setModalError] = useState(null);

  const [exportOpen, setExportOpen] = useState(false);

  const [qrName, setQrName] = useState("");
  const [qrValue, setQrValue] = useState(null);
  const [foregroundColorValue, setForegroundColorValue] = useState("");
  const [backgroundColorValue, setBackgroundColorValue] = useState("");
  const [transparentBackgroundChecked, setTransparentBackgroundChecked] =
    useState(false);

  const [qrFileType, setQrFileType] = useState("");
  const [qrSize, setQrSize] = useState("1000px");

  const handleDownloadSVG = () => {
    if (!qrFileType) return;

    const svgString = renderToStaticMarkup(
      <QRCode
        size={parseInt(qrSize)}
        bgColor={
          transparentBackgroundChecked
            ? "transparent"
            : backgroundColorValue
            ? backgroundColorValue
            : "#ffffff"
        }
        fgColor={foregroundColorValue ? foregroundColorValue : "#212121"}
        value={qrValue ? qrValue : "https://acol.dev"}
        viewBox={`0 0 ${parseInt(qrSize)} ${parseInt(qrSize)}`}
      />
    );

    /**
     * Convert SVG string to desired image format and download
     *
     * @param {string} fileType image file type desired
     */
    const handleImageConversion = (fileType) => {
      const size = parseInt(qrSize);

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      const DOMURL = window.URL || window.webkitURL || window;

      const img = new Image();
      const svg = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = DOMURL.createObjectURL(svg);

      img.onload = function () {
        ctx.drawImage(img, 0, 0, size, size);
        const file = canvas.toDataURL(`image/${fileType}`);

        const downloadEl = document.createElement("a");
        downloadEl.setAttribute("href", file);
        downloadEl.setAttribute(
          "download",
          qrName ? `${qrName}.${fileType}` : `example.${fileType}`
        );
        downloadEl.click();

        DOMURL.revokeObjectURL(file);
      };

      img.src = url;
    };

    switch (qrFileType) {
      case "png":
        handleImageConversion(qrFileType);

        break;
      case "jpeg":
        handleImageConversion(qrFileType);

        break;
      case "svg":
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const blobUrl = URL.createObjectURL(blob);

        if (!blobUrl) throw new Error("Blob generation failed.");

        const downloadElSVG = document.createElement("a");
        downloadElSVG.setAttribute("href", blobUrl);
        downloadElSVG.setAttribute("download", qrName ? qrName : "example");
        downloadElSVG.click();

        break;
      default:
        console.error("qrFileType not recognised.");

        break;
    }
  };

  useEffect(() => {
    setModalError(null);

    if (transparentBackgroundChecked && qrFileType === "jpeg")
      setModalError("Transparency is not supported using JPEG file type.");
  }, [qrFileType, transparentBackgroundChecked]);

  return (
    <div className={styles["qr-generator"]}>
      <div className={styles["qr-generator__inner"]}>
        <div className={styles["qr-generator__header"]}>
          <h2 className={styles["qr-generator__title"]}>QR Generator</h2>
        </div>

        <div className={styles["qr-generator__content"]}>
          <div className={styles["qr-generator__content-inner"]}>
            <p className={styles["qr-generator__content-description"]}>
              Fill out the below fields to customise your QR code. Watch it
              change as you update the configuration.
            </p>

            <div className={styles["qr-generator__qr"]}>
              <div className={styles["qr-generator__input-container"]}>
                <div className={styles["qr-generator__inputs"]}>
                  <Input
                    ref={QRNameRef}
                    value={qrName}
                    onChange={({ target }) => setQrName(target.value)}
                    placeholder="e.g. example"
                  >
                    Name
                  </Input>

                  <Input
                    ref={QRContentRef}
                    value={qrValue}
                    onChange={({ target }) => setQrValue(target.value)}
                    placeholder="e.g. https://www.acol.dev/"
                  >
                    Content
                  </Input>

                  <Input
                    ref={QRForegroundColorRef}
                    value={foregroundColorValue}
                    onChange={({ target }) =>
                      setForegroundColorValue(target.value)
                    }
                    placeholder="e.g. #212121"
                  >
                    Foreground Color
                  </Input>

                  <Input
                    ref={QRBackgroundColorRef}
                    value={backgroundColorValue}
                    onChange={({ target }) =>
                      setBackgroundColorValue(target.value)
                    }
                    placeholder="e.g. #212121"
                  >
                    Background Color
                  </Input>

                  <Checkbox
                    variant="inverted"
                    ref={QRBackgroundTransparentRef}
                    onChange={({ target }) =>
                      setTransparentBackgroundChecked(target.checked)
                    }
                  >
                    Transparent background
                  </Checkbox>
                </div>

                <Button onClick={() => setExportOpen(true)}>Export</Button>
              </div>

              <div className={styles["qr-generator__qr-container"]}>
                <div
                  className={styles["qr-generator__container-inner"]}
                  style={{
                    backgroundColor: backgroundColorValue
                      ? backgroundColorValue
                      : "#ffffff",
                  }}
                >
                  <QRCode
                    size={320}
                    bgColor={
                      backgroundColorValue ? backgroundColorValue : "#ffffff"
                    }
                    fgColor={
                      foregroundColorValue ? foregroundColorValue : "#212121"
                    }
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={qrValue ? qrValue : "https://acol.dev"}
                    viewBox={`0 0 320 320`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className={styles["modal"]}
        title="Export"
        open={exportOpen}
        onClose={() => setExportOpen(false)}
      >
        <div className={styles["modal__inner"]}>
          <Input
            value={qrSize}
            onChange={({ target }) => setQrSize(target.value)}
          ></Input>

          <Select
            selectedPayload={(e) => setQrFileType(e)}
            items={[
              { text: "PNG", payload: "png" },
              { text: "JPEG", payload: "jpeg" },
              { text: "SVG", payload: "svg" },
            ]}
            ref={selectRef}
          ></Select>

          {modalError !== null && (
            <span className={styles["modal__error"]}>{modalError}</span>
          )}

          <Button onClick={handleDownloadSVG}>Download</Button>
        </div>
      </Modal>
    </div>
  );
}
