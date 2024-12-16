import { Text } from "@mantine/core";
import { Link } from "@remix-run/react";
import { NavigationLink } from "~/shared/constants/navigation";
// import { IconFloatNone } from "@tabler/icons-react/dist/cjs/tabler-icons-react.cjs";

export const Logo = ({ accent = true }: { accent?: boolean }) => {
  return (
    <Link to={NavigationLink.HOME} style={{ textDecoration: "none" }}>
      {/* <ThemeIcon
        variant="gradient"
        size="xl"
        aria-label="Gradient action icon"
    
      > */}
      {/* <IconFloatNone size={28} style={{ color: accent ? "blue" : "white" }} /> */}
      <Text
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
