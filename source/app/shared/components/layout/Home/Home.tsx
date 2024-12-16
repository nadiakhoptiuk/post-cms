import { Group } from "@mantine/core";

import { UserBar } from "../../ui/UserBar";

import { WithChildren } from "~/shared/types/remix";

import classes from "./Home.module.css";
import { Logo } from "../../ui/Logo";

export function Home({ children }: WithChildren) {
  return (
    <>
      <header className={classes.header}>
        <Group className={classes.inner}>
          <Group>
            {/* <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" /> */}
            <Logo />
          </Group>

          <UserBar user={{ name: "Fake Name" }} />
        </Group>
      </header>

      <main className="content">{children}</main>
    </>
  );
}
