import { ReactNode } from "react";

export interface IInfoBubble {
  className?: string;
  variant?: string;
  icon?: ReactNode;
  children: ReactNode;
}
