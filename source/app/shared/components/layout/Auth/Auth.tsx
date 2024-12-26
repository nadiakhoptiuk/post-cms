import { useRouteLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Burger, Group, List, ListItem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { TRootLoader } from "~/shared/.server/root/loader";

import { Logo } from "../../ui/Logo";
import { BurgerMenu } from "../../ui/BurgerMenu";
import { RemixLink } from "../../ui/RemixLink";
import { LanguageSelector } from "../../ui/LanguageSelector";

import { WithChildren } from "~/shared/types/remix";
import { AuthNavLinks } from "~/shared/constants/navigation";
import { DEFAULT_LANG } from "~/shared/constants/locale";

import classes from "./Auth.module.css";

export function AuthLayout({ children }: WithChildren) {
  const data = useRouteLoaderData<TRootLoader>("root");
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

          <Group
            grow
            styles={{ root: { marginRight: "20px" } }}
            visibleFrom="xs"
          >
            <List className={classes.links}>{items}</List>
          </Group>

          <LanguageSelector
            locale={data?.locale || DEFAULT_LANG}
            styles={{ root: { flexShrink: 0 } }}
            visibleFrom="xs"
          />
        </div>
      </header>

      <BurgerMenu close={closeMenu} opened={menuOpened} hiddenFrom="xs">
        <Group p={20}>
          <List spacing={10} className={classes.menuLinks}>
            {items}
          </List>
        </Group>

        <LanguageSelector
          locale={data?.locale || DEFAULT_LANG}
          styles={{
            root: {
              width: "fit-content",
              paddingLeft: "20px",
              marginTop: "auto",
            },
          }}
        />
      </BurgerMenu>

      <main className="content">{children}</main>
    </>
  );
}
