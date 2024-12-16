import { NavLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Group, List, ListItem } from "@mantine/core";

import { AuthNavLinks } from "~/shared/constants/navigation";

import { WithChildren } from "~/shared/types/remix";
import classes from "./Auth.module.css";
import { Logo } from "../../ui/Logo";

export function AuthLayout({ children }: WithChildren) {
  const { t } = useTranslation(["common", "auth"]);

  const items = AuthNavLinks.map(({ id, link }) => (
    <ListItem key={id}>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive ? classes.linkActive : classes.link
        }
      >
        {t(id)}
      </NavLink>
    </ListItem>
  ));

  return (
    <>
      <header className={classes.header}>
        <div className={classes.inner}>
          <Group>
            {/* <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" /> */}
            <Logo />
          </Group>

          <Group>
            <List visibleFrom="sm" className={classes.links}>
              {items}
            </List>
          </Group>
        </div>
      </header>

      <main className="content">{children}</main>
    </>
  );
}
