import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { Outlet, useLoaderData } from "react-router";

import { AuthLayout } from "~/routes/layouts/Auth";

export { loader } from "./loader";

export const handle = { i18n: ["auth", "common"] };

export default function AuthorizationLayout() {
  const data = useLoaderData();

  useEffect(() => {
    if (!data.error) return;

    notifications.show({
      title: "Error",
      message: data.error,
      color: "red",
      position: "top-center",
    });
  }, [data]);

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
