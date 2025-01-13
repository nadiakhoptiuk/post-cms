import { useTranslation } from "react-i18next";
import { Form, useRouteLoaderData } from "react-router";
import { AppShell, Burger, Group, List, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";

import { Logo } from "../../ui/Logo";
import { LinksGroup } from "../../modules/NavBarLinksGroup";
import { LanguageSelector } from "../../ui/LanguageSelector/LanguageSelector";
import { Button } from "../../ui/Button";

import {
  DashboardNavLinks,
  NavigationLink,
} from "~/shared/constants/navigation";
import { DEFAULT_LANG } from "~/shared/constants/locale";
import type { TRootLoader } from "~/shared/.server/root/loader";
import type { WithChildren } from "~/shared/types/react";
import type { TDashboard } from "./Dashboard.types";
import classes from "./Dashboard.module.css";

export const DashboardLayout = ({
  children,
  postsOnModeration,
  postsWithComplaints,
}: TDashboard & WithChildren) => {
  const data = useRouteLoaderData<TRootLoader>("root");
  const { t } = useTranslation("common");
  const [menuOpened, { toggle: toggleMenu }] = useDisclosure(false);

  const links = DashboardNavLinks.map((item) => (
    <LinksGroup
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
      padding="md"
    >
      <AppShell.Header mih={61}>
        <Group h="100%" px="md">
          <Burger
            opened={menuOpened}
            onClick={toggleMenu}
            hiddenFrom="xs"
            aria-label={t("aria.toggleMenu")}
          />
          <Logo />

          <LanguageSelector
            locale={data?.locale || DEFAULT_LANG}
            styles={{ root: { marginLeft: "auto" } }}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" mt={1}>
        <ScrollArea>
          <Group>
            <List component="div" spacing="xs" w="100%">
              {links}
            </List>
          </Group>
        </ScrollArea>

        <div className={classes.footer}>
          <Form action={NavigationLink.LOGOUT} method="post">
            <Button
              type="submit"
              c="gray"
              styles={{
                root: { width: "100%", padding: "8px 12px" },
                inner: { justifyContent: "flex-start" },
              }}
              variant="transparent"
            >
              <IconLogout size={22} stroke={1.5} style={{ marginRight: 10 }} />
              {t("auth.logout")}
            </Button>
          </Form>
        </div>
      </AppShell.Navbar>

      <AppShell.Main className="content">{children}</AppShell.Main>
    </AppShell>
  );
};
