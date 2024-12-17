import { NavLink, NavLinkProps } from "@remix-run/react";

import classes from "./RemixLink.module.css";

export const RemixLink = ({
  to,
  children,
  variant = "unstyled",
  fullWidth = false,
  dangerous = false,
}: NavLinkProps & {
  children: React.ReactNode;
  variant?: "accent" | "unstyled" | "gray";
  insideBox?: boolean;
  fullWidth?: boolean;
  dangerous?: boolean;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        if (variant === "gray") {
          return classes.grayLink;
        }

        if (variant === "unstyled") {
          return isActive ? classes.unstyledActiveLink : classes.unstyledLink;
        }

        return isActive ? classes.accentActiveLink : classes.accentLink;
      }}
      style={
        fullWidth
          ? { width: "100%", color: dangerous ? "red" : "" }
          : { width: "max-content", color: dangerous ? "red" : "" }
      }
    >
      {children}
    </NavLink>
  );
};
