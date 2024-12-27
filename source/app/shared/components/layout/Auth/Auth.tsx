import { useRouteLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { TRootLoader } from "~/shared/.server/root/loader";

import { Logo } from "../../ui/Logo";
import { BurgerMenu } from "../../ui/BurgerMenu";
import { AuthNav } from "../../ui/AuthNavLinks";
import { LanguageSelector } from "../../ui/LanguageSelector";

import { WithChildren } from "~/shared/types/remix";
import { DEFAULT_LANG } from "~/shared/constants/locale";

import classes from "./Auth.module.css";

export function AuthLayout({ children }: WithChildren) {
  const data = useRouteLoaderData<TRootLoader>("root");
  const { t } = useTranslation(["common", "auth"]);
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] =
    useDisclosure(false);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.inner}>
          <Group className={classes.mobileInner}>
            <Logo />

            <Group
              grow
              styles={{ root: { marginRight: "20px" } }}
              visibleFrom="xs"
            >
              <AuthNav />
            </Group>

            <Burger
              opened={menuOpened}
              onClick={toggleMenu}
              hiddenFrom="xs"
              aria-label={t("aria.toggleMenu")}
            />
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

      <main className="content">{children}</main>
    </>
  );
}
