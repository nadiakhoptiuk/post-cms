import { Outlet } from "@remix-run/react";

import { AuthLayout } from "~/shared/components/layout/Auth";

export const handle = { i18n: ["auth", "common"] };

export default function DashBoardLayout() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
