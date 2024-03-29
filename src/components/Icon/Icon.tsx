"use client";

import { useMemo } from "react";
import type { IIcon } from "./Icon.interface";

export default function Icon({ type, ...props }: IIcon) {
  const icon = useMemo(() => {
    switch (type) {
      case "qr-code":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M26 42v-4h4v4Zm-4-4V28h4v10Zm16-6v-8h4v8Zm-4-8v-4h4v4Zm-24 4v-4h4v4Zm-4-4v-4h4v4Zm18-14V6h4v4ZM8.5 15.5h7v-7h-7ZM6 18V6h12v12Zm2.5 21.5h7v-7h-7ZM6 42V30h12v12Zm26.5-26.5h7v-7h-7ZM30 18V6h12v12Zm4 24v-6h-4v-4h8v6h4v4Zm-8-14v-4h8v4Zm-8 0v-4h-4v-4h12v4h-4v4Zm2-10v-8h4v4h4v4Zm-9.5-4.5v-3h3v3Zm0 24v-3h3v3Zm24-24v-3h3v3Z" />
          </svg>
        );
      default:
        return (
          <svg {...props} viewBox="0 0 24 24">
            <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
          </svg>
        );
    }
  }, [props, type]);

  return icon;
}
