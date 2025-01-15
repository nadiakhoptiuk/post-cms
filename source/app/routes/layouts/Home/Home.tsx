import { useRouteLoaderData } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { Box, Burger, Flex } from "@mantine/core";

import type { TRootLoader } from "~/shared/.server/root/loader";

import { UserBar } from "../../../shared/components/ui/UserBar";
import { Logo } from "../../../shared/components/ui/Logo";
import { AuthBlockVsLang } from "../AuthBlockVsLang";

import { DEFAULT_LANG } from "~/shared/constants/locale";
import type { THomeLayout } from "./Home.types";
import { BurgerMenu } from "../BurgerMenu";

export function Home({ children, user }: THomeLayout) {
  const data = useRouteLoaderData<TRootLoader>("root");
  const { t } = useTranslation("common");
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
              aria-label={t("aria.toggleMenu")}
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
