import { useTranslation } from "react-i18next";
import { Burger, Group, List, ListItem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Logo } from "../../ui/Logo";
import { BurgerMenu } from "../../ui/BurgerMenu";
import { RemixLink } from "../../ui/RemixLink";

import { WithChildren } from "~/shared/types/remix";
import { AuthNavLinks } from "~/shared/constants/navigation";

import classes from "./Auth.module.css";

export function AuthLayout({ children }: WithChildren) {
  const { t } = useTranslation(["common", "auth"]);
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] =
    useDisclosure(false);

  const items = AuthNavLinks.map(({ id, link }) => (
    <ListItem
      key={id}
      styles={{
        itemWrapper: { width: "100%" },
        itemLabel: { width: "100%" },
        item: { flexWrap: "nowrap" },
      }}
    >
      <RemixLink to={link} fullWidth>
        {t(id)}
      </RemixLink>
    </ListItem>
  ));

  return (
    <>
      <header className={classes.header}>
        <div className={classes.inner}>
          <Group className={classes.mobileInner}>
            <Logo />

            <Burger
              opened={menuOpened}
              onClick={toggleMenu}
              hiddenFrom="xs"
              aria-label={t("aria.toggleMenu")}
            />
          </Group>

          <Group grow>
            <List visibleFrom="xs" className={classes.links}>
              {items}
            </List>
          </Group>
        </div>
      </header>

      <BurgerMenu close={closeMenu} opened={menuOpened} hiddenFrom="xs">
        <Group p={20}>
          <List spacing={10} className={classes.menuLinks}>
            {items}
          </List>
        </Group>
      </BurgerMenu>

      <main className="content">{children}</main>
    </>
  );
}
