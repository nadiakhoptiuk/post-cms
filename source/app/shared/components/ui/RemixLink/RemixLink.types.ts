import { NavLinkProps } from "react-router";

export type TRemixLink = {
  children: React.ReactNode;
  variant?: "accent" | "unstyled" | "gray" | "dangerous";
  insideBox?: boolean;
  fullWidth?: boolean;
} & NavLinkProps;
