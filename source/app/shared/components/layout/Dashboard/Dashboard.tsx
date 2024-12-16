import { useTranslation } from "react-i18next";
import { NavLink } from "@remix-run/react";
import { Box, Group, ScrollArea } from "@mantine/core";

// import { Logo } from "../../ui/Logo";
// import { IconLogout } from "@tabler/icons-react";
import { LinksGroup } from "../NavBarLinksGroup";

import {
  DashboardNavLinks,
  NavigationLink,
} from "~/shared/constants/navigation";
import { WithChildren } from "~/shared/types/remix";

import classes from "./Dashboard.module.css";
import { Logo } from "../../ui/Logo";

export const DashboardLayout = ({ children }: WithChildren) => {
  const { t } = useTranslation("common");

  const links = DashboardNavLinks.map((item) => (
    <LinksGroup {...item} key={item.id} />
  ));

  return (
    <div>
      <aside>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <div className={classes.header}>
              <Group justify="space-between ">
                <Logo accent={false} />
              </Group>
            </div>

            <ScrollArea className={classes.links}>
              <Box className={classes.linksInner}>{links}</Box>
            </ScrollArea>
          </div>

          <div className={classes.footer}>
            <NavLink to={NavigationLink.LOGOUT} className={classes.link}>
              {t("auth.logout")}
            </NavLink>
          </div>
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
};
