"use client";

// styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./InfoBubble.module.scss";
const mc = mapClassesCurried(maps, true);

// types
import type { ReactNode } from "react";

export interface InfoBubbleProps {
  className?: string;
  variant?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function InfoBubble({ className, variant, icon, children }: InfoBubbleProps) {
  const classList = useClassList({ defaultClass: "info-bubble", className, variant, maps, string: true });

  return (
    <div className={classList}>
      {icon} <span className={mc("info-bubble__body")}>{children}</span>
    </div>
  );
}
