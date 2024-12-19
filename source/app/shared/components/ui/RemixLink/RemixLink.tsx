import { NavLink, NavLinkProps } from "@remix-run/react";

import classes from "./RemixLink.module.css";

export const RemixLink = ({
  to,
  children,
  variant = "unstyled",
  fullWidth = false,
}: NavLinkProps & {
  children: React.ReactNode;
  variant?: "accent" | "unstyled" | "gray" | "dangerous";
  insideBox?: boolean;
  fullWidth?: boolean;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        if (variant === "gray") {
          return classes.grayLink;
        }

        if (variant === "dangerous") {
          return classes.dangerousLink;
        }

        if (variant === "unstyled") {
          return isActive ? classes.unstyledActiveLink : classes.unstyledLink;
        }

        return isActive ? classes.accentActiveLink : classes.accentLink;
      }}
      style={
        fullWidth
          ? {
              width: "100%",
              textWrap: "nowrap",
            }
          : {
              width: "max-content",
              textWrap: "nowrap",
            }
      }
    >
      {children}
    </NavLink>
  );
};
