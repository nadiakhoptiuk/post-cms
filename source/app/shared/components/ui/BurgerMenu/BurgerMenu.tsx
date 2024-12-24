import { Drawer } from "@mantine/core";

import { Logo } from "../Logo";

import { TBurgerMenu } from "./BurgerMenu.types";

export const BurgerMenu = ({
  opened,
  close,
  children,
  hiddenFrom = "xs",
}: TBurgerMenu) => {
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

          <Drawer.Body>{children}</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};
