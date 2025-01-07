import { Box, Card, Flex, Text, Title } from "@mantine/core";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

import { formatDateWithMonthName } from "~/shared/utils/dateFormat";

import { StyledLink } from "../StyledLink";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TPostCard } from "./PostCard.types";
import s from "./PostCard.module.css";
import { IconAlertSquareRounded } from "@tabler/icons-react";

export const PostCard = ({ item, isUserOwner }: TPostCard) => {
  const { t } = useTranslation();
  const { id, title, slug, author, createdAt } = item;

  const createdDate = formatDateWithMonthName(createdAt);

  return (
    <Card
      shadow="sm"
      padding="xl"
      component="li"
      styles={{ section: { padding: 20 } }}
    >
      <Card.Section>
        <Flex justify="space-between" align="center">
          <Title order={2} fw={500} size="lg">
            {title}
          </Title>

          <Text size="md">{author}</Text>
        </Flex>

        <Box my="xs" c="dimmed" size="sm" className={s.content} mih={75}>
          {parse(item.content)}
        </Box>

        <Text component="span" size="sm">
          {createdDate}
        </Text>
        {/* //TODO change to published */}

        <Flex gap={10} mt={10}>
          <StyledLink to={`/${slug}`} variant="accent" fill="filled">
            {t("buttons.button.view", { ns: "common" })}
          </StyledLink>

          {!isUserOwner && (
            <StyledLink
              to={`/${slug}/complain`}
              variant="unstyled"
              fill="outline"
            >
              <IconAlertSquareRounded />
              {t("buttons.button.complain", { ns: "common" })}
            </StyledLink>
          )}

          {isUserOwner && (
            <StyledLink
              to={`/${NavigationLink.MY_POSTS}/${id?.toString()}`}
              variant="unstyled"
              fill="outline"
            >
              {t("buttons.button.edit", { ns: "common" })}
            </StyledLink>
          )}
        </Flex>
      </Card.Section>
    </Card>
  );
};
