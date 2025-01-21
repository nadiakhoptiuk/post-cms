import { useFetcher } from "react-router";
import { Flex, Table as MTable, Text, Tooltip } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import { Button } from "~/shared/components/ui/Button";
import { StyledNavLink } from "~/shared/components/ui/StyledNavLink";
import { TableTd, TableTh } from "~/shared/components/ui/TableElements";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TTag } from "~/shared/types/react";
import { openDeleteModal } from "./openDeleteModal";

const TableRow = ({ createdAt, id, name, author }: TTag) => {
  const { i18n, t } = useTranslation("common");
  const locale = i18n.language;
  const createdRelDate = formatDateToRelative(createdAt, locale);
  const fetcher = useFetcher();

  const openModal = () =>
    openDeleteModal({
      title: t("modal.irreversibleWarning"),
      text: t("modal.title"),
      confirmBtnLabel: t("buttons.button.delete"),
      cancelBtnLabel: t("buttons.button.cancel"),
      confirmCb: () =>
        fetcher.submit(
          {
            id: id,
          },
          {
            method: "post",
          }
        ),
    });

  return (
    <MTable.Tr key={id}>
      <TableTd>
        <Text fz="sm" fw={500} lineClamp={1} maw={120}>
          {name}
        </Text>
      </TableTd>
      <TableTd>{author}</TableTd>
      <TableTd>{createdRelDate}</TableTd>

      <TableTd>
        <Flex columnGap={4}>
          <Tooltip label={t("buttons.button.edit")}>
            <StyledNavLink
              aria-label={t("buttons.button.edit")}
              to={`${NavigationLink.DASHBOARD_TAGS}/${id}`}
            >
              <IconPencil size={18} stroke={1.5} />
            </StyledNavLink>
          </Tooltip>

          <Tooltip label={t("buttons.button.delete")}>
            <Button onClick={openModal} c="red" p="xs" variant="subtle">
              <IconTrash size={18} stroke={1.5} />
            </Button>
          </Tooltip>
        </Flex>
      </TableTd>
    </MTable.Tr>
  );
};

export const TagsTable = ({ tags }: { tags: Array<TTag> }) => {
  const { t } = useTranslation("common");
  const { t: tg } = useTranslation("tags");

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
                {tg("tagData.name")}
              </Text>
            </TableTh>

            <TableTh>{tg("tagData.author")}</TableTh>

            <TableTh>{t("timestampsLabels.createdAt")}</TableTh>

            <TableTh> </TableTh>
          </MTable.Tr>
        </MTable.Thead>

        <MTable.Tbody>
          {tags.map((item) => (
            <TableRow key={item.id} {...item} />
          ))}
        </MTable.Tbody>
      </MTable>
    </MTable.ScrollContainer>
  );
};
