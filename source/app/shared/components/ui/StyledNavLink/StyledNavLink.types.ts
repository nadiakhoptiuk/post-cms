import type { NavLinkProps } from "react-router";

export type TStyledNavLink = {
  children: React.ReactNode;
  withCount?: boolean;
  count?: number;
} & NavLinkProps;
