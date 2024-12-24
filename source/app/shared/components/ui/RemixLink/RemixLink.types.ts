import { NavLinkProps } from "@remix-run/react";

export type TRemixLink = {
  children: React.ReactNode;
  variant?: "accent" | "unstyled" | "gray" | "dangerous";
  insideBox?: boolean;
  fullWidth?: boolean;
} & NavLinkProps;
