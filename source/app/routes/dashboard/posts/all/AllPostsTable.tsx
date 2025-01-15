import { useEffect, useState } from "react";
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

import type { TPostsTable } from "~/shared/types/react";

export const AllPostsTable = ({ posts }: TPostsTable) => {
  const { t } = useTranslation("posts");
  const [opened, { open, close }] = useDisclosure(false);
  const [postId, setPostId] = useState<null | number>(null);

  useEffect(() => {
    if (!postId) {
      close();
    } else {
      open();
    }
  }, [postId]);

  const rows = posts.map(
    ({ id, title, createdAt, updatedAt, author, status }) => {
      const createdRelDate = formatDateToRelative(createdAt);
      const updatedRelDate = formatDateToRelative(updatedAt);

      return (
        <MTable.Tr key={id}>
          <TableTd>
            <Text fz="sm" fw={500}>
              {title}
            </Text>
          </TableTd>
          <TableTd>{author}</TableTd>
          <TableTd>{createdRelDate}</TableTd>
          <TableTd>{updatedRelDate}</TableTd>
          <TableTd>
            <StatusBadge status={status} />
          </TableTd>

          <TableTd>
            <Flex columnGap={4}>
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
                <Text fz="sm" fw={500}>
                  {t("postData.title")}
                </Text>
              </TableTh>

              <TableTh>{t("postData.author")}</TableTh>

              <TableTh>
                {t("timestampsLabels.createdAt", { ns: "common" })}
              </TableTh>
              <TableTh>
                {t("timestampsLabels.updatedAt", { ns: "common" })}
              </TableTh>

              <TableTh>{t("postData.status")}</TableTh>

              <TableTh> </TableTh>
            </MTable.Tr>
          </MTable.Thead>

          <MTable.Tbody>{rows}</MTable.Tbody>
        </MTable>
      </MTable.ScrollContainer>

      {opened && postId && (
        <ModalForDeletingWithoutRedirect
          itemId={postId}
          opened={opened}
          onClose={() => setPostId(null)}
          hasBeenDeleted={false}
        />
      )}
    </>
  );
};
