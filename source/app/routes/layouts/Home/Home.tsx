import { useRouteLoaderData } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { Box, Burger, Flex, Group } from "@mantine/core";

import type { TRootLoader } from "~/shared/.server/root/loader";

import { UserBar } from "../../../shared/components/ui/UserBar";
import { Logo } from "../../../shared/components/ui/Logo";
import { BurgerMenu } from "../../../shared/components/ui/BurgerMenu";
import { AuthBlockVsLang } from "../../../shared/components/modules/AuthBlockVsLang";

import { DEFAULT_LANG } from "~/shared/constants/locale";
import type { THomeLayout } from "./Home.types";

export function Home({ children, user }: THomeLayout) {
  const data = useRouteLoaderData<TRootLoader>("root");
  const { t } = useTranslation(["common", "auth"]);
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] =
    useDisclosure(false);

  return (
    <>
      <Box
        component="header"
        px="md"
        style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
      >
        <Flex justify="space-between" align="center" mih={60}>
          <Logo />
          {!user && (
            <Burger
              opened={menuOpened}
              onClick={toggleMenu}
              hiddenFrom="xs"
              aria-label={t("aria.toggleMenu", { ns: "common" })}
            />
          )}

          {!user && <AuthBlockVsLang locale={data?.locale || DEFAULT_LANG} />}

          {user && (
            <UserBar user={user} locale={data?.locale || DEFAULT_LANG} />
          )}
        </Flex>

        {!user && (
          <BurgerMenu
            close={closeMenu}
            opened={menuOpened}
            locale={data?.locale || DEFAULT_LANG}
            hiddenFrom="xs"
          />
        )}
      </Box>

      <main>{children}</main>
    </>
  );
}