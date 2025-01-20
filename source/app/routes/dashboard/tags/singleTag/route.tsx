import { useLoaderData } from "react-router";
import { Box, Container, Text, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { TagForm } from "../TagForm";
import { TimestampItem } from "~/shared/components/ui/TimestampItem";
import { StyledLink } from "~/shared/components/ui/StyledLink";

import { NavigationLink } from "~/shared/constants/navigation";
import type { TLoaderData } from "./loader";

export { loader } from "./loader";
export { action } from "./action";

export default function DashBoardSingleTagPage() {
  const { tag } = useLoaderData<TLoaderData>();
  const { t } = useTranslation("common");
  const { t: tg } = useTranslation("tags");

  const { createdAt, author, updatedAt, updatedBy } = tag;

  return (
    <Box component="section" py="lg">
      <Container>
        <StyledLink
          to={NavigationLink.DASHBOARD_TAGS}
          mb="lg"
          leftSection={<IconArrowBack />}
          variant="subtle"
        >
          <Text component="span" visibleFrom="xs">
            {t("buttons.button.back")}
          </Text>
        </StyledLink>

        <Title order={2} mb="lg" w="fit-content" mx="auto">
          {tg("link.editTag")}
        </Title>

        <TimestampItem type="created" date={createdAt} madeBy={author} />
        {updatedAt && (
          <TimestampItem type="updated" date={updatedAt} madeBy={updatedBy} />
        )}

        <TagForm tagData={tag} formType="update" />
      </Container>
    </Box>
  );
}
