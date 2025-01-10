import { NavLink } from "react-router";
import { Badge } from "@mantine/core";

import type { TStyledNavLink } from "./StyledNavLink.types";
import classes from "./StyledNavLink.module.css";

export const StyledNavLink = ({
  to,
  children,
  variant = "unstyled",
  fullWidth = false,
  withCount = false,
  count = 0,
  style,
}: TStyledNavLink) => {
  return (
    <NavLink
      to={to}
      end
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
              ...style,
            }
          : {
              width: "max-content",
              textWrap: "nowrap",
              ...style,
            }
      }
    >
      {children}

      {withCount && count > 0 && (
        <Badge size="md" circle ml="auto">
          {count}
        </Badge>
      )}
    </NavLink>
  );
};
