import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import { Flex, Table as MTable, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconEye, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import { TableTd, TableTh } from "~/shared/components/ui/TableElements";
import { StyledNavLink } from "~/shared/components/ui/StyledNavLink";
import { Button } from "~/shared/components/ui/Button";
import { ModalRejectPostWithoutRedirect } from "./ModalsForRejectingPost";

import { ACTION_PUBLISH } from "~/shared/constants/common";
import type { TPostsTable } from "~/shared/types/react";

export const ModerationPostsTable = ({ posts }: TPostsTable) => {
  const { t } = useTranslation("common");
  const [opened, { open, close }] = useDisclosure(false);
  const [postId, setPostId] = useState<null | number>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    if (!postId) {
      close();
    } else {
      open();
    }
  }, [postId]);

  const rows = posts.map(({ id, title, createdAt, author }) => {
    const createdRelDate = formatDateToRelative(createdAt);

    return (
      <MTable.Tr key={id}>
        <TableTd>
          <Text fz="sm" fw={500}>
            {title}
          </Text>
        </TableTd>
        <TableTd>{author}</TableTd>
        <TableTd>{createdRelDate}</TableTd>

        <TableTd>
          <Flex columnGap={4}>
            <StyledNavLink
              variant="unstyled"
              aria-label={t("buttons.button.view")}
              to={`${id.toString()}`}
              style={{ padding: 8 }}
            >
              <IconEye size={18} stroke={1.5} />
            </StyledNavLink>

            <Tooltip label={t("buttons.button.publish")}>
              <Button
                type="button"
                variant="subtle"
                p={8}
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
              <Button
                onClick={() => {
                  setPostId(id);
                }}
                c="red"
                p={8}
                variant="subtle"
              >
                <IconX size={18} stroke={1.5} />
              </Button>
            </Tooltip>
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
                <Text fz="sm" fw={500}>
                  {t("postData.title")}
                </Text>
              </TableTh>

              <TableTh>{t("postData.author")}</TableTh>
              <TableTh>{t("timestampsLabels.createdAt")}</TableTh>

              <TableTh> </TableTh>
            </MTable.Tr>
          </MTable.Thead>

          <MTable.Tbody>{rows}</MTable.Tbody>
        </MTable>
      </MTable.ScrollContainer>

      {opened && postId && (
        <ModalRejectPostWithoutRedirect
          itemId={postId}
          opened={opened}
          onClose={() => setPostId(null)}
        />
      )}
    </>
  );
};
