import { useRouteLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, Burger, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import type { TRootLoader } from "~/shared/.server/root/loader";

import { Logo } from "../../../shared/components/ui/Logo";
import { BurgerMenu } from "../BurgerMenu";
import { AuthBlockVsLang } from "../AuthBlockVsLang";

import type { WithChildren } from "~/shared/types/react";
import { DEFAULT_LANG } from "~/shared/constants/locale";

export function AuthLayout({ children }: WithChildren) {
  const data = useRouteLoaderData<TRootLoader>("root");
  const { t } = useTranslation(["common", "auth"]);
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] =
    useDisclosure(false);

  return (
    <>
      <Box component="header" w="100%" px="md" bg="blue.2">
        <Flex w="100%" justify="space-between" align="center" mih={60}>
          <Logo />
          <Burger
            opened={menuOpened}
            onClick={toggleMenu}
            hiddenFrom="xs"
            aria-label={t("aria.toggleMenu")}
          />

          <AuthBlockVsLang locale={data?.locale || DEFAULT_LANG} />
        </Flex>
      </Box>

      <BurgerMenu
        close={closeMenu}
        opened={menuOpened}
        locale={data?.locale || DEFAULT_LANG}
        hiddenFrom="xs"
      />

      <main className="content">{children}</main>
    </>
  );
}
