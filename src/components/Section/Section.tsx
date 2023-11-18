"use client";

import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";

// types
import type { HTMLProps } from "react";

// styles
import maps from "./Section.module.scss";

const mc = mapClassesCurried(maps, true) as (a: string) => string;

interface ISection extends HTMLProps<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export default function Section({ className, title, subtitle, children }: ISection) {
  const classList = useClassList({ defaultClass: "section", className, maps, string: true }) as string;

  return (
    <div className={classList}>
      {(title || subtitle) && (
        <div className={mc("section__header")}>
          {title && <h2 className={mc("section__title")}>{title}</h2>}
          {subtitle && <h4 className={mc("section__subtitle")}>{subtitle}</h4>}
        </div>
      )}

      {children}
    </div>
  );
}
