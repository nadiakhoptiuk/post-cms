import { Box, Card, Flex, Text } from "@mantine/core";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

import { StyledLink } from "../StyledLink";

import type { TPostCard } from "./PostCard.types";
import s from "./PostCard.module.css";

export const PostCard = ({ item, cardType = "own" }: TPostCard) => {
  const { t } = useTranslation();
  const { id, title, slug } = item;

  return (
    <Card
      shadow="sm"
      padding="xl"
      component="li"
      styles={{ section: { padding: 20 } }}
    >
      <Card.Section>
        <Text fw={500} size="lg">
          {title}
        </Text>
        <Box my="xs" c="dimmed" size="sm" className={s.content}>
          {parse(item.content)}
        </Box>

        {cardType === "own" && (
          <StyledLink to={`${id?.toString()}`} variant="accent" fill="outline">
            {t("buttons.button.edit", { ns: "common" })}
          </StyledLink>
        )}

        {cardType === "all" && (
          <Flex gap={10}>
            <StyledLink to={slug} variant="accent" fill="filled">
              {t("buttons.button.view", { ns: "common" })}
            </StyledLink>

            <StyledLink
              to={`${id?.toString()}/complain`}
              variant="unstyled"
              fill="outline"
            >
              {t("buttons.button.complain", { ns: "common" })}
            </StyledLink>
          </Flex>
        )}
      </Card.Section>
    </Card>
  );
};
