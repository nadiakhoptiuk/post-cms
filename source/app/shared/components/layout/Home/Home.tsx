import { useRouteLoaderData } from "@remix-run/react";
import { Group } from "@mantine/core";

import { TRootLoader } from "~/shared/.server/root/loader";

import { UserBar } from "../../ui/UserBar";
import { Logo } from "../../ui/Logo";

import { WithChildren } from "~/shared/types/remix";
import { DEFAULT_LANG } from "~/shared/constants/locale";

import classes from "./Home.module.css";

export function Home({ children }: WithChildren) {
  const data = useRouteLoaderData<TRootLoader>("root");

  return (
    <>
      <header className={classes.header}>
        <Group className={classes.inner}>
          <Group>
            <Logo />
          </Group>

          <UserBar
            user={{ name: "Fake Name" }}
            locale={data?.locale || DEFAULT_LANG}
          />
        </Group>
      </header>

      <main className="content">{children}</main>
    </>
  );
}
