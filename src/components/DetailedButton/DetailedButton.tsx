"use client";

// styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./DetailedButton.module.scss";
const mc = mapClassesCurried(maps, true) as (a: string) => string;

// types
import type { HTMLProps, ReactNode } from "react";
interface IDetailedButton extends HTMLProps<HTMLButtonElement> {
  variant?: string;
  tags?: string[];
  ident?: ReactNode;
  body: string;
}

export default function DetailedButton({
  className,
  variant,
  ident,
  tags = [],
  body,
  onClick,
}: IDetailedButton) {
  const classList = useClassList({ defaultClass: "detailed-button", className, variant, maps, string: true }) as string;

  return (
    <button className={classList} onClick={onClick} type="button">
      {ident && <div className={mc("detailed-button__ident")}>{ident}</div>}
      <div className={mc("detailed-button__content")}>
        <p className={mc('detailed-button__body')}>{body}</p>

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
