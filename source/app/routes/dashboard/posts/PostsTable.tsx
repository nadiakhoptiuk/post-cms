import { useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Flex, Table as MTable, Text, Tooltip } from "@mantine/core";
import {
  IconBan,
  IconCheck,
  IconEye,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import { NavigationLink } from "~/shared/constants/navigation";
import { TableTd, TableTh } from "~/shared/components/ui/TableElements";
import { StatusBadge } from "~/shared/components/ui/StatusBadge";
import { StyledNavLink } from "~/shared/components/ui/StyledNavLink";
import { Button } from "~/shared/components/ui/Button";
import { ModalForDeletingWithoutRedirect } from "~/shared/components/modules/ModalsForDeleting";
import { ModalRejectPostWithoutRedirect } from "~/shared/components/modules/ModalsForRejectingPost";

import type { TDBPostRecord, TPost } from "~/shared/types/react";

export const PostsTable = ({
  posts,
}: {
  posts: Array<TPost & TDBPostRecord>;
}) => {
  const { t } = useTranslation("posts");
  const location = useLocation();
  const isModerationPage = location.pathname.includes(
    NavigationLink.DASHBOARD_POSTS_ON_MODERATION
  );
  const isComplaintsPage = location.pathname.includes(
    NavigationLink.DASHBOARD_POSTS_COMPLAINTS
  );
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

  const rows = posts.map(({ id, title, createdAt, author, status }) => {
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
        {!isModerationPage && (
          <TableTd>
            <StatusBadge status={status} />
          </TableTd>
        )}

        <TableTd>
          <Flex columnGap={4}>
            {!isModerationPage && !isComplaintsPage && (
              <>
                <StyledNavLink
                  variant="unstyled"
                  aria-label={t("buttons.button.edit", { ns: "common" })}
                  to={`${NavigationLink.DASHBOARD_ALL_POSTS}/${id}`}
                  style={{ padding: 8 }}
                >
                  <IconPencil size={18} stroke={1.5} />
                </StyledNavLink>

                <Tooltip label={t("buttons.button.delete", { ns: "common" })}>
                  <Button
                    onClick={() => {
                      setPostId(id);
                    }}
                    c="red"
                    p={8}
                    variant="subtle"
                  >
                    <IconTrash size={18} stroke={1.5} />
                  </Button>
                </Tooltip>
              </>
            )}

            {isModerationPage && (
              <>
                <StyledNavLink
                  variant="unstyled"
                  aria-label={t("buttons.button.view", { ns: "common" })}
                  to={`${id.toString()}`}
                  style={{ padding: 8 }}
                >
                  <IconEye size={18} stroke={1.5} />
                </StyledNavLink>

                <Tooltip label={t("buttons.button.publish", { ns: "common" })}>
                  <Button
                    type="button"
                    variant="subtle"
                    p={8}
                    aria-label={t("buttons.button.publish", { ns: "common" })}
                    onClick={() => {
                      fetcher.submit({ postId: id }, { method: "post" });
                    }}
                  >
                    <IconCheck size={18} stroke={1.5} />
                  </Button>
                </Tooltip>

                <Tooltip label={t("buttons.button.reject", { ns: "common" })}>
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
              </>
            )}

            {isComplaintsPage && (
              <>
                <StyledNavLink
                  variant="unstyled"
                  aria-label={t("buttons.button.view", { ns: "common" })}
                  to={`${id.toString()}`}
                  style={{ padding: 8 }}
                >
                  <IconEye size={18} stroke={1.5} />
                </StyledNavLink>

                <Tooltip label={t("buttons.button.block", { ns: "common" })}>
                  <Button
                    type="button"
                    variant="subtle"
                    p={8}
                    aria-label={t("buttons.button.block", { ns: "common" })}
                    onClick={() => {
                      fetcher.submit({ postId: id }, { method: "post" });
                    }}
                  >
                    <IconBan size={18} stroke={1.5} color="gray" />
                  </Button>
                </Tooltip>

                <Tooltip
                  label={t("buttons.button.reject.complaint", { ns: "common" })}
                >
                  <Button
                    onClick={() => {
                      setPostId(id);
                    }}
                    aria-label={t("buttons.button.reject.complaint", {
                      ns: "common",
                    })}
                    c="red"
                    p={8}
                    variant="subtle"
                  >
                    <IconX size={18} stroke={1.5} />
                  </Button>
                </Tooltip>
              </>
            )}
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
              <TableTh>
                {t("timestampsLabels.createdAt", { ns: "common" })}
              </TableTh>

              {!isModerationPage && <TableTh>{t("postData.status")}</TableTh>}

              <TableTh> </TableTh>
            </MTable.Tr>
          </MTable.Thead>

          <MTable.Tbody>{rows}</MTable.Tbody>
        </MTable>
      </MTable.ScrollContainer>

      {!isModerationPage && opened && postId && (
        <ModalForDeletingWithoutRedirect
          itemId={postId}
          opened={opened}
          onClose={() => setPostId(null)}
          action={NavigationLink.DELETE_POST}
        />
      )}

      {isModerationPage && opened && postId && (
        <ModalRejectPostWithoutRedirect
          itemId={postId}
          opened={opened}
          onClose={() => setPostId(null)}
        />
      )}
    </>
  );
};