import { useTranslation } from "react-i18next";
import { useRouteLoaderData } from "@remix-run/react";
import { AppShell, Burger, Group, List, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Logo } from "../../ui/Logo";
import { LinksGroup } from "../NavBarLinksGroup";
import { RemixLink } from "../../ui/RemixLink";

import {
  DashboardNavLinks,
  NavigationLink,
} from "~/shared/constants/navigation";
import { WithChildren } from "~/shared/types/remix";

import classes from "./Dashboard.module.css";
import { LanguageSelector } from "../../ui/LanguageSelector/LanguageSelector";

import { TRootLoader } from "~/shared/.server/root/loader";
import { DEFAULT_LANG } from "~/shared/constants/locale";

export const DashboardLayout = ({ children }: WithChildren) => {
  const data = useRouteLoaderData<TRootLoader>("root");
  const { t } = useTranslation("common");
  const [menuOpened, { toggle: toggleMenu }] = useDisclosure();

  const links = DashboardNavLinks.map((item) => (
    <LinksGroup {...item} key={item.id} />
  ));

  return (
    <div>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: "xs",
          collapsed: { mobile: !menuOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={menuOpened}
              onClick={toggleMenu}
              hiddenFrom="xs"
              aria-label={t("aria.toggleMenu")}
            />
            <Logo link={NavigationLink.DASHBOARD} />

            <LanguageSelector
              locale={data?.locale || DEFAULT_LANG}
              styles={{ root: { marginLeft: "auto" } }}
            />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <ScrollArea>
            <Group>
              <List spacing="xs" w="100%">
                {links}
              </List>
            </Group>
          </ScrollArea>

          <div className={classes.footer}>
            <RemixLink to={NavigationLink.LOGOUT} variant="gray" fullWidth>
              {t("auth.logout")}
            </RemixLink>
          </div>
        </AppShell.Navbar>

        <main className="content">{children}</main>
      </AppShell>
    </div>
  );
};
