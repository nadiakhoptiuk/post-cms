import { Outlet, useLoaderData } from "react-router";

import { DashboardLayout } from "~/shared/components/layout/Dashboard";

export const handle = { i18n: ["dashboard", "common"] };

export { loader } from "./loader";

export default function DashBoardLayout() {
  const { postsOnModeration, postsWithComplaints } = useLoaderData();

  return (
    <DashboardLayout
      postsOnModeration={postsOnModeration}
      postsWithComplaints={postsWithComplaints}
    >
      <Outlet />
    </DashboardLayout>
  );
}
