import { useTranslation } from "react-i18next";
import { Flex, Table as MTable, Text, Tooltip } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import { NavigationLink } from "~/shared/constants/navigation";
import { TableTd, TableTh } from "~/shared/components/ui/TableElements";
import { StatusBadge } from "~/shared/components/ui/StatusBadge";
import { StyledNavLink } from "~/shared/components/ui/StyledNavLink";
import { Button } from "~/shared/components/ui/Button";
import { ModalForDeletingWithoutRedirect } from "~/shared/components/modules/ModalsForDeleting";

import type { TDBPostRecord, TPost, TPostsTable } from "~/shared/types/react";

const TableRow = ({
  createdAt,
  id,
  title,
  author,
  status,
}: TPost & TDBPostRecord) => {
  const { t } = useTranslation("common");
  const [opened, { open, close }] = useDisclosure(false);
  const createdRelDate = formatDateToRelative(createdAt);

  return (
    <MTable.Tr key={id}>
      <TableTd>
        <Text fz="sm" fw={500} lineClamp={1} maw={120}>
          {title}
        </Text>
      </TableTd>
      <TableTd>{author}</TableTd>
      <TableTd>{createdRelDate}</TableTd>

      <TableTd>
        <StatusBadge status={status} />
      </TableTd>

      <TableTd>
        <Flex columnGap={4}>
          <Tooltip label={t("buttons.button.edit")}>
            <StyledNavLink
              aria-label={t("buttons.button.edit")}
              to={`${NavigationLink.DASHBOARD_ALL_POSTS}/${id}`}
            >
              <IconPencil size={18} stroke={1.5} />
            </StyledNavLink>
          </Tooltip>

          <Tooltip label={t("buttons.button.delete")}>
            <Button onClick={open} c="red" p="xs" variant="subtle">
              <IconTrash size={18} stroke={1.5} />
            </Button>
          </Tooltip>
        </Flex>
      </TableTd>

      <ModalForDeletingWithoutRedirect
        itemId={id}
        opened={opened}
        onClose={close}
        hasBeenDeleted={false}
      />
    </MTable.Tr>
  );
};

export const AllPostsTable = ({ posts }: TPostsTable) => {
  const { t } = useTranslation("common");
  const { t: p } = useTranslation("posts");

  return (
    <MTable.ScrollContainer
      type="scrollarea"
      minWidth={500}
      w="fit-content"
      mx="auto"
    >
      <MTable
        withColumnBorders
        // stickyHeader
        // stickyHeaderOffset={60}
        highlightOnHover
      >
        <MTable.Thead>
          <MTable.Tr>
            <TableTh>
              <Text fz="sm" fw={500}>
                {p("postData.title")}
              </Text>
            </TableTh>

            <TableTh>{p("postData.author")}</TableTh>

            <TableTh>{t("timestampsLabels.createdAt")}</TableTh>

            <TableTh>{p("postData.status")}</TableTh>

            <TableTh> </TableTh>
          </MTable.Tr>
        </MTable.Thead>

        <MTable.Tbody>
          {posts.map((item) => (
            <TableRow key={item.id} {...item} />
          ))}
        </MTable.Tbody>
      </MTable>
    </MTable.ScrollContainer>
  );
};
