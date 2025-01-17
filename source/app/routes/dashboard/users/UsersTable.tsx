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
import type { TDBUser } from "~/shared/types/react";

const TableRow = ({
  id,
  createdAt,
  deletedAt,
  lastName,
  firstName,
  email,
  role,
}: TDBUser) => {
  const { t } = useTranslation("common");
  const [opened, { open, close }] = useDisclosure(false);
  const createdRelDate = formatDateToRelative(createdAt);

  return (
    <>
      <MTable.Tr key={id}>
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
            <Tooltip label={t("buttons.button.edit")}>
              <StyledNavLink
                aria-label={t("buttons.button.edit")}
                to={`${NavigationLink.DASHBOARD_USERS}/${id}`}
                style={{ padding: 8 }}
              >
                <IconPencil size={18} stroke={1.5} />
              </StyledNavLink>
            </Tooltip>

            <Tooltip
              label={
                deletedAt === null
                  ? t("buttons.button.delete")
                  : t("buttons.button.restore")
              }
            >
              <Button
                onClick={open}
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

      <ModalForDeletingWithoutRedirect
        itemId={id}
        opened={opened}
        onClose={close}
        hasBeenDeleted={deletedAt !== null}
      />
    </>
  );
};

export const UsersTable = ({ users }: TUsersData) => {
  const { t } = useTranslation("common");
  const { t: u } = useTranslation("user");

  return (
    <>
      <MTable.ScrollContainer
        type="scrollarea"
        minWidth={400}
        w="fit-content"
        mx="auto"
      >
        <MTable withColumnBorders highlightOnHover>
          <MTable.Thead>
            <MTable.Tr>
              <TableTh>
                <div>
                  <Text fz="sm" fw={500}>
                    {`${u("userData.lastName")}, ${u("userData.firstName")}`}
                  </Text>
                  <Text fz="xs" c="dimmed">
                    {u("userData.email")}
                  </Text>
                </div>
              </TableTh>

              <TableTh>{u("userData.role")}</TableTh>
              <TableTh>{t("timestampsLabels.createdAt")}</TableTh>

              <TableTh> </TableTh>
            </MTable.Tr>
          </MTable.Thead>

          <MTable.Tbody>
            {users.map((user) => (
              <TableRow key={user.id} {...user} />
            ))}
          </MTable.Tbody>
        </MTable>
      </MTable.ScrollContainer>
    </>
  );
};
