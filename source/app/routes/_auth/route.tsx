import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { Outlet, useLoaderData } from "@remix-run/react";

import { AuthLayout } from "~/shared/components/layout/Auth";
import { loader } from "./loader";

export { loader } from "./loader";

export const handle = { i18n: ["auth", "common"] };

export default function DashBoardLayout() {
  const { error } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (!error) return;

    notifications.show({
      title: "Error",
      message: error,
      color: "red",
      position: "top-center",
    });
  }, [error]);

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
