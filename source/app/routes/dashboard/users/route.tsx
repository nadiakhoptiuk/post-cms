import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";
import { IconPlus } from "@tabler/icons-react";
import { Box, Container, Group, Pagination, Text } from "@mantine/core";

import { StyledNavLink } from "~/shared/components/ui/StyledNavLink";
import { SearchForm } from "~/shared/components/modules/SearchForm";
import { UsersTable } from "./UsersTable";

import { NavigationLink } from "~/shared/constants/navigation";
import { PAGE_PARAMETER_NAME } from "~/shared/constants/common";
import type { TLoaderData } from "./loader";

export { loader } from "./loader";
export { action } from "./action";

export const handle = { i18n: ["user", "common"] };

export default function DashBoardUsersPage() {
  const { users, query, actualPage, pagesCount } = useLoaderData<TLoaderData>();
  const { t } = useTranslation("user");
  const navigate = useNavigate();

  return (
    <Box component="section" py="lg">
      <Container>
        <Group mx="auto" w="fit-content" my="lg">
          <StyledNavLink
            variant="accent"
            to={NavigationLink.DASHBOARD_USERS_NEW}
          >
            <IconPlus />
            <Text component="span" visibleFrom="xs">
              {t("link.addNewUser")}
            </Text>
          </StyledNavLink>

          <SearchForm query={query} />
        </Group>

        {users.length > 0 ? (
          <UsersTable users={users} />
        ) : (
          <Text>{t("noUsers")}</Text>
        )}

        <Pagination
          total={pagesCount}
          value={actualPage}
          onChange={(page) =>
            navigate({ search: `?${PAGE_PARAMETER_NAME}=${page}` })
          }
          mt="md"
          mx="auto"
          w="fit-content"
        />
      </Container>
    </Box>
  );
}
