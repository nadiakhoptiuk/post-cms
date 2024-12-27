import { useLoaderData } from "@remix-run/react";

import { Table } from "~/shared/components/ui/Table/Table";

import { TDashboardUsersLoader } from "./types";

export { loader } from "./loader";

export default function DashBoardAllPostsPage() {
  const { users } = useLoaderData<TDashboardUsersLoader>();

  return (
    <>
      <Table users={users} />
    </>
  );
}
