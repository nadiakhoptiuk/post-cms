import { Outlet } from "react-router";

import { AuthLayout } from "~/routes/layouts/Auth";

export { loader } from "./loader";

export const handle = { i18n: ["auth", "common"] };

export default function AuthorizationLayout() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
