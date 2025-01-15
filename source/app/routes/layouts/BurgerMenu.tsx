import { Drawer, Group } from "@mantine/core";
import { Logo } from "~/shared/components/ui/Logo";

import type { TLocale } from "~/shared/types/react";
import { AuthNav } from "./AuthNav";
import { LanguageSelector } from "~/shared/components/ui/LanguageSelector";

export const BurgerMenu = ({
  opened,
  close,
  locale,
  hiddenFrom = "xs",
}: {
  opened: boolean;
  close: () => void;
  locale: TLocale;
  hiddenFrom?: string;
}) => {
  return (
    <>
      <Drawer.Root
        opened={opened}
        onClose={close}
        padding="md"
        hiddenFrom={hiddenFrom}
        radius={0}
        zIndex={100}
        size="100%"
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Logo />

            <Drawer.CloseButton size="xl" />
          </Drawer.Header>

          <Drawer.Body>
            <Group p={20}>
              <AuthNav burgerMenu />
            </Group>

            <LanguageSelector
              locale={locale}
              styles={{
                root: {
                  width: "fit-content",
                  paddingLeft: "20px",
                  marginTop: "auto",
                },
              }}
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};
