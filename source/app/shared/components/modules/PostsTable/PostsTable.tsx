import { useTranslation } from "react-i18next";
import { Flex, Table as MTable, Text } from "@mantine/core";
import {
  IconCheck,
  IconEye,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";

import { TableTd, TableTh } from "../../ui/TableElements";
import { StyledNavLink } from "../../ui/StyledNavLink";

import { NavigationLink } from "~/shared/constants/navigation";
import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";
import type { TPostTable } from "./PostTable.types";
import { useLocation } from "react-router";

export const PostsTable = ({ posts }: TPostTable) => {
  const { t } = useTranslation("posts");
  const location = useLocation();
  const isModerationPage = location.pathname.includes(
    NavigationLink.DASHBOARD_POSTS_ON_MODERATION
  );

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
            {!isModerationPage && (
              <>
                {" "}
                <StyledNavLink
                  variant="unstyled"
                  aria-label={t("buttons.button.edit", { ns: "common" })}
                  to={`${NavigationLink.DASHBOARD_USERS}/${id}`}
                  style={{ padding: 8 }}
                >
                  <IconPencil size={18} stroke={1.5} />
                </StyledNavLink>
                <StyledNavLink
                  variant="unstyled"
                  aria-label={t("buttons.button.edit", { ns: "common" })}
                  to={`${NavigationLink.DASHBOARD_USERS}/${id}`}
                  style={{ padding: 8 }}
                >
                  <IconTrash size={18} stroke={1.5} />
                </StyledNavLink>
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
                  {/* {t("buttons.button.view", { ns: "common" })} */}
                </StyledNavLink>

                <StyledNavLink
                  variant="unstyled"
                  aria-label={t("buttons.button.publish", { ns: "common" })}
                  // to={`${NavigationLink.Da}/${id}`}
                  style={{ padding: 8 }}
                >
                  <IconCheck size={18} stroke={1.5} />
                </StyledNavLink>

                <StyledNavLink
                  variant="unstyled"
                  aria-label={t("buttons.button.publish", { ns: "common" })}
                  // to={`${NavigationLink.Da}/${id}`}
                  style={{ padding: 8 }}
                >
                  <IconX size={18} stroke={1.5} />
                </StyledNavLink>
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

              <TableTh> </TableTh>
            </MTable.Tr>
          </MTable.Thead>

          <MTable.Tbody>{rows}</MTable.Tbody>
        </MTable>
      </MTable.ScrollContainer>
    </>
  );
};
