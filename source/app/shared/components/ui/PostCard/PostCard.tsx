import { Card, Flex, Text, Title, Tooltip } from "@mantine/core";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import {
  IconAlertSquareRounded,
  IconEye,
  IconPencil,
} from "@tabler/icons-react";

import { formatDateToRelative } from "~/shared/utils/dateRelativeFormat";

import { StyledLink } from "../StyledLink";
import { StatusBadge } from "../StatusBadge";
import { Button } from "../Button";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TPostCard } from "./PostCard.types";

export const PostCard = ({ item, userId, location, setPostId }: TPostCard) => {
  const { i18n, t } = useTranslation("common");
  const locale = i18n.language;
  const { id, title, slug, author, publishedAt, updatedAt, status } = item;
  const isUserOwner = userId === item.ownerId;

  const publishedDate = formatDateToRelative(publishedAt, locale);
  const updatedDate = formatDateToRelative(updatedAt, locale);

  return (
    <Card
      shadow="sm"
      padding="xl"
      component="li"
      styles={{
        section: {
          width: "100%",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },
        root: { width: "100%", height: "100%", padding: 20 },
      }}
    >
      <Card.Section>
        {location === "own" && (
          <StatusBadge status={status} mb="xs" display="block" mx="auto" />
        )}

        <Flex justify="space-between" align="center">
          <Title order={2} fw={500} size="lg">
            {title}
          </Title>

          <Text size="md" fw={500}>
            {author}
          </Text>
        </Flex>

        <Text lineClamp={4} c="dark" size="md" my="md" mih={99}>
          {parse(item.content)}
        </Text>

        <Flex gap="xs" mb="xs" direction="column">
          {publishedDate && (
            <Text component="span" size="sm" c="gray">
              {publishedDate}
            </Text>
          )}

          {updatedDate && (
            <Text component="span" size="xs" c="gray">
              {updatedDate}
            </Text>
          )}
        </Flex>

        <Flex columnGap="xs" mt="auto">
          <Tooltip label={t("buttons.button.view")}>
            <StyledLink
              to={`/${slug}`}
              variant="light"
              fullWidth
              h="100%"
              leftSection={<IconEye size={18} style={{ flexShrink: 0 }} />}
            >
              {t("buttons.button.view")}
            </StyledLink>
          </Tooltip>

          {userId && !isUserOwner && (
            <Tooltip label={t("buttons.button.complain")}>
              <Button
                variant="light"
                fullWidth
                p="xs"
                c="pink.3"
                aria-label={t("buttons.button.complain")}
                onClick={() => setPostId(id)}
                size="xs"
                h="100%"
                leftSection={
                  <IconAlertSquareRounded
                    size={18}
                    color="pink"
                    style={{ flexShrink: 0 }}
                  />
                }
              >
                {t("buttons.button.complain")}
              </Button>
            </Tooltip>
          )}

          {isUserOwner && (
            <Tooltip label={t("buttons.button.edit")}>
              <StyledLink
                to={
                  location === "own"
                    ? id?.toString()
                    : `${NavigationLink.MY_POSTS}/${id?.toString()}`
                }
                variant="light"
                fullWidth
                leftSection={<IconPencil size={18} />}
              >
                {t("buttons.button.edit")}
              </StyledLink>
            </Tooltip>
          )}
        </Flex>
      </Card.Section>
    </Card>
  );
};
