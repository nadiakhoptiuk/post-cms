import { useLoaderData } from "@remix-run/react";

import { UsersTable } from "~/shared/components/modules/UsersTable/UsersTable";

import { TDashboardUsersLoader } from "./types";
import { Box, Container } from "@mantine/core";

export { loader } from "./loader";

export const handle = { i18n: ["user", "common"] };

export default function DashBoardUsersPage() {
  const { users } = useLoaderData<TDashboardUsersLoader>();

  return (
    <Box component="section">
      <Container>
        <UsersTable users={users} />
      </Container>
    </Box>
  );
}
