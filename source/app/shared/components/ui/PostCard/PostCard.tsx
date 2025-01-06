import { Box, Card, Text } from "@mantine/core";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

import { StyledLink } from "../StyledLink";

import type { TDBPostRecord, TPost } from "~/shared/types/react";
import s from "./PostCard.module.css";

export const PostCard = ({ item }: { item: TPost & TDBPostRecord }) => {
  const { t } = useTranslation();
  const { id, title } = item;

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

        <Box mt="xs" c="dimmed" size="sm" className={s.content}>
          {parse(item.content)}
        </Box>

        <StyledLink to={`${id.toString()}`} variant="accent" fill="outline">
          {t("buttons.button.edit", { ns: "common" })}
        </StyledLink>
      </Card.Section>
    </Card>
  );
};
