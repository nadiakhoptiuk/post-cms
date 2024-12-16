import { useTranslation } from "react-i18next";
import { NavLink } from "@remix-run/react";
import { Group, ScrollArea } from "@mantine/core";

// import { Logo } from "../../ui/Logo";
// import { IconLogout } from "@tabler/icons-react";
import { LinksGroup } from "../NavBarLinksGroup";

import {
  DashboardNavLinks,
  NavigationLink,
} from "~/shared/constants/navigation";
import { WithChildren } from "~/shared/types/remix";

import classes from "./Dashboard.module.css";

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
                {/* <Logo style={{ width: 120 }} /> */}
              </Group>
            </div>

            <ScrollArea className={classes.links}>
              <div className={classes.linksInner}>{links}</div>
            </ScrollArea>
          </div>

          <div className={classes.footer}>
            <NavLink
              to={NavigationLink.LOGOUT}
              className={({ isActive, isPending }) =>
                isPending
                  ? classes.linkPending
                  : isActive
                  ? classes.linkActive
                  : classes.link
              }
            >
              {t("auth.logout")}
            </NavLink>
          </div>
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
};
