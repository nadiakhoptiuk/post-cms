import { NavLink } from "react-router";

import type { TStyledNavLink } from "./StyledNavLink.types";
import classes from "./StyledNavLink.module.css";
import { Box } from "@mantine/core";

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
        <Box
          component="span"
          bg="cyan"
          c="white"
          style={{
            marginLeft: "auto",
            borderRadius: "100%",
            padding: 4,
            minHeight: 24,
            minWidth: 24,
            textAlign: "center",
          }}
        >
          {count}
        </Box>
      )}
    </NavLink>
  );
};
