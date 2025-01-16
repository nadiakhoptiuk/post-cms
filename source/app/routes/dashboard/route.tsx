import { Outlet, useLoaderData } from "react-router";

import { DashboardLayout } from "~/routes/layouts/Dashboard";
import type { TLoaderData } from "./loader";

export const handle = { i18n: ["dashboard", "common"] };

export { loader } from "./loader";

export default function DashBoardLayout() {
  const { postsOnModeration, postsWithComplaints } =
    useLoaderData<TLoaderData>();

  return (
    <DashboardLayout
      postsOnModeration={postsOnModeration}
      postsWithComplaints={postsWithComplaints}
    >
      <Outlet />
    </DashboardLayout>
  );
}
