import { useTranslation } from "react-i18next";
import { Form, useRouteLoaderData } from "react-router";
import {
  AppShell,
  Box,
  Burger,
  Group,
  List,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";

import { Logo } from "../../../shared/components/ui/Logo";
import { LanguageSelector } from "../../../shared/components/ui/LanguageSelector/LanguageSelector";
import { NavBarLinksGroup } from "./NavBarLinksGroup";
import { Button } from "../../../shared/components/ui/Button";

import {
  DashboardNavLinks,
  NavigationLink,
} from "~/shared/constants/navigation";
import { DEFAULT_LANG } from "~/shared/constants/locale";
import type { TRootLoader } from "~/shared/.server/root/loader";
import type { WithChildren } from "~/shared/types/react";
import type { TDashboard } from "./types";

export const DashboardLayout = ({
  children,
  postsOnModeration,
  postsWithComplaints,
}: TDashboard & WithChildren) => {
  const data = useRouteLoaderData<TRootLoader>("root");
  const { t } = useTranslation("common");
  const [menuOpened, { toggle: toggleMenu }] = useDisclosure(false);

  const links = DashboardNavLinks.map((item) => (
    <NavBarLinksGroup
      item={item}
      key={item.id}
      postsOnModeration={postsOnModeration}
      postsWithComplaints={postsWithComplaints}
    />
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "xs",
        collapsed: { mobile: !menuOpened },
      }}
      p={{ base: "xs", sm: "xs", md: "md", xl: "lg" }}
    >
      <AppShell.Header mih={60} bg="blue.2">
        <Group h="100%" px="md">
          <Burger
            opened={menuOpened}
            onClick={toggleMenu}
            hiddenFrom="xs"
            aria-label={t("aria.toggleMenu")}
          />
          <Logo />

          <LanguageSelector locale={data?.locale || DEFAULT_LANG} ml="auto" />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" bg="blue.1">
        <ScrollArea>
          <Group>
            <List component="div" spacing="xs" w="100%">
              {links}
            </List>
          </Group>
        </ScrollArea>

        <Box pt="md" mt="auto">
          <Form action={NavigationLink.LOGOUT} method="post">
            <Tooltip label={t("auth.logout")}>
              <Button
                type="submit"
                c="gray.6"
                p="xs"
                justify="flex-start"
                variant="transparent"
                leftSection={
                  <IconLogout
                    size={22}
                    stroke={1.5}
                    style={{ marginRight: 10 }}
                  />
                }
              >
                {t("auth.logout")}
              </Button>
            </Tooltip>
          </Form>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
