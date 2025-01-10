import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Table as MTable, Text, Tooltip } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { TableTd, TableTh } from "../../ui/TableElements";
import { StyledNavLink } from "../../ui/StyledNavLink";
import { ModalForDeletingWithoutRedirect } from "../ModalsForDeleting";
import { Button } from "../../ui/Button";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TUsersTable } from "./UsersTable.types";

export const UsersTable = ({ users }: TUsersTable) => {
  const { t } = useTranslation("user");
  const [userId, setUserId] = useState<null | number>(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (!userId) {
      close();
    } else {
      open();
    }
  }, [userId]);

  const rows = users.map(
    ({ id, createdAt, deletedAt, lastName, firstName, email, role }) => {
      const createdRelDate = formatDateToRelative(createdAt);

      return (
        <MTable.Tr key={id} mih={57}>
          <TableTd>
            <div>
              <Text fz="sm" fw={500}>
                {lastName} {firstName}
              </Text>
              <Text fz="xs" c="dimmed">
                {email}
              </Text>
            </div>
          </TableTd>
          <TableTd>{role}</TableTd>
          <TableTd>{createdRelDate}</TableTd>

          <TableTd>
            <Flex columnGap={4}>
              <StyledNavLink
                variant="unstyled"
                aria-label={t("buttons.button.edit", { ns: "common" })}
                to={`${NavigationLink.DASHBOARD_USERS}/${id}`}
                style={{ padding: 8 }}
              >
                <IconPencil size={18} stroke={1.5} />
              </StyledNavLink>

              {deletedAt === null && (
                <Tooltip label={t("buttons.button.delete", { ns: "common" })}>
                  <Button
                    onClick={() => {
                      setUserId(id);
                    }}
                    c="red"
                    p={8}
                    variant="subtle"
                  >
                    <IconTrash size={18} stroke={1.5} />
                  </Button>
                </Tooltip>
              )}
            </Flex>
          </TableTd>
        </MTable.Tr>
      );
    }
  );

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

      {opened && userId && (
        <ModalForDeletingWithoutRedirect
          itemId={userId}
          opened={opened}
          onClose={() => setUserId(null)}
          action={NavigationLink.DELETE_USER}
        />
      )}
    </>
  );
};
