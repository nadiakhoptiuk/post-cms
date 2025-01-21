import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import { Group, Table as MTable, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconEye, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import { TableTd, TableTh } from "~/shared/components/ui/TableElements";
import { StyledNavLink } from "~/shared/components/ui/StyledNavLink";
import { Button } from "~/shared/components/ui/Button";
import { ModalRejectPostWithoutRedirect } from "./ModalsForRejectingPost";

import { ACTION_PUBLISH } from "~/shared/constants/common";
import type { TDBPostRecord, TPost, TPostsTable } from "~/shared/types/react";

const TableRow = ({ id, title, createdAt, author }: TPost & TDBPostRecord) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { i18n, t } = useTranslation("common");
  const locale = i18n.language;
  const createdRelDate = formatDateToRelative(createdAt, locale);
  const fetcher = useFetcher();

  return (
    <>
      <MTable.Tr key={id}>
        <TableTd>
          <Text fz="sm" fw={500}>
            {title}
          </Text>
        </TableTd>
        <TableTd>{author}</TableTd>
        <TableTd>{createdRelDate}</TableTd>

        <TableTd>
          <Group gap="xs">
            <Tooltip label={t("buttons.button.view")}>
              <StyledNavLink
                aria-label={t("buttons.button.view")}
                to={`${id.toString()}`}
                p="xs"
              >
                <IconEye size={18} stroke={1.5} />
              </StyledNavLink>
            </Tooltip>

            <Tooltip label={t("buttons.button.publish")}>
              <Button
                type="button"
                variant="subtle"
                p="xs"
                aria-label={t("buttons.button.publish")}
                onClick={() => {
                  fetcher.submit(
                    { id: id, actionId: ACTION_PUBLISH },
                    { method: "post" }
                  );
                }}
              >
                <IconCheck size={18} stroke={1.5} />
              </Button>
            </Tooltip>

            <Tooltip label={t("buttons.button.reject")}>
              <Button onClick={open} c="red" p="xs" variant="subtle">
                <IconX size={18} stroke={1.5} />
              </Button>
            </Tooltip>
          </Group>
        </TableTd>
      </MTable.Tr>

      <ModalRejectPostWithoutRedirect
        itemId={id}
        opened={opened}
        onClose={close}
      />
    </>
  );
};

export const ModerationPostsTable = ({ posts }: TPostsTable) => {
  const { t } = useTranslation("common");
  const { t: p } = useTranslation("posts");

  return (
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
              <Text fz="sm" fw={500}>
                {p("postData.title")}
              </Text>
            </TableTh>

            <TableTh>{p("postData.author")}</TableTh>
            <TableTh>{t("timestampsLabels.createdAt")}</TableTh>

            <TableTh> </TableTh>
          </MTable.Tr>
        </MTable.Thead>

        <MTable.Tbody>
          {posts.map((post) => (
            <TableRow key={post.id} {...post} />
          ))}
        </MTable.Tbody>
      </MTable>
    </MTable.ScrollContainer>
  );
};
