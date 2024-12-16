import { ThemeIcon, Title } from "@mantine/core";
import { IconFloatNone } from "@tabler/icons-react";

export const Logo = ({ accent = true }: { accent?: boolean }) => {
  // const theme = useMantineTheme();

  return (
    <ThemeIcon
      // variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      // gradient={
      //   lightBg
      //     ? { from: theme.colors.gray[10], to: theme.colors.blue[5], deg: 221 }
      //     : { from: theme.colors.white[0], to: theme.colors.gray[0], deg: 221 }
      // }
      // style={{ color: theme.colors.blue[0] }}
    >
      <IconFloatNone size={28} style={{ color: accent ? "blue" : "white" }} />
      <Title order={1}>POST CMS</Title>
    </ThemeIcon>
  );
};
