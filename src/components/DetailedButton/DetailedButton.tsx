"use client";

import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";

// styles
import maps from "./DetailedButton.module.scss";
import { HTMLProps, ReactNode } from "react";

const mc = mapClassesCurried(maps, true) as (a: string) => string;

interface IDetailedButton extends HTMLProps<HTMLButtonElement> {
  varian?: string;
  tags?: string[];
  ident?: ReactNode;
}

export default function DetailedButton({ className, variant, ident, tags = [], children }: IDetailedButton) {
  const classList = useClassList({ defaultClass: "detailed-button", className, variant, maps, string: true }) as string;

  return (
    <button className={classList}>
      {ident && <div className={mc("detailed-button__ident")}>{ident}</div>}
      <div className={mc("detailed-button__content")}>
        {children}

        <div className={mc("detailed-button__tags")}>
          {Boolean(tags.length > 0) &&
            tags.map((tag, index) => (
              <span className={mc("detailed-button__tag")} key={tag + index}>
                {tag}
              </span>
            ))}
        </div>
      </div>
    </button>
  );
}
