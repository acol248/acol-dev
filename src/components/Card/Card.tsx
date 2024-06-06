/* eslint-disable @next/next/no-img-element */
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./Card.module.scss";
const mc = mapClassesCurried(maps, true) as (c: string) => string;

// types
import { HTMLProps } from "react";

interface ICard extends HTMLProps<HTMLDivElement> {
  variant?: string;
  title?: string;
  img?: string;
}

export default function Card({ className, variant, title, children, img }: ICard) {
  const classList = useClassList({ defaultClass: "card", className, variant, maps, string: true }) as string;

  return (
    <div className={classList}>
      <div className={mc("card__left")}>{children}</div>

      <img className={mc("card__right")} src={img} alt={`${title} visual aid`} />
    </div>
  );
}
