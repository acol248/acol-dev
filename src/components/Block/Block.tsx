"use client";

import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";

// types
import type { HTMLProps } from "react";

// styles
import maps from "./Block.module.scss";

const mc = mapClassesCurried(maps, true) as (a: string) => string;

interface IBlock extends HTMLProps<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export default function Block({ className, title, subtitle, children }: IBlock) {
  const classList = useClassList({ defaultClass: "block", className, maps, string: true }) as string;

  return (
    <div className={classList}>
      {(title || subtitle) && (
        <div className={mc("block__header")}>
          {title && <h2 className={mc("block__title")}>{title}</h2>}
          {subtitle && <h4 className={mc("block__subtitle")}>{subtitle}</h4>}
        </div>
      )}

      {children}
    </div>
  );
}
