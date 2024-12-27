import { useRouteLoaderData } from "@remix-run/react";
import { Box, Burger, Group } from "@mantine/core";

import { TRootLoader } from "~/shared/.server/root/loader";

import { UserBar } from "../../ui/UserBar";
import { Logo } from "../../ui/Logo";

import { DEFAULT_LANG } from "~/shared/constants/locale";
import { THomeLayout } from "./Home.types";

import classes from "./Home.module.css";
import { AuthNav } from "../../ui/AuthNavLinks";
import { LanguageSelector } from "../../ui/LanguageSelector";
import { BurgerMenu } from "../../ui/BurgerMenu";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

export function Home({ children, user }: THomeLayout) {
  const data = useRouteLoaderData<TRootLoader>("root");
  const { t } = useTranslation(["common", "auth"]);
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] =
    useDisclosure(false);

  return (
    <>
      <header className={classes.header}>
        <Group className={classes.inner}>
          <Logo />

          <Burger
            opened={menuOpened}
            onClick={toggleMenu}
            hiddenFrom="xs"
            aria-label={t("aria.toggleMenu")}
          />

          {!user && (
            <Box display="flex" style={{ columnGap: 20 }} visibleFrom="xs">
              <AuthNav />
              <LanguageSelector
                locale={data?.locale || DEFAULT_LANG}
                styles={{
                  root: { width: "fit-content" },
                }}
              />
            </Box>
          )}

          {user && (
            <UserBar user={user} locale={data?.locale || DEFAULT_LANG} />
          )}
        </Group>

        <BurgerMenu close={closeMenu} opened={menuOpened} hiddenFrom="xs">
          <Group p={20}>
            <AuthNav burgerMenu />
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
      </header>

      <main className="content">{children}</main>
    </>
  );
}
