import { Outlet } from "@remix-run/react";
import { Home } from "~/shared/components/layout/Home";

export const handle = {
  i18n: "common",
};

export default function HomeLayout() {
  return (
    <Home>
      <Outlet />
    </Home>
  );
}
