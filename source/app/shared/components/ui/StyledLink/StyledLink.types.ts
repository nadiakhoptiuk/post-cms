import { LinkProps } from "@remix-run/react";

export interface TStyledLink extends LinkProps {
  children: React.ReactNode;
  variant?: "accent" | "unstyled";
}
