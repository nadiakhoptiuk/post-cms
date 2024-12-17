import { Group } from "@mantine/core";

import { UserBar } from "../../ui/UserBar";
import { Logo } from "../../ui/Logo";

import { WithChildren } from "~/shared/types/remix";

import classes from "./Home.module.css";

export function Home({ children }: WithChildren) {
  return (
    <>
      <header className={classes.header}>
        <Group className={classes.inner}>
          <Group>
            <Logo />
          </Group>

          <UserBar user={{ name: "Fake Name" }} />
        </Group>
      </header>

      <main className="content">{children}</main>
    </>
  );
}
