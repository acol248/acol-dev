import { ReactNode } from "react";

export interface ISection {
  className?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}
