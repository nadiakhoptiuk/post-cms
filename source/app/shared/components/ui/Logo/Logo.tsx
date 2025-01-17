import { ThemeIcon } from "@mantine/core";
import { IconFloatNone } from "@tabler/icons-react";

import { NavigationLink } from "~/shared/constants/navigation";
import { StyledLink } from "../StyledLink";

import type { TLogo } from "./Logo.types";

export const Logo = ({ accent = true }: TLogo) => {
  return (
    <StyledLink
      to={NavigationLink.HOME}
      variant="transparent"
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
          <IconFloatNone size={28} color="white" />
        </ThemeIcon>
      }
      fw={900}
      fz="lg"
      td="none"
      w="fit-content"
      c="blue"
    >
      POST CMS
    </StyledLink>
  );
};
