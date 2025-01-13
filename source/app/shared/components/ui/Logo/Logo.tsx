import { Link } from "react-router";
import { NavLink, ThemeIcon } from "@mantine/core";
import { IconFloatNone } from "@tabler/icons-react";

import { NavigationLink } from "~/shared/constants/navigation";

import type { TLogo } from "./Logo.types";

export const Logo = ({ accent = true }: TLogo) => {
  return (
    <NavLink
      component={Link}
      to={NavigationLink.HOME}
      variant="subtle"
      label="POST CMS"
      leftSection={
        <ThemeIcon
          variant="gradient"
          size="lg"
          aria-label="Gradient action icon"
          gradient={
            accent
              ? { from: "blue", to: "cyan", deg: 245 }
              : { from: "gray", to: "white", deg: 90 }
          }
        >
          <IconFloatNone
            size={28}
            style={{ color: accent ? "white" : "white" }}
          />
        </ThemeIcon>
      }
      fw={900}
      fz="lg"
      td="none"
      w="fit-content"
      c="blue"
    />
  );
};
