import { Text } from "@mantine/core";
import { Link } from "@remix-run/react";

import { NavigationLink } from "~/shared/constants/navigation";
import { TLogo } from "./Logo.types";
// import { IconFloatNone } from "@tabler/icons-react/dist/cjs/tabler-icons-react.cjs";

export const Logo = ({ accent = true, link }: TLogo) => {
  return (
    <Link to={link || NavigationLink.HOME} style={{ textDecoration: "none" }}>
      {/* <ThemeIcon
        variant="gradient"
        size="xl"
        aria-label="Gradient action icon"
    
      > */}
      {/* <IconFloatNone size={28} style={{ color: accent ? "blue" : "white" }} /> */}
      <Text
        component="span"
        size="xl"
        fw={900}
        variant="gradient"
        gradient={
          accent
            ? { from: "blue", to: "cyan", deg: 90 }
            : { from: "gray", to: "white", deg: 0 }
        }
      >
        POST CMS
      </Text>
      {/* </ThemeIcon> */}
    </Link>
  );
};
