import {
  Badge,
  Flex,
  Group,
  List,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconCircleCheck, IconCircleX, IconEye } from "@tabler/icons-react";

import { NavigationLink } from "~/shared/constants/navigation";
import { StyledLink } from "~/shared/components/ui/StyledLink";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import type { TDBPostRecord, TModeratedAt, TPost } from "~/shared/types/react";

export const NotificationList = ({
  posts,
}: {
  posts: Array<TPost & TDBPostRecord & TModeratedAt>;
}) => {
  const { t, i18n } = useTranslation("common");
  const { t: n } = useTranslation("notifications");

  return (
    <>
      {posts.length > 0 && (
        <List spacing="sm">
          {posts.map(
            ({ id, publishedAt, moderatedAt, rejectReason, slug, title }) => (
              <List.Item
                key={id}
                p="xs"
                icon={
                  <ThemeIcon
                    color={publishedAt ? "cyan.5" : "pink.3"}
                    size={24}
                    radius="xl"
                  >
                    {publishedAt ? (
                      <IconCircleCheck size={16} />
                    ) : (
                      <IconCircleX size={16} />
                    )}
                  </ThemeIcon>
                }
                styles={{
                  itemLabel: { width: "100%" },
                  itemWrapper: { width: "100%" },
                  item: {
                    borderBottom: "1px solid var(--mantine-color-gray-2)",
                  },
                }}
              >
                <Flex w="100%" justify="space-between" align="center" gap="md">
                  <Group justify="center">
                    <Text>
                      {publishedAt ? n("post.published") : n("post.rejected")}

                      {rejectReason &&
                        `. ${n("post.reason")} "${rejectReason}"`}
                    </Text>

                    <Badge tt="initial" variant="light">
                      {`"${title}"`}
                    </Badge>
                  </Group>

                  <Group justify="center">
                    <Text component="span">
                      {formatDateToRelative(moderatedAt, i18n.language)}
                    </Text>

                    <Tooltip label={t("buttons.button.view")}>
                      <StyledLink
                        variant="subtle"
                        to={
                          publishedAt
                            ? `/${slug}`
                            : `${NavigationLink.MY_POSTS}/${id}`
                        }
                      >
                        <IconEye size={22} strokeWidth={1} />
                      </StyledLink>
                    </Tooltip>
                  </Group>
                </Flex>
              </List.Item>
            )
          )}
        </List>
      )}
    </>
  );
};
