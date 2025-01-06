import type { LinkProps } from "react-router";

export interface TStyledLink extends LinkProps {
  children: React.ReactNode;
  fill?: "outline" | "filled";
  variant?: "accent" | "unstyled";
}
