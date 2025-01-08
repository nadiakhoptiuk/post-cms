import { useTranslation } from "react-i18next";
import { Flex, Table as MTable, Text, Tooltip } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import { TableTd, TableTh } from "../../ui/TableElements";
import { StyledNavLink } from "../../ui/StyledNavLink";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TUsersTable } from "./UsersTable.types";

export const UsersTable = ({ users }: TUsersTable) => {
  const { t } = useTranslation("user");

  const rows = users.map((user) => {
    const createdRelDate = formatDateToRelative(user.createdAt);

    return (
      <MTable.Tr key={user.id}>
        <TableTd>
          <div>
            <Text fz="sm" fw={500}>
              {user.lastName} {user.firstName}
            </Text>
            <Text fz="xs" c="dimmed">
              {user.email}
            </Text>
          </div>
        </TableTd>
        <TableTd>{user.role}</TableTd>
        <TableTd>{createdRelDate}</TableTd>

        <TableTd>
          <Flex columnGap={4}>
            <StyledNavLink
              variant="unstyled"
              aria-label={t("buttons.button.edit", { ns: "common" })}
              to={`${NavigationLink.DASHBOARD_USERS}/${user.id}`}
              style={{ padding: 8 }}
            >
              <IconPencil size={18} stroke={1.5} />
            </StyledNavLink>

            <StyledNavLink
              variant="unstyled"
              aria-label={t("buttons.button.edit", { ns: "common" })}
              to={`${NavigationLink.DASHBOARD_USERS}/${user.id}`}
              style={{ padding: 8 }}
            >
              <IconTrash size={18} stroke={1.5} />
            </StyledNavLink>
          </Flex>
        </TableTd>
      </MTable.Tr>
    );
  });

  return (
    <>
      <MTable.ScrollContainer
        type="scrollarea"
        minWidth={500}
        w="fit-content"
        mx="auto"
        mih={345}
      >
        <MTable withColumnBorders>
          <MTable.Thead>
            <MTable.Tr>
              <TableTh>
                <div>
                  <Text fz="sm" fw={500}>
                    {`${t("userData.lastName")}, ${t("userData.firstName")}`}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {t("userData.email")}
                  </Text>
                </div>
              </TableTh>

              <TableTh>{t("userData.role")}</TableTh>
              <TableTh>
                {t("timestampsLabels.createdAt", { ns: "common" })}
              </TableTh>

              <TableTh> </TableTh>
            </MTable.Tr>
          </MTable.Thead>

          <MTable.Tbody>{rows}</MTable.Tbody>
        </MTable>
      </MTable.ScrollContainer>
    </>
  );
};
