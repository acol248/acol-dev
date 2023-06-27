import { ReactNode } from "react";

export interface IModal {
  className?: string;
  variant?: string;
  children?: ReactNode;
  open: boolean;
  onClose: () => void;
  onTransitionEnd?: () => void;
  locked?: boolean;
  title?: string;
  noClose?: boolean;
}
