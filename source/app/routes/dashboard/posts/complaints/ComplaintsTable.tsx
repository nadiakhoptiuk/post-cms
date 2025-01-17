import { useFetcher } from "react-router";
import { useTranslation } from "react-i18next";
import { Flex, Table as MTable, Text, Tooltip } from "@mantine/core";
import { IconBan, IconEye, IconX } from "@tabler/icons-react";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import { TableTd, TableTh } from "~/shared/components/ui/TableElements";
import { StyledNavLink } from "~/shared/components/ui/StyledNavLink";
import { Button } from "~/shared/components/ui/Button";

import type { TDBComplaintRecord } from "~/shared/types/react";
import { ACTION_ACCEPT, ACTION_REJECT } from "~/shared/constants/common";

export const ComplaintsTable = ({
  complaints,
}: {
  complaints: Array<TDBComplaintRecord>;
}) => {
  const { t } = useTranslation("common");
  const { t: c } = useTranslation("complaints");
  const { t: p } = useTranslation("posts");
  const fetcher = useFetcher();

  const rows = complaints.map(
    ({ id, postSlug, postId, postTitle, reason, createdAt, author }) => {
      const createdRelDate = formatDateToRelative(createdAt);

      return (
        <MTable.Tr key={id}>
          <TableTd>
            <Text fz="sm" fw={500}>
              {postTitle.slice(0, 18)}...
            </Text>
          </TableTd>
          <TableTd>{author}</TableTd>
          <TableTd>{reason}</TableTd>
          <TableTd>{createdRelDate}</TableTd>

          <TableTd>
            <Flex columnGap={4}>
              <StyledNavLink
                variant="unstyled"
                aria-label={t("buttons.button.view")}
                to={`/${postSlug}`}
                style={{ padding: 8 }}
              >
                <IconEye size={18} stroke={1.5} />
              </StyledNavLink>

              <Tooltip label={t("buttons.button.block")}>
                <Button
                  type="button"
                  variant="subtle"
                  p={8}
                  aria-label={t("buttons.button.block")}
                  onClick={() => {
                    fetcher.submit(
                      { postId: postId, id: id, actionId: ACTION_ACCEPT },
                      { method: "post" }
                    );
                  }}
                >
                  <IconBan size={18} stroke={1.5} color="red" />
                </Button>
              </Tooltip>

              <Tooltip label={t("buttons.button.reject.complaint")}>
                <Button
                  onClick={() => {
                    fetcher.submit(
                      { postId: postId, id: id, actionId: ACTION_REJECT },
                      { method: "post" }
                    );
                  }}
                  aria-label={t("buttons.button.reject.complaint", {
                    ns: "common",
                  })}
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
    }
  );

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
                {p("complaintData.post")}
              </Text>
            </TableTh>

            <TableTh>{c("complaintData.author")}</TableTh>
            <TableTh>{c("complaintData.reason")}</TableTh>
            <TableTh>{t("timestampsLabels.complainedAt")}</TableTh>

            <TableTh> </TableTh>
          </MTable.Tr>
        </MTable.Thead>

        <MTable.Tbody>{rows}</MTable.Tbody>
      </MTable>
    </MTable.ScrollContainer>
  );
};
