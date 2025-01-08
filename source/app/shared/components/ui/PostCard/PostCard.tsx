import { Card, Flex, Text, Title } from "@mantine/core";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { IconAlertSquareRounded, IconPencil } from "@tabler/icons-react";

import { formatDateWithMonthName } from "~/shared/utils/dateFormat";

import { StyledLink } from "../StyledLink";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TPostCard } from "./PostCard.types";
import s from "./PostCard.module.css";

export const PostCard = ({ item, isUserOwner, location }: TPostCard) => {
  const { t } = useTranslation();
  const { id, title, slug, author, createdAt } = item;

  const createdDate = formatDateWithMonthName(createdAt);

  return (
    <Card
      shadow="sm"
      padding="xl"
      component="li"
      styles={{
        section: { padding: 20, width: "fit-content" },
        root: { width: "fit-content" },
      }}
    >
      <Card.Section>
        <Flex justify="space-between" align="center">
          <Title order={2} fw={500} size="lg">
            {title}
          </Title>

          <Text size="md">{author}</Text>
        </Flex>

        <Text my="xs" c="dimmed" size="md" className={s.content} mih={75}>
          {parse(item.content)}
        </Text>

        <Text component="span" size="sm">
          {createdDate}
        </Text>
        {/* //TODO change to published */}

        <Flex gap={10} mt={10} w="fit-content">
          <StyledLink to={`/${slug}`} variant="accent" fill="filled">
            {t("buttons.button.view", { ns: "common" })}
          </StyledLink>

          {!isUserOwner && (
            <StyledLink
              to={`/${slug}/complain`}
              variant="unstyled"
              fill="outline"
            >
              <IconAlertSquareRounded size={18} color="pink" />
              {t("buttons.button.complain", { ns: "common" })}
            </StyledLink>
          )}

          {isUserOwner && (
            <StyledLink
              to={
                location === "own"
                  ? id?.toString()
                  : `${NavigationLink.MY_POSTS}/${id?.toString()}`
              }
              variant="unstyled"
              fill="outline"
            >
              <IconPencil size={18} color="gray" />
              {t("buttons.button.edit", { ns: "common" })}
            </StyledLink>
          )}
        </Flex>
      </Card.Section>
    </Card>
  );
};
