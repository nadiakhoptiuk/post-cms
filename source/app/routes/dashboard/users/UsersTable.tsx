import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Table as MTable, Text, Tooltip } from "@mantine/core";
import { IconPencil, IconRestore, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { TableTd, TableTh } from "~/shared/components/ui/TableElements";
import { StyledNavLink } from "~/shared/components/ui/StyledNavLink";
import { Button } from "~/shared/components/ui/Button";
import { ModalForDeletingWithoutRedirect } from "~/shared/components/modules/ModalsForDeleting";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TUsersData } from "./types";

export const UsersTable = ({ users }: TUsersData) => {
  const { t } = useTranslation("common");
  const [userId, setUserId] = useState<null | number>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const hasBeenDeleted =
    users.find((user) => user.id === userId)?.deletedAt !== null;

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
                aria-label={t("buttons.button.edit")}
                to={`${NavigationLink.DASHBOARD_USERS}/${id}`}
                style={{ padding: 8 }}
              >
                <IconPencil size={18} stroke={1.5} />
              </StyledNavLink>

              <Tooltip
                label={
                  deletedAt === null
                    ? t("buttons.button.delete")
                    : t("buttons.button.restore")
                }
              >
                <Button
                  onClick={() => {
                    setUserId(id);
                  }}
                  c={deletedAt === null ? "red" : "green"}
                  p={8}
                  variant="subtle"
                >
                  {deletedAt === null ? (
                    <IconTrash size={18} stroke={1.5} />
                  ) : (
                    <IconRestore size={18} stroke={1.5} />
                  )}
                </Button>
              </Tooltip>
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
              <TableTh>{t("timestampsLabels.createdAt")}</TableTh>

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
          hasBeenDeleted={hasBeenDeleted}
        />
      )}
    </>
  );
};
