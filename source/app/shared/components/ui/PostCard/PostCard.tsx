import { Card, Flex, Grid, Text, Title } from "@mantine/core";
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
import s from "./PostCard.module.css";

export const PostCard = ({ item, userId, location, setPostId }: TPostCard) => {
  const { t } = useTranslation();
  const { id, title, slug, author, publishedAt, updatedAt, status } = item;
  const isUserOwner = userId === item.ownerId;

  const publishedDate = formatDateToRelative(publishedAt);
  const updatedDate = formatDateToRelative(updatedAt);

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
          <StatusBadge status={status} mb={10} display="block" mx="auto" />
        )}

        <Flex justify="space-between" align="center">
          <Title order={2} fw={500} size="lg">
            {title}
          </Title>

          <Text size="md" fw={500}>
            {author}
          </Text>
        </Flex>

        <Text c="dark" size="md" my="md" className={s.content} mih={99}>
          {parse(item.content)}
        </Text>

        <Flex gap={10} mb={10} direction="column">
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

        <Grid columns={2} mt="auto">
          <Grid.Col span={1}>
            <StyledLink
              to={`/${slug}`}
              variant="accent"
              fill="filled"
              style={{ width: "100%", height: "100%" }}
            >
              <IconEye size={18} color="white" style={{ flexShrink: 0 }} />
              {t("buttons.button.view", { ns: "common" })}
            </StyledLink>
          </Grid.Col>

          {userId && !isUserOwner && (
            <Grid.Col span={1}>
              <Button
                variant="subtle"
                w="100%"
                h="100%"
                styles={{ label: { gap: 10 } }}
                aria-label={t("buttons.button.complain", { ns: "common" })}
                onClick={() => setPostId(id)}
              >
                <IconAlertSquareRounded
                  size={18}
                  color="pink"
                  style={{ flexShrink: 0 }}
                />
                {t("buttons.button.complain", { ns: "common" })}
              </Button>
            </Grid.Col>
          )}

          {isUserOwner && (
            <Grid.Col span={1}>
              <StyledLink
                to={
                  location === "own"
                    ? id?.toString()
                    : `${NavigationLink.MY_POSTS}/${id?.toString()}`
                }
                variant="unstyled"
                fill="outline"
                style={{ width: "100%" }}
              >
                <IconPencil size={18} />
                {t("buttons.button.edit", { ns: "common" })}
              </StyledLink>
            </Grid.Col>
          )}
        </Grid>
      </Card.Section>
    </Card>
  );
};
